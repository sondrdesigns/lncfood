"use client";

import { useMotionValue, useSpring, useTransform } from "motion/react";
import type React from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

export function useTilt(maxDeg = 6) {
  const prm = usePrefersReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 22, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 22, mass: 0.4 });
  const rotateY = useTransform(sx, [-0.5, 0.5], prm ? [0, 0] : [-maxDeg, maxDeg]);
  const rotateX = useTransform(sy, [-0.5, 0.5], prm ? [0, 0] : [maxDeg, -maxDeg]);

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (prm || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };

  const onPointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { x, y, rotateX, rotateY, onPointerMove, onPointerLeave };
}
