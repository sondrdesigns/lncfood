import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const FROM = process.env.EMAIL_FROM ?? "L&C Careers <studio@sondrdesigns.com>";

// EMAIL_NOTIFY_TO accepts either a single address or a comma-separated list,
// so admin notifications can fan out to multiple inboxes (e.g. client + dev).
function parseRecipients(raw: string): string | string[] {
  const list = raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return list.length > 1 ? list : (list[0] ?? "");
}
const NOTIFY_TO = parseRecipients(process.env.EMAIL_NOTIFY_TO ?? "aizen@sondrdesigns.com");

const resend = resendApiKey ? new Resend(resendApiKey) : null;

type SendArgs = {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
};

async function send({ to, subject, html, replyTo }: SendArgs) {
  if (!resend) {
    console.warn(
      "[email] RESEND_API_KEY not set — skipping email send.",
      JSON.stringify({ to, subject }),
    );
    return { skipped: true as const };
  }
  const { data, error } = await resend.emails.send({
    from: FROM,
    to,
    subject,
    html,
    replyTo,
  });
  if (error) {
    console.error("[email] send failed", error);
    throw new Error(error.message ?? "Email send failed");
  }
  return { id: data?.id, skipped: false as const };
}

const escape = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const nl2br = (s: string) => escape(s).replace(/\n/g, "<br>");

type BranchInfo = {
  city: string;
  address: string;
  phone: string;
} | null;

type Application = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  experience: string;
  jobTitle?: string | null;
  jobSlug?: string | null;
  branchInfo?: BranchInfo;
  resume?: {
    url: string;
    filename: string;
    size: number;
    mimeType: string;
  } | null;
};

export async function sendApplicationNotificationEmail(app: Application) {
  const fullName = `${app.firstName} ${app.lastName}`.trim();
  const role = app.jobTitle ?? "General application";
  const resume = app.resume ?? null;
  const resumeRow = resume
    ? `<tr><td style="padding:8px 0; color:#666;">Resume</td><td style="padding:8px 0;"><a href="${escape(resume.url)}">${escape(resume.filename)}</a> <span style="color:#999;">(${(resume.size / 1024).toFixed(0)} KB)</span></td></tr>`
    : "";
  const branchRow = app.branchInfo
    ? `<tr><td style="padding:8px 0; color:#666;">Branch</td><td style="padding:8px 0;">${escape(`L&C ${app.branchInfo.city} — ${app.branchInfo.address}`)}</td></tr>`
    : "";
  const html = `
    <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; max-width: 640px; margin: 0 auto; color: #111;">
      <h1 style="font-size: 22px; margin: 0 0 16px;">New job application — ${escape(role)}</h1>
      <table style="width:100%; border-collapse: collapse; font-size: 14px;">
        <tr><td style="padding:8px 0; color:#666; width: 140px;">Name</td><td style="padding:8px 0;">${escape(fullName)}</td></tr>
        <tr><td style="padding:8px 0; color:#666;">Email</td><td style="padding:8px 0;"><a href="mailto:${encodeURIComponent(app.email)}">${escape(app.email)}</a></td></tr>
        <tr><td style="padding:8px 0; color:#666;">Phone</td><td style="padding:8px 0;"><a href="tel:${encodeURIComponent(app.phone)}">${escape(app.phone)}</a></td></tr>
        <tr><td style="padding:8px 0; color:#666;">Role</td><td style="padding:8px 0;">${escape(role)}${app.jobSlug ? ` <span style="color:#999;">(${escape(app.jobSlug)})</span>` : ""}</td></tr>
        ${branchRow}
        ${resumeRow}
      </table>
      <h2 style="font-size: 16px; margin: 24px 0 8px;">Experience &amp; references</h2>
      <p style="font-size: 14px; line-height: 1.6; white-space: pre-wrap; background: #f6f6f6; padding: 16px; border-radius: 8px;">${nl2br(app.experience)}</p>
      <p style="font-size: 12px; color: #999; margin-top: 24px;">Submitted via lncfood.com careers form.</p>
    </div>
  `;
  return send({
    to: NOTIFY_TO,
    subject: `New application: ${role} — ${fullName}`,
    html,
    replyTo: app.email,
  });
}

type PartnerApplication = {
  interestType: "BUYER" | "VENDOR";
  firstName: string;
  lastName: string;
  email?: string;
  businessName: string;
  cellPhone: string;
  businessPhone?: string | null;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  howDidYouFind: string;
  productCatalog?: {
    filename: string;
    adminId: string;
  } | null;
  credit?: {
    businessLegalName: string;
    dba?: string | null;
    ein: string;
    yearsInBusiness: number;
    businessType: string;
    estimatedMonthlyPurchases: string;
    bankName: string;
    bankAccountLast4: string;
    tradeReference1Name: string;
    tradeReference1Phone: string;
    tradeReference2Name: string;
    tradeReference2Phone: string;
    signerName: string;
    signerTitle: string;
  } | null;
};

export async function sendPartnerApplicationNotificationEmail(app: PartnerApplication) {
  const fullName = `${app.firstName} ${app.lastName}`.trim();
  const interest = app.interestType === "VENDOR" ? "Potential vendor" : "Buyer / wholesale customer";
  const row = (label: string, value: string) =>
    `<tr><td style="padding:8px 0; color:#666; width: 200px;">${escape(label)}</td><td style="padding:8px 0;">${value}</td></tr>`;

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.lncfood.com";

  const partnerRows = [
    row("Interest", escape(interest)),
    row("Name", escape(fullName)),
    row("Business", escape(app.businessName)),
    app.email ? row("Email", `<a href="mailto:${encodeURIComponent(app.email)}">${escape(app.email)}</a>`) : "",
    row("Cell phone", `<a href="tel:${encodeURIComponent(app.cellPhone)}">${escape(app.cellPhone)}</a>`),
    app.businessPhone
      ? row("Business phone", `<a href="tel:${encodeURIComponent(app.businessPhone)}">${escape(app.businessPhone)}</a>`)
      : "",
    row("Address", escape(`${app.address}, ${app.city}, ${app.state} ${app.zipCode}`)),
    row("How they found us", escape(app.howDidYouFind)),
    app.productCatalog
      ? row("Product catalog", `${escape(app.productCatalog.filename)} — <a href="${escape(`${SITE_URL}/admin/partner-applications/${app.productCatalog.adminId}`)}">view in admin</a>`)
      : "",
  ].join("");

  const creditSection = app.credit
    ? `
      <h2 style="font-size: 16px; margin: 24px 0 8px;">Credit application</h2>
      <table style="width:100%; border-collapse: collapse; font-size: 14px;">
        ${row("Legal name", escape(app.credit.businessLegalName))}
        ${app.credit.dba ? row("DBA", escape(app.credit.dba)) : ""}
        ${row("EIN", escape(app.credit.ein))}
        ${row("Years in business", escape(String(app.credit.yearsInBusiness)))}
        ${row("Business type", escape(app.credit.businessType))}
        ${row("Est. monthly purchases", escape(app.credit.estimatedMonthlyPurchases))}
        ${row("Bank", escape(`${app.credit.bankName} (•••• ${app.credit.bankAccountLast4})`))}
        ${row("Trade ref 1", escape(`${app.credit.tradeReference1Name} — ${app.credit.tradeReference1Phone}`))}
        ${row("Trade ref 2", escape(`${app.credit.tradeReference2Name} — ${app.credit.tradeReference2Phone}`))}
        ${row("Signer", escape(`${app.credit.signerName}, ${app.credit.signerTitle}`))}
      </table>`
    : "";

  const html = `
    <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; max-width: 640px; margin: 0 auto; color: #111;">
      <h1 style="font-size: 22px; margin: 0 0 16px;">New partner application — ${escape(app.businessName)}</h1>
      <table style="width:100%; border-collapse: collapse; font-size: 14px;">${partnerRows}</table>
      ${creditSection}
      <p style="font-size: 12px; color: #999; margin-top: 24px;">Submitted via lncfood.com partner form${app.credit ? " (with credit application)" : ""}.</p>
    </div>
  `;

  return send({
    to: NOTIFY_TO,
    subject: `New ${app.credit ? "partner + credit" : "partner"} application: ${app.businessName} — ${fullName}`,
    html,
  });
}

export async function sendApplicantConfirmationEmail(app: Application) {
  const role = app.jobTitle ?? "your application";
  const branchLine = app.branchInfo
    ? `<p style="font-size: 15px; line-height: 1.6;">Your application is for our <strong>L&amp;C ${escape(app.branchInfo.city)}</strong> location (${escape(app.branchInfo.address)}).</p>`
    : "";
  const html = `
    <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; max-width: 560px; margin: 0 auto; color: #111;">
      <h1 style="font-size: 22px; margin: 0 0 16px; color: #2D5F3E;">Thanks for applying${app.firstName ? `, ${escape(app.firstName)}` : ""}.</h1>
      <p style="font-size: 15px; line-height: 1.6;">
        We've received your application for <strong>${escape(role)}</strong> at L&amp;C Food Distribution.
        Our team will review it and get back to you shortly.
      </p>
      ${branchLine}
      <p style="font-size: 15px; line-height: 1.6;">
        If you need to send anything else our way (resume, references, questions),
        just reply to this email — it goes straight to us.
      </p>
      <p style="font-size: 13px; color: #666; margin-top: 32px;">
        — The L&amp;C Food team<br>
        <a href="https://www.lncfood.com" style="color: #2D5F3E;">lncfood.com</a>
      </p>
    </div>
  `;
  return send({
    to: app.email,
    subject: `Thanks for applying to L&C Food Distribution`,
    html,
  });
}

type PartnerConfirmationApp = {
  firstName: string;
  email: string;
  interestType: "BUYER" | "VENDOR";
  businessName: string;
  hasCredit: boolean;
  hasCatalog: boolean;
};

export async function sendPartnerApplicantConfirmationEmail(app: PartnerConfirmationApp) {
  const interest = app.interestType === "VENDOR" ? "vendor" : "buyer";
  const attachmentsNote =
    app.hasCredit && app.hasCatalog
      ? " Your credit application and product catalog have been received."
      : app.hasCredit
        ? " Your credit application has been received."
        : app.hasCatalog
          ? " Your product catalog has been received."
          : "";

  const html = `
    <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; max-width: 560px; margin: 0 auto; color: #111;">
      <h1 style="font-size: 22px; margin: 0 0 16px; color: #2D5F3E;">Thanks for your interest${app.firstName ? `, ${escape(app.firstName)}` : ""}.</h1>
      <p style="font-size: 15px; line-height: 1.6;">
        We've received your ${escape(interest)} application from <strong>${escape(app.businessName)}</strong>.
        Our team will review it and get back to you shortly.${attachmentsNote ? escape(attachmentsNote) : ""}
      </p>
      <p style="font-size: 15px; line-height: 1.6;">
        Questions in the meantime? Just reply to this email.
      </p>
      <p style="font-size: 13px; color: #666; margin-top: 32px;">
        — The L&amp;C Food Distribution team<br>
        <a href="https://www.lncfood.com" style="color: #2D5F3E;">lncfood.com</a>
      </p>
    </div>
  `;
  return send({
    to: app.email,
    subject: `Thanks for your interest in L&C Food Distribution`,
    html,
  });
}
