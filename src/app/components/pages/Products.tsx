"use client";

import { motion, AnimatePresence, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Building2,
  ChevronDown,
  Package,
  Snowflake,
  Sparkles,
  Truck,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { categories } from "@/app/data/categories";
import { useCases, type UseCaseIcon } from "@/app/data/useCases";
import dynamic from "next/dynamic";
import { CategoryReel } from "@/app/components/products/CategoryReel";

const CategoryDetail = dynamic(
  () => import("@/app/components/products/CategoryDetail").then((m) => m.CategoryDetail),
  { ssr: false }
);
import {
  BobaCupIcon,
  PhoBowlIcon,
  SushiFishIcon,
  WokIcon,
} from "@/app/components/products/UseCaseIcons";
import { ScrollProgress } from "@/app/components/motion/ScrollProgress";
import { CountUp } from "@/app/components/motion/CountUp";
import { usePrefersReducedMotion } from "@/app/hooks/usePrefersReducedMotion";
import { useLocale } from "@/app/components/LocaleProvider";

const MotionLink = motion.create(Link);

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
};

// NOTE: Stats values below are placeholders — confirm with client before launch.
type Stat =
  | { kind: "count"; icon: LucideIcon; to: number; suffix?: string; prefix?: string; label: string }
  | { kind: "static"; icon: LucideIcon; value: string; label: string };

// NOTE: Placeholder supplier list — client must validate before launch.
const SUPPLIER_BRANDS = [
  "Lee Kum Kee", "Kikkoman", "Three Crabs", "Koon Chun", "Pearl River Bridge",
  "Mama Sita's", "Aroy-D", "Mae Ploy", "Knorr", "Maggi", "Datu Puti", "Silver Swan",
  "Yamasa", "San-J", "Marukan", "Healthy Boy", "Megachef", "Squid Brand",
  "Golden Mountain", "UFC", "Mizkan", "Mutti", "Tipco", "Sriracha",
];

type UseCaseIconComponent = (props: { className?: string }) => JSX.Element;

const useCaseIconMap: Record<UseCaseIcon, UseCaseIconComponent> = {
  BobaCup: BobaCupIcon,
  PhoBowl: PhoBowlIcon,
  Wok: WokIcon,
  SushiFish: SushiFishIcon,
};

export default function Products() {
  const prm = usePrefersReducedMotion();
  const { t } = useLocale();
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const modalTriggerRef = useRef<HTMLElement | null>(null);

  const stats: Stat[] = [
    { kind: "count", icon: Package, to: 2500, suffix: "+", label: t.products.stats.skus },
    { kind: "static", icon: Truck, value: "6X", label: t.products.stats.delivery },
    { kind: "count", icon: Building2, to: 180, suffix: "+", label: t.products.stats.suppliers },
    { kind: "static", icon: Snowflake, value: "−10°F", label: t.products.stats.coldChain },
  ];

  const sourcingSteps = [
    { num: "01", ...t.products.process.step1 },
    { num: "02", ...t.products.process.step2 },
    { num: "03", ...t.products.process.step3 },
  ];

  // Hero parallax + mouse follow
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImageY = useTransform(heroProgress, [0, 1], ["0%", "30%"]);
  const heroOverlayOpacity = useTransform(heroProgress, [0, 1], [0.7, 0.95]);
  const heroContentY = useTransform(heroProgress, [0, 1], ["0%", "-15%"]);
  const chevronOpacity = useTransform(heroProgress, [0, 0.3], [1, 0]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 18 });
  const smy = useSpring(my, { stiffness: 60, damping: 18 });
  const imgPx = useTransform(smx, [-1, 1], [-12, 12]);
  const imgPy = useTransform(smy, [-1, 1], [-8, 8]);

  const onHeroMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (prm) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };

  const onHeroMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  // Listen for category:open events from reel + use-cases. Capture the active
  // element at the moment of the open so we can restore focus when the modal closes.
  useEffect(() => {
    const onOpen = (e: Event) => {
      const slug = (e as CustomEvent<string>).detail;
      if (typeof slug !== "string") return;
      const active = document.activeElement;
      if (active instanceof HTMLElement) modalTriggerRef.current = active;
      setSelectedSlug(slug);
    };
    window.addEventListener("category:open", onOpen);
    return () => window.removeEventListener("category:open", onOpen);
  }, []);

  // Restore focus to whatever opened the modal when it closes.
  useEffect(() => {
    if (selectedSlug === null) {
      modalTriggerRef.current?.focus();
    }
  }, [selectedSlug]);

  // Escape to close detail panel
  useEffect(() => {
    if (!selectedSlug) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedSlug(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedSlug]);

  // Scroll opened panel into view
  useEffect(() => {
    if (!selectedSlug) return;
    const id = `panel-${selectedSlug}`;
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [selectedSlug]);

  return (
    <div className="pt-20">
      <ScrollProgress />

      {/* Hero */}
      <section
        ref={heroRef}
        onMouseMove={onHeroMouseMove}
        onMouseLeave={onHeroMouseLeave}
        className="relative h-[70vh] min-h-[560px] flex items-center overflow-hidden"
      >
        <motion.div style={{ y: heroImageY }} className="absolute inset-0">
          <motion.div style={{ x: imgPx, y: imgPy }} className="absolute inset-0">
            <motion.div
              animate={prm ? undefined : { scale: [1.05, 1.18, 1.05] }}
              transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 transform-gpu"
              style={{ scale: 1.05 }}
            >
              <Image
                src="/images/products-hero.webp"
                alt="Fresh produce market"
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </motion.div>
        <motion.div
          style={{ opacity: heroOverlayOpacity }}
          className="absolute inset-0 bg-gradient-to-r from-primary via-primary/85 to-primary/60"
        />

        <motion.div
          style={{ y: heroContentY }}
          className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="inline-block mb-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
          >
            <span className="text-white/90 text-sm" style={{ fontWeight: 500 }}>
              {t.products.hero.badge}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-white mb-6 leading-[1.15] sm:leading-[1.1]"
            style={{ fontWeight: 700 }}
          >
            {t.products.hero.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="text-base md:text-lg lg:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed"
          >
            {t.products.hero.subtitle}
          </motion.p>
        </motion.div>

        <motion.div
          style={{ opacity: chevronOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80 z-10 pointer-events-none"
          aria-hidden
        >
          <motion.div
            animate={prm ? undefined : { y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Strip */}
      <section className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-14"
          >
            <p
              className="text-white/60 text-xs uppercase tracking-[0.3em] mb-4"
              style={{ fontWeight: 600 }}
            >
              {t.products.stats.eyebrow}
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-5xl mb-4 leading-snug" style={{ fontWeight: 700 }}>
              {t.products.stats.title}
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto leading-relaxed">
              {t.products.stats.subtitle}
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-12"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                whileHover={prm ? undefined : "hover"}
                initial="rest"
                animate="rest"
                className="text-center"
              >
                <motion.div
                  variants={{
                    rest: { scale: 1, rotate: 0 },
                    hover: {
                      scale: 1.15,
                      rotate: [0, -8, 8, 0],
                      transition: { type: "tween", duration: 0.4, ease: "easeInOut" },
                    },
                  }}
                  className="flex justify-center mb-4"
                >
                  <stat.icon className="w-10 h-10 text-white" />
                </motion.div>
                <div className="text-3xl md:text-4xl lg:text-5xl mb-2" style={{ fontWeight: 700 }}>
                  {stat.kind === "count" ? (
                    <CountUp to={stat.to} suffix={stat.suffix} prefix={stat.prefix} />
                  ) : (
                    stat.value
                  )}
                </div>
                <div className="text-white/70 text-sm md:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Category Reel — pinned horizontal showcase */}
      <CategoryReel />

      {/* Off-catalog sourcing — promoted full-bleed section */}
      <section className="relative isolate min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="/images/products-cant-find-bg.webp"
            alt="Warehouse shelves stocked with specialty ingredients"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/85 via-primary/80 to-primary/90" />
        </div>

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8 py-24 md:py-28 text-center text-white"
        >
          <div className="w-14 h-14 mx-auto mb-6 rounded-xl bg-white/10 flex items-center justify-center">
            <Sparkles className="w-7 h-7" />
          </div>
          <p className="text-white/70 text-xs uppercase tracking-[0.3em] mb-4" style={{ fontWeight: 600 }}>
            {t.products.sourcing.eyebrow}
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-5xl mb-6 leading-tight" style={{ fontWeight: 700 }}>
            {t.products.sourcing.title}
          </h2>
          <p className="text-white/85 text-lg leading-relaxed mb-8">
            {t.products.sourcing.body}
          </p>
          <MotionLink
            href="/partner-application"
            whileHover={prm ? undefined : { scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 bg-white text-primary rounded-xl inline-flex items-center gap-2 hover:bg-white/95 transition-colors"
            style={{ fontWeight: 600 }}
          >
            {t.cta.requestSku}
            <ArrowRight className="w-5 h-5" />
          </MotionLink>
        </motion.div>
      </section>

      {/* Inline detail overlay — opens on top of the page wherever the user clicked from */}
      <AnimatePresence>
        {selectedSlug && (() => {
          const cat = categories.find((c) => c.slug === selectedSlug);
          if (!cat) return null;
          return (
            <motion.div
              key="category-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setSelectedSlug(null)}
              className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-start sm:items-center justify-center overflow-y-auto py-6 px-4 sm:px-6"
              role="dialog"
              aria-modal="true"
              aria-label={`${cat.name} category details`}
            >
              <motion.div
                initial={prm ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 30 }}
                animate={prm ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
                exit={prm ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 30 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-5xl"
              >
                <CategoryDetail
                  category={cat}
                  onClose={() => setSelectedSlug(null)}
                />
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      {/* Use Cases */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-14 max-w-2xl mx-auto"
          >
            <p
              className="text-primary text-xs uppercase tracking-[0.3em] mb-4"
              style={{ fontWeight: 600 }}
            >
              {t.products.useCases.eyebrow}
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-5xl mb-4 leading-snug" style={{ fontWeight: 700 }}>
              {t.products.useCases.title}
            </h2>
            <p className="text-foreground/70 leading-relaxed">
              {t.products.useCases.subtitle}
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="flex md:grid overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none -mx-6 md:mx-0 px-6 md:px-0 gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-4 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
          >
            {useCases.map((uc) => (
              <UseCaseCard key={uc.slug} useCase={uc} />
            ))}
          </motion.div>

          <p
            className="md:hidden text-center text-foreground/40 text-xs uppercase tracking-[0.3em] mt-4"
            style={{ fontWeight: 600 }}
            aria-hidden="true"
          >
            {t.products.useCases.swipeHint}
          </p>
        </div>
      </section>

      {/* Supplier Marquee */}
      <section className="bg-secondary py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-10">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center"
          >
            <p
              className="text-foreground/60 text-xs uppercase tracking-[0.3em]"
              style={{ fontWeight: 600 }}
            >
              {t.products.marquee.eyebrow}
            </p>
            <h2 className="text-2xl md:text-3xl mt-3" style={{ fontWeight: 700 }}>
              {t.products.marquee.title}
            </h2>
          </motion.div>
        </div>

        <div className="space-y-4 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <MarqueeRow direction="left" duration={40} brands={SUPPLIER_BRANDS} />
          <MarqueeRow direction="right" duration={50} brands={[...SUPPLIER_BRANDS].reverse()} />
        </div>
      </section>

      {/* Sourcing Process */}
      <section className="bg-primary text-white py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-16 max-w-2xl mx-auto"
          >
            <p
              className="text-white/60 text-xs uppercase tracking-[0.3em] mb-4"
              style={{ fontWeight: 600 }}
            >
              {t.products.process.eyebrow}
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-5xl mb-4 leading-snug" style={{ fontWeight: 700 }}>
              {t.products.process.title}
            </h2>
            <p className="text-white/70 leading-relaxed">
              {t.products.process.subtitle}
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={{ animate: { transition: { staggerChildren: 0.15 } } }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          >
            {sourcingSteps.map((step) => (
              <motion.div
                key={step.num}
                variants={fadeInUp}
                className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-10 border border-white/10 overflow-hidden"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 1.2 }}
                  whileInView={{ opacity: 0.18, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute -top-4 -right-2 text-[10rem] leading-none pointer-events-none select-none"
                  style={{ fontWeight: 700 }}
                  aria-hidden
                >
                  {step.num}
                </motion.div>
                <div className="relative">
                  <p
                    className="text-white/60 text-xs tracking-[0.3em] mb-4"
                    style={{ fontWeight: 600 }}
                  >
                    {t.products.process.stepLabel} {step.num}
                  </p>
                  <h3 className="text-2xl md:text-3xl mb-4" style={{ fontWeight: 700 }}>
                    {step.title}
                  </h3>
                  <p className="text-white/80 leading-relaxed">{step.body}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-white">
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

            <div className="relative z-10 px-8 md:px-12 py-20 md:py-28 text-center">
              <h2 className="text-2xl sm:text-3xl md:text-5xl text-white mb-6 leading-tight" style={{ fontWeight: 700 }}>
                {t.products.finalCta.title}
              </h2>
              <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
                {t.products.finalCta.body}
              </p>
              <div className="flex justify-center">
                <MotionLink
                  href="/partner-application"
                  whileHover={prm ? undefined : { scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-10 py-5 bg-white text-primary rounded-xl inline-flex items-center gap-2 hover:bg-white/95 transition-colors"
                  style={{ fontWeight: 600 }}
                >
                  {t.products.finalCta.primary}
                  <ArrowRight className="w-5 h-5" />
                </MotionLink>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function MarqueeRow({
  direction,
  duration,
  brands,
}: {
  direction: "left" | "right";
  duration: number;
  brands: string[];
}) {
  const prm = usePrefersReducedMotion();
  const from = direction === "left" ? "0%" : "-50%";
  const to = direction === "left" ? "-50%" : "0%";
  const doubled = [...brands, ...brands];
  return (
    <div className="overflow-hidden">
      <motion.div
        animate={prm ? undefined : { x: [from, to] }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
        className="flex gap-4 whitespace-nowrap will-change-transform transform-gpu"
      >
        {doubled.map((b, i) => (
          <span
            key={`${b}-${i}`}
            className="px-6 py-3 bg-white rounded-2xl text-foreground/70 text-sm md:text-base shrink-0 border border-border"
            style={{ fontWeight: 500 }}
          >
            {b}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

const useCaseCardVariants = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

const useCaseHover = { rest: {}, hover: {} };

const useCaseListVariants = {
  rest: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
  hover: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } },
};

const useCaseItemVariants = {
  rest: { opacity: 0.55, x: -4 },
  hover: { opacity: 1, x: 0, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] as const } },
};

function UseCaseCard({ useCase }: { useCase: (typeof useCases)[number] }) {
  const prm = usePrefersReducedMotion();
  const { t } = useLocale();
  const Icon = useCaseIconMap[useCase.icon];
  return (
    <motion.div
      variants={useCaseCardVariants}
      whileHover={prm ? undefined : { y: -8 }}
      className="group bg-white rounded-2xl border border-border p-6 md:p-7 shadow-sm hover:shadow-xl transition-shadow duration-300 min-w-[85%] snap-start shrink-0 md:min-w-0 md:shrink"
    >
      <motion.div
        initial="rest"
        whileHover="hover"
        animate="rest"
        variants={useCaseHover}
        className="h-full flex flex-col"
      >
        <motion.div
          whileHover={
            prm
              ? undefined
              : {
                  scale: 1.12,
                  transition: { type: "tween", duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                }
          }
          className="w-12 h-12 rounded-xl bg-accent text-primary flex items-center justify-center mb-5"
        >
          <Icon className="w-7 h-7" />
        </motion.div>
        <h3 className="text-xl mb-2" style={{ fontWeight: 700 }}>
          {useCase.name}
        </h3>
        <p className="text-foreground/60 text-sm mb-5 leading-relaxed">{useCase.tagline}</p>

        <motion.ul variants={useCaseListVariants} className="space-y-2 mb-6">
          {useCase.items.map((item) => (
            <motion.li
              key={item}
              variants={useCaseItemVariants}
              className="flex items-start gap-2 text-sm text-foreground/80"
            >
              <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-primary mt-2" />
              <span>{item}</span>
            </motion.li>
          ))}
        </motion.ul>

      </motion.div>
    </motion.div>
  );
}
