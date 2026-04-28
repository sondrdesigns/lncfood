import { z } from "zod";

export const jobTypeEnum = z.enum(["WAREHOUSE", "DELIVERY", "SALES", "ADMIN"]);

export type JobType = z.infer<typeof jobTypeEnum>;

const applyUrlPattern = /^(https?:\/\/|mailto:|tel:|\/)/i;

export const jobInputSchema = z.object({
  title: z.string().trim().min(2, "Title must be at least 2 characters").max(120),
  type: jobTypeEnum,
  location: z.string().trim().min(2, "Location is required").max(120),
  schedule: z.string().trim().min(2, "Schedule is required").max(80),
  description: z.string().trim().min(20, "Description must be at least 20 characters"),
  requirements: z
    .array(z.string().trim().min(1))
    .min(1, "Add at least one requirement")
    .max(20, "Keep requirements under 20 items"),
  applyUrl: z
    .string()
    .trim()
    .min(1, "Apply URL is required")
    .refine(
      (v) => applyUrlPattern.test(v),
      "Must be a URL (http/https), mailto:, tel:, or internal path (starting with /)"
    ),
  published: z.boolean(),
});

export type JobInput = z.infer<typeof jobInputSchema>;
