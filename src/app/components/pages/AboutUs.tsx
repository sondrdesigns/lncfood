"use client";

import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Globe, TrendingUp, Coins, Handshake, MapPin, Phone, X, ImageIcon } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { branches, directionsUrl, type Branch } from "@/app/data/locations";
import { useLocale } from "@/app/components/LocaleProvider";

const MotionLink = motion.create(Link);

export default function AboutUs() {
  const pathname = usePathname();
  const { t } = useLocale();
  const [openLocation, setOpenLocation] = useState<Branch | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const modalCloseRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    setOpenLocation(null);
  }, [pathname]);

  useEffect(() => {
    if (!openLocation) {
      triggerRef.current?.focus();
      return;
    }
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    modalCloseRef.current?.focus();
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenLocation(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", handleKey);
    };
  }, [openLocation]);

  const openLocationModal = (loc: Branch, el: HTMLElement) => {
    triggerRef.current = el;
    setOpenLocation(loc);
  };

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

  const ingredientCardVariants = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
    hover: { y: -8, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const } }
  };

  const ingredients = [
    {
      icon: Globe,
      ...t.about.ingredients.integrity,
      iconVariants: {
        initial: { rotate: 0 },
        animate: { rotate: 0 },
        hover: { rotate: 360, transition: { type: "tween" as const, duration: 1.2, ease: "easeInOut" as const } }
      }
    },
    {
      icon: TrendingUp,
      ...t.about.ingredients.hunger,
      iconVariants: {
        initial: { y: 0 },
        animate: { y: 0 },
        hover: { y: [0, -6, 0], transition: { type: "tween" as const, duration: 0.9, ease: "easeInOut" as const, repeat: Infinity } }
      }
    },
    {
      icon: Coins,
      ...t.about.ingredients.buyingPower,
      iconVariants: {
        initial: { rotate: 0 },
        animate: { rotate: 0 },
        hover: { rotate: [0, -10, 10, -6, 6, 0], transition: { type: "tween" as const, duration: 1, ease: "easeInOut" as const } }
      }
    },
    {
      icon: Handshake,
      ...t.about.ingredients.partnership,
      iconVariants: {
        initial: { scale: 1 },
        animate: { scale: 1 },
        hover: { scale: [1, 1.12, 1], transition: { type: "tween" as const, duration: 0.7, ease: "easeInOut" as const, repeat: Infinity } }
      }
    }
  ];

  const locations = branches;

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/about-hero.webp"
            alt="Warehouse with fresh produce"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl text-white mb-6"
            style={{ fontWeight: 700 }}
          >
            {t.about.hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl text-white/90 max-w-2xl mx-auto"
          >
            {t.about.hero.subtitle}
          </motion.p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl text-foreground mb-6" style={{ fontWeight: 700 }}>
                {t.about.story.title}
              </h2>
              <div className="space-y-4 text-lg text-foreground/70 leading-relaxed">
                <p>{t.about.story.body1}</p>
                <p>{t.about.story.body2}</p>
                <p>{t.about.story.body3}</p>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <ImageWithFallback
                  src="/images/about-story-section.webp"
                  alt="Distribution truck"
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="absolute -bottom-8 -right-8 bg-white rounded-2xl shadow-xl p-8 max-w-xs"
              >
                <div className="text-4xl text-primary mb-2" style={{ fontWeight: 700 }}>29+</div>
                <div className="text-foreground/60">{t.about.story.yearsBadgeLabel}</div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Ingredients for Success */}
      <section className="py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-foreground mb-4" style={{ fontWeight: 700 }}>
              {t.about.ingredients.title}
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              {t.about.ingredients.subtitle}
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {ingredients.map((ingredient) => {
              const Icon = ingredient.icon;
              return (
                <motion.div
                  key={ingredient.title}
                  variants={ingredientCardVariants}
                  whileHover="hover"
                  className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <motion.div
                    variants={ingredient.iconVariants}
                    className="w-16 h-16 rounded-xl bg-accent flex items-center justify-center mb-6"
                  >
                    <Icon className="w-8 h-8 text-primary" />
                  </motion.div>
                  <h3 className="text-xl mb-3" style={{ fontWeight: 600 }}>{ingredient.title}</h3>
                  <p className="text-foreground/60 leading-relaxed line-clamp-3">{ingredient.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Built for Scale — photo-led split layout */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={fadeInUp} className="relative order-2 lg:order-1">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                {/* TODO: replace with nanobanana-generated image of franchise-restaurants-in-a-mall or similar */}
                <ImageWithFallback
                  src="/images/about-built-for-scale.webp"
                  alt="Franchise restaurants supplied at scale"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="order-1 lg:order-2">
              <h2 className="text-3xl sm:text-4xl md:text-5xl text-foreground mb-6" style={{ fontWeight: 700 }}>
                {t.about.builtForScale.title}
              </h2>
              <div className="space-y-4 text-lg text-foreground/70 leading-relaxed mb-8">
                <p>{t.about.builtForScale.body1}</p>
                <p>{t.about.builtForScale.body2}</p>
              </div>
              <MotionLink
                href="/partner-application"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-xl inline-flex items-center gap-2 transition-colors"
                style={{ fontWeight: 600 }}
              >
                {t.cta.partnerWithUs}
                <ArrowRight className="w-5 h-5" />
              </MotionLink>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Locations — click-to-expand photo cards */}
      <section className="py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-foreground mb-4" style={{ fontWeight: 700 }}>
              {t.about.locations.title}
            </h2>
            <p className="text-lg text-foreground/70">
              {t.about.locations.subtitle}
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8"
          >
            {locations.map((location) => (
              <motion.button
                key={location.slug}
                type="button"
                onClick={(e) => openLocationModal(location, e.currentTarget)}
                variants={fadeInUp}
                whileHover={{ y: -6 }}
                aria-labelledby={`loc-${location.slug}-title loc-${location.slug}-addr`}
                className="group text-left bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 focus:outline-none focus:ring-4 focus:ring-primary/30"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-foreground/5">
                  {location.image ? (
                    <ImageWithFallback
                      src={location.image}
                      alt=""
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex flex-col items-center justify-center text-foreground/30"
                      aria-hidden="true"
                    >
                      <ImageIcon className="w-10 h-10 mb-2" />
                      <span className="text-sm">{t.about.locations.photoComingSoon}</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3
                    id={`loc-${location.slug}-title`}
                    className="text-xl text-primary mb-2"
                    style={{ fontWeight: 600 }}
                  >
                    L&amp;C {location.city}
                  </h3>
                  <p
                    id={`loc-${location.slug}-addr`}
                    className="text-foreground/70 text-sm flex items-start gap-2"
                  >
                    <MapPin className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
                    <span>{location.address}</span>
                  </p>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {openLocation && (
          <motion.div
            key="location-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpenLocation(null)}
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-label={`L&C ${openLocation.city} details`}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl bg-white rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <button
                ref={modalCloseRef}
                type="button"
                onClick={() => setOpenLocation(null)}
                aria-label={t.about.locations.closeAria}
                className="absolute top-4 right-4 z-10 inline-flex items-center justify-center w-11 h-11 rounded-full bg-white/95 hover:bg-white text-foreground/70 hover:text-foreground shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[16/9] bg-foreground/5">
                {openLocation.image ? (
                  <ImageWithFallback
                    src={openLocation.image}
                    alt={`L&C ${openLocation.city} warehouse`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-foreground/30">
                    <ImageIcon className="w-12 h-12 mb-2" />
                    <span>{t.about.locations.photoComingSoon}</span>
                  </div>
                )}
              </div>

              <div className="p-6 sm:p-8">
                <h3 className="text-3xl text-primary mb-4" style={{ fontWeight: 700 }}>
                  L&amp;C {openLocation.city}
                </h3>

                <div className="space-y-3 mb-6">
                  <p className="text-foreground/80 flex items-start gap-3">
                    <MapPin className="w-5 h-5 mt-0.5 shrink-0 text-primary" />
                    <span>{openLocation.address}</span>
                  </p>
                  <p className="text-foreground/80 flex items-start gap-3">
                    <Phone className="w-5 h-5 mt-0.5 shrink-0 text-primary" />
                    <a
                      href={`tel:${openLocation.phone}`}
                      className="hover:text-primary hover:underline"
                      style={{ fontWeight: 500 }}
                    >
                      {openLocation.phone}
                    </a>
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={directionsUrl(openLocation.address)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl inline-flex items-center justify-center gap-2 transition-colors"
                    style={{ fontWeight: 600 }}
                  >
                    {t.cta.getDirections}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href={`tel:${openLocation.phone}`}
                    className="px-6 py-3 bg-secondary hover:bg-accent text-foreground rounded-xl inline-flex items-center justify-center gap-2 transition-colors"
                    style={{ fontWeight: 600 }}
                  >
                    <Phone className="w-4 h-4" />
                    {t.cta.callBranch}
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
