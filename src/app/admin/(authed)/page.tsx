import Link from "next/link";
import { Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const jobs = await prisma.job.findMany({
    orderBy: [{ archivedAt: "asc" }, { updatedAt: "desc" }],
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl mb-1" style={{ fontWeight: 700 }}>
            Job postings
          </h1>
          <p className="text-foreground/60">{jobs.length} total</p>
        </div>
        <Link
          href="/admin/jobs/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          style={{ fontWeight: 600 }}
        >
          <Plus className="w-4 h-4" />
          New job
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-secondary border-b border-border text-sm text-foreground/60 text-left">
            <tr>
              <th className="px-6 py-3" style={{ fontWeight: 600 }}>Title</th>
              <th className="px-6 py-3" style={{ fontWeight: 600 }}>Location</th>
              <th className="px-6 py-3" style={{ fontWeight: 600 }}>Status</th>
              <th className="px-6 py-3" style={{ fontWeight: 600 }}>Updated</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody>
            {jobs.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-foreground/60">
                  No jobs yet. <Link href="/admin/jobs/new" className="text-primary hover:underline">Create the first one</Link>.
                </td>
              </tr>
            )}
            {jobs.map((j) => (
              <tr key={j.id} className="border-b border-border last:border-0 hover:bg-secondary/50">
                <td className="px-6 py-4">
                  <Link href={`/admin/jobs/${j.id}`} className="hover:text-primary" style={{ fontWeight: 500 }}>
                    {j.title}
                  </Link>
                </td>
                <td className="px-6 py-4 text-foreground/70">{j.location}</td>
                <td className="px-6 py-4">
                  <StatusBadge published={j.published} archived={!!j.archivedAt} />
                </td>
                <td className="px-6 py-4 text-foreground/60 text-sm">
                  {j.updatedAt.toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <Link href={`/admin/jobs/${j.id}`} className="text-primary text-sm hover:underline" style={{ fontWeight: 500 }}>
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusBadge({ published, archived }: { published: boolean; archived: boolean }) {
  if (archived) {
    return <span className="inline-flex px-2 py-1 rounded-md bg-foreground/10 text-foreground/60 text-xs" style={{ fontWeight: 600 }}>Archived</span>;
  }
  if (published) {
    return <span className="inline-flex px-2 py-1 rounded-md bg-green-100 text-green-700 text-xs" style={{ fontWeight: 600 }}>Published</span>;
  }
  return <span className="inline-flex px-2 py-1 rounded-md bg-amber-100 text-amber-700 text-xs" style={{ fontWeight: 600 }}>Draft</span>;
}
