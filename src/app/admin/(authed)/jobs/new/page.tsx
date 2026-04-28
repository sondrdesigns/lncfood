import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { JobForm } from "@/app/components/admin/JobForm";
import { createJobAction } from "@/lib/actions/jobs";

export default function NewJobPage() {
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
      <h1 className="text-3xl mb-8" style={{ fontWeight: 700 }}>
        New job posting
      </h1>
      <div className="bg-white rounded-2xl border border-border p-8">
        <JobForm action={createJobAction} submitLabel="Create job" />
      </div>
    </div>
  );
}
