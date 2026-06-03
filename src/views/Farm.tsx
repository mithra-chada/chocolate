import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import CountUp from "react-countup";

gsap.registerPlugin(ScrollTrigger);

const timelineSteps = [
  {
    step: "01",
    title: "It starts with the soil.",
    body: "Our cacao trees grow in rich volcanic soil at the foothills, nourished by tropical rains and warm sunshine. Each tree is nurtured by hand, with care passed down through generations.",
    image: "/images/hero-farm.jpg",
  },
  {
    step: "02",
    title: "Pods split at peak ripeness.",
    body: "We harvest only when the pods reach perfect maturity - a deep golden hue that signals the beans inside have developed their full flavor potential.",
    image: "/images/farm-hands-pod.jpg",
  },
  {
    step: "03",
    title: "Fermented 6 days under banana leaves.",
    body: "The beans and pulp are placed in wooden boxes, covered with banana leaves. Natural fermentation develops the precursor flavors that make chocolate truly extraordinary.",
    image: "/images/process-fermentation.jpg",
  },
  {
    step: "04",
    title: "Sun-dried on raised beds.",
    body: "After fermentation, beans are spread on raised drying beds under the tropical sun. They are turned regularly to ensure even drying and prevent mold.",
    image: "/images/process-drying.jpg",
  },
  {
    step: "05",
    title: "Tempered with precision.",
    body: "The final step requires skill and patience. Precise temperature control creates the perfect snap, shine, and melt that defines exceptional chocolate.",
    image: "/images/process-tempering.jpg",
  },
  {
    step: "06",
    title: "Then it reaches you.",
    body: "Every bar is wrapped by hand, sealed with our mark, and shipped cold-chain to preserve its freshness. From our farm to your hands.",
    image: "/images/process-final.jpg",
  },
];

const stats = [
  { value: 1200, suffix: "m", label: "Altitude" },
  { value: 2024, suffix: "", label: "Harvest Year" },
  { value: 3, suffix: "", label: "Varietals" },
];

export default function Farm() {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      sectionRefs.current.forEach((ref) => {
        if (!ref) return;
        gsap.fromTo(
          ref,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1,
            scrollTrigger: { trigger: ref, start: "top 85%", end: "top 50%", scrub: true },
          }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-[#1B0F0A] min-h-screen">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <div className="w-full h-full overflow-hidden bg-[#231008]" style={{ borderRadius: 'inherit' }}>
      <img src="/images/farm-aerial.jpg" alt="Our farm" className="w-full h-full object-cover" onLoad={(e) => e.currentTarget.classList.add('img-loaded')} />
    </div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#1B0F0A]/60 via-[#1B0F0A]/50 to-[#1B0F0A]" />
          </div>
          <div className="relative z-10 text-center px-6">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#1B0F0A]/55 border border-[#C9A46B]/30 text-[#C9A46B] text-[10px] uppercase tracking-[0.18em] font-medium mb-6">
              Our Farm
            </span>
            <h1 className="font-serif text-5xl md:text-7xl text-[#F4EBE1] mb-4">Bean to Bar</h1>
            <p className="text-base text-[#F4EBE1]/60 max-w-lg mx-auto font-light">
              From rare pods in tropical groves to small-batch bars in our atelier.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-[#1B0F0A] border-b border-[#C9A46B]/10">
          <div className="max-w-4xl mx-auto px-6">
            <div className="grid grid-cols-3 gap-8 text-center">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <span className="font-serif italic text-4xl md:text-5xl text-[#C9A46B]">
                    <CountUp end={stat.value} suffix={stat.suffix} duration={2} />
                  </span>
                  <p className="text-xs uppercase tracking-[0.18em] text-[#F4EBE1]/50 mt-2">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            {timelineSteps.map((step, i) => (
              <div
                key={step.step}
                ref={(el) => { sectionRefs.current[i] = el; }}
                className={`grid md:grid-cols-2 gap-8 md:gap-16 items-center mb-24 last:mb-0 ${
                  i % 2 === 1 ? "md:direction-rtl" : ""
                }`}
              >
                <div className={`${i % 2 === 1 ? "md:order-2" : ""}`}>
                  <div className="aspect-[16/10] overflow-hidden">
                    <div className="w-full h-full overflow-hidden bg-[#231008]" style={{ borderRadius: 'inherit' }}>
      <img src={step.image} alt={step.title} className="w-full h-full object-cover" onLoad={(e) => e.currentTarget.classList.add('img-loaded')} />
    </div>
                  </div>
                </div>
                <div className={`${i % 2 === 1 ? "md:order-1 md:text-right" : ""}`}>
                  <span className="font-serif italic text-7xl text-[#C9A46B]/20">{step.step}</span>
                  <h3 className="font-serif text-3xl text-[#F4EBE1] mt-2 mb-4">{step.title}</h3>
                  <p className="text-base text-[#F4EBE1]/60 leading-relaxed font-light">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Farmer Portrait */}
        <section className="py-16 bg-[#2B1E16]">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="w-32 h-32 mx-auto mb-6 overflow-hidden rounded-full">
              <div className="w-full h-full overflow-hidden bg-[#231008]" style={{ borderRadius: 'inherit' }}>
      <img src="/images/farmer-portrait.jpg" alt="Our farmer" className="w-full h-full object-cover" onLoad={(e) => e.currentTarget.classList.add('img-loaded')} />
    </div>
            </div>
            <p className="font-serif italic text-2xl text-[#F4EBE1] mb-4 max-w-xl mx-auto">
              "The cacao tells us when it's ready. We just have to listen."
            </p>
            <p className="text-sm text-[#F4EBE1]/50">- Don Miguel, Head Grower</p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 text-center">
          <div className="max-w-2xl mx-auto px-6">
            <h2 className="font-serif text-4xl text-[#F4EBE1] mb-6">Visit the farm</h2>
            <p className="text-base text-[#F4EBE1]/60 mb-8 font-light">
              Walk the grove, taste cacao fresh from the pod, and see how we turn rare beans into chocolate.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#C9A46B] text-[#1B0F0A] text-xs uppercase tracking-[0.08em] font-medium hover:bg-[#F4EBE1] transition-colors"
            >
              Book a Tasting <ArrowRight size={14} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
