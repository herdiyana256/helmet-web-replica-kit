import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/contexts/CartContext";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hideki Helmets - Premium Helmets & Accessories",
  description: "Toko helm dan aksesoris motor terpercaya dengan koleksi lengkap dari berbagai brand ternama. Jaminan kualitas dan keamanan terbaik untuk berkendara Anda.",
  keywords: "helm motor, helmet, KYT, AGV, Arai, Shoei, INK, NHK, aksesoris motor, jaket touring",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${geist.variable} ${geistMono.variable} antialiased bg-white text-hideki-black-900`}
      >
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
