import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
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
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const isHome = location.pathname === "/";
  const showBg = scrolled || !isHome;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          showBg
            ? "bg-[#1B0F0A]/90 backdrop-blur-xl border-b border-[#C9A46B]/10"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-6 lg:px-12 h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="transition-transform group-hover:scale-110">
              <ellipse cx="14" cy="18" rx="10" ry="8" fill="#5C3A2A" />
              <ellipse cx="14" cy="18" rx="8" ry="6" fill="#3D2518" />
              <path d="M12 10 Q14 6 16 10" stroke="#C9A46B" strokeWidth="1.5" fill="none" />
              <circle cx="14" cy="7" r="2.5" fill="#C9A46B" />
              <path d="M12 5 L14 2 L16 5" stroke="#C9A46B" strokeWidth="1" fill="none" />
            </svg>
            <span className="font-serif text-lg tracking-wide text-[#F4EBE1]">Myth Cocoa</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-xs uppercase tracking-[0.18em] font-medium transition-colors hover:text-[#C9A46B] relative group ${
                  location.pathname === link.href ? "text-[#C9A46B]" : "text-[#F4EBE1]/70"
                }`}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#C9A46B] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">

            <button
              onClick={openCart}
              className="relative text-[#F4EBE1]/70 hover:text-[#C9A46B] transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#C9A46B] text-[#1B0F0A] text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-[#F4EBE1]/70 hover:text-[#C9A46B] transition-colors"
              aria-label="Menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#1B0F0A]/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              to={link.href}
              className="font-serif text-3xl text-[#F4EBE1] hover:text-[#C9A46B] transition-colors"
              style={{ animationDelay: `${i * 80}ms` }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}

        </div>
      )}
    </>
  );
}
