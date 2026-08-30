"use client";

import { useEffect, useState } from "react";
import { Phone, CalendarClock } from "lucide-react";

export default function MobileCallBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`lg:hidden fixed inset-x-0 bottom-0 z-50 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 transition-all duration-500 ${
        show
          ? "translate-y-0 opacity-100"
          : "translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div
        className="relative overflow-hidden rounded-[1.35rem] border border-white/12 shadow-[0_16px_48px_rgba(7,25,29,0.45)]"
        style={{
          background:
            "linear-gradient(135deg, rgba(10,34,38,0.96) 0%, rgba(7,25,29,0.98) 100%)",
        }}
      >
        {/* Soft accent glow */}
        <div
          className="pointer-events-none absolute -left-8 top-0 h-full w-24 opacity-40"
          style={{
            background:
              "radial-gradient(circle at 30% 50%, rgba(255,158,125,0.35), transparent 70%)",
          }}
        />
        <div
          className="pointer-events-none absolute -right-6 top-0 h-full w-20 opacity-30"
          style={{
            background:
              "radial-gradient(circle at 70% 50%, rgba(168,223,214,0.3), transparent 70%)",
          }}
        />

        <div className="relative flex items-center gap-2 p-2">
          <a
            href="tel:+254721260994"
            className="flex flex-1 items-center justify-center gap-2 rounded-[1rem] border border-white/15 bg-white/8 px-3 py-3 text-[0.8125rem] font-bold text-white backdrop-blur-sm transition active:scale-[0.98]"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#a8dfd6]/20 text-[#a8dfd6]">
              <Phone className="h-3.5 w-3.5" />
            </span>
            Call now
          </a>
          <a
            href="#contact"
            className="flex flex-1 items-center justify-center gap-2 rounded-[1rem] bg-gradient-to-br from-[#ff9e7d] to-[#e07a5a] px-3 py-3 text-[0.8125rem] font-extrabold text-[#07191d] shadow-[0_8px_20px_rgba(255,158,125,0.3)] transition active:scale-[0.98]"
          >
            <CalendarClock className="h-3.5 w-3.5" />
            Book visit
          </a>
        </div>
      </div>
    </div>
  );
}
