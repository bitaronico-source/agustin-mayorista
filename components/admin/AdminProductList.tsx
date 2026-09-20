"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Plus,
  Search,
  Trash2,
  Pencil,
  Upload,
  CalendarClock,
  Star,
  AlertTriangle,
  X,
} from "lucide-react";
import type { Product } from "@/lib/data";
import { deleteProduct, bulkImport, type ActionState } from "@/app/admin/actions";
import { formatMoney } from "@/lib/format";

export function AdminProductList({
  products,
  demoMode,
}: {
  products: Product[];
  demoMode: boolean;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [importOpen, setImportOpen] = useState(false);
  const [importText, setImportText] = useState("");
  const [importMsg, setImportMsg] = useState<ActionState | null>(null);
  const [busy, setBusy] = useState(false);

  const filtered = products.filter((p) =>
    `${p.name} ${p.category}`.toLowerCase().includes(query.toLowerCase())
  );

  const onDelete = async (p: Product) => {
    if (!confirm(`¿Eliminar "${p.name}"? Esta acción no se puede deshacer.`)) return;
    try {
      await deleteProduct(p.id);
      router.refresh();
    } catch {
      alert("No se pudo eliminar el producto.");
    }
  };

  const onImport = async () => {
    setBusy(true);
    setImportMsg(null);
    const res = await bulkImport(importText);
    setImportMsg(res);
    setBusy(false);
    if (res.ok) {
      setImportText("");
      setImportOpen(false);
      router.refresh();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-[12px] font-bold uppercase tracking-[0.35em] text-gold-400">
            Gestión de catálogo
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">
            Productos <span className="text-gold-400">({products.length})</span>
          </h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setImportOpen((v) => !v)}
            className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-[12px] font-bold uppercase tracking-widest text-white/70 transition hover:border-gold-500 hover:text-gold-400"
          >
            <Upload className="h-4 w-4" /> Importar
          </button>
          <Link
            href="/admin/productos/nuevo"
            className="flex items-center gap-2 rounded-xl bg-gold-500 px-4 py-2.5 text-[12px] font-extrabold uppercase tracking-widest text-navy-950 transition hover:bg-gold-400"
          >
            <Plus className="h-4 w-4" /> Nuevo
          </Link>
        </div>
      </div>

      {demoMode && (
        <div className="rounded-2xl border border-amber-500/40 bg-amber-500/10 px-5 py-4 text-sm text-amber-300">
          <b>Modo demo:</b> Supabase no está configurado, se muestra el catálogo de ejemplo y los cambios no se guardan.
        </div>
      )}

      {importOpen && (
        <div className="rounded-3xl border border-white/10 bg-navy-900 p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold uppercase tracking-wide text-white">
              Importar catálogo
            </h2>
            <button
              onClick={() => setImportOpen(false)}
              className="text-white/50 transition hover:text-white"
              aria-label="Cerrar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <p className="mt-2 text-sm text-white/50">
            Una línea por producto separando con <b className="text-gold-400">|</b>:{" "}
            <code className="text-white/70">nombre | categoría | precioMayor | stock | precioMenor</code>
          </p>
          <p className="mt-1 text-xs text-white/35">Ej: Pack 6 Remeras | ROPA | 1890 | 45 | 2300</p>
          <textarea
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
            rows={6}
            placeholder={"Pack 6 Remeras Básicas | ROPA | 1890 | 45 | 2300\nGorras Deportivas | ROPA | 990 | 60"}
            className="mt-4 w-full resize-none rounded-xl border border-white/10 bg-navy-950 px-4 py-3 font-mono text-sm text-white outline-none transition focus:border-gold-500/60"
          />
          {importMsg?.error && (
            <p className="mt-3 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">
              {importMsg.error}
            </p>
          )}
          {importMsg?.ok && (
            <p className="mt-3 rounded-lg bg-green-500/10 px-3 py-2 text-sm text-green-400">
              Catálogo importado correctamente.
            </p>
          )}
          <button
            onClick={onImport}
            disabled={busy || !importText.trim()}
            className="mt-4 flex items-center gap-2 rounded-xl bg-gold-500 px-5 py-3 text-[12px] font-extrabold uppercase tracking-widest text-navy-950 transition hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Upload className="h-4 w-4" /> {busy ? "Importando..." : "Importar"}
          </button>
        </div>
      )}

      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por nombre o categoría..."
          className="h-12 w-full rounded-xl border border-white/10 bg-navy-900 pl-12 pr-4 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-gold-500/60"
        />
      </div>

      <div className="overflow-hidden rounded-3xl border border-white/10 bg-navy-900">
        <div className="max-h-[70vh] overflow-auto">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="sticky top-0 bg-navy-900 text-[11px] uppercase tracking-widest text-white/40">
              <tr className="border-b border-white/10">
                <th className="px-5 py-3">Producto</th>
                <th className="px-5 py-3">Categoría</th>
                <th className="px-5 py-3">Mayor</th>
                <th className="px-5 py-3">Por menor</th>
                <th className="px-5 py-3">Stock</th>
                <th className="px-5 py-3">Flags</th>
                <th className="px-5 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((p) => (
                <tr key={p.id} className="transition hover:bg-white/[0.03]">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg border border-white/10">
                        <Image src={p.image} alt={p.name} fill sizes="44px" className="object-cover" />
                      </div>
                      <div className="min-w-0">
                        <Link
                          href={`/admin/productos/${p.id}`}
                          className="block max-w-[240px] truncate font-semibold text-white hover:text-gold-400"
                        >
                          {p.name}
                        </Link>
                        <span className="text-xs text-white/35">{p.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-white/60">{p.category}</td>
                  <td className="px-5 py-3 font-bold text-gold-400">{formatMoney(p.price)}</td>
                  <td className="px-5 py-3 text-white/50">
                    {p.priceMinor != null ? formatMoney(p.priceMinor) : "—"}
                  </td>
                  <td className="px-5 py-3">
                    {p.preorder ? (
                      <span className="flex items-center gap-1 text-xs font-bold text-violet-300">
                        <CalendarClock className="h-3.5 w-3.5" /> PRE-VENTA
                      </span>
                    ) : p.stock <= 12 ? (
                      <span className="flex items-center gap-1 text-xs font-bold text-red-400">
                        <AlertTriangle className="h-3.5 w-3.5" /> {p.stock}
                      </span>
                    ) : (
                      <span className="text-white/60">{p.stock}</span>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex flex-wrap gap-1.5">
                      {p.featured && (
                        <span className="flex items-center gap-1 rounded-md bg-gold-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold-400">
                          <Star className="h-3 w-3" /> Destacado
                        </span>
                      )}
                      {p.preorder && (
                        <span className="flex items-center gap-1 rounded-md bg-violet-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-violet-300">
                          <CalendarClock className="h-3 w-3" /> Preventa
                        </span>
                      )}
                      {p.badge && (
                        <span className="rounded-md bg-white/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white/70">
                          {p.badge}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end gap-1.5">
                      <Link
                        href={`/admin/productos/${p.id}`}
                        className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-white/60 transition hover:border-gold-500 hover:text-gold-400"
                        aria-label={`Editar ${p.name}`}
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => onDelete(p)}
                        className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-white/60 transition hover:border-red-500 hover:text-red-400"
                        aria-label={`Eliminar ${p.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="px-5 py-16 text-center text-sm text-white/40">
              No hay productos que coincidan.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}