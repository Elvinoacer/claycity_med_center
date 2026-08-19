"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

function revealTarget(hash: string) {
  if (!hash || hash.length < 2) return null;
  const el = document.querySelector<HTMLElement>(hash);
  if (!el) return null;
  el.classList.add("is-visible");
  el.querySelectorAll<HTMLElement>("[data-reveal]").forEach((n) => {
    n.classList.add("is-visible");
  });
  return el;
}

export default function SmoothScrollProvider({
  children,
}: {
  children: ReactNode;
}) {
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    const bar = document.getElementById("scroll-progress");
    const setProgress = (progress: number) => {
      if (bar) bar.style.transform = `scaleX(${progress})`;
      document.documentElement.style.setProperty(
        "--scroll-progress",
        String(progress)
      );
    };

    const nativeScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? el.scrollTop / max : 0);
    };

    if (reduced || coarse) {
      nativeScroll();
      window.addEventListener("scroll", nativeScroll, { passive: true });
      revealTarget(window.location.hash);
      return () => window.removeEventListener("scroll", nativeScroll);
    }

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.92,
      touchMultiplier: 1,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    lenis.on("scroll", ({ progress }: { progress: number }) => {
      setProgress(progress);
    });

    const hashEl = revealTarget(window.location.hash);
    if (hashEl) {
      lenis.scrollTo(hashEl, { offset: -72, immediate: true });
    }

    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href || !href.startsWith("#") || href.length < 2) return;
      const el = revealTarget(href);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -72 });
    };
    document.addEventListener("click", handleAnchorClick);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (reduced) {
      nodes.forEach((n) => n.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.08, rootMargin: "80px 0px -4% 0px" }
    );
    nodes.forEach((n) => io.observe(n));
    const fallback = window.setTimeout(() => {
      nodes.forEach((n) => n.classList.add("is-visible"));
    }, 1800);
    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <>
      <div id="scroll-progress" className="scroll-progress" aria-hidden="true" />
      {children}
    </>
  );
}
