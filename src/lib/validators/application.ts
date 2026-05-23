import { z } from "zod";
import { branchSlugEnum } from "@/lib/validators/job";

export const applicationInputSchema = z.object({
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
  email: z.string().trim().toLowerCase().email("Enter a valid email"),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number")
    .max(40)
    .regex(/^[0-9+()\-\s.]+$/, "Phone may only contain digits, spaces, and + ( ) - ."),
  experience: z
    .string()
    .trim()
    .min(20, "Tell us at least a sentence or two about your experience")
    .max(5000, "Keep this under 5000 characters"),
  jobSlug: z.string().trim().max(120).optional(),
  jobTitle: z.string().trim().max(160).optional(),
  branchSlug: branchSlugEnum.optional(),
});

export type ApplicationInput = z.infer<typeof applicationInputSchema>;
