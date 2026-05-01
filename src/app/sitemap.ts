import type { MetadataRoute } from "next";
import { branches } from "@/app/data/locations";
import { categories } from "@/app/data/categories";
import { prisma } from "@/lib/prisma";
import { absoluteUrl } from "@/lib/seo/jsonld";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "monthly", priority: 1.0 },
    { url: absoluteUrl("/about"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/products"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/careers"), lastModified: now, changeFrequency: "weekly", priority: 0.7 },
  ];

  const locationEntries: MetadataRoute.Sitemap = branches.map((b) => ({
    url: absoluteUrl(`/locations/${b.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const categoryEntries: MetadataRoute.Sitemap = categories.map((c) => ({
    url: absoluteUrl(`/products/${c.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  let jobEntries: MetadataRoute.Sitemap = [];
  try {
    const jobs = await prisma.job.findMany({
      where: { published: true, archivedAt: null },
      select: { slug: true, updatedAt: true },
    });
    jobEntries = jobs.map((j) => ({
      url: absoluteUrl(`/careers/${j.slug}`),
      lastModified: j.updatedAt,
      changeFrequency: "weekly",
      priority: 0.6,
    }));
  } catch {
    // DB unavailable at build/preview time — skip job entries silently.
  }

  return [...staticEntries, ...locationEntries, ...categoryEntries, ...jobEntries];
}
