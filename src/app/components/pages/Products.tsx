"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Building2,
  ChefHat,
  ChevronDown,
  CupSoda,
  Fish,
  Package,
  Snowflake,
  Sparkles,
  Soup,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { categories } from "@/app/data/categories";
import { useCases, type UseCaseIcon } from "@/app/data/useCases";
import { CategoryCard } from "@/app/components/products/CategoryCard";
import { CategoryDetail } from "@/app/components/products/CategoryDetail";
import { CategoryReel } from "@/app/components/products/CategoryReel";
import { ScrollProgress } from "@/app/components/motion/ScrollProgress";
import { SplitWords } from "@/app/components/motion/SplitWords";
import { CountUp } from "@/app/components/motion/CountUp";
import { usePrefersReducedMotion } from "@/app/hooks/usePrefersReducedMotion";

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

const stats: Stat[] = [
  { kind: "count", icon: Package, to: 2500, suffix: "+", label: "SKUs in active catalog" },
  { kind: "static", icon: Truck, value: "6X", label: "Days of delivery in verified locations" },
  { kind: "count", icon: Building2, to: 180, suffix: "+", label: "Trusted suppliers worldwide" },
  { kind: "static", icon: Snowflake, value: "−10°F", label: "Cold-chain integrity, farm to door" },
];

// NOTE: Placeholder supplier list — client must validate before launch.
const SUPPLIER_BRANDS = [
  "Lee Kum Kee", "Kikkoman", "Three Crabs", "Koon Chun", "Pearl River Bridge",
  "Mama Sita's", "Aroy-D", "Mae Ploy", "Knorr", "Maggi", "Datu Puti", "Silver Swan",
  "Yamasa", "San-J", "Marukan", "Healthy Boy", "Megachef", "Squid Brand",
  "Golden Mountain", "UFC", "Mizkan", "Mutti", "Tipco", "Sriracha",
];

const sourcingSteps = [
  {
    num: "01",
    title: "We Source",
    body: "Direct relationships with growers, farms, and authentic Asian importers — vetted for consistency before they enter our network.",
  },
  {
    num: "02",
    title: "We QC & Stage",
    body: "Cold-chain monitored from receiving to staging. Every pallet inspected and logged; rejects don't make it onto trucks.",
  },
  {
    num: "03",
    title: "We Deliver",
    body: "Six days a week, four California distribution centers, one accountable team. If something's off, you call one number.",
  },
];

const useCaseIconMap: Record<UseCaseIcon, LucideIcon> = {
  CupSoda,
  Soup,
  ChefHat,
  Fish,
};

export default function Products() {
  const prm = usePrefersReducedMotion();
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

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

  // Listen for category:open events from reel + use-cases
  useEffect(() => {
    const onOpen = (e: Event) => {
      const slug = (e as CustomEvent<string>).detail;
      if (typeof slug === "string") setSelectedSlug(slug);
    };
    window.addEventListener("category:open", onOpen);
    return () => window.removeEventListener("category:open", onOpen);
  }, []);

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
              <ImageWithFallback
                src="/images/products-hero.webp"
                alt="Fresh produce market"
                className="w-full h-full object-cover"
                loading="eager"
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
              Catalog
            </span>
          </motion.div>

          <h1
            className="text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-[1.1]"
            style={{ fontWeight: 700 }}
          >
            <SplitWords text="Everything your kitchen runs on." />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto"
          >
            If you cook with it, we can source it. A network of 180+ vendors behind every truck
            — delivered across California since 1995.
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
              By the numbers
            </p>
            <h2 className="text-3xl md:text-5xl mb-4" style={{ fontWeight: 700 }}>
              A network big enough to say yes
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto leading-relaxed">
              Three decades of vendor relationships means almost nothing on your spec sheet is a
              no — and the things in stock arrive on schedule.
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
              <motion.div key={stat.label} variants={fadeInUp} className="text-center">
                <stat.icon className="w-10 h-10 mx-auto mb-4 text-white/80" />
                <div className="text-4xl md:text-5xl mb-2" style={{ fontWeight: 700 }}>
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

      {/* Catalog Bento + inline detail */}
      <section className="py-20 bg-secondary relative overflow-hidden" id="catalog-bento">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="mb-12 max-w-2xl"
          >
            <p
              className="text-primary text-xs uppercase tracking-[0.3em] mb-4"
              style={{ fontWeight: 600 }}
            >
              Browse the catalog
            </p>
            <h2 className="text-3xl md:text-4xl mb-4" style={{ fontWeight: 700 }}>
              Tap any category. Or ask us for what isn't listed.
            </h2>
            <p className="text-foreground/70 leading-relaxed">
              Five categories cover most kitchens. The sixth tile is for everything else — our
              network sources what doesn't make it onto this page.
            </p>
          </motion.div>

          <motion.div
            layout
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            transition={{ layout: { type: "spring", stiffness: 280, damping: 32 } }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            <AnimatePresence initial={false} mode="popLayout">
              {categories.map((c, i) => {
                const open = selectedSlug === c.slug;
                if (open) {
                  return (
                    <CategoryDetail
                      key={c.slug}
                      category={c}
                      onClose={() => setSelectedSlug(null)}
                      className="md:col-span-2 lg:col-span-3"
                    />
                  );
                }
                return (
                  <CategoryCard
                    key={c.slug}
                    category={c}
                    index={i}
                    onOpen={() => setSelectedSlug(c.slug)}
                  />
                );
              })}
              <SourcingTile key="sourcing-tile" />
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

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
              Built for your concept
            </p>
            <h2 className="text-3xl md:text-5xl mb-4" style={{ fontWeight: 700 }}>
              Pick your kitchen. We'll point to the right shelf.
            </h2>
            <p className="text-foreground/70 leading-relaxed">
              Most of our partners run one of these concepts. Hover to see what they typically order.
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {useCases.map((uc) => (
              <UseCaseCard key={uc.slug} useCase={uc} />
            ))}
          </motion.div>
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
              180+ trusted suppliers, one truck
            </p>
            <h2 className="text-2xl md:text-3xl mt-3" style={{ fontWeight: 700 }}>
              Brands you already cook with — on the same invoice.
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
              Behind the truck
            </p>
            <h2 className="text-3xl md:text-5xl mb-4" style={{ fontWeight: 700 }}>
              How your order actually gets to your kitchen.
            </h2>
            <p className="text-white/70 leading-relaxed">
              Three steps. One accountable team for all of them.
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
                    Step {step.num}
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
              <h2 className="text-3xl md:text-5xl text-white mb-6" style={{ fontWeight: 700 }}>
                Ready to put this catalog to work?
              </h2>
              <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
                Tell us about your kitchen — concept, volume, the cities you operate in — and we'll
                match you to a sales rep within one business day.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <MotionLink
                  href="/partner-application"
                  whileHover={prm ? undefined : { scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-10 py-5 bg-white text-primary rounded-xl inline-flex items-center gap-2 hover:bg-white/95 transition-colors"
                  style={{ fontWeight: 600 }}
                >
                  Apply to Partner
                  <ArrowRight className="w-5 h-5" />
                </MotionLink>
                <Link
                  href="/about#locations"
                  className="text-white/90 hover:text-white inline-flex items-center gap-2 underline-offset-4 hover:underline"
                  style={{ fontWeight: 500 }}
                >
                  Talk to a rep
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

const sourcingTileEntry = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

function SourcingTile() {
  const prm = usePrefersReducedMotion();
  return (
    <MotionLink
      href="/partner-application"
      variants={sourcingTileEntry}
      whileHover={prm ? undefined : { y: -8 }}
      className="group relative bg-primary text-white rounded-2xl overflow-hidden p-8 md:p-10 flex flex-col justify-between min-h-[360px] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
    >
      <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
      <div className="absolute -bottom-20 -left-12 w-56 h-56 rounded-full bg-white/[0.03] pointer-events-none" />

      <div className="relative">
        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-5">
          <Sparkles className="w-6 h-6" />
        </div>
        <p
          className="text-white/60 text-xs uppercase tracking-[0.3em] mb-3"
          style={{ fontWeight: 600 }}
        >
          Off-catalog sourcing
        </p>
        <h3 className="text-2xl md:text-3xl mb-3 leading-tight" style={{ fontWeight: 700 }}>
          Don't see it? We'll source it.
        </h3>
        <p className="text-white/80 leading-relaxed">
          180+ vendors across produce, proteins, specialty Asian imports, and beyond. If you
          cook with it, we can probably get it on next week's truck.
        </p>
      </div>

      <span
        className="relative inline-flex items-center gap-2 text-white mt-6 group-hover:gap-3 transition-all"
        style={{ fontWeight: 600 }}
      >
        Request a SKU
        <ArrowRight className="w-4 h-4" />
      </span>
    </MotionLink>
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
  const Icon = useCaseIconMap[useCase.icon];
  const onClickFooter = () => {
    if (useCase.linkedCategorySlug) {
      window.dispatchEvent(
        new CustomEvent("category:open", { detail: useCase.linkedCategorySlug }),
      );
    }
  };
  return (
    <motion.div
      variants={useCaseCardVariants}
      whileHover={prm ? undefined : { y: -8 }}
      className="group bg-white rounded-2xl border border-border p-6 md:p-7 shadow-sm hover:shadow-xl transition-shadow duration-300"
    >
      <motion.div
        initial="rest"
        whileHover="hover"
        animate="rest"
        variants={useCaseHover}
        className="h-full flex flex-col"
      >
        <div className="w-12 h-12 rounded-xl bg-accent text-primary flex items-center justify-center mb-5">
          <Icon className="w-6 h-6" />
        </div>
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

        {useCase.linkedCategorySlug && (
          <button
            type="button"
            onClick={onClickFooter}
            className="mt-auto self-start inline-flex items-center gap-2 text-primary text-sm hover:gap-3 transition-all focus:outline-none focus-visible:underline"
            style={{ fontWeight: 600 }}
          >
            See full catalog
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </motion.div>
    </motion.div>
  );
}
