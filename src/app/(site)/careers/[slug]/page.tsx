import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Briefcase, Clock, MapPin } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const revalidate = 60;

type Params = { slug: string };

async function getJob(slug: string) {
  return prisma.job.findFirst({
    where: { slug, published: true, archivedAt: null },
  });
}

export async function generateMetadata({ params }: { params: Params }) {
  const job = await getJob(params.slug);
  if (!job) return { title: "Position not found" };
  return {
    title: `${job.title} — L&C Food Distribution Careers`,
    description: job.description,
  };
}

const isExternalUrl = (url: string) => /^(https?:|mailto:|tel:)/i.test(url);

export default async function JobDetailPage({ params }: { params: Params }) {
  const job = await getJob(params.slug);
  if (!job) notFound();

  const external = isExternalUrl(job.applyUrl);

  return (
    <div className="pt-20">
      <section className="bg-primary text-white pt-16 pb-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors"
            style={{ fontWeight: 500 }}
          >
            <ArrowLeft className="w-4 h-4" />
            All open positions
          </Link>
          <h1 className="text-4xl md:text-5xl mb-4" style={{ fontWeight: 700 }}>
            {job.title}
          </h1>
          <div className="flex flex-wrap gap-5 text-white/80">
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

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="prose prose-neutral max-w-none">
            <h2 className="text-2xl mb-4" style={{ fontWeight: 700 }}>
              About the role
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-10 whitespace-pre-line">
              {job.description}
            </p>

            <h2 className="text-2xl mb-4" style={{ fontWeight: 700 }}>
              Requirements
            </h2>
            <ul className="space-y-2 mb-12">
              {job.requirements.map((r, i) => (
                <li key={i} className="flex items-start gap-3 text-foreground/80">
                  <span className="text-primary mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>

            <div className="border-t border-border pt-8">
              {external ? (
                <a
                  href={job.applyUrl}
                  target={job.applyUrl.startsWith("http") ? "_blank" : undefined}
                  rel={job.applyUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="inline-flex px-8 py-4 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
                  style={{ fontWeight: 600 }}
                >
                  Apply for this role
                </a>
              ) : (
                <Link
                  href={job.applyUrl}
                  className="inline-flex px-8 py-4 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
                  style={{ fontWeight: 600 }}
                >
                  Apply for this role
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
