"use client";

import Link from "next/link";
import Image from "next/image";
import { Plus, Check, PackageCheck, Wrench } from "lucide-react";
import type { Product } from "@/lib/data";
import { useCart } from "@/lib/cart";
import { formatMoney } from "@/lib/format";
import { useState } from "react";

const BADGE_STYLES: Record<string, string> = {
  NUEVO: "bg-gold-500 text-navy-950",
  OFERTA: "bg-red-500 text-white",
  "ÚLTIMAS UNIDADES": "bg-white text-navy-950",
};

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    add(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  const lowStock = product.stock >= 0 && product.stock <= 12;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/5 bg-navy-900 transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/40 hover:shadow-card">
      {product.badge && (
        <span
          className={`absolute left-3 top-3 z-10 rounded-lg px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-widest ${BADGE_STYLES[product.badge]}`}
        >
          {product.badge}
        </span>
      )}

      <Link
        href={`/producto/${product.id}`}
        className="relative block h-56 w-full overflow-hidden bg-navy-800"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 320px, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent opacity-0 transition group-hover:opacity-100" />
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">
            {product.category}
          </span>
          {lowStock ? (
            <span className="flex items-center gap-1 rounded-md bg-red-500/15 px-2 py-0.5 text-[10px] font-bold text-red-400">
              <PackageCheck className="h-3 w-3" /> BAJO STOCK
            </span>
          ) : (
            <span className="flex items-center gap-1 rounded-md bg-gold-500/10 px-2 py-0.5 text-[10px] font-bold text-gold-400">
              <PackageCheck className="h-3 w-3" /> {product.stock} UN.
            </span>
          )}
        </div>

        <Link
          href={`/producto/${product.id}`}
          className="mt-2 line-clamp-2 min-h-[2.6rem] text-sm font-semibold leading-snug text-white transition hover:text-gold-400"
        >
          {product.name}
        </Link>

        <div className="mt-auto pt-3">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/40">Precio mayorista</p>
              <p className="font-display text-2xl font-bold text-gold-400">{formatMoney(product.price)}</p>
            </div>
            <span className="mb-1 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-white/40">
              <Wrench className="h-3 w-3" /> x unidad
            </span>
          </div>

          <button
            onClick={handleAdd}
            className={`mt-3 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-[12px] font-extrabold uppercase tracking-widest transition-all ${
              added
                ? "bg-green-500 text-white"
                : "bg-gold-500 text-navy-950 hover:bg-gold-400"
            }`}
          >
            {added ? (
              <>
                <Check className="h-4 w-4" /> Agregado
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" /> Agregar al carrito
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}