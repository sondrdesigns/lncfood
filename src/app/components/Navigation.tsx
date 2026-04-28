"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Products", path: "/products" },
  { name: "Careers", path: "/careers" },
  { name: "Partner Application", path: "/partner-application" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [mobileOpen]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3" aria-label="L&C Food Distribution home">
            <Image
              src="/images/lnc-logo.png"
              alt=""
              width={367}
              height={315}
              priority
              className="h-14 w-auto"
            />
            <span
              className="hidden sm:inline text-primary leading-tight tracking-tight text-lg lg:text-xl"
              style={{ fontWeight: 700 }}
            >
              L&amp;C Food Distribution
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                aria-current={pathname === link.path ? "page" : undefined}
                className={`px-4 py-2 rounded-lg transition-colors relative ${
                  pathname === link.path
                    ? "text-primary"
                    : "text-foreground/70 hover:text-primary"
                }`}
              >
                <span className="relative z-10" style={{ fontWeight: 500 }}>
                  {link.name}
                </span>
                {pathname === link.path && (
                  <div className="absolute inset-0 bg-accent rounded-lg" />
                )}
              </Link>
            ))}
          </div>

          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((open) => !open)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-foreground/70 hover:text-primary hover:bg-accent transition-colors"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden border-t border-border/60 bg-white/95 backdrop-blur-md"
          >
            <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  aria-current={pathname === link.path ? "page" : undefined}
                  className={`px-4 py-3 rounded-lg transition-colors ${
                    pathname === link.path
                      ? "bg-accent text-primary"
                      : "text-foreground/70 hover:bg-accent hover:text-primary"
                  }`}
                  style={{ fontWeight: 500 }}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
