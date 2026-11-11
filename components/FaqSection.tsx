"use client";

import { useMemo, useState } from "react";
import { faqs, faqText, site } from "@/lib/site";
import Faq from "./Faq";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { IconMail, IconSearch } from "./icons";

/** Home page FAQ: heading, search box and email card on the left, the questions on the right. */
export default function FaqSection() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (!words.length) return faqs;
    return faqs.filter((f) => {
      const text = `${f.q} ${faqText(f)}`.toLowerCase();
      return words.every((w) => text.includes(w));
    });
  }, [query]);

  return (
    <section className="container-x grid gap-12 py-20 sm:py-28 lg:grid-cols-5">
      <div className="lg:col-span-2">
        <SectionHeading eyebrow="FAQ" title="Questions, answered." intro="Can’t find what you need? Email us any time and a real person will reply." />

        <Reveal className="mt-8 max-w-sm">
          <label htmlFor="faq-search" className="sr-only">Search the questions</label>
          <div className="relative">
            <IconSearch className="pointer-events-none absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-steel" />
            <input
              id="faq-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the questions"
              className="w-full rounded-full border border-line bg-mist/40 py-3.5 pl-12 pr-5 text-sm text-ink outline-none transition placeholder:text-steel/70 focus:border-azure focus:bg-white focus:ring-4 focus:ring-azure/15"
            />
          </div>

          <a href={`mailto:${site.email}`} className="mt-12 flex items-center gap-4 rounded-2xl border border-line bg-mist/50 p-5 transition hover:border-azure/50">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand text-white"><IconMail className="h-5 w-5" /></span>
            <span>
              <span className="block font-display font-bold text-ink">Still not sure?</span>
              <span className="block break-all text-sm text-steel">{site.email}</span>
            </span>
          </a>
        </Reveal>
      </div>

      <Reveal className="lg:col-span-3">
        {results.length ? (
          // Re-mount when the search changes so the first match opens
          <Faq key={query ? "search" : "all"} items={results} />
        ) : (
          <p className="rounded-3xl border border-dashed border-line p-8 text-steel" role="status">
            Nothing matches that. Try a simpler word, or <a href={`mailto:${site.email}`} className="font-semibold text-azure underline underline-offset-2">email us your question</a>.
          </p>
        )}
      </Reveal>
    </section>
  );
}
