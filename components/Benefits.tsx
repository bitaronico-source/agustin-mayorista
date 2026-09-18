import { Truck, Percent, ShieldCheck, ClipboardList } from "lucide-react";

const BENEFITS = [
  {
    icon: Truck,
    title: "Envíos a todo el país",
    text: "Distribuimos a comercios de cada rincón de Uruguay.",
  },
  {
    icon: Percent,
    title: "Precios mayoristas",
    text: "Tarifas diferenciales pensadas para revender con margen.",
  },
  {
    icon: ShieldCheck,
    title: "Compra segura",
    text: "Trabajá con proveedor confiable, con años en el rubro.",
  },
  {
    icon: ClipboardList,
    title: "Facturación y atención personalizada",
    text: "Coordinamos pedidos y facturación según tu comercio.",
  },
];

export function Benefits() {
  return (
    <section className="border-y border-white/5 bg-navy-900">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        {BENEFITS.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gold-500/15 text-gold-400">
              <Icon className="h-6 w-6" />
            </span>
            <div>
              <h3 className="font-display text-sm font-bold uppercase tracking-widest text-white">
                {title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-white/50">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}