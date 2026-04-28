import Careers from "@/app/components/pages/Careers";
import { prisma } from "@/lib/prisma";
import type { Job } from "@/app/data/jobs";

export const revalidate = 60;

export default async function CareersPage() {
  const rows = await prisma.job.findMany({
    where: { published: true, archivedAt: null },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
  });

  const jobs: Job[] = rows.map((r) => ({
    slug: r.slug,
    title: r.title,
    type: r.type,
    location: r.location,
    schedule: r.schedule,
    description: r.description,
    requirements: r.requirements,
    applyUrl: r.applyUrl,
  }));

  return <Careers jobs={jobs} />;
}
