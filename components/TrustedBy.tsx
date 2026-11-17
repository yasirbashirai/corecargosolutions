"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import Image from "next/image";
import { customers } from "@/lib/site";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { IconPause, IconPlay } from "./icons";

/**
 * Two logo rows slide in opposite directions and pause on hover or by the button.
 * Each supplied mark retains its own colours and proportion; Sealco stays text.
 */
export default function TrustedBy() {
  const [paused, setPaused] = useState(false);
  const half = Math.ceil(customers.length / 2);
  const rows = [customers.slice(0, half), customers.slice(half)];

  return (
    <section className="container-x py-20 sm:py-28">
      <SectionHeading
        eyebrow="Our customers"
        title={<>Trusted by the <br className="hidden sm:block" />names you know.</>}
        intro="From car makers and retailers to airlines and logistics firms, these are some of the businesses that rely on us when a delivery can’t wait."
        center
      />

      <Reveal className={`tb-track fade-edges mt-12 space-y-8 overflow-hidden border-y border-line bg-gradient-to-b from-white via-mist/60 to-white py-10 ${paused ? "is-paused" : ""}`}>
        {rows.map((row, r) => (
          <div key={r} className={`marquee-row ${r === 1 ? "is-reverse" : ""}`}>
            {/* Each row is repeated so the loop has no gap. Only the first copy is read by screen readers. */}
            {[0, 1, 2, 3].map((copy) => (
              <ul key={copy} className="flex shrink-0 items-center" aria-hidden={copy > 0}>
                {row.map((customer) => (
                  <li key={customer.name} className="flex h-16 items-center whitespace-nowrap px-7 sm:px-10">
                    {customer.image ? (
                      <Image src={customer.image} alt={customer.name} width={customer.width} height={customer.height} unoptimized className="tb-logo" style={{ "--logo-height": `${customer.height}px` } as CSSProperties} />
                    ) : (
                      <span className="font-display text-sm font-bold uppercase tracking-[.14em] text-[#7b8fb0]">{customer.name}</span>
                    )}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        ))}
      </Reveal>

      <div className="mt-7 flex flex-col items-center justify-center gap-4 text-center sm:flex-row">
        <p className="text-sm text-steel">Manufacturing, automotive, retail, aviation and more. Your name could be next.</p>
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-xs font-semibold text-ink transition hover:border-azure/50"
        >
          {paused ? <IconPlay className="h-3.5 w-3.5" /> : <IconPause className="h-3.5 w-3.5 stroke-[2.6]" />}
          {paused ? "Resume scrolling" : "Pause scrolling"}
        </button>
      </div>
    </section>
  );
}
