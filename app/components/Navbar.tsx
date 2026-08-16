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
  { label: "Your Visit", href: "#patient-journey" },
  { label: "Location", href: "#location" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        ticking = false;
      });
    };
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
    <>
      {/* Scroll progress (CSS scroll-driven, inert where unsupported) */}
      <div className="scroll-progress" aria-hidden="true" />

      {/* Top utility bar */}
      <div className="hidden md:block bg-brand-950 text-brand-100 text-[13px]">
        <div className="container-page flex items-center justify-between py-2">
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-brand-300" />
              First Street, Clay City Estate, Kasarani — Nairobi
            </span>
            <span className="inline-flex items-center gap-2">
              <CalendarClock className="h-3.5 w-3.5 text-brand-300" />
              Mon–Fri 8am–5pm · Sat 8am–12pm
            </span>
          </div>
          <a
            href="tel:+254721260994"
            className="inline-flex items-center gap-2 font-medium hover:text-white transition-colors"
          >
            <Phone className="h-3.5 w-3.5 text-brand-300" />
            0721 260994
          </a>
        </div>
      </div>

      {/* Main nav */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/85 backdrop-blur-xl border-b border-line shadow-[0_8px_30px_-18px_rgba(13,72,64,0.35)]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <nav
          className="container-page flex items-center justify-between py-3.5"
          aria-label="Primary"
        >
          <a
            href="#top"
            className="flex items-center gap-2.5 group"
            aria-label="Claycity Medical Centre home"
          >
            <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-800 text-white shadow-md shadow-brand-600/30 group-hover:scale-105 group-hover:shadow-brand-600/50 transition-all duration-300">
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
              <span className="font-display text-[17px] font-semibold tracking-tight text-brand-900">
                Claycity Medical
              </span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-ink-muted font-semibold">
                Kasarani · Nairobi
              </span>
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1 rounded-full border border-line/80 bg-white/60 backdrop-blur-sm p-1">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-3.5 py-1.5 text-sm font-medium text-ink-soft hover:text-brand-700 hover:bg-brand-50 rounded-full transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+254721260994"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-800 hover:text-brand-600 transition-colors"
            >
              <Phone className="h-4 w-4" />
              Call us
            </a>
            <a href="#contact" className="btn btn-primary">
              <CalendarClock className="h-4 w-4" />
              Book a Visit
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-50 text-brand-800 border border-brand-100"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </header>

      {/* Mobile sheet */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transition-all duration-300 ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div
          className="absolute inset-0 bg-brand-950/40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
        <aside
          className={`absolute right-0 top-0 h-full w-[88%] max-w-sm bg-white shadow-2xl rounded-l-3xl flex flex-col transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-line">
            <span className="font-display font-semibold text-brand-900">
              Menu
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-brand-800"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex flex-col gap-1 px-4 py-5">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium text-ink hover:bg-brand-50 hover:text-brand-700 transition-colors"
              >
                {l.label}
                <ChevronRight className="h-4 w-4 text-ink-muted" />
              </a>
            ))}
          </div>
          <div className="mt-auto px-5 pb-8 space-y-3 border-t border-line pt-5">
            <a
              href="tel:+254721260994"
              className="btn btn-ghost w-full"
              onClick={() => setOpen(false)}
            >
              <Phone className="h-4 w-4" />
              0721 260994
            </a>
            <a
              href="#contact"
              className="btn btn-primary w-full"
              onClick={() => setOpen(false)}
            >
              <CalendarClock className="h-4 w-4" />
              Book a Visit
            </a>
            <p className="text-center text-xs text-ink-muted pt-2">
              First Street · Clay City Estate · Kasarani
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
