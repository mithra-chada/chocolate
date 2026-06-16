import Link from "next/link";
import { useRouter } from "next/navigation";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const router = useRouter();
  const { items, isOpen, closeCart, updateQuantity, removeItem, getTotal, getCount } = useCartStore();

  if (!isOpen) return null;

  const total = getTotal();
  const count = getCount();
  const freeShippingThreshold = 5000;
  const progress = Math.min((total / freeShippingThreshold) * 100, 100);

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-[60] bg-[#1B0F0A]/70 backdrop-blur-sm"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full sm:max-w-md z-[70] bg-[#1B0F0A] border-l border-[#C9A46B]/20 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#C9A46B]/10">
          <h2 className="font-serif text-2xl text-[#F4EBE1]">Cart</h2>
          <button
            onClick={closeCart}
            className="text-[#F4EBE1]/60 hover:text-[#C9A46B] transition-colors"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag size={48} className="text-[#C9A46B]/30 mb-4" />
              <p className="font-serif text-xl text-[#F4EBE1]/60 mb-2">Your cart is empty</p>
              <p className="text-sm text-[#F4EBE1]/40 mb-6">Explore our collection of artisan chocolates</p>
              <Link
                href="/products"
                onClick={closeCart}
                className="px-6 py-3 bg-[#C9A46B] text-[#1B0F0A] text-xs uppercase tracking-[0.08em] font-medium hover:bg-[#F4EBE1] transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => {
                const slug = item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                return (
                <div key={item.id} className="flex gap-4">
                  <Link href={`/products/${slug}`} onClick={closeCart} className="w-20 h-20 bg-[#2B1E16] flex-shrink-0 overflow-hidden block group">
                    <div className="w-full h-full overflow-hidden bg-[#231008]" style={{ borderRadius: 'inherit' }}>
      <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onLoad={(e) => e.currentTarget.classList.add('img-loaded')} />
    </div>
                  </Link>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <Link href={`/products/${slug}`} onClick={closeCart} className="block">
                          <h4 className="text-sm font-medium text-[#F4EBE1] hover:text-[#C9A46B] transition-colors truncate">{item.name}</h4>
                        </Link>
                        {item.variant && (
                          <p className="text-xs text-[#F4EBE1]/50 mt-0.5">{item.variant}</p>
                        )}
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-[#F4EBE1]/30 hover:text-[#C9A46B] transition-colors ml-2"
                      >
                        <X size={14} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center border border-[#C9A46B]/20 text-[#F4EBE1]/60 hover:border-[#C9A46B] hover:text-[#C9A46B] transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-sm text-[#F4EBE1] w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center border border-[#C9A46B]/20 text-[#F4EBE1]/60 hover:border-[#C9A46B] hover:text-[#C9A46B] transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="text-sm font-serif italic text-[#C9A46B]">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              )})}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-[#C9A46B]/10 space-y-4">
            {/* Free Shipping */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[#F4EBE1]/60">
                  {total >= freeShippingThreshold
                    ? "You qualify for free shipping!"
                    : `Spend ${formatPrice(freeShippingThreshold - total)} more for free shipping`}
                </span>
              </div>
              <div className="w-full h-1 bg-[#2B1E16] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#C9A46B] transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#F4EBE1]/60">Subtotal ({count} items)</span>
              <span className="font-serif text-2xl italic text-[#C9A46B]">{formatPrice(total)}</span>
            </div>

            {/* Actions */}
            <button
              onClick={() => {
                closeCart();
                router.push("/checkout");
              }}
              className="block w-full py-3 bg-[#C9A46B] text-[#1B0F0A] text-center text-xs uppercase tracking-[0.08em] font-medium hover:bg-[#F4EBE1] active:scale-[0.97] transition-all duration-150 ease-out"
            >
              Checkout
            </button>
            <button
              onClick={closeCart}
              className="block w-full py-3 border border-[#C9A46B]/30 text-[#F4EBE1]/70 text-center text-xs uppercase tracking-[0.08em] hover:border-[#C9A46B] hover:text-[#C9A46B] transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
