import Link from "next/link";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";

const footerLinks = {
  shop: [
    { label: "Bars", href: "/products?category=dark" },
    { label: "Bonbons", href: "/products?category=bonbon" },
    { label: "Gift Boxes", href: "/products?category=gift" },
    { label: "Collections", href: "/products" },
  ],
  process: [
    { label: "Harvest", href: "/farm" },
    { label: "Roasting", href: "/farm" },
    { label: "Conching", href: "/farm" },
    { label: "Molding", href: "/farm" },
  ],
  visit: [
    { label: "Tastings", href: "/contact" },
    { label: "Private Events", href: "/contact" },
    { label: "Directions", href: "/contact" },
    { label: "FAQ", href: "/contact" },
  ],
  company: [
    { label: "About", href: "/story" },
    { label: "Contact", href: "/contact" },
    { label: "Wholesale", href: "/contact" },
    { label: "Journal", href: "/journal" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[#2B1E16] border-t border-[#C9A46B]/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        {/* Top Section */}
        <div className="flex flex-col items-center mb-12">
          <Link href="/" className="flex items-center gap-2 mb-4">
            <svg width="32" height="32" viewBox="0 0 28 28" fill="none">
              <ellipse cx="14" cy="18" rx="10" ry="8" fill="#5C3A2A" />
              <ellipse cx="14" cy="18" rx="8" ry="6" fill="#3D2518" />
              <path d="M12 10 Q14 6 16 10" stroke="#C9A46B" strokeWidth="1.5" fill="none" />
              <circle cx="14" cy="7" r="2.5" fill="#C9A46B" />
              <path d="M12 5 L14 2 L16 5" stroke="#C9A46B" strokeWidth="1" fill="none" />
            </svg>
            <span className="font-serif text-xl text-[#F4EBE1]">Myth Cocoa</span>
          </Link>
          <p className="font-serif italic text-lg text-[#C9A46B]">Grown rare. Crafted slow.</p>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="text-xs uppercase tracking-[0.18em] text-[#C9A46B] mb-4 font-medium">Shop</h4>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-[#F4EBE1]/60 hover:text-[#C9A46B] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-[0.18em] text-[#C9A46B] mb-4 font-medium">Process</h4>
            <ul className="space-y-2">
              {footerLinks.process.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-[#F4EBE1]/60 hover:text-[#C9A46B] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-[0.18em] text-[#C9A46B] mb-4 font-medium">Visit</h4>
            <ul className="space-y-2">
              {footerLinks.visit.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-[#F4EBE1]/60 hover:text-[#C9A46B] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-[0.18em] text-[#C9A46B] mb-4 font-medium">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-[#F4EBE1]/60 hover:text-[#C9A46B] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Row */}
        <div className="flex flex-wrap justify-center gap-6 mb-8 text-[#F4EBE1]/50">
          <span className="flex items-center gap-2 text-xs">
            <MapPin size={14} className="text-[#C9A46B]" />
            Idukki, Kerala, India
          </span>
          <span className="flex items-center gap-2 text-xs">
            <Phone size={14} className="text-[#C9A46B]" />
            +91 98765 43210
          </span>
          <span className="flex items-center gap-2 text-xs">
            <Mail size={14} className="text-[#C9A46B]" />
            hello@mythcocoa.in
          </span>
          <a href="#" className="flex items-center gap-2 text-xs hover:text-[#C9A46B] transition-colors">
            <Instagram size={14} className="text-[#C9A46B]" />
            @mythcocoa
          </a>
        </div>

        {/* Cold Chain Notice */}
        <div className="text-center mb-8">
          <p className="text-xs text-[#C8D8B0]/80">
            All orders shipped cold-chain with ice packs
          </p>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-[#C9A46B]/10 gap-4">
          <div className="flex flex-col items-center md:items-start gap-1">
            <p className="text-xs text-[#F4EBE1]/40">
              &copy; {new Date().getFullYear()} Myth Cocoa. All rights reserved.
            </p>
            <p className="text-xs text-[#F4EBE1]/40">
              Developed by <span className="text-[#C9A46B]">Mithra</span> | Mobile/WhatsApp: <a href="https://wa.me/917075147888" target="_blank" rel="noopener noreferrer" className="hover:text-[#C9A46B] transition-colors">7075147888</a> | Insta: <a href="https://instagram.com/mithra__884" target="_blank" rel="noopener noreferrer" className="hover:text-[#C9A46B] transition-colors">mithra__884</a>
            </p>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <span className="text-xs text-[#F4EBE1]/40 hover:text-[#C9A46B] cursor-pointer transition-colors">Privacy</span>
            <span className="text-xs text-[#F4EBE1]/40 hover:text-[#C9A46B] cursor-pointer transition-colors">Terms</span>
            <span className="text-xs text-[#F4EBE1]/40 hover:text-[#C9A46B] cursor-pointer transition-colors">Shipping</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
