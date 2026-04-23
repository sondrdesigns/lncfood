import { spawn, spawnSync } from "node:child_process";
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { setTimeout as sleep } from "node:timers/promises";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const PORT = process.env.TEST_PORT ?? "3456";
const BASE = `http://127.0.0.1:${PORT}`;
const START_TIMEOUT_MS = 60_000;

let server;

async function waitForReady() {
  const deadline = Date.now() + START_TIMEOUT_MS;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(BASE + "/", { redirect: "manual" });
      if (res.status < 500) return;
    } catch {
      // not yet
    }
    await sleep(500);
  }
  throw new Error(`next start did not become ready within ${START_TIMEOUT_MS}ms`);
}

function killTree(pid) {
  if (!pid) return;
  if (process.platform === "win32") {
    spawnSync("taskkill", ["/pid", String(pid), "/f", "/t"], { stdio: "ignore" });
  } else {
    try { process.kill(-pid, "SIGKILL"); } catch {}
    try { process.kill(pid, "SIGKILL"); } catch {}
  }
}

before(async () => {
  // Invoke Next's CLI directly (no shell, no pnpm wrapper) so we can kill it cleanly.
  const nextBin = require.resolve("next/dist/bin/next");
  server = spawn(process.execPath, [nextBin, "start", "-p", PORT], {
    stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env, NODE_ENV: "production" },
    detached: process.platform !== "win32",
  });
  server.stdout?.on("data", () => {});
  server.stderr?.on("data", () => {});
  await waitForReady();
});

after(() => {
  if (server) killTree(server.pid);
});

async function getHtml(path) {
  const res = await fetch(BASE + path);
  const html = await res.text();
  return { status: res.status, html };
}

// ---------- route reachability ----------

test("GET / returns 200 with hero and CTAs", async () => {
  const { status, html } = await getHtml("/");
  assert.equal(status, 200);
  assert.match(html, /Your Trusted Asian Food Distribution Partner/);
  assert.match(html, /Partner With Us/);
  assert.match(html, /Browse Catalog/);
});

test("GET /about returns 200 and has Our Story", async () => {
  const { status, html } = await getHtml("/about");
  assert.equal(status, 200);
  assert.match(html, /About Us/);
  assert.match(html, /Our Story/);
});

test("GET /products returns 200 and lists categories", async () => {
  const { status, html } = await getHtml("/products");
  assert.equal(status, 200);
  assert.match(html, /Our Products/);
  assert.match(html, /Fruits (?:&|&amp;) Vegetables/);
  assert.match(html, /Dry Grocery/);
});

test("GET /careers returns 200 and lists jobs", async () => {
  const { status, html } = await getHtml("/careers");
  assert.equal(status, 200);
  assert.match(html, /Join Our Team/);
  assert.match(html, /Warehouse Associate/);
});

test("GET /partner-application returns 200 and has the form", async () => {
  const { status, html } = await getHtml("/partner-application");
  assert.equal(status, 200);
  assert.match(html, /Let(?:'|&#x27;|&apos;)s Partner Up/);
  assert.match(html, /<form/);
  assert.match(html, /name="firstName"/);
  assert.match(html, /name="businessName"/);
});

test("GET /__does_not_exist__ returns 404 with custom not-found", async () => {
  const { status, html } = await getHtml("/__does_not_exist__");
  assert.equal(status, 404);
  assert.match(html, /Page not found/);
  assert.match(html, /Return home/);
});

// ---------- global chrome ----------

test("layout renders Navigation with all routes", async () => {
  const { html } = await getHtml("/");
  for (const label of [
    "Home",
    "About Us",
    "Products",
    "Careers",
    "Partner Application",
  ]) {
    assert.match(html, new RegExp(label), `nav should include "${label}"`);
  }
  assert.match(html, /aria-label="Open menu"/, "mobile menu toggle should be present");
});

test("layout renders Footer with contact info", async () => {
  const { html } = await getHtml("/");
  assert.match(html, /626-465-7855/);
  assert.match(html, /info@lncfood\.com/);
  assert.match(html, /All rights reserved/);
});

// ---------- regression guards for the Codex-era bugs we fixed ----------

test("no <a><button> nesting in rendered HTML (invalid HTML regression)", async () => {
  const paths = ["/", "/careers", "/about", "/products", "/partner-application"];
  for (const p of paths) {
    const { html } = await getHtml(p);
    // permissive: allow arbitrary attributes between <a and >, then forbid a direct <button> child.
    const nested = /<a\b[^>]*>\s*<button\b/i.test(html);
    assert.equal(nested, false, `page ${p} must not render <a><button>`);
  }
});

test("Footer social buttons are <button>, not empty-href <a>", async () => {
  const { html } = await getHtml("/");
  // the old Codex output had <a href="#"> with aria-label="Facebook"; regression guard:
  assert.ok(
    !/<a[^>]+href=['"]#['"][^>]*aria-label=['"]Facebook['"]/i.test(html),
    "Facebook link should not be an empty-href anchor",
  );
  assert.match(html, /aria-label="Facebook \(coming soon\)"/);
});

test("viewport meta tag is emitted", async () => {
  const { html } = await getHtml("/");
  assert.match(html, /<meta\s+name="viewport"/i);
});

test("fonts served via next/font (no external googleapis @import in HTML head)", async () => {
  const { html } = await getHtml("/");
  assert.ok(
    !/fonts\.googleapis\.com\/css2\?family=DM\+Sans/i.test(html),
    "Google Fonts should be self-hosted via next/font, not loaded from googleapis in the HTML",
  );
});

test("active nav link has aria-current=page", async () => {
  const { html } = await getHtml("/about");
  assert.match(
    html,
    /href="\/about"[^>]*aria-current="page"|aria-current="page"[^>]*href="\/about"/,
    "active nav link should carry aria-current=page",
  );
});
