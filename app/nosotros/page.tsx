import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Target, HeartHandshake, TrendingUp, Boxes } from "lucide-react";
import { ABOUT_IMG, HERO_IMG } from "@/lib/data";

export const metadata: Metadata = {
  title: "Quiénes somos",
  description:
    "Agustín Mayorista es un mayorista uruguayo dedicado a la venta de productos variados para comercios, emprendedores y revendedores de todo el país.",
};

export default function NosotrosPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={HERO_IMG}
            alt="Depósito de Agustín Mayorista"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-navy-950/85" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 py-24 text-center sm:px-6">
          <p className="text-[12px] font-bold uppercase tracking-[0.4em] text-gold-400">
            Quiénes somos
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold uppercase tracking-tight text-white sm:text-6xl">
            El mayorista que
            <br />
            impulsa tu <span className="text-gold-400">negocio</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60">
            Somos una empresa uruguaya dedicada a la venta mayorista de productos
            variados para comercios, emprendedores y revendedores de todo el país.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2">
        <div className="relative overflow-hidden rounded-3xl border border-white/10">
          <Image
            src={ABOUT_IMG}
            alt="Mercadería en estanterías"
            width={1200}
            height={800}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-white">
            Nuestra <span className="text-gold-400">misión</span>
          </h2>
          <p className="mt-4 leading-relaxed text-white/60">
            Nacimos con un objetivo claro: que los comercios de barrio tengan el
            mismo poder de compra que las grandes superficies. Por eso armamos
            un catálogo amplio con productos de gran rotación, precios
            mayoristas y un equipo que acompaña a cada cliente como un socio.
          </p>
          <p className="mt-3 leading-relaxed text-white/60">
            Trabajamos cerca del canal minorista, con reposición constante para
            que lo que tu clientela busca siempre esté disponible.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { icon: Target, title: "Misión", text: "Abastecer a tu comercio con los mejores precios." },
              { icon: HeartHandshake, title: "Valores", text: "Confianza, compromiso y atención personalizada." },
              { icon: TrendingUp, title: "Visión", text: "Ser el mayorista de referencia en Uruguay." },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-navy-900 p-5">
                <Icon className="h-7 w-7 text-gold-400" />
                <h3 className="mt-3 font-display text-sm font-bold uppercase tracking-widest text-white">{title}</h3>
                <p className="mt-1.5 text-sm text-white/50">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-navy-900">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-14 sm:px-10 lg:grid-cols-[auto_1fr]">
          <span className="mx-auto grid h-24 w-24 place-items-center rounded-2xl bg-gold-500/15 text-gold-400">
            <Boxes className="h-12 w-12" />
          </span>
          <div>
            <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-white">
              ¿Querés ser <span className="text-gold-400">cliente mayorista?</span>
            </h2>
            <p className="mt-3 max-w-2xl text-white/60">
              Arrancá a comprar hoy con precios de fábrica. Coordinamos pedidos,
              facturación y entrega con tu comercio, en Montevideo o el interior.
            </p>
            <Link
              href="/contacto"
              className="group mt-6 inline-flex items-center gap-2 rounded-xl bg-gold-500 px-7 py-4 font-display text-sm font-bold uppercase tracking-widest text-navy-950 transition hover:bg-gold-400"
            >
              Empezar ahora <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}