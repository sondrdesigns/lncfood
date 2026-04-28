import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
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
              Your trusted Asian food distribution partner. More than just supply – Global Foods, Local Solutions.
            </p>
          </div>

          <div>
            <h3 className="text-lg mb-4" style={{ fontWeight: 600 }}>Quick Links</h3>
            <div className="space-y-2">
              <Link href="/" className="block text-white/80 hover:text-white transition-colors">Home</Link>
              <Link href="/about" className="block text-white/80 hover:text-white transition-colors">About Us</Link>
              <Link href="/products" className="block text-white/80 hover:text-white transition-colors">Products</Link>
              <Link href="/careers" className="block text-white/80 hover:text-white transition-colors">Careers</Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg mb-4" style={{ fontWeight: 600 }}>Contact</h3>
            <div className="space-y-3">
              <a href="tel:626-465-7855" className="flex items-center gap-3 text-white/80 hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
                <span>626-465-7855</span>
              </a>
              <a href="mailto:info@lncfood.com" className="flex items-center gap-3 text-white/80 hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
                <span>info@lncfood.com</span>
              </a>
              <div className="flex items-start gap-3 text-white/80">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>Mon – Fri: 8:00 am – 5:00 pm</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg mb-4" style={{ fontWeight: 600 }}>Legal</h3>
            <div className="space-y-2">
              <Link href="/privacy" className="block text-white/80 hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="block text-white/80 hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/accessibility" className="block text-white/80 hover:text-white transition-colors">Accessibility</Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg mb-4" style={{ fontWeight: 600 }}>Follow Us</h3>
            <div className="flex gap-3">
              <button
                type="button"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors disabled:opacity-60"
                aria-label="Facebook (coming soon)"
                disabled
              >
                <Facebook className="w-5 h-5" />
              </button>
              <button
                type="button"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors disabled:opacity-60"
                aria-label="Instagram (coming soon)"
                disabled
              >
                <Instagram className="w-5 h-5" />
              </button>
              <button
                type="button"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors disabled:opacity-60"
                aria-label="LinkedIn (coming soon)"
                disabled
              >
                <Linkedin className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-center text-white/60 text-sm">
            © {new Date().getFullYear()} L&C Food Distribution. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
