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
import heroBackground from "@/public/images/hero_bg_image.webp";
import maternityCare from "@/public/images/maternity-care.jpg";
import pharmacy from "@/public/images/pharmacy-dispensary.jpg";
import lab from "@/public/images/lab-services.jpg";

export default function HeroStory() {
  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden bg-[#07191d] text-[#effbf5]" aria-labelledby="hero-heading">
      <div className="absolute inset-0">
        <Image src={heroBackground} alt="" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,25,29,0.64)_0%,rgba(7,25,29,0.42)_34%,rgba(7,25,29,0.5)_62%,rgba(7,25,29,0.92)_100%)]" />
        <div className="absolute inset-0 hidden sm:block bg-[linear-gradient(105deg,rgba(7,25,29,0.86)_0%,rgba(7,25,29,0.56)_40%,rgba(7,25,29,0.24)_72%,rgba(7,25,29,0.45)_100%)]" />
      </div>

      <div className="relative z-10 flex min-h-[100svh] flex-col">
        <div className="container-page flex flex-1 flex-col justify-end pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-[5.75rem] sm:pb-12 sm:pt-28 lg:pb-16 lg:pt-36">
          <div className="mb-auto flex flex-wrap items-center gap-1.5 sm:gap-2.5">
            <OpenStatus />
            <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/8 px-2.5 py-1 text-[10px] font-semibold text-white/70 backdrop-blur-md sm:px-3 sm:py-1.5 sm:text-[11px]">
              <MapPin className="h-3 w-3 text-[#a8dfd6]" /> First Street · Clay City
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 items-end gap-6 sm:mt-10 sm:gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
            <div className="max-w-2xl">
              <p className="mb-3 inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#ff9e7d] sm:text-[11px]">
                <span className="h-px w-7 bg-[#ff9e7d]/70" /> Neighbourhood outpatient care
              </p>
              <h1 id="hero-heading" className="font-display font-medium tracking-[-0.04em] text-balance" style={{ fontSize: "clamp(2.05rem,8.2vw,4.6rem)", lineHeight: 0.94 }}>
                Care that <span className="italic text-[#a8dfd6]">knows</span> your neighbourhood.
              </h1>
              <p className="mt-4 max-w-md text-[0.9rem] leading-relaxed text-white/70 sm:mt-6 sm:text-lg">
                Licensed Level-2 clinic on First Street. Maternal & child health, same-visit lab, and an in-house pharmacy — without the hospital rush.
              </p>
              <div className="mt-5 flex w-full flex-col gap-2.5 sm:mt-8 sm:w-auto sm:flex-row">
                <a href="#contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ff9e7d] px-5 py-3.5 text-sm font-extrabold text-[#07191d] shadow-[0_14px_32px_rgba(255,158,125,0.28)] transition hover:-translate-y-1">
                  <CalendarClock className="h-4 w-4" /> Book a Visit <ArrowRight className="h-4 w-4" />
                </a>
                <a href="tel:+254712265746" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-3.5 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/15">
                  <Phone className="h-4 w-4" /> 0712 265746
                </a>
              </div>
            </div>

            <div className="relative flex flex-col gap-3 lg:pb-2">
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4 shadow-xl backdrop-blur-xl sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <div><p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-white/50">Credentials</p><p className="mt-1 font-display text-xl font-medium text-white">KMPDC Level-2 <span className="text-[#a8dfd6]">· Class-B lab</span></p></div>
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#a8dfd6]/15 text-[#a8dfd6]"><ShieldCheck className="h-5 w-5" /></span>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 border-t border-white/10 pt-3.5">
                  <div><p className="font-display text-base font-semibold">2018</p><p className="text-[10px] text-white/45">Serving Kasarani</p></div>
                  <div><p className="font-display text-base font-semibold">Mon–Sat</p><p className="text-[10px] text-white/45">Open six days</p></div>
                  <div><p className="font-display text-base font-semibold">Walk-in</p><p className="text-[10px] text-white/45">Always welcome</p></div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[{ src: maternityCare, label: "Maternal" }, { src: lab, label: "Lab" }, { src: pharmacy, label: "Pharmacy" }].map((card) => (
                  <div key={card.label} className="group relative aspect-[3/4] overflow-hidden rounded-xl border border-white/15">
                    <Image src={card.src} alt={card.label} fill sizes="(max-width:640px) 30vw,120px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07191d]/85 to-transparent" /><span className="absolute bottom-2 left-2 text-[10px] font-bold text-white/90">{card.label}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-white/12 bg-white/8 px-4 py-3 backdrop-blur-lg">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-white/80"><TestTube className="h-3.5 w-3.5 text-[#a8dfd6]" /> Same-visit results</span>
                <span className="hidden h-3 w-px bg-white/20 sm:block" />
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-white/80"><Pill className="h-3.5 w-3.5 text-[#ff9e7d]" /> In-house pharmacy</span>
                <span className="hidden h-3 w-px bg-white/20 sm:block" />
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-white/80"><HeartPulse className="h-3.5 w-3.5 text-[#a8dfd6]" /> KEPI immunisation</span>
              </div>
            </div>
          </div>

          <div className="mt-6 border-t border-white/10 pt-4 sm:mt-10 sm:pt-6">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <span className="shrink-0 text-[10px] font-extrabold uppercase tracking-[0.14em] text-white/40">Explore</span>
              {[{ label: "Care", href: "#care" }, { label: "The visit", href: "#story" }, { label: "The clinic", href: "#clinic" }, { label: "Find us", href: "#visit" }].map((item) => (
                <a key={item.href} href={item.href} className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/12 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-white/75 transition hover:bg-white/10 hover:text-white">{item.label}<ArrowRight className="h-3 w-3" /></a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
