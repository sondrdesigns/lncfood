/**
 * Smoke-test the email-sending functions in src/lib/email.ts against the
 * configured Resend account. Generates fake but well-shaped payloads and
 * calls each exported send function once.
 *
 * Run with: pnpm test:emails
 *
 * Notes:
 *   - All emails (admin notifications + applicant confirmations) are routed to
 *     TEST_RECIPIENT (default: aizen@sondrdesigns.com) so a single inbox can
 *     verify every template. Override with TEST_EMAIL_RECIPIENT env var.
 *   - EMAIL_NOTIFY_TO is overridden in-process BEFORE importing email.ts so the
 *     module-load capture of `NOTIFY_TO` picks up the test recipient.
 *   - Requires RESEND_API_KEY in .env.local. If missing, each case reports
 *     SKIPPED instead of failing.
 *   - Resend in sandbox mode (unverified sending domain) only delivers to the
 *     account-owner address. If sondrdesigns.com is not yet verified in Resend,
 *     delivery to aizen@sondrdesigns.com will be rejected by Resend regardless
 *     of what this script does.
 */

const TEST_RECIPIENT = process.env.TEST_EMAIL_RECIPIENT ?? "aizen@sondrdesigns.com";

// Override NOTIFY_TO before importing email.ts so admin-side emails land in the
// same inbox as the applicant-side confirmations.
process.env.EMAIL_NOTIFY_TO = TEST_RECIPIENT;

async function loadEmailModule() {
  return import("../src/lib/email");
}

const stamp = new Date().toISOString().replace(/[:.]/g, "-");
const rand = () => Math.random().toString(36).slice(2, 8);

const fakeBranch = {
  city: "San Jose",
  address: "1309 Old Bayshore Hwy, San Jose, CA 95112",
  phone: "(408) 998-8211",
};

const fakeApplication = {
  firstName: `Test-${rand()}`,
  lastName: `User-${rand()}`,
  email: TEST_RECIPIENT,
  phone: "(555) 123-4567",
  experience: `Random experience text generated at ${stamp}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  jobTitle: "Warehouse Associate",
  jobSlug: "warehouse-associate",
  branchInfo: fakeBranch,
  resume: {
    url: "https://example.com/fake-resume.pdf",
    filename: "fake-resume.pdf",
    size: 123_456,
    mimeType: "application/pdf",
  },
};

const fakePartnerVendorWithCatalog = {
  interestType: "VENDOR" as const,
  firstName: `Partner-${rand()}`,
  lastName: `Vendor-${rand()}`,
  email: TEST_RECIPIENT,
  businessName: `ACME Foods ${rand()}`,
  cellPhone: "(555) 222-3333",
  businessPhone: "(555) 444-5555",
  address: "123 Test Lane",
  city: "Los Angeles",
  state: "CA",
  zipCode: "90001",
  howDidYouFind: "google",
  productCatalog: {
    filename: "acme-catalog-2026.pdf",
    adminId: "test-id-vendor",
  },
  credit: null,
};

const fakePartnerBuyerWithCredit = {
  interestType: "BUYER" as const,
  firstName: `Partner-${rand()}`,
  lastName: `Buyer-${rand()}`,
  email: TEST_RECIPIENT,
  businessName: `Restaurant ${rand()}`,
  cellPhone: "(555) 222-3333",
  businessPhone: "(555) 444-5555",
  address: "456 Buyer Blvd",
  city: "San Jose",
  state: "CA",
  zipCode: "95112",
  howDidYouFind: "referral",
  productCatalog: null,
  credit: {
    businessLegalName: `Legal Name ${rand()}, LLC`,
    dba: `DBA ${rand()}`,
    ein: "12-3456789",
    yearsInBusiness: 7,
    businessType: "llc",
    estimatedMonthlyPurchases: "$10,000 - $25,000",
    bankName: "Test Bank",
    bankAccountLast4: "1234",
    tradeReference1Name: "Reference One",
    tradeReference1Phone: "(555) 111-1111",
    tradeReference2Name: "Reference Two",
    tradeReference2Phone: "(555) 222-2222",
    signerName: "Jane Doe",
    signerTitle: "CEO",
  },
};

type Case = { label: string; run: () => Promise<unknown> };

async function buildCases(): Promise<Case[]> {
  const {
    sendApplicantConfirmationEmail,
    sendApplicationNotificationEmail,
    sendPartnerApplicationNotificationEmail,
    sendPartnerApplicantConfirmationEmail,
  } = await loadEmailModule();

  return [
    {
      label: "careers: internal notification (admin)",
      run: () => sendApplicationNotificationEmail(fakeApplication),
    },
    {
      label: "careers: applicant confirmation",
      run: () => sendApplicantConfirmationEmail(fakeApplication),
    },
    {
      label: "partner: vendor + catalog (admin)",
      run: () => sendPartnerApplicationNotificationEmail(fakePartnerVendorWithCatalog),
    },
    {
      label: "partner: buyer + credit (admin)",
      run: () => sendPartnerApplicationNotificationEmail(fakePartnerBuyerWithCredit),
    },
    {
      label: "partner: vendor applicant confirmation",
      run: () =>
        sendPartnerApplicantConfirmationEmail({
          firstName: fakePartnerVendorWithCatalog.firstName,
          email: TEST_RECIPIENT,
          interestType: "VENDOR",
          businessName: fakePartnerVendorWithCatalog.businessName,
          hasCredit: false,
          hasCatalog: true,
        }),
    },
    {
      label: "partner: buyer applicant confirmation",
      run: () =>
        sendPartnerApplicantConfirmationEmail({
          firstName: fakePartnerBuyerWithCredit.firstName,
          email: TEST_RECIPIENT,
          interestType: "BUYER",
          businessName: fakePartnerBuyerWithCredit.businessName,
          hasCredit: true,
          hasCatalog: false,
        }),
    },
  ];
}

async function main() {
  console.log(`Email smoke test — run ${stamp}`);
  console.log(`RESEND_API_KEY:         ${process.env.RESEND_API_KEY ? "set" : "MISSING"}`);
  console.log(`EMAIL_FROM:             ${process.env.EMAIL_FROM ?? "(default)"}`);
  console.log(`EMAIL_NOTIFY_TO:        ${process.env.EMAIL_NOTIFY_TO} (forced for test)`);
  console.log(`TEST_RECIPIENT:         ${TEST_RECIPIENT}`);
  console.log(
    `\nAll 6 emails (admin notifications + applicant confirmations) will be\n` +
      `routed to ${TEST_RECIPIENT}. Check that inbox for delivery.\n`,
  );

  const cases = await buildCases();
  let failures = 0;
  let skipped = 0;

  for (const c of cases) {
    process.stdout.write(`  ${c.label.padEnd(46)} `);
    try {
      const result = (await c.run()) as { id?: string; skipped?: boolean };
      if (result.skipped) {
        skipped++;
        console.log("SKIPPED (no RESEND_API_KEY)");
      } else {
        console.log(`OK  id=${result.id ?? "(none)"}`);
      }
    } catch (err) {
      failures++;
      const message = err instanceof Error ? err.message : String(err);
      console.log(`FAIL ${message}`);
    }
  }

  console.log(
    `\nDone. ${failures} failed, ${skipped} skipped, ${cases.length - failures - skipped} sent.`,
  );
  if (failures === 0 && skipped === 0) {
    console.log(`Check ${TEST_RECIPIENT} for 6 new messages.`);
  }
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((err) => {
  console.error("Unhandled error:", err);
  process.exit(2);
});
