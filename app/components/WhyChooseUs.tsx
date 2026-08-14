import Image from "next/image";
import { Clock, ShieldCheck, TestTube, Phone, Heart } from "lucide-react";

const FEATURES = [
  {
    icon: Clock,
    title: "Same-day lab results",
    desc: "Our Class-B on-site laboratory runs most routine tests the same visit — no second trip across town.",
  },
  {
    icon: Heart,
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
      className="relative py-20 md:py-28 overflow-hidden"
      aria-labelledby="why-heading"
    >
      <div className="blob bg-brand-300 w-[28rem] h-[28rem] top-10 -left-32 opacity-30" />

      <div className="container-page relative">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="relative aspect-[5/4] rounded-3xl overflow-hidden border-4 border-white shadow-xl">
              <Image
                src="/images/consultation.jpg"
                alt="Doctor consulting a patient at Claycity Medical Centre"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-3 sm:right-6 card-soft p-5 max-w-xs">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-100 text-accent-600">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
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
          <div>
            <span className="eyebrow">Why choose us</span>
            <h2
              id="why-heading"
              className="mt-4 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold tracking-tight text-brand-950 heading-underline"
            >
              The little clinic that families in Clay City trust
            </h2>
            <p className="mt-5 text-lg text-ink-soft leading-relaxed">
              We may be small, but we sweat every detail — from the cleanliness
              of the consultation room to the warmth of the voice on the phone.
              Here&rsquo;s what makes Claycity Medical Centre different.
            </p>

            <div className="mt-8 grid sm:grid-cols-2 gap-5">
              {FEATURES.map((f) => (
                <div key={f.title} className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700 border border-brand-100">
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
