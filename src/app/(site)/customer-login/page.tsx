import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone, Sparkles } from "lucide-react";

export const metadata = {
  title: "Customer Portal — Coming Soon | L&C Food Distribution",
  description:
    "A customer login and online ordering portal is on the way. In the meantime, contact us directly to place orders or get account help.",
  robots: { index: false },
};

export default function CustomerLoginPage() {
  return (
    <div className="pt-20">
      <section className="relative bg-primary text-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-20 md:py-28 text-center">
          <div className="w-14 h-14 mx-auto mb-6 rounded-xl bg-white/10 flex items-center justify-center">
            <Sparkles className="w-7 h-7" />
          </div>
          <p className="text-white/70 text-xs uppercase tracking-[0.3em] mb-4" style={{ fontWeight: 600 }}>
            Customer portal
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl mb-6 leading-tight" style={{ fontWeight: 700 }}>
            Online ordering is on the way.
          </h1>
          <p className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto leading-relaxed">
            We're building a self-serve portal so you can place orders, manage standing
            deliveries, and view invoices from any device. In the meantime, our team is one
            call or email away.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="bg-secondary rounded-3xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl mb-6" style={{ fontWeight: 700 }}>
              Reach our team directly
            </h2>
            <div className="space-y-5">
              <a
                href="tel:626-465-7855"
                className="flex items-center gap-4 text-lg text-foreground hover:text-primary transition-colors"
                style={{ fontWeight: 600 }}
              >
                <span className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </span>
                626-465-7855
              </a>
              <a
                href="mailto:info@lncfood.com"
                className="flex items-center gap-4 text-lg text-foreground hover:text-primary transition-colors"
                style={{ fontWeight: 600 }}
              >
                <span className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </span>
                info@lncfood.com
              </a>
              <div className="flex items-start gap-4 text-foreground/70">
                <span className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </span>
                <span className="leading-relaxed">
                  Mon – Fri: 8:00 am – 5:00 pm
                </span>
              </div>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <a
                href="tel:626-465-7855"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
                style={{ fontWeight: 600 }}
              >
                Call us
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/partner-application"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-primary border border-primary/20 rounded-xl hover:bg-primary/5 transition-colors"
                style={{ fontWeight: 600 }}
              >
                Become a partner
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
