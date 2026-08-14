import { ShieldCheck, Award, FileBadge, Microscope } from "lucide-react";

const ACCREDITATIONS = [
  { icon: ShieldCheck, label: "KMPDC Licensed", sub: "Level-2 Clinic" },
  { icon: Microscope, label: "KMLTTB Class B", sub: "Laboratory" },
  { icon: Award, label: "Outpatient Care", sub: "Quality assured" },
  { icon: FileBadge, label: "KEPI Aligned", sub: "Immunisation" },
];

export default function Accreditations() {
  return (
    <section
      className="relative py-10 bg-white border-y border-line"
      aria-label="Accreditations"
    >
      <div className="container-page">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">
          Licensed &amp; aligned with Kenyan health authorities
        </p>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5">
          {ACCREDITATIONS.map((a) => (
            <div
              key={a.label}
              className="flex items-center gap-3 rounded-2xl border border-line bg-brand-50/40 px-4 py-3"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white border border-brand-100 text-brand-700">
                <a.icon className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-brand-900 truncate">
                  {a.label}
                </span>
                <span className="block text-xs text-ink-muted">{a.sub}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
