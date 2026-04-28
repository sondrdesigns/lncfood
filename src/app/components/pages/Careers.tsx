"use client";

import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { MapPin, Clock, Briefcase, Search } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import Link from "next/link";
import type { Job, JobType } from "@/app/data/jobs";

const MotionLink = motion.create(Link);
const MotionAnchor = motion.a;

type Filter = "ALL" | JobType;

const jobTypes: { id: Filter; name: string }[] = [
  { id: "ALL", name: "All Positions" },
  { id: "WAREHOUSE", name: "Warehouse" },
  { id: "DELIVERY", name: "Delivery" },
  { id: "SALES", name: "Sales" },
  { id: "ADMIN", name: "Administrative" },
];

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
};

const isExternalUrl = (url: string) => /^(https?:|mailto:|tel:)/i.test(url);

export default function Careers({ jobs }: { jobs: Job[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<Filter>("ALL");

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
          <ImageWithFallback
            src="/images/careers-hero.webp"
            alt="Warehouse team"
            className="w-full h-full object-cover"
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
            <h1 className="text-5xl md:text-6xl text-white mb-6" style={{ fontWeight: 700 }}>
              Join Our Team
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              We don't just move products – we move the food industry forward. And that starts with people like you. Whether you're behind the wheel, at the desk, or out in the field, you'll feel right at home here.
            </p>
            <p className="text-lg text-white/80">
              If you're looking for a stable, supportive, and growth-focused environment, you'll feel right at home here.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
              <input
                type="text"
                placeholder="Search positions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-secondary rounded-xl border border-transparent focus:border-primary focus:outline-none transition-colors"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 w-full lg:w-auto">
              {jobTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
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
              const isExternal = isExternalUrl(job.applyUrl);
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
                        className="inline-block text-2xl mb-3 hover:text-primary transition-colors"
                        style={{ fontWeight: 600 }}
                      >
                        {job.title}
                      </Link>

                      <div className="flex flex-wrap gap-4 mb-4">
                        <div className="flex items-center gap-2 text-foreground/60">
                          <MapPin className="w-4 h-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-foreground/60">
                          <Clock className="w-4 h-4" />
                          <span>{job.schedule}</span>
                        </div>
                        <div className="flex items-center gap-2 text-foreground/60">
                          <Briefcase className="w-4 h-4" />
                          <span className="capitalize">{job.type.toLowerCase()}</span>
                        </div>
                      </div>

                      <p className="text-foreground/70 mb-4 leading-relaxed">{job.description}</p>

                      <div>
                        <h4 className="text-sm mb-2" style={{ fontWeight: 600 }}>Requirements:</h4>
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
                      {isExternal ? (
                        <MotionAnchor
                          href={job.applyUrl}
                          target={job.applyUrl.startsWith("http") ? "_blank" : undefined}
                          rel={job.applyUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                          className="inline-flex px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors whitespace-nowrap"
                          style={{ fontWeight: 600 }}
                        >
                          Apply Now
                        </MotionAnchor>
                      ) : (
                        <MotionLink
                          href={job.applyUrl}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                          className="inline-flex px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors whitespace-nowrap"
                          style={{ fontWeight: 600 }}
                        >
                          Apply Now
                        </MotionLink>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-foreground/60">No positions found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl text-foreground mb-4" style={{ fontWeight: 700 }}>
              Why Work With Us?
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              We invest in our team because we know that great people create great results
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                title: "Competitive Pay",
                description: "Industry-leading compensation packages with regular performance reviews and raises."
              },
              {
                title: "Growth Opportunities",
                description: "Clear career paths with training and development programs to help you advance."
              },
              {
                title: "Family Atmosphere",
                description: "We treat our team like family, with a supportive culture that values every member."
              },
              {
                title: "Health Benefits",
                description: "Comprehensive health, dental, and vision coverage for you and your family."
              },
              {
                title: "Work-Life Balance",
                description: "Flexible scheduling and paid time off to help you maintain a healthy balance."
              },
              {
                title: "Team Culture",
                description: "Join a diverse team that celebrates collaboration and mutual respect."
              }
            ].map((benefit) => (
              <motion.div
                key={benefit.title}
                variants={fadeInUp}
                className="bg-secondary rounded-2xl p-8"
              >
                <h3 className="text-xl mb-3" style={{ fontWeight: 600 }}>{benefit.title}</h3>
                <p className="text-foreground/60 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
