import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import CountUp from "@/components/CountUp";
import CtaBand from "@/components/CtaBand";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import QuoteSection from "@/components/QuoteSection";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import VehicleSelector from "@/components/VehicleSelector";
import { IconArrow, IconBolt, IconCalendar, IconChart, IconCheck, IconClock, IconFactory, IconGlobe, IconMap, IconShield, IconTools, IconTruck } from "@/components/icons";
import { faqs, sectors, services, site } from "@/lib/site";
import { faqSchema } from "@/lib/schema";

const serviceIcons = [IconTruck, IconBolt, IconCalendar, IconChart];
const sectorIcons = [IconFactory, IconGlobe, IconTools];

// Honest operating metrics (commitments, not inflated volume claims)
const metrics = [
  { value: 24, suffix: "/7", label: "Operations", note: "Every day of the year" },
  { value: 60, suffix: " min", label: "Collection target", note: "For urgent consignments" },
  { value: 8, suffix: "", label: "Vehicle classes", note: "Small van to articulated" },
  { value: 1, suffix: " load", label: "Per vehicle", note: "Dedicated, never shared" },
];

const journey = [
  { title: "Request a quote", text: "Share postcodes and load details. The form suggests the right vehicle instantly." },
  { title: "Confirm & dispatch", text: "We confirm price and collection time. A dedicated vehicle is dispatched." },
  { title: "Direct collection", text: "Your goods are loaded and driven straight to destination, no depots." },
  { title: "Delivered & signed", text: "Proof of delivery is sent the moment the consignment is signed for." },
];

const ticker = ["Same Day Freight Delivery", "Dedicated Transport Services", "Urgent Transport Services", "Collections Within the Hour", "Next Day Dedicated", "Transport Consultancy", "UK Nationwide", "24/7 Operations"];

export default function Home() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />

      {/* 1. HERO: strong headline, two CTAs, live dispatch widget */}
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <Image src="/images/hero-truck-road.jpg" alt="Dedicated freight truck on a UK delivery run" fill priority sizes="100vw" className="animate-kenburns -z-20 object-cover object-center" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#00142e] via-[#001c40]/90 to-[#003880]/30" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-[#00142e] to-transparent" />

        <div className="container-x grid items-center gap-12 pb-24 pt-16 sm:pt-24 lg:grid-cols-12 lg:pb-32">
          <div className="lg:col-span-7">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-emerald-400" /> Manchester based · Delivering UK nationwide
              </span>
              <h1 className="mt-6 text-4xl font-black leading-[1.02] sm:text-6xl lg:text-7xl">
                Urgent &amp; Same Day Transport,{" "}
                <span className="bg-gradient-to-r from-[#7fb4f2] to-white bg-clip-text text-transparent">dedicated to your load.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
                One vehicle. One consignment. Collected within the hour and driven direct to destination, 24 hours a day, anywhere in the UK.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button href="/contact#quote">Get an instant quote</Button>
                <Button href="/services" variant="ghost">Explore services</Button>
              </div>
              <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/70">
                {["No co-loading", "No depot transfers", "Proof of delivery"].map((t) => (
                  <li key={t} className="flex items-center gap-2"><IconCheck className="h-4 w-4 text-azure-light" />{t}</li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Dispatch widget: illustrates the dedicated, direct journey */}
          <Reveal delay={200} className="lg:col-span-5">
            <div className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <p className="eyebrow text-white/60">Dedicated run</p>
                <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-300">Direct route</span>
              </div>
              <svg viewBox="0 0 320 120" className="mt-4 w-full" aria-hidden="true">
                <path d="M20 90 C 90 20, 170 120, 300 30" fill="none" stroke="rgba(255,255,255,.15)" strokeWidth="3" />
                <path d="M20 90 C 90 20, 170 120, 300 30" fill="none" stroke="url(#route)" strokeWidth="3" strokeLinecap="round" strokeDasharray="400" className="animate-dash" />
                <defs>
                  <linearGradient id="route" x1="0" x2="1"><stop offset="0" stopColor="#4f95e6" /><stop offset="1" stopColor="#ffffff" /></linearGradient>
                </defs>
                <circle cx="20" cy="90" r="6" fill="#4f95e6" />
                <circle cx="300" cy="30" r="6" fill="#fff" />
                <circle cx="300" cy="30" r="6" fill="none" stroke="#fff" className="animate-pulse-ring origin-[300px_30px]" />
              </svg>
              <div className="mt-2 flex justify-between text-sm">
                <div><p className="text-white/50">Collection</p><p className="font-display font-bold">Your site</p></div>
                <div className="text-right"><p className="text-white/50">Delivery</p><p className="font-display font-bold">Anywhere in the UK</p></div>
              </div>
              <ol className="mt-6 space-y-3 border-t border-white/10 pt-5 text-sm">
                {[
                  ["Quote confirmed", "Price and timings agreed"],
                  ["Vehicle dispatched", "Target on site within 60 min"],
                  ["Delivered direct", "Signed proof of delivery"],
                ].map(([t, s], i) => (
                  <li key={t} className="flex items-center gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-azure-gradient text-xs font-bold">{i + 1}</span>
                    <span className="flex-1"><span className="font-semibold">{t}</span><span className="block text-xs text-white/55">{s}</span></span>
                  </li>
                ))}
              </ol>
              <Link href="/contact#quote" className="group mt-6 flex items-center justify-center gap-2 rounded-2xl bg-white py-3.5 text-sm font-bold text-brand transition hover:bg-mist">
                Start your quote <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Keyword ticker */}
      <div className="overflow-hidden border-y border-white/10 bg-brand-gradient py-4 text-white" aria-hidden="true">
        <div className="animate-marquee flex w-max gap-10 whitespace-nowrap font-display text-sm font-bold uppercase tracking-[0.2em]">
          {[...ticker, ...ticker].map((t, i) => (
            <span key={i} className="flex items-center gap-10">{t}<span className="h-1.5 w-1.5 rounded-full bg-white/50" /></span>
          ))}
        </div>
      </div>

      {/* 2. INFRASTRUCTURE METRICS */}
      <section className="container-x py-20 sm:py-24">
        <div className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <Reveal key={m.label} delay={i * 100} className="bg-white p-8">
              <p className="font-display text-5xl font-black text-brand">
                <CountUp to={m.value} suffix={m.suffix} />
              </p>
              <p className="mt-3 font-display font-bold text-ink">{m.label}</p>
              <p className="text-sm text-steel">{m.note}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 3. SERVICES: clear segmentation in a bento grid */}
      <section className="container-x pb-20 sm:pb-28">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading eyebrow="Our services" title={<>Transport built around <span className="text-azure">time-critical</span> freight.</>} />
          <Reveal><Button href="/services" variant="secondary">All services</Button></Reveal>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3 lg:grid-rows-2">
          {/* Featured tile with photography */}
          <Reveal className="group relative isolate min-h-[26rem] overflow-hidden rounded-3xl text-white lg:row-span-2">
            <Image src="/images/truck-dedicated.jpg" alt="Dedicated transport vehicle ready for collection" fill sizes="(min-width:1024px) 33vw, 100vw" className="-z-20 object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#001c40] via-[#001c40]/60 to-transparent" />
            <div className="flex h-full flex-col justify-end p-8">
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur"><IconTruck /></span>
              <h3 className="text-2xl font-extrabold">{services[0].title}</h3>
              <p className="mt-3 text-white/75">{services[0].short}</p>
              <Link href={`/services#${services[0].id}`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">Learn more <IconArrow className="h-4 w-4" /></Link>
            </div>
          </Reveal>

          {services.slice(1).map((s, i) => {
            const Icon = serviceIcons[i + 1];
            const highlight = s.id === "urgent";
            return (
              <Reveal
                key={s.id}
                delay={(i + 1) * 100}
                className={`group flex flex-col rounded-3xl border p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${highlight ? "border-transparent bg-brand-gradient text-white lg:col-span-2" : "border-line bg-white hover:border-azure/40"}`}
              >
                <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${highlight ? "bg-white/15" : "bg-mist text-brand"}`}><Icon /></span>
                <h3 className={`mt-6 text-xl font-extrabold ${highlight ? "" : "text-ink"}`}>{s.title}</h3>
                <p className={`mt-3 flex-1 ${highlight ? "text-white/80" : "text-steel"}`}>{s.short}</p>
                <Link href={`/services#${s.id}`} className={`mt-5 inline-flex items-center gap-2 text-sm font-semibold ${highlight ? "" : "text-azure"}`}>
                  Learn more <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* 4. VEHICLE RANGE (interactive) */}
      <section className="bg-mist py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading
            eyebrow="Vehicle range"
            title="The right vehicle for every consignment."
            intro="From a small van carrying a single urgent part to an articulated lorry for a full load. Select a vehicle to see what it carries."
            center
          />
          <Reveal className="mt-12"><VehicleSelector /></Reveal>
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section className="relative overflow-hidden bg-navy-gradient py-20 text-white sm:py-28">
        <div className="bg-grid absolute inset-0 opacity-30" aria-hidden="true" />
        <div className="container-x relative">
          <SectionHeading dark eyebrow="How it works" title="From quote to proof of delivery in four steps." center />
          <div className="relative mt-16">
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-white/30 to-transparent md:block" aria-hidden="true" />
          <ol className="relative grid gap-8 md:grid-cols-4">
            {journey.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 120} className="relative text-center">
                <span className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/25 bg-[#001c40] font-display text-lg font-black shadow-lg shadow-black/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 text-lg font-bold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{p.text}</p>
              </Reveal>
            ))}
          </ol>
          </div>
        </div>
      </section>

      {/* 6. SECTORS + CONSULTANCY */}
      <section className="container-x py-20 sm:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl sm:aspect-[5/4] lg:aspect-[4/5]">
              <Image src="/images/fleet-loading-dock.jpg" alt="Freight vehicles at a warehouse loading dock" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
            </div>
            <div className="absolute -bottom-6 right-4 max-w-xs rounded-2xl border border-line bg-white p-5 shadow-2xl sm:-right-6">
              <p className="flex items-center gap-2 font-display font-bold text-ink"><IconShield className="h-5 w-5 text-azure" />Personal accountability</p>
              <p className="mt-2 text-sm text-steel">Every consignment is owned from booking to signature by the person you spoke to.</p>
            </div>
          </Reveal>

          <div>
            <SectionHeading eyebrow="Who we serve" title="Built for businesses where delay costs money." />
            <div className="mt-10 space-y-4">
              {sectors.map((s, i) => {
                const Icon = sectorIcons[i];
                return (
                  <Reveal key={s.title} delay={i * 100} className="group flex gap-5 rounded-2xl border border-line p-5 transition hover:border-azure/40 hover:bg-mist/50">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-gradient text-white"><Icon /></span>
                    <div>
                      <h3 className="font-display text-lg font-bold">{s.title}</h3>
                      <p className="mt-1 text-steel">{s.body}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
            <Reveal className="mt-8 rounded-2xl bg-ink p-6 text-white">
              <p className="eyebrow text-azure-light">Transport consultancy</p>
              <p className="mt-2 text-lg font-semibold">Spending too much on freight? We review your transport costs and show you where to save.</p>
              <Link href="/contact?service=consultancy#quote" className="group mt-4 inline-flex items-center gap-2 text-sm font-semibold text-azure-light">
                Request a cost review <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 7. WHY CORE CARGO */}
      <section className="bg-mist py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="Why Core Cargo" title={<>Straightforward. Dependable. <span className="text-azure">Personal.</span></>} center intro="We believe logistics should be simple to arrange and impossible to worry about." />
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {[
              { icon: IconClock, t: "Speed when it matters", d: "Urgent collections targeted within the hour and direct routes with no hub delays." },
              { icon: IconMap, t: "Clear communication", d: "Confirmed timings up front, updates on the move and proof of delivery at the end." },
              { icon: IconShield, t: "Personal responsibility", d: "A single point of contact who takes ownership of your consignment from start to finish." },
            ].map((c, i) => (
              <Reveal key={c.t} delay={i * 100} className="rounded-3xl bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mist text-brand"><c.icon /></span>
                <h3 className="mt-6 text-xl font-extrabold">{c.t}</h3>
                <p className="mt-3 text-steel">{c.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 8. QUOTE */}
      <QuoteSection />

      {/* 9. FAQ */}
      <section className="container-x grid gap-12 py-20 sm:py-28 lg:grid-cols-3">
        <div>
          <SectionHeading eyebrow="FAQ" title="Questions, answered." intro={`Can't find what you need? Email ${site.email} any time.`} />
        </div>
        <Reveal className="lg:col-span-2"><Faq items={faqs} /></Reveal>
      </section>

      <CtaBand />
    </>
  );
}
