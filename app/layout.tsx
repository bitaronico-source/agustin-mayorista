import type { Metadata, Viewport } from "next";
import { Inter, Oswald, Caveat } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AGUSTÍN MAYORISTA — Todo lo que tu negocio necesita, en un solo lugar",
    template: "%s · AGUSTÍN MAYORISTA",
  },
  description:
    "Mayorista en Uruguay con precios de fábrica: ropa, bazar, velas, cotillón, hogar, jardinería, herramientas y mucho más. Envíos a todo el país.",
  keywords: [
    "mayorista uruguay",
    "venta al por mayor",
    "revendedores",
    "productos mayoristas montevideo",
    "bazar hogar herramientas",
  ],
  icons: {
    icon: "/icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#05080f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="es-UY"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${oswald.variable} ${caveat.variable}`}
    >
      <body className="min-h-screen bg-navy-950 text-white antialiased">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}