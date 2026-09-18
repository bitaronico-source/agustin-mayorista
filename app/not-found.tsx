import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-center px-4 py-28 text-center sm:px-6">
      <p className="font-display text-7xl font-bold text-gold-400">404</p>
      <h1 className="mt-4 font-display text-3xl font-bold uppercase tracking-tight text-white">
        Página no encontrada
      </h1>
      <p className="mt-3 text-white/50">
        No encontramos lo que buscás. Volvé al inicio o explorá el catálogo.
      </p>
      <Link
        href="/catalogo"
        className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-gold-500 px-6 py-3.5 text-[13px] font-extrabold uppercase tracking-widest text-navy-950 transition hover:bg-gold-400"
      >
        Ver catálogo <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </section>
  );
}