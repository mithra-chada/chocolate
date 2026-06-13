import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Star, Plus, Minus, Leaf } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useCartStore } from "@/store/cartStore";
import { trpc } from "@/providers/trpc";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatPrice } from "@/lib/utils";

export default function ProductDetail() {
  const params = useParams();
  const slug = params?.slug as string;
  const { data: product, isLoading } = trpc.product.bySlug.useQuery({ slug: slug || "" });
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (isLoading) {
    return (
      <div className="bg-[#1B0F0A] min-h-screen">
        <Navbar />
        <div className="pt-24 pb-16 max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 animate-pulse">
            <div className="aspect-square bg-[#2B1E16]" />
            <div className="space-y-4">
              <div className="h-8 bg-[#2B1E16] rounded w-3/4" />
              <div className="h-6 bg-[#2B1E16] rounded w-1/3" />
              <div className="h-4 bg-[#2B1E16] rounded w-full" />
              <div className="h-4 bg-[#2B1E16] rounded w-2/3" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-[#1B0F0A] min-h-screen">
        <Navbar />
        <div className="pt-24 pb-16 max-w-6xl mx-auto px-6 text-center py-24">
          <p className="font-serif text-2xl text-[#F4EBE1]/40 mb-4">Product not found</p>
          <Link href="/products" className="text-[#C9A46B] hover:text-[#F4EBE1] transition-colors text-sm">
            Back to collection
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const images = product.images ? JSON.parse(product.images) : [product.image || "/images/product-dark-origin.jpg"];

  // allergens data available for future use

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: Number(product.price),
      image: product.image || "/images/product-dark-origin.jpg",
      quantity,
      weight: product.weight || undefined,
    });
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="bg-[#1B0F0A] min-h-screen">
      <Navbar />
      <main className="pt-14 md:pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.08em] text-[#F4EBE1]/50 hover:text-[#C9A46B] transition-colors mb-6 md:mb-8"
          >
            <ArrowLeft size={14} />
            Back to collection
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-[55%_45%] gap-6 md:gap-12">
            {/* Image Gallery */}
            <div>
              <div className="aspect-square bg-[#2B1E16] overflow-hidden mb-4">
                <div className="w-full h-full overflow-hidden bg-[#231008]" style={{ borderRadius: 'inherit' }}>
      <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                onLoad={(e) => e.currentTarget.classList.add('img-loaded')} />
    </div>
              </div>
              {images.length > 1 && (
                <div className="flex gap-2">
                  {images.map((img: string, i: number) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`w-20 h-20 bg-[#2B1E16] overflow-hidden border-2 transition-colors ${
                        selectedImage === i ? "border-[#C9A46B]" : "border-transparent"
                      }`}
                    >
                      <div className="w-full h-full overflow-hidden bg-[#231008]" style={{ borderRadius: 'inherit' }}>
      <img src={img} alt="" className="w-full h-full object-cover" onLoad={(e) => e.currentTarget.classList.add('img-loaded')} />
    </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              {product.isSeasonal && (
                <div className="flex items-center gap-2 mb-4 text-[#C9A46B]">
                  <svg className="w-5" viewBox="0 0 16 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0H16V24L8 18L0 24V0Z" />
                  </svg>
                  <span className="text-[10px] uppercase tracking-[0.14em] font-medium text-[#C9A46B]">Seasonal Limited Edition</span>
                </div>
              )}
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#F4EBE1] mb-2">{product.name}</h1>

              <div className="flex items-center gap-3 mb-6">
                <span className="font-serif italic text-3xl text-[#C9A46B]">{formatPrice(Number(product.price))}</span>
                {product.comparePrice && (
                  <span className="text-lg text-[#F4EBE1]/30 line-through">
                    {formatPrice(Number(product.comparePrice))}
                  </span>
                )}
              </div>

              {/* Rating */}
              {product.rating && Number(product.rating) > 0 && (
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < Math.round(Number(product.rating)) ? "text-[#C9A46B] fill-[#C9A46B]" : "text-[#F4EBE1]/20"}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-[#F4EBE1]/60">{product.rating} ({product.reviewCount} reviews)</span>
                </div>
              )}

              {/* Quick Info */}
              <div className="flex flex-wrap gap-4 mb-6 text-xs text-[#F4EBE1]/50">
                {product.weight && <span>{product.weight}</span>}
                {product.cacaoPercentage && <span>{product.cacaoPercentage}% Cacao</span>}
                {product.origin && <span>Origin: {product.origin}</span>}
              </div>

              {/* Quantity + Add to Cart */}
              <div className="flex gap-3 mb-6 md:mb-8">
                <div className="flex items-center border border-[#C9A46B]/20">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-11 h-12 flex items-center justify-center text-[#F4EBE1]/60 hover:text-[#C9A46B] transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-10 text-center text-sm text-[#F4EBE1]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-11 h-12 flex items-center justify-center text-[#F4EBE1]/60 hover:text-[#C9A46B] transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 bg-[#C9A46B] text-[#1B0F0A] text-xs uppercase tracking-[0.08em] font-medium hover:bg-[#F4EBE1] transition-colors"
                >
                  Add to Cart
                </button>
              </div>

              <p className="text-sm text-[#F4EBE1]/60 leading-relaxed font-light mb-8">{product.description}</p>

              {/* Tabs */}
              <Tabs defaultValue="ingredients" className="w-full">
                <TabsList className="w-full bg-[#2B1E16] border-b border-[#C9A46B]/10 rounded-none h-auto p-0">
                  <TabsTrigger
                    value="ingredients"
                    className="flex-1 py-3 text-xs uppercase tracking-[0.08em] rounded-none data-[state=active]:bg-transparent data-[state=active]:text-[#C9A46B] data-[state=active]:border-b-2 data-[state=active]:border-[#C9A46B] text-[#F4EBE1]/50 hover:text-[#F4EBE1] transition-colors"
                  >
                    Ingredients
                  </TabsTrigger>
                  <TabsTrigger
                    value="details"
                    className="flex-1 py-3 text-xs uppercase tracking-[0.08em] rounded-none data-[state=active]:bg-transparent data-[state=active]:text-[#C9A46B] data-[state=active]:border-b-2 data-[state=active]:border-[#C9A46B] text-[#F4EBE1]/50 hover:text-[#F4EBE1] transition-colors"
                  >
                    Details
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="ingredients" className="pt-6">
                  <p className="text-sm text-[#F4EBE1]/60 leading-relaxed font-light mb-4">
                    {product.ingredients || "Ingredients information coming soon."}
                  </p>
                  {product.allergens && (
                    <div className="mt-4">
                      <p className="text-xs uppercase tracking-[0.14em] text-[#C9A46B] mb-3 font-medium">Allergens</p>
                      <p className="text-sm text-[#F4EBE1]/60 font-light">{product.allergens}</p>
                    </div>
                  )}
                  <div className="mt-4 flex items-center gap-2 text-[#C8D8B0]">
                    <Leaf size={14} />
                    <span className="text-xs">Cold-chain shipped with ice packs</span>
                  </div>
                </TabsContent>
                <TabsContent value="details" className="pt-6">
                  <dl className="space-y-3">
                    {product.origin && (
                      <div className="flex justify-between">
                        <dt className="text-xs uppercase tracking-[0.14em] text-[#F4EBE1]/40">Origin</dt>
                        <dd className="text-sm text-[#F4EBE1]/70">{product.origin}</dd>
                      </div>
                    )}
                    {product.weight && (
                      <div className="flex justify-between">
                        <dt className="text-xs uppercase tracking-[0.14em] text-[#F4EBE1]/40">Weight</dt>
                        <dd className="text-sm text-[#F4EBE1]/70">{product.weight}</dd>
                      </div>
                    )}
                    {product.cacaoPercentage && (
                      <div className="flex justify-between">
                        <dt className="text-xs uppercase tracking-[0.14em] text-[#F4EBE1]/40">Cacao</dt>
                        <dd className="text-sm text-[#F4EBE1]/70">{product.cacaoPercentage}%</dd>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <dt className="text-xs uppercase tracking-[0.14em] text-[#F4EBE1]/40">Category</dt>
                      <dd className="text-sm text-[#F4EBE1]/70 capitalize">{product.category}</dd>
                    </div>
                  </dl>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
