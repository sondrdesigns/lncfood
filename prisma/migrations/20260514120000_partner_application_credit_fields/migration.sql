-- Add optional credit-application fields to PartnerApplication so a single
-- submission can carry both partner intake and credit terms.

ALTER TABLE "PartnerApplication"
  ADD COLUMN "businessLegalName" TEXT,
  ADD COLUMN "dba" TEXT,
  ADD COLUMN "ein" TEXT,
  ADD COLUMN "yearsInBusiness" INTEGER,
  ADD COLUMN "businessType" TEXT,
  ADD COLUMN "estimatedMonthlyPurchases" TEXT,
  ADD COLUMN "bankName" TEXT,
  ADD COLUMN "bankAccountLast4" TEXT,
  ADD COLUMN "tradeReference1Name" TEXT,
  ADD COLUMN "tradeReference1Phone" TEXT,
  ADD COLUMN "tradeReference2Name" TEXT,
  ADD COLUMN "tradeReference2Phone" TEXT,
  ADD COLUMN "signerName" TEXT,
  ADD COLUMN "signerTitle" TEXT,
  ADD COLUMN "creditAgreedAt" TIMESTAMP(3);
