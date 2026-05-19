import { cache } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Briefcase, Clock, MapPin } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { JobApplicationForm } from "@/app/components/careers/JobApplicationForm";

export const revalidate = 60;

type Params = { slug: string };

const getApplyJob = cache(async (slug: string) =>
  prisma.job.findFirst({
    where: { slug, published: true, archivedAt: null },
    select: { slug: true, title: true, type: true, location: true, schedule: true },
  }),
);

export async function generateMetadata({ params }: { params: Params }) {
  const job = await getApplyJob(params.slug);
  return {
    title: job ? `Apply: ${job.title} — L&C Food Distribution` : "Apply — L&C Food Distribution",
    robots: { index: false },
  };
}

export default async function ApplyPage({ params }: { params: Params }) {
  const job = await getApplyJob(params.slug);
  if (!job) notFound();

  return (
    <div className="pt-20">
      <section className="bg-primary text-white pt-12 pb-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Link
            href={`/careers/${job.slug}`}
            className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors"
            style={{ fontWeight: 500 }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to position
          </Link>
          <p
            className="text-white/70 text-xs uppercase tracking-[0.3em] mb-3"
            style={{ fontWeight: 600 }}
          >
            Apply for
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl mb-4 leading-tight" style={{ fontWeight: 700 }}>
            {job.title}
          </h1>
          <div className="flex flex-wrap gap-4 text-white/80 text-sm">
            <span className="inline-flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {job.location}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {job.schedule}
            </span>
            <span className="inline-flex items-center gap-2 capitalize">
              <Briefcase className="w-4 h-4" />
              {job.type.toLowerCase()}
            </span>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-secondary">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-border p-6 md:p-10">
            <h2 className="text-2xl mb-2" style={{ fontWeight: 700 }}>
              Tell us about yourself
            </h2>
            <p className="text-foreground/70 mb-8">
              Fill out the form below. We'll review and get back to you shortly.
            </p>
            <JobApplicationForm jobSlug={job.slug} jobTitle={job.title} />
          </div>
        </div>
      </section>
    </div>
  );
}
