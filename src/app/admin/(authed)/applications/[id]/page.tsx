import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Mail,
  Phone,
  Briefcase,
  Building2,
  Calendar,
  Download,
  FileText,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { branches } from "@/app/data/locations";

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export const dynamic = "force-dynamic";

const STATUS_STYLES: Record<string, string> = {
  NEW: "bg-green-100 text-green-700",
  REVIEWED: "bg-blue-100 text-blue-700",
  CONTACTED: "bg-amber-100 text-amber-700",
  ARCHIVED: "bg-foreground/10 text-foreground/60",
};

type Params = { id: string };

export default async function AdminApplicationDetail({ params }: { params: Params }) {
  const found = await prisma.application.findUnique({ where: { id: params.id } });
  if (!found) notFound();

  const branch = found.branchSlug
    ? branches.find(
        (b) => b.slug.toUpperCase().replace(/-/g, "_") === found.branchSlug,
      ) ?? null
    : null;
  const app =
    found.status === "NEW"
      ? await prisma.application.update({
          where: { id: found.id },
          data: { status: "REVIEWED" },
        })
      : found;

  return (
    <div>
      <Link
        href="/admin/applications"
        className="inline-flex items-center gap-2 text-foreground/60 hover:text-primary mb-6 transition-colors"
        style={{ fontWeight: 500 }}
      >
        <ArrowLeft className="w-4 h-4" />
        Back to applications
      </Link>

      <div className="bg-white rounded-2xl border border-border p-6 md:p-8">
        <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl mb-1" style={{ fontWeight: 700 }}>
              {app.firstName} {app.lastName}
            </h1>
            <p className="text-foreground/60">{app.jobTitle ?? "General application"}</p>
          </div>
          <span
            className={`inline-flex px-3 py-1 rounded-md text-xs ${STATUS_STYLES[app.status]}`}
            style={{ fontWeight: 600 }}
          >
            {app.status[0] + app.status.slice(1).toLowerCase()}
          </span>
        </div>

        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="flex items-start gap-3">
            <Mail className="w-4 h-4 mt-1 text-primary shrink-0" />
            <div>
              <dt className="text-sm text-foreground/60">Email</dt>
              <dd>
                <a href={`mailto:${app.email}`} className="hover:text-primary" style={{ fontWeight: 500 }}>
                  {app.email}
                </a>
              </dd>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="w-4 h-4 mt-1 text-primary shrink-0" />
            <div>
              <dt className="text-sm text-foreground/60">Phone</dt>
              <dd>
                <a href={`tel:${app.phone}`} className="hover:text-primary" style={{ fontWeight: 500 }}>
                  {app.phone}
                </a>
              </dd>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Briefcase className="w-4 h-4 mt-1 text-primary shrink-0" />
            <div>
              <dt className="text-sm text-foreground/60">Role</dt>
              <dd style={{ fontWeight: 500 }}>
                {app.jobTitle ?? "—"}
                {app.jobSlug && (
                  <Link
                    href={`/careers/${app.jobSlug}`}
                    className="ml-2 text-primary text-sm hover:underline"
                  >
                    view posting
                  </Link>
                )}
              </dd>
            </div>
          </div>
          {branch && (
            <div className="flex items-start gap-3">
              <Building2 className="w-4 h-4 mt-1 text-primary shrink-0" />
              <div>
                <dt className="text-sm text-foreground/60">Branch</dt>
                <dd style={{ fontWeight: 500 }}>L&C {branch.city} — {branch.address}</dd>
              </div>
            </div>
          )}
          <div className="flex items-start gap-3">
            <Calendar className="w-4 h-4 mt-1 text-primary shrink-0" />
            <div>
              <dt className="text-sm text-foreground/60">Received</dt>
              <dd style={{ fontWeight: 500 }}>{app.createdAt.toLocaleString()}</dd>
            </div>
          </div>
        </dl>

        {app.resumeUrl && (
          <div className="mb-8">
            <h2 className="text-lg mb-3" style={{ fontWeight: 600 }}>
              Resume
            </h2>
            <a
              href={`/admin/applications/${app.id}/resume`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between gap-4 px-4 py-3 bg-secondary border border-border rounded-xl hover:border-primary transition-colors max-w-md"
            >
              <span className="flex items-center gap-3 min-w-0">
                <FileText className="w-5 h-5 text-primary shrink-0" />
                <span className="min-w-0">
                  <span className="block truncate text-sm" style={{ fontWeight: 500 }}>
                    {app.resumeFilename ?? "resume"}
                  </span>
                  <span className="block text-xs text-foreground/60">
                    {app.resumeSize ? formatBytes(app.resumeSize) : ""}
                    {app.resumeSize && app.resumeMimeType ? " · " : ""}
                    {app.resumeMimeType ?? ""}
                  </span>
                </span>
              </span>
              <Download className="w-4 h-4 text-foreground/60 shrink-0" />
            </a>
          </div>
        )}

        <div>
          <h2 className="text-lg mb-3" style={{ fontWeight: 600 }}>
            Experience &amp; references
          </h2>
          <p className="text-foreground/80 leading-relaxed whitespace-pre-line bg-secondary rounded-xl p-4 md:p-6">
            {app.experience}
          </p>
        </div>
      </div>
    </div>
  );
}
