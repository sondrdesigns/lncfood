import { redirect } from "next/navigation";
import Link from "next/link";
import { LogOut, LayoutDashboard, Inbox, Handshake } from "lucide-react";
import { auth, signOut } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Admin — L&C Food Distribution",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  const [newJobApplications, newPartnerApplications] = await Promise.all([
    prisma.application.count({ where: { status: "NEW" } }),
    prisma.partnerApplication.count({ where: { status: "NEW" } }),
  ]);

  return (
    <div className="min-h-screen bg-secondary">
      <aside className="fixed inset-y-0 left-0 w-64 bg-white border-r border-border flex flex-col">
        <div className="px-6 py-6 border-b border-border">
          <Link href="/admin" className="block" style={{ fontWeight: 700 }}>
            L&amp;C Admin
          </Link>
          <p className="text-xs text-foreground/60 mt-1 truncate">{session.user.email}</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Link
            href="/admin"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-foreground/80 hover:bg-accent hover:text-primary transition-colors"
            style={{ fontWeight: 500 }}
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Link>
          <Link
            href="/admin/applications"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-foreground/80 hover:bg-accent hover:text-primary transition-colors"
            style={{ fontWeight: 500 }}
          >
            <Inbox className="w-4 h-4" />
            <span className="flex-1">Applications</span>
            <NotificationBadge count={newJobApplications} label="new job applications" />
          </Link>
          <Link
            href="/admin/partner-applications"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-foreground/80 hover:bg-accent hover:text-primary transition-colors"
            style={{ fontWeight: 500 }}
          >
            <Handshake className="w-4 h-4" />
            <span className="flex-1">Partner Applications</span>
            <NotificationBadge count={newPartnerApplications} label="new partner applications" />
          </Link>
        </nav>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/admin/login" });
          }}
          className="p-4 border-t border-border"
        >
          <button
            type="submit"
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-foreground/80 hover:bg-accent hover:text-primary transition-colors"
            style={{ fontWeight: 500 }}
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </form>
      </aside>
      <main className="ml-64 min-h-screen">
        <div className="max-w-5xl mx-auto px-8 py-10">{children}</div>
      </main>
    </div>
  );
}

function NotificationBadge({ count, label }: { count: number; label: string }) {
  if (count <= 0) return null;

  return (
    <span
      className="min-w-5 h-5 px-1.5 rounded-full bg-red-600 text-white text-[11px] leading-5 text-center"
      style={{ fontWeight: 700 }}
      aria-label={`${count} ${label}`}
      title={`${count} ${label}`}
    >
      {count > 99 ? "99+" : count}
    </span>
  );
}
