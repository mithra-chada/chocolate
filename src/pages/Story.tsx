import { useEffect } from "react";
import { Link } from "react-router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function Story() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.fromTo(".story-section", { y: 50, opacity: 0 }, {
        y: 0, opacity: 1,
        stagger: 0.2,
        scrollTrigger: { trigger: ".story-content", start: "top 80%", end: "top 40%", scrub: true },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-[#1B0F0A] min-h-screen">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <div className="w-full h-full overflow-hidden bg-[#231008]" style={{ borderRadius: 'inherit' }}>
      <img src="/images/story-team.jpg" alt="Our team" className="w-full h-full object-cover" onLoad={(e) => e.currentTarget.classList.add('img-loaded')} />
    </div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#1B0F0A]/60 via-[#1B0F0A]/50 to-[#1B0F0A]" />
          </div>
          <div className="relative z-10 text-center px-6">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#1B0F0A]/55 border border-[#C9A46B]/30 text-[#C9A46B] text-[10px] uppercase tracking-[0.18em] font-medium mb-6">
              Our Story
            </span>
            <h1 className="font-serif text-5xl md:text-6xl text-[#F4EBE1] mb-4">Grown rare. Crafted slow.</h1>
          </div>
        </section>

        {/* Content */}
        <section className="story-content py-24">
          <div className="max-w-3xl mx-auto px-6">
            <div className="story-section mb-16">
              <p className="font-serif text-3xl text-[#F4EBE1] leading-relaxed mb-8">
                Myth Cocoa started with a simple question: what if chocolate tasted exactly like the farm it came from?
              </p>
              <p className="text-base text-[#F4EBE1]/60 leading-relaxed font-light mb-6">
                In 2018, we left our careers in finance and design to pursue something more meaningful. 
                We traveled to cacao-growing regions across South America, tasting beans from dozens of farms, 
                searching for flavors that truly stood out.
              </p>
              <p className="text-base text-[#F4EBE1]/60 leading-relaxed font-light">
                What we discovered changed everything. The vast majority of chocolate on the market is made from 
                commodity beans, blended for consistency rather than character. But when you taste a single-origin 
                cacao from a carefully tended farm, you experience something entirely different - a complex, 
                evolving flavor that tells the story of its soil, climate, and the hands that cultivated it.
              </p>
            </div>

            <div className="story-section mb-16">
              <div className="aspect-video overflow-hidden mb-8">
                <div className="w-full h-full overflow-hidden bg-[#231008]" style={{ borderRadius: 'inherit' }}>
      <img src="/images/process-roast.jpg" alt="Roasting" className="w-full h-full object-cover" onLoad={(e) => e.currentTarget.classList.add('img-loaded')} />
    </div>
              </div>
              <h2 className="font-serif text-3xl text-[#F4EBE1] mb-4">The Craft</h2>
              <p className="text-base text-[#F4EBE1]/60 leading-relaxed font-light mb-6">
                We work directly with a small network of growers who share our obsession with quality. 
                We visit their farms, sample their harvests, and select only the beans that meet our 
                exacting standards - less than 1% of what we taste makes it into our chocolate.
              </p>
              <p className="text-base text-[#F4EBE1]/60 leading-relaxed font-light">
                Each batch is roasted in micro-lots, allowing us to develop unique profiles for each origin. 
                Our 72-hour conching process creates a silky texture that lets the true flavor of the cacao shine through. 
                No shortcuts, no compromises.
              </p>
            </div>

            <div className="story-section mb-16">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="aspect-[3/4] overflow-hidden">
                  <div className="w-full h-full overflow-hidden bg-[#231008]" style={{ borderRadius: 'inherit' }}>
      <img src="/images/process-molding.jpg" alt="Molding" className="w-full h-full object-cover" onLoad={(e) => e.currentTarget.classList.add('img-loaded')} />
    </div>
                </div>
                <div className="flex flex-col justify-center">
                  <h2 className="font-serif text-3xl text-[#F4EBE1] mb-4">The Team</h2>
                  <p className="text-base text-[#F4EBE1]/60 leading-relaxed font-light mb-6">
                    We're a small team of chocolate makers, designers, and dreamers who believe that the best 
                    things in life take time. Our atelier is a converted warehouse where we roast, conch, temper, 
                    and wrap every bar by hand.
                  </p>
                  <p className="text-base text-[#F4EBE1]/60 leading-relaxed font-light">
                    When you buy a Myth Cocoa bar, you're not just buying chocolate - you're supporting a network 
                    of small-scale farmers, sustainable agriculture, and the ancient art of craft chocolate making.
                  </p>
                </div>
              </div>
            </div>

            {/* Pull Quote */}
            <div className="story-section text-center py-16 border-t border-b border-[#C9A46B]/10">
              <p className="font-serif italic text-3xl text-[#C9A46B] max-w-2xl mx-auto mb-4">
                "Chocolate should taste like where it came from. Every bar is a journey to a specific place, 
                a specific moment in time."
              </p>
              <p className="text-sm text-[#F4EBE1]/50">- Sarah Chen, Founder</p>
            </div>

            {/* CTA */}
            <div className="story-section text-center pt-16">
              <h2 className="font-serif text-3xl text-[#F4EBE1] mb-6">Taste the difference</h2>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-8 py-3 bg-[#C9A46B] text-[#1B0F0A] text-xs uppercase tracking-[0.08em] font-medium hover:bg-[#F4EBE1] transition-colors"
              >
                Shop the Collection <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
