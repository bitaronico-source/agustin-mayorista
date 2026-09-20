import type { Metadata } from "next";
import { Catalog } from "@/components/Catalog";
import { getProducts, getProductCategories } from "@/lib/products";

export const metadata: Metadata = {
  title: "Catálogo",
  description:
    "Explorá el catálogo mayorista de Agustín Mayorista: buscá productos, filtrá por categoría y ordená por precio. Envíos a todo Uruguay.",
};

export const dynamic = "force-dynamic";

export default async function CatalogoPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string; q?: string }>;
}) {
  const sp = await searchParams;
  const [products, categories] = await Promise.all([
    getProducts(),
    getProductCategories(),
  ]);
  return (
    <>
      <Catalog
        products={products}
        categories={categories}
        initialCategory={sp.categoria}
        initialQuery={sp.q}
      />
    </>
  );
}