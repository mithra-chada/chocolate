import { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { ShoppingBag, Plus, Minus, X } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";

export default function Cart() {
  const { items, updateQuantity, removeItem, clearCart, getTotal, getCount } = useCartStore();
  const navigate = useNavigate();
  const total = getTotal();
  const count = getCount();
  const freeShippingThreshold = 5000;
  const progress = Math.min((total / freeShippingThreshold) * 100, 100);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#1B0F0A] min-h-screen">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="font-serif text-5xl text-[#F4EBE1] mb-2">Your Cart</h1>
          <p className="text-sm text-[#F4EBE1]/50 mb-8">{count} items</p>

          {items.length === 0 ? (
            <div className="text-center py-24">
              <ShoppingBag size={64} className="text-[#C9A46B]/20 mx-auto mb-6" />
              <p className="font-serif text-2xl text-[#F4EBE1]/40 mb-4">Your cart is empty</p>
              <p className="text-sm text-[#F4EBE1]/30 mb-8 font-light">
                Explore our collection of artisan chocolates
              </p>
              <Link
                to="/products"
                className="inline-block px-8 py-3 bg-[#C9A46B] text-[#1B0F0A] text-xs uppercase tracking-[0.08em] font-medium hover:bg-[#F4EBE1] transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-[1fr_320px] gap-8">
              {/* Items */}
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 bg-[#2B1E16] p-4">
                    <div className="w-24 h-24 bg-[#1B0F0A] flex-shrink-0 overflow-hidden">
                      <div className="w-full h-full overflow-hidden bg-[#231008]" style={{ borderRadius: 'inherit' }}>
      <img src={item.image} alt={item.name} className="w-full h-full object-cover" onLoad={(e) => e.currentTarget.classList.add('img-loaded')} />
    </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <Link to={`/products`} className="font-serif text-lg text-[#F4EBE1] hover:text-[#C9A46B] transition-colors">
                            {item.name}
                          </Link>
                          {item.variant && <p className="text-xs text-[#F4EBE1]/40 mt-0.5">{item.variant}</p>}
                          {item.weight && <p className="text-xs text-[#F4EBE1]/40">{item.weight}</p>}
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-[#F4EBE1]/30 hover:text-[#C9A46B] transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center border border-[#C9A46B]/20 text-[#F4EBE1]/60 hover:border-[#C9A46B] hover:text-[#C9A46B] transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-sm text-[#F4EBE1] w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center border border-[#C9A46B]/20 text-[#F4EBE1]/60 hover:border-[#C9A46B] hover:text-[#C9A46B] transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <span className="font-serif italic text-lg text-[#C9A46B]">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  onClick={clearCart}
                  className="text-xs uppercase tracking-[0.08em] text-[#F4EBE1]/40 hover:text-[#C9A46B] transition-colors"
                >
                  Clear cart
                </button>
              </div>

              {/* Summary */}
              <div className="bg-[#2B1E16] p-6 h-fit">
                <h3 className="font-serif text-xl text-[#F4EBE1] mb-6">Order Summary</h3>

                {/* Free Shipping */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-[#F4EBE1]/60">
                      {total >= freeShippingThreshold
                        ? "You qualify for free shipping!"
                        : `Spend ${formatPrice(freeShippingThreshold - total)} more for free shipping`}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-[#1B0F0A] rounded-full overflow-hidden">
                    <div className="h-full bg-[#C9A46B] transition-all duration-500" style={{ width: `${progress}%` }} />
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#F4EBE1]/60">Subtotal</span>
                    <span className="text-[#F4EBE1]">{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#F4EBE1]/60">Shipping</span>
                    <span className="text-[#F4EBE1]/60">{total >= freeShippingThreshold ? "Free" : "Calculated at checkout"}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#C9A46B]/10 mb-6">
                  <span className="text-sm text-[#F4EBE1]/60">Total</span>
                  <span className="font-serif italic text-2xl text-[#C9A46B]">{formatPrice(total)}</span>
                </div>

                <button
                  onClick={() => navigate("/checkout")}
                  className="w-full py-3 bg-[#C9A46B] text-[#1B0F0A] text-xs uppercase tracking-[0.08em] font-medium hover:bg-[#F4EBE1] transition-colors mb-3"
                >
                  Checkout
                </button>
                <Link
                  to="/products"
                  className="block w-full py-3 border border-[#C9A46B]/30 text-[#F4EBE1]/70 text-center text-xs uppercase tracking-[0.08em] hover:border-[#C9A46B] hover:text-[#C9A46B] transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
