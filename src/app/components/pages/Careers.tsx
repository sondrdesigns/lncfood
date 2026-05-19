"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { MapPin, Clock, Briefcase, Search } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import Link from "next/link";
import type { Job, JobType } from "@/app/data/jobs";
import { usePrefersReducedMotion } from "@/app/hooks/usePrefersReducedMotion";
import { useLocale } from "@/app/components/LocaleProvider";

const MotionLink = motion.create(Link);

type Filter = "ALL" | JobType;

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
};

export default function Careers({ jobs }: { jobs: Job[] }) {
  const prm = usePrefersReducedMotion();
  const { t } = useLocale();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<Filter>("ALL");

  const jobTypes: { id: Filter; name: string }[] = [
    { id: "ALL", name: t.careers.search.allPositions },
    { id: "WAREHOUSE", name: t.careers.search.warehouse },
    { id: "DELIVERY", name: t.careers.search.delivery },
    { id: "SALES", name: t.careers.search.sales },
    { id: "ADMIN", name: t.careers.search.admin },
  ];

  const filteredJobs = useMemo(() => {
    const q = searchTerm.toLowerCase();
    return jobs.filter((job) => {
      const matchesType = selectedType === "ALL" || job.type === selectedType;
      const matchesSearch =
        !q ||
        job.title.toLowerCase().includes(q) ||
        job.location.toLowerCase().includes(q) ||
        job.description.toLowerCase().includes(q);
      return matchesType && matchesSearch;
    });
  }, [jobs, searchTerm, selectedType]);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/careers-hero.webp"
            alt="Warehouse team"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl text-white mb-6" style={{ fontWeight: 700 }}>
              {t.careers.hero.title}
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              {t.careers.hero.body1}
            </p>
            <p className="text-lg text-white/80">
              {t.careers.hero.body2}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            <div className="relative flex-1 w-full">
              <label htmlFor="careers-search" className="sr-only">
                {t.careers.search.ariaLabel}
              </label>
              <motion.span
                whileHover={
                  prm
                    ? undefined
                    : {
                        scale: 1.15,
                        rotate: [0, -8, 8, 0],
                        transition: { type: "tween", duration: 0.4, ease: "easeInOut" },
                      }
                }
                className="absolute left-4 top-1/2 -translate-y-1/2 inline-flex pointer-events-none"
                aria-hidden="true"
              >
                <Search className="w-5 h-5 text-foreground/40" />
              </motion.span>
              <input
                id="careers-search"
                type="search"
                placeholder={t.careers.search.placeholder}
                aria-label={t.careers.search.ariaLabel}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-secondary rounded-xl border border-transparent focus:border-primary focus:outline-none transition-colors text-base"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 w-full lg:w-auto">
              {jobTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setSelectedType(type.id)}
                  aria-pressed={selectedType === type.id}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                    selectedType === type.id
                      ? "bg-primary text-white"
                      : "bg-secondary text-foreground/70 hover:bg-accent"
                  }`}
                  style={{ fontWeight: 500 }}
                >
                  {type.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className="space-y-6"
          >
            {filteredJobs.map((job) => {
              return (
                <motion.div
                  key={job.slug}
                  variants={fadeInUp}
                  whileHover={{ x: 4 }}
                  className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    <div className="flex-1">
                      <Link
                        href={`/careers/${job.slug}`}
                        className="inline-block text-xl sm:text-2xl mb-3 hover:text-primary transition-colors"
                        style={{ fontWeight: 600 }}
                      >
                        {job.title}
                      </Link>

                      <div className="flex flex-wrap gap-4 mb-4">
                        <div className="flex items-center gap-2 text-foreground/60">
                          <motion.span
                            whileHover={
                              prm
                                ? undefined
                                : {
                                    scale: 1.2,
                                    rotate: [0, -10, 10, 0],
                                    transition: { type: "tween", duration: 0.4, ease: "easeInOut" },
                                  }
                            }
                            className="inline-flex"
                          >
                            <MapPin className="w-4 h-4" />
                          </motion.span>
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-foreground/60">
                          <motion.span
                            whileHover={
                              prm
                                ? undefined
                                : {
                                    scale: 1.2,
                                    rotate: 360,
                                    transition: { type: "tween", duration: 0.6, ease: "easeInOut" },
                                  }
                            }
                            className="inline-flex"
                          >
                            <Clock className="w-4 h-4" />
                          </motion.span>
                          <span>{job.schedule}</span>
                        </div>
                        <div className="flex items-center gap-2 text-foreground/60">
                          <motion.span
                            whileHover={
                              prm
                                ? undefined
                                : {
                                    scale: 1.2,
                                    y: [-1, 1, -1],
                                    transition: { type: "tween", duration: 0.4, ease: "easeInOut" },
                                  }
                            }
                            className="inline-flex"
                          >
                            <Briefcase className="w-4 h-4" />
                          </motion.span>
                          <span className="capitalize">{job.type.toLowerCase()}</span>
                        </div>
                      </div>

                      <p className="text-foreground/70 mb-4 leading-relaxed">{job.description}</p>

                      <div>
                        <h4 className="text-sm mb-2" style={{ fontWeight: 600 }}>{t.careers.listings.requirementsLabel}</h4>
                        <ul className="space-y-1">
                          {job.requirements.map((req, i) => (
                            <li key={i} className="text-sm text-foreground/60 flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="lg:pl-8">
                      <MotionLink
                        href={`/careers/${job.slug}/apply`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors whitespace-nowrap"
                        style={{ fontWeight: 600 }}
                      >
                        {t.cta.applyNow}
                      </MotionLink>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-foreground/60">{t.careers.listings.noResults}</p>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
