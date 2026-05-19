/**
 * Smoke-test the email-sending functions in src/lib/email.ts against the
 * configured Resend account. Generates fake but well-shaped payloads and
 * calls each exported send function once.
 *
 * Run with: pnpm test:emails
 */

import {
  sendApplicantConfirmationEmail,
  sendApplicationNotificationEmail,
  sendPartnerApplicationNotificationEmail,
} from "../src/lib/email";

const stamp = new Date().toISOString().replace(/[:.]/g, "-");
const rand = () => Math.random().toString(36).slice(2, 8);

const fakeApplication = {
  firstName: `Test-${rand()}`,
  lastName: `User-${rand()}`,
  email: `applicant+${stamp}@example.com`,
  phone: "(555) 123-4567",
  experience: `Random experience text generated at ${stamp}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  jobTitle: "Warehouse Associate",
  jobSlug: "warehouse-associate",
  resume: {
    url: "https://example.com/fake-resume.pdf",
    filename: "fake-resume.pdf",
    size: 123_456,
    mimeType: "application/pdf",
  },
};

const fakePartnerOnly = {
  interestType: "VENDOR" as const,
  firstName: `Partner-${rand()}`,
  lastName: `Vendor-${rand()}`,
  businessName: `ACME Foods ${rand()}`,
  cellPhone: "(555) 222-3333",
  businessPhone: "(555) 444-5555",
  address: "123 Test Lane",
  city: "Los Angeles",
  state: "CA",
  zipCode: "90001",
  howDidYouFind: "google",
  credit: null,
};

const fakePartnerWithCredit = {
  ...fakePartnerOnly,
  interestType: "BUYER" as const,
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

const cases: Case[] = [
  {
    label: "careers: internal notification",
    run: () => sendApplicationNotificationEmail(fakeApplication),
  },
  {
    label: "careers: applicant confirmation",
    run: () => sendApplicantConfirmationEmail(fakeApplication),
  },
  {
    label: "partner: vendor only (no credit)",
    run: () => sendPartnerApplicationNotificationEmail(fakePartnerOnly),
  },
  {
    label: "partner: buyer + credit",
    run: () => sendPartnerApplicationNotificationEmail(fakePartnerWithCredit),
  },
];

async function main() {
  console.log(`Email smoke test — run ${stamp}`);
  console.log(`RESEND_API_KEY: ${process.env.RESEND_API_KEY ? "set" : "MISSING"}`);
  console.log(`EMAIL_FROM:     ${process.env.EMAIL_FROM ?? "(default)"}`);
  console.log(`EMAIL_NOTIFY_TO:${process.env.EMAIL_NOTIFY_TO ?? "(default)"}\n`);

  let failures = 0;

  for (const c of cases) {
    process.stdout.write(`  ${c.label.padEnd(40)} `);
    try {
      const result = (await c.run()) as { id?: string; skipped?: boolean };
      if (result.skipped) {
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

  console.log(`\nDone. ${failures === 0 ? "All cases succeeded." : `${failures} case(s) failed.`}`);
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((err) => {
  console.error("Unhandled error:", err);
  process.exit(2);
});
