import Link from "next/link";
import {
  Package,
  Star,
  CalendarClock,
  AlertTriangle,
  Tags,
  ArrowRight,
  Boxes,
  Wallet,
} from "lucide-react";
import { getProducts, getProductCategories } from "@/lib/products";
import { isSupabaseConfigured } from "@/lib/supabase";
import { formatMoney } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [products, categories] = await Promise.all([getProducts(), getProductCategories()]);

  const lowStock = products.filter((p) => !p.preorder && p.stock <= 12);
  const preorders = products.filter((p) => p.preorder);
  const featured = products.filter((p) => p.featured);
  const stockValue = products.reduce((acc, p) => acc + p.price * p.stock, 0);

  const stats = [
    { label: "Productos", value: products.length, icon: Package, href: "/admin/productos" },
    { label: "Categorías", value: categories.length, icon: Tags, href: "/admin/productos" },
    { label: "Destacados", value: featured.length, icon: Star, href: "/admin/productos" },
    { label: "En preventa", value: preorders.length, icon: CalendarClock, href: "/admin/productos" },
    { label: "Bajo stock", value: lowStock.length, icon: AlertTriangle, href: "/admin/productos" },
    { label: "Valor en stock", value: formatMoney(stockValue), icon: Wallet, href: "/admin/productos" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[12px] font-bold uppercase tracking-[0.35em] text-gold-400">
            Panel de administración
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">
            Resumen del <span className="text-gold-400">catálogo</span>
          </h1>
        </div>
        <Link
          href="/admin/productos/nuevo"
          className="flex items-center gap-2 rounded-xl bg-gold-500 px-5 py-3 text-[13px] font-extrabold uppercase tracking-widest text-navy-950 transition hover:bg-gold-400"
        >
          <Boxes className="h-5 w-5" /> Nuevo producto
        </Link>
      </div>

      {!isSupabaseConfigured && (
        <div className="rounded-2xl border border-amber-500/40 bg-amber-500/10 px-5 py-4 text-sm text-amber-300">
          <b>Modo demo:</b> Supabase no está configurado. Los cambios no se guardan.
          Configurá <code className="text-amber-200">SUPABASE_URL</code>,{" "}
          <code className="text-amber-200">SUPABASE_SERVICE_ROLE_KEY</code> y{" "}
          <code className="text-amber-200">ADMIN_PASSWORD</code> en tu ambiente.
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        {stats.map(({ label, value, icon: Icon, href }) => (
          <Link
            key={label}
            href={href}
            className="group rounded-2xl border border-white/10 bg-navy-900 p-5 transition hover:border-gold-500/40 hover:shadow-card"
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gold-500/15 text-gold-400">
              <Icon className="h-5 w-5" />
            </span>
            <p className="mt-4 font-display text-2xl font-bold text-white">{value}</p>
            <p className="mt-1 text-[11px] font-bold uppercase tracking-widest text-white/40">
              {label}
            </p>
          </Link>
        ))}
      </div>

      <div className="rounded-3xl border border-white/10 bg-navy-900 p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-bold uppercase tracking-wide text-white">
            Últimos productos
          </h2>
          <Link
            href="/admin/productos"
            className="flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-widest text-gold-400 transition hover:text-gold-300"
          >
            Ver todos <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <ul className="mt-4 divide-y divide-white/5">
          {products.slice(0, 6).map((p) => (
            <li key={p.id}>
              <Link
                href={`/admin/productos/${p.id}`}
                className="flex items-center gap-4 py-3 transition hover:bg-white/[0.03]"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-navy-800 text-white/50">
                  <Package className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-white">{p.name}</p>
                  <p className="text-xs text-white/40">
                    {p.category}
                    {p.preorder && <span className="ml-2 text-violet-300">PRE-VENTA</span>}
                    {!p.preorder && p.stock <= 12 && (
                      <span className="ml-2 text-red-400">BAJO STOCK</span>
                    )}
                  </p>
                </div>
                <span className="font-display text-sm font-bold text-gold-400">
                  {formatMoney(p.price)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}