"use client";

import { useEffect, useState } from "react";
import {
  Menu,
  X,
  Phone,
  CalendarClock,
  MapPin,
  ChevronRight,
} from "lucide-react";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Patient Journey", href: "#patient-journey" },
  { label: "Why Us", href: "#why-us" },
  { label: "Location", href: "#location" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#top");

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 16);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0.1, 0.25, 0.5] }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className="hidden md:block bg-brand-950 text-brand-100 text-[13px] border-b border-brand-900/80">
        <div className="container-page flex items-center justify-between py-2">
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-2 text-brand-200">
              <MapPin className="h-3.5 w-3.5 text-brand-400" />
              First Street, Clay City Estate, Kasarani — Nairobi
            </span>
            <span className="inline-flex items-center gap-2 text-brand-200">
              <CalendarClock className="h-3.5 w-3.5 text-brand-400" />
              Mon–Fri 8am–5pm · Sat 8am–12pm
            </span>
          </div>
          <a
            href="tel:+254721260994"
            className="inline-flex items-center gap-2 font-semibold text-white hover:text-accent-300 transition-colors"
          >
            <Phone className="h-3.5 w-3.5 text-accent-400" />
            0721 260994
          </a>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-350 ${
          scrolled
            ? "bg-white/78 backdrop-blur-2xl border-b border-line/80 shadow-lg shadow-brand-950/6"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <nav
          className="container-page flex items-center justify-between py-3.5"
          aria-label="Primary Navigation"
        >
          <a
            href="#top"
            className="flex items-center gap-2.5 group"
            aria-label="Claycity Medical Centre Home"
          >
            <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-brand-900 text-white shadow-md shadow-brand-700/20 group-hover:scale-105 transition-transform">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 21c-4.5-3-8-7-8-11.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8 2.5c0 4.5-3.5 8-8 11.5Z" />
              </svg>
            </span>
            <span className="flex flex-col leading-tight">
              <span className="font-display text-[17px] font-bold tracking-tight text-brand-950">
                Claycity Medical
              </span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-brand-700 font-semibold">
                Kasarani · Level-2 Clinic
              </span>
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-1 rounded-full border border-line/80 bg-white/70 backdrop-blur-sm p-1 shadow-sm">
            {NAV_LINKS.map((l) => {
              const isActive = active === l.href;
              return (
                <a
                  key={l.href}
                  href={l.href}
                  className={`px-3.5 py-1.5 text-sm font-medium rounded-full transition-colors ${
                    isActive
                      ? "bg-brand-600 text-white shadow-sm"
                      : "text-ink-soft hover:text-brand-700 hover:bg-brand-50"
                  }`}
                >
                  {l.label}
                </a>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+254721260994"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-800 hover:text-brand-600 transition-colors"
            >
              <Phone className="h-4 w-4 text-brand-600" />
              0721 260994
            </a>
            <a href="#contact" className="btn btn-primary">
              <CalendarClock className="h-4 w-4" />
              Book a Visit
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-800 border border-brand-200 shadow-sm active:scale-95 transition-transform"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </header>

      <div
        className={`lg:hidden fixed inset-0 z-50 transition-all duration-350 ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div
          className="absolute inset-0 bg-brand-950/55 backdrop-blur-md"
          onClick={() => setOpen(false)}
        />
        <aside
          className={`absolute right-0 top-0 h-full w-[min(88%,22rem)] bg-white/95 backdrop-blur-xl shadow-2xl rounded-l-[1.75rem] flex flex-col transition-transform duration-350 ease-out border-l border-white/60 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-line/80">
            <span className="font-display font-semibold text-brand-950 tracking-tight">
              Claycity Medical
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-50 text-brand-800 border border-brand-100 active:scale-95 transition-transform"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex flex-col gap-1 px-3.5 py-5">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-[1.05rem] font-medium text-ink hover:bg-brand-50 hover:text-brand-700 active:bg-brand-100 transition-colors"
              >
                {l.label}
                <ChevronRight className="h-4 w-4 text-ink-muted" />
              </a>
            ))}
          </div>
          <div className="mt-auto px-5 pb-[max(1.75rem,env(safe-area-inset-bottom))] space-y-3 border-t border-line/80 pt-5">
            <a
              href="tel:+254721260994"
              className="btn btn-ghost w-full py-3.5"
              onClick={() => setOpen(false)}
            >
              <Phone className="h-4 w-4" />
              0721 260994
            </a>
            <a
              href="#contact"
              className="btn btn-primary w-full py-3.5"
              onClick={() => setOpen(false)}
            >
              <CalendarClock className="h-4 w-4" />
              Book a Visit
            </a>
            <p className="text-center text-xs text-ink-muted pt-1.5">
              First Street · Clay City Estate · Kasarani
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
