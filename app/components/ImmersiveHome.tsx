"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  Activity,
  ArrowRight,
  Check,
  Clock3,
  HeartHandshake,
  HeartPulse,
  MapPin,
  Menu,
  Navigation,
  Phone,
  Quote,
  ShieldCheck,
  Syringe,
  TestTube,
  Users,
  X,
} from "lucide-react";
import Contact from "./Contact";
import Footer from "./Footer";
import MobileCallBar from "./MobileCallBar";
import ChatWidget from "./ChatWidget";
import HeroStory from "./HeroStory";
import CareSection from "./CareSection";
import heroClinic from "@/public/images/hero-clinic.jpg";
import maternityCare from "@/public/images/maternity-care.jpg";
import pharmacy from "@/public/images/pharmacy-dispensary.jpg";
import triage from "@/public/images/triage-vitals.jpg";
import nursePortrait from "@/public/images/nurse-portrait.jpg";

const TRUST_ITEMS = [
  { icon: ShieldCheck, label: "KMPDC Licensed · Level-2 Clinic" },
  { icon: TestTube, label: "KMLTTB Class-B Laboratory" },
  { icon: Syringe, label: "KEPI-Aligned Immunisation" },
  { icon: HeartPulse, label: "Same-Visit Results" },
];

const NAV_ITEMS = [
  { label: "The story", href: "#story" },
  { label: "Care", href: "#care" },
  { label: "The clinic", href: "#clinic" },
  { label: "Visit us", href: "#visit" },
];

const CHAPTERS: {
  number: string;
  label: string;
  title: string;
  copy: string;
  image: StaticImageData;
  imageAlt: string;
  stat: string;
  icon: typeof HeartPulse;
}[] = [
  {
    number: "01",
    label: "Arrive",
    title: "Soft landing.",
    copy: "A door. A smile. Nowhere to prove yourself.",
    image: heroClinic,
    imageAlt: "Welcoming clinician at a desk inside a bright clinic",
    stat: "Walk-ins welcome",
    icon: HeartHandshake,
  },
  {
    number: "02",
    label: "Be heard",
    title: "Room to speak.",
    copy: "We listen first. Then we walk the next step with you.",
    image: maternityCare,
    imageAlt: "Mother and baby receiving attentive care from a nurse",
    stat: "Every generation",
    icon: Users,
  },
  {
    number: "03",
    label: "Clarity",
    title: "Answers close by.",
    copy: "Lab and pharmacy under one roof — so you leave knowing.",
    image: pharmacy,
    imageAlt: "Pharmacist preparing medicines at an in-house dispensary",
    stat: "Same visit",
    icon: Activity,
  },
  {
    number: "04",
    label: "Forward",
    title: "Home, lighter.",
    copy: "Small check-ins that add up to a healthier rhythm.",
    image: triage,
    imageAlt: "Nurse checking a patient's vital signs",
    stat: "Open 24/7",
    icon: ShieldCheck,
  },
];

function ImmersiveHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`immersive-header ${scrolled ? "is-scrolled" : ""}`}>
      <a href="#top" className="immersive-brand" aria-label="Claycity Medical Centre home">
        <span className="immersive-brand-mark" aria-hidden="true">
          <span />
          <span />
        </span>
        <span>
          <strong>Claycity</strong>
          <small>Medical Centre</small>
        </span>
      </a>

      <nav className="immersive-nav-links" aria-label="Primary navigation">
        {NAV_ITEMS.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <div className="immersive-header-actions">
        <a className="immersive-phone" href="tel:+254712265746">
          <Phone size={15} />
          0712 265746
        </a>
        <a className="immersive-header-cta" href="#contact">
          Book a visit <ArrowRight size={15} />
        </a>
      </div>

      <button
        type="button"
        className="immersive-menu-button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      <div className={`immersive-mobile-menu ${open ? "is-open" : ""}`}>
        {NAV_ITEMS.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
            <ArrowRight size={16} />
          </a>
        ))}
        <a className="immersive-mobile-cta" href="#contact" onClick={() => setOpen(false)}>
          Book a visit <ArrowRight size={16} />
        </a>
      </div>
    </header>
  );
}

function StoryOrbit({ active }: { active: number }) {
  return (
    <div className="story-stage" aria-label="A visual map of the Claycity care journey">
      <div className="story-stage-grid" aria-hidden="true" />
      <div className="story-stage-glow" aria-hidden="true" />
      <div className="story-orbit story-orbit-one" aria-hidden="true" />
      <div className="story-orbit story-orbit-two" aria-hidden="true" />

      {CHAPTERS.map((chapter, index) => {
        const offset = index - active;
        const distance = Math.abs(offset);
        const style = {
          transform: `translate3d(calc(-50% + ${offset * 18}%), ${offset * 6}%, ${-distance * 110}px) rotateY(${offset * -28}deg) rotateX(${distance * 4}deg) rotateZ(${offset * 2.8}deg) scale(${1 - distance * 0.1})`,
          opacity: distance > 2 ? 0 : 1 - distance * 0.2,
          zIndex: 10 - distance,
          filter: distance === 0 ? "saturate(1.05)" : `saturate(${0.7 - distance * 0.08}) brightness(${1 - distance * 0.06})`,
        } as CSSProperties;

        return (
          <div
            key={chapter.number}
            className={`story-image-card ${index === active ? "is-active" : ""}`}
            style={style}
            aria-hidden={index !== active}
          >
            <Image
              src={chapter.image}
              alt={chapter.imageAlt}
              fill
              sizes="(max-width: 900px) 78vw, 38vw"
              placeholder="blur"
              className="object-cover"
            />
            <div className="story-image-shade" />
            <div className="story-image-meta">
              <span>{chapter.number}</span>
              <small>{chapter.stat}</small>
            </div>
          </div>
        );
      })}

      <div className="story-core" aria-hidden="true">
        <span className="story-core-ring story-core-ring-one" />
        <span className="story-core-ring story-core-ring-two" />
        <HeartPulse size={30} strokeWidth={1.4} />
      </div>

      <div className="story-stage-label">
        <span className="story-stage-label-dot" />
        <span>One visit at a time</span>
      </div>
    </div>
  );
}

function StorySection() {
  const [active, setActive] = useState(0);
  const chapterRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const updateActive = () => {
      const midpoint = window.innerHeight * 0.46;
      let closest = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      chapterRefs.current.forEach((chapter, index) => {
        if (!chapter) return;
        const rect = chapter.getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height / 2 - midpoint);
        if (distance < closestDistance) {
          closest = index;
          closestDistance = distance;
        }
      });

      setActive(closest);
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, []);

  const jumpToChapter = (index: number) => {
    chapterRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section id="story" className="immersive-story" aria-labelledby="story-heading">
      <div className="container-page story-intro" data-reveal>
        <div>
          <span className="immersive-kicker light-kicker">Still with you</span>
          <h2 id="story-heading">The visit, slower.</h2>
        </div>
        <p>Four beats. No forms. Just how it feels.</p>
      </div>

      <div className="container-page story-layout">
        <div className="story-chapters">
          {CHAPTERS.map((chapter, index) => {
            const Icon = chapter.icon;
            return (
              <article
                key={chapter.number}
                ref={(node) => {
                  chapterRefs.current[index] = node;
                }}
                className={`story-chapter ${index === active ? "is-active" : ""}`}
                onClick={() => jumpToChapter(index)}
              >
                <div className="story-chapter-marker">
                  <span>{chapter.number}</span>
                  <i />
                </div>
                <div className="story-chapter-content">
                  <div className="story-chapter-label">
                    <Icon size={15} />
                    {chapter.label}
                  </div>
                  <h3>{chapter.title}</h3>
                  <p>{chapter.copy}</p>
                  <span className="story-chapter-stat">
                    <Check size={13} /> {chapter.stat}
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        <div className="story-sticky">
          <StoryOrbit active={active} />
          <div className="story-progress" aria-label={`Chapter ${active + 1} of ${CHAPTERS.length}`}>
            {CHAPTERS.map((chapter, index) => (
              <button
                key={chapter.number}
                type="button"
                className={index === active ? "is-active" : ""}
                onClick={() => jumpToChapter(index)}
                aria-label={`Go to chapter ${index + 1}: ${chapter.label}`}
              >
                <span>{chapter.number}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ClinicSection() {
  return (
    <section id="clinic" className="immersive-clinic" aria-labelledby="clinic-heading">
      <div className="clinic-orb" aria-hidden="true" />
      <div className="container-page clinic-layout">
        <div className="clinic-image-wrap" data-reveal>
          <div className="clinic-image-outline" aria-hidden="true" />
          <div className="clinic-image">
            <Image
              src={nursePortrait}
              alt="A Claycity Medical Centre nurse ready to care for patients"
              fill
              sizes="(max-width: 900px) 86vw, 40vw"
              placeholder="blur"
              className="object-cover"
            />
          </div>
          <div className="clinic-image-note"><Quote size={15} /><span>“You are a neighbour,<br />not a queue number.”</span></div>
        </div>

        <div className="clinic-copy" data-reveal style={{ "--reveal-delay": "120ms" } as CSSProperties}>
          <span className="immersive-kicker light-kicker">The people</span>
          <h2 id="clinic-heading">Medicine with<br /><em>neighbourhood heart.</em></h2>
          <p className="clinic-lede">Clinically sound. Deeply human. Same roof.</p>
          <div className="clinic-values">
            <div><span><ShieldCheck size={16} /></span><p><strong>Licensed</strong>Level-2 · Class-B lab</p></div>
            <div><span><HeartHandshake size={16} /></span><p><strong>Explained</strong>No rushed handoffs</p></div>
            <div><span><WalletIcon /></span><p><strong>Honest pricing</strong>M-Pesa welcome</p></div>
          </div>
          <a className="immersive-text-link light-link" href="#visit">Meet us on First Street <ArrowRight size={16} /></a>
        </div>
      </div>

      <div className="container-page clinic-stats">
        <div><strong>2018</strong><span>Serving Kasarani</span></div>
        <div><strong>Level-2</strong><span>KMPDC licensed</span></div>
        <div><strong>Class B</strong><span>On-site lab</span></div>
        <div><strong>24/7</strong><span>Open day &amp; night</span></div>
      </div>
    </section>
  );
}

function WalletIcon() {
  return <span className="wallet-glyph">K</span>;
}

function VisitSection() {
  return (
    <section id="visit" className="immersive-visit" aria-labelledby="visit-heading">
      <div className="container-page visit-layout">
        <div data-reveal>
          <span className="immersive-kicker">Find us</span>
          <h2 id="visit-heading">Your next good step<br /><em>is close.</em></h2>
          <p className="visit-lede">First Street, Clay City Estate.<br />Kasarani, Nairobi.</p>
          <div className="visit-actions">
            <a className="immersive-button dark-button" href="https://maps.google.com/?q=Claycity+Medical+Centre+Kasarani" target="_blank" rel="noreferrer">
              <Navigation size={16} /> Directions <ArrowRight size={15} />
            </a>
            <a className="visit-call" href="tel:+254712265746"><Phone size={16} /> 0712 265746</a>
          </div>
        </div>
        <div className="visit-details" data-reveal style={{ "--reveal-delay": "140ms" } as CSSProperties}>
          <div className="visit-detail-head"><span className="live-dot" /> <span>We&apos;re here</span></div>
          <div className="visit-hours"><Clock3 size={21} /><div><span>Hours</span><strong>Open 24/7</strong><small>Day &amp; night · every day</small></div></div>
          <div className="visit-detail-rule" />
          <div className="visit-address"><MapPin size={20} /><div><span>Clinic</span><strong>First Street, Clay City Estate</strong><small>Kasarani · P.O. Box 784–00618</small></div></div>
          <a href="mailto:nabiclaycitymedical@yahoo.com" className="visit-email">nabiclaycitymedical@yahoo.com <ArrowRight size={14} /></a>
        </div>
      </div>
    </section>
  );
}

export default function ImmersiveHome() {
  return (
    <div className="immersive-page">
      <ImmersiveHeader />
      <main id="main">
        <HeroStory />
        <div className="immersive-trust-band" aria-label="Clinic credentials">
          <div className="trust-marquee">
            <div className="trust-track">
              {[...TRUST_ITEMS, ...TRUST_ITEMS].map((item, i) => (
                <span key={`${item.label}-${i}`} aria-hidden={i >= TRUST_ITEMS.length}>
                  <item.icon size={16} /> {item.label}
                </span>
              ))}
            </div>
          </div>
        </div>
        <StorySection />
        <CareSection />
        <ClinicSection />
        <VisitSection />
        <Contact />
      </main>
      <Footer />
      <MobileCallBar />
      <ChatWidget />
    </div>
  );
}
