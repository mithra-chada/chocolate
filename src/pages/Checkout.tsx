import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Check, IceCreamCone, ArrowLeft, CreditCard } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { useCartStore } from "@/store/cartStore";
import { trpc } from "@/providers/trpc";
import { toast } from "sonner";
import { formatPrice } from "@/lib/utils";

const steps = ["Contact", "Shipping", "Payment", "Review"];

export default function Checkout() {
  const navigate = useNavigate();
  const { items, getTotal, clearCart, sessionId } = useCartStore();
  const createOrder = trpc.order.create.useMutation();
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    shippingMethod: "standard",
    giftWrap: false,
    giftMessage: "",
  });

  const total = getTotal();
  const shippingCost = form.shippingMethod === "express" ? 750 : total >= 5000 ? 0 : 400;
  const giftWrapCost = form.giftWrap ? 250 : 0;
  const finalTotal = total + shippingCost + giftWrapCost;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (items.length === 0 && !isComplete) {
      navigate("/cart");
    }
  }, [items, isComplete, navigate]);

  const updateForm = (key: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    try {
      const result = await createOrder.mutateAsync({
        sessionId: sessionId || "guest",
        customerName: form.name,
        customerEmail: form.email,
        customerPhone: form.phone,
        shippingAddress: `${form.address}, ${form.city}, ${form.postalCode}, ${form.country}`,
        shippingMethod: form.shippingMethod,
        items: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
          productName: item.name,
          variant: item.variant,
        })),
        subtotal: total,
        shippingCost,
        total: finalTotal,
        giftWrap: form.giftWrap,
        giftMessage: form.giftMessage || undefined,
      });

      if (result.success) {
        setOrderNumber(result.orderNumber);
        setIsComplete(true);
        clearCart();
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  if (isComplete) {
    return (
      <div className="bg-[#1B0F0A] min-h-screen flex items-center justify-center">
        <div className="text-center px-6">
          <div className="w-16 h-16 bg-[#C9A46B] rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={32} className="text-[#1B0F0A]" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-[#F4EBE1] mb-4">Thank you for your order</h1>
          <p className="text-base text-[#F4EBE1]/60 mb-2 font-light">
            Your order number is <span className="text-[#C9A46B] font-serif italic">{orderNumber}</span>
          </p>
          <p className="text-sm text-[#F4EBE1]/40 mb-8 font-light">
            We'll send a confirmation email shortly.
          </p>
          <button
            onClick={() => navigate("/products")}
            className="px-8 py-3 bg-[#C9A46B] text-[#1B0F0A] text-xs uppercase tracking-[0.08em] font-medium hover:bg-[#F4EBE1] transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1B0F0A] min-h-screen">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Back + Title */}
          <button
            onClick={() => navigate("/cart")}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.08em] text-[#F4EBE1]/50 hover:text-[#C9A46B] transition-colors mb-8"
          >
            <ArrowLeft size={14} />
            Back to cart
          </button>
          <h1 className="font-serif text-4xl text-[#F4EBE1] mb-8">Checkout</h1>

          {/* Progress */}
          <div className="flex items-center gap-2 mb-12">
            {steps.map((step, i) => (
              <div key={step} className="flex items-center gap-2 flex-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                    i <= currentStep ? "bg-[#C9A46B] text-[#1B0F0A]" : "bg-[#2B1E16] text-[#F4EBE1]/40"
                  }`}
                >
                  {i < currentStep ? <Check size={14} /> : i + 1}
                </div>
                <span className={`text-xs uppercase tracking-[0.08em] hidden sm:block ${i <= currentStep ? "text-[#C9A46B]" : "text-[#F4EBE1]/40"}`}>
                  {step}
                </span>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-px ${i < currentStep ? "bg-[#C9A46B]" : "bg-[#2B1E16]"}`} />
                )}
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-[1fr_300px] gap-8">
            {/* Form */}
            <div>
              {currentStep === 0 && (
                <div className="space-y-4">
                  <h2 className="font-serif text-2xl text-[#F4EBE1] mb-6">Contact Information</h2>
                  <input
                    type="text"
                    placeholder="Full name"
                    value={form.name}
                    onChange={(e) => updateForm("name", e.target.value)}
                    className="w-full bg-[#2B1E16] border border-[#C9A46B]/20 px-4 py-3 text-sm text-[#F4EBE1] placeholder-[#F4EBE1]/30 focus:border-[#C9A46B] focus:outline-none transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => updateForm("email", e.target.value)}
                    className="w-full bg-[#2B1E16] border border-[#C9A46B]/20 px-4 py-3 text-sm text-[#F4EBE1] placeholder-[#F4EBE1]/30 focus:border-[#C9A46B] focus:outline-none transition-colors"
                  />
                  <input
                    type="tel"
                    placeholder="Phone (optional)"
                    value={form.phone}
                    onChange={(e) => updateForm("phone", e.target.value)}
                    className="w-full bg-[#2B1E16] border border-[#C9A46B]/20 px-4 py-3 text-sm text-[#F4EBE1] placeholder-[#F4EBE1]/30 focus:border-[#C9A46B] focus:outline-none transition-colors"
                  />
                </div>
              )}

              {currentStep === 1 && (
                <div className="space-y-4">
                  <h2 className="font-serif text-2xl text-[#F4EBE1] mb-6">Shipping Address</h2>
                  <input
                    type="text"
                    placeholder="Address"
                    value={form.address}
                    onChange={(e) => updateForm("address", e.target.value)}
                    className="w-full bg-[#2B1E16] border border-[#C9A46B]/20 px-4 py-3 text-sm text-[#F4EBE1] placeholder-[#F4EBE1]/30 focus:border-[#C9A46B] focus:outline-none transition-colors"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="City"
                      value={form.city}
                      onChange={(e) => updateForm("city", e.target.value)}
                      className="w-full bg-[#2B1E16] border border-[#C9A46B]/20 px-4 py-3 text-sm text-[#F4EBE1] placeholder-[#F4EBE1]/30 focus:border-[#C9A46B] focus:outline-none transition-colors"
                    />
                    <input
                      type="text"
                      placeholder="Postal code"
                      value={form.postalCode}
                      onChange={(e) => updateForm("postalCode", e.target.value)}
                      className="w-full bg-[#2B1E16] border border-[#C9A46B]/20 px-4 py-3 text-sm text-[#F4EBE1] placeholder-[#F4EBE1]/30 focus:border-[#C9A46B] focus:outline-none transition-colors"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Country"
                    value={form.country}
                    onChange={(e) => updateForm("country", e.target.value)}
                    className="w-full bg-[#2B1E16] border border-[#C9A46B]/20 px-4 py-3 text-sm text-[#F4EBE1] placeholder-[#F4EBE1]/30 focus:border-[#C9A46B] focus:outline-none transition-colors"
                  />
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
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

                  {/* Gift Options */}
                  <div className="mt-8 pt-6 border-t border-[#C9A46B]/10">
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
                        className="w-full mt-3 bg-[#2B1E16] border border-[#C9A46B]/20 px-4 py-3 text-sm text-[#F4EBE1] placeholder-[#F4EBE1]/30 focus:border-[#C9A46B] focus:outline-none transition-colors resize-none"
                        rows={3}
                      />
                    )}
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="font-serif text-2xl text-[#F4EBE1] mb-6">Review Order</h2>
                  <div className="space-y-4">
                    <div className="bg-[#2B1E16] p-4">
                      <h4 className="text-xs uppercase tracking-[0.14em] text-[#C9A46B] mb-2 font-medium">Contact</h4>
                      <p className="text-sm text-[#F4EBE1]/70">{form.name}</p>
                      <p className="text-sm text-[#F4EBE1]/70">{form.email}</p>
                      {form.phone && <p className="text-sm text-[#F4EBE1]/70">{form.phone}</p>}
                    </div>
                    <div className="bg-[#2B1E16] p-4">
                      <h4 className="text-xs uppercase tracking-[0.14em] text-[#C9A46B] mb-2 font-medium">Shipping</h4>
                      <p className="text-sm text-[#F4EBE1]/70">{form.address}</p>
                      <p className="text-sm text-[#F4EBE1]/70">{form.city}, {form.postalCode}</p>
                      <p className="text-sm text-[#F4EBE1]/70">{form.country}</p>
                      <p className="text-sm text-[#C9A46B] mt-2 capitalize">{form.shippingMethod} shipping</p>
                    </div>
                    {form.giftWrap && (
                      <div className="bg-[#2B1E16] p-4">
                        <h4 className="text-xs uppercase tracking-[0.14em] text-[#C9A46B] mb-2 font-medium">Gift Message</h4>
                        <p className="text-sm text-[#F4EBE1]/70 italic">{form.giftMessage || "No message"}</p>
                      </div>
                    )}
                  </div>

                  <div className="bg-[#2B1E16] p-4">
                    <h4 className="text-xs uppercase tracking-[0.14em] text-[#C9A46B] mb-3 font-medium">Payment</h4>
                    <div className="flex items-center gap-3 text-sm text-[#F4EBE1]/60">
                      <CreditCard size={18} />
                      <span>Secure payment processing</span>
                    </div>
                    <p className="text-xs text-[#F4EBE1]/40 mt-2">
                      Your payment information is processed securely. We do not store credit card details.
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex gap-4 mt-8">
                {currentStep > 0 && (
                  <button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="px-6 py-3 border border-[#C9A46B]/30 text-[#F4EBE1]/70 text-xs uppercase tracking-[0.08em] hover:border-[#C9A46B] hover:text-[#C9A46B] transition-colors"
                  >
                    Back
                  </button>
                )}
                {currentStep < 3 ? (
                  <button
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="flex-1 py-3 bg-[#C9A46B] text-[#1B0F0A] text-xs uppercase tracking-[0.08em] font-medium hover:bg-[#F4EBE1] transition-colors"
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={createOrder.isPending}
                    className="flex-1 py-3 bg-[#C9A46B] text-[#1B0F0A] text-xs uppercase tracking-[0.08em] font-medium hover:bg-[#F4EBE1] transition-colors disabled:opacity-50"
                  >
                    {createOrder.isPending ? "Processing..." : `Place Order — ${formatPrice(finalTotal)}`}
                  </button>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-[#2B1E16] p-6 h-fit">
              <h3 className="font-serif text-lg text-[#F4EBE1] mb-4">Order Summary</h3>
              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-12 h-12 bg-[#1B0F0A] flex-shrink-0 overflow-hidden">
                      <div className="w-full h-full overflow-hidden bg-[#231008]" style={{ borderRadius: 'inherit' }}>
      <img src={item.image} alt={item.name} className="w-full h-full object-cover" onLoad={(e) => e.currentTarget.classList.add('img-loaded')} />
    </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[#F4EBE1] truncate">{item.name}</p>
                      <p className="text-xs text-[#F4EBE1]/40">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm text-[#C9A46B]">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-2 pt-4 border-t border-[#C9A46B]/10">
                <div className="flex justify-between text-sm">
                  <span className="text-[#F4EBE1]/60">Subtotal</span>
                  <span className="text-[#F4EBE1]">{formatPrice(total)}</span>
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
              <div className="flex items-center justify-between pt-4 border-t border-[#C9A46B]/10 mt-4">
                <span className="text-sm text-[#F4EBE1]/60">Total</span>
                <span className="font-serif italic text-2xl text-[#C9A46B]">
                  {formatPrice(finalTotal)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
