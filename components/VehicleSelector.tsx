"use client";

import { useState } from "react";
import Link from "next/link";
import { vehicles } from "@/lib/site";
import Image from "next/image";
import { IconArrow } from "./icons";

// Wider drawings for longer vehicles, so the picture grows as you move along the tabs
const artWidth: Record<string, string> = {
  "small-van": "max-w-[20rem]",
  "swb-van": "max-w-[22rem]",
  "mwb-van": "max-w-[24rem]",
  "lwb-van": "max-w-[27rem]",
  "xlwb-van": "max-w-[29rem]",
  luton: "max-w-[29rem]",
  "rigid-75": "max-w-[31rem]",
  "rigid-18": "max-w-[32rem]",
  artic: "max-w-[34rem]",
};

/** Interactive vehicle range: pick a vehicle to see its Core Cargo picture and indicative specs. */
export default function VehicleSelector() {
  const [active, setActive] = useState(3);
  const v = vehicles[active];

  return (
    <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-line bg-white shadow-xl shadow-ink/5">
      {/* Vehicle tabs */}
      <div className="flex gap-2 overflow-x-auto border-b border-line bg-mist/60 p-3" role="tablist" aria-label="Vehicle range">
        {vehicles.map((item, i) => (
          <button
            key={item.id}
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all ${i === active ? "bg-brand text-white shadow-md shadow-brand/25" : "text-graphite hover:bg-white"}`}
          >
            {item.name}
          </button>
        ))}
      </div>

      <div className="grid items-center gap-8 p-6 sm:p-10 lg:grid-cols-2">
        <div key={`art-${v.id}`} className="flex flex-col">
          <div className="flex min-h-44 items-end justify-center sm:min-h-56">
            <Image src={v.image.src} alt={`Core Cargo ${v.name}`} width={v.image.width} height={v.image.height} sizes="(min-width:1024px) 480px, 90vw" className={`h-auto w-full ${artWidth[v.id]}`} />
          </div>
          <p className="mt-3">
            <span className="inline-flex rounded-full bg-mist px-3 py-1 text-xs font-bold text-brand">{v.length}</span>
          </p>
        </div>
        <div key={v.id}>
          <p className="eyebrow text-brand">Vehicle {active + 1} of {vehicles.length}</p>
          <h3 className="mt-2 text-3xl font-extrabold text-ink">{v.name}</h3>
          <p className="mt-2 text-steel">{v.bestFor}</p>
          <dl className="mt-6 grid grid-cols-6 gap-2.5">
            {[
              ["Load length", v.length, "col-span-3 sm:col-span-2"],
              ["Load width", v.width, "col-span-3 sm:col-span-2"],
              ["Load height", v.height, "col-span-6 sm:col-span-2"],
              ["Payload", v.payload, "col-span-3"],
              ["Capacity", v.pallets, "col-span-3"],
            ].map(([k, val, span]) => (
              <div key={k} className={`rounded-2xl bg-mist px-3 py-2.5 ${span}`}>
                <dt className="text-[10px] font-semibold uppercase tracking-wider text-steel">{k}</dt>
                <dd className="mt-0.5 font-sans text-[15px] font-bold text-ink">{val}</dd>
              </div>
            ))}
          </dl>
          <Link href="/contact#quote" className="group mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand">
            Quote for {v.article} {v.name} <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <p className="mt-4 text-xs text-steel/80">Indicative specifications. Capacity varies by make and model.</p>
        </div>
      </div>
    </div>
  );
}
