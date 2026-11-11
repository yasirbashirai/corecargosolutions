import type { Metadata } from "next";
import Button from "@/components/Button";
import CtaBand from "@/components/CtaBand";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import QuoteSection from "@/components/QuoteSection";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import VehicleSelector from "@/components/VehicleSelector";
import { IconBolt, IconCalendar, IconChart, IconCheck, IconTruck } from "@/components/icons";
import { faqs, services, site } from "@/lib/site";
import { faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Same Day, Urgent & Dedicated Transport Services UK",
  description:
    "Same day dedicated transport, urgent collections within the hour, next day dedicated delivery and transport consultancy across the UK. Vehicles from small vans to artics.",
  alternates: { canonical: "/services" },
};

const icons = [IconTruck, IconBolt, IconCalendar, IconChart];

// Service schema, one entry per service
const serviceSchema = {
  "@context": "https://schema.org",
  "@graph": services.map((s) => ({
    "@type": "Service",
    name: s.title,
    description: s.body,
    serviceType: s.title,
    areaServed: "United Kingdom",
    provider: { "@id": `${site.url}/#business` },
  })),
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema(faqs.slice(0, 4))} />

      <PageHero
        eyebrow="Services"
        title={<>Dedicated transport services for <span className="text-azure-light">urgent freight.</span></>}
        intro="Same day, urgent and next day dedicated transport across the UK, plus transport consultancy for businesses that want more control over freight costs."
      >
        <Button href="#quote">Get a quote</Button>
        <Button href="#vehicles" variant="ghost">View vehicle range</Button>
      </PageHero>

      {/* Service quick navigation */}
      <nav className="sticky top-[4.5rem] z-30 border-b border-line bg-white/90 backdrop-blur md:top-[6.5rem]" aria-label="Services">
        <div className="container-x flex gap-2 overflow-x-auto py-3">
          {services.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="shrink-0 rounded-full border border-line px-4 py-2 text-sm font-semibold text-graphite transition hover:border-azure hover:text-azure">
              {s.title}
            </a>
          ))}
        </div>
      </nav>

      {/* Service detail blocks, alternating layout */}
      <div className="container-x space-y-6 py-20 sm:py-24">
        {services.map((s, i) => {
          const Icon = icons[i];
          const dark = i % 2 === 1;
          return (
            <Reveal
              key={s.id}
              as="section"
              className={`scroll-mt-44 grid gap-10 rounded-[2rem] p-8 sm:p-12 lg:grid-cols-2 lg:items-center ${dark ? "bg-navy-gradient text-white" : "border border-line bg-white"}`}
            >
              <div id={s.id} className="scroll-mt-44">
                <div className="flex items-center gap-4">
                  <span className={`flex h-14 w-14 items-center justify-center rounded-2xl ${dark ? "bg-white/15" : "bg-brand-gradient text-white"}`}><Icon className="h-7 w-7" /></span>
                  <span className={`font-display text-sm font-bold ${dark ? "text-white/50" : "text-steel"}`}>0{i + 1} / 0{services.length}</span>
                </div>
                <h2 className="mt-6 text-3xl font-extrabold sm:text-4xl">{s.title}</h2>
                <p className={`mt-5 text-lg leading-relaxed ${dark ? "text-white/75" : "text-steel"}`}>{s.body}</p>
                <div className="mt-8">
                  <Button href={s.id === "consultancy" ? "/contact?service=consultancy#quote" : "#quote"} variant={dark ? "light" : "primary"}>
                    {s.id === "consultancy" ? "Request a review" : "Quote this service"}
                  </Button>
                </div>
              </div>
              <ul className="grid gap-3">
                {s.points.map((p) => (
                  <li key={p} className={`flex items-center gap-4 rounded-2xl p-5 ${dark ? "bg-white/10" : "bg-mist"}`}>
                    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${dark ? "bg-white text-brand" : "bg-brand-gradient text-white"}`}><IconCheck className="h-4 w-4" /></span>
                    <span className="font-semibold">{p}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          );
        })}
      </div>

      {/* Vehicle range */}
      <section id="vehicles" className="scroll-mt-40 bg-mist py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="Vehicle range" title="From small vans to articulated lorries." intro="Every booking is matched to the smallest vehicle that carries your load safely, so you never pay for space you do not need." center />
          <Reveal className="mt-12"><VehicleSelector /></Reveal>
        </div>
      </section>

      {/* Dedicated vs network comparison */}
      <section className="container-x py-20 sm:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Dedicated vs network" title="Why dedicated transport arrives faster and safer." />
            <Reveal className="mt-8 overflow-hidden rounded-3xl border border-line">
              <table className="w-full text-left text-sm">
                <thead className="bg-ink text-white">
                  <tr><th className="p-4 font-semibold"> </th><th className="p-4 font-semibold">Dedicated</th><th className="p-4 font-semibold text-white/60">Pallet network</th></tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {[
                    ["Vehicle", "Yours exclusively", "Shared"],
                    ["Route", "Direct", "Via hubs"],
                    ["Handling", "Load once, unload once", "Multiple transfers"],
                    ["Timing", "Same day or timed", "Next day or later"],
                  ].map(([k, a, b]) => (
                    <tr key={k}>
                      <td className="p-4 font-semibold text-ink">{k}</td>
                      <td className="p-4 font-semibold text-brand">{a}</td>
                      <td className="p-4 text-steel">{b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Reveal>
          </div>
          <Reveal delay={150}>
            <Faq items={faqs.slice(0, 4)} />
          </Reveal>
        </div>
      </section>

      <QuoteSection title="Get a dedicated transport quote." />
      <CtaBand />
    </>
  );
}
