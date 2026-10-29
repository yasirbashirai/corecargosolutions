"use client";

import { useState } from "react";
import Link from "next/link";
import { vehicles } from "@/lib/site";
import { IconArrow } from "./icons";

// Body length on the drawing scales with the real load length (1.8 m to 13.6 m)
const bodyWidth = (len: string) => 60 + (parseFloat(len) / 13.6) * 300;

/** Simple vehicle silhouette that grows as larger vehicles are selected. */
function Silhouette({ length, tall }: { length: string; tall: boolean }) {
  const w = bodyWidth(length);
  const h = tall ? 92 : 64;
  const cab = 56;
  const total = w + cab + 10;
  return (
    <svg viewBox={`0 0 ${total + 20} 150`} className="h-36 w-full max-w-xl transition-all duration-700" aria-hidden="true">
      <defs>
        <linearGradient id="vbody" x1="0" x2="1">
          <stop offset="0" stopColor="#03438F" />
          <stop offset="1" stopColor="#2f6fc0" />
        </linearGradient>
      </defs>
      {/* road */}
      <line x1="0" x2={total + 20} y1="138" y2="138" stroke="#dbe2ec" strokeWidth="2" strokeDasharray="10 8" />
      {/* cargo body */}
      <rect x="10" y={120 - h} width={w} height={h} rx="6" fill="url(#vbody)" className="transition-all duration-700" />
      <text x={10 + w / 2} y={120 - h / 2 + 5} textAnchor="middle" fill="white" fontSize="14" fontWeight="700" fontFamily="var(--font-display)">
        {length}
      </text>
      {/* cab */}
      <path d={`M${w + 14} ${120 - (tall ? 70 : 54)} h${cab - 18} l18 26 v${tall ? 44 : 28} h-${cab} z`} fill="#003880" />
      <path d={`M${w + 20} ${120 - (tall ? 64 : 48)} h${cab - 28} l12 18 h-${cab - 16} z`} fill="#bcd3f2" />
      {/* wheels */}
      {[30, w - 20, w + cab - 6].map((x, i) => (
        <g key={i}>
          <circle cx={x} cy="124" r="13" fill="#0b1220" />
          <circle cx={x} cy="124" r="5" fill="#dbe2ec" />
        </g>
      ))}
    </svg>
  );
}

/** Interactive vehicle range: pick a vehicle to see its silhouette and indicative specs. */
export default function VehicleSelector() {
  const [active, setActive] = useState(3);
  const v = vehicles[active];
  const big = active >= 5;

  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-xl shadow-ink/5">
      {/* Vehicle tabs */}
      <div className="flex gap-2 overflow-x-auto border-b border-line bg-mist/60 p-3" role="tablist" aria-label="Vehicle range">
        {vehicles.map((item, i) => (
          <button
            key={item.id}
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all ${i === active ? "bg-brand-gradient text-white shadow-md shadow-brand/25" : "text-graphite hover:bg-white"}`}
          >
            {item.name}
          </button>
        ))}
      </div>

      <div className="grid items-center gap-8 p-6 sm:p-10 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <Silhouette length={v.length} tall={big} />
        </div>
        <div className="lg:col-span-2" key={v.id}>
          <p className="eyebrow text-azure">Vehicle {active + 1} of {vehicles.length}</p>
          <h3 className="mt-2 text-3xl font-extrabold text-ink">{v.name}</h3>
          <p className="mt-2 text-steel">{v.bestFor}</p>
          <dl className="mt-6 grid grid-cols-3 gap-3">
            {[["Load length", v.length], ["Payload", v.payload.replace("up to ", "")], ["Capacity", v.pallets]].map(([k, val]) => (
              <div key={k} className="rounded-2xl bg-mist p-3">
                <dt className="text-[11px] font-semibold uppercase tracking-wider text-steel">{k}</dt>
                <dd className="mt-1 font-display text-sm font-bold text-ink">{val}</dd>
              </div>
            ))}
          </dl>
          <Link href={`/contact#quote`} className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-azure">
            Quote for a {v.name} <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <p className="mt-4 text-xs text-steel/80">Indicative specifications. Capacity varies by make and model.</p>
        </div>
      </div>
    </div>
  );
}
