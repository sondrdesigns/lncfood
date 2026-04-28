"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { jobInputSchema } from "@/lib/validators/job";
import { slugify, uniqueSlug } from "@/lib/slug";

export type FormState = {
  error?: string;
  fieldErrors?: Record<string, string>;
  saved?: boolean;
};

async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.id) redirect("/admin/login");
  return session.user;
}

function parseJobForm(fd: FormData) {
  const requirements = String(fd.get("requirements") ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  return jobInputSchema.safeParse({
    title: fd.get("title") ?? "",
    type: fd.get("type") ?? "",
    location: fd.get("location") ?? "",
    schedule: fd.get("schedule") ?? "",
    description: fd.get("description") ?? "",
    requirements,
    applyUrl: fd.get("applyUrl") ?? "",
    published: fd.get("published") === "on",
  });
}

function collectFieldErrors(parsed: ReturnType<typeof parseJobForm>): Record<string, string> {
  if (parsed.success) return {};
  const out: Record<string, string> = {};
  for (const issue of parsed.error.issues) {
    const key = String(issue.path[0] ?? "");
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}

function revalidateAll(slug?: string, alsoSlug?: string) {
  revalidatePath("/careers");
  revalidatePath("/admin");
  if (slug) revalidatePath(`/careers/${slug}`);
  if (alsoSlug && alsoSlug !== slug) revalidatePath(`/careers/${alsoSlug}`);
}

export async function createJobAction(
  _prev: FormState | undefined,
  fd: FormData,
): Promise<FormState> {
  const user = await requireAdmin();
  const parsed = parseJobForm(fd);
  if (!parsed.success) {
    return { error: "Please fix the errors below.", fieldErrors: collectFieldErrors(parsed) };
  }

  const taken = new Set(
    (await prisma.job.findMany({ select: { slug: true } })).map((j) => j.slug),
  );
  const slug = uniqueSlug(slugify(parsed.data.title), taken);

  const job = await prisma.job.create({
    data: {
      ...parsed.data,
      slug,
      publishedAt: parsed.data.published ? new Date() : null,
      updatedById: user.id,
    },
  });

  revalidateAll(slug);
  redirect(`/admin/jobs/${job.id}`);
}

export async function updateJobAction(
  id: string,
  _prev: FormState | undefined,
  fd: FormData,
): Promise<FormState> {
  const user = await requireAdmin();
  const parsed = parseJobForm(fd);
  if (!parsed.success) {
    return { error: "Please fix the errors below.", fieldErrors: collectFieldErrors(parsed) };
  }

  const current = await prisma.job.findUnique({
    where: { id },
    select: { slug: true, published: true, publishedAt: true },
  });
  if (!current) return { error: "Job not found." };

  await prisma.job.update({
    where: { id },
    data: {
      ...parsed.data,
      publishedAt:
        parsed.data.published && !current.published ? new Date() : current.publishedAt,
      updatedById: user.id,
    },
  });

  revalidateAll(current.slug);
  return { saved: true };
}

export async function archiveJobAction(id: string) {
  await requireAdmin();
  const job = await prisma.job.update({
    where: { id },
    data: { archivedAt: new Date(), published: false },
  });
  revalidateAll(job.slug);
  redirect("/admin");
}

export async function unarchiveJobAction(id: string) {
  await requireAdmin();
  const job = await prisma.job.update({
    where: { id },
    data: { archivedAt: null },
  });
  revalidateAll(job.slug);
  redirect(`/admin/jobs/${id}`);
}

export async function deleteJobAction(id: string) {
  await requireAdmin();
  const job = await prisma.job.delete({ where: { id } });
  revalidateAll(job.slug);
  redirect("/admin");
}
