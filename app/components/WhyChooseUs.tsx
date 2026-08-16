import Image from "next/image";
import { Clock, ShieldCheck, TestTube, Phone, Sparkles } from "lucide-react";

const FEATURES = [
  {
    icon: Clock,
    title: "Same-day lab results",
    desc: "Our Class-B on-site laboratory runs most routine tests the same visit — no second trip across town.",
  },
  {
    icon: Sparkles,
    title: "Trusted by families",
    desc: "Many of our patients have been with us since 2018, returning for every new baby and every seasonal illness.",
  },
  {
    icon: ShieldCheck,
    title: "Properly licensed",
    desc: "Registered with KMPDC as a Level-2 clinic and with KMLTTB for laboratory services. Your safety is non-negotiable.",
  },
  {
    icon: TestTube,
    title: "Clean & calm space",
    desc: "A bright, hygienic clinic with private consultation rooms and a friendly reception that knows your name.",
  },
];

export default function WhyChooseUs() {
  return (
    <section
      className="cv-auto relative py-20 md:py-28 overflow-hidden"
      aria-labelledby="why-heading"
    >
      <div className="blob bg-brand-300 w-[26rem] h-[26rem] top-16 -left-32 opacity-25" />

      <div className="container-page relative">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-14 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative reveal-fade">
            <div
              className="absolute -bottom-8 -left-6 h-24 w-24 bg-dot-grid opacity-60"
              aria-hidden="true"
            />
            <div className="relative aspect-[5/4] rounded-3xl overflow-hidden ring-1 ring-brand-900/10 shadow-2xl shadow-brand-900/20">
              <Image
                src="/images/consultation.jpg"
                alt="Doctor consulting a patient at Claycity Medical Centre"
                fill
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950/35 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-3 sm:right-6 glass rounded-2xl p-5 max-w-xs floaty">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-accent-400 to-accent-600 text-white shadow-lg shadow-accent-500/40">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-muted">
                    Booking line
                  </p>
                  <p className="font-display text-lg font-semibold text-brand-900">
                    0721 260994
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Copy */}
          <div className="reveal">
            <span className="eyebrow">Why choose us</span>
            <h2
              id="why-heading"
              className="mt-4 font-display text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.08] font-semibold tracking-[-0.01em] text-brand-950 heading-underline text-balance"
            >
              The little clinic that families in Clay City trust
            </h2>
            <p className="mt-6 text-lg text-ink-soft leading-relaxed">
              We may be small, but we sweat every detail — from the cleanliness
              of the consultation room to the warmth of the voice on the phone.
              Here&rsquo;s what makes Claycity Medical Centre different.
            </p>

            <div className="mt-8 grid sm:grid-cols-2 gap-x-6 gap-y-6">
              {FEATURES.map((f) => (
                <div key={f.title} className="group flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700 border border-brand-100 group-hover:bg-brand-600 group-hover:text-white group-hover:border-transparent transition-colors duration-300">
                    <f.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-semibold text-brand-950">
                      {f.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                      {f.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
