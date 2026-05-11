import type { Metadata } from "next";
import Script from "next/script";
import "@/styles/globals.css";
import { CartProvider } from "@/components/CartContext";

export const metadata: Metadata = {
  title: "FreshChain | Registration & KYC",
  description: "Platform Pangan Lestari Indonesia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-living-canvas">
        <CartProvider>
          {children}
        </CartProvider>
        {/* Midtrans Snap Sandbox Script */}
        <Script
          src="https://app.sandbox.midtrans.com/snap/snap.js"
          strategy="lazyOnload"
          data-client-key={process.env.MIDTRANS_CLIENT_KEY}
        />
      </body>
    </html>
  );
}
