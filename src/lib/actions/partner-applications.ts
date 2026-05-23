"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import {
  creditApplicationFieldsSchema,
  partnerApplicationInputSchema,
} from "@/lib/validators/partner-application";
import { applyApplicationRateLimit } from "@/lib/rate-limit";
import {
  sendPartnerApplicationNotificationEmail,
  sendPartnerApplicantConfirmationEmail,
} from "@/lib/email";
import { uploadBlob } from "@/lib/actions/_upload";

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

export type PartnerApplicationFormState = {
  ok?: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
};

function clientIp(): string {
  const h = headers();
  return (
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    "unknown"
  );
}

const str = (v: FormDataEntryValue | null) =>
  typeof v === "string" ? v : "";

export async function submitPartnerApplicationAction(
  _prev: PartnerApplicationFormState | undefined,
  fd: FormData,
): Promise<PartnerApplicationFormState> {
  // Honeypot — bots fill the hidden "website" field; silently succeed.
  if (str(fd.get("website")).trim() !== "") {
    return { ok: true };
  }

  const allowed = await applyApplicationRateLimit(clientIp());
  if (!allowed) {
    return { error: "Too many submissions. Please try again in a little while." };
  }

  const rawInterest = str(fd.get("interestType"));
  const interestType =
    rawInterest === "potential-vendor" || rawInterest === "VENDOR" ? "VENDOR" : "BUYER";

  const businessPhoneRaw = str(fd.get("businessPhone")).trim();

  const parsed = partnerApplicationInputSchema.safeParse({
    interestType,
    firstName: str(fd.get("firstName")),
    lastName: str(fd.get("lastName")),
    email: str(fd.get("email")),
    businessName: str(fd.get("businessName")),
    cellPhone: str(fd.get("cellPhone")),
    businessPhone: businessPhoneRaw === "" ? undefined : businessPhoneRaw,
    address: str(fd.get("address")),
    city: str(fd.get("city")),
    state: str(fd.get("state")),
    zipCode: str(fd.get("zipCode")),
    howDidYouFind: str(fd.get("howDidYouFind")),
  });

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "");
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { error: "Please fix the errors below.", fieldErrors };
  }

  // Credit application is optional. The form sets credit_optIn=1 when the
  // applicant ticked the "also apply for credit terms" toggle.
  const wantsCredit = str(fd.get("credit_optIn")) === "1";
  let creditData: Record<string, string | number | Date | null> = {};

  if (wantsCredit) {
    const yearsRaw = str(fd.get("credit_yearsInBusiness")).trim();
    const yearsParsed = yearsRaw === "" ? Number.NaN : Number(yearsRaw);

    const creditParsed = creditApplicationFieldsSchema.safeParse({
      businessLegalName: str(fd.get("credit_businessLegalName")),
      dba: str(fd.get("credit_dba")).trim() || undefined,
      ein: str(fd.get("credit_ein")),
      yearsInBusiness: Number.isFinite(yearsParsed) ? yearsParsed : Number.NaN,
      businessType: str(fd.get("credit_businessType")),
      estimatedMonthlyPurchases: str(fd.get("credit_estimatedMonthlyPurchases")),
      bankName: str(fd.get("credit_bankName")),
      bankAccountLast4: str(fd.get("credit_bankAccountLast4")),
      tradeReference1Name: str(fd.get("credit_tradeReference1Name")),
      tradeReference1Phone: str(fd.get("credit_tradeReference1Phone")),
      tradeReference2Name: str(fd.get("credit_tradeReference2Name")),
      tradeReference2Phone: str(fd.get("credit_tradeReference2Phone")),
      signerName: str(fd.get("credit_signerName")),
      signerTitle: str(fd.get("credit_signerTitle")),
    });

    if (!creditParsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of creditParsed.error.issues) {
        const key = `credit_${String(issue.path[0] ?? "")}`;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      return { error: "Please fix the credit-application fields below.", fieldErrors };
    }

    creditData = {
      businessLegalName: creditParsed.data.businessLegalName,
      dba: creditParsed.data.dba ?? null,
      ein: creditParsed.data.ein,
      yearsInBusiness: creditParsed.data.yearsInBusiness,
      businessType: creditParsed.data.businessType,
      estimatedMonthlyPurchases: creditParsed.data.estimatedMonthlyPurchases,
      bankName: creditParsed.data.bankName,
      bankAccountLast4: creditParsed.data.bankAccountLast4,
      tradeReference1Name: creditParsed.data.tradeReference1Name,
      tradeReference1Phone: creditParsed.data.tradeReference1Phone,
      tradeReference2Name: creditParsed.data.tradeReference2Name,
      tradeReference2Phone: creditParsed.data.tradeReference2Phone,
      signerName: creditParsed.data.signerName,
      signerTitle: creditParsed.data.signerTitle,
      creditAgreedAt: new Date(),
    };
  }

  // Product catalog upload — only for vendors; silently skip if interestType != VENDOR.
  type CatalogUpload = { url: string; filename: string; size: number; mimeType: string } | null;
  let catalog: CatalogUpload = null;
  if (interestType === "VENDOR") {
    const catalogRaw = fd.get("productCatalog");
    if (catalogRaw instanceof File && catalogRaw.size > 0) {
      const result = await uploadBlob(catalogRaw, "catalogs", {
        maxBytes: CATALOG_MAX_BYTES,
        allowedMime: CATALOG_ALLOWED_MIME,
        allowedExt: CATALOG_ALLOWED_EXT,
        mimeError: CATALOG_MIME_ERROR,
        fallbackName: "catalog",
      });
      if ("error" in result) {
        return {
          error: "Please fix the errors below.",
          fieldErrors: { productCatalog: result.error },
        };
      }
      catalog = result.upload;
    }
  }

  const row = await prisma.partnerApplication.create({
    data: {
      ...parsed.data,
      businessPhone: parsed.data.businessPhone ?? null,
      ...creditData,
      productCatalogUrl: catalog?.url ?? null,
      productCatalogFilename: catalog?.filename ?? null,
      productCatalogSize: catalog?.size ?? null,
      productCatalogMimeType: catalog?.mimeType ?? null,
    },
  });

  // Best-effort notification — log but don't block the response on email failure.
  try {
    const emailPromises: Promise<unknown>[] = [
      sendPartnerApplicationNotificationEmail({
        interestType: parsed.data.interestType,
        firstName: parsed.data.firstName,
        lastName: parsed.data.lastName,
        email: parsed.data.email,
        businessName: parsed.data.businessName,
        cellPhone: parsed.data.cellPhone,
        businessPhone: parsed.data.businessPhone ?? null,
        address: parsed.data.address,
        city: parsed.data.city,
        state: parsed.data.state,
        zipCode: parsed.data.zipCode,
        howDidYouFind: parsed.data.howDidYouFind,
        productCatalog: catalog
          ? { filename: catalog.filename, adminId: row.id }
          : null,
        credit: wantsCredit
          ? {
              businessLegalName: String(creditData.businessLegalName),
              dba: creditData.dba ? String(creditData.dba) : null,
              ein: String(creditData.ein),
              yearsInBusiness: Number(creditData.yearsInBusiness),
              businessType: String(creditData.businessType),
              estimatedMonthlyPurchases: String(creditData.estimatedMonthlyPurchases),
              bankName: String(creditData.bankName),
              bankAccountLast4: String(creditData.bankAccountLast4),
              tradeReference1Name: String(creditData.tradeReference1Name),
              tradeReference1Phone: String(creditData.tradeReference1Phone),
              tradeReference2Name: String(creditData.tradeReference2Name),
              tradeReference2Phone: String(creditData.tradeReference2Phone),
              signerName: String(creditData.signerName),
              signerTitle: String(creditData.signerTitle),
            }
          : null,
      }),
    ];

    // Confirmation email to applicant (requires email field, which is now required).
    emailPromises.push(
      sendPartnerApplicantConfirmationEmail({
        firstName: parsed.data.firstName,
        email: parsed.data.email,
        interestType: parsed.data.interestType,
        businessName: parsed.data.businessName,
        hasCredit: wantsCredit,
        hasCatalog: !!catalog,
      }),
    );

    await Promise.all(emailPromises);
  } catch (e) {
    console.error("[partner-applications] email send failed", e);
  }

  revalidatePath("/admin/partner-applications");

  return { ok: true };
}
