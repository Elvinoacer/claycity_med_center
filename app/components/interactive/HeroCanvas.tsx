"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

function canUseWebGL() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return false;
  }
  const nav = navigator as Navigator & {
    connection?: { saveData?: boolean };
    deviceMemory?: number;
  };
  if (nav.connection?.saveData) return false;
  if (typeof nav.deviceMemory === "number" && nav.deviceMemory <= 2) {
    return false;
  }
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    return Boolean(gl);
  } catch {
    return false;
  }
}

export default function HeroCanvas() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const start = () => {
      if (!cancelled && canUseWebGL()) setEnabled(true);
    };

    const t = window.setTimeout(start, 350);
    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
  }, []);

  if (!enabled) return null;
  return <HeroScene />;
}
