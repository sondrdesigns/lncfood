import Link from "next/link";
import { Phone, MapPin, ArrowRight } from "lucide-react";
import { JsonLd } from "@/lib/seo/JsonLdScript";
import { breadcrumbLd } from "@/lib/seo/jsonld";
import { branches } from "@/app/data/locations";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Distribution Center Locations | L&C Food Distribution",
  description:
    "L&C Food Distribution operates four California locations — San Diego, Los Angeles, Fresno, and San Jose — delivering Asian food to restaurants statewide.",
  alternates: { canonical: "/locations" },
};

export default function LocationsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Locations", path: "/locations" },
        ])}
      />

      <div className="pt-20">
        <section className="bg-primary text-white py-20 md:py-28">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <p className="text-white/70 text-xs uppercase tracking-[0.3em] mb-4" style={{ fontWeight: 600 }}>
              California Statewide
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl mb-6 leading-tight" style={{ fontWeight: 700 }}>
              Our Distribution Centers
            </h1>
            <p className="text-lg text-white/85 max-w-2xl leading-relaxed">
              Four locations across California — San Diego, Los Angeles, Fresno, and San Jose — delivering
              2,500+ Asian food SKUs to restaurants six days a week.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 gap-6">
              {branches.map((branch) => (
                <Link
                  key={branch.slug}
                  href={`/locations/${branch.slug}`}
                  className="group p-8 rounded-2xl border border-border hover:border-primary/30 hover:shadow-md transition-all"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-primary mb-2" style={{ fontWeight: 600 }}>
                    Distribution Center
                  </p>
                  <h2 className="text-xl mb-4 group-hover:text-primary transition-colors" style={{ fontWeight: 700 }}>
                    {branch.city}, CA
                  </h2>
                  <ul className="space-y-2 text-foreground/70 text-sm mb-6">
                    <li className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      {branch.address}
                    </li>
                    <li className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                      {branch.phone}
                    </li>
                  </ul>
                  <span className="inline-flex items-center gap-1 text-primary text-sm" style={{ fontWeight: 600 }}>
                    View location <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
