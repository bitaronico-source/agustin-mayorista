import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, PackagePlus } from "lucide-react";
import { CATEGORIES } from "@/lib/data";

export function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[12px] font-bold uppercase tracking-[0.35em] text-gold-400">
            Nuestros rubros
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">
            Explorá por <span className="text-gold-400">categoría</span>
          </h2>
        </div>
        <Link
          href="/catalogo"
          className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white/70 transition hover:text-gold-400"
        >
          Ver catálogo completo
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="no-scrollbar mt-8 flex gap-4 overflow-x-auto pb-2">
        {CATEGORIES.map((c) => (
          <Link
            key={c.name}
            href={`/catalogo?categoria=${encodeURIComponent(c.name)}`}
            className="group relative h-52 w-56 shrink-0 overflow-hidden rounded-2xl border border-white/10"
          >
            <Image
              src={c.image}
              alt={c.name}
              fill
              sizes="224px"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/60">
                {c.blurb}
              </p>
              <div className="mt-1.5 flex items-center justify-between">
                <h3 className="font-display text-lg font-bold uppercase tracking-wider text-white">
                  {c.name}
                </h3>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-gold-500 text-navy-950 opacity-0 transition group-hover:opacity-100">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </Link>
        ))}

        <Link
          href="/catalogo"
          className="relative flex h-52 w-56 shrink-0 flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-gold-500/50 bg-navy-900 text-center transition hover:border-gold-500 hover:bg-navy-850"
        >
          <span className="grid h-12 w-12 place-items-center rounded-full bg-gold-500/15 text-gold-400">
            <PackagePlus className="h-6 w-6" />
          </span>
          <span className="px-4 font-display text-sm font-bold uppercase tracking-widest text-gold-400">
            Y mucho más
          </span>
          <span className="text-xs text-white/40">Electrónica · Limpieza · Alimentos</span>
        </Link>
      </div>
    </section>
  );
}