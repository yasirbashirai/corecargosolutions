"use client";

import { useEffect, useState } from "react";

const TOTAL = 600; // 10 minutes, in seconds

/**
 * Hero pill: "10 min response time" with a live countdown.
 * Counts 10:00 down to 00:00, then restarts.
 */
export default function ResponseTimer() {
  const [left, setLeft] = useState(TOTAL);

  useEffect(() => {
    const id = setInterval(() => setLeft((s) => (s <= 0 ? TOTAL : s - 1)), 1000);
    return () => clearInterval(id);
  }, []);

  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");
  const ring = 2 * Math.PI * 7; // circumference of the progress ring

  return (
    <span className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 py-1.5 pl-4 pr-1.5 backdrop-blur">
      <span className="h-2 w-2 rounded-full bg-emerald-400" />
      <span className="font-sans text-xs font-bold uppercase tracking-[0.12em] text-white">10 min response time</span>
      <span className="inline-flex items-center gap-2 rounded-full bg-[#00142e]/70 px-3 py-1.5" role="timer" aria-label="Response time countdown">
        <svg viewBox="0 0 20 20" className="h-4 w-4 -rotate-90" aria-hidden="true">
          <circle cx="10" cy="10" r="7" fill="none" stroke="rgba(255,255,255,.2)" strokeWidth="2.5" />
          <circle cx="10" cy="10" r="7" fill="none" stroke="#8fb8ff" strokeWidth="2.5" strokeLinecap="round" strokeDasharray={ring} strokeDashoffset={ring * (1 - left / TOTAL)} className="transition-[stroke-dashoffset] duration-1000 ease-linear" />
        </svg>
        <span className="font-sans text-sm font-bold tabular-nums text-white" suppressHydrationWarning>{mm}:{ss}</span>
      </span>
    </span>
  );
}
