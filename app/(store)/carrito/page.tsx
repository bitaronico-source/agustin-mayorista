import type { Metadata } from "next";
import { CheckoutForm } from "@/components/CheckoutForm";

export const metadata: Metadata = {
  title: "Carrito",
  description:
    "Revisá tu carrito y enviá tu pedido mayorista por WhatsApp con Agustín Mayorista.",
};

export default function CarritoPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="mb-10">
        <p className="text-[12px] font-bold uppercase tracking-[0.35em] text-gold-400">
          Checkout
        </p>
        <h1 className="mt-2 font-display text-4xl font-bold uppercase tracking-tight text-white sm:text-5xl">
          Finalizar <span className="text-gold-400">pedido</span>
        </h1>
        <p className="mt-3 max-w-2xl text-white/50">
          Revisá tu pedido, completá tus datos y envialo por WhatsApp. Te
          confirmamos stock, factura y entrega.
        </p>
      </div>
      <CheckoutForm />
    </section>
  );
}