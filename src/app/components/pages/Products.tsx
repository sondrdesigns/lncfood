"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { categories } from "@/app/data/categories";

export default function Products() {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const selected = categories.find((c) => c.slug === selectedSlug) ?? null;

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedSlug(null);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [selected]);

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1753156381986-1fa79eb124bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxMHx8ZnJlc2glMjBwcm9kdWNlJTIwdmVnZXRhYmxlcyUyMG1hcmtldCUyMHdob2xlc2FsZXxlbnwxfHx8fDE3NzYxNDI2MTN8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Fresh produce market"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-6xl text-white mb-6"
            style={{ fontWeight: 700 }}
          >
            Our Products
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl text-white/90 max-w-2xl mx-auto"
          >
            Explore our full catalog across five core categories
          </motion.p>
        </div>
      </section>

      {/* Category Grid */}
      <section className="py-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {categories.map((category, index) => (
                <motion.button
                  key={category.slug}
                  type="button"
                  variants={fadeInUp}
                  whileHover={{ y: -8 }}
                  onClick={() => setSelectedSlug(category.slug)}
                  aria-haspopup="dialog"
                  className="group text-left bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <div
                      className="absolute top-4 left-4 z-10 w-10 h-10 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center text-primary shadow-sm"
                      style={{ fontWeight: 700 }}
                    >
                      {index + 1}
                    </div>
                    <ImageWithFallback
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3
                      className="text-xl mb-2"
                      style={{ fontWeight: 600 }}
                    >
                      {category.name}
                    </h3>
                    <p className="text-foreground/60 mb-4">
                      {category.tagline}
                    </p>
                    <span
                      className="text-primary inline-flex items-center gap-2"
                      style={{ fontWeight: 600 }}
                    >
                      View items
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </motion.button>
            ))}
          </motion.div>

        </div>
      </section>

      {/* Category Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key="category-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedSlug(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="category-modal-title"
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl p-8 md:p-12"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedSlug(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-secondary hover:bg-accent flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Close category details"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="pr-12">
                <p
                  className="text-primary text-sm uppercase tracking-wider mb-2"
                  style={{ fontWeight: 600 }}
                >
                  {selected.tagline}
                </p>
                <h3
                  id="category-modal-title"
                  className="text-3xl md:text-4xl mb-4"
                  style={{ fontWeight: 700 }}
                >
                  {selected.name}
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  {selected.description}
                </p>
              </div>

              <div className="mt-8 pt-8 border-t border-border">
                <h4 className="text-lg mb-6" style={{ fontWeight: 600 }}>
                  Products in this category
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selected.items.map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.04 }}
                      className="flex items-start gap-3 px-4 py-3 bg-secondary rounded-xl"
                    >
                      <span className="shrink-0 w-2 h-2 rounded-full bg-primary mt-2" />
                      <span className="text-foreground/80">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
