import Link from "next/link";
import { FileText } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminApplicationsPage() {
  const applications = await prisma.application.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl mb-1" style={{ fontWeight: 700 }}>
            Job applications
          </h1>
          <p className="text-foreground/60">{applications.length} total (latest 200)</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-secondary border-b border-border text-sm text-foreground/60 text-left">
            <tr>
              <th className="px-6 py-3" style={{ fontWeight: 600 }}>Applicant</th>
              <th className="px-6 py-3" style={{ fontWeight: 600 }}>Role</th>
              <th className="px-6 py-3" style={{ fontWeight: 600 }}>Contact</th>
              <th className="px-6 py-3" style={{ fontWeight: 600 }}>Resume</th>
              <th className="px-6 py-3" style={{ fontWeight: 600 }}>Status</th>
              <th className="px-6 py-3" style={{ fontWeight: 600 }}>Received</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody>
            {applications.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-foreground/60">
                  No applications yet.
                </td>
              </tr>
            )}
            {applications.map((a) => (
              <tr key={a.id} className="border-b border-border last:border-0 hover:bg-secondary/50">
                <td className="px-6 py-4">
                  <Link
                    href={`/admin/applications/${a.id}`}
                    className="hover:text-primary"
                    style={{ fontWeight: 500 }}
                  >
                    {a.firstName} {a.lastName}
                  </Link>
                </td>
                <td className="px-6 py-4 text-foreground/70">
                  {a.jobTitle ?? <span className="text-foreground/40">General</span>}
                </td>
                <td className="px-6 py-4 text-foreground/70 text-sm">
                  <div>
                    <a href={`mailto:${a.email}`} className="hover:text-primary">
                      {a.email}
                    </a>
                  </div>
                  <div className="text-foreground/50">
                    <a href={`tel:${a.phone}`} className="hover:text-primary">
                      {a.phone}
                    </a>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm">
                  {a.resumeUrl ? (
                    <a
                      href={`/admin/applications/${a.id}/resume`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-primary hover:underline"
                      style={{ fontWeight: 500 }}
                    >
                      <FileText className="w-4 h-4" />
                      Open
                    </a>
                  ) : (
                    <span className="text-foreground/40">None</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={a.status} />
                </td>
                <td className="px-6 py-4 text-foreground/60 text-sm">
                  {a.createdAt.toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <Link
                    href={`/admin/applications/${a.id}`}
                    className="text-primary text-sm hover:underline"
                    style={{ fontWeight: 500 }}
                  >
                    View
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

function StatusBadge({ status }: { status: "NEW" | "REVIEWED" | "CONTACTED" | "ARCHIVED" }) {
  const styles: Record<string, string> = {
    NEW: "bg-green-100 text-green-700",
    REVIEWED: "bg-blue-100 text-blue-700",
    CONTACTED: "bg-amber-100 text-amber-700",
    ARCHIVED: "bg-foreground/10 text-foreground/60",
  };
  return (
    <span
      className={`inline-flex px-2 py-1 rounded-md text-xs ${styles[status]}`}
      style={{ fontWeight: 600 }}
    >
      {status[0] + status.slice(1).toLowerCase()}
    </span>
  );
}
