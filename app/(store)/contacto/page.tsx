import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, MessageCircle, ArrowRight } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contactate con Agustín Mayorista: WhatsApp, teléfono, email, ubicación y horarios de atención. Asesoramiento para tu comercio.",
};

const CHANNELS = [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: SITE.whatsappDisplay,
    href: `https://wa.me/${SITE.whatsapp}`,
    note: "Respuesta en el día",
    external: true,
  },
  {
    icon: Phone,
    title: "Teléfono",
    value: SITE.phone,
    href: `tel:${SITE.phone.replace(/\s/g, "")}`,
    note: "Lunes a Sábados",
  },
  {
    icon: Mail,
    title: "Email",
    value: SITE.email,
    href: `mailto:${SITE.email}`,
    note: "Ventas y facturación",
  },
  {
    icon: MapPin,
    title: "Ubicación",
    value: SITE.address,
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.address)}`,
    note: "Montevideo, Uruguay",
  },
];

export default function ContactoPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[12px] font-bold uppercase tracking-[0.4em] text-gold-400">
            Contacto
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold uppercase tracking-tight text-white sm:text-5xl">
            Hablemos de tu <span className="text-gold-400">negocio</span>
          </h1>
          <p className="mt-4 text-white/60">
            Escribinos por WhatsApp, llamanos o dejanos tus datos. Respondemos
            todos los mensajes en el día.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CHANNELS.map(({ icon: Icon, title, value, href, note, external }) => (
            <a
              key={title}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer" : undefined}
              className="group rounded-2xl border border-white/10 bg-navy-900 p-5 transition hover:-translate-y-1 hover:border-gold-500/40 hover:shadow-card"
            >
              <div className="flex items-start justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gold-500/15 text-gold-400">
                  <Icon className="h-5 w-5" />
                </span>
                <ArrowRight className="h-5 w-5 text-white/20 transition group-hover:translate-x-1 group-hover:text-gold-400" />
              </div>
              <h3 className="mt-4 font-display text-sm font-bold uppercase tracking-widest text-white">{title}</h3>
              <p className="mt-1.5 text-sm font-semibold text-gold-400">{value}</p>
              <p className="mt-1 text-xs text-white/40">{note}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="border-t border-white/5 bg-navy-900/60">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-white">
              Enviá tu <span className="text-gold-400">consulta</span>
            </h2>
            <p className="mt-3 max-w-lg text-white/60">
              Completá el formulario y al enviar se arma tu mensaje de WhatsApp
              con todos tus datos, listo para mandar.
            </p>
            <div className="mt-8 space-y-5">
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-gold-400" />
                <div>
                  <p className="text-sm font-bold uppercase tracking-widest text-white">Horarios de atención</p>
                  <p className="mt-1 text-sm text-white/60">
                    {SITE.hoursLunVie}
                    <br />
                    {SITE.hoursSab}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold-400" />
                <div>
                  <p className="text-sm font-bold uppercase tracking-widest text-white">Depósito y showroom</p>
                  <p className="mt-1 text-sm text-white/60">{SITE.address}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-navy-900 p-6 sm:p-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}