"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Minus,
  Plus,
  MessageCircle,
  Send,
  ArrowRight,
  ShoppingCart,
  CheckCircle2,
} from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatMoney, formatMoneyFull } from "@/lib/format";
import { SITE } from "@/lib/site";

const EMPTY = {
  nombre: "",
  empresa: "",
  telefono: "",
  email: "",
  direccion: "",
  ciudad: "",
  entrega: "Retira en depósito",
  comentarios: "",
};

type Form = typeof EMPTY;

export function CheckoutForm() {
  const { items, subtotal, setQty, clear } = useCart();
  const [form, setForm] = useState<Form>(EMPTY);
  const [errors, setErrors] = useState<Partial<Form>>({});
  const [sent, setSent] = useState(false);

  useEffect(() => {
    document.title = "Finalizar pedido — Agustín Mayorista";
  }, []);

  const set = (k: keyof Form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const validate = () => {
    const e: Partial<Form> = {};
    if (!form.nombre.trim()) e.nombre = "Completá tu nombre";
    if (!form.telefono.trim()) e.telefono = "Completá tu teléfono";
    if (!form.direccion.trim()) e.direccion = "Completá tu dirección";
    if (!form.ciudad.trim()) e.ciudad = "Completá tu ciudad";
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Email inválido";
    if (items.length === 0) e.nombre = "Tu carrito está vacío";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const buildMessage = () => {
    const lineas = items
      .map(({ product, qty }) => `• ${product.name} x${qty} — ${formatMoneyFull(product.price * qty)}`)
      .join("\n");

    return [
      "HOLA AGUSTÍN MAYORISTA 🛒",
      "",
      "Quiero realizar el siguiente pedido:",
      "",
      lineas,
      "",
      `SUBTOTAL: ${formatMoneyFull(subtotal)}`,
      "",
      "— Datos de contacto —",
      `Nombre: ${form.nombre}`,
      `Empresa / comercio: ${form.empresa || "-"}`,
      `Teléfono: ${form.telefono}`,
      `Email: ${form.email || "-"}`,
      `Dirección: ${form.direccion}`,
      `Ciudad: ${form.ciudad}`,
      `Forma de entrega: ${form.entrega}`,
      form.comentarios ? `Comentarios: ${form.comentarios}` : "",
    ]
      .filter(Boolean)
      .join("\n");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const url = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(buildMessage())}`;
    window.open(url, "_blank");
    setSent(true);
    clear();
  };

  if (sent) {
    return (
      <div className="mx-auto max-w-xl rounded-3xl border border-gold-500/30 bg-navy-900 p-10 text-center shadow-card">
        <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gold-500/15 text-gold-400">
          <CheckCircle2 className="h-10 w-10" />
        </span>
        <h2 className="mt-6 font-display text-3xl font-bold uppercase text-white">
          ¡Pedido enviado!
        </h2>
        <p className="mt-3 text-white/60">
          Abrimos WhatsApp con tu pedido armado. Envialo y en breve nos
          comunicamos para coordinar la entrega.
        </p>
        <Link
          href="/catalogo"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gold-500 px-6 py-3.5 text-[13px] font-extrabold uppercase tracking-widest text-navy-950 transition hover:bg-gold-400"
        >
          Seguir comprando <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl rounded-3xl border border-white/10 bg-navy-900 p-10 text-center shadow-card">
        <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-white/5">
          <ShoppingCart className="h-9 w-9 text-white/30" />
        </span>
        <h2 className="mt-6 font-display text-3xl font-bold uppercase text-white">
          Tu carrito está vacío
        </h2>
        <p className="mt-3 text-white/60">
          Agregá productos del catálogo para armar tu pedido mayorista.
        </p>
        <Link
          href="/catalogo"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gold-500 px-6 py-3.5 text-[13px] font-extrabold uppercase tracking-widest text-navy-950 transition hover:bg-gold-400"
        >
          Ir al catálogo <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  const inputCls = (hasError?: string) =>
    `w-full rounded-xl border bg-navy-950 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition ${
      hasError
        ? "border-red-500/60"
        : "border-white/10 focus:border-gold-500/60"
    }`;

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <div className="rounded-3xl border border-white/10 bg-navy-900 p-6 sm:p-8">
          <h2 className="font-display text-xl font-bold uppercase tracking-wide text-white">
            Datos del pedido
          </h2>
          <p className="mt-1 text-sm text-white/50">
            Completá tus datos para armarte el pedido por WhatsApp.
          </p>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-white/50">
                Nombre *
              </label>
              <input
                value={form.nombre}
                onChange={(e) => set("nombre", e.target.value)}
                placeholder="Tu nombre"
                className={inputCls(errors.nombre)}
              />
              {errors.nombre && <p className="mt-1 text-xs text-red-400">{errors.nombre}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-white/50">
                Empresa / comercio
              </label>
              <input
                value={form.empresa}
                onChange={(e) => set("empresa", e.target.value)}
                placeholder="Nombre de tu negocio"
                className={inputCls()}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-white/50">
                Teléfono *
              </label>
              <input
                value={form.telefono}
                onChange={(e) => set("telefono", e.target.value)}
                placeholder="099 123 456"
                inputMode="tel"
                className={inputCls(errors.telefono)}
              />
              {errors.telefono && <p className="mt-1 text-xs text-red-400">{errors.telefono}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-white/50">
                Email
              </label>
              <input
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder="tucorreo@mail.com"
                inputMode="email"
                className={inputCls(errors.email)}
              />
              {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-white/50">
                Dirección *
              </label>
              <input
                value={form.direccion}
                onChange={(e) => set("direccion", e.target.value)}
                placeholder="Calle y número"
                className={inputCls(errors.direccion)}
              />
              {errors.direccion && <p className="mt-1 text-xs text-red-400">{errors.direccion}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-white/50">
                Ciudad *
              </label>
              <input
                value={form.ciudad}
                onChange={(e) => set("ciudad", e.target.value)}
                placeholder="Montevideo"
                className={inputCls(errors.ciudad)}
              />
              {errors.ciudad && <p className="mt-1 text-xs text-red-400">{errors.ciudad}</p>}
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-white/50">
                Forma de entrega
              </label>
              <select
                value={form.entrega}
                onChange={(e) => set("entrega", e.target.value)}
                className={`${inputCls()} appearance-none [&>option]:bg-navy-950`}
              >
                <option>Retira en depósito</option>
                <option>Envío a Montevideo</option>
                <option>Envío al interior</option>
                <option>Coordinación por chat</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-white/50">
                Comentarios
              </label>
              <textarea
                value={form.comentarios}
                onChange={(e) => set("comentarios", e.target.value)}
                rows={3}
                placeholder="Algún detalle sobre tu pedido..."
                className={`${inputCls()} resize-none`}
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gold-500 py-5 font-display text-sm font-bold uppercase tracking-widest text-navy-950 shadow-gold transition hover:bg-gold-400"
        >
          <Send className="h-5 w-5" />
          Enviar pedido por WhatsApp
        </button>
        <p className="text-center text-xs text-white/35">
          Al enviar se abre WhatsApp con tu pedido ya armado. Sin pago online
          por ahora: coordinamos factura y envío.
        </p>
      </form>

      <div className="h-fit rounded-3xl border border-white/10 bg-navy-900 p-6 sm:p-8 lg:sticky lg:top-32">
        <h2 className="font-display text-xl font-bold uppercase tracking-wide text-white">
          Resumen del pedido
        </h2>
        <ul className="mt-5 divide-y divide-white/5">
          {items.map(({ product, qty }) => (
            <li key={product.id} className="flex items-center gap-4 py-4">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-white/10">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-white">{product.name}</p>
                <p className="text-xs text-white/40">{formatMoney(product.price)} c/u</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQty(product.id, qty - 1)}
                  className="grid h-7 w-7 place-items-center rounded-md border border-white/10 text-white/70 hover:text-gold-400"
                  aria-label="Menos"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-6 text-center text-sm font-bold text-white">{qty}</span>
                <button
                  onClick={() => setQty(product.id, qty + 1)}
                  className="grid h-7 w-7 place-items-center rounded-md border border-white/10 text-white/70 hover:text-gold-400"
                  aria-label="Más"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="w-20 text-right font-bold text-gold-400">
                {formatMoney(product.price * qty)}
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-2 flex items-center justify-between border-t border-white/10 pt-4 text-sm text-white/60">
          <span>Subtotal</span>
          <span className="font-semibold text-white">{formatMoney(subtotal)}</span>
        </div>
        <div className="mt-2 flex items-baseline justify-between">
          <span className="font-display text-base font-bold uppercase tracking-widest text-white">Total</span>
          <span className="font-display text-3xl font-bold text-gold-400">{formatMoney(subtotal)}</span>
        </div>
        <a
          href={`https://wa.me/${SITE.whatsapp}`}
          target="_blank"
          rel="noreferrer"
          className="mt-5 flex items-center justify-center gap-2 rounded-xl border border-white/10 py-3 text-[12px] font-bold uppercase tracking-widest text-white/70 transition hover:border-gold-500 hover:text-gold-400"
        >
          <MessageCircle className="h-4 w-4" /> O consultá directo a {SITE.whatsappDisplay}
        </a>
      </div>
    </div>
  );
}