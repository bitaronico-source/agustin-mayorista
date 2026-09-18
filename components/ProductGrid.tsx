import type { Product } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/10 bg-navy-900/50 px-6 py-16 text-center">
        <p className="font-display text-xl font-bold uppercase tracking-wide text-white/70">
          Sin resultados
        </p>
        <p className="mt-2 text-sm text-white/40">
          Probá con otra búsqueda o cambiá los filtros.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}