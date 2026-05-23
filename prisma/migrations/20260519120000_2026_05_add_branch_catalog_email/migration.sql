-- CreateEnum
CREATE TYPE "BranchSlug" AS ENUM ('SAN_DIEGO', 'LOS_ANGELES', 'FRESNO', 'SAN_JOSE');

-- AlterTable: add branchSlug to Job
ALTER TABLE "Job" ADD COLUMN "branchSlug" "BranchSlug";

-- AlterTable: add branchSlug to Application + index
ALTER TABLE "Application" ADD COLUMN "branchSlug" "BranchSlug";
CREATE INDEX "Application_branchSlug_idx" ON "Application"("branchSlug");

-- AlterTable: add email + product catalog fields to PartnerApplication
ALTER TABLE "PartnerApplication"
  ADD COLUMN "email" TEXT NOT NULL DEFAULT '',
  ADD COLUMN "productCatalogUrl" TEXT,
  ADD COLUMN "productCatalogFilename" TEXT,
  ADD COLUMN "productCatalogSize" INTEGER,
  ADD COLUMN "productCatalogMimeType" TEXT;

-- Remove the forced default now that existing rows are covered
ALTER TABLE "PartnerApplication" ALTER COLUMN "email" DROP DEFAULT;
