-- AlterTable
ALTER TABLE "Application"
  ADD COLUMN "resumeUrl" TEXT,
  ADD COLUMN "resumeFilename" TEXT,
  ADD COLUMN "resumeSize" INTEGER,
  ADD COLUMN "resumeMimeType" TEXT;
