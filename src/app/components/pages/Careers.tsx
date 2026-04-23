"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { MapPin, Clock, Briefcase, Search } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import Link from "next/link";

const MotionLink = motion.create(Link);

export default function Careers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const jobTypes = [
    { id: "all", name: "All Positions" },
    { id: "warehouse", name: "Warehouse" },
    { id: "delivery", name: "Delivery" },
    { id: "sales", name: "Sales" },
    { id: "admin", name: "Administrative" }
  ];

  const jobs = [
    {
      title: "Warehouse Associate",
      type: "warehouse",
      location: "Los Angeles, CA",
      schedule: "Full-time",
      description: "We're seeking reliable warehouse associates to join our team. Responsibilities include receiving shipments, organizing inventory, and preparing orders for delivery.",
      requirements: [
        "Ability to lift up to 50 lbs",
        "Forklift certification preferred",
        "Strong attention to detail",
        "Team player with good communication skills"
      ]
    },
    {
      title: "Delivery Driver",
      type: "delivery",
      location: "San Diego, CA",
      schedule: "Full-time",
      description: "Looking for experienced drivers to deliver quality food products to our restaurant partners. Must have clean driving record and excellent customer service skills.",
      requirements: [
        "Valid commercial driver's license",
        "Clean driving record",
        "Customer service experience",
        "Early morning availability"
      ]
    },
    {
      title: "Sales Representative",
      type: "sales",
      location: "Fresno, CA",
      schedule: "Full-time",
      description: "Join our sales team to build relationships with restaurant owners and expand our partner network. Ideal candidate has food service industry experience.",
      requirements: [
        "2+ years sales experience",
        "Food service industry knowledge",
        "Excellent communication skills",
        "Self-motivated and goal-oriented"
      ]
    },
    {
      title: "Inventory Manager",
      type: "warehouse",
      location: "Los Angeles, CA",
      schedule: "Full-time",
      description: "Oversee inventory operations across our distribution center. Manage stock levels, coordinate with suppliers, and ensure efficient warehouse operations.",
      requirements: [
        "3+ years inventory management experience",
        "Proficient with inventory management systems",
        "Strong organizational skills",
        "Leadership experience"
      ]
    },
    {
      title: "Account Manager",
      type: "sales",
      location: "San Jose, CA",
      schedule: "Full-time",
      description: "Manage relationships with existing restaurant partners and identify opportunities for growth. Provide exceptional service and support to ensure customer satisfaction.",
      requirements: [
        "Account management experience",
        "Strong relationship-building skills",
        "Problem-solving abilities",
        "Bilingual (English/Mandarin/Cantonese) preferred"
      ]
    },
    {
      title: "Administrative Assistant",
      type: "admin",
      location: "Los Angeles, CA",
      schedule: "Full-time",
      description: "Support our operations team with administrative tasks, data entry, and customer communications. Detail-oriented individual with strong organizational skills.",
      requirements: [
        "Proficient in Microsoft Office",
        "Excellent written communication",
        "Strong organizational skills",
        "Previous administrative experience"
      ]
    },
    {
      title: "Night Shift Warehouse Lead",
      type: "warehouse",
      location: "San Diego, CA",
      schedule: "Full-time (Night)",
      description: "Lead our night shift warehouse team. Coordinate operations, ensure quality control, and maintain safety standards throughout the shift.",
      requirements: [
        "2+ years warehouse leadership",
        "Forklift certification required",
        "Available for night shifts",
        "Strong team management skills"
      ]
    },
    {
      title: "Route Delivery Driver",
      type: "delivery",
      location: "Fresno, CA",
      schedule: "Full-time",
      description: "Establish and maintain delivery routes to restaurant partners. Build relationships with customers while ensuring timely and accurate deliveries.",
      requirements: [
        "Valid commercial driver's license",
        "Route delivery experience",
        "Excellent time management",
        "Customer-focused attitude"
      ]
    }
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesType = selectedType === "all" || job.type === selectedType;
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1592228533283-d78f7c1cf453?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw2fHxmb29kJTIwZGlzdHJpYnV0aW9uJTIwd2FyZWhvdXNlJTIwbG9naXN0aWNzfGVufDF8fHx8MTc3NjE0MjYxNHww&ixlib=rb-4.1.0&q=80&w=1080"
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
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job.title + job.location}
                variants={fadeInUp}
                whileHover={{ x: 4 }}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  <div className="flex-1">
                    <h3 className="text-2xl mb-3" style={{ fontWeight: 600 }}>{job.title}</h3>

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
                        <span className="capitalize">{job.type}</span>
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
                    <MotionLink
                      href="/partner-application"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors whitespace-nowrap"
                      style={{ fontWeight: 600 }}
                    >
                      Apply Now
                    </MotionLink>
                  </div>
                </div>
              </motion.div>
            ))}
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
            ].map((benefit, index) => (
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
