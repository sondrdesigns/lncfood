"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { CountUp } from "../motion/CountUp";
import { usePrefersReducedMotion } from "@/app/hooks/usePrefersReducedMotion";

const MotionLink = motion.create(Link);

export default function Home() {
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

  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] w-full flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="/images/home-hero.webp"
            alt="Modern warehouse facility"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block mb-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
            >
              <span className="text-white/90 text-sm" style={{ fontWeight: 500 }}>Trusted Since 1995</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl text-white mb-6 leading-tight" style={{ fontWeight: 700 }}>
              Your Trusted Asian Food Distribution Partner
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed" style={{ fontWeight: 400 }}>
              More than just supply – Global Foods, Local Solutions
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <MotionLink
                href="/partner-application"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-xl inline-flex items-center gap-2 transition-colors"
                style={{ fontWeight: 600 }}
              >
                Partner With Us
                <ArrowRight className="w-5 h-5" />
              </MotionLink>
              <MotionLink
                href="/products"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-xl inline-flex items-center transition-colors"
                style={{ fontWeight: 600 }}
              >
                Browse Catalog
              </MotionLink>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="min-h-screen w-full flex items-center py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={fadeInUp}>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <ImageWithFallback
                  src="/images/home-about-section.webp"
                  alt="Warehouse operations"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h2 className="text-4xl md:text-5xl text-foreground mb-6" style={{ fontWeight: 700 }}>
                About L&C Food Distribution
              </h2>
              <p className="text-lg text-foreground/70 mb-6 leading-relaxed">
                At L&C Food Distribution, we don't just deliver products – we deliver peace of mind. As a business partner, our mission is to make your sourcing solution simple, consistent, and cost-effective.
              </p>
              <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
                Ready to experience the difference? Since 1995, we've been serving restaurants across California with unwavering commitment to quality and reliability.
              </p>
              <MotionLink
                href="/about"
                whileHover={{ x: 5 }}
                className="text-primary inline-flex items-center gap-2"
                style={{ fontWeight: 600 }}
              >
                Learn More About Us
                <ArrowRight className="w-5 h-5" />
              </MotionLink>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="min-h-screen w-full flex items-center py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl text-foreground mb-4" style={{ fontWeight: 700 }}>
              Our Services
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Comprehensive food distribution solutions tailored to your business needs
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                image: "/images/cat-fruits-vegetables.webp",
                title: "Fresh Vegetables",
                description: "Farm-fresh produce delivered daily to keep your menu vibrant and healthy."
              },
              {
                image: "/images/cat-meat-seafood.webp",
                title: "Meat Products",
                description: "Premium quality meats sourced from trusted suppliers for your customers."
              },
              {
                image: "/images/cat-dry-grocery.webp",
                title: "Dry Groceries",
                description: "Comprehensive selection of pantry staples and specialty Asian ingredients."
              },
              {
                image: "/images/cat-disposables.webp",
                title: "Disposables",
                description: "Complete range of food service supplies and packaging solutions."
              }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                variants={fadeInUp}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
              >
                <div className="aspect-[3/2] overflow-hidden">
                  <ImageWithFallback
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl mb-2" style={{ fontWeight: 600 }}>{service.title}</h3>
                  <p className="text-foreground/60">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative w-full py-24 md:py-28 bg-primary text-white overflow-hidden">
        {!prefersReducedMotion && (
          <motion.div
            aria-hidden
            className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.14),transparent_60%)]"
            animate={{ x: [0, 60, -20, 0], y: [0, -30, 20, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { to: 29, suffix: "", label: "Years of Excellence" },
              { to: 500, suffix: "+", label: "Restaurant Partners" },
              { to: 4, suffix: "", label: "California Distribution Centers + National Network" },
              { to: 10, suffix: "+", label: "Year Average Customer Tenure" }
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                className="text-center"
              >
                <div
                  className="mb-2 leading-none text-4xl md:text-5xl"
                  style={{ fontWeight: 700 }}
                >
                  <CountUp to={stat.to} suffix={stat.suffix} />
                </div>
                <div className="text-white/80">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="min-h-screen w-full flex items-center py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="relative rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0">
              <ImageWithFallback
                src="/images/home-cta-bg.webp"
                alt="Chef cooking"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/70" />
            </div>

            <div className="relative z-10 px-12 py-20 md:py-28 text-center">
              <h2 className="text-4xl md:text-5xl text-white mb-6" style={{ fontWeight: 700 }}>
                Ready to Partner With Us?
              </h2>
              <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                Join hundreds of successful restaurants across California who trust L&C Food Distribution for their supply needs.
              </p>
              <MotionLink
                href="/partner-application"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-5 bg-white text-primary rounded-xl inline-flex items-center gap-2 mx-auto w-fit hover:bg-white/95 transition-colors"
                style={{ fontWeight: 600 }}
              >
                Get Started Today
                <ArrowRight className="w-5 h-5" />
              </MotionLink>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
