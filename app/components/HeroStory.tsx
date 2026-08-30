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
      <div className="absolute inset-0">
        <Image
          src={heroClinic}
          alt=""
          fill
          priority
          placeholder="blur"
          sizes="100vw"
          className="object-cover object-[68%_28%] sm:object-[60%_30%] lg:object-[center_28%] scale-[1.08] sm:scale-105"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(7,25,29,0.72) 0%, rgba(7,25,29,0.55) 32%, rgba(7,25,29,0.45) 55%, rgba(7,25,29,0.92) 100%)",
          }}
        />
        <div
          className="absolute inset-0 hidden sm:block"
          style={{
            background:
              "linear-gradient(105deg, rgba(7,25,29,0.88) 0%, rgba(7,25,29,0.55) 42%, rgba(7,25,29,0.28) 70%, rgba(7,25,29,0.5) 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.1] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.55) 0.5px, transparent 0.5px)",
            backgroundSize: "14px 14px",
            mixBlendMode: "overlay",
          }}
        />
      </div>

      <div className="relative z-10 flex min-h-[100svh] flex-col">
        <div className="container-page flex flex-1 flex-col justify-end pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-[5.75rem] sm:pb-12 sm:pt-28 lg:pb-16 lg:pt-36">
          <div className="mb-auto flex flex-wrap items-center gap-1.5 sm:gap-2.5">
            <OpenStatus />
            <span className="inline-flex max-w-full items-center gap-1 rounded-full border border-white/15 bg-white/8 px-2.5 py-1 text-[10px] font-semibold text-white/70 backdrop-blur-md sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-[11px]">
              <MapPin className="h-2.5 w-2.5 shrink-0 text-[#a8dfd6] sm:h-3 sm:w-3" />
              <span className="truncate">First Street · Clay City</span>
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 items-end gap-6 sm:mt-10 sm:gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
            <div className="max-w-2xl">
              <p className="mb-2.5 inline-flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#ff9e7d] sm:mb-4 sm:gap-2 sm:text-[11px] sm:tracking-[0.2em]">
                <span className="h-px w-5 bg-[#ff9e7d]/70 sm:w-8" />
                Neighbourhood outpatient care
              </p>

              <h1
                id="hero-heading"
                className="font-display font-medium tracking-[-0.04em] text-balance"
                style={{
                  fontSize: "clamp(2.05rem, 8.2vw, 4.6rem)",
                  lineHeight: 0.94,
                }}
              >
                Care that{" "}
                <span className="italic text-[#a8dfd6]">knows</span>{" "}
                <br className="hidden xs:block sm:hidden" />
                your neighbourhood.
              </h1>

              <p className="mt-3.5 max-w-md text-[0.9rem] leading-relaxed text-white/70 sm:mt-6 sm:text-base sm:text-lg">
                Licensed Level-2 clinic on First Street. Maternal & child
                health, same-visit lab, and an in-house pharmacy — without the
                hospital rush.
              </p>

              <div className="mt-5 flex w-full flex-col gap-2.5 sm:mt-8 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
                <a
                  href="#contact"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#ff9e7d] px-5 py-3.5 text-[0.8125rem] font-extrabold text-[#07191d] shadow-[0_14px_32px_rgba(255,158,125,0.28)] transition-all duration-300 active:scale-[0.98] sm:w-auto sm:gap-2.5 sm:px-6 sm:text-sm sm:hover:-translate-y-1"
                >
                  <CalendarClock className="h-4 w-4 shrink-0" />
                  Book a Visit
                  <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5" />
                </a>
                <a
                  href="tel:+254712265746"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-3.5 text-[0.8125rem] font-bold text-white backdrop-blur-md transition-all duration-300 active:scale-[0.98] sm:w-auto sm:text-sm sm:hover:border-white/40 sm:hover:bg-white/15"
                >
                  <Phone className="h-4 w-4 shrink-0" />
                  0712 265746
                </a>
              </div>
            </div>

            <div className="relative flex flex-col gap-2.5 sm:gap-3.5 lg:pb-2">
              <div className="rounded-xl border border-white/15 bg-white/10 p-3.5 shadow-xl backdrop-blur-xl sm:rounded-2xl sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-white/50 sm:text-[10px] sm:tracking-[0.16em]">
                      Credentials
                    </p>
                    <p className="mt-1 font-display text-[1.05rem] font-medium leading-snug text-white sm:mt-1.5 sm:text-xl">
                      KMPDC Level-2{" "}
                      <span className="text-[#a8dfd6]">· Class-B lab</span>
                    </p>
                  </div>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#a8dfd6]/15 text-[#a8dfd6] sm:h-10 sm:w-10 sm:rounded-xl">
                    <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5" />
                  </span>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-1.5 border-t border-white/10 pt-3 sm:mt-4 sm:gap-2 sm:pt-3.5">
                  <div>
                    <p className="font-display text-sm font-semibold text-white sm:text-base">2018</p>
                    <p className="text-[9px] leading-tight text-white/45 sm:text-[10px]">Serving Kasarani</p>
                  </div>
                  <div>
                    <p className="font-display text-sm font-semibold text-white sm:text-base">Mon–Sat</p>
                    <p className="text-[9px] leading-tight text-white/45 sm:text-[10px]">Open six days</p>
                  </div>
                  <div>
                    <p className="font-display text-sm font-semibold text-white sm:text-base">Walk-in</p>
                    <p className="text-[9px] leading-tight text-white/45 sm:text-[10px]">Always welcome</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-1.5 sm:gap-3">
                {[
                  { src: maternityCare, label: "Maternal" },
                  { src: lab, label: "Lab" },
                  { src: pharmacy, label: "Pharmacy" },
                ].map((card) => (
                  <div
                    key={card.label}
                    className="group relative aspect-[3/3.6] overflow-hidden rounded-lg border border-white/15 sm:aspect-[3/4] sm:rounded-xl"
                  >
                    <Image
                      src={card.src}
                      alt={card.label}
                      fill
                      sizes="(max-width: 640px) 30vw, 120px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07191d]/85 to-transparent" />
                    <span className="absolute bottom-1.5 left-1.5 text-[9px] font-bold text-white/90 sm:bottom-2 sm:left-2 sm:text-[10px]">
                      {card.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 rounded-xl border border-white/12 bg-white/8 px-3 py-2.5 backdrop-blur-lg sm:rounded-2xl sm:px-4 sm:py-3 sm:gap-x-4 sm:gap-y-2">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-white/80 sm:text-[11px]">
                  <TestTube className="h-3 w-3 text-[#a8dfd6] sm:h-3.5 sm:w-3.5" />
                  Same-visit results
                </span>
                <span className="hidden h-3 w-px bg-white/20 sm:block" />
                <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-white/80 sm:text-[11px]">
                  <Pill className="h-3 w-3 text-[#ff9e7d] sm:h-3.5 sm:w-3.5" />
                  In-house pharmacy
                </span>
                <span className="hidden h-3 w-px bg-white/20 sm:block" />
                <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-white/80 sm:text-[11px]">
                  <HeartPulse className="h-3 w-3 text-[#a8dfd6] sm:h-3.5 sm:w-3.5" />
                  KEPI immunisation
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 border-t border-white/10 pt-4 sm:mt-10 sm:pt-6">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <span className="shrink-0 text-[9px] font-extrabold uppercase tracking-[0.14em] text-white/40 sm:mr-1 sm:text-[10px]">
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
                  className="group inline-flex shrink-0 items-center gap-1 rounded-full border border-white/12 bg-white/5 px-3 py-1.5 text-[11px] font-semibold text-white/75 transition-all duration-300 hover:border-white/25 hover:bg-white/10 hover:text-white sm:gap-1.5 sm:px-3.5 sm:text-xs"
                >
                  {item.label}
                  <ArrowRight className="h-2.5 w-2.5 opacity-50 sm:h-3 sm:w-3 sm:opacity-0 sm:-translate-x-1 sm:transition-all sm:duration-300 sm:group-hover:opacity-70 sm:group-hover:translate-x-0" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
