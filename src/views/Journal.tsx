import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { trpc } from "@/providers/trpc";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { value: "", label: "All" },
  { value: "recipes", label: "Recipes" },
  { value: "pairing", label: "Pairings" },
  { value: "origin", label: "Origin Stories" },
  { value: "craft", label: "Craft & Process" },
  { value: "education", label: "Education" },
];

export default function Journal() {
  const [activeCategory, setActiveCategory] = useState("");
  const [search, setSearch] = useState("");
  const { data: posts, isLoading } = trpc.blog.list.useQuery(
    activeCategory ? { category: activeCategory } : undefined
  );
  
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useGSAP(() => {
    if (!isLoading && posts && posts.length > 0 && gridRef.current) {
      gsap.fromTo(
        ".journal-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    }
  }, [posts, isLoading]);

  const filteredPosts = posts?.filter((post: any) =>
    search ? post.title.toLowerCase().includes(search.toLowerCase()) : true
  );

  return (
    <div className="bg-[#1B0F0A] min-h-screen">
      <Navbar />
      <main className="pt-24 pb-16">
        {/* Header */}
        <div className="max-w-6xl mx-auto px-6 mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#1B0F0A]/55 border border-[#C9A46B]/30 text-[#C9A46B] text-[10px] uppercase tracking-[0.18em] font-medium mb-4">
            Journal
          </span>
          <h1 className="font-serif text-5xl md:text-6xl text-[#F4EBE1] mb-4">Notes & Recipes</h1>
          <p className="text-base text-[#F4EBE1]/50 max-w-lg font-light">
            Stories from the farm, recipes from our kitchen, and guides to enjoying chocolate more fully.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="max-w-6xl mx-auto px-6 mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="relative w-full md:w-72">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#F4EBE1]/30" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles..."
                className="w-full bg-[#2B1E16] border border-[#C9A46B]/20 pl-10 pr-4 py-2.5 text-sm text-[#F4EBE1] placeholder-[#F4EBE1]/30 focus:border-[#C9A46B] focus:outline-none transition-colors"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`px-4 py-2 text-xs uppercase tracking-[0.08em] font-medium border transition-colors ${
                    activeCategory === cat.value
                      ? "bg-[#C9A46B] text-[#1B0F0A] border-[#C9A46B]"
                      : "text-[#F4EBE1]/60 border-[#C9A46B]/20 hover:border-[#C9A46B] hover:text-[#C9A46B]"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="max-w-6xl mx-auto px-6">
          {isLoading ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[16/10] bg-[#2B1E16] mb-4" />
                  <div className="h-5 bg-[#2B1E16] rounded w-3/4 mb-2" />
                  <div className="h-3 bg-[#2B1E16] rounded w-full" />
                </div>
              ))}
            </div>
          ) : filteredPosts && filteredPosts.length > 0 ? (
            <div ref={gridRef} className="grid md:grid-cols-3 gap-8">
              {filteredPosts.map((post: any) => (
                <Link
                  key={post.id}
                  href={`/journal/${post.slug}`}
                  className="journal-card group block opacity-0"
                >
                  <div className="aspect-[16/10] overflow-hidden mb-4">
                    <div className="w-full h-full overflow-hidden bg-[#231008]" style={{ borderRadius: 'inherit' }}>
                      <img
                        src={post.image || "/images/journal-ganache.jpg"}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onLoad={(e) => e.currentTarget.classList.add('img-loaded')} 
                      />
                    </div>
                  </div>
                  {post.category && (
                    <span className="text-[10px] uppercase tracking-[0.14em] text-[#C9A46B] mb-2 block">
                      {post.category}
                    </span>
                  )}
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
          ) : (
            <div className="text-center py-24">
              <p className="font-serif text-2xl text-[#F4EBE1]/40 mb-4">No articles found</p>
              <p className="text-sm text-[#F4EBE1]/30 font-light">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
