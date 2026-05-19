"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { useLocale } from "@/app/components/LocaleProvider";

export default function ApplicationThanks({ backHref }: { backHref: string }) {
  const { t } = useLocale();

  return (
    <div className="pt-20 min-h-screen flex items-center justify-center bg-secondary">
      <div className="max-w-2xl mx-auto px-6 py-16 text-center">
        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl mb-4" style={{ fontWeight: 700 }}>
          {t.careers.thanks.title}
        </h1>
        <p className="text-base sm:text-lg text-foreground/70 mb-8 leading-relaxed">
          {t.careers.thanks.body}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={backHref}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl transition-colors"
            style={{ fontWeight: 600 }}
          >
            <ArrowLeft className="w-4 h-4" />
            {t.careers.thanks.backToPosition}
          </Link>
          <Link
            href="/careers"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-accent text-foreground rounded-xl border border-border transition-colors"
            style={{ fontWeight: 600 }}
          >
            {t.careers.thanks.seeAllPositions}
          </Link>
        </div>
      </div>
    </div>
  );
}
