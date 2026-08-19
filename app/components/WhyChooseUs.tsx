import Image from "next/image";
import { Clock, ShieldCheck, TestTube, Phone, HeartPulse } from "lucide-react";
import Card3DTilt from "./interactive/Card3DTilt";
import consultationImg from "@/public/images/consultation.jpg";

const FEATURES = [
  {
    icon: Clock,
    title: "Same-Day Lab Diagnostics",
    desc: "Our on-site Class-B laboratory delivers routine blood and rapid tests on the same visit — saving you unnecessary return trips.",
  },
  {
    icon: HeartPulse,
    title: "Trusted by Local Families",
    desc: "Patients across Kasarani and Seasons estate have counted on us since 2018 for newborn care, vaccinations, and everyday recovery.",
  },
  {
    icon: ShieldCheck,
    title: "Fully Licensed & Regulated",
    desc: "Accredited by KMPDC as a Level-2 clinic and registered with KMLTTB. Clinical safety and hygiene are non-negotiable.",
  },
  {
    icon: TestTube,
    title: "Clean, Calm Environment",
    desc: "Bright consultation rooms, private examination areas, and an attentive nursing desk that knows you by name.",
  },
];

export default function WhyChooseUs() {
  return (
    <section
      id="why-us"
      className="relative py-16 md:py-24 overflow-hidden bg-canvas border-y border-line"
      aria-labelledby="why-heading"
    >
      <div className="container-page relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-center">
          <div className="relative" data-reveal>
            <Card3DTilt intensity={8} className="rounded-3xl">
              <div className="relative aspect-[5/4] rounded-3xl overflow-hidden ring-1 ring-brand-900/10 shadow-2xl shadow-brand-950/15 bg-brand-950">
                <Image
                  src={consultationImg}
                  alt="Doctor consulting a patient at Claycity Medical Centre"
                  fill
                  placeholder="blur"
                  sizes="(max-width: 1024px) 100vw, 46vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/70 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 glass px-3.5 py-1.5 rounded-full text-xs font-semibold text-brand-950 shadow-md">
                  First Street · Kasarani
                </div>
              </div>
            </Card3DTilt>

            <div className="absolute -bottom-6 -right-3 sm:right-6 glass rounded-2xl p-4 sm:p-5 max-w-xs floaty shadow-xl border border-brand-200/80">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent-500 to-accent-600 text-white shadow-lg shadow-accent-500/30">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-muted">
                    Quick Booking Desk
                  </p>
                  <a
                    href="tel:+254721260994"
                    className="font-display text-base sm:text-lg font-semibold text-brand-900"
                  >
                    0721 260994
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div data-reveal>
            <span className="eyebrow">Why Families Choose Us</span>
            <h2
              id="why-heading"
              className="mt-4 font-display text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.08] font-semibold tracking-[-0.01em] text-brand-950 heading-underline text-balance"
            >
              Reliable, unhurried healthcare built around your family
            </h2>
            <p className="mt-5 text-base sm:text-lg text-ink-soft leading-relaxed">
              We focus on the human details that matter: respectful communication, minimal waiting times, clear prescriptions, and thorough examinations.
            </p>

            <div className="mt-8 grid sm:grid-cols-2 gap-x-6 gap-y-6">
              {FEATURES.map((f) => (
                <div key={f.title} className="group flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700 border border-brand-200/60 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
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
