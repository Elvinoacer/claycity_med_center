"use client";

import Image, { type StaticImageData } from "next/image";
import { useState } from "react";
import {
  ArrowRight,
  Baby,
  Check,
  ChevronDown,
  HeartPulse,
  Pill,
  Sparkles,
  Stethoscope,
  Syringe,
  TestTube,
} from "lucide-react";
import Card3DTilt from "./interactive/Card3DTilt";
import heroClinic from "@/public/images/hero-clinic.jpg";
import maternityCare from "@/public/images/maternity-care.jpg";
import pharmacy from "@/public/images/pharmacy-dispensary.jpg";
import triage from "@/public/images/triage-vitals.jpg";
import lab from "@/public/images/lab-services.jpg";

const CARE_ITEMS: {
  icon: typeof HeartPulse;
  title: string;
  copy: string;
  detail: string;
  points: string[];
  image: StaticImageData;
  imageAlt: string;
  tag: string;
}[] = [
  {
    icon: Baby,
    title: "Maternal & child",
    copy: "Gentle care for mums and little ones.",
    detail:
      "From antenatal check-ins to well-baby visits, we support mothers and children with calm, unhurried attention in a neighbourhood setting.",
    points: [
      "Antenatal & postnatal reviews",
      "Well-baby growth & development checks",
      "Breastfeeding & nutrition guidance",
      "Referral when specialist care is needed",
    ],
    image: maternityCare,
    imageAlt: "Mother and infant receiving maternal care",
    tag: "Family",
  },
  {
    icon: Stethoscope,
    title: "Consultation",
    copy: "Unhurried. Clear. Human.",
    detail:
      "General outpatient consultations for everyday illnesses, follow-ups, and health questions — explained in plain language, without the hospital rush.",
    points: [
      "Acute & episodic care",
      "Chronic condition reviews",
      "Sick notes & medical forms",
      "Clear next-step advice",
    ],
    image: heroClinic,
    imageAlt: "Clinician consulting a patient",
    tag: "Primary",
  },
  {
    icon: TestTube,
    title: "Laboratory",
    copy: "Routine tests. Same-visit results where we can.",
    detail:
      "Our Class-B laboratory supports common diagnostics on-site so you often leave with answers the same day — no extra trip across town.",
    points: [
      "Blood, urine & routine panels",
      "Same-visit results where possible",
      "KMLTTB Class-B standard",
      "Results explained simply",
    ],
    image: lab,
    imageAlt: "Laboratory diagnostic services",
    tag: "Class-B",
  },
  {
    icon: Pill,
    title: "Pharmacy",
    copy: "Quality medicines before you leave.",
    detail:
      "An in-house dispensary means prescribed medicines are filled under the same roof — convenient, and coordinated with your visit.",
    points: [
      "Prescription dispensing",
      "Common over-the-counter needs",
      "Guidance on how to take medicines",
      "M-Pesa welcome",
    ],
    image: pharmacy,
    imageAlt: "In-house pharmacy dispensary",
    tag: "On-site",
  },
  {
    icon: Syringe,
    title: "Immunisation",
    copy: "KEPI-aligned. Steady hands.",
    detail:
      "Childhood and routine immunisations aligned with KEPI schedules — delivered carefully, with records kept for your peace of mind.",
    points: [
      "KEPI childhood schedule",
      "Catch-up vaccines when needed",
      "Vaccine records updated",
      "Calm setting for little ones",
    ],
    image: maternityCare,
    imageAlt: "Childhood immunisation at the clinic",
    tag: "Prevention",
  },
  {
    icon: HeartPulse,
    title: "Screening",
    copy: "BP, sugar, BMI — simple truths.",
    detail:
      "Quick health screens that help you know where you stand — blood pressure, blood sugar, BMI, and other everyday checks.",
    points: [
      "Blood pressure & pulse",
      "Blood sugar checks",
      "BMI & basic vitals",
      "Practical lifestyle pointers",
    ],
    image: triage,
    imageAlt: "Nurse checking patient vitals",
    tag: "Everyday",
  },
];

export default function CareSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="care" className="immersive-care" aria-labelledby="care-heading">
      <div className="container-page">
        <div className="care-heading-row">
          <div>
            <span className="immersive-kicker">Care</span>
            <h2 id="care-heading">
              What you need.
              <br />
              <em>Nothing extra.</em>
            </h2>
          </div>
          <p>For Clay City, Seasons, and the rest of Kasarani — close to home.</p>
        </div>

        <div className="care-grid" data-reveal>
          {CARE_ITEMS.map((item, index) => {
            const Icon = item.icon;
            const isOpen = openIndex === index;

            return (
              <Card3DTilt
                key={item.title}
                intensity={isOpen ? 0 : 9}
                glare={!isOpen}
                className={`care-card care-card-${index + 1} ${
                  isOpen ? "care-card-open" : ""
                }`}
              >
                <article>
                  <div className="care-card-image">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      sizes="(max-width: 700px) 90vw, 30vw"
                      className="object-cover"
                    />
                    <span className="care-card-tag">{item.tag}</span>
                    <span className="care-card-number">0{index + 1}</span>
                  </div>
                  <div className="care-card-body">
                    <span className="care-card-icon">
                      <Icon size={18} />
                    </span>
                    <h3>{item.title}</h3>
                    <p>{item.copy}</p>

                    <button
                      type="button"
                      className="care-expand-btn"
                      aria-expanded={isOpen}
                      onClick={() =>
                        setOpenIndex(isOpen ? null : index)
                      }
                    >
                      {isOpen ? "Hide details" : "Learn more"}
                      <ChevronDown
                        size={15}
                        className={isOpen ? "rotate-180" : ""}
                        style={{
                          transition: "transform 0.25s ease",
                          transform: isOpen ? "rotate(180deg)" : undefined,
                        }}
                      />
                    </button>

                    <div
                      className="care-detail"
                      hidden={!isOpen}
                      style={{
                        display: isOpen ? "block" : "none",
                      }}
                    >
                      <p className="care-detail-copy">{item.detail}</p>
                      <ul className="care-detail-list">
                        {item.points.map((pt) => (
                          <li key={pt}>
                            <Check size={13} /> {pt}
                          </li>
                        ))}
                      </ul>
                      <a
                        href="#contact"
                        className="care-detail-cta"
                        aria-label={`Book ${item.title}`}
                      >
                        Book this service <ArrowRight size={14} />
                      </a>
                    </div>
                  </div>
                </article>
              </Card3DTilt>
            );
          })}
        </div>

        <div className="care-bottom-line">
          <span>
            <Sparkles size={16} /> Calm. Clear. Close.
          </span>
          <a href="#contact">
            Not sure where to start? <ArrowRight size={15} />
          </a>
        </div>
      </div>

      <style jsx global>{`
        .care-expand-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          margin-top: 1rem;
          padding: 0;
          border: 0;
          background: none;
          color: #287a72;
          font-size: 0.65rem;
          font-weight: 800;
          cursor: pointer;
          transition: color 0.2s ease;
        }
        .care-expand-btn:hover {
          color: var(--iv-ink, #07191d);
        }
        .care-detail {
          margin-top: 0.85rem;
          padding-top: 0.85rem;
          border-top: 1px solid var(--iv-line, rgba(7, 25, 29, 0.13));
          animation: careDetailIn 0.35s ease both;
        }
        @keyframes careDetailIn {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
        .care-detail-copy {
          min-height: 0 !important;
          margin: 0 !important;
          color: var(--iv-ink-soft, #36545a);
          font-size: 0.72rem;
          line-height: 1.6;
        }
        .care-detail-list {
          display: grid;
          gap: 0.4rem;
          margin: 0.85rem 0 0;
          padding: 0;
          list-style: none;
        }
        .care-detail-list li {
          display: flex;
          align-items: flex-start;
          gap: 0.4rem;
          color: var(--iv-ink, #07191d);
          font-size: 0.68rem;
          font-weight: 600;
          line-height: 1.35;
        }
        .care-detail-list li svg {
          flex-shrink: 0;
          margin-top: 0.1rem;
          color: #287a72;
        }
        .care-detail-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          margin-top: 1rem;
          padding: 0.55rem 0.9rem;
          border-radius: 99px;
          background: var(--iv-coral, #ff9e7d);
          color: var(--iv-ink, #07191d);
          font-size: 0.65rem;
          font-weight: 800;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .care-detail-cta:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 18px rgba(255, 158, 125, 0.28);
        }
        .care-card-open {
          grid-column: span 4;
        }
        @media (max-width: 800px) {
          .care-card-open {
            grid-column: span 1;
          }
        }
      `}</style>
    </section>
  );
}
