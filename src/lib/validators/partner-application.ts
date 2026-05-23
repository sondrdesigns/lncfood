import { z } from "zod";

const phone = z
  .string()
  .trim()
  .min(7, "Enter a valid phone number")
  .max(40)
  .regex(/^[0-9+()\-\s.]+$/, "Phone may only contain digits, spaces, and + ( ) - .");

export const partnerApplicationInputSchema = z.object({
  interestType: z.enum(["BUYER", "VENDOR"]),
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required")
    .max(80)
    .regex(/^[^\r\n]+$/, "First name must be on a single line"),
  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required")
    .max(80)
    .regex(/^[^\r\n]+$/, "Last name must be on a single line"),
  email: z.string().trim().toLowerCase().email("Enter a valid email address"),
  businessName: z.string().trim().min(1, "Business name is required").max(160),
  cellPhone: phone,
  businessPhone: phone.optional(),
  address: z.string().trim().min(1, "Address is required").max(200),
  city: z.string().trim().min(1, "City is required").max(120),
  state: z.string().trim().min(2).max(40),
  zipCode: z
    .string()
    .trim()
    .min(5, "Enter a valid ZIP")
    .max(15)
    .regex(/^[0-9A-Za-z\- ]+$/, "ZIP may only contain digits, letters, spaces, and -"),
  howDidYouFind: z.string().trim().min(1, "Please select an option").max(120),
});

export type PartnerApplicationInput = z.infer<typeof partnerApplicationInputSchema>;

// Credit application fields. Submitted alongside the partner intake when the
// applicant opts in to also request net 30 credit terms.
export const creditApplicationFieldsSchema = z.object({
  businessLegalName: z.string().trim().min(1, "Legal name is required").max(200),
  dba: z.string().trim().max(200).optional(),
  ein: z
    .string()
    .trim()
    .min(9, "Enter a valid EIN")
    .max(11)
    .regex(/^[0-9\-]+$/, "EIN may only contain digits and -"),
  yearsInBusiness: z.number().int().min(0, "Enter years in business").max(200),
  businessType: z.enum(["llc", "corporation", "s-corp", "partnership", "sole-prop"]),
  estimatedMonthlyPurchases: z.string().trim().min(1, "Required").max(80),
  bankName: z.string().trim().min(1, "Bank name is required").max(160),
  bankAccountLast4: z.string().trim().regex(/^\d{4}$/, "Enter the last 4 digits"),
  tradeReference1Name: z.string().trim().min(1, "Required").max(160),
  tradeReference1Phone: phone,
  tradeReference2Name: z.string().trim().min(1, "Required").max(160),
  tradeReference2Phone: phone,
  signerName: z.string().trim().min(1, "Required").max(160),
  signerTitle: z.string().trim().min(1, "Required").max(120),
});

export type CreditApplicationFields = z.infer<typeof creditApplicationFieldsSchema>;

export const partnerWithCreditSchema = partnerApplicationInputSchema.extend({
  credit: creditApplicationFieldsSchema.optional(),
});

export type PartnerWithCreditInput = z.infer<typeof partnerWithCreditSchema>;
