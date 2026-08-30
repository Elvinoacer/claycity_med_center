"use client";

import { useEffect, useState } from "react";

/**
 * The clinic is staffed 24/7, so the public status never switches to a
 * "closed" state. The client-side clock is only used to keep the live status
 * feeling current without hydration mismatches.
 */
export default function OpenStatus() {
  const [status, setStatus] = useState<{ open: boolean; label: string } | null>(null);

  useEffect(() => {
    const compute = () => {
      setStatus({ open: true, label: "Open now · 24/7" });
    };

    compute();
    const id = setInterval(compute, 60_000);
    return () => clearInterval(id);
  }, []);

  if (!status) {
    return (
      <span className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold bg-brand-50/10 text-brand-200 border border-brand-300/30">
        <span className="h-1.5 w-1.5 rounded-full bg-brand-300" />
        Open 24/7
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold bg-brand-50 text-brand-700 border border-brand-200">
      <span className="relative inline-flex h-1.5 w-1.5 pulse-dot text-brand-500">
        <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
      </span>
      {status.label}
    </span>
  );
}
