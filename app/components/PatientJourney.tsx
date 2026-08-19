"use client";

import { useState } from "react";
import Image from "next/image";
import {
  UserPlus,
  ClipboardList,
  Stethoscope,
  TestTube,
  Pill,
  Wallet,
  ClipboardCheck,
  CheckCircle2,
  Sparkles,
  Clock,
} from "lucide-react";
import Card3DTilt from "./interactive/Card3DTilt";
import heroClinic from "@/public/images/hero-clinic.jpg";
import triageImg from "@/public/images/triage-vitals.jpg";
import consultationImg from "@/public/images/consultation.jpg";
import labImg from "@/public/images/lab-services.jpg";
import pharmacyImg from "@/public/images/pharmacy-dispensary.jpg";
import nurseImg from "@/public/images/nurse-portrait.jpg";

const STEPS = [
  {
    step: "01",
    icon: UserPlus,
    title: "Arrival & Registration",
    desc: "Walk in or call ahead. At reception you’ll share your name, ID and any insurance details so we can open your visit record quickly.",
    duration: "≈ 5 min",
    photo: heroClinic,
    photoCaption: "Friendly reception desk at First Street, Clay City Estate.",
    highlight: "Zero complicated paperwork",
  },
  {
    step: "02",
    icon: ClipboardList,
    title: "Vitals & Triage",
    desc: "A nurse checks your temperature, digital blood pressure, pulse, and weight, noting your main symptoms to prioritise your care.",
    duration: "≈ 8 min",
    photo: triageImg,
    photoCaption: "Nurse conducting automated blood pressure & vital triage.",
    highlight: "Digital diagnostic screening",
  },
  {
    step: "03",
    icon: Stethoscope,
    title: "Clinical Consultation",
    desc: "A licensed clinical officer examines you in a private room, listens attentively to your medical history, and explains your diagnosis in plain language.",
    duration: "≈ 15 min",
    photo: consultationImg,
    photoCaption: "Private consultation room with licensed clinical officers.",
    highlight: "Unhurried, attentive examination",
  },
  {
    step: "04",
    icon: TestTube,
    title: "Same-Day Lab Tests",
    desc: "If required, our on-site Class-B licensed laboratory runs routine blood, urine, or rapid tests on the spot so you don’t wait days.",
    duration: "≈ 20 min",
    photo: labImg,
    photoCaption: "KMLTTB-registered diagnostic laboratory testing on-site.",
    highlight: "Same-day rapid results",
  },
  {
    step: "05",
    icon: Pill,
    title: "In-House Pharmacy",
    desc: "Pick up genuine, prescribed medications directly at our dispensary window with clear dosage counselling before you leave.",
    duration: "≈ 5 min",
    photo: pharmacyImg,
    photoCaption: "Licensed dispensary with full stock of essential medications.",
    highlight: "Affordable out-of-pocket pricing",
  },
  {
    step: "06",
    icon: Wallet,
    title: "Payment & Follow-Up",
    desc: "Settle your visit conveniently via M-Pesa or Cash at reception. We will schedule any required review before you head home.",
    duration: "≈ 5 min",
    photo: nurseImg,
    photoCaption: "Clear care instructions and scheduled follow-up.",
    highlight: "Transparent pricing · M-Pesa & Cash",
  },
];

const BRING = [
  "National ID or child's birth certificate",
  "Previous clinic / immunisation records",
  "List of any medication you currently take",
  "NHIF / SHA card if you have one",
  "M-Pesa or Cash for transparent payment",
];

export default function PatientJourney() {
  const [activeStep, setActiveStep] = useState(0);
  const current = STEPS[activeStep];

  return (
    <section
      id="patient-journey"
      className="relative py-16 md:py-24 dark-wash overflow-hidden text-white"
      aria-labelledby="journey-heading"
    >
      <div className="container-page relative z-10">
        <div className="max-w-3xl" data-reveal>
          <div className="flex items-center gap-2">
            <span className="eyebrow eyebrow-dark">Real Patient Experience</span>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-300 bg-white/10 border border-white/15 px-2.5 py-0.5 rounded-full">
              <Sparkles className="h-3 w-3" />
              Step-by-Step Story
            </span>
          </div>
          <h2
            id="journey-heading"
            className="mt-4 font-display text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.08] font-semibold tracking-[-0.01em] text-white heading-underline text-balance"
          >
            A calm, predictable path from arrival to discharge
          </h2>
          <p className="mt-5 text-base sm:text-lg text-brand-100/90 leading-relaxed">
            Every stage is designed to feel organised, dignified, and unhurried.
            Explore each milestone to see how the clinical team cares for you.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 items-start">
          <div className="relative space-y-3" role="list">
            <span
              className="absolute left-[1.55rem] top-6 bottom-6 w-px bg-white/10"
              aria-hidden="true"
            />
            {STEPS.map((s, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={s.step}
                  type="button"
                  role="listitem"
                  onClick={() => setActiveStep(idx)}
                  aria-pressed={isActive}
                  className={`relative w-full text-left cursor-pointer rounded-2xl border p-5 transition-all duration-300 ${
                    isActive
                      ? "bg-white/[0.14] border-brand-400 shadow-xl shadow-brand-500/20 lg:translate-x-2"
                      : "bg-white/[0.05] border-white/10 hover:bg-white/[0.09] hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-display text-sm font-bold transition-colors ${
                          isActive
                            ? "bg-brand-500 text-white shadow-md shadow-brand-500/40"
                            : "bg-white/10 text-brand-200"
                        }`}
                      >
                        {s.step}
                      </span>
                      <div>
                        <h3 className="font-display text-base sm:text-lg font-semibold text-white">
                          {s.title}
                        </h3>
                        <p className="text-xs text-brand-300 mt-0.5">
                          {s.highlight}
                        </p>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-200 bg-white/10 px-2.5 py-1 rounded-full shrink-0">
                      <Clock className="h-3 w-3" />
                      {s.duration}
                    </span>
                  </div>

                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ${
                      isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <p className="overflow-hidden text-sm leading-relaxed text-brand-100/90">
                      <span className="block mt-3 pt-3 border-t border-white/10">
                        {s.desc}
                      </span>
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="lg:sticky lg:top-24 [perspective:1400px]">
            <Card3DTilt intensity={7} className="rounded-3xl">
              <div
                className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-black/40 border border-white/20 bg-brand-950"
                style={{
                  transform: `rotateY(${(activeStep - 2.5) * 4}deg)`,
                  transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                <Image
                  key={current.step}
                  src={current.photo}
                  alt={current.title}
                  fill
                  placeholder="blur"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-950/20 to-transparent" />

                <div className="absolute top-4 left-4 z-20">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-600/90 backdrop-blur-md text-xs font-bold text-white shadow-lg">
                    Step {current.step} of 06
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 z-20">
                  <div className="p-4 rounded-2xl bg-brand-950/90 backdrop-blur-md border border-white/15">
                    <p className="font-display text-lg font-semibold text-white">
                      {current.title}
                    </p>
                    <p className="text-xs text-brand-200/90 mt-1 leading-snug">
                      {current.photoCaption}
                    </p>
                  </div>
                </div>
              </div>
            </Card3DTilt>
          </div>
        </div>

        <div className="mt-14 grid lg:grid-cols-[1fr_1.2fr] gap-5">
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] backdrop-blur-md p-6 lg:p-8">
            <div className="flex items-center gap-2 text-brand-300">
              <ClipboardCheck className="h-5 w-5" />
              <span className="text-xs font-semibold uppercase tracking-wide">
                Before You Come
              </span>
            </div>
            <h3 className="mt-3 font-display text-2xl font-semibold text-white text-balance">
              What to bring with you
            </h3>
            <p className="mt-2 text-brand-100/80 text-sm leading-relaxed">
              A short checklist so your registration and consultation go smoothly:
            </p>
            <ul className="mt-5 space-y-2.5">
              {BRING.map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-sm">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 text-brand-400 shrink-0" />
                  <span className="text-brand-50">{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.06] backdrop-blur-md p-6 lg:p-8">
            <div className="flex items-center gap-2 text-brand-300">
              <Wallet className="h-5 w-5" />
              <span className="text-xs font-semibold uppercase tracking-wide">
                Payment Transparency
              </span>
            </div>
            <h3 className="mt-3 font-display text-2xl font-semibold text-white text-balance">
              Simple, transparent billing
            </h3>
            <p className="mt-2 text-brand-100/80 text-sm leading-relaxed">
              Fees are affordable and payable at reception. We will always inform you of test or medication costs beforehand.
            </p>
            <div className="mt-5 grid sm:grid-cols-2 gap-3">
              <div className="rounded-xl border border-white/10 bg-white/[0.08] p-4">
                <p className="font-semibold text-white flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  M-Pesa Accepted
                </p>
                <p className="text-xs text-brand-200/80 mt-1">
                  Official till number at reception
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.08] p-4">
                <p className="font-semibold text-white flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  Cash in KES
                </p>
                <p className="text-xs text-brand-200/80 mt-1">
                  Immediate printed receipt
                </p>
              </div>
            </div>
            <p className="mt-4 text-xs text-brand-300/80">
              Walk-ins welcome every Monday to Saturday during regular opening hours.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
