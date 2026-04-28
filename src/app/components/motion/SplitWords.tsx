"use client";

import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/app/hooks/usePrefersReducedMotion";

type Props = {
  text: string;
  className?: string;
  baseDelay?: number;
  perWordDelay?: number;
  duration?: number;
};

export function SplitWords({
  text,
  className,
  baseDelay = 0.15,
  perWordDelay = 0.08,
  duration = 0.7,
}: Props) {
  const prm = usePrefersReducedMotion();
  const words = text.split(" ");
  const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

  return (
    <span className={className}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden align-bottom pb-[0.15em] mr-[0.25em] last:mr-0"
        >
          <motion.span
            className="inline-block"
            initial={prm ? { opacity: 0 } : { y: "110%", opacity: 0 }}
            animate={prm ? { opacity: 1 } : { y: "0%", opacity: 1 }}
            transition={{
              duration: prm ? 0.3 : duration,
              delay: baseDelay + i * perWordDelay,
              ease,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
