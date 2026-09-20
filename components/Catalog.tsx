"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, ArrowDownWideNarrow } from "lucide-react";
import type { Product } from "@/lib/data";
import { ProductGrid } from "@/components/ProductGrid";

type Sort = "relevancia" | "price-asc" | "price-desc" | "novedades";

export function Catalog({
  products,
  categories,
  initialCategory,
  initialQuery,
}: {
  products: Product[];
  categories: string[];
  initialCategory?: string;
  initialQuery?: string;
}) {
  const [query, setQuery] = useState(initialQuery ?? "");
  const [category, setCategory] = useState(initialCategory ?? "TODOS");
  const [sort, setSort] = useState<Sort>("relevancia");

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      const matchesQ =
        !query ||
        `${p.name} ${p.category} ${p.description}`
          .toLowerCase()
          .includes(query.toLowerCase());
      const matchesCat = category === "TODOS" || p.category === category;
      return matchesQ && matchesCat;
    });

    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "novedades")
      list = [...list].sort(
        (a, b) => Number(b.badge === "NUEVO") - Number(a.badge === "NUEVO")
      );
    return list;
  }, [products, query, category, sort]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
        <div>
          <p className="text-[12px] font-bold uppercase tracking-[0.35em] text-gold-400">
            Catálogo
          </p>
          <h1 className="mt-2 font-display text-4xl font-bold uppercase tracking-tight text-white sm:text-5xl">
            Productos <span className="text-gold-400">destacados</span>
          </h1>
          <p className="mt-3 max-w-xl text-white/50">
            Buscá por rubro, filtrá por categoría y ordená por precio. Todo con
            precios mayoristas y stock permanente.
          </p>
        </div>

        <div className="w-full max-w-md">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscá productos por nombre o rubro..."
              className="h-13 w-full rounded-xl border border-white/10 bg-navy-900 py-3.5 pl-12 pr-4 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-gold-500/60"
            />
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-white/40">
          <SlidersHorizontal className="h-4 w-4" /> Categorías
        </span>
        <div className="no-scrollbar flex flex-1 gap-2 overflow-x-auto">
          {["TODOS", ...categories].map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`shrink-0 rounded-lg px-4 py-2 text-[12px] font-bold uppercase tracking-wider transition ${
                category === c
                  ? "bg-gold-500 text-navy-950"
                  : "border border-white/10 bg-navy-900 text-white/60 hover:text-white"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="relative ml-auto">
          <ArrowDownWideNarrow className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="h-10 appearance-none rounded-lg border border-white/10 bg-navy-900 pl-10 pr-9 text-[12px] font-bold uppercase tracking-wider text-white/80 outline-none focus:border-gold-500/60 [&>option]:bg-navy-900"
            aria-label="Ordenar productos"
          >
            <option value="relevancia">Relevancia</option>
            <option value="price-asc">Precio: menor a mayor</option>
            <option value="price-desc">Precio: mayor a menor</option>
            <option value="novedades">Novedades</option>
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/40">▾</span>
        </div>
      </div>

      <div className="mt-8">
        <p className="mb-4 text-sm text-white/40">
          {filtered.length} {filtered.length === 1 ? "producto" : "productos"}
        </p>
        <ProductGrid products={filtered} />
      </div>
    </section>
  );
}