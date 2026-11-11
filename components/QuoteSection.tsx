import { site } from "@/lib/site";
import QuoteForm from "./QuoteForm";
import Reveal from "./Reveal";
import { IconCheck, IconClock, IconMail } from "./icons";

/** Quote form block placed on every major page. */
export default function QuoteSection({
  defaultService,
  title = "Tell us what needs to move. We’ll handle the rest.",
}: {
  defaultService?: string;
  title?: string;
}) {
  return (
    <section id="quote" className="relative scroll-mt-28 overflow-hidden bg-mist py-20 sm:py-28">
      <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-azure/10 blur-3xl" aria-hidden="true" />
      <div className="container-x relative grid items-start gap-12 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow text-azure">Instant quote request</p>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">{title}</h2>
          <p className="mt-5 text-lg leading-relaxed text-steel">
            Share the route and the load. We match the vehicle, confirm a price and give you a collection time before you commit.
          </p>
          <ul className="mt-8 space-y-4">
            {[
              "Vehicle suggested from your load details",
              "Price and collection time confirmed before you book",
              "Dedicated vehicle, direct from collection to delivery",
              "Proof of delivery emailed within the hour",
            ].map((t) => (
              <li key={t} className="flex gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-white"><IconCheck className="h-3.5 w-3.5" /></span>
                <span className="text-graphite">{t}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-line bg-white p-5">
              <IconClock className="h-6 w-6 text-azure" />
              <p className="mt-3 font-display font-bold">Open 24/7</p>
              <p className="text-sm text-steel">Including weekends and bank holidays</p>
            </div>
            <a href={`mailto:${site.email}`} className="rounded-2xl border border-line bg-white p-5 transition hover:border-azure">
              <IconMail className="h-6 w-6 text-azure" />
              <p className="mt-3 font-display font-bold">Prefer email?</p>
              <p className="break-all text-sm text-steel">{site.email}</p>
            </a>
          </div>
        </Reveal>
        <Reveal delay={150}>
          <QuoteForm defaultService={defaultService} />
        </Reveal>
      </div>
    </section>
  );
}
