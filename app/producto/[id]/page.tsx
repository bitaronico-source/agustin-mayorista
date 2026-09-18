import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, PackageCheck, Truck, ShieldCheck, BadgeCheck } from "lucide-react";
import { getProduct, PRODUCTS } from "@/lib/data";
import { formatMoney } from "@/lib/format";
import { AddToCartButton } from "@/components/AddToCartButton";
import { ProductGrid } from "@/components/ProductGrid";

export default async function ProductoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const isNew = product.badge === "NUEVO";

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-white/40">
        <Link href="/" className="transition hover:text-gold-400">Inicio</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/catalogo" className="transition hover:text-gold-400">Catálogo</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link
          href={`/catalogo?categoria=${encodeURIComponent(product.category)}`}
          className="transition hover:text-gold-400"
        >
          {product.category}
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-white/70">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-navy-900">
          {product.badge && (
            <span className="absolute left-4 top-4 z-10 rounded-lg bg-gold-500 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-widest text-navy-950">
              {product.badge}
            </span>
          )}
          <Image
            src={product.image}
            alt={product.name}
            width={900}
            height={900}
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="h-full max-h-[560px] w-full object-cover"
          />
        </div>

        <div className="flex flex-col">
          <p className="text-[12px] font-bold uppercase tracking-[0.35em] text-gold-400">
            Categoría · {product.category}
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold uppercase leading-tight tracking-tight text-white sm:text-4xl">
            {product.name}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider ${isNew ? "bg-gold-500/15 text-gold-400" : "bg-green-500/15 text-green-400"}`}>
              <PackageCheck className="h-3.5 w-3.5" />
              {product.stock} unidades en stock
            </span>
            <span className="flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white/50">
              <Truck className="h-3.5 w-3.5" /> Envíos a todo el país
            </span>
          </div>

          <p className="mt-6 leading-relaxed text-white/60">{product.description}</p>

          <div className="mt-7 rounded-2xl border border-white/10 bg-navy-900 p-5">
            <p className="text-[11px] uppercase tracking-widest text-white/40">
              Precio mayorista
            </p>
            <div className="mt-1 flex flex-wrap items-end gap-3">
              <span className="font-display text-4xl font-bold text-gold-400">
                {formatMoney(product.price)}
              </span>
              <span className="pb-1 text-sm text-white/40">por unidad</span>
            </div>
            <p className="mt-2 text-sm text-white/50">
              Consultá precios especiales por volumen en{" "}
              <Link href="/contacto" className="text-gold-400 hover:underline">
                contacto
              </Link>
              .
            </p>
          </div>

          <div className="mt-6">
            <AddToCartButton product={product} />
          </div>

          <ul className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              { icon: Truck, text: "Envíos a todo el país" },
              { icon: ShieldCheck, text: "Compra segura" },
              { icon: BadgeCheck, text: "Facturación" },
            ].map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-2.5 rounded-xl border border-white/5 bg-navy-900 px-3 py-3 text-xs font-semibold text-white/70">
                <Icon className="h-5 w-5 shrink-0 text-gold-400" />
                {text}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-white">
            Relacionados en <span className="text-gold-400">{product.category}</span>
          </h2>
          <div className="mt-6">
            <ProductGrid products={related} />
          </div>
        </section>
      )}
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) return { title: "Producto no encontrado" };
  return {
    title: product.name,
    description: `${product.name} — precio mayorista ${formatMoney(product.price)}. ${product.description}`,
  };
}