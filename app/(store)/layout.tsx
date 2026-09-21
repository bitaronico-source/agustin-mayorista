import type { ReactNode } from "react";
import { CartProvider } from "@/lib/cart";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

export default function StoreLayout({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
      <WhatsAppFloat />
    </CartProvider>
  );
}