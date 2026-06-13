import { useState, useEffect } from "react";
import { MapPin, Phone, Clock, Mail, Check } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { trpc } from "@/providers/trpc";
import { toast } from "sonner";

const stores = [
  {
    name: "Hyderabad Chocolate Store",
    address: "Road No. 12, Banjara Hills, Hyderabad, Telangana 500034",
    phone: "+91 98491 12345",
    hours: "Daily 11:00 - 21:00",
  },
  {
    name: "Bengaluru Chocolate Store",
    address: "100 Feet Road, Indiranagar, Bengaluru, Karnataka 560038",
    phone: "+91 98441 23456",
    hours: "Daily 11:00 - 21:00",
  },
  {
    name: "Mumbai Chocolate Store",
    address: "Linking Road, Bandra West, Mumbai, Maharashtra 400050",
    phone: "+91 98201 34567",
    hours: "Daily 11:00 - 21:00",
  },
  {
    name: "Chennai Chocolate Store",
    address: "Khader Nawaz Khan Road, Nungambakkam, Chennai, Tamil Nadu 600006",
    phone: "+91 98401 45678",
    hours: "Daily 11:00 - 21:00",
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", type: "other" as const, message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<"store" | "farm">("store");
  const createMessage = trpc.message.create.useMutation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createMessage.mutateAsync({
        name: form.name,
        email: form.email,
        phone: form.phone || undefined,
        type: form.type,
        message: form.message,
      });
      setSubmitted(true);
      toast.success("Message sent! We'll get back to you soon.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const inquiryTypes = [
    { value: "gift", label: "Gift Inquiry" },
    { value: "chef", label: "Chef / Restaurant" },
    { value: "wholesale", label: "Wholesale" },
    { value: "other", label: "Other" },
  ];

  return (
    <div className="bg-[#1B0F0A] min-h-screen">
      <Navbar />
      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="max-w-6xl mx-auto px-6 mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#1B0F0A]/55 border border-[#C9A46B]/30 text-[#C9A46B] text-[10px] uppercase tracking-[0.18em] font-medium mb-4">
            Visit
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#F4EBE1] mb-4">Get in Touch</h1>
          <p className="text-base text-[#F4EBE1]/50 max-w-lg font-light">
            We'd love to hear from you. Whether you're planning a visit, placing a wholesale order, or just want to say hello.
          </p>
        </section>

        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
            {/* Left - Dual Mode: Store Locator & Farm Visit */}
            <div className="flex flex-col h-full">
              {/* Toggle UI */}
              <div className="flex p-1 bg-[#2B1E16] rounded-full mb-8 border border-[#C9A46B]/10">
                <button
                  type="button"
                  onClick={() => setActiveTab("store")}
                  className={`flex-1 py-2 text-center text-xs uppercase tracking-[0.08em] font-medium rounded-full transition-all duration-300 ${
                    activeTab === "store"
                      ? "bg-[#C9A46B] text-[#1B0F0A]"
                      : "text-[#F4EBE1]/60 hover:text-[#F4EBE1]"
                  }`}
                >
                  Find a Store
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("farm")}
                  className={`flex-1 py-2 text-center text-xs uppercase tracking-[0.08em] font-medium rounded-full transition-all duration-300 ${
                    activeTab === "farm"
                      ? "bg-[#C9A46B] text-[#1B0F0A]"
                      : "text-[#F4EBE1]/60 hover:text-[#F4EBE1]"
                  }`}
                >
                  Visit the Farm
                </button>
              </div>

              {activeTab === "store" ? (
                /* Find a Store Tab */
                <div className="grid sm:grid-cols-2 gap-4">
                  {stores.map((store) => (
                    <div key={store.name} className="bg-[#2B1E16] p-5 border border-[#C9A46B]/15 flex flex-col justify-between hover:border-[#C9A46B]/40 transition-colors">
                      <div>
                        <h3 className="font-serif text-lg text-[#F4EBE1] mb-2">{store.name}</h3>
                        <p className="text-xs text-[#F4EBE1]/60 leading-relaxed font-light mb-3 min-h-[3rem]">
                          {store.address}
                        </p>
                        <div className="space-y-1 mb-4 text-xs font-light text-[#F4EBE1]/40">
                          <p className="flex items-center gap-1.5">
                            <span className="text-[#C9A46B] font-medium">Tel:</span> {store.phone}
                          </p>
                          <p className="flex items-center gap-1.5">
                            <span className="text-[#C9A46B] font-medium">Open:</span> {store.hours}
                          </p>
                        </div>
                      </div>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.name + ", " + store.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2 bg-[#1B0F0A] border border-[#C9A46B]/30 hover:border-[#C9A46B] hover:bg-[#C9A46B] hover:text-[#1B0F0A] text-center text-[10px] uppercase tracking-[0.08em] font-medium text-[#C9A46B] transition-colors"
                      >
                        Get Directions
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                /* Visit the Farm Tab */
                <div className="space-y-6">
                  <div className="aspect-[16/9] w-full overflow-hidden border border-[#C9A46B]/15">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125796.8856758414!2d76.99307775!3d9.84589255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b07e2c9fe871f3b%3A0x6b9d6a36f616ef42!2sIdukki%2C%20Kerala!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ border: 0, filter: "grayscale(1) contrast(1.1) invert(0.9)" }}
                      allowFullScreen={false}
                      loading="lazy"
                      title="Google Maps Location of Myth Cocoa Farm in Idukki, Kerala"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex items-start gap-3">
                      <MapPin size={18} className="text-[#C9A46B] mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="text-xs uppercase tracking-[0.14em] text-[#C9A46B] mb-1 font-medium">Farm Address</h4>
                        <p className="text-sm text-[#F4EBE1]/60 font-light">Idukki District<br />Kerala, India<br />Pin — 685 612</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone size={18} className="text-[#C9A46B] mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="text-xs uppercase tracking-[0.14em] text-[#C9A46B] mb-1 font-medium">Phone</h4>
                        <p className="text-sm text-[#F4EBE1]/60 font-light">+91 70751 4788</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock size={18} className="text-[#C9A46B] mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="text-xs uppercase tracking-[0.14em] text-[#C9A46B] mb-1 font-medium">Visiting Hours</h4>
                        <p className="text-sm text-[#F4EBE1]/60 font-light">Thu-Sun<br />10:00 - 17:00</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail size={18} className="text-[#C9A46B] mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="text-xs uppercase tracking-[0.14em] text-[#C9A46B] mb-1 font-medium">Email</h4>
                        <p className="text-sm text-[#F4EBE1]/60 font-light">hello@mythcocoa.in</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right - Form */}
            <div>
              {submitted ? (
                <div className="bg-[#2B1E16] p-8 text-center">
                  <div className="w-12 h-12 bg-[#C9A46B] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check size={24} className="text-[#1B0F0A]" />
                  </div>
                  <h3 className="font-serif text-2xl text-[#F4EBE1] mb-2">Message Sent</h3>
                  <p className="text-sm text-[#F4EBE1]/60 font-light">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="font-serif text-2xl text-[#F4EBE1] mb-6">Send a Message</h3>
                  <input
                    type="text"
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="w-full bg-[#2B1E16] border border-[#C9A46B]/20 px-4 py-3 text-sm text-[#F4EBE1] placeholder-[#F4EBE1]/30 focus:border-[#C9A46B] focus:outline-none transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    className="w-full bg-[#2B1E16] border border-[#C9A46B]/20 px-4 py-3 text-sm text-[#F4EBE1] placeholder-[#F4EBE1]/30 focus:border-[#C9A46B] focus:outline-none transition-colors"
                  />
                  <input
                    type="tel"
                    placeholder="Phone (optional)"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-[#2B1E16] border border-[#C9A46B]/20 px-4 py-3 text-sm text-[#F4EBE1] placeholder-[#F4EBE1]/30 focus:border-[#C9A46B] focus:outline-none transition-colors"
                  />
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value as typeof form.type })}
                    className="w-full bg-[#2B1E16] border border-[#C9A46B]/20 px-4 py-3 text-sm text-[#F4EBE1]/60 focus:border-[#C9A46B] focus:outline-none transition-colors"
                  >
                    {inquiryTypes.map((t) => (
                      <option key={t.value} value={t.value} className="bg-[#2B1E16]">
                        {t.label}
                      </option>
                    ))}
                  </select>
                  <textarea
                    placeholder="Your message"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    rows={5}
                    className="w-full bg-[#2B1E16] border border-[#C9A46B]/20 px-4 py-3 text-sm text-[#F4EBE1] placeholder-[#F4EBE1]/30 focus:border-[#C9A46B] focus:outline-none transition-colors resize-none"
                  />
                  <button
                    type="submit"
                    disabled={createMessage.isPending}
                    className="w-full py-3 bg-[#C9A46B] text-[#1B0F0A] text-xs uppercase tracking-[0.08em] font-medium hover:bg-[#F4EBE1] transition-colors disabled:opacity-50"
                  >
                    {createMessage.isPending ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}

              {/* WhatsApp CTA */}
              <div className="mt-8 p-6 bg-[#25D366]/10 border border-[#25D366]/20 text-center">
                <p className="text-sm text-[#F4EBE1]/60 mb-4 font-light">Prefer to chat?</p>
                <a
                  href="https://wa.me/91707514788?text=Hi%20Myth%20Cocoa%2C%20I%27d%20like%20to%20learn%20more%20about%20your%20chocolates"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white text-xs uppercase tracking-[0.08em] font-medium hover:bg-[#128C7E] transition-colors animate-pulse-glow"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Contact us on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
