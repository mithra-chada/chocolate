"use client";

import { ReactNode, useEffect } from "react";
import { TRPCProvider } from "../providers/trpc";
import { CartDrawer } from "../components/CartDrawer";
import { Toaster } from "@/components/ui/sonner";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

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
    <TRPCProvider>
      {children}
      <CartDrawer />
      <Toaster position="bottom-right" />
    </TRPCProvider>
  );
}
