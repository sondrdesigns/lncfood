import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Archive, ArchiveRestore } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { JobForm } from "@/app/components/admin/JobForm";
import { DeleteJobButton } from "@/app/components/admin/DeleteJobButton";
import {
  archiveJobAction,
  deleteJobAction,
  unarchiveJobAction,
  updateJobAction,
} from "@/lib/actions/jobs";

export const dynamic = "force-dynamic";

type Params = { id: string };

export default async function EditJobPage({ params }: { params: Params }) {
  const job = await prisma.job.findUnique({ where: { id: params.id } });
  if (!job) notFound();

  const update = updateJobAction.bind(null, job.id);
  const archive = archiveJobAction.bind(null, job.id);
  const unarchive = unarchiveJobAction.bind(null, job.id);
  const remove = deleteJobAction.bind(null, job.id);

  return (
    <div>
      <Link
        href="/admin"
        className="inline-flex items-center gap-2 text-foreground/60 hover:text-primary mb-6 transition-colors text-sm"
        style={{ fontWeight: 500 }}
      >
        <ArrowLeft className="w-4 h-4" />
        Back to dashboard
      </Link>

      <div className="flex items-start justify-between mb-8 gap-6 flex-wrap">
        <div>
          <h1 className="text-3xl mb-1" style={{ fontWeight: 700 }}>
            {job.title}
          </h1>
          <div className="text-sm text-foreground/60">
            <code className="bg-secondary px-2 py-0.5 rounded">/careers/{job.slug}</code>
            <span className="ml-3">Updated {job.updatedAt.toLocaleString()}</span>
          </div>
        </div>
        <div className="flex gap-2">
          {job.archivedAt ? (
            <form action={unarchive}>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-border text-foreground/70 hover:text-primary hover:bg-secondary transition-colors text-sm"
                style={{ fontWeight: 500 }}
              >
                <ArchiveRestore className="w-4 h-4" />
                Unarchive
              </button>
            </form>
          ) : (
            <form action={archive}>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-border text-foreground/70 hover:text-primary hover:bg-secondary transition-colors text-sm"
                style={{ fontWeight: 500 }}
              >
                <Archive className="w-4 h-4" />
                Archive
              </button>
            </form>
          )}
          <DeleteJobButton action={remove} title={job.title} />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-border p-8">
        <JobForm
          defaults={{
            title: job.title,
            type: job.type,
            location: job.location,
            schedule: job.schedule,
            description: job.description,
            requirements: job.requirements,
            applyUrl: job.applyUrl,
            published: job.published,
          }}
          action={update}
          submitLabel="Save changes"
        />
      </div>
    </div>
  );
}
