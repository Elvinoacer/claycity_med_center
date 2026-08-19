"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import {
  Baby,
  Pill,
  Stethoscope,
  TestTube,
  HeartPulse,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Card3DTilt from "./Card3DTilt";
import consultationImg from "@/public/images/consultation.jpg";
import pharmacyImg from "@/public/images/pharmacy-dispensary.jpg";
import maternalImg from "@/public/images/child-immunisation.jpg";
import labImg from "@/public/images/lab-services.jpg";
import triageImg from "@/public/images/triage-vitals.jpg";

const ASSETS = [
  {
    id: "consultation",
    title: "Clinical Consultation",
    category: "Primary Care",
    tagline: "Unhurried examinations with licensed clinical officers",
    img: consultationImg,
    alt: "Doctor consulting a patient at Claycity Medical Centre",
    badge: "Walk-ins Welcome",
    stat: "≈ 15 min review",
    icon: Stethoscope,
    short: "Consult",
  },
  {
    id: "pharmacy",
    title: "In-House Pharmacy",
    category: "On-Site Dispensary",
    tagline: "Genuine medicines dispensed before you leave",
    img: pharmacyImg,
    alt: "Pharmacist dispensing medication at Claycity Medical Centre",
    badge: "Fully Stocked",
    stat: "Fair out-of-pocket",
    icon: Pill,
    short: "Pharmacy",
  },
  {
    id: "maternal",
    title: "Maternal & Child Health",
    category: "Family Care",
    tagline: "KEPI immunisations and gentle well-baby visits",
    img: maternalImg,
    alt: "Mother and infant receiving care at Claycity Medical Centre",
    badge: "KEPI Aligned",
    stat: "Mon–Sat clinic",
    icon: Baby,
    short: "Maternal",
  },
  {
    id: "lab",
    title: "Laboratory Diagnostics",
    category: "Class-B Lab",
    tagline: "Routine blood and rapid tests, same-visit results",
    img: labImg,
    alt: "Laboratory services at Claycity Medical Centre",
    badge: "Same-day results",
    stat: "KMLTTB licensed",
    icon: TestTube,
    short: "Lab",
  },
  {
    id: "triage",
    title: "Vitals & Triage",
    category: "Nursing Desk",
    tagline: "Digital BP, temperature and pulse before you see the clinician",
    img: triageImg,
    alt: "Nurse checking patient vitals at Claycity Medical Centre",
    badge: "First stop",
    stat: "≈ 8 min",
    icon: HeartPulse,
    short: "Vitals",
  },
] as const;

export default function Hero3DStage() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const active = ASSETS[activeIdx];
  const count = ASSETS.length;

  const go = useCallback(
    (next: number) => {
      setActiveIdx(((next % count) + count) % count);
    },
    [count]
  );

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced || paused) return;
    const id = window.setInterval(() => go(activeIdx + 1), 5200);
    return () => window.clearInterval(id);
  }, [activeIdx, go, paused]);

  return (
    <div
      className="relative w-full max-w-2xl mx-auto lg:max-w-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setPaused(false);
        }
      }}
    >
      <Card3DTilt intensity={6} glare={false} className="rounded-[2rem]">
        <div
          className="relative h-[270px] sm:h-[340px] lg:h-[390px] [perspective:1600px] outline-none"
          role="region"
          aria-roledescription="carousel"
          aria-label="Clinic care moments"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") {
              e.preventDefault();
              go(activeIdx + 1);
            } else if (e.key === "ArrowLeft") {
              e.preventDefault();
              go(activeIdx - 1);
            }
          }}
        >
          {ASSETS.map((item, idx) => {
            const offset = idx - activeIdx;
            const abs = Math.abs(offset);
            const isActive = offset === 0;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveIdx(idx)}
                aria-label={`Show ${item.title}`}
                aria-current={isActive ? "true" : undefined}
                className="coverflow-card absolute left-1/2 top-0 h-full w-[78%] sm:w-[74%] origin-center rounded-[1.75rem] overflow-hidden border border-white/40 bg-brand-950 shadow-[0_30px_60px_-24px_rgba(8,47,73,0.55)] focus-visible:z-30"
                style={{
                  transform: `translateX(-50%) translateX(${offset * 34}%) rotateY(${offset * -42}deg) translateZ(${isActive ? 72 : -110 - abs * 18}px) scale(${1 - abs * 0.11})`,
                  zIndex: 20 - abs,
                  opacity: abs > 2 ? 0 : abs === 2 ? 0.38 : 1,
                  pointerEvents: abs > 2 ? "none" : "auto",
                }}
              >
                <Image
                  src={item.img}
                  alt={item.alt}
                  fill
                  priority={idx === 0}
                  placeholder="blur"
                  sizes="(max-width: 1024px) 80vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-950/15 to-transparent" />
              </button>
            );
          })}

          <div className="pointer-events-none absolute bottom-4 left-[11%] right-[11%] z-30">
            <div className="pointer-events-auto rounded-2xl bg-brand-950/80 backdrop-blur-md border border-white/15 p-3.5 sm:p-4 text-white shadow-xl">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-300">
                  {active.category}
                </span>
                <span className="text-[11px] font-mono text-white/70">
                  {String(activeIdx + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
                </span>
              </div>
              <h3 className="font-display text-lg sm:text-xl font-semibold mt-0.5">
                {active.title}
              </h3>
              <p className="text-xs sm:text-sm text-brand-100/90 mt-0.5 leading-snug">
                {active.tagline}
              </p>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-[6%] right-[6%] z-30 hidden sm:flex items-center justify-between">
            <button
              type="button"
              onClick={() => go(activeIdx - 1)}
              className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-brand-800 shadow-md border border-white/70 hover:bg-white transition-colors"
              aria-label="Previous care moment"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => go(activeIdx + 1)}
              className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-brand-800 shadow-md border border-white/70 hover:bg-white transition-colors"
              aria-label="Next care moment"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="pointer-events-none absolute top-4 left-[11%] right-[11%] z-30 flex items-center justify-between">
            <span className="glass pointer-events-none inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold text-brand-950 shadow-md">
              <span className="h-2 w-2 rounded-full bg-vital-500 animate-pulse" />
              {active.badge}
            </span>
            <span className="glass rounded-full px-3 py-1 text-[11px] font-bold text-brand-900 shadow-sm">
              {active.stat}
            </span>
          </div>
        </div>
      </Card3DTilt>

      <div
        className="mt-3.5 grid grid-cols-5 gap-1.5 sm:gap-2"
        role="tablist"
        aria-label="Care moments"
      >
        {ASSETS.map((item, idx) => {
          const isSelected = activeIdx === idx;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => setActiveIdx(idx)}
              className={`relative flex flex-col items-center justify-center gap-1 rounded-2xl border px-1 py-2 sm:px-2 sm:py-2.5 transition-all duration-300 ${
                isSelected
                  ? "bg-brand-600 text-white border-brand-600 shadow-lg shadow-brand-600/30"
                  : "bg-white/80 text-ink border-line hover:border-brand-300 hover:bg-white"
              }`}
            >
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                  isSelected ? "bg-white/20 text-white" : "bg-brand-50 text-brand-600"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
              </span>
              <span
                className={`hidden sm:block text-[10px] font-bold leading-none ${
                  isSelected ? "text-white" : "text-brand-950"
                }`}
              >
                {item.short}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
