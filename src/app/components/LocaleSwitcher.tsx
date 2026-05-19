"use client";

import { Globe, ChevronDown } from "lucide-react";
import { useLocale } from "./LocaleProvider";
import { LOCALES, type Locale } from "@/lib/i18n/messages";

export function LocaleSwitcher({ className = "" }: { className?: string }) {
  const { locale, setLocale, t } = useLocale();

  return (
    <div className={`relative inline-flex items-center ${className}`}>
      <Globe
        className="pointer-events-none absolute left-2.5 w-4 h-4 text-foreground/50"
        aria-hidden="true"
      />
      <select
        aria-label={t.nav.languageLabel}
        value={locale}
        onChange={(e) => setLocale(e.target.value as Locale)}
        className="appearance-none cursor-pointer rounded-md pl-8 pr-7 py-1.5 text-xs text-foreground/70 hover:text-primary hover:bg-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
        style={{ fontWeight: 600 }}
      >
        {LOCALES.map((l) => (
          <option key={l.code} value={l.code}>
            {l.native}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-2 w-3.5 h-3.5 text-foreground/50"
        aria-hidden="true"
      />
    </div>
  );
}
