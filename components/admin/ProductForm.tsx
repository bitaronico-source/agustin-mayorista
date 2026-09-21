"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ImagePlus, Save } from "lucide-react";
import type { Product } from "@/lib/data";
import { saveProduct, type ActionState } from "@/app/admin/actions";
import { slugify } from "@/lib/slug";

const inputCls =
  "w-full rounded-xl border border-white/10 bg-navy-950 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-gold-500/60";
const labelCls =
  "mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-white/50";

type Props = {
  product?: Product;
  categories: string[];
  isNew: boolean;
};

export function ProductForm({ product, categories, isNew }: Props) {
  const [name, setName] = useState(product?.name ?? "");
  const [id, setId] = useState(product?.id ?? "");
  const [category, setCategory] = useState(product?.category ?? "");
  const [imageUrl, setImageUrl] = useState(product?.image ?? "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState(product?.image ?? "");

  const [description, setDescription] = useState(product?.description ?? "");

  const syncName = (v: string) => {
    setName(v);
    if (isNew && !id) setId(slugify(v));
  };

  const onUrlChange = (v: string) => {
    setImageUrl(v);
    if (v.trim()) {
      setPreview(v.trim());
      setImageFile(null);
    }
  };

  const onFileChange = (f: File | null) => {
    setImageFile(f);
    if (f) {
      setImageUrl("");
      setPreview(URL.createObjectURL(f));
    }
  };

  const formAction = async (_prev: ActionState, fd: FormData) => saveProduct(fd);
  const [state, action, pending] = useActionState<ActionState, FormData>(formAction, {});

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link
            href="/admin/productos"
            className="inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-widest text-gold-400 transition hover:text-gold-300"
          >
            <ArrowLeft className="h-4 w-4" /> Volver a productos
          </Link>
          <h1 className="mt-2 font-display text-3xl font-bold uppercase tracking-tight text-white">
            {isNew ? (
              <>Nuevo <span className="text-gold-400">producto</span></>
            ) : (
              <>Editar <span className="text-gold-400">producto</span></>
            )}
          </h1>
        </div>
      </div>

      <form action={action} className="space-y-6">
        {state.error && (
          <div className="rounded-2xl border border-red-500/40 bg-red-500/10 px-5 py-4 text-sm text-red-300">
            {state.error}
          </div>
        )}
        <input type="hidden" name="id" value={id} />

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <section className="rounded-3xl border border-white/10 bg-navy-900 p-6">
              <h2 className="font-display text-lg font-bold uppercase tracking-wide text-white">
                Información
              </h2>
              <div className="mt-5 space-y-5">
                <div>
                  <label className={labelCls}>Nombre *</label>
                  <input
                    name="name"
                    value={name}
                    onChange={(e) => syncName(e.target.value)}
                    className={inputCls}
                    placeholder="Ej: Pack 6 Remeras Básicas"
                  />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelCls}>Categoría</label>
                    <input
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      list="categorias"
                      className={inputCls}
                      placeholder="BAZAR"
                    />
                    <datalist id="categorias">
                      {categories.map((c) => (
                        <option key={c} value={c} />
                      ))}
                    </datalist>
                  </div>
                  <div>
                    <label className={labelCls}>ID / slug</label>
                    <input
                      value={id}
                      onChange={(e) => setId(slugify(e.target.value))}
                      className={inputCls}
                      placeholder="pack-6-remeras"
                    />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Descripción</label>
                  <textarea
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={`${inputCls} resize-none`}
                    rows={4}
                    placeholder="Detalle del producto para la ficha..."
                  />
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-white/10 bg-navy-900 p-6">
              <h2 className="font-display text-lg font-bold uppercase tracking-wide text-white">
                Precios
              </h2>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelCls}>Precio mayorista (USD) *</label>
                  <input
                    name="priceMayor"
                    type="number"
                    min="0"
                    step="0.01"
                    defaultValue={product?.price}
                    className={inputCls}
                    placeholder="1890"
                  />
                </div>
                <div>
                  <label className={labelCls}>Precio por menor / sugerido (opcional)</label>
                  <input
                    name="priceMenor"
                    type="number"
                    min="0"
                    step="0.01"
                    defaultValue={product?.priceMinor}
                    className={inputCls}
                    placeholder="2300"
                  />
                  <p className="mt-1 text-xs text-white/35">
                    Es el precio sugerido de reventa que se muestra como referencia.
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-white/10 bg-navy-900 p-6">
              <h2 className="font-display text-lg font-bold uppercase tracking-wide text-white">
                Stock y venta
              </h2>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelCls}>Stock (unidades)</label>
                  <input
                    name="stock"
                    type="number"
                    min="0"
                    defaultValue={product?.stock ?? 0}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Chapa / badge</label>
                  <select
                    name="badge"
                    defaultValue={product?.badge ?? ""}
                    className={`${inputCls} appearance-none [&>option]:bg-navy-950`}
                  >
                    <option value="">Sin badge</option>
                    <option>NUEVO</option>
                    <option>OFERTA</option>
                    <option>ÚLTIMAS UNIDADES</option>
                  </select>
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 px-4 py-3 transition hover:border-gold-500/40">
                  <input
                    name="preorder"
                    type="checkbox"
                    defaultChecked={product?.preorder}
                    className="h-5 w-5 accent-violet-500"
                  />
                  <span>
                    <span className="block text-sm font-semibold text-white">PRE-VENTA</span>
                    <span className="block text-xs text-white/40">
                      Producto que se encarga, sin stock disponible
                    </span>
                  </span>
                </label>
                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 px-4 py-3 transition hover:border-gold-500/40">
                  <input
                    name="featured"
                    type="checkbox"
                    defaultChecked={product?.featured}
                    className="h-5 w-5 accent-gold-500"
                  />
                  <span>
                    <span className="block text-sm font-semibold text-white">Destacado</span>
                    <span className="block text-xs text-white/40">
                      Aparece en la sección Destacados de la home
                    </span>
                  </span>
                </label>
              </div>
            </section>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:h-fit">
            <section className="rounded-3xl border border-white/10 bg-navy-900 p-6">
              <h2 className="font-display text-lg font-bold uppercase tracking-wide text-white">
                Imagen
              </h2>
              <div className="mt-5">
                {preview ? (
                  <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10">
                    <Image src={preview} alt="Vista previa" fill sizes="360px" className="object-cover" />
                  </div>
                ) : (
                  <div className="grid aspect-square place-items-center rounded-2xl border border-dashed border-white/15 bg-navy-950 text-white/30">
                    <ImagePlus className="h-10 w-10" />
                  </div>
                )}

                <label className={labelCls}>URL de imagen</label>
                <input
                  value={imageUrl}
                  onChange={(e) => onUrlChange(e.target.value)}
                  className={inputCls}
                  placeholder="https://... (o subí un archivo)"
                />

                <label
                  htmlFor="imageFile"
                  className="mt-3 block cursor-pointer rounded-xl border border-white/10 bg-navy-950 px-4 py-3 text-center text-sm font-semibold text-gold-400 transition hover:border-gold-500/50"
                >
                  {imageFile ? imageFile.name : "Subir imagen del archivo"}
                </label>
                <input
                  id="imageFile"
                  name="imageFile"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
                />
                {imageUrl && (
                  <input type="hidden" name="imageUrl" value={imageUrl} />
                )}
              </div>
            </section>

            <button
              type="submit"
              disabled={pending}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gold-500 py-4 font-display text-sm font-bold uppercase tracking-widest text-navy-950 shadow-gold transition hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save className="h-5 w-5" />
              {pending ? "Guardando..." : isNew ? "Crear producto" : "Guardar cambios"}
            </button>
          </aside>
        </div>
      </form>
    </div>
  );
}