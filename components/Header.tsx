"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  Menu,
  X,
  Search,
  ShoppingCart,
  Phone,
  PackageCheck,
  ChevronRight,
} from "lucide-react";
import { useCart } from "@/lib/cart";
import { SITE } from "@/lib/site";

const NAV = [
  { label: "INICIO", href: "/" },
  { label: "CATÁLOGO", href: "/catalogo" },
  { label: "QUIÉNES SOMOS", href: "/nosotros" },
  { label: "CONTACTO", href: "/contacto" },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { count, openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");

  const submitSearch = () => {
    const q = query.trim();
    router.push(q ? `/catalogo?q=${encodeURIComponent(q)}` : "/catalogo");
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-gold-500 text-navy-950">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-1.5 text-[11px] font-semibold tracking-wide sm:px-6">
          <span className="flex items-center gap-1.5">
            <PackageCheck className="h-3.5 w-3.5" />
            Envíos a todo el país · Atención personalizada
          </span>
          <a
            href={`https://wa.me/${SITE.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-1.5 sm:flex hover:underline"
          >
            <Phone className="h-3.5 w-3.5" />
            {SITE.whatsappDisplay}
          </a>
        </div>
      </div>

      <div className="border-b border-white/5 bg-navy-950/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
          <button
            className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 text-white lg:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Abrir menú"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <Link href="/" className="flex shrink-0 items-center gap-2.5">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-gold-500 text-navy-950 shadow-gold">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 22h20" />
                <path d="M3 22V7l9-5 9 5v15" />
                <path d="M8 22V12h8v10" />
              </svg>
            </span>
            <span className="leading-none">
              <span className="block font-display text-[1.05rem] font-bold tracking-widest text-white">
                AGUSTÍN
              </span>
              <span className="block font-display text-[0.95rem] font-bold tracking-[0.3em] text-gold-400">
                MAYORISTA
              </span>
            </span>
          </Link>

          <nav className="ml-6 hidden items-center gap-1 lg:flex">
            {NAV.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-lg px-4 py-2 text-[13px] font-semibold tracking-widest transition-colors ${
                    active
                      ? "bg-white/5 text-gold-400"
                      : "text-white/80 hover:text-gold-400"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-2.5">
            <div className="relative hidden md:block">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submitSearch()}
                placeholder="Buscá lo que necesitás..."
                className="h-10 w-56 rounded-lg border border-white/10 bg-white/5 pl-4 pr-10 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-gold-500/60 focus:bg-white/10 lg:w-64"
              />
              <button
                onClick={submitSearch}
                aria-label="Buscar"
                className="absolute right-0 top-0 grid h-10 w-10 place-items-center text-white/70 transition hover:text-gold-400"
              >
                <Search className="h-4.5 w-4.5" />
              </button>
            </div>

            <button
              className="grid h-10 w-10 place-items-center rounded-lg text-white/80 transition hover:text-gold-400 md:hidden"
              onClick={submitSearch}
              aria-label="Ir al catálogo"
            >
              <Search className="h-5 w-5" />
            </button>

            <button
              onClick={openCart}
              className="relative flex items-center gap-2 rounded-lg bg-gold-500 px-3.5 py-2.5 font-bold text-navy-950 transition hover:bg-gold-400"
              aria-label="Abrir carrito"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="hidden text-[13px] font-extrabold tracking-wide sm:inline">
                CARRITO
              </span>
              {count > 0 && (
                <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full border-2 border-navy-950 bg-white px-1 text-[11px] font-extrabold text-navy-950">
                  {count > 99 ? "99+" : count}
                </span>
              )}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-white/5 bg-navy-950 lg:hidden">
            <div className="space-y-1 px-4 py-3">
              <div className="relative mb-2 md:hidden">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && submitSearch()}
                  placeholder="Buscá lo que necesitás..."
                  className="h-11 w-full rounded-lg border border-white/10 bg-white/5 pl-4 pr-11 text-sm text-white placeholder:text-white/40 outline-none focus:border-gold-500/60"
                />
                <button
                  onClick={submitSearch}
                  aria-label="Buscar"
                  className="absolute right-0 top-0 grid h-11 w-11 place-items-center text-gold-400"
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between rounded-lg px-3 py-3 text-sm font-semibold tracking-widest text-white/85 hover:bg-white/5 hover:text-gold-400"
                >
                  {item.label}
                  <ChevronRight className="h-4 w-4 text-white/30" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}