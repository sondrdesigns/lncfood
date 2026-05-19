"use server";

import { put } from "@vercel/blob";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { applicationInputSchema } from "@/lib/validators/application";
import { applyApplicationRateLimit } from "@/lib/rate-limit";
import {
  sendApplicantConfirmationEmail,
  sendApplicationNotificationEmail,
} from "@/lib/email";

export type ApplicationFormState = {
  error?: string;
  fieldErrors?: Record<string, string>;
};

const RESUME_MAX_BYTES = 5 * 1024 * 1024;
const RESUME_ALLOWED_MIME = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);
const RESUME_ALLOWED_EXT = /\.(pdf|doc|docx)$/i;

type ResumeUpload = {
  url: string;
  filename: string;
  size: number;
  mimeType: string;
};

function safeFilename(name: string) {
  // Strip path separators and reduce to safe ASCII; preserve extension.
  const base = name.split(/[\\/]/).pop() ?? "resume";
  return base.replace(/[^A-Za-z0-9._-]+/g, "_").slice(0, 120) || "resume";
}

function validateResume(file: File): { ok: true } | { ok: false; message: string } {
  if (file.size === 0) return { ok: false, message: "Resume file appears to be empty." };
  if (file.size > RESUME_MAX_BYTES) {
    return { ok: false, message: "Resume must be 5 MB or smaller." };
  }
  if (file.type && !RESUME_ALLOWED_MIME.has(file.type)) {
    return { ok: false, message: "Resume must be a PDF, DOC, or DOCX file." };
  }
  if (!file.type && !RESUME_ALLOWED_EXT.test(file.name)) {
    return { ok: false, message: "Resume must be a PDF, DOC, or DOCX file." };
  }
  return { ok: true };
}

function collectFieldErrors(
  parsed: ReturnType<typeof applicationInputSchema.safeParse>,
): Record<string, string> {
  if (parsed.success) return {};
  const out: Record<string, string> = {};
  for (const issue of parsed.error.issues) {
    const key = String(issue.path[0] ?? "");
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}

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

export async function submitApplicationAction(
  _prev: ApplicationFormState | undefined,
  fd: FormData,
): Promise<ApplicationFormState> {
  // Honeypot: real users won't fill the hidden "website" field.
  if (str(fd.get("website")).trim() !== "") {
    // Silently succeed without writing or sending email.
    redirect("/careers/thanks");
  }

  const ok = await applyApplicationRateLimit(clientIp());
  if (!ok) {
    return {
      error: "Too many submissions. Please try again in a little while.",
    };
  }

  const parsed = applicationInputSchema.safeParse({
    firstName: str(fd.get("firstName")),
    lastName: str(fd.get("lastName")),
    email: str(fd.get("email")),
    phone: str(fd.get("phone")),
    experience: str(fd.get("experience")),
    jobSlug: str(fd.get("jobSlug")) || undefined,
    jobTitle: str(fd.get("jobTitle")) || undefined,
  });

  if (!parsed.success) {
    return {
      error: "Please fix the errors below.",
      fieldErrors: collectFieldErrors(parsed),
    };
  }

  // Optional resume upload — validate first so we don't write a row before
  // failing on a bad file.
  const resumeRaw = fd.get("resume");
  let resume: ResumeUpload | null = null;
  if (resumeRaw instanceof File && resumeRaw.size > 0) {
    const check = validateResume(resumeRaw);
    if (!check.ok) {
      return {
        error: "Please fix the errors below.",
        fieldErrors: { resume: check.message },
      };
    }
    try {
      const filename = safeFilename(resumeRaw.name);
      const blob = await put(`resumes/${Date.now()}-${filename}`, resumeRaw, {
        access: "private",
        contentType: resumeRaw.type || "application/octet-stream",
        addRandomSuffix: true,
      });
      resume = {
        url: blob.url,
        filename,
        size: resumeRaw.size,
        mimeType: resumeRaw.type || "application/octet-stream",
      };
    } catch (e) {
      console.error("[applications] resume upload failed", e);
      return {
        error:
          "We couldn't upload your resume right now. Please try again, or submit without one.",
        fieldErrors: { resume: "Upload failed. Please try again." },
      };
    }
  }

  let jobId: string | null = null;
  if (parsed.data.jobSlug) {
    const job = await prisma.job.findFirst({
      where: { slug: parsed.data.jobSlug, published: true, archivedAt: null },
      select: { id: true, title: true },
    });
    if (job) {
      jobId = job.id;
      if (!parsed.data.jobTitle) parsed.data.jobTitle = job.title;
    }
  }

  await prisma.application.create({
    data: {
      jobId,
      jobSlug: parsed.data.jobSlug ?? null,
      jobTitle: parsed.data.jobTitle ?? null,
      firstName: parsed.data.firstName,
      lastName: parsed.data.lastName,
      email: parsed.data.email,
      phone: parsed.data.phone,
      experience: parsed.data.experience,
      resumeUrl: resume?.url ?? null,
      resumeFilename: resume?.filename ?? null,
      resumeSize: resume?.size ?? null,
      resumeMimeType: resume?.mimeType ?? null,
    },
  });

  // Best-effort emails — log but don't block the redirect on email failure.
  try {
    await Promise.all([
      sendApplicationNotificationEmail({ ...parsed.data, resume }),
      sendApplicantConfirmationEmail(parsed.data),
    ]);
  } catch (e) {
    console.error("[applications] email send failed", e);
  }

  revalidatePath("/admin/applications");

  const params = new URLSearchParams();
  if (parsed.data.jobSlug) params.set("from", parsed.data.jobSlug);
  redirect(`/careers/thanks${params.size ? `?${params.toString()}` : ""}`);
}
