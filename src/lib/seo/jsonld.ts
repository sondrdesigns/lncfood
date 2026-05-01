import { branches, type Branch } from "@/app/data/locations";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://lncfood.com"
).replace(/\/$/, "");

export const absoluteUrl = (path: string) =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

const COMPANY_NAME = "L&C Food Distribution";
const COMPANY_LEGAL = "L&C Food Distribution (陈氏食品公司)";
const COMPANY_DESCRIPTION =
  "Asian foodservice distributor serving California restaurants since 1995. Four distribution centers covering San Diego, Los Angeles, Fresno, and San Jose.";
const COMPANY_LOGO = absoluteUrl("/images/lnc-logo.png");
const COMPANY_EMAIL = "info@lncfood.com";
const COMPANY_FOUNDED = "1995";

const branchToPlace = (b: Branch) => {
  const [streetAddress, addressLocality, regionAndPostal] = b.address
    .split(",")
    .map((s) => s.trim());
  const [addressRegion, postalCode] = (regionAndPostal ?? "").split(/\s+/);
  return {
    "@type": "Place" as const,
    name: `${COMPANY_NAME} — ${b.city}`,
    address: {
      "@type": "PostalAddress" as const,
      streetAddress,
      addressLocality,
      addressRegion,
      postalCode,
      addressCountry: "US",
    },
    telephone: b.phone,
  };
};

export const organizationLd = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}#organization`,
  name: COMPANY_NAME,
  legalName: COMPANY_LEGAL,
  url: SITE_URL,
  logo: COMPANY_LOGO,
  email: COMPANY_EMAIL,
  description: COMPANY_DESCRIPTION,
  foundingDate: COMPANY_FOUNDED,
  areaServed: branches.map((b) => b.city),
  location: branches.map(branchToPlace),
});

export const localBusinessLd = (b: Branch) => {
  const place = branchToPlace(b);
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/locations/${b.slug}#localbusiness`,
    name: `${COMPANY_NAME} — ${b.city}`,
    parentOrganization: { "@id": `${SITE_URL}#organization` },
    url: absoluteUrl(`/locations/${b.slug}`),
    image: COMPANY_LOGO,
    address: place.address,
    telephone: b.phone,
    email: COMPANY_EMAIL,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:00",
      },
    ],
    areaServed: { "@type": "AdministrativeArea", name: "California" },
  };
};

export type BreadcrumbItem = { name: string; path: string };

export const breadcrumbLd = (items: BreadcrumbItem[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});

type JobLike = {
  slug: string;
  title: string;
  description: string;
  schedule: string;
  location: string;
  applyUrl: string;
  publishedAt: Date | string | null;
  createdAt?: Date | string;
};

const employmentTypeFromSchedule = (schedule: string) => {
  const s = schedule.toLowerCase();
  if (s.includes("part")) return "PART_TIME";
  if (s.includes("contract")) return "CONTRACTOR";
  if (s.includes("intern")) return "INTERN";
  if (s.includes("temp")) return "TEMPORARY";
  return "FULL_TIME";
};

const branchForJobLocation = (jobLocation: string): Branch | undefined => {
  const city = jobLocation.split(",")[0]?.trim().toLowerCase();
  if (!city) return undefined;
  return branches.find((b) => b.city.toLowerCase() === city);
};

const isHttpUrl = (url: string) => /^https?:/i.test(url);

export const jobPostingLd = (job: JobLike) => {
  const datePosted = (job.publishedAt ?? job.createdAt ?? new Date()).toString();
  const posted = new Date(datePosted);
  const validThrough = new Date(posted);
  validThrough.setDate(validThrough.getDate() + 60);

  const branch = branchForJobLocation(job.location);
  const jobLocation = branch
    ? branchToPlace(branch)
    : {
        "@type": "Place" as const,
        address: {
          "@type": "PostalAddress" as const,
          addressLocality: job.location.split(",")[0]?.trim(),
          addressRegion: "CA",
          addressCountry: "US",
        },
      };

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    datePosted: posted.toISOString(),
    validThrough: validThrough.toISOString(),
    employmentType: employmentTypeFromSchedule(job.schedule),
    directApply: isHttpUrl(job.applyUrl),
    hiringOrganization: {
      "@type": "Organization",
      "@id": `${SITE_URL}#organization`,
      name: COMPANY_NAME,
      sameAs: SITE_URL,
      logo: COMPANY_LOGO,
    },
    jobLocation,
    url: absoluteUrl(`/careers/${job.slug}`),
    applicantLocationRequirements: {
      "@type": "Country",
      name: "US",
    },
  };
};
