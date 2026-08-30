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
import heroBackgroundMobile from "@/public/images/hero_bg_mobile.webp";
import maternityCare from "@/public/images/maternity-care.jpg";
import pharmacy from "@/public/images/pharmacy-dispensary.jpg";
import lab from "@/public/images/lab-services.jpg";

export default function HeroStory() {
  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden bg-[#07191d] text-[#effbf5]" aria-labelledby="hero-heading">
      <div className="absolute inset-0">
        <Image src={heroBackgroundMobile} alt="" fill priority sizes="100vw" className="hero-story-bg-motion hero-story-bg-mobile object-cover object-center" />
        <Image src={heroBackground} alt="" fill priority sizes="100vw" className="hero-story-bg-motion hero-story-bg-desktop object-cover object-center" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,25,29,0.78)_0%,rgba(7,25,29,0.58)_30%,rgba(7,25,29,0.38)_62%,rgba(7,25,29,0.78)_100%)] max-sm:bg-[linear-gradient(180deg,rgba(7,25,29,0.84)_0%,rgba(7,25,29,0.68)_28%,rgba(7,25,29,0.48)_62%,rgba(7,25,29,0.82)_100%)]" />
        <div className="absolute inset-0 hidden sm:block bg-[linear-gradient(105deg,rgba(7,25,29,0.88)_0%,rgba(7,25,29,0.58)_40%,rgba(7,25,29,0.25)_72%,rgba(7,25,29,0.48)_100%)]" />
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none bg-[radial-gradient(rgba(255,255,255,0.55)_0.5px,transparent_0.5px)] [background-size:14px_14px] [mix-blend-mode:overlay]" />
      </div>

      <div className="relative z-10 flex min-h-[100svh] flex-col">
        <div className="container-page flex flex-1 flex-col justify-end pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-[5.75rem] sm:pb-12 sm:pt-28 lg:pb-16 lg:pt-36">
          <div className="mb-auto flex flex-wrap items-center gap-1.5 sm:gap-2.5">
            <OpenStatus />
            <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/8 px-2.5 py-1 text-[10px] font-semibold text-white/70 backdrop-blur-md sm:px-3 sm:py-1.5 sm:text-[11px]"><MapPin className="h-3 w-3 text-[#a8dfd6]" /> First Street · Clay City</span>
          </div>

          <div className="mt-6 grid grid-cols-1 items-end gap-6 sm:mt-10 sm:gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
            <div className="hero-story-copy max-w-2xl">
              <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/12 bg-[#07191d]/45 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#ffb29a] shadow-[0_10px_28px_rgba(0,0,0,0.18)] backdrop-blur-md sm:text-[11px]"><span className="h-px w-7 bg-[#ff9e7d]/80" /> Neighbourhood outpatient care</p>
              <h1 id="hero-heading" className="hero-story-heading font-display font-medium tracking-[-0.045em] text-balance">Care that <span className="italic text-[#b9ebe2]">knows</span> your neighbourhood.</h1>
              <p className="hero-story-lede mt-4 max-w-md text-[0.9rem] leading-relaxed text-white/90 sm:mt-6 sm:text-lg">Licensed Level-2 clinic on First Street. Maternal & child health, same-visit lab, and an in-house pharmacy — without the hospital rush.</p>
              <div className="mt-5 flex w-full flex-col gap-2.5 sm:mt-8 sm:w-auto sm:flex-row">
                <a href="#contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ff9e7d] px-5 py-3.5 text-sm font-extrabold text-[#07191d] shadow-[0_14px_32px_rgba(255,158,125,0.28)] transition hover:-translate-y-1"><CalendarClock className="h-4 w-4" /> Book a Visit <ArrowRight className="h-4 w-4" /></a>
                <a href="tel:+254712265746" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-[#07191d]/35 px-5 py-3.5 text-sm font-bold text-white shadow-[0_10px_28px_rgba(0,0,0,0.14)] backdrop-blur-md transition hover:bg-[#07191d]/50"><Phone className="h-4 w-4" /> 0712 265746</a>
              </div>
            </div>

            <div className="relative flex flex-col gap-3 lg:pb-2">
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4 shadow-xl backdrop-blur-xl sm:p-5">
                <div className="flex items-start justify-between gap-3"><div><p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-white/50">Credentials</p><p className="mt-1 font-display text-xl font-medium text-white">KMPDC Level-2 <span className="text-[#a8dfd6]">· Class-B lab</span></p></div><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#a8dfd6]/15 text-[#a8dfd6]"><ShieldCheck className="h-5 w-5" /></span></div>
                <div className="mt-4 grid grid-cols-3 gap-2 border-t border-white/10 pt-3.5"><div><p className="font-display text-base font-semibold">2018</p><p className="text-[10px] text-white/45">Serving Kasarani</p></div><div><p className="font-display text-base font-semibold">24/7</p><p className="text-[10px] text-white/45">Open day &amp; night</p></div><div><p className="font-display text-base font-semibold">Walk-in</p><p className="text-[10px] text-white/45">Always welcome</p></div></div>
              </div>
              <div className="grid grid-cols-3 gap-2">{[{ src: maternityCare, label: "Maternal" }, { src: lab, label: "Lab" }, { src: pharmacy, label: "Pharmacy" }].map((card) => (<div key={card.label} className="group relative aspect-[3/4] overflow-hidden rounded-xl border border-white/15"><Image src={card.src} alt={card.label} fill sizes="(max-width:640px) 30vw,120px" className="object-cover transition-transform duration-500 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-[#07191d]/85 to-transparent" /><span className="absolute bottom-2 left-2 text-[10px] font-bold text-white/90">{card.label}</span></div>))}</div>
              <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-white/12 bg-white/8 px-4 py-3 backdrop-blur-lg"><span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-white/80"><TestTube className="h-3.5 w-3.5 text-[#a8dfd6]" /> Same-visit results</span><span className="hidden h-3 w-px bg-white/20 sm:block" /><span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-white/80"><Pill className="h-3.5 w-3.5 text-[#ff9e7d]" /> In-house pharmacy</span><span className="hidden h-3 w-px bg-white/20 sm:block" /><span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-white/80"><HeartPulse className="h-3.5 w-3.5 text-[#a8dfd6]" /> KEPI immunisation</span></div>
            </div>
          </div>

          <div className="mt-6 border-t border-white/10 pt-4 sm:mt-10 sm:pt-6"><div className="flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"><span className="shrink-0 text-[10px] font-extrabold uppercase tracking-[0.14em] text-white/40">Explore</span>{[{ label: "Care", href: "#care" }, { label: "The visit", href: "#story" }, { label: "The clinic", href: "#clinic" }, { label: "Find us", href: "#visit" }].map((item) => (<a key={item.href} href={item.href} className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/12 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-white/75 transition hover:bg-white/10 hover:text-white">{item.label}<ArrowRight className="h-3 w-3" /></a>))}</div></div>
        </div>
      </div>

      <style jsx global>{`
        .hero-story-bg-mobile { display: none; }
        .hero-story-bg-motion { transform: scale(1.12) translate3d(0,0,0); animation: claycityHeroDrift 18s ease-in-out infinite alternate; will-change: transform; }
        .hero-story-bg-motion { filter: blur(1.15px); }
        .hero-story-bg-mobile.hero-story-bg-motion { transform: scale(1.14) translate3d(0,0,0); animation-duration: 22s; filter: blur(1.1px); }
        .hero-story-copy { position: relative; padding: 1rem 0; }
        .hero-story-heading { max-width: 50rem; color: #fffaf7; font-size: clamp(2.2rem, 8.2vw, 4.6rem); line-height: .94; text-wrap: balance; text-shadow: 0 3px 18px rgba(0,0,0,.58), 0 1px 2px rgba(0,0,0,.75); -webkit-text-stroke: .012em rgba(7,25,29,.28); }
        .hero-story-lede { max-width: 35rem; text-shadow: 0 2px 14px rgba(0,0,0,.6); }
        .hero-story-copy::before { content:""; position:absolute; z-index:-1; inset:-1rem auto -1rem -1.25rem; width:min(42rem,96vw); border-radius:1.75rem; background:linear-gradient(90deg,rgba(7,25,29,.28),rgba(7,25,29,.08) 58%,transparent); filter:blur(10px); pointer-events:none; }
        @keyframes claycityHeroDrift { 0%{transform:scale(1.12) translate3d(0%,0%,0)} 50%{transform:scale(1.16) translate3d(-1.2%,-0.7%,0)} 100%{transform:scale(1.12) translate3d(1.2%,0.8%,0)} }
        @media (max-width:640px) { .hero-story-bg-mobile{display:block}.hero-story-bg-desktop{display:none}.hero-story-bg-mobile{object-position:center 38%}.hero-story-bg-mobile.hero-story-bg-motion{animation-name:claycityHeroMobileDrift}.hero-story-copy{padding:.5rem 0}.hero-story-heading{font-size:clamp(2.1rem,10.5vw,3.35rem);line-height:.96;text-shadow:0 3px 16px rgba(0,0,0,.65),0 1px 2px rgba(0,0,0,.8)}.hero-story-lede{color:rgba(255,255,255,.94)}.hero-story-copy::before{inset:-.75rem auto:-.75rem -.75rem;width:min(100%,32rem);border-radius:1.25rem;background:linear-gradient(90deg,rgba(7,25,29,.38),rgba(7,25,29,.1) 72%,transparent);filter:blur(8px)} }
        @keyframes claycityHeroMobileDrift { 0%{transform:scale(1.16) translate3d(0%,-2.8%,0)} 50%{transform:scale(1.19) translate3d(-0.8%,-3.5%,0)} 100%{transform:scale(1.16) translate3d(0.8%,-2.2%,0)} }
        @media (min-width:641px){.hero-story-bg-desktop{display:block}}
        @media (prefers-reduced-motion:reduce){.hero-story-bg-motion{animation:none;transform:scale(1.12);filter:blur(1.15px)}}
      `}</style>
    </section>
  );
}
