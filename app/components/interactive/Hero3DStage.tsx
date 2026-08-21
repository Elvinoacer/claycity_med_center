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
    short: "Rx",
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
  const [isMobile, setIsMobile] = useState(false);
  const active = ASSETS[activeIdx];
  const count = ASSETS.length;

  const go = useCallback(
    (next: number) => {
      setActiveIdx(((next % count) + count) % count);
    },
    [count]
  );

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced || paused) return;
    const id = window.setInterval(() => go(activeIdx + 1), 5200);
    return () => window.clearInterval(id);
  }, [activeIdx, go, paused]);

  // Mobile-friendly offsets: gentler 3D so content remains readable
  const xStep = isMobile ? 22 : 36;
  const yRot = isMobile ? -28 : -46;
  const zActive = isMobile ? 48 : 88;
  const zBack = isMobile ? -70 : -130;

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
      <Card3DTilt intensity={7} glare={true} className="rounded-[2rem]">
        <div
          className="relative h-[280px] sm:h-[360px] lg:h-[420px] [perspective:1800px] outline-none"
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
                className="coverflow-card absolute left-1/2 top-0 h-full w-[82%] sm:w-[76%] origin-center rounded-[1.85rem] overflow-hidden border border-white/50 bg-brand-950 focus-visible:z-30 focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2"
                style={{
                  transform: `translateX(-50%) translateX(${offset * xStep}%) rotateY(${offset * yRot}deg) translateZ(${isActive ? zActive : zBack - abs * 20}px) scale(${1 - abs * 0.1})`,
                  zIndex: 20 - abs,
                  opacity: abs > 2 ? 0 : abs === 2 ? 0.32 : 1,
                  pointerEvents: abs > 2 ? "none" : "auto",
                }}
              >
                <Image
                  src={item.img}
                  alt={item.alt}
                  fill
                  priority={idx === 0}
                  placeholder="blur"
                  sizes="(max-width: 1024px) 85vw, 42vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/92 via-brand-950/20 to-transparent" />
              </button>
            );
          })}

          <div className="pointer-events-none absolute bottom-3.5 left-[9%] right-[9%] z-30 sm:left-[11%] sm:right-[11%]">
            <div className="pointer-events-auto rounded-2xl bg-brand-950/85 backdrop-blur-xl border border-white/20 p-3.5 sm:p-4 text-white shadow-2xl">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] text-brand-300">
                  {active.category}
                </span>
                <span className="text-[10px] sm:text-[11px] font-mono text-white/70 tabular-nums">
                  {String(activeIdx + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
                </span>
              </div>
              <h3 className="font-display text-base sm:text-xl font-semibold mt-0.5 tracking-tight">
                {active.title}
              </h3>
              <p className="text-[11px] sm:text-sm text-brand-100/90 mt-0.5 leading-snug line-clamp-2">
                {active.tagline}
              </p>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-[4%] right-[4%] z-30 hidden sm:flex items-center justify-between">
            <button
              type="button"
              onClick={() => go(activeIdx - 1)}
              className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-brand-800 shadow-lg border border-white/80 hover:bg-white hover:scale-105 active:scale-95 transition-all"
              aria-label="Previous care moment"
            >
              <ChevronLeft className="h-4.5 w-4.5" />
            </button>
            <button
              type="button"
              onClick={() => go(activeIdx + 1)}
              className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-brand-800 shadow-lg border border-white/80 hover:bg-white hover:scale-105 active:scale-95 transition-all"
              aria-label="Next care moment"
            >
              <ChevronRight className="h-4.5 w-4.5" />
            </button>
          </div>

          <div className="pointer-events-none absolute top-3.5 left-[9%] right-[9%] z-30 flex items-center justify-between sm:left-[11%] sm:right-[11%]">
            <span className="glass pointer-events-none inline-flex items-center gap-1.5 rounded-full px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs font-bold text-brand-950 shadow-md">
              <span className="h-2 w-2 rounded-full bg-vital-500 animate-pulse" />
              {active.badge}
            </span>
            <span className="glass rounded-full px-2.5 sm:px-3 py-1 text-[10px] sm:text-[11px] font-bold text-brand-900 shadow-sm">
              {active.stat}
            </span>
          </div>
        </div>
      </Card3DTilt>

      <div
        className="mt-4 grid grid-cols-5 gap-1.5 sm:gap-2"
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
              aria-label={item.title}
              aria-selected={isSelected}
              onClick={() => setActiveIdx(idx)}
              className={`relative flex flex-col items-center justify-center gap-1 rounded-2xl border px-1 py-2.5 sm:px-2 sm:py-3 min-h-[3.25rem] transition-all duration-300 active:scale-95 ${
                isSelected
                  ? "bg-brand-600 text-white border-brand-600 shadow-lg shadow-brand-600/35"
                  : "bg-white/90 text-ink border-line hover:border-brand-300 hover:bg-white hover:shadow-md"
              }`}
            >
              <span
                className={`flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-xl ${
                  isSelected ? "bg-white/20 text-white" : "bg-brand-50 text-brand-600"
                }`}
              >
                <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </span>
              <span
                className={`hidden sm:block text-[10px] font-bold leading-none whitespace-nowrap ${
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
