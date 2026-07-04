import { notFound } from "next/navigation";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import { JsonLd } from "@/lib/seo/JsonLdScript";
import { localBusinessLd, breadcrumbLd } from "@/lib/seo/jsonld";
import { branches, directionsUrl, type BranchSlug } from "@/app/data/locations";
import type { Metadata } from "next";

export function generateStaticParams() {
  return branches.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const branch = branches.find((b) => b.slug === slug);
  if (!branch) return {};
  return {
    title: `Asian Food Distributor in ${branch.city}, CA | L&C Food Distribution`,
    description: `L&C Food Distribution serves ${branch.city} restaurants with 2,500+ Asian food SKUs, 6× weekly delivery, and cold-chain integrity. Call ${branch.phone}.`,
    alternates: { canonical: `/locations/${branch.slug}` },
  };
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const branch = branches.find((b) => b.slug === (slug as BranchSlug));
  if (!branch) notFound();

  const otherBranches = branches.filter((b) => b.slug !== branch.slug);

  return (
    <>
      <JsonLd data={localBusinessLd(branch)} />
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Locations", path: "/locations" },
          { name: branch.city, path: `/locations/${branch.slug}` },
        ])}
      />

      <div className="pt-20">
        {/* Hero */}
        <section className="bg-primary text-white py-20 md:py-28">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <p className="text-white/70 text-xs uppercase tracking-[0.3em] mb-4" style={{ fontWeight: 600 }}>
              Distribution Center
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl mb-6 leading-tight" style={{ fontWeight: 700 }}>
              Asian Food Distributor in {branch.city}, CA
            </h1>
            <p className="text-lg text-white/85 max-w-2xl leading-relaxed">
              L&amp;C Food Distribution — serving {branch.city} restaurants with 2,500+ Asian food SKUs,
              6× weekly delivery, and cold-chain integrity from farm to door.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href={`tel:${branch.phone.replace(/\D/g, "")}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary rounded-xl hover:bg-white/90 transition-colors"
                style={{ fontWeight: 600 }}
              >
                <Phone className="w-4 h-4" />
                {branch.phone}
              </a>
              <Link
                href="/partner-application"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white border border-white/20 rounded-xl hover:bg-white/20 transition-colors"
                style={{ fontWeight: 600 }}
              >
                Request service
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Branch info */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl mb-6" style={{ fontWeight: 700 }}>
                  Contact &amp; Location
                </h2>
                <ul className="space-y-5 text-foreground/80">
                  <li className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p style={{ fontWeight: 600 }} className="text-foreground">
                        {branch.address}
                      </p>
                      <a
                        href={directionsUrl(branch.address)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline mt-1 inline-block"
                      >
                        Get directions
                      </a>
                    </div>
                  </li>
                  <li className="flex items-center gap-4">
                    <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                    <a href={`tel:${branch.phone.replace(/\D/g, "")}`} className="hover:text-primary transition-colors">
                      {branch.phone}
                    </a>
                  </li>
                  <li className="flex items-center gap-4">
                    <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                    <a href="mailto:info@lncfood.com" className="hover:text-primary transition-colors">
                      info@lncfood.com
                    </a>
                  </li>
                  <li className="flex items-center gap-4">
                    <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>Monday – Friday, 8:00 AM – 5:00 PM</span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl mb-6" style={{ fontWeight: 700 }}>
                  Other Locations
                </h2>
                <ul className="space-y-3">
                  {otherBranches.map((b) => (
                    <li key={b.slug}>
                      <Link
                        href={`/locations/${b.slug}`}
                        className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors"
                        style={{ fontWeight: 500 }}
                      >
                        <ArrowRight className="w-4 h-4 text-primary flex-shrink-0" />
                        {b.city} — {b.phone}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-8 border-t border-border">
                  <Link
                    href="/partner-application"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors text-sm"
                    style={{ fontWeight: 600 }}
                  >
                    Become a partner
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
