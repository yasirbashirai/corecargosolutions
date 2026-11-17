"use client";

import { useEffect, useState } from "react";
import { irelandPath, mapCities, mapDescription, ukMapSize, ukPath } from "@/lib/uk-map";
import useReducedMotion from "./useReducedMotion";

/**
 * Animated map of the UK for the hero quote panel.
 * A cursor visits each city in turn with a "Delivering to" tag.
 */
export default function UkMap() {
  const [i, setI] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const id = setInterval(() => setI((n) => (n + 1) % mapCities.length), 2200);
    return () => clearInterval(id);
  }, [reducedMotion]);

  const city = mapCities[i];
  const hub = mapCities[0];
  const { width, height } = ukMapSize;
  // Keep the tag inside the panel: flip it to the left of cities near the right edge
  const flip = city.x > width * 0.6;

  return (
    <div className="cc-map relative mx-auto mt-3 w-full max-w-[16.5rem]" style={{ aspectRatio: `${width} / ${height - 12}` }} role="img" aria-label={mapDescription}>
      <svg viewBox={`0 12 ${width} ${height - 12}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
        <path d={irelandPath} fill="rgba(255,255,255,.10)" stroke="rgba(255,255,255,.18)" strokeWidth="0.8" />
        <path d={ukPath} fill="rgba(143,184,255,.30)" stroke="rgba(190,214,255,.55)" strokeWidth="0.8" strokeLinejoin="round" />
        <g className="cc-map__routes" fill="none" strokeWidth="0.9">
          {mapCities.slice(1).map((place, n) => (
            <path key={place.name} d={`M${hub.x} ${hub.y} Q${(hub.x + place.x) / 2 - 12} ${(hub.y + place.y) / 2 - 14} ${place.x} ${place.y}`} stroke={!reducedMotion && i === n + 1 ? "rgba(143,184,255,.85)" : "rgba(190,214,255,.25)"} />
          ))}
        </g>
        {mapCities.map((c, n) => (
          <g key={c.name}>
            {n === 0 && <circle cx={c.x} cy={c.y} r="6.5" fill="rgba(110,231,183,.18)" stroke="rgba(110,231,183,.45)" strokeWidth="0.8" />}
            {!reducedMotion && n === i && <circle cx={c.x} cy={c.y} r="5" fill="none" stroke="#6ee7b7" strokeWidth="1.2" className="animate-pulse-ring" style={{ transformOrigin: `${c.x}px ${c.y}px`, transformBox: "view-box" }} />}
            <circle cx={c.x} cy={c.y} r={n === 0 ? 3.6 : 2.4} fill={n === 0 ? "#6ee7b7" : "rgba(255,255,255,.85)"} />
          </g>
        ))}
      </svg>

      {/* Cursor and tag glide from city to city */}
      {!reducedMotion && <div
        className="cc-map__cursor pointer-events-none absolute transition-[left,top] duration-1000 ease-in-out"
        style={{ left: `${city.x / width * 100}%`, top: `${(city.y - 12) / (height - 12) * 100}%` }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6 drop-shadow-md">
          <path d="M5 3l14 8-6.2 1.6L10 19z" fill="#fff" stroke="#0b1220" strokeWidth="1.4" strokeLinejoin="round" />
        </svg>
        <div className={`absolute bottom-full mb-1 whitespace-nowrap rounded-xl bg-white px-3 py-1.5 shadow-xl ${flip ? "right-full -mr-2" : "left-3"}`}>
          <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-steel">Delivering to</p>
          <p className="font-display text-sm font-bold leading-tight text-ink">{city.name}</p>
        </div>
      </div>}
    </div>
  );
}
