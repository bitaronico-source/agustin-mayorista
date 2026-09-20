import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/Hero";
import { CategoryGrid } from "@/components/CategoryGrid";
import { ProductGrid } from "@/components/ProductGrid";
import { Benefits } from "@/components/Benefits";
import { AboutSection } from "@/components/AboutSection";
import { CTA } from "@/components/CTA";
import { getFeaturedProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function Home() {
  const featured = await getFeaturedProducts();

  return (
    <>
      <Hero />
      <CategoryGrid />

      <section className="border-y border-white/5 bg-navy-900/60">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[12px] font-bold uppercase tracking-[0.35em] text-gold-400">
                Lo más pedido
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">
                Productos <span className="text-gold-400">destacados</span>
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
          <div className="mt-8">
            <ProductGrid products={featured} />
          </div>
        </div>
      </section>

      <Benefits />
      <AboutSection />
      <CTA />
    </>
  );
}