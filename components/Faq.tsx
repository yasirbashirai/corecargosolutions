"use client";

import Link from "next/link";
import { useState } from "react";
import type { FaqItem } from "@/lib/site";
import { IconPlus } from "./icons";

/**
 * FAQ accordion. Opening a question closes the one before it.
 * Pair with FAQPage schema on the page.
 */
export default function Faq({ items, defaultOpen = 0 }: { items: FaqItem[]; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<string | null>(defaultOpen === null ? null : items[defaultOpen]?.q ?? null);

  return (
    <div className="divide-y divide-line overflow-hidden rounded-3xl border border-line bg-white shadow-xl shadow-ink/5">
      {items.map((f, i) => {
        const isOpen = open === f.q;
        return (
          <div key={f.q} className={isOpen ? "bg-gradient-to-b from-mist/50 to-white" : ""}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : f.q)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                className="flex w-full items-center justify-between gap-6 px-6 py-6 text-left font-display text-base font-bold text-ink sm:px-7 sm:text-lg"
              >
                {f.q}
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${isOpen ? "rotate-45 bg-brand text-white" : "bg-mist text-brand"}`}>
                  <IconPlus className="h-4 w-4" />
                </span>
              </button>
            </h3>
            <div id={`faq-panel-${i}`} className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
              <div className="min-h-0 overflow-hidden">
                <p className="max-w-3xl px-6 pb-7 leading-relaxed text-steel sm:px-7">
                  {f.a}
                  {f.link && (
                    <>
                      {" "}
                      {f.link.before}
                      <Link href={f.link.href} className="font-semibold text-azure underline underline-offset-2">{f.link.label}</Link>
                      {f.link.after}
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
