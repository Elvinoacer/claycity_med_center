import {
  Phone,
  CalendarClock,
  ShieldCheck,
  Stethoscope,
  ArrowRight,
  HeartPulse,
  Baby,
  Syringe,
  Pill,
  TestTube,
  Sparkles,
} from "lucide-react";
import Hero3DStage from "./interactive/Hero3DStage";
import HeroCanvas from "./interactive/HeroCanvas";
import OpenStatus from "./OpenStatus";

const TRUST = [
  { icon: ShieldCheck, value: "KMPDC", label: "Licensed Level-2 clinic" },
  { icon: Stethoscope, value: "10+", label: "Outpatient services" },
  { icon: HeartPulse, value: "2018", label: "Serving Kasarani since" },
];

const QUICK_LINKS = [
  { icon: Baby, label: "Maternal & Child Health", href: "#services" },
  { icon: Syringe, label: "Childhood Immunisation", href: "#services" },
  { icon: Pill, label: "In-House Pharmacy", href: "#services" },
  { icon: TestTube, label: "Laboratory Diagnostics", href: "#services" },
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden hero-wash pt-3 pb-14 sm:pt-6 sm:pb-20 md:pt-8 md:pb-24 lg:min-h-[min(calc(100svh-6rem),58rem)] lg:flex lg:items-center"
      aria-labelledby="hero-heading"
    >
      <HeroCanvas />
      <div className="hero-orbs" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-dot-grid opacity-[0.18] [mask-image:radial-gradient(ellipse_60%_50%_at_70%_25%,black,transparent_80%)] pointer-events-none"
        aria-hidden="true"
      />

      <div className="container-page relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.02fr_1.08fr] gap-10 lg:gap-14 items-center">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <OpenStatus />
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 border border-brand-200/80 text-[11px] font-semibold text-brand-700 backdrop-blur-sm">
                <Sparkles className="h-3 w-3 text-brand-500" />
                First Street, Clay City
              </span>
            </div>

            <h1
              id="hero-heading"
              className="mt-5 sm:mt-6 font-display text-[2.05rem] leading-[1.08] sm:text-5xl lg:text-[3.65rem] lg:leading-[1.02] font-semibold tracking-[-0.025em] text-brand-950 text-balance"
            >
              Compassionate care, close to home in{" "}
              <span className="relative inline-block text-gradient-brand italic">
                Kasarani
                <svg
                  className="absolute -bottom-1.5 left-0 w-full h-2.5 text-accent-500"
                  viewBox="0 0 120 12"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 9C25 3.5 65 2 118 7"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    opacity="0.85"
                  />
                </svg>
              </span>
              .
            </h1>

            <p className="mt-5 sm:mt-6 text-base sm:text-lg leading-relaxed text-ink-soft max-w-xl">
              A licensed Level-2 outpatient clinic on First Street. Maternal
              &amp; child health, lab diagnostics, an in-house pharmacy, and
              everyday consultations — with the warmth of a neighbourhood
              practice.
            </p>

            <div className="mt-7 sm:mt-8 flex flex-wrap items-center gap-3">
              <a href="#contact" className="btn btn-primary group">
                <CalendarClock className="h-4 w-4" />
                Book a Visit
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
              <a href="tel:+254721260994" className="btn btn-accent">
                <Phone className="h-4 w-4" />
                Call 0721 260994
              </a>
            </div>

            <dl className="mt-9 sm:mt-11 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl">
              {TRUST.map((t) => (
                <div key={t.value} className="flex items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/80 border border-brand-100 text-brand-600 shadow-sm backdrop-blur-sm">
                    <t.icon className="h-5 w-5" />
                  </span>
                  <div className="leading-tight">
                    <dd className="font-display text-xl font-semibold text-brand-900">
                      {t.value}
                    </dd>
                    <dt className="text-xs text-ink-muted mt-0.5">{t.label}</dt>
                  </div>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <Hero3DStage />
          </div>
        </div>

        <div className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {QUICK_LINKS.map((q) => (
            <a
              key={q.label}
              href={q.href}
              className="group svc-3d flex items-center gap-3 rounded-2xl card-soft px-4 py-3.5 hover:border-brand-300"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
                <q.icon className="h-4.5 w-4.5" />
              </span>
              <span className="text-sm font-medium text-ink-soft group-hover:text-brand-800 transition-colors">
                {q.label}
              </span>
              <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-brand-400 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
