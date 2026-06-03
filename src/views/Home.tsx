import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ChevronDown, MapPin, Phone, Clock } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useCartStore } from "@/store/cartStore";
import { trpc } from "@/providers/trpc";
import { toast } from "sonner";
import { formatPrice } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

function ChocolateChip({ className, size = "md" }: { className?: string; size?: "sm" | "md" | "lg" }) {
  const dims = size === "sm" ? "w-4 h-5" : size === "lg" ? "w-16 h-20" : "w-8 h-10";
  return (
    <div className={`${dims} bg-[#5C3A2A] rotate-12 ${className}`} style={{ opacity: 0.25 }} />
  );
}

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block px-4 py-1.5 rounded-full bg-[#1B0F0A]/55 border border-[#C9A46B]/30 text-[#C9A46B] text-[10px] uppercase tracking-[0.18em] font-medium">
      {children}
    </span>
  );
}

function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-title",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 0.3 }
      );
      gsap.fromTo(
        ".hero-subtitle",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power2.out", delay: 0.5 }
      );
      gsap.fromTo(
        ".hero-cta",
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.8 }
      );
      gsap.fromTo(
        ".choco-chip",
        { x: 60, y: 60, opacity: 0, rotate: 25 },
        { x: 0, y: 0, opacity: 0.25, rotate: 12, duration: 0.8, ease: "power2.out", stagger: 0.06, delay: 0.4 }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-[0]">
        <video
          src="/images/Cocoa_grinding.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-[0]"
        />
        <div className="absolute inset-0 bg-[#1a0c06]/70 md:bg-[#1a0c06]/[0.65] z-[1]" />
      </div>

      {/* Chocolate Chips */}
      <ChocolateChip className="absolute top-[15%] left-[8%] choco-chip" size="sm" />
      <ChocolateChip className="absolute top-[20%] right-[12%] choco-chip" size="md" />
      <ChocolateChip className="absolute bottom-[25%] left-[15%] choco-chip" size="lg" />
      <ChocolateChip className="absolute bottom-[30%] right-[8%] choco-chip" size="sm" />
      <ChocolateChip className="absolute top-[40%] left-[5%] choco-chip" size="md" />

      {/* Content */}
      <div ref={contentRef} className="relative z-[2] text-center px-6">
        <h1 className="hero-title font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#F4EBE1] mb-4 leading-[0.95]">
          Myth Cocoa
        </h1>
        <p className="hero-subtitle font-sans text-base md:text-lg text-[#F4EBE1]/70 max-w-md mx-auto mb-10 font-light">
          Single-origin chocolate, crafted in small batches.
        </p>
        <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/story"
            className="px-8 py-3 border border-[#F4EBE1]/30 text-[#F4EBE1] text-xs uppercase tracking-[0.08em] font-medium hover:border-[#C9A46B] hover:text-[#C9A46B] transition-all"
          >
            Explore the Story
          </Link>
          <Link
            href="/products"
            className="px-8 py-3 bg-[#C9A46B] text-[#1B0F0A] text-xs uppercase tracking-[0.08em] font-medium hover:bg-[#F4EBE1] transition-colors"
          >
            Shop Collection
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#F4EBE1]/40">
        <span className="text-[10px] uppercase tracking-[0.18em]">Scroll</span>
        <ChevronDown size={16} className="animate-bounce" />
      </div>
    </section>
  );
}

function PromiseSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".promise-title",
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1,
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", end: "top 55%", scrub: true },
        }
      );
      gsap.fromTo(
        ".promise-stat",
        { y: 60, scale: 0.96, opacity: 0 },
        {
          y: 0, scale: 1, opacity: 1,
          stagger: 0.15,
          scrollTrigger: { trigger: ".promise-stats", start: "top 80%", end: "top 50%", scrub: true },
        }
      );
      gsap.fromTo(
        ".promise-text",
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1,
          scrollTrigger: { trigger: ".promise-text", start: "top 85%", end: "top 60%", scrub: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 bg-[#1B0F0A]">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="promise-title font-serif text-4xl md:text-5xl text-[#F4EBE1] mb-16">
          Small batches. Real origin.
        </h2>
        <div className="promise-stats grid grid-cols-3 gap-4 md:gap-16 mb-16">
          <div className="promise-stat">
            <span className="font-serif italic text-3xl sm:text-5xl md:text-6xl text-[#C9A46B]">80+</span>
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.1em] sm:tracking-[0.18em] text-[#F4EBE1]/50 mt-2 sm:mt-3">Cacao varieties</p>
          </div>
          <div className="promise-stat">
            <span className="font-serif italic text-3xl sm:text-5xl md:text-6xl text-[#C9A46B]">&lt;1%</span>
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.1em] sm:tracking-[0.18em] text-[#F4EBE1]/50 mt-2 sm:mt-3">Harvest selected</p>
          </div>
          <div className="promise-stat">
            <span className="font-serif italic text-3xl sm:text-5xl md:text-6xl text-[#C9A46B]">72h</span>
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.1em] sm:tracking-[0.18em] text-[#F4EBE1]/50 mt-2 sm:mt-3">Slow conching</p>
          </div>
        </div>
        <p className="promise-text text-base text-[#F4EBE1]/60 max-w-2xl mx-auto leading-relaxed font-light">
          We work directly with growers, select by flavor, and roast in micro-lots. 
          The result is a bar that tastes like the place it came from.
        </p>
      </div>
    </section>
  );
}

function ProcessSection({
  step,
  label,
  title,
  body,
  image,
  direction = "right",
}: {
  step: string;
  label: string;
  title: string;
  body: string;
  image: string;
  direction?: "right" | "left" | "bottom";
}) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".process-content",
        { x: direction === "right" ? 80 : direction === "left" ? -80 : 0, y: direction === "bottom" ? 60 : 0, opacity: 0 },
        {
          x: 0, y: 0, opacity: 1,
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%", end: "top 35%", scrub: 0.6 },
        }
      );

      gsap.fromTo(
        ".process-image",
        {
          clipPath: direction === "right" ? "inset(0 100% 0 0)" : direction === "left" ? "inset(0 0 0 100%)" : "inset(100% 0 0 0)",
          scale: 1.12,
          opacity: 0.2
        },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          opacity: 1,
          duration: 1.2,
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", end: "top 45%", scrub: 0.8 },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [direction]);

  return (
    <section ref={sectionRef} className="relative w-full min-h-[60vh] md:min-h-[80vh] flex items-end md:items-center overflow-hidden">
      <div className="process-image absolute inset-0">
        <div className="w-full h-full overflow-hidden bg-[#231008]" style={{ borderRadius: 'inherit' }}>
          <img
            ref={(el) => {
              if (el && el.complete) {
                el.classList.add('img-loaded');
              }
            }}
            src={image}
            alt={label}
            width={1920}
            height={1080}
            loading="eager"
            className="w-full h-full object-cover transition-opacity duration-700"
            onLoad={(e) => e.currentTarget.classList.add('img-loaded')}
          />
        </div>
        <div className="absolute inset-0 bg-[#1B0F0A]/50" />
      </div>
      <div className={`relative z-10 w-full max-w-xl px-6 py-10 md:px-16 md:py-0 ${direction === "left" ? "md:ml-auto md:text-right" : ""}`}>
        <div className="process-content">
          <SectionBadge>Process</SectionBadge>
          <div className="mt-6 mb-4">
            <span className="font-serif italic text-7xl text-[#C9A46B]/30">{step}</span>
          </div>
          <p className="text-xs uppercase tracking-[0.18em] text-[#C9A46B] mb-3 font-medium">{label}</p>
          <h3 className="font-serif text-2xl md:text-4xl text-[#F4EBE1] mb-4 leading-tight">{title}</h3>
          <p className="text-sm md:text-base text-[#F4EBE1]/60 leading-relaxed font-light">{body}</p>
        </div>
      </div>
    </section>
  );
}

function CollectionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { data: products } = trpc.product.list.useQuery({ featured: true });
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".collection-card",
        { y: 70, opacity: 0, rotateX: 8 },
        {
          y: 0, opacity: 1, rotateX: 0,
          stagger: 0.1,
          scrollTrigger: { trigger: ".collection-grid", start: "top 80%", end: "top 40%", scrub: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleAddToCart = (product: any) => {
    if (!product) return;
    addItem({
      productId: product.id,
      name: product.name,
      price: Number(product.price),
      image: product.image || "/images/product-dark-origin.jpg",
      quantity: 1,
      weight: product.weight || undefined,
    });
    toast.success(`${product.name} added to cart`);
  };

  const displayProducts = products || [];

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-[#1B0F0A]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <SectionBadge>Shop</SectionBadge>
          <h2 className="font-serif text-4xl md:text-5xl text-[#F4EBE1] mt-6">Bars & Bonbons</h2>
        </div>
        <div className="collection-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayProducts.map((product: any) => (
            <div
              key={product.id}
              className="collection-card group relative bg-[#2B1E16] overflow-hidden cursor-pointer transition-transform duration-300 hover:-translate-y-1.5"
            >
              <Link href={`/products/${product.slug}`} className="block">
                <div className="aspect-[4/5] overflow-hidden">
                  <div className="w-full h-full overflow-hidden bg-[#231008]" style={{ borderRadius: 'inherit' }}>
      <img
                    src={product.image || "/images/product-dark-origin.jpg"}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onLoad={(e) => e.currentTarget.classList.add('img-loaded')} />
    </div>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg text-[#F4EBE1] mb-1">{product.name}</h3>
                  <p className="text-xs text-[#F4EBE1]/50 mb-3 line-clamp-2 font-light">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-serif italic text-lg text-[#C9A46B]">{formatPrice(Number(product.price))}</span>
                    {product.weight && (
                      <span className="text-[10px] uppercase tracking-[0.14em] text-[#F4EBE1]/40">{product.weight}</span>
                    )}
                  </div>
                </div>
              </Link>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleAddToCart(product);
                }}
                className="absolute bottom-0 left-0 right-0 py-3 bg-[#C9A46B] text-[#1B0F0A] text-xs uppercase tracking-[0.08em] font-medium translate-y-full group-hover:translate-y-0 transition-transform duration-300"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Link
            href="/products"
            className="px-8 py-3 bg-[#C9A46B] text-[#1B0F0A] text-xs uppercase tracking-[0.08em] font-medium text-center hover:bg-[#F4EBE1] transition-colors"
          >
            See the full collection
          </Link>
          <Link
            href="/products?category=gift"
            className="px-8 py-3 border border-[#C9A46B]/30 text-[#F4EBE1]/70 text-xs uppercase tracking-[0.08em] font-medium text-center hover:border-[#C9A46B] hover:text-[#C9A46B] transition-colors"
          >
            Build a gift box
          </Link>
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".experience-text",
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, scrollTrigger: { trigger: sectionRef.current, start: "top 75%", end: "top 45%", scrub: true } }
      );
      gsap.fromTo(
        ".experience-card",
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, scrollTrigger: { trigger: sectionRef.current, start: "top 70%", end: "top 40%", scrub: true } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-[#1B0F0A]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <SectionBadge>Shop</SectionBadge>
          <h2 className="font-serif text-4xl md:text-5xl text-[#F4EBE1] mt-6">Visit the store.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="experience-text">
            <p className="text-base text-[#F4EBE1]/60 leading-relaxed font-light mb-8">
              Explore our collection of single-origin bars, signature truffles, and hand-wrapped gift boxes. Every batch is crafted in our chocolate workshop with the finest heirloom cacao beans.
            </p>
            <div className="w-full h-full overflow-hidden bg-[#231008]" style={{ borderRadius: 'inherit' }}>
              <img
                src="/images/process-gift-box.jpg"
                alt="Wrapped Gift Boxes"
                className="w-full aspect-video object-cover"
                onLoad={(e) => e.currentTarget.classList.add('img-loaded')}
              />
            </div>
          </div>
          <div className="experience-card bg-[#2B1E16] p-6 md:p-8 border border-[#C9A46B]/10 relative overflow-hidden flex flex-col gap-6">
            <div className="w-full aspect-[4/3] overflow-hidden bg-[#231008] border border-[#C9A46B]/15">
              <img
                src="/images/product-seasonal-set.jpg"
                alt="Seasonal Set"
                className="w-full h-full object-cover"
                onLoad={(e) => e.currentTarget.classList.add('img-loaded')}
              />
            </div>
            <div className="flex-1 flex flex-col justify-between h-full w-full">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#C9A46B]/10 border border-[#C9A46B]/25 text-[#C9A46B] text-[9px] uppercase tracking-[0.14em] font-medium mb-3">
                  Featured Gift Set
                </span>
                <h3 className="font-serif text-2xl text-[#F4EBE1] mb-2">The Signature Collection</h3>
                <p className="text-xs text-[#F4EBE1]/60 leading-relaxed font-light mb-4">
                  A curated selection of our finest single-origin dark and milk bars, hand-selected to showcase the diversity of heirloom cacao.
                </p>
                <p className="font-serif text-lg text-[#C9A46B] mb-5">{formatPrice(3999)}</p>
              </div>
              <Link
                href="/products"
                className="inline-block w-full py-3 bg-[#C9A46B] text-[#1B0F0A] text-xs uppercase tracking-[0.08em] font-medium text-center hover:bg-[#F4EBE1] transition-colors"
              >
                Shop Collection
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function JournalSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { data: posts } = trpc.blog.list.useQuery();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".journal-card",
        { y: 70, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.1,
          scrollTrigger: { trigger: ".journal-grid", start: "top 80%", end: "top 40%", scrub: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const displayPosts = posts?.slice(0, 3) || [];

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-[#1B0F0A]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <SectionBadge>Journal</SectionBadge>
          <h2 className="font-serif text-4xl md:text-5xl text-[#F4EBE1] mt-6">Notes & Recipes</h2>
        </div>
        <div className="journal-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {displayPosts.map((post: any) => (
            <Link
              key={post.id}
              href={`/journal/${post.slug}`}
              className="journal-card group block"
            >
              <div className="aspect-[16/10] overflow-hidden mb-4">
                <div className="w-full h-full overflow-hidden bg-[#231008]" style={{ borderRadius: 'inherit' }}>
      <img
                  src={post.image || "/images/journal-ganache.jpg"}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onLoad={(e) => e.currentTarget.classList.add('img-loaded')} />
    </div>
              </div>
              <h3 className="font-serif text-xl text-[#F4EBE1] mb-2 group-hover:text-[#C9A46B] transition-colors">
                {post.title}
              </h3>
              <p className="text-sm text-[#F4EBE1]/50 font-light line-clamp-2">{post.excerpt}</p>
              <span className="inline-flex items-center gap-1 text-xs text-[#C9A46B] mt-3 group-hover:gap-2 transition-all">
                Read <ArrowRight size={12} />
              </span>
            </Link>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href="/journal"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.08em] text-[#C9A46B] hover:text-[#F4EBE1] transition-colors"
          >
            Read more on the journal <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function StorySection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".story-content",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, scrollTrigger: { trigger: sectionRef.current, start: "top 75%", end: "top 50%", scrub: true } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-[#1B0F0A]">
      <div className="max-w-3xl mx-auto px-6 text-center story-content">
        <h2 className="font-serif text-4xl md:text-5xl text-[#F4EBE1] mb-8">
          We're a small team with one obsession.
        </h2>
        <p className="text-base text-[#F4EBE1]/60 leading-relaxed font-light mb-12">
          Myth Cocoa started with a question: what if chocolate tasted exactly like the farm it came from? 
          We visit growers, sample widely, and build recipes around the bean—not the other way around.
        </p>
        <div className="bg-[#2B1E16] p-6 md:p-8 max-w-lg mx-auto">
          <p className="text-xs uppercase tracking-[0.18em] text-[#C9A46B] mb-4 font-medium">
            Get early access to small releases
          </p>
          <form
            className="flex flex-col sm:flex-row gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Thank you for subscribing!");
            }}
          >
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 bg-[#1B0F0A] border border-[#C9A46B]/20 px-4 py-3 text-sm text-[#F4EBE1] placeholder-[#F4EBE1]/30 focus:border-[#C9A46B] focus:outline-none transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#C9A46B] text-[#1B0F0A] text-xs uppercase tracking-[0.08em] font-medium hover:bg-[#F4EBE1] transition-colors"
            >
              Join
            </button>
          </form>
          <p className="text-xs text-[#F4EBE1]/40 mt-3">No spam. Unsubscribe anytime.</p>
        </div>
      </div>
    </section>
  );
}

function ClosingSection() {
  return (
    <section className="py-24 md:py-32 bg-[#1B0F0A]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <SectionBadge>Visit</SectionBadge>
        <h2 className="font-serif text-4xl md:text-5xl text-[#F4EBE1] mt-6 mb-12">Visit the chocolate store.</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 mb-12">
          <div className="flex flex-col items-center">
            <MapPin size={20} className="text-[#C9A46B] mb-3" />
            <h4 className="text-xs uppercase tracking-[0.18em] text-[#C9A46B] mb-2 font-medium">Store Address</h4>
            <p className="text-sm text-[#F4EBE1]/60 font-light">Idukki District<br />Kerala, India — 685 612</p>
          </div>
          <div className="flex flex-col items-center">
            <Clock size={20} className="text-[#C9A46B] mb-3" />
            <h4 className="text-xs uppercase tracking-[0.18em] text-[#C9A46B] mb-2 font-medium">Opening Hours</h4>
            <p className="text-sm text-[#F4EBE1]/60 font-light">Thu-Sun<br />10:00-17:00</p>
          </div>
          <div className="flex flex-col items-center">
            <Phone size={20} className="text-[#C9A46B] mb-3" />
            <h4 className="text-xs uppercase tracking-[0.18em] text-[#C9A46B] mb-2 font-medium">Phone</h4>
            <p className="text-sm text-[#F4EBE1]/60 font-light">+91 98765 43210</p>
          </div>
        </div>
        <Link
          href="/contact"
          className="inline-block px-10 py-4 bg-[#C9A46B] text-[#1B0F0A] text-xs uppercase tracking-[0.08em] font-medium hover:bg-[#F4EBE1] transition-colors"
        >
          Get Directions
        </Link>
        <p className="mt-6">
          <a href="mailto:hello@mythcocoa.in" className="text-sm text-[#F4EBE1]/50 hover:text-[#C9A46B] transition-colors">
            Or email us
          </a>
        </p>
      </div>
    </section>
  );
}

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#1B0F0A] min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <PromiseSection />
        <ProcessSection
          step="01"
          label="Roast & Winnow"
          title="Turn beans into something smooth."
          body="Gentle heat develops depth. Winnowing keeps only the best nibs—no shortcuts."
          image="/images/process-roast.jpg"
          direction="right"
        />
        <CollectionSection />
        <ProcessSection
          step="02"
          label="Conching & Tempering"
          title="Patience is the ingredient."
          body="Days of conching for silkiness. Precision tempering for the perfect snap and shine."
          image="/images/process-conching.jpg"
          direction="left"
        />
        <ExperienceSection />
        <ProcessSection
          step="03"
          label="Molding & Wrapping"
          title="Beautiful enough to gift."
          body="Each bar is molded by hand, wrapped in paper that stays crisp, and finished with a simple seal."
          image="/images/process-molding.jpg"
          direction="right"
        />
        <JournalSection />
        <ProcessSection
          step="04"
          label="The Gift Box"
          title="Made to be shared."
          body="Add a handwritten note. We pack it like it matters—because it does."
          image="/images/process-gift-box.jpg"
          direction="left"
        />
        <StorySection />
        <ClosingSection />
      </main>
      <Footer />
    </div>
  );
}
