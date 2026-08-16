import {
  ShieldCheck,
  Award,
  FileBadge,
  Microscope,
  Clock,
  Wallet,
  Footprints,
  CalendarCheck,
} from "lucide-react";

const ITEMS = [
  { icon: ShieldCheck, label: "KMPDC Licensed · Level-2 Clinic" },
  { icon: Microscope, label: "KMLTTB Class B Laboratory" },
  { icon: FileBadge, label: "KEPI-Aligned Immunisation" },
  { icon: Award, label: "Quality Outpatient Care" },
  { icon: Clock, label: "Same-Day Lab Results" },
  { icon: Wallet, label: "M-Pesa & Cash Accepted" },
  { icon: Footprints, label: "Walk-Ins Welcome" },
  { icon: CalendarCheck, label: "Open Mon–Sat" },
];

export default function Accreditations() {
  return (
    <section
      className="relative py-8 bg-white border-y border-line overflow-hidden"
      aria-label="Accreditations"
    >
      <div className="container-page">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-muted">
          Licensed &amp; aligned with Kenyan health authorities
        </p>
      </div>

      {/* Slow marquee: duplicated list is aria-hidden and purely presentational */}
      <div className="marquee-mask mt-5" aria-hidden="true">
        <div className="marquee-track px-1.5">
          {[...ITEMS, ...ITEMS].map((a, i) => (
            <span
              key={`${a.label}-${i}`}
              className="mr-3 inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border border-line bg-canvas/80 px-4 py-2.5 text-sm font-medium text-ink-soft"
            >
              <a.icon className="h-4 w-4 text-brand-600" />
              {a.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
