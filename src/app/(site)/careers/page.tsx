import Careers from "@/app/components/pages/Careers";
import { prisma } from "@/lib/prisma";
import type { Job } from "@/app/data/jobs";

export const revalidate = 60;

export default async function CareersPage() {
  // Swallow DB errors so build/preview without a migrated DB still works.
  const rows = await prisma.job
    .findMany({
      where: { published: true, archivedAt: null },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    })
    .catch((e: unknown) => {
      console.error("[careers] DB query failed:", e);
      return [] as Awaited<ReturnType<typeof prisma.job.findMany>>;
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
