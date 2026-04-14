import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                <span className="text-primary font-bold text-xl">L&C</span>
              </div>
              <span className="text-xl" style={{ fontWeight: 600 }}>
                L&C Food
              </span>
            </div>
            <p className="text-white/80 leading-relaxed">
              Your trusted Asian food distribution partner. More than just supply – Global Foods, Local Solutions.
            </p>
          </div>

          <div>
            <h3 className="text-lg mb-4" style={{ fontWeight: 600 }}>Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-white/80 hover:text-white transition-colors">Home</Link>
              <Link to="/about" className="block text-white/80 hover:text-white transition-colors">About Us</Link>
              <Link to="/products" className="block text-white/80 hover:text-white transition-colors">Products</Link>
              <Link to="/careers" className="block text-white/80 hover:text-white transition-colors">Careers</Link>
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
            <h3 className="text-lg mb-4" style={{ fontWeight: 600 }}>Follow Us</h3>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
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
