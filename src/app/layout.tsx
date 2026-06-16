import type { Metadata, Viewport } from "next";
import { Providers } from "./providers";
import "../index.css";

export const metadata: Metadata = {
  title: "Myth Cocoa | Single-Origin Artisan Chocolate",
  description: "Myth Cocoa - Single-origin artisan chocolate crafted in small batches from rare cacao beans. Bean to bar, farm to table.",
  keywords: "artisan chocolate, single origin, cacao, bean to bar, luxury chocolate, craft chocolate",
  openGraph: {
    title: "Myth Cocoa - Single-Origin Artisan Chocolate",
    description: "From rare pods. For rare moments. Premium bean-to-bar chocolate crafted in small batches.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#1B0F0A",
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" href="/images/process-roast.jpg" as="image" type="image/jpeg" />
      </head>
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
