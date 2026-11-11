"use client";

import { useEffect, useRef, useState } from "react";
import { IconCheck, IconMail } from "./icons";

const steps = [
  { title: "Tell us what you’re moving", text: "Add your postcodes and what you’re sending. The form suggests the right vehicle for you.", tag: "Quick form" },
  { title: "We confirm and send a driver", text: "We come back within 10 minutes with a price and a collection time. Say yes and your driver is on the way.", tag: "Reply in 10 minutes" },
  { title: "Collected and taken straight there", text: "Your driver loads up and goes direct to the delivery address. No depots and no hand-offs.", tag: "Door to door" },
  { title: "Delivered and signed for", text: "Once it’s signed for, your proof of delivery is emailed to you within the hour.", tag: "POD within the hour" },
];

const STEP_MS = 550; // gap between each number lighting up

/**
 * Four step journey. When it scrolls into view the line draws across
 * (down, on a phone) and each number lights up in turn. Step 4 ends on a tick.
 */
export default function HowItWorks() {
  const ref = useRef<HTMLOListElement>(null);
  const [on, setOn] = useState(false);
  const [done, setDone] = useState(false); // step 4 swaps its number for a tick

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOn(true);
          setTimeout(() => setDone(true), (steps.length - 1) * STEP_MS + 300);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <ol ref={ref} className="mx-auto mt-14 grid max-w-5xl gap-0 md:mt-16 md:grid-cols-4 md:gap-6">
      {steps.map((s, i) => {
        const last = i === steps.length - 1;
        const delay = `${i * STEP_MS}ms`;
        return (
          <li key={s.title} className="relative flex gap-5 pb-10 last:pb-0 md:block md:pb-0 md:text-center">
            {/* Connecting line: vertical on a phone, horizontal on desktop */}
            {!last && (
              <>
                <span className="absolute bottom-2 left-7 top-[4.25rem] w-0.5 -translate-x-1/2 overflow-hidden rounded bg-white/15 md:hidden" aria-hidden="true">
                  <span className="block h-full w-full origin-top bg-white transition-transform duration-500 ease-out" style={{ transform: on ? "scaleY(1)" : "scaleY(0)", transitionDelay: `${i * STEP_MS + 250}ms` }} />
                </span>
                <span className="absolute left-[calc(50%+2.4rem)] right-[calc(-50%+0.9rem)] top-7 hidden h-0.5 overflow-hidden rounded bg-white/15 md:block" aria-hidden="true">
                  <span className="block h-full w-full origin-left bg-gradient-to-r from-[#8fb8ff] to-white transition-transform duration-500 ease-out" style={{ transform: on ? "scaleX(1)" : "scaleX(0)", transitionDelay: `${i * STEP_MS + 250}ms` }} />
                </span>
              </>
            )}

            {/* Number, lights up in turn */}
            <span
              className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full font-display text-base font-black shadow-lg shadow-black/30 transition-all duration-500 md:mx-auto ${on ? "bg-[#8fb8ff] text-[#06204a]" : "border border-white/25 bg-[#001c40] text-white/60"}`}
              style={{ transitionDelay: delay }}
            >
              {last && done ? <IconCheck className="h-6 w-6 stroke-[2.6]" /> : String(i + 1).padStart(2, "0")}
              {last && <span className="sr-only">Step 4</span>}
            </span>

            <div className="pt-1 md:pt-0">
              <h3 className="text-lg font-bold leading-snug text-white md:mt-6">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-white/70">{s.text}</p>
              <span className={`mt-4 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold ${last ? "bg-[#8fb8ff] text-[#06204a]" : "border border-white/25 bg-white/10 text-white"}`}>
                {last && <IconMail className="h-3.5 w-3.5" />}
                {s.tag}
              </span>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
