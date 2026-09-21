import Link from "next/link";
import {
  Mail,
  Clock,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import { SITE } from "@/lib/site";
import { CATEGORIES } from "@/lib/data";

function SocialIcon({ label, path, href = "#" }: { label: string; path: string; href?: string }) {
  return (
    <a
      href={href}
      target={href !== "#" ? "_blank" : undefined}
      rel={href !== "#" ? "noreferrer" : undefined}
      aria-label={label}
      className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 text-white/70 transition hover:border-gold-500 hover:text-gold-400"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d={path} />
      </svg>
    </a>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-navy-950">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gold-500 text-navy-950">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 22h20" />
                <path d="M3 22V7l9-5 9 5v15" />
                <path d="M8 22V12h8v10" />
              </svg>
            </span>
            <span className="leading-none">
              <span className="block font-display text-base font-bold tracking-widest text-white">AGUSTÍN</span>
              <span className="block font-display text-sm font-bold tracking-[0.3em] text-gold-400">MAYORISTA</span>
            </span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-white/50">
            Empresa mayorista dedicada a la venta de productos variados para
            comercios, emprendedores y revendedores de todo el país. Precios de
            fábrica y stock permanente.
          </p>
          <div className="mt-5 flex gap-2">
            <SocialIcon
              label="Facebook"
              path="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
            />
            <SocialIcon
              label="Instagram"
              href={SITE.instagram}
              path="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm10 2a2 2 0 1 0 2 2 2 2 0 0 0-2-2zM12 8a4 4 0 1 0 4 4 4 4 0 0 0-4-4zm0 2a2 2 0 1 1-2 2 2 2 0 0 1 2-2z"
            />
            <SocialIcon
              label="TikTok"
              path="M12 4c.5-2.2 2.3-4 4.7-4a5.6 5.6 0 0 0 1.3.6c.2 1.6 1.4 3 3 3.4v3.2c-1.4 0-2.8-.5-3.8-1.2v6.9A5.7 5.7 0 1 1 8.5 11v3.1a2.6 2.6 0 1 0 2.7 2.6V0h3.2v2.8c.9.7 2 1.2 3.3 1.2V4zM9.3 18.4h0A2.5 2.5 0 0 0 13 15.8V4h-3.2v11.9a2.6 2.6 0 0 1-.5 2.5z"
            />
            <SocialIcon
              label="WhatsApp"
              path="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18a8 8 0 1 1 4.1-1.1l1.4.4-.4-1.3A8 8 0 0 1 12 20zm4.5-6c-.3-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7 1-.8 1.1-.3.2-.6.1a6.6 6.6 0 0 1-3.3-2.9c-.3-.4 0-.5.2-.7l.4-.5a1.7 1.7 0 0 0 .2-.4c0-.1 0-.2-.1-.4l-.8-2c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 2.9 2.9 0 0 0-.9 2.2 5 5 0 0 0 1 2.7 11.4 11.4 0 0 0 4.4 3.9 15 15 0 0 0 1.5.5 3.5 3.5 0 0 0 1.6.1 2.6 2.6 0 0 0 1.7-1.2 2 2 0 0 0 .1-1.2c0-.1-.2-.2-.5-.3z"
            />
          </div>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold tracking-[0.25em] text-white">LINKS RÁPIDOS</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-white/60">
            <li><Link href="/" className="transition hover:text-gold-400">Inicio</Link></li>
            <li><Link href="/catalogo" className="transition hover:text-gold-400">Catálogo</Link></li>
            <li><Link href="/nosotros" className="transition hover:text-gold-400">Quiénes somos</Link></li>
            <li><Link href="/contacto" className="transition hover:text-gold-400">Contacto</Link></li>
            <li><Link href="/carrito" className="transition hover:text-gold-400">Carrito</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold tracking-[0.25em] text-white">CATEGORÍAS</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-white/60">
            {CATEGORIES.map((c) => (
              <li key={c.name}>
                <Link href={`/catalogo?categoria=${encodeURIComponent(c.name)}`} className="transition hover:text-gold-400">
                  {c.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/catalogo" className="flex items-center gap-1.5 font-semibold text-gold-400 transition hover:text-gold-300">
                Ver todo el catálogo <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold tracking-[0.25em] text-white">CONTACTO</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/60">
            <li className="flex items-start gap-2.5">
              <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
              <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noreferrer" className="transition hover:text-gold-400">
                {SITE.whatsappDisplay}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
              <a href={`mailto:${SITE.email}`} className="break-all transition hover:text-gold-400">{SITE.email}</a>
            </li>
            <li className="flex items-start gap-2.5">
              <svg viewBox="0 0 24 24" fill="currentColor" className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" aria-hidden="true">
                <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm10 2a2 2 0 1 0 2 2 2 2 0 0 0-2-2zM12 8a4 4 0 1 0 4 4 4 4 0 0 0-4-4zm0 2a2 2 0 1 1-2 2 2 2 0 0 1 2-2z" />
              </svg>
              <a href={SITE.instagram} target="_blank" rel="noreferrer" className="transition hover:text-gold-400">
                {SITE.instagramHandle}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
              <span>{SITE.hoursLunVie}<br />{SITE.hoursSab}</span>
            </li>
          </ul>
          <a
            href={`https://wa.me/${SITE.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-gold-500 px-4 py-2.5 text-[13px] font-bold text-navy-950 transition hover:bg-gold-400"
          >
            <MessageCircle className="h-4 w-4" /> ESCRIBINOS POR WHATSAPP
          </a>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-white/40 sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} <b className="text-white/70">Agustín Mayorista</b>. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <span>Montevideo · Uruguay</span>
            <Link href="/admin" className="transition hover:text-gold-400">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}