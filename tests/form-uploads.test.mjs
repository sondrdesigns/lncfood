// Integration test for form submission uploads.
//
// What it covers:
//   1. Resume upload + Application row creation (job-application path).
//   2. Catalog upload + PartnerApplication row creation (vendor path).
//   3. PartnerApplication with credit-application fields (buyer path).
//   4. Admin Prisma queries surface every row (same query the admin pages use).
//   5. HTTP: production `next start`, NextAuth sign-in, admin list pages
//      render with our test records visible.
//
// What it deliberately skips:
//   - Email sending. We exercise `@vercel/blob` + Prisma directly rather than
//     invoking the Server Action, so `sendApplication*` is never called.
//
// Run:
//   pnpm build      # admin HTTP checks need a production build
//   node --test tests/form-uploads.test.mjs

import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { spawn, spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import { setTimeout as sleep } from "node:timers/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

import { config as loadEnv } from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.join(__dirname, "..");
loadEnv({ path: path.join(repoRoot, ".env.local") });

// Dynamic-import the libraries that need POSTGRES_* / BLOB_READ_WRITE_TOKEN
// to be present at module-evaluation time.
const { PrismaClient } = await import("@prisma/client");
const { put, del } = await import("@vercel/blob");

const require = createRequire(import.meta.url);

const PORT = process.env.TEST_PORT ?? "3457"; // routes.test.mjs uses 3456
const BASE = `http://127.0.0.1:${PORT}`;
const START_TIMEOUT_MS = 60_000;
const RUN_TAG = `t${Date.now()}${Math.floor(Math.random() * 1e4)}`;
const TEST_EMAIL_DOMAIN = "form-upload-test.invalid";

const prisma = new PrismaClient();

// Track everything created so we can clean up even on partial failure.
const createdAppIds = [];
const createdPartnerAppIds = [];
const uploadedBlobUrls = [];

let server = null;
let adminCookies = ""; // populated by signIn() if admin creds are available

// ---------- helpers ----------

function killTree(pid) {
  if (!pid) return;
  if (process.platform === "win32") {
    spawnSync("taskkill", ["/pid", String(pid), "/f", "/t"], { stdio: "ignore" });
  } else {
    try { process.kill(-pid, "SIGKILL"); } catch {}
    try { process.kill(pid, "SIGKILL"); } catch {}
  }
}

async function waitForReady() {
  const deadline = Date.now() + START_TIMEOUT_MS;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(BASE + "/", { redirect: "manual" });
      if (res.status < 500) return;
    } catch {}
    await sleep(500);
  }
  throw new Error(`next start did not become ready within ${START_TIMEOUT_MS}ms`);
}

function makePdf(contentHint = "test") {
  // Validation only inspects MIME type and extension; the bytes can be anything.
  return Buffer.from(`%PDF-1.4\n% form-uploads.test.mjs ${contentHint}\n%%EOF\n`);
}

function makeFile(buffer, name, type) {
  // Node 20+ exposes File globally. We mirror what the browser FormData would do.
  return new File([buffer], name, { type });
}

function mergeSetCookies(existing, setCookieHeaders) {
  // Parse existing "k=v; k2=v2" header and overlay any newly Set-Cookie values
  // (keeping only the name=value portion, dropping attrs).
  const jar = new Map();
  if (existing) {
    for (const part of existing.split("; ")) {
      const [name, ...rest] = part.split("=");
      if (name) jar.set(name, rest.join("="));
    }
  }
  for (const sc of setCookieHeaders) {
    const first = sc.split(";")[0];
    const eq = first.indexOf("=");
    if (eq === -1) continue;
    const name = first.slice(0, eq).trim();
    const value = first.slice(eq + 1).trim();
    if (!name) continue;
    if (value === "" || value === "deleted") {
      jar.delete(name);
    } else {
      jar.set(name, value);
    }
  }
  return Array.from(jar.entries()).map(([k, v]) => `${k}=${v}`).join("; ");
}

async function signIn(email, password) {
  // Step 1: fetch the CSRF token + cookie pair.
  const csrfRes = await fetch(`${BASE}/api/auth/csrf`);
  const csrfSet = csrfRes.headers.getSetCookie?.() ?? [];
  let cookies = mergeSetCookies("", csrfSet);
  const { csrfToken } = await csrfRes.json();

  // Step 2: POST credentials. NextAuth v5 returns 302 with the session cookie set.
  const signinRes = await fetch(`${BASE}/api/auth/callback/credentials`, {
    method: "POST",
    redirect: "manual",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie: cookies,
    },
    body: new URLSearchParams({
      csrfToken,
      email,
      password,
      callbackUrl: `${BASE}/admin`,
      json: "true",
    }).toString(),
  });
  const signSet = signinRes.headers.getSetCookie?.() ?? [];
  cookies = mergeSetCookies(cookies, signSet);

  // NextAuth v5 names its session cookie `authjs.session-token` over HTTP.
  if (!cookies.includes("authjs.session-token=")) {
    throw new Error(
      `sign-in did not produce a session cookie (status ${signinRes.status}, cookies: ${cookies})`,
    );
  }
  return cookies;
}

async function getAuthed(pathname) {
  const res = await fetch(BASE + pathname, {
    headers: adminCookies ? { Cookie: adminCookies } : {},
    redirect: "manual",
  });
  const html = await res.text();
  return { status: res.status, html };
}

// ---------- lifecycle ----------

before(async () => {
  assert.ok(process.env.BLOB_READ_WRITE_TOKEN, "BLOB_READ_WRITE_TOKEN missing in .env.local");
  assert.ok(process.env.POSTGRES_PRISMA_URL, "POSTGRES_PRISMA_URL missing in .env.local");

  const nextBin = require.resolve("next/dist/bin/next");
  server = spawn(process.execPath, [nextBin, "start", "-p", PORT], {
    stdio: ["ignore", "pipe", "pipe"],
    env: {
      ...process.env,
      NODE_ENV: "production",
      // NextAuth v5 refuses callbacks unless AUTH_URL is set or AUTH_TRUST_HOST
      // is opted in. We're running over plain HTTP on 127.0.0.1, so opt in here.
      AUTH_TRUST_HOST: process.env.AUTH_TRUST_HOST ?? "true",
      AUTH_URL: process.env.AUTH_URL ?? `${BASE}/api/auth`,
    },
    detached: process.platform !== "win32",
    cwd: repoRoot,
  });
  // Surface server stderr so failed admin sign-in / 500s aren't silent.
  const serverErrors = [];
  server.stdout?.on("data", () => {});
  server.stderr?.on("data", (chunk) => {
    serverErrors.push(chunk.toString());
    if (serverErrors.length > 200) serverErrors.shift();
  });
  // Expose for diagnostics.
  globalThis.__serverErrors = serverErrors;
  await waitForReady();

  // Best-effort admin sign-in. If creds are missing or wrong we still run the
  // Prisma-level checks; HTTP admin assertions will be skipped.
  const adminEmail = process.env.INITIAL_ADMIN_EMAIL;
  const adminPass = process.env.INITIAL_ADMIN_PASSWORD;
  if (adminEmail && adminPass) {
    try {
      adminCookies = await signIn(adminEmail, adminPass);
    } catch (e) {
      console.warn("[form-uploads] admin sign-in failed; HTTP admin checks will be skipped:", e.message);
    }
  } else {
    console.warn("[form-uploads] INITIAL_ADMIN_EMAIL/PASSWORD not set; HTTP admin checks will be skipped");
  }
});

after(async () => {
  // Delete DB rows first so cascading dashboards don't link to soon-deleted blobs.
  for (const id of createdAppIds) {
    try { await prisma.application.delete({ where: { id } }); } catch {}
  }
  for (const id of createdPartnerAppIds) {
    try { await prisma.partnerApplication.delete({ where: { id } }); } catch {}
  }
  for (const url of uploadedBlobUrls) {
    try { await del(url); } catch {}
  }
  await prisma.$disconnect();
  if (server) killTree(server.pid);
});

// ---------- scenario 1: job application with resume upload ----------

test("job application: resume uploads to Vercel Blob and Application row is created", async () => {
  const resumeBytes = makePdf("resume");
  const filename = "test-resume.pdf";
  const blob = await put(
    `resumes/${Date.now()}-${filename}`,
    resumeBytes,
    {
      access: "private", // matches the access mode the server action's uploadBlob uses (private store)
      contentType: "application/pdf",
      addRandomSuffix: true,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    },
  );
  uploadedBlobUrls.push(blob.url);
  assert.ok(/^https:\/\//.test(blob.url), "blob url should be https");

  const email = `applicant.${RUN_TAG}@${TEST_EMAIL_DOMAIN}`;
  const app = await prisma.application.create({
    data: {
      jobSlug: "warehouse-associate",
      jobTitle: "Warehouse Associate",
      firstName: "Form",
      lastName: `Test-${RUN_TAG}`,
      email,
      phone: "555-010-0001",
      experience: "Five years stocking, picking, and forklift operations in a cold-chain warehouse.",
      resumeUrl: blob.url,
      resumeFilename: filename,
      resumeSize: resumeBytes.length,
      resumeMimeType: "application/pdf",
      branchSlug: "SAN_DIEGO",
    },
  });
  createdAppIds.push(app.id);

  // Admin list page runs this exact query (orderBy createdAt desc, take 200).
  const visible = await prisma.application.findMany({
    where: { id: app.id },
    orderBy: { createdAt: "desc" },
  });
  assert.equal(visible.length, 1, "Application should be queryable by admin list");
  assert.equal(visible[0].email, email);
  assert.equal(visible[0].resumeUrl, blob.url);
  assert.equal(visible[0].resumeFilename, filename);
  assert.equal(visible[0].resumeMimeType, "application/pdf");
  assert.equal(visible[0].resumeSize, resumeBytes.length);
  assert.equal(visible[0].status, "NEW");
  assert.equal(visible[0].branchSlug, "SAN_DIEGO");

  // Admin detail page calls findUnique.
  const detail = await prisma.application.findUnique({ where: { id: app.id } });
  assert.ok(detail, "Application detail query should succeed");
  assert.equal(detail.jobTitle, "Warehouse Associate");
});

// ---------- scenario 2: vendor partner application with catalog upload ----------

test("partner (vendor): product catalog uploads and PartnerApplication row is created", async () => {
  const catalogBytes = makePdf("catalog");
  const filename = "test-catalog.pdf";
  const blob = await put(
    `catalogs/${Date.now()}-${filename}`,
    catalogBytes,
    {
      access: "private", // matches the access mode the server action's uploadBlob uses (private store)
      contentType: "application/pdf",
      addRandomSuffix: true,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    },
  );
  uploadedBlobUrls.push(blob.url);
  assert.ok(/^https:\/\//.test(blob.url));

  const email = `vendor.${RUN_TAG}@${TEST_EMAIL_DOMAIN}`;
  const row = await prisma.partnerApplication.create({
    data: {
      interestType: "VENDOR",
      firstName: "Vendor",
      lastName: `Test-${RUN_TAG}`,
      email,
      businessName: `Vendor Test Co ${RUN_TAG}`,
      cellPhone: "555-010-0002",
      businessPhone: "555-010-0003",
      address: "123 Test Street",
      city: "San Diego",
      state: "CA",
      zipCode: "92101",
      howDidYouFind: "Referral",
      productCatalogUrl: blob.url,
      productCatalogFilename: filename,
      productCatalogSize: catalogBytes.length,
      productCatalogMimeType: "application/pdf",
    },
  });
  createdPartnerAppIds.push(row.id);

  const visible = await prisma.partnerApplication.findMany({
    where: { id: row.id },
    orderBy: { createdAt: "desc" },
  });
  assert.equal(visible.length, 1);
  assert.equal(visible[0].interestType, "VENDOR");
  assert.equal(visible[0].productCatalogUrl, blob.url);
  assert.equal(visible[0].productCatalogFilename, filename);
  assert.equal(visible[0].productCatalogSize, catalogBytes.length);
  assert.equal(visible[0].productCatalogMimeType, "application/pdf");
  assert.equal(visible[0].creditAgreedAt, null, "vendor without credit opt-in should not have creditAgreedAt");
});

// ---------- scenario 3: buyer partner application with credit fields ----------

test("partner (buyer + credit): credit fields persist on PartnerApplication", async () => {
  const email = `buyer.${RUN_TAG}@${TEST_EMAIL_DOMAIN}`;
  const creditAgreedAt = new Date();
  const row = await prisma.partnerApplication.create({
    data: {
      interestType: "BUYER",
      firstName: "Buyer",
      lastName: `Test-${RUN_TAG}`,
      email,
      businessName: `Buyer Test Co ${RUN_TAG}`,
      cellPhone: "555-010-0004",
      address: "456 Buyer Avenue",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90001",
      howDidYouFind: "Google",
      businessLegalName: `Buyer Test Co LLC ${RUN_TAG}`,
      ein: "12-3456789",
      yearsInBusiness: 7,
      businessType: "llc",
      estimatedMonthlyPurchases: "$25,000",
      bankName: "First National Test Bank",
      bankAccountLast4: "4321",
      tradeReference1Name: "Acme Supply",
      tradeReference1Phone: "555-010-0005",
      tradeReference2Name: "Beta Distributors",
      tradeReference2Phone: "555-010-0006",
      signerName: "Buyer Signer",
      signerTitle: "Owner",
      creditAgreedAt,
    },
  });
  createdPartnerAppIds.push(row.id);

  const detail = await prisma.partnerApplication.findUnique({ where: { id: row.id } });
  assert.ok(detail);
  assert.equal(detail.interestType, "BUYER");
  assert.equal(detail.businessLegalName, `Buyer Test Co LLC ${RUN_TAG}`);
  assert.equal(detail.ein, "12-3456789");
  assert.equal(detail.yearsInBusiness, 7);
  assert.equal(detail.businessType, "llc");
  assert.equal(detail.bankAccountLast4, "4321");
  assert.equal(detail.signerTitle, "Owner");
  assert.ok(detail.creditAgreedAt, "creditAgreedAt should be set for buyers who opt in");
  assert.equal(detail.productCatalogUrl, null, "buyer should not have a catalog URL");
});

// ---------- scenario 4: HTTP admin pages render the records ----------

test("HTTP: /admin redirects unauthenticated requests to login", async () => {
  const res = await fetch(BASE + "/admin/applications", { redirect: "manual" });
  // Either 302/307 to /admin/login, or middleware-served redirect HTML.
  const isRedirect = res.status >= 300 && res.status < 400;
  const location = res.headers.get("location") ?? "";
  assert.ok(
    isRedirect && /\/admin\/login/.test(location),
    `expected redirect to /admin/login, got ${res.status} ${location}`,
  );
});

test("HTTP: admin applications list renders our test resume row", async (t) => {
  if (!adminCookies) {
    t.skip("admin sign-in unavailable");
    return;
  }
  const { status, html } = await getAuthed("/admin/applications");
  assert.equal(status, 200, "admin list should return 200 when authed");
  // React 18 SSR renders `{firstName} {lastName}` as separate text nodes
  // with hydration markers (`<!-- -->`) between them, so we anchor on the
  // unique RUN_TAG segment of the last name rather than the joined string.
  assert.match(html, new RegExp(`Test-${RUN_TAG}`), "applicant name (with unique tag) should appear in list");
  assert.match(html, new RegExp(`applicant\\.${RUN_TAG}@${TEST_EMAIL_DOMAIN.replace(/\./g, "\\.")}`));
  // List page renders "Warehouse Associate" as the job title for our row.
  assert.match(html, /Warehouse Associate/);
  // The list links to a download route for rows with a resume.
  assert.match(html, /\/admin\/applications\/[^"]+\/resume/);
});

test("HTTP: admin partner-applications list renders both vendor and buyer rows", async (t) => {
  if (!adminCookies) {
    t.skip("admin sign-in unavailable");
    return;
  }
  const { status, html } = await getAuthed("/admin/partner-applications");
  assert.equal(status, 200);
  // Business-name columns concatenate without hydration markers, so we anchor
  // the row-presence assertions on those (uniquely tagged) strings.
  assert.match(html, new RegExp(`Vendor Test Co ${RUN_TAG}`), "vendor row business name should appear");
  assert.match(html, new RegExp(`Buyer Test Co ${RUN_TAG}`), "buyer row business name should appear");
  // The applicant-name cells render as `Vendor<!-- --> <!-- -->Test-${tag}`
  // — assert on the tag fragment, which only exists on these test rows.
  assert.match(html, new RegExp(`Test-${RUN_TAG}`));
  // List page surfaces a "Catalog" badge for vendor rows with an upload,
  // and a "Credit" badge for buyer rows that submitted credit fields.
  assert.match(html, /Catalog/);
  assert.match(html, /Credit/);
});

test("HTTP: admin partner-application detail renders credit + catalog metadata", async (t) => {
  if (!adminCookies) {
    t.skip("admin sign-in unavailable");
    return;
  }
  // Pull the IDs we created in earlier scenarios.
  const vendor = await prisma.partnerApplication.findFirst({
    where: { email: `vendor.${RUN_TAG}@${TEST_EMAIL_DOMAIN}` },
  });
  const buyer = await prisma.partnerApplication.findFirst({
    where: { email: `buyer.${RUN_TAG}@${TEST_EMAIL_DOMAIN}` },
  });
  assert.ok(vendor, "vendor row should exist for detail check");
  assert.ok(buyer, "buyer row should exist for detail check");

  const vendorPage = await getAuthed(`/admin/partner-applications/${vendor.id}`);
  assert.equal(vendorPage.status, 200);
  assert.match(vendorPage.html, /test-catalog\.pdf/, "vendor detail should show catalog filename");
  assert.match(vendorPage.html, /catalog/i);

  const buyerPage = await getAuthed(`/admin/partner-applications/${buyer.id}`);
  assert.equal(buyerPage.status, 200);
  assert.match(buyerPage.html, /First National Test Bank/, "buyer detail should show bank name");
  // EIN is masked on the detail page (••-•••6789), so we assert the last 4 digits show through.
  assert.match(buyerPage.html, /6789/);
  assert.match(buyerPage.html, /Buyer Signer/);
});
