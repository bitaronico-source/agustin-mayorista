import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CTA_IMG } from "@/lib/data";

export function CTA() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={CTA_IMG}
          alt="Centro de distribución"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-navy-950/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-gold-600/20 to-transparent" />
      </div>
      <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
        <p className="text-[12px] font-bold uppercase tracking-[0.4em] text-gold-400">
          Trabajá con nosotros
        </p>
        <h2 className="mt-4 font-display text-4xl font-bold uppercase leading-tight tracking-tight text-white sm:text-5xl">
          ¿Listo para hacer crecer
          <br />
          tu <span className="text-gold-400">negocio?</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-white/70">
          Encontrá todo lo que necesitás, con precios mayoristas y atención
          personalizada.
        </p>
        <Link
          href="/catalogo"
          className="group mt-9 inline-flex items-center gap-3 rounded-xl bg-gold-500 px-9 py-4 font-display text-sm font-bold uppercase tracking-widest text-navy-950 shadow-gold transition hover:bg-gold-400"
        >
          Ver catálogo
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}