"use client";

import { motion, useMotionTemplate, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { useTilt } from "@/app/hooks/useTilt";
import { usePrefersReducedMotion } from "@/app/hooks/usePrefersReducedMotion";
import type { Category } from "@/app/data/categories";

type Props = {
  category: Category;
  index: number;
  className?: string;
  onOpen: () => void;
};

const EASE = [0.22, 1, 0.36, 1] as const;

export const cardEntry = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const hoverGroup = {
  rest: {},
  hover: {},
};

const badgeVariants = {
  rest: { opacity: 0, x: 20 },
  hover: { opacity: 1, x: 0, transition: { duration: 0.3, ease: EASE } },
};

const trailVariants = {
  rest: { width: 0 },
  hover: { width: 28, transition: { duration: 0.35, ease: EASE } },
};

const arrowVariants = {
  rest: { x: 0 },
  hover: { x: 6, transition: { duration: 0.35, ease: EASE } },
};

export function CategoryCard({ category, index, className, onOpen }: Props) {
  const prm = usePrefersReducedMotion();
  const tilt = useTilt(6);
  const shadowX = useTransform(tilt.x, [-0.5, 0.5], [-18, 18]);
  const shadowY = useTransform(tilt.y, [-0.5, 0.5], [-18, 18]);
  const boxShadow = useMotionTemplate`${shadowX}px ${shadowY}px 40px rgba(45, 95, 62, 0.18)`;

  return (
    <motion.button
      type="button"
      layoutId={`card-${category.slug}`}
      variants={cardEntry}
      onPointerMove={tilt.onPointerMove}
      onPointerLeave={tilt.onPointerLeave}
      onClick={onOpen}
      whileHover={prm ? undefined : { y: -8 }}
      style={{
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
        transformPerspective: 1000,
        boxShadow: prm ? undefined : boxShadow,
      }}
      className={`group relative text-left bg-white rounded-2xl overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${className ?? ""}`}
      aria-expanded={false}
      aria-controls={`panel-${category.slug}`}
    >
      <motion.span
        initial="rest"
        whileHover="hover"
        animate="rest"
        variants={hoverGroup}
        className="block h-full"
      >
        <span className="relative block aspect-[4/3] overflow-hidden">
          <span
            className="absolute top-4 left-4 z-10 w-10 h-10 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center text-primary shadow-sm"
            style={{ fontWeight: 700 }}
          >
            {index + 1}
          </span>
          <motion.span
            variants={badgeVariants}
            className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-primary text-white text-xs"
            style={{ fontWeight: 600 }}
          >
            {category.items.length} products
          </motion.span>
          <motion.span layoutId={`card-image-${category.slug}`} className="absolute inset-0 block">
            <ImageWithFallback
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 transform-gpu"
            />
          </motion.span>
        </span>
        <span className="block p-6">
          <motion.span
            layoutId={`card-title-${category.slug}`}
            className="block text-xl mb-2"
            style={{ fontWeight: 600 }}
          >
            {category.name}
          </motion.span>
          <span className="block text-foreground/60 mb-4">{category.tagline}</span>
          <span
            className="text-primary inline-flex items-center gap-2"
            style={{ fontWeight: 600 }}
          >
            View items
            <motion.span variants={arrowVariants} className="inline-flex">
              <ArrowRight className="w-4 h-4" />
            </motion.span>
          </span>
          <motion.span
            variants={trailVariants}
            className="block h-[2px] bg-primary mt-1.5 rounded-full"
          />
        </span>
      </motion.span>
    </motion.button>
  );
}
