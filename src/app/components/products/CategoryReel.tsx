"use client";

import { MotionValue, motion, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { usePrefersReducedMotion } from "@/app/hooks/usePrefersReducedMotion";
import { categories, type Category } from "@/app/data/categories";

const PANELS = categories.length;

export function CategoryReel() {
  const prm = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const m = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(m.matches);
    update();
    m.addEventListener("change", update);
    return () => m.removeEventListener("change", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const smoothed = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.4,
  });
  const xPct = useTransform(smoothed, [0, 1], ["0%", `-${(PANELS - 1) * (100 / PANELS)}%`]);

  if (prm || isMobile) {
    return (
      <section className="bg-primary text-white">
        {categories.map((c, i) => (
          <VerticalPanel key={c.slug} category={c} index={i} total={PANELS} />
        ))}
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative bg-primary text-white"
      style={{ height: `${PANELS * 100}vh` }}
      aria-label="Category gallery"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          style={{ x: xPct, width: `${PANELS * 100}%` }}
          className="flex h-full transform-gpu"
        >
          {categories.map((c, i) => (
            <ReelPanel key={c.slug} category={c} index={i} total={PANELS} progress={smoothed} />
          ))}
        </motion.div>
        <ReelProgress total={PANELS} progress={smoothed} />
      </div>
    </section>
  );
}

function ReelPanel({
  category,
  index,
  total,
  progress,
}: {
  category: Category;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const local = useTransform(progress, [start, end], [0, 1]);
  const imgX = useTransform(local, [0, 1], ["-8%", "8%"]);
  const txtY = useTransform(local, [0, 0.5, 1], ["40px", "0px", "-40px"]);
  const txtOpacity = useTransform(local, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  return (
    <div className="relative w-screen h-full flex flex-col lg:flex-row shrink-0">
      <div className="relative w-full lg:w-1/2 h-1/2 lg:h-full overflow-hidden">
        <motion.div style={{ x: imgX }} className="absolute inset-0 scale-110">
          <ImageWithFallback
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover"
            loading={index === 0 ? "eager" : "lazy"}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/40 via-transparent to-primary/40 lg:from-transparent lg:to-primary/30" />
      </div>

      <motion.div
        style={{ y: txtY, opacity: txtOpacity }}
        className="relative w-full lg:w-1/2 h-1/2 lg:h-full flex flex-col justify-center px-6 md:px-12 lg:px-20 py-8"
      >
        <span
          className="text-white/60 text-xs tracking-[0.3em] mb-4"
          style={{ fontWeight: 600 }}
        >
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl mb-4" style={{ fontWeight: 700 }}>
          {category.name}
        </h2>
        <p className="text-base md:text-lg text-white/80 max-w-md mb-8 leading-relaxed">
          {category.description}
        </p>
        <button
          type="button"
          onClick={() => {
            window.dispatchEvent(
              new CustomEvent("category:open", { detail: category.slug }),
            );
          }}
          className="self-start inline-flex items-center gap-2 text-white border-b border-white/40 hover:border-white pb-1 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm"
          style={{ fontWeight: 600 }}
        >
          Browse {category.items.length} products
          <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>
    </div>
  );
}

function ReelProgress({
  total,
  progress,
}: {
  total: number;
  progress: MotionValue<number>;
}) {
  return (
    <div className="absolute bottom-8 right-8 hidden md:flex gap-2 z-10">
      {Array.from({ length: total }).map((_, i) => (
        <ProgressDot key={i} index={i} total={total} progress={progress} />
      ))}
    </div>
  );
}

function ProgressDot({
  index,
  total,
  progress,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const mid = (index + 0.5) / total;
  const end = (index + 1) / total;
  const width = useTransform(progress, [start, mid, end], [8, 32, 8]);
  const opacity = useTransform(progress, [start, mid, end], [0.4, 1, 0.4]);
  return <motion.div style={{ width, opacity }} className="h-1 rounded-full bg-white" />;
}

function VerticalPanel({
  category,
  index,
  total,
}: {
  category: Category;
  index: number;
  total: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative min-h-screen flex flex-col"
    >
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <ImageWithFallback
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
      </div>
      <div className="flex-1 flex flex-col justify-center px-6 py-12">
        <span
          className="text-white/60 text-xs tracking-[0.3em] mb-4"
          style={{ fontWeight: 600 }}
        >
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <h2 className="text-4xl mb-4" style={{ fontWeight: 700 }}>
          {category.name}
        </h2>
        <p className="text-base text-white/80 mb-8 leading-relaxed">{category.description}</p>
        <button
          type="button"
          onClick={() => {
            window.dispatchEvent(
              new CustomEvent("category:open", { detail: category.slug }),
            );
          }}
          className="self-start inline-flex items-center gap-2 text-white border-b border-white/40 hover:border-white pb-1 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm"
          style={{ fontWeight: 600 }}
        >
          Browse {category.items.length} products
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
