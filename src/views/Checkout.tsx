import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IceCreamCone, ArrowLeft, Send } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";
import { formatPrice } from "@/lib/utils";

export default function Checkout() {
  const router = useRouter();
  const { items, getTotal, clearCart } = useCartStore();
  
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "India",
    shippingMethod: "standard",
    giftWrap: false,
    giftMessage: "",
  });

  const total = getTotal();
  const gstAmount = total * 0.18;
  const shippingCost = form.shippingMethod === "express" ? 750 : total >= 5000 ? 0 : 400;
  const giftWrapCost = form.giftWrap ? 250 : 0;
  const finalTotal = total + gstAmount + shippingCost + giftWrapCost;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (items.length === 0) {
      router.push("/products");
    }
  }, [items, router]);

  const updateForm = (key: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleWhatsAppCheckout = () => {
    if (!form.name || !form.phone || !form.address || !form.city || !form.postalCode) {
      toast.error("Please fill in all required delivery details (Name, Phone, Address, City, Postal Code).");
      return;
    }

    let msg = `🍫 *New Order Request* 🍫\n\n`;
    
    msg += `*Items:*\n`;
    items.forEach(item => {
      msg += `- ${item.quantity}x ${item.name} ${item.variant ? `(${item.variant})` : ''} — ${formatPrice(item.price * item.quantity)}\n`;
    });

    msg += `\n*Bill Details:*\n`;
    msg += `Subtotal: ${formatPrice(total)}\n`;
    msg += `GST (18%): ${formatPrice(gstAmount)}\n`;
    msg += `Shipping (${form.shippingMethod}): ${shippingCost === 0 ? "Free" : formatPrice(shippingCost)}\n`;
    if (form.giftWrap) {
      msg += `Gift Wrap: ${formatPrice(250)}\n`;
      msg += `Gift Message: ${form.giftMessage}\n`;
    }
    msg += `*Final Total: ${formatPrice(finalTotal)}*\n\n`;

    msg += `*Delivery Details:*\n`;
    msg += `Name: ${form.name}\n`;
    msg += `Phone: ${form.phone}\n`;
    if (form.email) msg += `Email: ${form.email}\n`;
    msg += `Address: ${form.address}, ${form.city}, ${form.postalCode}, ${form.country}\n`;

    const encodedMessage = encodeURIComponent(msg);
    const whatsappUrl = `https://wa.me/917075147888?text=${encodedMessage}`;
    
    clearCart();
    
    window.open(whatsappUrl, '_blank');
    router.push('/');
  };

  if (items.length === 0) return null;

  return (
    <div className="bg-[#1B0F0A] min-h-screen flex flex-col">
      <Navbar />
      <main className="pt-24 pb-16 flex-grow">
        <div className="max-w-5xl mx-auto px-6">
          {/* Back + Title */}
          <button
            onClick={() => router.push("/cart")}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.08em] text-[#F4EBE1]/50 hover:text-[#C9A46B] transition-colors mb-8"
          >
            <ArrowLeft size={14} />
            Back to Cart
          </button>
          <h1 className="font-serif text-4xl text-[#F4EBE1] mb-12">Complete Your Order</h1>

          <div className="grid md:grid-cols-[1fr_350px] gap-12">
            {/* Form Section */}
            <div className="space-y-10">
              
              {/* Contact Information */}
              <section className="space-y-4">
                <h2 className="font-serif text-2xl text-[#F4EBE1] mb-6">Contact & Delivery</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Full name *"
                    value={form.name}
                    onChange={(e) => updateForm("name", e.target.value)}
                    className="w-full bg-[#2B1E16] border border-[#C9A46B]/20 px-4 py-3 text-base md:text-sm text-[#F4EBE1] placeholder-[#F4EBE1]/30 focus:border-[#C9A46B] focus:outline-none transition-colors"
                  />
                  <input
                    type="tel"
                    placeholder="Phone number *"
                    value={form.phone}
                    onChange={(e) => updateForm("phone", e.target.value)}
                    className="w-full bg-[#2B1E16] border border-[#C9A46B]/20 px-4 py-3 text-base md:text-sm text-[#F4EBE1] placeholder-[#F4EBE1]/30 focus:border-[#C9A46B] focus:outline-none transition-colors"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email (optional)"
                  value={form.email}
                  onChange={(e) => updateForm("email", e.target.value)}
                  className="w-full bg-[#2B1E16] border border-[#C9A46B]/20 px-4 py-3 text-base md:text-sm text-[#F4EBE1] placeholder-[#F4EBE1]/30 focus:border-[#C9A46B] focus:outline-none transition-colors"
                />
                
                <input
                  type="text"
                  placeholder="Street Address *"
                  value={form.address}
                  onChange={(e) => updateForm("address", e.target.value)}
                  className="w-full bg-[#2B1E16] border border-[#C9A46B]/20 px-4 py-3 text-base md:text-sm text-[#F4EBE1] placeholder-[#F4EBE1]/30 focus:border-[#C9A46B] focus:outline-none transition-colors mt-4"
                />
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="City *"
                    value={form.city}
                    onChange={(e) => updateForm("city", e.target.value)}
                    className="w-full bg-[#2B1E16] border border-[#C9A46B]/20 px-4 py-3 text-base md:text-sm text-[#F4EBE1] placeholder-[#F4EBE1]/30 focus:border-[#C9A46B] focus:outline-none transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="Postal code *"
                    value={form.postalCode}
                    onChange={(e) => updateForm("postalCode", e.target.value)}
                    className="w-full bg-[#2B1E16] border border-[#C9A46B]/20 px-4 py-3 text-base md:text-sm text-[#F4EBE1] placeholder-[#F4EBE1]/30 focus:border-[#C9A46B] focus:outline-none transition-colors"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Country"
                  value={form.country}
                  onChange={(e) => updateForm("country", e.target.value)}
                  className="w-full bg-[#2B1E16] border border-[#C9A46B]/20 px-4 py-3 text-base md:text-sm text-[#F4EBE1] placeholder-[#F4EBE1]/30 focus:border-[#C9A46B] focus:outline-none transition-colors"
                />
              </section>

              {/* Shipping Method */}
              <section className="space-y-4">
                <h2 className="font-serif text-2xl text-[#F4EBE1] mb-6">Shipping Method</h2>
                <div className="space-y-3">
                  <label
                    className={`flex items-center justify-between p-4 border cursor-pointer transition-colors ${
                      form.shippingMethod === "standard" ? "border-[#C9A46B] bg-[#C9A46B]/5" : "border-[#C9A46B]/20"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        checked={form.shippingMethod === "standard"}
                        onChange={() => updateForm("shippingMethod", "standard")}
                        className="accent-[#C9A46B]"
                      />
                      <div>
                        <p className="text-sm text-[#F4EBE1]">Standard Shipping</p>
                        <p className="text-xs text-[#F4EBE1]/40">3-5 business days</p>
                      </div>
                    </div>
                    <span className="text-sm text-[#C9A46B]">{total >= 5000 ? "Free" : formatPrice(400)}</span>
                  </label>
                  <label
                    className={`flex items-center justify-between p-4 border cursor-pointer transition-colors ${
                      form.shippingMethod === "express" ? "border-[#C9A46B] bg-[#C9A46B]/5" : "border-[#C9A46B]/20"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        checked={form.shippingMethod === "express"}
                        onChange={() => updateForm("shippingMethod", "express")}
                        className="accent-[#C9A46B]"
                      />
                      <div>
                        <p className="text-sm text-[#F4EBE1]">Cold-Chain Express</p>
                        <p className="text-xs text-[#F4EBE1]/40">1-2 business days</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-[#C9A46B]">{formatPrice(750)}</span>
                      <div className="flex items-center gap-1 text-[#C8D8B0] mt-1">
                        <IceCreamCone size={10} />
                        <span className="text-[10px]">Temperature-controlled</span>
                      </div>
                    </div>
                  </label>
                </div>
              </section>

              {/* Gift Options */}
              <section className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.giftWrap}
                    onChange={(e) => updateForm("giftWrap", e.target.checked)}
                    className="accent-[#C9A46B]"
                  />
                  <span className="text-sm text-[#F4EBE1]/70">Add gift wrap ({formatPrice(250)})</span>
                </label>
                {form.giftWrap && (
                  <textarea
                    placeholder="Write a gift message (max 120 characters)"
                    maxLength={120}
                    value={form.giftMessage}
                    onChange={(e) => updateForm("giftMessage", e.target.value)}
                    className="w-full mt-3 bg-[#2B1E16] border border-[#C9A46B]/20 px-4 py-3 text-base md:text-sm text-[#F4EBE1] placeholder-[#F4EBE1]/30 focus:border-[#C9A46B] focus:outline-none transition-colors resize-none"
                    rows={3}
                  />
                )}
              </section>

            </div>

            {/* Order Summary Sidebar */}
            <div className="bg-[#2B1E16] p-6 h-fit sticky top-24">
              <h3 className="font-serif text-lg text-[#F4EBE1] mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                {items.map((item) => {
                  // Derive slug from name or could use mockProducts if imported
                  const slug = item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                  
                  return (
                  <div key={item.id} className="flex gap-4">
                    <Link href={`/products/${slug}`} className="w-16 h-16 bg-[#1B0F0A] flex-shrink-0 overflow-hidden block group">
                      <div className="w-full h-full overflow-hidden bg-[#231008]" style={{ borderRadius: 'inherit' }}>
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      </div>
                    </Link>
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <Link href={`/products/${slug}`} className="block">
                        <p className="text-sm text-[#F4EBE1] hover:text-[#C9A46B] transition-colors truncate">{item.name}</p>
                      </Link>
                      <p className="text-xs text-[#F4EBE1]/40 mt-1">Qty: {item.quantity}</p>
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="text-sm text-[#C9A46B]">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  </div>
                )})}
              </div>
              
              <div className="space-y-3 pt-6 border-t border-[#C9A46B]/10">
                <div className="flex justify-between text-sm">
                  <span className="text-[#F4EBE1]/60">Subtotal</span>
                  <span className="text-[#F4EBE1]">{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#F4EBE1]/60">GST (18%)</span>
                  <span className="text-[#F4EBE1]">{formatPrice(gstAmount)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#F4EBE1]/60">Shipping</span>
                  <span className="text-[#F4EBE1]">{shippingCost === 0 ? "Free" : formatPrice(shippingCost)}</span>
                </div>
                {form.giftWrap && (
                  <div className="flex justify-between text-sm">
                    <span className="text-[#F4EBE1]/60">Gift wrap</span>
                    <span className="text-[#F4EBE1]">{formatPrice(250)}</span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-between pt-6 border-t border-[#C9A46B]/10 mt-6 mb-8">
                <span className="text-base text-[#F4EBE1]">Total</span>
                <span className="font-serif italic text-2xl text-[#C9A46B]">
                  {formatPrice(finalTotal)}
                </span>
              </div>

              <button
                onClick={handleWhatsAppCheckout}
                className="w-full py-4 bg-[#C9A46B] text-[#1B0F0A] flex items-center justify-center gap-2 text-xs uppercase tracking-[0.08em] font-medium hover:bg-[#F4EBE1] active:scale-[0.97] transition-all duration-150 ease-out"
              >
                <Send size={16} />
                Send Order via WhatsApp
              </button>
              
              <p className="text-center text-[#F4EBE1]/40 text-xs mt-4">
                You will review the order on WhatsApp before sending.
              </p>
            </div>
            
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
