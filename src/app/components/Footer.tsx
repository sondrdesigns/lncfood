"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, Award, Users, Globe, Building2 } from "lucide-react";
import { usePrefersReducedMotion } from "@/app/hooks/usePrefersReducedMotion";
import { useLocale } from "@/app/components/LocaleProvider";

export default function Footer() {
  const prm = usePrefersReducedMotion();
  const { t } = useLocale();

  const iconHover = prm
    ? undefined
    : {
        scale: 1.2,
        y: [0, -2, 0],
        transition: { type: "tween" as const, duration: 0.4, ease: "easeInOut" as const },
      };

  const credentials = [
    { Icon: Award, label: t.footer.credentials.established },
    { Icon: Building2, label: t.footer.credentials.branches },
    { Icon: Users, label: t.footer.credentials.family },
    { Icon: Globe, label: t.footer.credentials.specialists },
  ];

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div>
            <div className="inline-flex items-center justify-center mb-6 rounded-2xl bg-white px-4 py-3">
              <Image
                src="/images/lnc-logo.png"
                alt="L&C Food"
                width={367}
                height={315}
                className="h-14 w-auto"
              />
            </div>
            <p className="text-white/80 leading-relaxed">
              {t.footer.tagline}
            </p>
          </div>

          <div>
            <h3 className="text-lg mb-4" style={{ fontWeight: 600 }}>{t.footer.quickLinks}</h3>
            <div className="space-y-2">
              <Link href="/" className="block text-white/80 hover:text-white transition-colors">{t.nav.home}</Link>
              <Link href="/about" className="block text-white/80 hover:text-white transition-colors">{t.nav.about}</Link>
              <Link href="/products" className="block text-white/80 hover:text-white transition-colors">{t.nav.products}</Link>
              <Link href="/careers" className="block text-white/80 hover:text-white transition-colors">{t.nav.careers}</Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg mb-4" style={{ fontWeight: 600 }}>{t.footer.contact}</h3>
            <div className="space-y-3">
              <a href="tel:626-465-7855" className="group flex items-center gap-3 text-white/80 hover:text-white transition-colors">
                <motion.span whileHover={iconHover} className="inline-flex">
                  <Phone className="w-4 h-4" />
                </motion.span>
                <span>626-465-7855</span>
              </a>
              <a href="mailto:info@lncfood.com" className="group flex items-center gap-3 text-white/80 hover:text-white transition-colors">
                <motion.span whileHover={iconHover} className="inline-flex">
                  <Mail className="w-4 h-4" />
                </motion.span>
                <span>info@lncfood.com</span>
              </a>
              <div className="flex items-start gap-3 text-white/80">
                <motion.span whileHover={iconHover} className="inline-flex mt-1 flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </motion.span>
                <span>{t.footer.hours}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg mb-4" style={{ fontWeight: 600 }}>{t.footer.legal}</h3>
            <div className="space-y-2">
              <Link href="/privacy" className="block text-white/80 hover:text-white transition-colors">{t.footer.privacy}</Link>
              <Link href="/terms" className="block text-white/80 hover:text-white transition-colors">{t.footer.terms}</Link>
              <Link href="/accessibility" className="block text-white/80 hover:text-white transition-colors">{t.footer.accessibility}</Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg mb-4" style={{ fontWeight: 600 }}>{t.footer.why}</h3>
            <ul className="space-y-3">
              {credentials.map(({ Icon, label }) => (
                <li key={label} className="flex items-start gap-3 text-white/80">
                  <motion.span whileHover={iconHover} className="inline-flex mt-0.5 flex-shrink-0">
                    <Icon className="w-4 h-4" />
                  </motion.span>
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-center text-white/75 text-sm">
            © {new Date().getFullYear()} L&C Food Distribution. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
