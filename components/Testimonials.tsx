import { testimonials } from "@/lib/site";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { IconUser } from "./icons";

// The section only appears once this many real, approved quotes are in src/lib/site.ts
const MIN_QUOTES = 3;

/**
 * Customer testimonials. Hidden until at least three real quotes are supplied,
 * because invented reviews break UK advertising and consumer rules.
 * On a phone the cards swipe sideways.
 */
export default function Testimonials() {
  if (testimonials.length < MIN_QUOTES) return null;

  return (
    <section className="relative overflow-hidden bg-navy-gradient py-20 text-white sm:py-28">
      <div className="bg-grid absolute inset-0 opacity-30" aria-hidden="true" />
      <div className="container-x relative">
        <SectionHeading dark eyebrow="What customers say" title={<>Hear it from the <br className="hidden sm:block" />people who use us.</>} intro="A few words from the businesses that book us." />

        <div className="no-scrollbar -mx-4 mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0">
          {testimonials.map((t, i) => {
            const first = i === 0;
            return (
              <Reveal
                key={t.name + t.company}
                as="article"
                delay={i * 100}
                className={`flex w-[85%] shrink-0 snap-center flex-col rounded-3xl p-8 md:w-auto ${first ? "bg-white text-ink shadow-2xl" : "border border-white/15 bg-white/10 backdrop-blur"}`}
              >
                <svg viewBox="0 0 44 36" className={`h-9 w-11 ${first ? "fill-azure" : "fill-[#8fb8ff]"}`} aria-hidden="true">
                  <path d="M0 36V18C0 8 6 1 17 0v8c-5 1-7 4-7 8h8v20zm25 0V18C25 8 31 1 42 0v8c-5 1-7 4-7 8h8v20z" />
                </svg>
                <blockquote className={`mt-6 flex-1 text-lg leading-relaxed ${first ? "text-graphite" : "text-white/85"}`}>“{t.quote}”</blockquote>
                <p className="mt-6">
                  <span className={`inline-flex rounded-full px-3.5 py-1.5 text-xs font-semibold ${first ? "bg-mist text-brand" : "bg-white/10 text-[#8fb8ff]"}`}>What we moved: {t.moved}</span>
                </p>
                <footer className={`mt-6 flex items-center gap-4 border-t pt-6 ${first ? "border-line" : "border-white/15"}`}>
                  <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${first ? "bg-mist text-brand" : "bg-white/10 text-white/80"}`}><IconUser className="h-5 w-5" /></span>
                  <span>
                    <span className="block font-display font-bold">{t.name}</span>
                    <span className={`block text-sm ${first ? "text-steel" : "text-white/60"}`}>{t.role} · {t.company}</span>
                  </span>
                </footer>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
