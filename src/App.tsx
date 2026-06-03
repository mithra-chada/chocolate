import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Farm from "./pages/Farm";
import Story from "./pages/Story";
import Journal from "./pages/Journal";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { CartDrawer } from "./components/CartDrawer";
import { Toaster } from "@/components/ui/sonner";
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const lenis = new Lenis();

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(raf);
    };
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:slug" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/farm" element={<Farm />} />
        <Route path="/story" element={<Story />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/journal/:slug" element={<BlogPost />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <CartDrawer />
      <Toaster position="bottom-right" />
    </>
  );
}
