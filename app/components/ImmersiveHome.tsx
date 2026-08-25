"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  Baby,
  CalendarDays,
  Check,
  Clock3,
  HeartHandshake,
  HeartPulse,
  MapPin,
  Menu,
  Navigation,
  Phone,
  Pill,
  Quote,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Syringe,
  TestTube,
  Users,
  X,
} from "lucide-react";
import Contact from "./Contact";
import Footer from "./Footer";
import MobileCallBar from "./MobileCallBar";
import OpenStatus from "./OpenStatus";
import HeroCanvas from "./interactive/HeroCanvas";
import heroClinic from "@/public/images/hero-clinic.jpg";
import maternityCare from "@/public/images/maternity-care.jpg";
import pharmacy from "@/public/images/pharmacy-dispensary.jpg";
import triage from "@/public/images/triage-vitals.jpg";
import lab from "@/public/images/lab-services.jpg";
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
    label: "Arrive as you are",
    title: "A softer first step.",
    copy: "From the moment you walk through our door, the experience is human. No intimidating corridors. No feeling like a number.",
    image: heroClinic,
    imageAlt: "Welcoming clinician at a desk inside a bright clinic",
    stat: "Walk-ins welcome",
    icon: HeartHandshake,
  },
  {
    number: "02",
    label: "Be truly heard",
    title: "Care that starts with listening.",
    copy: "We take time to understand what is happening, explain what comes next, and make room for the questions you came in with.",
    image: maternityCare,
    imageAlt: "Mother and baby receiving attentive care from a nurse",
    stat: "Care for every generation",
    icon: Users,
  },
  {
    number: "03",
    label: "Leave with clarity",
    title: "Answers you can act on.",
    copy: "With on-site diagnostics and a stocked pharmacy, your next step can happen here — clearly, conveniently, and in one visit.",
    image: pharmacy,
    imageAlt: "Pharmacist preparing medicines at an in-house dispensary",
    stat: "Same-visit support",
    icon: Activity,
  },
  {
    number: "04",
    label: "Keep moving forward",
    title: "A healthier rhythm for home.",
    copy: "From a baby's first immunisation to everyday wellness checks, we are here for the small moments that add up to a healthier life.",
    image: triage,
    imageAlt: "Nurse checking a patient's vital signs",
    stat: "Open Mon–Sat",
    icon: ShieldCheck,
  },
];

const CARE_ITEMS = [
  {
    icon: Baby,
    title: "Maternal & child health",
    copy: "Antenatal, postnatal and well-baby care with patience built in.",
    image: maternityCare,
    tag: "Family care",
  },
  {
    icon: Stethoscope,
    title: "Outpatient consultation",
    copy: "Unhurried support for acute illness, minor injuries and follow-ups.",
    image: heroClinic,
    tag: "Primary care",
  },
  {
    icon: TestTube,
    title: "Laboratory diagnostics",
    copy: "Routine blood, urine and rapid tests, with same-visit results where possible.",
    image: lab,
    tag: "Class-B lab",
  },
  {
    icon: Pill,
    title: "In-house pharmacy",
    copy: "Quality-assured medicines and clear dosage guidance before you leave.",
    image: pharmacy,
    tag: "On-site",
  },
  {
    icon: Syringe,
    title: "Immunisation",
    copy: "KEPI-aligned vaccinations for little ones and tetanus protection for mothers.",
    image: maternityCare,
    tag: "Prevention",
  },
  {
    icon: HeartPulse,
    title: "Wellness screening",
    copy: "Blood pressure, blood sugar, BMI and the simple checks that keep you informed.",
    image: triage,
    tag: "Everyday health",
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
        <a className="immersive-phone" href="tel:+254721260994">
          <Phone size={15} />
          0721 260994
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
          transform: `translate3d(calc(-50% + ${offset * 17}%), ${offset * 5}%, ${-distance * 78}px) rotateY(${offset * -24}deg) rotateZ(${offset * 2.5}deg) scale(${1 - distance * 0.085})`,
          opacity: distance > 2 ? 0 : 1 - distance * 0.18,
          zIndex: 10 - distance,
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
          <span className="immersive-kicker light-kicker">The Claycity way</span>
          <h2 id="story-heading">Good care has a feeling.</h2>
        </div>
        <p>
          Scroll through the moments that make a visit feel different: a welcome,
          a conversation, an answer, and a little more confidence on the way home.
        </p>
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

function Hero() {
  return (
    <section id="top" className="immersive-hero" aria-labelledby="hero-title">
      <div className="immersive-hero-noise" aria-hidden="true" />
      <div className="immersive-hero-gradient" aria-hidden="true" />
      <HeroCanvas />

      <div className="container-page immersive-hero-inner">
        <div className="immersive-hero-copy">
          <div className="immersive-hero-status" style={{ "--rise-delay": "0.05s" } as CSSProperties}>
            <OpenStatus />
            <span><MapPin size={13} /> First Street, Clay City</span>
          </div>
          <p className="immersive-kicker" style={{ "--rise-delay": "0.15s" } as CSSProperties}>A little closer to home</p>
          <h1 id="hero-title" style={{ "--rise-delay": "0.25s" } as CSSProperties}>
            Care that <em>moves</em><br />
            <span>with you.</span>
          </h1>
          <p className="immersive-hero-lede" style={{ "--rise-delay": "0.35s" } as CSSProperties}>
            A warm, licensed outpatient clinic in Kasarani for the people and
            moments that matter most.
          </p>
          <div className="immersive-hero-actions" style={{ "--rise-delay": "0.45s" } as CSSProperties}>
            <a className="immersive-button coral-button" href="#contact">
              <CalendarDays size={17} /> Book a visit <ArrowRight size={16} />
            </a>
            <a className="immersive-text-link" href="#story">
              Take the journey <ArrowDownRight size={17} />
            </a>
          </div>
          <div className="immersive-hero-proof" style={{ "--rise-delay": "0.55s" } as CSSProperties}>
            <div className="proof-avatars" aria-hidden="true">
              <span>✦</span><span>+</span><span>♥</span>
            </div>
            <p><strong>Trusted nearby.</strong> Licensed Level-2 care, since 2018.</p>
          </div>
        </div>

        <div className="immersive-hero-visual" aria-label="A welcoming view of the clinic">
          <div className="hero-visual-backdrop" aria-hidden="true" />
          <div className="hero-photo-frame">
            <Image
              src={heroClinic}
              alt="A smiling clinician welcoming patients at Claycity Medical Centre"
              fill
              priority
              loading="eager"
              placeholder="blur"
              sizes="(max-width: 900px) 92vw, 51vw"
              className="object-cover"
            />
            <div className="hero-photo-gradient" />
            <div className="hero-photo-caption">
              <span>01 / Welcome</span>
              <strong>Come as you are.</strong>
            </div>
          </div>
          <div className="hero-float-note hero-note-top">
            <span className="hero-note-icon"><HeartPulse size={16} /></span>
            <span><small>Feels like home</small><strong>Human, always</strong></span>
          </div>
          <div className="hero-float-note hero-note-bottom">
            <span className="hero-note-number">10<span>+</span></span>
            <span><small>ways to care</small><strong>for your family</strong></span>
          </div>
          <span className="hero-coordinate">01°13′06″ S &nbsp; 36°54′11″ E</span>
        </div>
      </div>

      <div className="container-page immersive-hero-footer">
        <span>Scroll to explore</span>
        <span className="hero-scroll-line"><i /></span>
        <span>Clay City · Nairobi</span>
      </div>
    </section>
  );
}

function CareSection() {
  return (
    <section id="care" className="immersive-care" aria-labelledby="care-heading">
      <div className="container-page">
        <div className="care-heading-row">
          <div>
            <span className="immersive-kicker">Care, in full</span>
            <h2 id="care-heading">Everything you need.<br /><em>Nothing you don&apos;t.</em></h2>
          </div>
          <p>
            Thoughtful, everyday healthcare for Clay City, Seasons and the wider
            Kasarani community — delivered by a team that knows care is personal.
          </p>
        </div>

        <div className="care-grid" data-reveal>
          {CARE_ITEMS.map((item, index) => {
            const Icon = item.icon;
            return (
              <article className={`care-card care-card-${index + 1}`} key={item.title}>
                <div className="care-card-image">
                  <Image src={item.image} alt="" fill sizes="(max-width: 700px) 90vw, 30vw" className="object-cover" />
                  <span className="care-card-tag">{item.tag}</span>
                  <span className="care-card-number">0{index + 1}</span>
                </div>
                <div className="care-card-body">
                  <span className="care-card-icon"><Icon size={18} /></span>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                  <a href="#contact" aria-label={`Book ${item.title}`}>
                    Explore care <ArrowRight size={15} />
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        <div className="care-bottom-line">
          <span><Sparkles size={16} /> Calm care. Clear answers. Close to home.</span>
          <a href="#contact">Not sure where to start? Talk to us <ArrowRight size={15} /></a>
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
          <span className="immersive-kicker light-kicker">The people behind the care</span>
          <h2 id="clinic-heading">Modern medicine.<br /><em>Neighbourhood heart.</em></h2>
          <p className="clinic-lede">
            We built Claycity Medical Centre around a simple belief: the best care
            is clinically sound and deeply human at the same time.
          </p>
          <div className="clinic-values">
            <div><span><ShieldCheck size={16} /></span><p><strong>Licensed with confidence</strong>Level-2 clinic · Class-B laboratory</p></div>
            <div><span><HeartHandshake size={16} /></span><p><strong>Explained with care</strong>Clear guidance, no rushed handoffs</p></div>
            <div><span><WalletIcon /></span><p><strong>Priced with honesty</strong>Fair community pricing · M-Pesa accepted</p></div>
          </div>
          <a className="immersive-text-link light-link" href="#visit">Meet us at First Street <ArrowRight size={16} /></a>
        </div>
      </div>

      <div className="container-page clinic-stats">
        <div><strong>2018</strong><span>Serving Kasarani</span></div>
        <div><strong>Level-2</strong><span>KMPDC licensed</span></div>
        <div><strong>Class B</strong><span>On-site lab</span></div>
        <div><strong>Mon–Sat</strong><span>Open six days</span></div>
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
          <span className="immersive-kicker">Make your way here</span>
          <h2 id="visit-heading">Your next good step<br /><em>is close.</em></h2>
          <p className="visit-lede">First Street, Clay City Estate.<br />Kasarani, Nairobi.</p>
          <div className="visit-actions">
            <a className="immersive-button dark-button" href="https://maps.google.com/?q=Claycity+Medical+Centre+Kasarani" target="_blank" rel="noreferrer">
              <Navigation size={16} /> Get directions <ArrowRight size={15} />
            </a>
            <a className="visit-call" href="tel:+254721260994"><Phone size={16} /> 0721 260994</a>
          </div>
        </div>
        <div className="visit-details" data-reveal style={{ "--reveal-delay": "140ms" } as CSSProperties}>
          <div className="visit-detail-head"><span className="live-dot" /> <span>We&apos;re here when you need us</span></div>
          <div className="visit-hours"><Clock3 size={21} /><div><span>Opening hours</span><strong>Mon–Fri &nbsp; 8:00 — 17:00</strong><strong>Saturday &nbsp; 8:00 — 12:00</strong><small>Sunday closed</small></div></div>
          <div className="visit-detail-rule" />
          <div className="visit-address"><MapPin size={20} /><div><span>Find the clinic</span><strong>First Street, Clay City Estate</strong><small>Kasarani, Nairobi · P.O. Box 784–00618</small></div></div>
          <a href="mailto:nabiclaycitymedical@yahoo.com" className="visit-email">nabiclaycitymedical@yahoo.com <ArrowUpRightIcon /></a>
        </div>
      </div>
    </section>
  );
}

function ArrowUpRightIcon() {
  return <ArrowRight size={14} />;
}

export default function ImmersiveHome() {
  return (
    <div className="immersive-page">
      <ImmersiveHeader />
      <main id="main">
        <Hero />
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
    </div>
  );
}
