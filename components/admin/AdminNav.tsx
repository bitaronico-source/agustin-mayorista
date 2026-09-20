"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  LogOut,
  Settings,
} from "lucide-react";

const LINKS = [
  { label: "Panel", href: "/admin", icon: LayoutDashboard },
  { label: "Productos", href: "/admin/productos", icon: Package },
];

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy-950/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gold-500 text-navy-950">
            <Settings className="h-5 w-5" />
          </span>
          <span className="leading-none">
            <span className="block font-display text-base font-bold tracking-widest text-white">ADMIN</span>
            <span className="block font-display text-[0.8rem] font-bold tracking-[0.3em] text-gold-400">MAYORISTA</span>
          </span>
        </Link>

        <nav className="ml-4 hidden items-center gap-1 sm:flex">
          {LINKS.map(({ label, href, icon: Icon }) => {
            const active = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-[13px] font-semibold tracking-wide transition ${
                  active
                    ? "bg-gold-500 text-navy-950"
                    : "text-white/70 hover:bg-white/5 hover:text-gold-400"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/"
            className="hidden items-center gap-2 rounded-lg border border-white/10 px-3.5 py-2 text-[13px] font-semibold text-white/70 transition hover:border-gold-500 hover:text-gold-400 md:flex"
          >
            <ShoppingCart className="h-4 w-4" /> Ver tienda
          </Link>
          <button
            onClick={logout}
            className="flex items-center gap-2 rounded-lg border border-white/10 px-3.5 py-2 text-[13px] font-semibold text-white/70 transition hover:border-red-500 hover:text-red-400"
          >
            <LogOut className="h-4 w-4" /> Salir
          </button>
        </div>
      </div>
    </header>
  );
}