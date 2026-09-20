import { AdminProductList } from "@/components/admin/AdminProductList";
import { getProducts } from "@/lib/products";
import { isSupabaseConfigured } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function AdminProductosPage() {
  const products = await getProducts();
  return <AdminProductList products={products} demoMode={!isSupabaseConfigured} />;
}