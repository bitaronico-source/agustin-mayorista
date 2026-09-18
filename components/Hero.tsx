import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { HERO_IMG } from "@/lib/data";

const BENEFITS = [
  "Precios mayoristas",
  "Gran variedad",
  "Stock permanente",
  "Envíos a todo el país",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={HERO_IMG}
          alt="Depósito mayorista moderno"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/40" />
        <div className="absolute inset-0 bg-navy-950/30" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-28">
        <div className="animate-fade-up">
          <p className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.35em] text-gold-400">
            <Sparkles className="h-4 w-4" /> Tu mayorista de confianza
          </p>
          <h1 className="mt-5 font-display text-5xl font-bold uppercase leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Todo lo que
            <br />
            tu negocio
            <br />
            necesita,
            <br />
            <span className="text-gold-400">en un solo lugar.</span>
          </h1>

          <ul className="mt-8 grid max-w-lg grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
            {BENEFITS.map((b) => (
              <li key={b} className="flex items-center gap-2.5 text-[15px] font-medium text-white/90">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-gold-400" />
                {b}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/catalogo"
              className="group inline-flex items-center gap-2.5 rounded-xl bg-gold-500 px-7 py-4 font-display text-sm font-bold uppercase tracking-widest text-navy-950 shadow-gold transition hover:bg-gold-400"
            >
              Ver catálogo completo
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-4 font-display text-sm font-bold uppercase tracking-widest text-white transition hover:border-gold-500 hover:text-gold-400"
            >
              Pedir asesoramiento
            </Link>
          </div>
        </div>

        <div className="animate-fade-up lg:justify-self-end" style={{ animationDelay: "0.15s" }}>
          <div className="relative rotate-2 rounded-2xl border border-white/15 bg-navy-900/70 px-8 py-10 text-center shadow-card backdrop-blur-md">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gold-500 px-4 py-1 text-[11px] font-extrabold uppercase tracking-widest text-navy-950">
              Al por mayor
            </div>
            <p className="font-hand text-5xl leading-[0.95] text-white">
              Más
              <br />
              variedad,
              <br />
              <span className="text-gold-400">mejores</span>
              <br />
              <span className="text-gold-400">precios.</span>
            </p>
            <p className="mt-5 text-sm text-white/60">
              El mayorista que tu negocio necesita.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}