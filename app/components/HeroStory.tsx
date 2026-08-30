"use client";

import Image from "next/image";
import {
  ArrowRight,
  CalendarClock,
  HeartPulse,
  MapPin,
  Phone,
  Pill,
  ShieldCheck,
  TestTube,
} from "lucide-react";
import OpenStatus from "./OpenStatus";
import heroClinic from "@/public/images/hero-clinic.jpg";
import maternityCare from "@/public/images/maternity-care.jpg";
import pharmacy from "@/public/images/pharmacy-dispensary.jpg";
import lab from "@/public/images/lab-services.jpg";

export default function HeroStory() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] overflow-hidden bg-[#07191d] text-[#effbf5]"
      aria-labelledby="hero-heading"
    >
      {/* Full-bleed stage image */}
      <div className="absolute inset-0">
        <Image
          src={heroClinic}
          alt=""
          fill
          priority
          placeholder="blur"
          sizes="100vw"
          className="object-cover object-[center_30%] scale-105"
        />
        {/* Cinematic overlays */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(7,25,29,0.92) 0%, rgba(7,25,29,0.72) 38%, rgba(7,25,29,0.35) 62%, rgba(7,25,29,0.55) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(7,25,29,0.45) 0%, transparent 28%, transparent 55%, rgba(7,25,29,0.88) 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.12] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.6) 0.55px, transparent 0.55px)",
            backgroundSize: "16px 16px",
            mixBlendMode: "overlay",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-[100svh] flex-col">
        <div className="container-page flex flex-1 flex-col justify-end pb-10 pt-28 sm:pb-14 sm:pt-32 lg:pb-16 lg:pt-36">
          {/* Top meta row */}
          <div className="mb-auto flex flex-wrap items-center gap-2.5">
            <OpenStatus />
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/8 px-3 py-1.5 text-[11px] font-semibold text-white/75 backdrop-blur-md">
              <MapPin className="h-3 w-3 text-[#a8dfd6]" />
              First Street · Clay City, Kasarani
            </span>
          </div>

          <div className="mt-10 grid grid-cols-1 items-end gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
            {/* Main editorial block */}
            <div className="max-w-2xl">
              <p className="mb-4 inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#ff9e7d]">
                <span className="h-px w-8 bg-[#ff9e7d]/70" />
                Neighbourhood outpatient care
              </p>

              <h1
                id="hero-heading"
                className="font-display text-[2.75rem] font-medium leading-[0.95] tracking-[-0.04em] text-balance sm:text-6xl lg:text-[4.6rem] lg:leading-[0.92]"
              >
                Care that
                <br />
                <span className="italic text-[#a8dfd6]">knows</span> your
                <br />
                neighbourhood.
              </h1>

              <p className="mt-6 max-w-md text-base leading-relaxed text-white/70 sm:text-lg">
                Licensed Level-2 clinic on First Street. Maternal & child
                health, same-visit lab results, and an in-house pharmacy —
                without the hospital rush.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-[#ff9e7d] px-6 py-3.5 text-sm font-extrabold text-[#07191d] shadow-[0_16px_36px_rgba(255,158,125,0.3)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_44px_rgba(255,158,125,0.38)]"
                >
                  <CalendarClock className="h-4 w-4" />
                  Book a Visit
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </a>
                <a
                  href="tel:+254721260994"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-3.5 text-sm font-bold text-white backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:bg-white/15"
                >
                  <Phone className="h-4 w-4" />
                  0721 260994
                </a>
              </div>
            </div>

            {/* Floating glass stack — the creative side */}
            <div className="relative flex flex-col gap-3 sm:gap-3.5 lg:pb-2">
              {/* Trust glass card */}
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4 shadow-xl backdrop-blur-xl sm:p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-white/50">
                      Credentials
                    </p>
                    <p className="mt-1.5 font-display text-lg font-medium leading-snug text-white sm:text-xl">
                      KMPDC Level-2
                      <br />
                      <span className="text-[#a8dfd6]">Class-B laboratory</span>
                    </p>
                  </div>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#a8dfd6]/15 text-[#a8dfd6]">
                    <ShieldCheck className="h-5 w-5" />
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 border-t border-white/10 pt-3.5">
                  <div>
                    <p className="font-display text-base font-semibold text-white">2018</p>
                    <p className="text-[10px] text-white/45">Serving Kasarani</p>
                  </div>
                  <div>
                    <p className="font-display text-base font-semibold text-white">Mon–Sat</p>
                    <p className="text-[10px] text-white/45">Open six days</p>
                  </div>
                  <div>
                    <p className="font-display text-base font-semibold text-white">Walk-in</p>
                    <p className="text-[10px] text-white/45">Always welcome</p>
                  </div>
                </div>
              </div>

              {/* Mini photo cards row */}
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                <div className="group relative aspect-[3/4] overflow-hidden rounded-xl border border-white/15">
                  <Image
                    src={maternityCare}
                    alt="Maternal care"
                    fill
                    sizes="120px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07191d]/80 to-transparent" />
                  <span className="absolute bottom-2 left-2 text-[10px] font-bold text-white/90">
                    Maternal
                  </span>
                </div>
                <div className="group relative aspect-[3/4] overflow-hidden rounded-xl border border-white/15">
                  <Image
                    src={lab}
                    alt="Laboratory"
                    fill
                    sizes="120px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07191d]/80 to-transparent" />
                  <span className="absolute bottom-2 left-2 text-[10px] font-bold text-white/90">
                    Lab
                  </span>
                </div>
                <div className="group relative aspect-[3/4] overflow-hidden rounded-xl border border-white/15">
                  <Image
                    src={pharmacy}
                    alt="Pharmacy"
                    fill
                    sizes="120px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07191d]/80 to-transparent" />
                  <span className="absolute bottom-2 left-2 text-[10px] font-bold text-white/90">
                    Pharmacy
                  </span>
                </div>
              </div>

              {/* Quick facts strip */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl border border-white/12 bg-white/8 px-4 py-3 backdrop-blur-lg">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-white/80">
                  <TestTube className="h-3.5 w-3.5 text-[#a8dfd6]" />
                  Same-visit results
                </span>
                <span className="hidden h-3 w-px bg-white/20 sm:block" />
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-white/80">
                  <Pill className="h-3.5 w-3.5 text-[#ff9e7d]" />
                  In-house pharmacy
                </span>
                <span className="hidden h-3 w-px bg-white/20 sm:block" />
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-white/80">
                  <HeartPulse className="h-3.5 w-3.5 text-[#a8dfd6]" />
                  KEPI immunisation
                </span>
              </div>
            </div>
          </div>

          {/* Bottom service jump links */}
          <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-white/10 pt-6 sm:mt-12">
            <span className="mr-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-white/40">
              Explore
            </span>
            {[
              { label: "Care", href: "#care" },
              { label: "The visit", href: "#story" },
              { label: "The clinic", href: "#clinic" },
              { label: "Find us", href: "#visit" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-white/75 transition-all duration-300 hover:border-white/25 hover:bg-white/10 hover:text-white"
              >
                {item.label}
                <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-70 group-hover:translate-x-0" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
