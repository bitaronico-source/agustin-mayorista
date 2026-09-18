"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  X,
  Minus,
  Plus,
  Trash2,
  ShoppingCart,
  ArrowRight,
  Truck,
  CheckCircle2,
} from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatMoney } from "@/lib/format";
import { SITE } from "@/lib/site";
import Image from "next/image";

export function CartDrawer() {
  const router = useRouter();
  const { items, subtotal, isOpen, closeCart, setQty, remove, toast, openCart } = useCart();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const freeProgress = Math.min(subtotal / SITE.freeShippingFrom, 1);

  return (
    <>
      <div
        onClick={closeCart}
        className={`fixed inset-0 z-[70] bg-navy-950/80 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        className={`fixed right-0 top-0 z-[80] flex h-full w-full max-w-md flex-col bg-navy-900 shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <h2 className="flex items-center gap-2 font-display text-lg font-bold tracking-wide text-white">
            <ShoppingCart className="h-5 w-5 text-gold-400" />
            TU CARRITO
          </h2>
          <button
            onClick={closeCart}
            className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-white/70 transition hover:text-white"
            aria-label="Cerrar carrito"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <span className="grid h-20 w-20 place-items-center rounded-full bg-white/5">
              <ShoppingCart className="h-9 w-9 text-white/30" />
            </span>
            <p className="text-lg font-semibold text-white">Tu carrito está vacío</p>
            <p className="text-sm text-white/50">
              Explorá el catálogo y agregá productos mayoristas para armar tu pedido.
            </p>
            <button
              onClick={() => {
                closeCart();
                router.push("/catalogo");
              }}
              className="mt-2 flex items-center gap-2 rounded-lg bg-gold-500 px-5 py-3 font-bold text-navy-950 transition hover:bg-gold-400"
            >
              VER CATÁLOGO <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <>
            <div className="h-1.5 w-full bg-white/5">
              <div
                className="h-full bg-gold-500 transition-all duration-500"
                style={{ width: `${freeProgress * 100}%` }}
              />
            </div>
            <div className="px-5 pb-3 pt-2 text-[13px] text-white/60">
              {subtotal >= SITE.freeShippingFrom ? (
                <span className="flex items-center gap-2 font-semibold text-gold-400">
                  <CheckCircle2 className="h-4 w-4" /> ¡Tenés envío gratis!
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-gold-400" />
                  Te faltan <b className="text-white">{formatMoney(SITE.freeShippingFrom - subtotal)}</b> para envío gratis
                </span>
              )}
            </div>

            <div className="flex-1 overflow-y-auto px-5">
              <ul className="divide-y divide-white/5">
                {items.map(({ product, qty }) => (
                  <li key={product.id} className="flex gap-4 py-4">
                    <Link
                      href={`/producto/${product.id}`}
                      onClick={closeCart}
                      className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-white/10"
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/producto/${product.id}`}
                          onClick={closeCart}
                          className="line-clamp-2 text-sm font-semibold text-white hover:text-gold-400"
                        >
                          {product.name}
                        </Link>
                        <button
                          onClick={() => remove(product.id)}
                          className="text-white/40 transition hover:text-red-400"
                          aria-label={`Eliminar ${product.name}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <span className="mt-0.5 text-xs uppercase tracking-wider text-white/40">
                        {product.category}
                      </span>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-3 rounded-lg border border-white/10 px-2 py-1">
                          <button
                            onClick={() => setQty(product.id, qty - 1)}
                            className="text-white/70 transition hover:text-gold-400"
                            aria-label="Menos"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-5 text-center text-sm font-bold text-white">{qty}</span>
                          <button
                            onClick={() => setQty(product.id, qty + 1)}
                            className="text-white/70 transition hover:text-gold-400"
                            aria-label="Más"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <span className="font-extrabold text-gold-400">{formatMoney(product.price * qty)}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-white/10 px-5 py-4">
              <div className="mb-2 flex justify-between text-sm text-white/60">
                <span>Subtotal</span>
                <span className="font-semibold text-white">{formatMoney(subtotal)}</span>
              </div>
              <div className="mb-4 flex items-baseline justify-between">
                <span className="font-display text-base font-bold tracking-wide text-white">TOTAL</span>
                <span className="font-display text-2xl font-bold text-gold-400">{formatMoney(subtotal)}</span>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <button
                  onClick={closeCart}
                  className="flex-1 rounded-lg border border-white/15 px-4 py-3 text-[13px] font-bold tracking-widest text-white transition hover:bg-white/5"
                >
                  SEGUIR COMPRANDO
                </button>
                <Link
                  href="/carrito"
                  onClick={closeCart}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gold-500 px-4 py-3 text-[13px] font-extrabold tracking-widest text-navy-950 transition hover:bg-gold-400"
                >
                  FINALIZAR PEDIDO <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </>
        )}
      </aside>

      <div
        className={`fixed bottom-6 left-1/2 z-[90] -translate-x-1/2 transition-all duration-300 ${
          toast ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <div className="flex items-center gap-3 rounded-xl bg-white px-5 py-3 shadow-gold">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600" />
          <span className="text-sm font-semibold text-navy-950">{toast || ""}</span>
          <button
            onClick={openCart}
            className="ml-2 shrink-0 rounded-lg bg-navy-950 px-3 py-1.5 text-xs font-bold text-gold-400 transition hover:bg-navy-800"
          >
            VER
          </button>
        </div>
      </div>
    </>
  );
}