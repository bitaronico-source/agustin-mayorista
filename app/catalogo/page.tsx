import type { Metadata } from "next";
import { Catalog } from "@/components/Catalog";

export const metadata: Metadata = {
  title: "Catálogo",
  description:
    "Explorá el catálogo mayorista de Agustín Mayorista: buscá productos, filtrá por categoría y ordená por precio. Envíos a todo Uruguay.",
};

export default async function CatalogoPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string; q?: string }>;
}) {
  const sp = await searchParams;
  return (
    <>
      <Catalog
        initialCategory={sp.categoria}
        initialQuery={sp.q}
      />
    </>
  );
}