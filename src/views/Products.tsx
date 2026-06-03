import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useCartStore } from "@/store/cartStore";
import { trpc } from "@/providers/trpc";
import { toast } from "sonner";
import { formatPrice } from "@/lib/utils";

const categories = [
  { value: "", label: "All" },
  { value: "dark", label: "Dark" },
  { value: "milk", label: "Milk" },
  { value: "gift", label: "Gift Sets" },
  { value: "bonbon", label: "Bonbons" },
  { value: "bulk", label: "Bulk" },
];

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "rating", label: "Rating" },
];

export default function Products() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(searchParams?.get("category") || "");
  const [sort, setSort] = useState("newest");

  const { data: products, isLoading } = trpc.product.list.useQuery({
    category: activeCategory || undefined,
    search: search || undefined,
    sort: sort as "newest" | "price_asc" | "price_desc" | "rating",
  });

  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAddToCart = (product: NonNullable<typeof products>[number]) => {
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

  return (
    <div className="bg-[#1B0F0A] min-h-screen">
      <Navbar />
      <main className="pt-24 pb-16">
        {/* Header */}
        <div className="max-w-6xl mx-auto px-6 mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#1B0F0A]/55 border border-[#C9A46B]/30 text-[#C9A46B] text-[10px] uppercase tracking-[0.18em] font-medium mb-4">
            Shop
          </span>
          <h1 className="font-serif text-5xl md:text-6xl text-[#F4EBE1] mb-4">The Collection</h1>
          <p className="text-base text-[#F4EBE1]/50 max-w-lg font-light">
            Each bar is a single-origin expression of its terroir. Taste the difference that rare beans and careful craft make.
          </p>
        </div>

        {/* Filters */}
        <div className="max-w-6xl mx-auto px-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-72">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#F4EBE1]/30" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full bg-[#2B1E16] border border-[#C9A46B]/20 pl-10 pr-4 py-2.5 text-sm text-[#F4EBE1] placeholder-[#F4EBE1]/30 focus:border-[#C9A46B] focus:outline-none transition-colors"
              />
            </div>

            {/* Category Tabs */}
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

            {/* Sort */}
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={14} className="text-[#C9A46B]" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="bg-[#2B1E16] border border-[#C9A46B]/20 px-3 py-2.5 text-xs text-[#F4EBE1]/60 focus:border-[#C9A46B] focus:outline-none transition-colors"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-[#2B1E16]">
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="max-w-6xl mx-auto px-6">
          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-[#2B1E16] animate-pulse">
                  <div className="aspect-[4/5] bg-[#1B0F0A]" />
                  <div className="p-5 space-y-3">
                    <div className="h-5 bg-[#1B0F0A] rounded w-3/4" />
                    <div className="h-3 bg-[#1B0F0A] rounded w-full" />
                    <div className="h-4 bg-[#1B0F0A] rounded w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : products && products.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product: any) => (
                <div
                  key={product.id}
                  className="group relative bg-[#2B1E16] overflow-hidden"
                >
                  <Link href={`/products/${product.slug}`} className="block">
                    <div className="aspect-[4/5] overflow-hidden relative">
                      <div className="w-full h-full overflow-hidden bg-[#231008]" style={{ borderRadius: 'inherit' }}>
      <img
                        src={product.image || "/images/product-dark-origin.jpg"}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onLoad={(e) => e.currentTarget.classList.add('img-loaded')} />
    </div>
                      {product.isSeasonal && (
                        <div className="absolute top-0 right-4 w-6 text-[#C9A46B] drop-shadow-md z-10" title="Seasonal">
                          <svg viewBox="0 0 16 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0H16V24L8 18L0 24V0Z" />
                          </svg>
                        </div>
                      )}
                      {product.comparePrice && (
                        <span className="absolute top-3 left-3 px-3 py-1 bg-[#C9A46B] text-[#1B0F0A] text-[10px] uppercase tracking-[0.14em] font-medium">
                          Sale
                        </span>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="font-serif text-lg text-[#F4EBE1] mb-1">{product.name}</h3>
                      <p className="text-xs text-[#F4EBE1]/50 mb-3 line-clamp-2 font-light">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-serif italic text-lg text-[#C9A46B]">{formatPrice(Number(product.price))}</span>
                          {product.comparePrice && (
                            <span className="text-sm text-[#F4EBE1]/30 line-through">
                              {formatPrice(Number(product.comparePrice))}
                            </span>
                          )}
                        </div>
                        {product.weight && (
                          <span className="text-[10px] uppercase tracking-[0.14em] text-[#F4EBE1]/40">{product.weight}</span>
                        )}
                      </div>

                    </div>
                  </Link>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="absolute bottom-0 left-0 right-0 py-3 bg-[#C9A46B] text-[#1B0F0A] text-xs uppercase tracking-[0.08em] font-medium translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <p className="font-serif text-2xl text-[#F4EBE1]/40 mb-4">No products found</p>
              <p className="text-sm text-[#F4EBE1]/30 font-light">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
