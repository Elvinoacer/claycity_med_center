"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  ArrowDown,
  ArrowRight,
  Heart,
  MapPin,
  Sparkles,
} from "lucide-react";
import OpenStatus from "./OpenStatus";
import HeroCanvas from "./interactive/HeroCanvas";
import heroClinic from "@/public/images/hero-clinic.jpg";
import maternityCare from "@/public/images/maternity-care.jpg";
import pharmacy from "@/public/images/pharmacy-dispensary.jpg";
import triage from "@/public/images/triage-vitals.jpg";
import lab from "@/public/images/lab-services.jpg";
import nursePortrait from "@/public/images/nurse-portrait.jpg";
import childImmunisation from "@/public/images/child-immunisation.jpg";
import consultation from "@/public/images/consultation.jpg";

type Moment = {
  id: string;
  image: StaticImageData;
  alt: string;
  whisper: string;
  line: string;
  go?: { label: string; href: string };
};

const MOMENTS: Moment[] = [
  {
    id: "door",
    image: heroClinic,
    alt: "A warm welcome at the clinic desk",
    whisper: "First Street",
    line: "You walk in. Someone smiles first.",
  },
  {
    id: "listen",
    image: consultation,
    alt: "Quiet conversation with a clinician",
    whisper: "The room softens",
    line: "No rush. Just room for what you came to say.",
  },
  {
    id: "hands",
    image: nursePortrait,
    alt: "A nurse ready to care",
    whisper: "Familiar faces",
    line: "Care that knows your neighbourhood.",
    go: { label: "Meet the people", href: "#clinic" },
  },
  {
    id: "little",
    image: maternityCare,
    alt: "Mother and baby receiving gentle care",
    whisper: "Small moments",
    line: "From first immunisations to everyday check-ins.",
    go: { label: "See how we care", href: "#care" },
  },
  {
    id: "answers",
    image: lab,
    alt: "On-site laboratory",
    whisper: "Same visit",
    line: "Tests close by. Answers before you leave.",
  },
  {
    id: "home",
    image: pharmacy,
    alt: "In-house pharmacy",
    whisper: "Then home",
    line: "Medicine in hand. A little more certainty.",
    go: { label: "Find us", href: "#visit" },
  },
];

const FLOATERS = [
  { image: triage, alt: "Vitals check", className: "hero-float hero-float-a" },
  { image: childImmunisation, alt: "Well-baby visit", className: "hero-float hero-float-b" },
  { image: nursePortrait, alt: "Our team", className: "hero-float hero-float-c" },
];

export default function HeroStory() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onScroll = () => {
      const rect = track.getBoundingClientRect();
      const total = track.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const p = total > 0 ? scrolled / total : 0;
      setProgress(p);

      const idx = Math.min(
        MOMENTS.length - 1,
        Math.floor(p * MOMENTS.length + 0.001)
      );
      setActive(idx);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const moment = MOMENTS[active];

  return (
    <section id="top" className="hero-story" aria-label="A visit, in moments">
      <div ref={trackRef} className="hero-story-track">
        <div className="hero-story-sticky">
          <div className="hero-story-atmosphere" aria-hidden="true">
            <HeroCanvas />
            <div className="hero-story-grain" />
            <div className="hero-story-vignette" />
          </div>

          {/* Full-bleed image stack */}
          <div className="hero-story-stage" aria-hidden={false}>
            {MOMENTS.map((m, i) => {
              const isActive = i === active;
              const dist = Math.abs(i - active);
              return (
                <div
                  key={m.id}
                  className={`hero-story-frame ${isActive ? "is-active" : ""}`}
                  style={
                    {
                      opacity: isActive ? 1 : dist === 1 ? 0.18 : 0,
                      transform: isActive
                        ? "scale(1) translate3d(0,0,0)"
                        : `scale(${1.06 + dist * 0.02}) translate3d(0, ${dist * 12}px, 0)`,
                      zIndex: isActive ? 3 : 1,
                    } as CSSProperties
                  }
                >
                  <Image
                    src={m.image}
                    alt={m.alt}
                    fill
                    priority={i === 0}
                    placeholder="blur"
                    sizes="100vw"
                    className="object-cover"
                  />
                  <div className="hero-story-shade" />
                </div>
              );
            })}

            {/* Floating polaroids — charm, not clutter */}
            <div className="hero-floaters" aria-hidden="true">
              {FLOATERS.map((f, i) => (
                <div
                  key={f.className}
                  className={f.className}
                  style={
                    {
                      "--drift": `${(progress * 40 + i * 12) % 24 - 12}px`,
                      opacity: 0.55 + Math.sin(progress * Math.PI + i) * 0.15,
                    } as CSSProperties
                  }
                >
                  <Image src={f.image} alt="" fill sizes="180px" className="object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Minimal copy — one moment at a time */}
          <div className="hero-story-copy">
            <div className="hero-story-topbar">
              <OpenStatus />
              <span className="hero-story-pin">
                <MapPin size={12} /> Clay City
              </span>
            </div>

            <div key={moment.id} className="hero-story-moment">
              <p className="hero-story-whisper">
                <Sparkles size={12} /> {moment.whisper}
              </p>
              <h1 className="hero-story-line">{moment.line}</h1>
              {moment.go && (
                <a className="hero-story-branch" href={moment.go.href}>
                  {moment.go.label} <ArrowRight size={15} />
                </a>
              )}
            </div>

            <div className="hero-story-nav" role="tablist" aria-label="Story moments">
              {MOMENTS.map((m, i) => (
                <button
                  key={m.id}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-label={m.whisper}
                  className={i === active ? "is-active" : ""}
                  onClick={() => {
                    const track = trackRef.current;
                    if (!track) return;
                    const total = track.offsetHeight - window.innerHeight;
                    const target =
                      track.offsetTop +
                      (i / Math.max(MOMENTS.length - 1, 1)) * total;
                    window.scrollTo({ top: target, behavior: "smooth" });
                  }}
                />
              ))}
            </div>

            <div className="hero-story-paths">
              <a href="#story" className="hero-path soft">
                <Heart size={14} /> Feel the visit
              </a>
              <a href="#care" className="hero-path">
                Ways we care <ArrowRight size={14} />
              </a>
              <a href="#visit" className="hero-path soft">
                Come by
              </a>
              <a href="#contact" className="hero-path coral">
                Book a moment <ArrowRight size={14} />
              </a>
            </div>

            <div className="hero-story-scroll-hint" aria-hidden="true">
              <span>Drift through</span>
              <ArrowDown size={14} />
            </div>
          </div>

          <div
            className="hero-story-progress"
            aria-hidden="true"
            style={{ transform: `scaleX(${progress})` }}
          />
        </div>
      </div>
    </section>
  );
}
