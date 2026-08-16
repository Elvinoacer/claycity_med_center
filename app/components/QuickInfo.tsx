import { Phone, Clock, MapPin, Mail } from "lucide-react";

const ITEMS = [
  {
    icon: Phone,
    label: "Call or WhatsApp",
    value: "0721 260994",
    href: "tel:+254721260994",
    sub: "Booking & inquiries",
  },
  {
    icon: Clock,
    label: "Opening Hours",
    value: "Mon–Fri 8am–5pm",
    href: "#location",
    sub: "Sat 8am–12pm · Sun closed",
  },
  {
    icon: MapPin,
    label: "Find Us",
    value: "First Street, Clay City",
    href: "#location",
    sub: "Kasarani, Nairobi",
  },
  {
    icon: Mail,
    label: "Email",
    value: "nabiclaycitymedical@yahoo.com",
    href: "mailto:nabiclaycitymedical@yahoo.com",
    sub: "We reply within 24h",
  },
];

export default function QuickInfo() {
  return (
    <section className="relative z-10 -mt-1" aria-label="Quick info">
      <div className="container-page">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {ITEMS.map((it) => (
            <a
              key={it.label}
              href={it.href}
              className="card-soft group flex items-start gap-3.5 p-4 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] transition-all duration-300"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700 group-hover:bg-brand-600 group-hover:text-white group-hover:shadow-md group-hover:shadow-brand-600/40 transition-all duration-300">
                <it.icon className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-[11px] font-semibold uppercase tracking-wide text-ink-muted">
                  {it.label}
                </span>
                <span className="block text-sm font-semibold text-brand-900 truncate">
                  {it.value}
                </span>
                <span className="block text-xs text-ink-muted">{it.sub}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
