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
      className={`lg:hidden fixed inset-x-0 bottom-0 z-50 px-3 pb-[max(0.85rem,env(safe-area-inset-bottom))] pt-2 transition-all duration-400 ${
        show ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="glass flex items-center gap-2.5 rounded-2xl p-2.5 shadow-2xl shadow-brand-950/20 border border-white/60">
        <a href="tel:+254721260994" className="btn btn-accent flex-1 py-3.5 text-[0.95rem]">
          <Phone className="h-4 w-4" />
          Call now
        </a>
        <a href="#contact" className="btn btn-primary flex-1 py-3.5 text-[0.95rem]">
          <CalendarClock className="h-4 w-4" />
          Book Visit
        </a>
      </div>
    </div>
  );
}
