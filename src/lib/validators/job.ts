import { z } from "zod";

export const jobTypeEnum = z.enum(["WAREHOUSE", "DELIVERY", "SALES", "ADMIN"]);

export type JobType = z.infer<typeof jobTypeEnum>;

// Maps to the Prisma BranchSlug enum values.
export const branchSlugEnum = z.enum(["SAN_DIEGO", "LOS_ANGELES", "FRESNO", "SAN_JOSE"]);

export type BranchSlugEnum = z.infer<typeof branchSlugEnum>;

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
  published: z.boolean(),
  branchSlug: branchSlugEnum.optional(),
});

export type JobInput = z.infer<typeof jobInputSchema>;
