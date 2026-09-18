"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { SITE } from "@/lib/site";

export function ContactForm() {
  const [form, setForm] = useState({ nombre: "", email: "", tema: "Consulta general", mensaje: "" });
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hola Agustín Mayorista 👋\n\nNombre: ${form.nombre}\nEmail: ${form.email || "-"}\nTema: ${form.tema}\n\n${form.mensaje}`;
    window.open(
      `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
    setSent(true);
    setForm({ nombre: "", email: "", tema: "Consulta general", mensaje: "" });
  };

  const cls =
    "w-full rounded-xl border bg-navy-950 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition border-white/10 focus:border-gold-500/60";

  return (
    <form onSubmit={submit} className="space-y-4">
      {sent && (
        <div className="flex items-center gap-3 rounded-xl border border-green-500/40 bg-green-500/10 px-4 py-3 text-sm text-green-400">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          Mensaje listo: lo abrimos en WhatsApp para que lo envíes.
        </div>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          required
          value={form.nombre}
          onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))}
          placeholder="Tu nombre *"
          className={cls}
        />
        <input
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          placeholder="Tu email"
          inputMode="email"
          className={cls}
        />
      </div>
      <select
        value={form.tema}
        onChange={(e) => setForm((f) => ({ ...f, tema: e.target.value }))}
        className={`${cls} appearance-none [&>option]:bg-navy-950`}
      >
        <option>Consulta general</option>
        <option>Quiero ser cliente mayorista</option>
        <option>Envíos y entregas</option>
        <option>Facturación</option>
        <option>Otro</option>
      </select>
      <textarea
        required
        value={form.mensaje}
        onChange={(e) => setForm((f) => ({ ...f, mensaje: e.target.value }))}
        rows={5}
        placeholder="Contanos qué necesitás... *"
        className={`${cls} resize-none`}
      />
      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-gold-500 py-4 font-display text-sm font-bold uppercase tracking-widest text-navy-950 transition hover:bg-gold-400"
      >
        <Send className="h-5 w-5" /> Enviar por WhatsApp
      </button>
    </form>
  );
}