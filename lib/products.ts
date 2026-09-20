import { cache } from "react";
import type { Product } from "@/lib/data";
import { PRODUCTS } from "@/lib/data";
import { isSupabaseConfigured, supabaseAdmin } from "@/lib/supabase";

const BADGES = ["NUEVO", "OFERTA", "ÚLTIMAS UNIDADES"] as const;

type ProductRow = {
  id: string;
  name: string;
  category: string;
  price: number | string;
  price_minor: number | string | null;
  stock: number | string;
  image: string;
  badge: string | null;
  featured: boolean;
  preorder: boolean;
  description: string;
};

function mapRow(r: ProductRow): Product {
  const badge = BADGES.find((b) => b === r.badge);
  return {
    id: r.id,
    name: r.name,
    category: r.category,
    price: Number(r.price),
    priceMinor: r.price_minor == null ? undefined : Number(r.price_minor),
    stock: Number(r.stock),
    image: r.image,
    badge,
    featured: r.featured,
    preorder: r.preorder,
    description: r.description,
  };
}

export const getProducts = cache(async (): Promise<Product[]> => {
  if (!isSupabaseConfigured) return PRODUCTS;
  const { data, error } = await supabaseAdmin()
    .from("products")
    .select("*")
    .order("name");
  if (error || !data) {
    if (process.env.NODE_ENV === "development") {
      console.error("[products] Supabase error:", error?.message);
    }
    return PRODUCTS;
  }
  return data.map((r) => mapRow(r as unknown as ProductRow));
});

export const getProductData = cache(
  async (id: string): Promise<Product | undefined> => {
    if (!isSupabaseConfigured) return PRODUCTS.find((p) => p.id === id);
    const { data, error } = await supabaseAdmin()
      .from("products")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (error || !data) return undefined;
    return mapRow(data as unknown as ProductRow);
  }
);

export const getFeaturedProducts = cache(async (): Promise<Product[]> => {
  const all = await getProducts();
  const featured = all.filter((p) => p.featured);
  return featured.length > 0 ? featured : all.slice(0, 8);
});

export const getProductCategories = cache(async (): Promise<string[]> => {
  const all = await getProducts();
  const set = new Set(all.map((p) => p.category));
  return Array.from(set);
});