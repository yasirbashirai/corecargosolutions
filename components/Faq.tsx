import { IconPlus } from "./icons";

/** Accessible FAQ accordion using native <details>. Pair with FAQPage schema on the page. */
export default function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-line rounded-3xl border border-line bg-white">
      {items.map((f) => (
        <details key={f.q} className="group p-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-base font-bold text-ink sm:text-lg">
            {f.q}
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-mist text-brand transition-transform duration-300 group-open:rotate-45 group-open:bg-brand group-open:text-white">
              <IconPlus className="h-4 w-4" />
            </span>
          </summary>
          <p className="mt-4 max-w-3xl leading-relaxed text-steel">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
