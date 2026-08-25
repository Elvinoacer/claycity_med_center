"use client";

import { useEffect, useState } from "react";

/**
 * Live "open now" pill for the hours card.
 * Renders nothing on the server / first paint (avoids hydration mismatch),
 * then computes status in Africa/Nairobi time on the client.
 */
export default function OpenStatus() {
  const [status, setStatus] = useState<{
    open: boolean;
    label: string;
  } | null>(null);

  useEffect(() => {
    const compute = () => {
      const now = new Date();
      const parts = new Intl.DateTimeFormat("en-KE", {
        timeZone: "Africa/Nairobi",
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).formatToParts(now);
      const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
      const day = get("weekday"); // Mon..Sun
      const minutes =
        parseInt(get("hour"), 10) * 60 + parseInt(get("minute"), 10);

      const closeSat = 12 * 60;
      const closeWeek = 17 * 60;
      const openAt = 8 * 60;

      const isWeekday = day !== "Sat" && day !== "Sun";
      const close = day === "Sat" ? closeSat : closeWeek;

      if ((isWeekday || day === "Sat") && minutes >= openAt && minutes < close) {
        setStatus({
          open: true,
          label: `Open now · closes ${day === "Sat" ? "12pm" : "5pm"}`,
        });
      } else if (isWeekday && minutes < openAt) {
        setStatus({ open: false, label: "Opens today at 8:00am" });
      } else if (day === "Sat" && minutes >= closeSat) {
        setStatus({ open: false, label: "Closed · opens Monday 8:00am" });
      } else if (day === "Sun") {
        setStatus({ open: false, label: "Closed today · opens Monday 8:00am" });
      } else {
        setStatus({
          open: false,
          label: "Closed · opens tomorrow 8:00am",
        });
      }
    };
    compute();
    const id = setInterval(compute, 60_000);
    return () => clearInterval(id);
  }, []);

  if (!status) {
    return (
      <span className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold bg-brand-50/10 text-brand-200 border border-brand-300/30">
        <span className="h-1.5 w-1.5 rounded-full bg-brand-300" />
        Mon–Sat · Walk-ins welcome
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${
        status.open
          ? "bg-brand-50 text-brand-700 border border-brand-200"
          : "bg-accent-50 text-accent-700 border border-accent-200"
      }`}
    >
      <span
        className={`relative inline-flex h-1.5 w-1.5 pulse-dot ${
          status.open ? "text-brand-500" : "text-accent-500"
        }`}
      >
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            status.open ? "bg-brand-500" : "bg-accent-500"
          }`}
        />
      </span>
      {status.label}
    </span>
  );
}
