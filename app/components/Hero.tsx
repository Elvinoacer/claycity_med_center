import Image from "next/image";
import {
  Phone,
  CalendarClock,
  Star,
  ShieldCheck,
  Stethoscope,
  ArrowRight,
  HeartPulse,
  Baby,
  Syringe,
  HeartHandshake,
  TestTube,
} from "lucide-react";

const TRUST = [
  { icon: ShieldCheck, value: "KMPDC", label: "Licensed Level-2 clinic" },
  { icon: Stethoscope, value: "10+", label: "Outpatient services" },
  { icon: HeartPulse, value: "2018", label: "Serving Kasarani since" },
];

const QUICK_LINKS = [
  { icon: Baby, label: "Maternal & Child Health", href: "#services" },
  { icon: Syringe, label: "Immunisation", href: "#services" },
  { icon: HeartHandshake, label: "Family Planning", href: "#services" },
  { icon: TestTube, label: "Laboratory Tests", href: "#services" },
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden hero-wash grain"
      aria-labelledby="hero-heading"
    >
      {/* Decorative layers */}
      <div className="blob bg-brand-300 w-[30rem] h-[30rem] -top-36 -right-20" />
      <div className="blob bg-accent-200 w-[22rem] h-[22rem] -bottom-28 -left-24 opacity-40" />
      <div
        className="absolute inset-0 bg-dot-grid opacity-[0.35] [mask-image:radial-gradient(ellipse_60%_50%_at_75%_20%,black,transparent_75%)]"
        aria-hidden="true"
      />

      <div className="container-page relative z-10 pt-12 pb-16 md:pt-16 md:pb-24 lg:pt-20 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1.08fr_1fr] gap-12 lg:gap-16 items-center">
          {/* Copy */}
          <div className="fade-up">
            <span className="eyebrow">
              <span className="relative inline-flex h-2 w-2 text-brand-500 pulse-dot">
                <span className="h-2 w-2 rounded-full bg-brand-500" />
              </span>
              Open today · Walk-ins welcome
            </span>

            <h1
              id="hero-heading"
              className="mt-6 font-display text-[2.7rem] leading-[1.04] sm:text-5xl lg:text-[3.75rem] lg:leading-[1.02] font-semibold tracking-[-0.015em] text-brand-950 text-balance"
            >
              Compassionate care, close to home in{" "}
              <span className="relative inline-block text-gradient-brand italic">
                Kasarani
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-accent-400"
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

            <p className="mt-6 text-lg leading-relaxed text-ink-soft max-w-xl">
              Claycity Medical Centre is a licensed Level-2 outpatient clinic on
              First Street, Clay City. From maternal &amp; child health to lab
              tests and everyday consultations — we treat your family like ours.
            </p>

            {/* CTA row */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
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

            {/* Trust signals */}
            <dl className="mt-10 flex flex-wrap items-stretch gap-y-5 divide-x divide-line max-w-xl">
              {TRUST.map((t, i) => (
                <div
                  key={t.value}
                  className={`flex items-center gap-3 ${i === 0 ? "pr-6" : "px-6"}`}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/80 border border-brand-100 text-brand-600 shadow-sm">
                    <t.icon className="h-4.5 w-4.5" />
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

          {/* Visual */}
          <div
            className="relative fade-up lg:pt-6"
            style={{ animationDelay: "140ms" }}
          >
            {/* Decorative ring + dots behind the photo */}
            <div
              className="absolute -top-8 -left-8 h-28 w-28 rounded-full border-[10px] border-brand-200/60 hidden sm:block"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-6 -right-5 h-20 w-20 bg-dot-grid opacity-70 hidden sm:block"
              aria-hidden="true"
            />

            <div className="relative aspect-[16/11] rounded-[2rem] overflow-hidden shadow-2xl shadow-brand-900/25 ring-1 ring-brand-900/10">
              <Image
                src="/images/hero-clinic.jpg"
                alt="Welcoming consultation room at Claycity Medical Centre in Kasarani"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950/55 via-brand-950/5 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
                <span className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-semibold text-brand-900">
                  <span className="relative inline-flex h-1.5 w-1.5 text-brand-500 pulse-dot">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                  </span>
                  First Street · Clay City Estate
                </span>
              </div>
            </div>

            {/* Floating hours chip */}
            <div className="hidden sm:flex absolute -top-6 -right-2 lg:-right-6 items-center gap-2.5 glass rounded-2xl px-4 py-3 floaty">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-white shadow-md shadow-brand-600/40">
                <CalendarClock className="h-4 w-4" />
              </span>
              <div className="leading-tight">
                <p className="text-[11px] uppercase tracking-wide text-ink-muted font-semibold">
                  Open today
                </p>
                <p className="text-sm font-semibold text-brand-900">
                  8:00am – 5:00pm
                </p>
              </div>
            </div>

            {/* Floating rating card */}
            <div className="absolute -bottom-8 -left-2 sm:left-6 glass rounded-2xl p-4 w-[15.5rem] sm:w-[17rem] floaty-slow">
              <div className="flex items-center gap-1 text-accent-500">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
                <span className="ml-1 text-xs font-semibold text-ink-soft">
                  Trusted locally
                </span>
              </div>
              <p className="mt-1.5 text-sm text-ink-soft leading-snug">
                “Friendly staff and quick service. My family&rsquo;s go-to
                clinic in Clay City.”
              </p>
              <p className="mt-2 text-xs text-ink-muted">
                — Patient from Seasons estate
              </p>
            </div>
          </div>
        </div>

        {/* Quick links strip */}
        <div className="mt-16 lg:mt-20 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {QUICK_LINKS.map((q) => (
            <a
              key={q.label}
              href={q.href}
              className="group flex items-center gap-3 rounded-2xl glass px-4 py-3.5 hover:border-brand-300 hover:shadow-lg hover:shadow-brand-900/10 hover:-translate-y-0.5 transition-all duration-300"
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
