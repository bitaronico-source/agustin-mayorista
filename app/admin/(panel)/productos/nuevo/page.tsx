import { ProductForm } from "@/components/admin/ProductForm";
import { getProductCategories } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function AdminProductoNuevoPage() {
  const categories = await getProductCategories();
  return <ProductForm isNew categories={categories} />;
}