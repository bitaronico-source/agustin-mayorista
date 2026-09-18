import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Boxes } from "lucide-react";
import { ABOUT_IMG } from "@/lib/data";

const STATS = [
  { value: "+4.000", label: "Productos en stock" },
  { value: "+500", label: "Comercios abastecidos" },
  { value: "19", label: "Departamentos con entrega" },
];

export function AboutSection() {
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2">
      <div className="relative order-2 lg:order-1">
        <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-gold-500/20 to-transparent blur-2xl" />
        <div className="relative overflow-hidden rounded-3xl border border-white/10">
          <Image
            src={ABOUT_IMG}
            alt="Depósito con mercadería de Agustín Mayorista"
            width={1200}
            height={800}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 to-transparent" />
          <div className="absolute bottom-5 left-5 flex items-center gap-3 rounded-xl bg-navy-950/80 px-4 py-3 backdrop-blur">
            <Boxes className="h-8 w-8 text-gold-400" />
            <div>
              <p className="font-display text-lg font-bold leading-none text-white">AGUSTÍN MAYORISTA</p>
              <p className="text-xs text-white/60">Stock permanente · Entrega inmediata</p>
            </div>
          </div>
        </div>
      </div>

      <div className="order-1 lg:order-2">
        <p className="text-[12px] font-bold uppercase tracking-[0.35em] text-gold-400">
          Quiénes somos
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold uppercase leading-tight tracking-tight text-white sm:text-4xl">
          Un mayorista dedicado al crecimiento de tu <span className="text-gold-400">comercio</span>
        </h2>
        <p className="mt-5 leading-relaxed text-white/60">
          Agustín Mayorista es una empresa uruguaya dedicada a la venta mayorista
          de productos variados para comercios, emprendedores y revendedores.
          Trabajamos con un catálogo amplio, reposición constante y atención
          personalizada, para que tu negocio nunca se quede sin stock.
        </p>
        <ul className="mt-6 space-y-3">
          {[
            "Catálogo con productos de gran rotación",
            "Precios mayoristas y ofertas por volumen",
            "Atención por WhatsApp y asesoramiento comercial",
            "Entrega pactada en tu local o depósito",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-[15px] text-white/80">
              <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-gold-400" />
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-8 grid grid-cols-3 gap-4">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-2xl border border-white/10 bg-navy-900 p-4 text-center">
              <p className="font-display text-2xl font-bold text-gold-400">{s.value}</p>
              <p className="mt-1 text-[11px] uppercase tracking-wider text-white/50">{s.label}</p>
            </div>
          ))}
        </div>

        <Link
          href="/nosotros"
          className="group mt-8 inline-flex items-center gap-2 rounded-xl border border-white/15 px-6 py-3.5 text-[12px] font-bold uppercase tracking-widest text-white transition hover:border-gold-500 hover:text-gold-400"
        >
          Conocé más sobre nosotros
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}