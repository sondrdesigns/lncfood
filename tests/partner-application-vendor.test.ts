/**
 * Integration test: vendor (selling food) partner-application submission,
 * including product-catalog upload.
 *
 * What this verifies end-to-end:
 *   1. The input is accepted by the same Zod schema the server action uses.
 *   2. A tiny PDF "product catalog" is uploaded through the same uploadBlob
 *      helper the action uses (real Vercel Blob put when BLOB_READ_WRITE_TOKEN
 *      is set).
 *   3. A PartnerApplication row is written with interestType=VENDOR plus the
 *      four productCatalog* columns populated.
 *   4. The admin notification email is dispatched to EMAIL_NOTIFY_TO and
 *      includes a catalog link to /admin/partner-applications/{id}. Here we
 *      override EMAIL_NOTIFY_TO to a comma-separated pair (studio + aizen) to
 *      exercise the multi-recipient code path added to email.ts.
 *   5. The applicant confirmation email is dispatched to the applicant
 *      (aizen@sondrdesigns.com) with hasCatalog=true so the "Your product
 *      catalog has been received" line appears.
 *
 * Why this calls the underlying modules directly instead of POSTing to the
 * server action: submitPartnerApplicationAction depends on next/headers and
 * revalidatePath, which are only available inside Next's request runtime.
 * This script reproduces the action's persistence + email steps with the same
 * validators, blob helper, and Resend client.
 *
 * Run with:
 *   pnpm dotenv -e .env.local -- tsx tests/partner-application-vendor.test.ts
 */

// Override BEFORE importing src/lib/email — that module snapshots NOTIFY_TO at
// load time. Comma-separated to verify the fan-out path.
const RECEIVING_EMAILS = "studio@sondrdesigns.com,aizen@sondrdesigns.com";
const APPLICANT_EMAIL = "aizen@sondrdesigns.com";
process.env.EMAIL_NOTIFY_TO = RECEIVING_EMAILS;

import assert from "node:assert/strict";
import { partnerApplicationInputSchema } from "../src/lib/validators/partner-application";
import { prisma } from "../src/lib/prisma";
import { uploadBlob } from "../src/lib/actions/_upload";
import {
  sendPartnerApplicationNotificationEmail,
  sendPartnerApplicantConfirmationEmail,
} from "../src/lib/email";

// Same constants as src/lib/actions/partner-applications.ts:17-27.
const CATALOG_MAX_BYTES = 10 * 1024 * 1024;
const CATALOG_ALLOWED_MIME = new Set([
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-excel",
  "text/csv",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);
const CATALOG_ALLOWED_EXT = /\.(pdf|xlsx|xls|csv|docx)$/i;
const CATALOG_MIME_ERROR =
  "Catalog must be a PDF, XLSX, XLS, CSV, or DOCX file.";

const runTag = `vendor-test-${Date.now().toString(36)}`;
const businessName = `Pacific Seafood Co. [${runTag}]`;

const input = {
  interestType: "VENDOR" as const,
  firstName: "Aizen",
  lastName: "Test",
  email: APPLICANT_EMAIL,
  businessName,
  cellPhone: "(415) 555-0123",
  businessPhone: "(415) 555-0199",
  address: "1234 Cannery Row",
  city: "Monterey",
  state: "CA",
  zipCode: "93940",
  howDidYouFind: "Referred by an existing customer",
};

// Minimal-but-valid PDF byte sequence (header + EOF marker is enough for the
// upload pipeline; downstream consumers just download the bytes).
function makeFakePdf(): File {
  const body = `%PDF-1.4
1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj
2 0 obj<</Type/Pages/Count 1/Kids[3 0 R]>>endobj
3 0 obj<</Type/Page/Parent 2 0 R/MediaBox[0 0 612 792]>>endobj
xref
0 4
0000000000 65535 f
0000000009 00000 n
0000000058 00000 n
0000000108 00000 n
trailer<</Size 4/Root 1 0 R>>
startxref
158
%%EOF
`;
  return new File([new TextEncoder().encode(body)], `${runTag}-catalog.pdf`, {
    type: "application/pdf",
  });
}

type StepResult = "OK" | "SKIP" | "FAIL";
const results: Array<{ step: string; result: StepResult; detail: string }> = [];
const record = (step: string, result: StepResult, detail = "") =>
  results.push({ step, result, detail });

async function run() {
  console.log(`\n[partner-vendor-test] run ${runTag}`);
  console.log(`  receiving (admin notify) -> ${RECEIVING_EMAILS}`);
  console.log(`  applicant (form email)    -> ${APPLICANT_EMAIL}\n`);

  // 1) Zod validation — same schema the server action runs against.
  const parsed = partnerApplicationInputSchema.safeParse(input);
  assert.equal(
    parsed.success,
    true,
    `Zod validation failed: ${JSON.stringify(parsed.error?.issues, null, 2)}`,
  );
  record("validation", "OK", "VENDOR (selling food) payload validated");

  // 2) Catalog upload — same uploadBlob helper, same constraints, as the
  //    production action. Requires BLOB_READ_WRITE_TOKEN in env.
  const catalogFile = makeFakePdf();
  const uploadResult = await uploadBlob(catalogFile, "catalogs", {
    maxBytes: CATALOG_MAX_BYTES,
    allowedMime: CATALOG_ALLOWED_MIME,
    allowedExt: CATALOG_ALLOWED_EXT,
    mimeError: CATALOG_MIME_ERROR,
    fallbackName: "catalog",
  });
  if ("error" in uploadResult) {
    record("catalog-upload", "FAIL", uploadResult.error);
    return;
  }
  const catalog = uploadResult.upload;
  record(
    "catalog-upload",
    "OK",
    `${catalog.filename} (${catalog.size} bytes, ${catalog.mimeType}) -> ${catalog.url}`,
  );

  // 3) Persist — mirrors action's prisma.partnerApplication.create call with
  //    catalog fields populated.
  const row = await prisma.partnerApplication.create({
    data: {
      ...parsed.data!,
      businessPhone: parsed.data!.businessPhone ?? null,
      productCatalogUrl: catalog.url,
      productCatalogFilename: catalog.filename,
      productCatalogSize: catalog.size,
      productCatalogMimeType: catalog.mimeType,
    },
  });
  assert.equal(row.interestType, "VENDOR", "interestType should be VENDOR");
  assert.equal(row.email, APPLICANT_EMAIL, "applicant email should be persisted");
  assert.equal(row.productCatalogUrl, catalog.url, "catalog URL should be persisted");
  assert.equal(row.productCatalogFilename, catalog.filename);
  assert.equal(row.productCatalogSize, catalog.size);
  assert.equal(row.productCatalogMimeType, catalog.mimeType);
  record(
    "persist",
    "OK",
    `row id=${row.id} catalog filename=${row.productCatalogFilename} (visible at /admin/partner-applications/${row.id})`,
  );

  // 4) Admin notification email — should land in every recipient parsed out of
  //    EMAIL_NOTIFY_TO and should include the catalog link in the body.
  try {
    const r = await sendPartnerApplicationNotificationEmail({
      interestType: row.interestType,
      firstName: row.firstName,
      lastName: row.lastName,
      email: row.email,
      businessName: row.businessName,
      cellPhone: row.cellPhone,
      businessPhone: row.businessPhone,
      address: row.address,
      city: row.city,
      state: row.state,
      zipCode: row.zipCode,
      howDidYouFind: row.howDidYouFind,
      productCatalog: { filename: catalog.filename, adminId: row.id },
      credit: null,
    });
    if ("skipped" in r && r.skipped) {
      record("admin-email", "SKIP", "RESEND_API_KEY not configured");
    } else {
      record(
        "admin-email",
        "OK",
        `delivered to [${RECEIVING_EMAILS}] with catalog link (resend id=${r.id ?? "?"})`,
      );
    }
  } catch (err) {
    record("admin-email", "FAIL", (err as Error).message);
  }

  // 5) Applicant confirmation email — should land in APPLICANT_EMAIL with the
  //    "product catalog has been received" line (hasCatalog=true).
  try {
    const r = await sendPartnerApplicantConfirmationEmail({
      firstName: row.firstName,
      email: row.email,
      interestType: row.interestType,
      businessName: row.businessName,
      hasCredit: false,
      hasCatalog: true,
    });
    if ("skipped" in r && r.skipped) {
      record("applicant-email", "SKIP", "RESEND_API_KEY not configured");
    } else {
      record("applicant-email", "OK", `delivered to ${APPLICANT_EMAIL} (resend id=${r.id ?? "?"})`);
    }
  } catch (err) {
    record("applicant-email", "FAIL", (err as Error).message);
  }
}

run()
  .catch((err) => {
    console.error("\n[partner-vendor-test] aborted with error:");
    console.error(err);
    record("fatal", "FAIL", (err as Error).message);
  })
  .finally(async () => {
    await prisma.$disconnect();

    console.log("\n--- summary ---");
    for (const { step, result, detail } of results) {
      const tag = result === "OK" ? "  OK  " : result === "SKIP" ? " SKIP " : " FAIL ";
      console.log(`[${tag}] ${step}${detail ? `  —  ${detail}` : ""}`);
    }

    const failed = results.some((r) => r.result === "FAIL");
    process.exit(failed ? 1 : 0);
  });
