"use client";

import { motion } from "motion/react";
import { X } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { usePrefersReducedMotion } from "@/app/hooks/usePrefersReducedMotion";
import type { Category } from "@/app/data/categories";

type Props = {
  category: Category;
  className?: string;
  onClose: () => void;
};

export function CategoryDetail({ category, className, onClose }: Props) {
  const prm = usePrefersReducedMotion();

  const listVariants = prm
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: {},
        show: { transition: { staggerChildren: 0.045, delayChildren: 0.15 } },
      };

  const itemVariants = prm
    ? {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0.2 } },
      }
    : {
        hidden: { opacity: 0, y: 14, filter: "blur(4px)" },
        show: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { type: "spring" as const, stiffness: 380, damping: 24 },
        },
      };

  const dotVariants = prm
    ? { hidden: { scale: 1 }, show: { scale: 1 } }
    : {
        hidden: { scale: 0 },
        show: {
          scale: 1,
          transition: { type: "spring" as const, stiffness: 500, damping: 20, delay: 0.05 },
        },
      };

  return (
    <motion.div
      layoutId={`card-${category.slug}`}
      id={`panel-${category.slug}`}
      role="region"
      aria-label={`${category.name} details`}
      className={`relative bg-white rounded-3xl overflow-hidden shadow-xl ${className ?? ""}`}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-white hover:bg-secondary border border-border flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-label={`Close ${category.name} details`}
      >
        <X className="w-5 h-5" />
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
        <motion.div
          layoutId={`card-image-${category.slug}`}
          className="relative lg:col-span-2 aspect-[4/3] lg:aspect-auto lg:min-h-[480px] overflow-hidden"
        >
          <ImageWithFallback
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-transparent to-transparent lg:from-primary/40" />
        </motion.div>

        <div className="lg:col-span-3 p-8 md:p-12">
          <p
            className="text-primary text-sm uppercase tracking-wider mb-2"
            style={{ fontWeight: 600 }}
          >
            {category.tagline}
          </p>
          <motion.h3
            layoutId={`card-title-${category.slug}`}
            className="text-3xl md:text-4xl mb-4"
            style={{ fontWeight: 700 }}
          >
            {category.name}
          </motion.h3>
          <p className="text-foreground/70 leading-relaxed">{category.description}</p>

          <div className="mt-8 pt-8 border-t border-border">
            <h4 className="text-lg mb-6" style={{ fontWeight: 600 }}>
              Products in this category
            </h4>
            <motion.ul
              variants={listVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 gap-3"
            >
              {category.items.map((item) => (
                <motion.li
                  key={item}
                  variants={itemVariants}
                  className="flex items-start gap-3 px-4 py-3 bg-secondary rounded-xl"
                >
                  <motion.span
                    variants={dotVariants}
                    className="shrink-0 w-2 h-2 rounded-full bg-primary mt-2"
                  />
                  <span className="text-foreground/80">{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
