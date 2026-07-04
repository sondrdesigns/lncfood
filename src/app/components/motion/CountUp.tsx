"use client";

import { motion, animate, useInView, useMotionValue, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/app/hooks/usePrefersReducedMotion";

type Props = {
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
};

export function CountUp({ to, duration = 1.6, suffix = "", prefix = "", className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const prm = usePrefersReducedMotion();
  const count = useMotionValue(to); // SSR: renders the final value immediately
  const display = useTransform(count, (v) => `${prefix}${Math.round(v).toLocaleString()}${suffix}`);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // After hydration, reset to 0 so the count-up animation plays from 0
    count.set(0);
    setMounted(true);
  }, [count]);

  useEffect(() => {
    if (!mounted || !inView) return;
    if (prm) {
      count.set(to);
      return;
    }
    const controls = animate(count, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
    });
    return controls.stop;
  }, [mounted, inView, to, duration, prm, count]);

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  );
}
