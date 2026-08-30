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
  Stethoscope,
  Syringe,
  TestTube,
  Baby,
} from "lucide-react";
import OpenStatus from "./OpenStatus";
import heroClinic from "@/public/images/hero-clinic.jpg";

const TRUST = [
  { icon: ShieldCheck, value: "KMPDC", label: "Licensed Level-2" },
  { icon: TestTube, value: "Class-B", label: "On-site laboratory" },
  { icon: HeartPulse, value: "2018", label: "Serving Kasarani" },
];

const QUICK_SERVICES = [
  { icon: Baby, label: "Maternal & Child", href: "#care" },
  { icon: Syringe, label: "Immunisation", href: "#care" },
  { icon: TestTube, label: "Laboratory", href: "#care" },
  { icon: Pill, label: "Pharmacy", href: "#care" },
  { icon: Stethoscope, label: "Consultation", href: "#care" },
];

export default function HeroStory() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-[#07191d] text-[#effbf5]"
      aria-labelledby="hero-heading"
    >
      {/* Atmosphere */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.55) 0.6px, transparent 0.6px)",
            backgroundSize: "18px 18px",
            mixBlendMode: "overlay",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 75% 30%, rgba(168,223,214,0.18), transparent 65%), linear-gradient(180deg, rgba(7,25,29,0.2) 0%, transparent 40%, rgba(7,25,29,0.75) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 container-page pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
          {/* Copy */}
          <div className="max-w-xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <OpenStatus />
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] font-semibold text-white/70 backdrop-blur-sm">
                <MapPin className="h-3 w-3 text-[#a8dfd6]" />
                First Street, Clay City
              </span>
            </div>

            <h1
              id="hero-heading"
              className="mt-6 font-display text-[2.35rem] leading-[1.05] sm:text-5xl lg:text-[3.55rem] lg:leading-[1.02] font-medium tracking-[-0.035em] text-balance"
            >
              Compassionate care,{" "}
              <span className="italic text-[#ff9e7d]">close to home</span>{" "}
              in Kasarani.
            </h1>

            <p className="mt-5 text-base sm:text-lg leading-relaxed text-white/70 max-w-lg">
              Licensed Level-2 outpatient clinic. Maternal & child health,
              laboratory diagnostics, in-house pharmacy, and everyday
              consultations — with the warmth of a neighbourhood practice.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full bg-[#ff9e7d] px-6 py-3.5 text-sm font-extrabold text-[#07191d] shadow-[0_14px_30px_rgba(255,158,125,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(255,158,125,0.35)]"
              >
                <CalendarClock className="h-4 w-4" />
                Book a Visit
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
              <a
                href="tel:+254721260994"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-5 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/40"
              >
                <Phone className="h-4 w-4" />
                0721 260994
              </a>
            </div>

            {/* Trust row */}
            <dl className="mt-10 grid grid-cols-3 gap-4 max-w-md">
              {TRUST.map((t) => (
                <div key={t.value} className="flex flex-col gap-1.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/8 border border-white/10 text-[#a8dfd6]">
                    <t.icon className="h-4 w-4" />
                  </span>
                  <div>
                    <dd className="font-display text-lg font-semibold text-white leading-none">
                      {t.value}
                    </dd>
                    <dt className="mt-1 text-[11px] text-white/50 font-medium">
                      {t.label}
                    </dt>
                  </div>
                </div>
              ))}
            </dl>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-white/15 shadow-[0_32px_64px_rgba(0,0,0,0.35)]">
              <Image
                src={heroClinic}
                alt="Welcoming clinician at Claycity Medical Centre"
                fill
                priority
                placeholder="blur"
                sizes="(max-width: 1024px) 90vw, 42vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 45%, rgba(7,25,29,0.7) 100%)",
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-white/55">
                  Neighbourhood care
                </p>
                <p className="mt-1 font-display text-xl sm:text-2xl font-medium text-white leading-tight">
                  You are a neighbour, not a queue number.
                </p>
              </div>
            </div>

            {/* Floating accent cards */}
            <div className="absolute -left-3 top-[18%] hidden sm:flex items-center gap-2.5 rounded-2xl border border-white/20 bg-[#0a282c]/90 px-3.5 py-2.5 shadow-lg backdrop-blur-md">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#a8dfd6]/15 text-[#a8dfd6]">
                <TestTube className="h-4 w-4" />
              </span>
              <div className="leading-tight">
                <p className="text-[10px] font-bold uppercase tracking-wider text-white/50">
                  Same visit
                </p>
                <p className="text-xs font-semibold text-white">Lab results</p>
              </div>
            </div>

            <div className="absolute -right-2 bottom-[22%] hidden sm:flex items-center gap-2.5 rounded-2xl border border-white/20 bg-[#0a282c]/90 px-3.5 py-2.5 shadow-lg backdrop-blur-md">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#ff9e7d]/15 text-[#ff9e7d]">
                <Pill className="h-4 w-4" />
              </span>
              <div className="leading-tight">
                <p className="text-[10px] font-bold uppercase tracking-wider text-white/50">
                  On-site
                </p>
                <p className="text-xs font-semibold text-white">Pharmacy</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick service chips */}
        <div className="mt-12 sm:mt-14 flex flex-wrap gap-2.5">
          {QUICK_SERVICES.map((s) => (
            <a
              key={s.label}
              href={s.href}
              className="group inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2.5 text-xs font-semibold text-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/25 hover:text-white"
            >
              <s.icon className="h-3.5 w-3.5 text-[#a8dfd6] transition-colors group-hover:text-[#ff9e7d]" />
              {s.label}
              <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-60 group-hover:translate-x-0" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
