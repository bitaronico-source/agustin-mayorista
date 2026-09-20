"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { isSupabaseConfigured, storageBucket, storagePublicUrl, supabaseAdmin } from "@/lib/supabase";
import { PLACEHOLDER_IMG } from "@/lib/data";
import { slugify } from "@/lib/slug";

const BADGES = ["NUEVO", "OFERTA", "ÚLTIMAS UNIDADES"] as const;

export type ActionState = { error?: string; ok?: boolean };

function str(fd: FormData, key: string): string {
  const v = fd.get(key);
  return typeof v === "string" ? v.trim() : "";
}

function num(fd: FormData, key: string): number {
  const n = Number(str(fd, key).replace(",", "."));
  return Number.isFinite(n) ? n : 0;
}

function on(fd: FormData, key: string): boolean {
  return fd.get(key) === "on";
}

function revalidateProductPaths() {
  revalidatePath("/");
  revalidatePath("/catalogo");
  revalidatePath("/producto/[id]", "page");
  revalidatePath("/admin");
  revalidatePath("/admin/productos");
}

function badgeValue(v: string) {
  return (BADGES as readonly string[]).includes(v) ? v : null;
}

export async function saveProduct(fd: FormData): Promise<ActionState> {
  try {
    await requireAdmin();
  } catch {
    return { error: "Sesión expirada. Volvé a ingresar al panel." };
  }

  const name = str(fd, "name");
  if (!name) return { error: "El nombre es obligatorio." };
  const category = str(fd, "category") || "GENERAL";
  const price = num(fd, "priceMayor");
  if (price <= 0) return { error: "El precio mayorista debe ser mayor a 0." };

  const existingId = str(fd, "id");
  const id = existingId || slugify(name) || "producto";
  const priceMinorRaw = str(fd, "priceMenor");
  let priceMinor = priceMinorRaw ? num(fd, "priceMenor") : null;
  if (priceMinor != null && priceMinor <= 0) priceMinor = null;
  const stock = Math.max(0, Math.floor(num(fd, "stock")));
  const featured = on(fd, "featured");
  const preorder = on(fd, "preorder");
  const description = str(fd, "description");
  let image = str(fd, "imageUrl") || PLACEHOLDER_IMG;

  if (!isSupabaseConfigured) {
    return { error: "Supabase no está configurado. Agregá SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY en .env para poder guardar." };
  }

  const file = fd.get("imageFile");
  if (file instanceof File && file.size > 0) {
    try {
      const bytes = new Uint8Array(await file.arrayBuffer());
      const ext = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
      const path = `${id}/${Date.now()}.${ext}`;
      const { error: upErr } = await supabaseAdmin()
        .storage.from(storageBucket)
        .upload(path, bytes, { contentType: file.type || "application/octet-stream", upsert: true });
      if (upErr) return { error: `No se pudo subir la imagen: ${upErr.message}` };
      image = storagePublicUrl(path);
    } catch (e) {
      return { error: `Error al procesar la imagen: ${String(e)}` };
    }
  }

  const payload = {
    id,
    name,
    category,
    price,
    price_minor: priceMinor,
    stock,
    image,
    badge: badgeValue(str(fd, "badge")),
    featured,
    preorder,
    description,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabaseAdmin()
    .from("products")
    .upsert(payload, { onConflict: "id" });
  if (error) return { error: `Error al guardar: ${error.message}` };

  revalidateProductPaths();
  redirect("/admin/productos");
}

export async function deleteProduct(id: string): Promise<void> {
  await requireAdmin();
  if (isSupabaseConfigured) {
    const { error } = await supabaseAdmin().from("products").delete().eq("id", id);
    if (error) throw new Error(`Error al borrar: ${error.message}`);
  }
  revalidateProductPaths();
}

export async function bulkImport(raw: string): Promise<ActionState> {
  try {
    await requireAdmin();
  } catch {
    return { error: "Sesión expirada. Volvé a ingresar al panel." };
  }

  if (!isSupabaseConfigured) {
    return { error: "Supabase no está configurado. Agregá las variables en .env para importar." };
  }

  const lines = raw.split("\n").map((l) => l.trim()).filter(Boolean);
  if (lines.length === 0) return { error: "No hay líneas para importar." };

  const seen = new Set<string>();
  const rows: Record<string, unknown>[] = [];

  for (const line of lines) {
    const parts = line.split(/[|;]/).map((s) => s.trim());
    const [name = "", category = "GENERAL", priceStr = "", stockStr = "0", priceMinorStr] = parts;
    if (!name) continue;

    const price = Number(priceStr.replace(",", "."));
    if (!Number.isFinite(price) || price <= 0) continue;

    const base = slugify(name) || "producto";
    let id = base;
    let i = 2;
    while (seen.has(id)) id = `${base}-${i++}`;
    seen.add(id);

    const priceMinor = priceMinorStr ? Number(priceMinorStr.replace(",", ".")) : null;

    rows.push({
      id,
      name,
      category,
      price,
      price_minor: Number.isFinite(priceMinor as number) ? priceMinor : null,
      stock: Math.max(0, Math.floor(Number(stockStr) || 0)),
      image: PLACEHOLDER_IMG,
      badge: null,
      featured: false,
      preorder: false,
      description: "",
      updated_at: new Date().toISOString(),
    });
  }

  if (rows.length === 0) return { error: "Ninguna línea válida para importar." };

  const { error } = await supabaseAdmin()
    .from("products")
    .upsert(rows, { onConflict: "id" });
  if (error) return { error: `Error al importar: ${error.message}` };

  revalidateProductPaths();
  return { ok: true };
}