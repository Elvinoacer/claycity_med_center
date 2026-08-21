"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface Card3DTiltProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
  glare?: boolean;
}

export default function Card3DTilt({
  children,
  className = "",
  intensity = 12,
  glare = true,
}: Card3DTiltProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!finePointer || reduced) return;

    let frame = 0;
    let px = 0;
    let py = 0;
    let hovering = false;

    const rest =
      "perspective(1400px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";

    const apply = () => {
      frame = 0;
      if (hovering) {
        const rx = -py * intensity;
        const ry = px * intensity;
        card.style.transition = "none";
        card.style.transform = `perspective(1400px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) scale3d(1.03, 1.03, 1.03)`;
        card.style.willChange = "transform";
      } else {
        card.style.transition =
          "transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)";
        card.style.transform = rest;
        card.style.willChange = "auto";
      }

      const g = glareRef.current;
      if (!g) return;
      if (hovering) {
        const gx = ((px + 1) * 50).toFixed(1);
        const gy = ((py + 1) * 50).toFixed(1);
        g.style.opacity = "0.5";
        g.style.background = `radial-gradient(circle 280px at ${gx}% ${gy}%, rgba(255,255,255,0.55), rgba(186,230,253,0.15) 45%, transparent 72%)`;
      } else {
        g.style.opacity = "0";
      }
    };

    const onMove = (e: PointerEvent) => {
      const rect = card.getBoundingClientRect();
      px = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      py = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      hovering = true;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const onLeave = () => {
      hovering = false;
      px = 0;
      py = 0;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    card.addEventListener("pointermove", onMove, { passive: true });
    card.addEventListener("pointerleave", onLeave);
    return () => {
      card.removeEventListener("pointermove", onMove);
      card.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [intensity]);

  return (
    <div
      ref={cardRef}
      className={`relative ${className}`}
      style={{
        transform: "perspective(1400px) rotateX(0deg) rotateY(0deg)",
        transformStyle: "preserve-3d",
      }}
    >
      {children}
      {glare && (
        <div
          ref={glareRef}
          className="pointer-events-none absolute inset-0 rounded-[inherit] z-30 opacity-0 transition-opacity duration-300"
          aria-hidden="true"
        />
      )}
    </div>
  );
}
