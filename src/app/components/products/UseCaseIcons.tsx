"use client";

import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/app/hooks/usePrefersReducedMotion";

type IconProps = {
  className?: string;
};

const SVG_PROPS = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

// Pho bowl with three staggered steam wisps rising and fading.
export function PhoBowlIcon({ className }: IconProps) {
  const prm = usePrefersReducedMotion();
  const wisps = [
    { d: "M9 9 q1.2 -1.6 0 -3.2 q-1.2 -1.6 0 -3.2", delay: 0 },
    { d: "M12 9 q1.2 -1.6 0 -3.2 q-1.2 -1.6 0 -3.2", delay: 0.55 },
    { d: "M15 9 q1.2 -1.6 0 -3.2 q-1.2 -1.6 0 -3.2", delay: 1.1 },
  ];
  return (
    <svg {...SVG_PROPS} className={className} aria-hidden>
      {wisps.map((w, i) => (
        <motion.path
          key={i}
          d={w.d}
          initial={{ opacity: 0, y: 2 }}
          animate={prm ? { opacity: 0.6 } : { opacity: [0, 0.85, 0], y: [2, -1, -4] }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeOut",
            delay: w.delay,
          }}
        />
      ))}
      {/* Bowl rim */}
      <path d="M3 11.5 H21" />
      {/* Bowl body */}
      <path d="M4 11.5 L5.5 17.5 Q12 19.8 18.5 17.5 L20 11.5" />
      {/* Broth surface ripple */}
      <path d="M6 13 Q12 14 18 13" opacity="0.55" />
    </svg>
  );
}

// Wok with handle, ingredients tossing in arcs above the rim.
export function WokIcon({ className }: IconProps) {
  const prm = usePrefersReducedMotion();
  const ingredients = [
    { delay: 0, peakX: 9, baseX: 8 },
    { delay: 0.7, peakX: 13, baseX: 14 },
  ];
  return (
    <svg {...SVG_PROPS} className={className} aria-hidden>
      {/* Wok rim */}
      <path d="M3 12 H20" />
      {/* Wok body */}
      <path d="M3 12 Q11.5 19.5 20 12" />
      {/* Handle */}
      <path d="M20 12 L23 10.5" />

      {ingredients.map((ing, i) => (
        <motion.circle
          key={i}
          r="1.1"
          fill="currentColor"
          stroke="none"
          initial={{ cx: ing.baseX, cy: 14, opacity: 0.9 }}
          animate={
            prm
              ? { cx: ing.baseX, cy: 14 }
              : {
                  cx: [ing.baseX, ing.peakX, ing.baseX],
                  cy: [14, 5, 14],
                  opacity: [1, 1, 1, 0.9, 1],
                }
          }
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: ing.delay,
            times: [0, 0.5, 1],
          }}
        />
      ))}
    </svg>
  );
}

// Fish swimming: body drifts horizontally, tail wags around the body pivot.
export function SushiFishIcon({ className }: IconProps) {
  const prm = usePrefersReducedMotion();
  return (
    <svg {...SVG_PROPS} className={className} aria-hidden>
      <motion.g
        animate={prm ? undefined : { x: [0, 1.2, 0, -1.2, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Tail (wags around its attachment point) */}
        <motion.g
          style={{ transformOrigin: "5px 12px", transformBox: "fill-box" } as React.CSSProperties}
          animate={prm ? undefined : { rotate: [0, -18, 18, -18, 0] }}
          transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M5 12 L1.5 9 L1.5 15 Z" />
        </motion.g>
        {/* Body */}
        <path d="M5 12 Q10 6.5 17 8.6 Q20.2 10 20.2 12 Q20.2 14 17 15.4 Q10 17.5 5 12 Z" />
        {/* Top fin */}
        <path d="M11 8.6 L13 8.6 L12 6.6 Z" />
        {/* Gill line */}
        <path d="M14.5 9.6 Q14 12 14.5 14.4" opacity="0.6" />
        {/* Eye */}
        <circle cx="17.2" cy="11" r="0.55" fill="currentColor" stroke="none" />
      </motion.g>
    </svg>
  );
}

// Boba cup with bobbing pearls and a single bubble rising up the straw.
export function BobaCupIcon({ className }: IconProps) {
  const prm = usePrefersReducedMotion();
  const pearls = [
    { cx: 9, delay: 0 },
    { cx: 12, delay: 0.35 },
    { cx: 15, delay: 0.7 },
  ];
  return (
    <svg {...SVG_PROPS} className={className} aria-hidden>
      {/* Cup body */}
      <path d="M5.5 7 L7 21 Q7.4 22 8.4 22 H15.6 Q16.6 22 17 21 L18.5 7 Z" />
      {/* Cup rim */}
      <path d="M5.5 7 H18.5" />
      {/* Straw */}
      <path d="M14 7 L15.5 2.5" />

      {/* Bubble rising along the straw */}
      <motion.circle
        r="0.6"
        cx="14.75"
        fill="currentColor"
        stroke="none"
        initial={{ cy: 7, opacity: 0 }}
        animate={prm ? { cy: 4.5, opacity: 0 } : { cy: [7, 2.8], opacity: [0, 1, 1, 0] }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: "easeOut",
          times: [0, 0.15, 0.85, 1],
          repeatDelay: 0.4,
        }}
      />

      {/* Bobbing pearls */}
      {pearls.map((p, i) => (
        <motion.circle
          key={i}
          r="1"
          cx={p.cx}
          fill="currentColor"
          stroke="none"
          initial={{ cy: 19 }}
          animate={prm ? { cy: 19 } : { cy: [19, 17.5, 19] }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
    </svg>
  );
}
