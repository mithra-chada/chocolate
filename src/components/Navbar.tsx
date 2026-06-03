import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/products" },
  { label: "Process", href: "/farm" },
  { label: "Visit", href: "/contact" },
  { label: "Journal", href: "/journal" },
  { label: "Story", href: "/story" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const cartCount = useCartStore((s) => s.getCount());
  const openCart = useCartStore((s) => s.openCart);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isHome = pathname === "/";
  const showBg = scrolled || !isHome || menuOpen;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          showBg
            ? "bg-[#1B0F0A]/95 backdrop-blur-xl border-b border-[#C9A46B]/10"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-12 h-14 md:h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <svg width="26" height="26" viewBox="0 0 28 28" fill="none" className="transition-transform group-hover:scale-110">
              <ellipse cx="14" cy="18" rx="10" ry="8" fill="#5C3A2A" />
              <ellipse cx="14" cy="18" rx="8" ry="6" fill="#3D2518" />
              <path d="M12 10 Q14 6 16 10" stroke="#C9A46B" strokeWidth="1.5" fill="none" />
              <circle cx="14" cy="7" r="2.5" fill="#C9A46B" />
              <path d="M12 5 L14 2 L16 5" stroke="#C9A46B" strokeWidth="1" fill="none" />
            </svg>
            <span className="font-serif text-base sm:text-lg tracking-wide text-[#F4EBE1]">Myth Cocoa</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs uppercase tracking-[0.18em] font-medium transition-colors hover:text-[#C9A46B] relative group ${
                  pathname === link.href ? "text-[#C9A46B]" : "text-[#F4EBE1]/70"
                }`}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#C9A46B] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={openCart}
              className="relative text-[#F4EBE1]/70 hover:text-[#C9A46B] transition-colors p-1 -m-1"
              aria-label="Cart"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C9A46B] text-[#1B0F0A] text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-[#F4EBE1]/70 hover:text-[#C9A46B] transition-colors p-1 -m-1 touch-target"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#1B0F0A]/98 backdrop-blur-xl transition-all duration-300 md:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center min-h-screen gap-0 pt-16 pb-8">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={`w-full text-center py-5 font-serif text-3xl transition-all duration-200 border-b border-[#C9A46B]/5 last:border-0 ${
                pathname === link.href
                  ? "text-[#C9A46B]"
                  : "text-[#F4EBE1] hover:text-[#C9A46B]"
              } ${menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
              style={{ transitionDelay: menuOpen ? `${i * 50}ms` : "0ms" }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-8 flex flex-col items-center gap-3">
            <button
              onClick={() => { openCart(); setMenuOpen(false); }}
              className="flex items-center gap-2 px-8 py-3 border border-[#C9A46B]/30 text-[#F4EBE1]/70 text-xs uppercase tracking-[0.08em] hover:border-[#C9A46B] hover:text-[#C9A46B] transition-colors"
            >
              <ShoppingBag size={14} />
              View Cart {cartCount > 0 && `(${cartCount})`}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
