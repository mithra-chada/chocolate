"use client";

import { Suspense } from "react";
import Products from "@/views/Products";

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#1B0F0A]" />}>
      <Products />
    </Suspense>
  );
}
