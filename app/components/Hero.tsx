import Image from "next/image";
import {
  Phone,
  CalendarClock,
  Star,
  ShieldCheck,
  Stethoscope,
  ArrowRight,
  HeartPulse,
} from "lucide-react";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden hero-wash"
      aria-labelledby="hero-heading"
    >
      {/* Decorative blobs */}
      <div className="blob bg-brand-300 w-[34rem] h-[34rem] -top-32 -right-24" />
      <div className="blob bg-accent-200 w-[24rem] h-[24rem] -bottom-24 -left-24" />

      <div className="container-page relative z-10 pt-12 pb-16 md:pt-16 md:pb-24 lg:pt-20 lg:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-14 items-center">
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
              className="mt-5 font-display text-[2.6rem] leading-[1.05] sm:text-5xl lg:text-[3.6rem] lg:leading-[1.04] font-semibold tracking-tight text-brand-950"
            >
              Compassionate care, close to home in{" "}
              <span className="text-gradient-brand">Kasarani</span>.
            </h1>

            <p className="mt-5 text-lg leading-relaxed text-ink-soft max-w-xl">
              Claycity Medical Centre is a licensed Level-2 outpatient clinic on
              First Street, Clay City. From maternal &amp; child health to lab
              tests and everyday consultations — we treat your family like ours.
            </p>

            {/* CTA row */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a href="#contact" className="btn btn-primary">
                <CalendarClock className="h-4 w-4" />
                Book a Visit
              </a>
              <a href="tel:+254721260994" className="btn btn-accent">
                <Phone className="h-4 w-4" />
                Call 0721 260994
              </a>
            </div>

            {/* Trust signals */}
            <dl className="mt-10 grid grid-cols-3 gap-4 max-w-xl">
              <div className="rounded-2xl bg-white/70 backdrop-blur border border-line p-4">
                <dt className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-ink-muted">
                  <ShieldCheck className="h-3.5 w-3.5 text-brand-600" />
                  Licensed
                </dt>
                <dd className="mt-1 font-display text-2xl font-semibold text-brand-900">
                  KMPDC
                </dd>
                <dd className="text-xs text-ink-muted">Level-2 Clinic</dd>
              </div>
              <div className="rounded-2xl bg-white/70 backdrop-blur border border-line p-4">
                <dt className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-ink-muted">
                  <Stethoscope className="h-3.5 w-3.5 text-brand-600" />
                  Services
                </dt>
                <dd className="mt-1 font-display text-2xl font-semibold text-brand-900">
                  10+
                </dd>
                <dd className="text-xs text-ink-muted">Outpatient care</dd>
              </div>
              <div className="rounded-2xl bg-white/70 backdrop-blur border border-line p-4">
                <dt className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-ink-muted">
                  <HeartPulse className="h-3.5 w-3.5 text-brand-600" />
                  Since
                </dt>
                <dd className="mt-1 font-display text-2xl font-semibold text-brand-900">
                  2018
                </dd>
                <dd className="text-xs text-ink-muted">Serving Kasarani</dd>
              </div>
            </dl>
          </div>

          {/* Visual */}
          <div className="relative fade-up" style={{ animationDelay: "120ms" }}>
            <div className="relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl shadow-brand-900/20 border-4 border-white">
              <Image
                src="/images/hero-clinic.jpg"
                alt="Welcoming reception at Claycity Medical Centre in Kasarani"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950/40 via-transparent to-transparent" />
            </div>

            {/* Floating rating card */}
            <div className="absolute -bottom-5 -left-3 sm:left-6 card-soft p-4 w-[15rem] sm:w-[17rem]">
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

            {/* Floating hours chip */}
            <div className="hidden sm:flex absolute -top-4 -right-3 lg:right-6 items-center gap-2.5 card-soft px-4 py-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-brand-700">
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
          </div>
        </div>

        {/* Quick links strip */}
        <div className="mt-14 lg:mt-20 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {[
            { label: "Maternal & Child Health", href: "#services" },
            { label: "Immunisation", href: "#services" },
            { label: "Family Planning", href: "#services" },
            { label: "Laboratory Tests", href: "#services" },
          ].map((q) => (
            <a
              key={q.label}
              href={q.href}
              className="group flex items-center justify-between rounded-2xl bg-white/80 backdrop-blur border border-line px-4 py-3.5 hover:border-brand-300 hover:bg-white transition-all"
            >
              <span className="text-sm font-medium text-ink-soft group-hover:text-brand-700">
                {q.label}
              </span>
              <ArrowRight className="h-4 w-4 text-brand-500 group-hover:translate-x-0.5 transition-transform" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
