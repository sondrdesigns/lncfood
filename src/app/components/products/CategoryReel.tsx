"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { usePrefersReducedMotion } from "@/app/hooks/usePrefersReducedMotion";
import { categories } from "@/app/data/categories";

const PANELS = categories.length;
const AUTO_MS = 5000;

const slideVariants = {
  enter: (dir: number) => ({
    x: dir >= 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: "0%",
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir >= 0 ? "-100%" : "100%",
    opacity: 0,
  }),
};

export function CategoryReel() {
  const prm = usePrefersReducedMotion();
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const [timerKey, setTimerKey] = useState(0); // resets progress bar

  const goTo = useCallback(
    (index: number, direction: number) => {
      setDir(direction);
      setCurrent(index);
      setTimerKey((k) => k + 1);
      clearInterval(intervalRef.current);
      if (!prm) {
        intervalRef.current = setInterval(() => {
          setDir(1);
          setCurrent((c) => (c + 1) % PANELS);
          setTimerKey((k) => k + 1);
        }, AUTO_MS);
      }
    },
    [prm],
  );

  const next = useCallback(() => goTo((current + 1) % PANELS, 1), [current, goTo]);
  const prev = useCallback(
    () => goTo((current - 1 + PANELS) % PANELS, -1),
    [current, goTo],
  );

  // Start auto-advance
  useEffect(() => {
    if (prm) return;
    intervalRef.current = setInterval(() => {
      setDir(1);
      setCurrent((c) => (c + 1) % PANELS);
      setTimerKey((k) => k + 1);
    }, AUTO_MS);
    return () => clearInterval(intervalRef.current);
  }, [prm]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  // Touch / swipe
  const touchX = useRef(0);
  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = touchX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 48) diff > 0 ? next() : prev();
  };

  const category = categories[current];

  return (
    <section
      className="relative bg-primary text-white overflow-hidden"
      style={{ height: "100svh" }}
      aria-label="Category gallery"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Slides */}
      <AnimatePresence custom={dir} mode="wait">
        <motion.div
          key={current}
          custom={dir}
          variants={prm ? undefined : slideVariants}
          initial={prm ? { opacity: 0 } : "enter"}
          animate={prm ? { opacity: 1 } : "center"}
          exit={prm ? { opacity: 0 } : "exit"}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 flex flex-col lg:flex-row"
        >
          {/* Image half */}
          <div className="relative w-full lg:w-1/2 h-[42%] lg:h-full overflow-hidden">
            <motion.div
              key={`img-${current}`}
              initial={{ scale: 1.06 }}
              animate={{ scale: 1 }}
              transition={{ duration: 6, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <ImageWithFallback
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover"
                loading="eager"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/40 via-transparent to-primary/40 lg:from-transparent lg:to-primary/30" />
          </div>

          {/* Text half */}
          <div className="relative w-full lg:w-1/2 h-[58%] lg:h-full flex flex-col justify-center px-6 md:px-12 lg:px-20 py-6 lg:py-8">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <span
                className="text-white/60 text-xs tracking-[0.3em] mb-3 block"
                style={{ fontWeight: 600 }}
              >
                {String(current + 1).padStart(2, "0")} / {String(PANELS).padStart(2, "0")}
              </span>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-3 lg:mb-4"
                style={{ fontWeight: 700 }}
              >
                {category.name}
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-md mb-6 lg:mb-8 leading-relaxed">
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
                Browse {category.items.length} categories
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Desktop arrows — pinned to left / right center, overlaid on image edge */}
      <button
        type="button"
        onClick={prev}
        aria-label="Previous category"
        className="hidden lg:flex absolute left-6 top-1/2 -translate-y-1/2 z-10 w-14 h-14 items-center justify-center rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white backdrop-blur-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
      >
        <ArrowLeft className="w-7 h-7" />
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next category"
        className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 z-10 w-14 h-14 items-center justify-center rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white backdrop-blur-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
      >
        <ArrowRight className="w-7 h-7" />
      </button>

      {/* Bottom bar — dots + mobile arrows */}
      <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-4 z-10 px-6">
        {/* Mobile-only arrows — 48×48 touch targets */}
        <button
          type="button"
          onClick={prev}
          aria-label="Previous category"
          className="lg:hidden flex w-12 h-12 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-2">
          {categories.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i, i > current ? 1 : -1)}
              aria-label={`Go to ${categories[i].name}`}
              className="relative h-1.5 rounded-full overflow-hidden transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              style={{ width: i === current ? 36 : 10, background: "rgba(255,255,255,0.3)" }}
            >
              {i === current && !prm && (
                <motion.div
                  key={timerKey}
                  className="absolute inset-y-0 left-0 bg-white rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: AUTO_MS / 1000, ease: "linear" }}
                />
              )}
              {i === current && prm && (
                <div className="absolute inset-0 bg-white rounded-full" />
              )}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={next}
          aria-label="Next category"
          className="lg:hidden flex w-12 h-12 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        >
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
}
