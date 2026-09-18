"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingCart, Check } from "lucide-react";
import type { Product } from "@/lib/data";
import { useCart } from "@/lib/cart";

export function AddToCartButton({ product }: { product: Product }) {
  const { add, openCart } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    add(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <span className="text-[11px] font-bold uppercase tracking-widest text-white/40">
          Cantidad
        </span>
        <div className="flex items-center gap-4 rounded-xl border border-white/10 px-3 py-2">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="text-white/70 transition hover:text-gold-400"
            aria-label="Menos"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-6 text-center font-bold text-white">{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            className="text-white/70 transition hover:text-gold-400"
            aria-label="Más"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          onClick={handleAdd}
          className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-3.5 text-[13px] font-extrabold uppercase tracking-widest transition-all ${
            added
              ? "bg-green-500 text-white"
              : "bg-gold-500 text-navy-950 hover:bg-gold-400"
          }`}
        >
          {added ? (
            <>
              <Check className="h-5 w-5" /> Agregado
            </>
          ) : (
            <>
              <ShoppingCart className="h-5 w-5" /> Agregar al carrito
            </>
          )}
        </button>
        <button
          onClick={() => {
            add(product, qty);
            openCart();
          }}
          className="group flex items-center justify-center gap-2 rounded-xl border border-gold-500/40 px-5 py-3.5 text-[13px] font-extrabold uppercase tracking-widest text-gold-400 transition hover:bg-gold-500 hover:text-navy-950"
        >
          Comprar ahora
        </button>
      </div>
    </div>
  );
}