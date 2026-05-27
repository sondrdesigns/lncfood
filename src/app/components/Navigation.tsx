"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ArrowRight, Loader2 } from "lucide-react";
import { useLocale } from "./LocaleProvider";
import { LocaleSwitcher } from "./LocaleSwitcher";

const MotionLink = motion.create(Link);

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [routePending, setRoutePending] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const prefetchedRoutesRef = useRef<Set<string>>(new Set());
  const routePendingTimeoutRef = useRef<number | null>(null);

  const navLinks = [
    { name: t.nav.home, path: "/" },
    { name: t.nav.about, path: "/about" },
    { name: t.nav.products, path: "/products" },
    { name: t.nav.careers, path: "/careers" },
    { name: t.nav.partner, path: "/partner-application" },
  ];

  useEffect(() => {
    let ticking = false;
    const updateScrolled = () => {
      ticking = false;
      const nextScrolled = window.scrollY > 20;
      setScrolled((current) => (current === nextScrolled ? current : nextScrolled));
    };
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateScrolled);
    };
    updateScrolled();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setRoutePending(false);
    if (routePendingTimeoutRef.current) {
      window.clearTimeout(routePendingTimeoutRef.current);
      routePendingTimeoutRef.current = null;
    }
  }, [pathname]);

  useEffect(() => {
    const handleLocalLinkClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target instanceof Element ? event.target : null;
      const anchor = target?.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor || anchor.target || anchor.hasAttribute("download")) return;

      const nextUrl = new URL(anchor.href, window.location.href);
      if (nextUrl.origin !== window.location.origin) return;
      if (
        nextUrl.pathname === window.location.pathname &&
        nextUrl.search === window.location.search
      ) {
        return;
      }

      setRoutePending(true);
      if (routePendingTimeoutRef.current) {
        window.clearTimeout(routePendingTimeoutRef.current);
      }
      routePendingTimeoutRef.current = window.setTimeout(() => {
        setRoutePending(false);
        routePendingTimeoutRef.current = null;
      }, 10000);
    };

    document.addEventListener("click", handleLocalLinkClick, true);
    return () => {
      document.removeEventListener("click", handleLocalLinkClick, true);
      if (routePendingTimeoutRef.current) {
        window.clearTimeout(routePendingTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen) {
      triggerRef.current?.focus();
      return;
    }
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", handleKey);
    };
  }, [mobileOpen]);

  const prefetchRoute = (path: string) => {
    if (prefetchedRoutesRef.current.has(path)) return;
    prefetchedRoutesRef.current.add(path);
    router.prefetch(path);
  };

  return (
    <>
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-white"
      }`}
    >
      <AnimatePresence>
        {routePending && (
          <motion.div
            key="route-progress"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-x-0 bottom-0 h-1 overflow-hidden bg-primary/10"
            aria-hidden="true"
          >
            <motion.div
              className="h-full w-1/3 bg-primary"
              initial={{ x: "-100%" }}
              animate={{ x: "320%" }}
              transition={{ duration: 1.15, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {routePending && (
          <motion.div
            key="route-status"
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="absolute right-6 lg:right-8 top-full mt-2 inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-2 text-xs text-foreground/70 shadow-sm"
            style={{ fontWeight: 600 }}
          >
            <Loader2 className="w-3.5 h-3.5 animate-spin text-primary" />
            Loading
          </motion.div>
        )}
      </AnimatePresence>

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
              className="hidden sm:inline whitespace-nowrap text-primary leading-tight tracking-tight text-lg lg:text-xl"
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
                onPointerEnter={() => prefetchRoute(link.path)}
                onFocus={() => prefetchRoute(link.path)}
                aria-current={pathname === link.path ? "page" : undefined}
                className={`px-4 py-2 rounded-lg transition-colors relative whitespace-nowrap ${
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

            <MotionLink
              href="/customer-login"
              onPointerEnter={() => prefetchRoute("/customer-login")}
              onFocus={() => prefetchRoute("/customer-login")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="ml-3 inline-flex items-center gap-2 whitespace-nowrap px-5 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-xl transition-colors"
              style={{ fontWeight: 600 }}
            >
              {t.nav.customerLogin}
              <ArrowRight className="w-4 h-4" />
            </MotionLink>

            <LocaleSwitcher className="ml-3" />
          </div>

          <button
            ref={triggerRef}
            type="button"
            aria-label={mobileOpen ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={mobileOpen}
            aria-controls="mobile-drawer"
            onClick={() => setMobileOpen((open) => !open)}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg text-foreground/70 hover:text-primary hover:bg-accent transition-colors"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileOpen(false)}
              className="md:hidden fixed inset-0 bg-black/40 z-[55]"
              aria-hidden="true"
            />

            <motion.div
              key="drawer"
              id="mobile-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", ease: [0.22, 1, 0.36, 1], duration: 0.35 }}
              className="md:hidden fixed top-0 right-0 bottom-0 w-full bg-white shadow-2xl z-[60] flex flex-col"
            >
              <div className="px-6 pt-6 pb-3 flex items-center justify-between gap-3">
                <span
                  className="text-foreground/40 uppercase tracking-wider text-xs"
                  style={{ fontWeight: 600 }}
                >
                  {t.nav.menu}
                </span>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label={t.nav.closeMenu}
                  className="inline-flex items-center justify-center w-11 h-11 rounded-lg text-foreground/70 hover:text-primary hover:bg-accent transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="px-6 pb-3">
                <LocaleSwitcher />
              </div>

              <nav className="flex-1 overflow-y-auto px-4 pb-4 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    onPointerEnter={() => prefetchRoute(link.path)}
                    onFocus={() => prefetchRoute(link.path)}
                    aria-current={pathname === link.path ? "page" : undefined}
                    className={`px-4 py-4 rounded-lg text-lg transition-colors ${
                      pathname === link.path
                        ? "bg-accent text-primary"
                        : "text-foreground/80 hover:bg-accent hover:text-primary"
                    }`}
                    style={{ fontWeight: 500 }}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>

              <div className="border-t border-border/60 p-4">
                <Link
                  href="/customer-login"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-4 bg-primary hover:bg-primary/90 text-white rounded-xl transition-colors text-lg"
                  style={{ fontWeight: 600 }}
                >
                  {t.nav.customerLogin}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
