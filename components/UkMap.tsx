"use client";

import { useEffect, useState } from "react";
import { irelandPath, mapCities, ukMapSize, ukPath } from "@/lib/uk-map";

/**
 * Animated map of the UK for the hero quote panel.
 * A cursor visits each city in turn with a "Delivering to" tag.
 */
export default function UkMap() {
  const [i, setI] = useState(1); // start on Leeds, as in the design

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((n) => (n + 1) % mapCities.length), 2200);
    return () => clearInterval(id);
  }, []);

  const city = mapCities[i];
  const { width, height } = ukMapSize;
  // Keep the tag inside the panel: flip it to the left of cities near the right edge
  const flip = city.x > width * 0.6;

  return (
    <div className="@container relative mx-auto mt-3 w-full max-w-[16.5rem]" style={{ aspectRatio: `${width} / ${height - 12}` }} role="img" aria-label={`Map of the UK. Delivering to ${mapCities.map((c) => c.name).join(", ")}.`}>
      <svg viewBox={`0 12 ${width} ${height - 12}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
        <path d={irelandPath} fill="rgba(255,255,255,.10)" stroke="rgba(255,255,255,.18)" strokeWidth="0.8" />
        <path d={ukPath} fill="rgba(143,184,255,.30)" stroke="rgba(190,214,255,.55)" strokeWidth="0.8" strokeLinejoin="round" />
        {mapCities.map((c, n) => (
          <g key={c.name}>
            {n === i && <circle cx={c.x} cy={c.y} r="5" fill="none" stroke="#6ee7b7" strokeWidth="1.2" className="animate-pulse-ring" style={{ transformOrigin: `${c.x}px ${c.y}px`, transformBox: "view-box" }} />}
            <circle cx={c.x} cy={c.y} r={n === i ? 3.6 : 2.4} fill={n === i ? "#6ee7b7" : "rgba(255,255,255,.85)"} className="transition-all duration-500" />
          </g>
        ))}
      </svg>

      {/* Cursor and tag glide from city to city */}
      <div
        className="pointer-events-none absolute left-0 top-0 transition-transform duration-1000 ease-in-out"
        style={{ transform: `translate(${(city.x / width) * 100}cqw, ${((city.y - 12) / width) * 100}cqw)` }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6 drop-shadow-md">
          <path d="M5 3l14 8-6.2 1.6L10 19z" fill="#fff" stroke="#0b1220" strokeWidth="1.4" strokeLinejoin="round" />
        </svg>
        <div className={`absolute bottom-full mb-1 whitespace-nowrap rounded-xl bg-white px-3 py-1.5 shadow-xl ${flip ? "right-full -mr-2" : "left-3"}`}>
          <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-steel">Delivering to</p>
          <p className="font-display text-sm font-bold leading-tight text-ink">{city.name}</p>
        </div>
      </div>
    </div>
  );
}
