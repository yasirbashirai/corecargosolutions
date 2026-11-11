import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import CountUp from "@/components/CountUp";
import CtaBand from "@/components/CtaBand";
import FaqSection from "@/components/FaqSection";
import HowItWorks from "@/components/HowItWorks";
import JsonLd from "@/components/JsonLd";
import QuoteSection from "@/components/QuoteSection";
import ResponseTimer from "@/components/ResponseTimer";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import Testimonials from "@/components/Testimonials";
import TrustedBy from "@/components/TrustedBy";
import UkMap from "@/components/UkMap";
import VehicleArt from "@/components/VehicleArt";
import VehicleSelector from "@/components/VehicleSelector";
import { IconArrow, IconBeam, IconBolt, IconBox, IconCalendar, IconChart, IconCheck, IconClock, IconFactory, IconGlobe, IconMap, IconPlane, IconShield, IconTimer, IconTruck } from "@/components/icons";
import { airports, faqs, industries, sectors, services, vehicles } from "@/lib/site";
import { faqSchema } from "@/lib/schema";

const serviceIcons = [IconTruck, IconBolt, IconCalendar, IconChart];
const sectorIcons = [IconFactory, IconGlobe, IconBeam];

// Key stats: each one is a commitment with a plain sentence under it
const metrics = [
  { icon: IconClock, value: 24, suffix: "/7", label: "Always on", note: "Someone is here every day of the year, weekends and bank holidays included." },
  { icon: IconTimer, value: 60, suffix: "min", label: "Collection target", note: "For urgent jobs we aim to have a driver with you within the hour." },
  { icon: IconTruck, value: vehicles.length, suffix: "vehicles", label: "Sizes to choose from", note: "From a small van to an articulated lorry, so you only pay for what you need." },
  { icon: IconBox, value: 1, suffix: "load", label: "Per vehicle", note: "Your goods travel on their own. Never shared, never moved between depots." },
];

// Scrolling ticker: short promises (bright) mixed with the cities covered (dimmer)
const ticker: [string, boolean][] = [
  ["Collected within the hour", true], ["Manchester", false], ["Birmingham", false],
  ["One driver, one load", true], ["Leeds", false], ["London", false],
  ["Signed proof of delivery", true], ["Cardiff", false], ["Glasgow", false],
  ["Vans to articulated lorries", true], ["Newcastle", false], ["Bristol", false],
  ["Open 24/7, bank holidays too", true], ["Edinburgh", false], ["Belfast", false],
  ["Nationwide", true],
];

const airportTicks = [
  "Collected straight from the cargo terminal",
  "Driven direct, with no depot stops",
  "Any hour, any day of the week",
  "Proof of delivery within the hour",
];

// Service cards link to the quote form with that service already selected
const quoteLink = (id: string) => `/?service=${id}#quote`;

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
              <ResponseTimer />
              <h1 className="mt-6 text-[2.5rem] font-black leading-[1.05] sm:text-5xl lg:text-[3.6rem]">
                Freight that can’t wait?{" "}
                <span className="bg-gradient-to-r from-[#7fb4f2] to-white bg-clip-text text-transparent">We’re already on our way.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
                A van and driver just for your load. We collect within the hour and drive it straight to the door, day or night, Nationwide.
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
              <UkMap />
              <div className="mt-2 flex justify-between text-sm">
                <div><p className="text-white/50">Collection</p><p className="font-display font-bold">Your site</p></div>
                <div className="text-right"><p className="text-white/50">Delivery</p><p className="font-display font-bold">Nationwide</p></div>
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

      {/* Ticker: promises and cities, moving right to left */}
      <div className="overflow-hidden border-y border-white/10 bg-brand-gradient py-4 text-white" aria-hidden="true">
        <div className="animate-marquee flex w-max whitespace-nowrap font-sans text-sm uppercase tracking-[0.16em]">
          {[...ticker, ...ticker].map(([t, strong], i) => (
            <span key={i} className={`flex items-center ${strong ? "font-bold text-white" : "font-medium text-white/75"}`}>
              {t}<span className="mx-7 h-1.5 w-1.5 rounded-full bg-white/45" />
            </span>
          ))}
        </div>
      </div>

      {/* 2. KEY STATS */}
      <section className="container-x py-20 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-px overflow-hidden rounded-3xl border border-line bg-line shadow-xl shadow-ink/5 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <Reveal key={m.label} delay={i * 100} className="bg-white p-7">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-mist text-brand"><m.icon className="h-5 w-5" /></span>
              <p className="mt-5 flex items-baseline gap-1.5 font-display font-black text-brand">
                <span className="text-5xl"><CountUp to={m.value} /></span>
                <span className="text-xl font-extrabold text-azure">{m.suffix}</span>
              </p>
              <p className="mt-2 font-sans font-bold text-ink">{m.label}</p>
              <p className="mt-1 text-sm leading-relaxed text-steel">{m.note}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 3. SERVICES: four cards, each with a tag and a quote button */}
      <section className="container-x pb-20 sm:pb-28">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading eyebrow="Our services" title="How fast do you need it there?" intro="Four ways to move your freight. Not sure which one fits? Tell us what you are moving and we will point you to the right one." />
          <Reveal className="shrink-0"><Button href="/services" variant="primary">All services</Button></Reveal>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-4">
          {/* Featured card with the Core Cargo articulated lorry */}
          <Reveal className="relative isolate flex min-h-[34rem] flex-col justify-end overflow-hidden rounded-3xl p-7 text-white sm:p-8 lg:col-span-2 lg:row-span-2">
            {/* sky, then dark road from the horizon down */}
            <div className="absolute inset-0 -z-20 bg-gradient-to-b from-[#5f86c9] to-[#b9c6dc] to-50%" aria-hidden="true" />
            <div className="absolute inset-x-0 bottom-0 top-[47%] -z-20 bg-gradient-to-b from-[#465572] via-[#16233f] via-45% to-[#081530]" aria-hidden="true" />
            <span className="absolute left-7 top-7 flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 backdrop-blur"><IconTruck className="h-5 w-5" /></span>
            <div className="absolute inset-x-3 top-0 -z-10 flex h-[50.5%] items-end" aria-hidden="true">
              <VehicleArt kind="artic" className="h-auto w-full" />
            </div>
            <h3 className="text-xl font-extrabold">{services[0].title}</h3>
            <p className="mt-3 max-w-md text-white/80">{services[0].short}</p>
            <p className="mt-4"><span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">{services[0].tag}</span></p>
            <div className="mt-6 flex items-center justify-between gap-4">
              <Link href={`/services#${services[0].id}`} className="group inline-flex items-center gap-2 text-sm font-bold">Learn more <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
              <Link href={quoteLink(services[0].id)} className="rounded-full border border-white/60 px-4 py-1.5 text-sm font-semibold transition hover:bg-white hover:text-brand">Get a quote</Link>
            </div>
          </Reveal>

          {services.slice(1).map((s, i) => {
            const Icon = serviceIcons[i + 1];
            const highlight = s.id === "urgent";
            return (
              <Reveal
                key={s.id}
                delay={(i + 1) * 100}
                className={`group flex flex-col rounded-3xl border p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${highlight ? "border-transparent bg-brand-gradient text-white lg:col-span-2" : "border-line bg-white hover:border-azure/40"}`}
              >
                <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${highlight ? "bg-white/15" : "bg-mist text-brand"}`}><Icon className="h-5 w-5" /></span>
                <h3 className={`mt-6 text-xl font-extrabold ${highlight ? "" : "text-ink"}`}>{s.title}</h3>
                <p className={`mt-3 flex-1 ${highlight ? "text-white/85" : "text-steel"}`}>{s.short}</p>
                <p className="mt-4"><span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${highlight ? "bg-white/15" : "bg-mist text-brand"}`}>{s.tag}</span></p>
                <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                  <Link href={`/services#${s.id}`} className="inline-flex items-center gap-2 text-sm font-bold">
                    Learn more <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link href={quoteLink(s.id)} className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition ${highlight ? "border-white/60 hover:bg-white hover:text-brand" : "border-ink/70 text-ink hover:bg-ink hover:text-white"}`}>
                    {s.id === "consultancy" ? "Get a review" : "Get a quote"}
                  </Link>
                </div>
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
          <SectionHeading dark eyebrow="How it works" title={<>Tell us what you need moving. <br className="hidden lg:block" />We’ll take it from there.</>} intro="Four steps, from your quote to your proof of delivery." center />
          <HowItWorks />
        </div>
      </section>

      {/* 6. WHO WE WORK WITH: sector cards, then the airport band */}
      <section className="container-x py-20 sm:py-28">
        <SectionHeading eyebrow="Who we work with" title={<>Whatever you make or <br className="hidden sm:block" />move, we’ll get it there.</>} intro="From a part stopping your line to a pallet waiting at the airport, here is how we help." center />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {sectors.map((s, i) => {
            const Icon = sectorIcons[i];
            return (
              <Reveal key={s.id} delay={i * 100} className="group relative isolate flex min-h-[28rem] flex-col justify-end overflow-hidden rounded-3xl bg-[#081a3c] p-7 text-white">
                <div className="absolute inset-x-0 top-0 -z-20 h-[48%]">
                  <Image src={s.image} alt={s.imageAlt} fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent from-10% via-[#0c2250]/70 via-35% to-[#081a3c] to-[48%]" aria-hidden="true" />
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/25 bg-white/15 backdrop-blur"><Icon className="h-5 w-5" /></span>
                <h3 className="mt-4 text-2xl font-extrabold">{s.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/85">{s.body}</p>
                <p className="mt-5">
                  <Link href="#quote" className="group/link inline-flex items-center gap-2 border-b-2 border-[#8fb8ff] pb-1 text-sm font-bold">
                    Get a quote <IconArrow className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </p>
              </Reveal>
            );
          })}
        </div>

        {/* New: Airport landside collections */}
        <Reveal className="relative isolate mt-6 overflow-hidden rounded-3xl bg-[#081a3c] text-white shadow-2xl shadow-brand/20">
          <div className="relative h-56 sm:h-72 lg:absolute lg:inset-y-0 lg:right-0 lg:-z-20 lg:h-auto lg:w-[68%]">
            <Image src="/images/airport-landside.jpg" alt="Cargo being unloaded from an aircraft at an airport" fill sizes="(min-width:1024px) 60vw, 100vw" className="object-cover" />
          </div>
          <div className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-[#081a3c] from-32% via-[#0c2250]/80 via-55% to-[#0c2250]/25 lg:block" aria-hidden="true" />
          <div className="max-w-xl p-7 sm:p-10 lg:p-14">
            <p className="eyebrow flex items-center gap-3 text-[#8fb8ff]"><IconPlane className="h-5 w-5" />Airport landside collections</p>
            <h3 className="mt-5 text-3xl font-black leading-[1.08] sm:text-4xl lg:max-w-md lg:text-[2.75rem]">Landed at the airport? We’ll collect it.</h3>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-white/80">Your freight has landed and the clock is running. We collect from the airport cargo terminal, landside, and drive it direct to your customer, day or night.</p>
            <ul className="mt-6 space-y-3">
              {airportTicks.map((t) => (
                <li key={t} className="flex items-start gap-3"><IconCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#8fb8ff]" />{t}</li>
              ))}
            </ul>
            <p className="mt-7 text-[11px] font-bold uppercase tracking-[0.14em] text-white/60">Airports we collect from</p>
            <ul className="mt-3 flex max-w-md flex-wrap gap-2">
              {airports.map((a) => (
                <li key={a} className="rounded-full border border-white/30 bg-white/10 px-3.5 py-1 text-sm font-semibold">{a}</li>
              ))}
            </ul>
            <Link href={quoteLink("airport")} className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[#8fb8ff] px-6 py-3.5 text-sm font-bold text-[#06204a] transition hover:-translate-y-0.5 hover:bg-white">
              Book an airport collection <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* New: INDUSTRIES WE COVER, then the consultancy banner at full width */}
      <section className="bg-mist py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="Industries we cover" title={<>Urgent freight for <br className="hidden sm:block" />every kind of business.</>} intro="Here are the industries we deliver for. Don’t see yours? Just ask." center />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind, i) => (
              <Reveal key={ind.id} delay={(i % 3) * 100} className="overflow-hidden rounded-3xl border border-line bg-white transition hover:-translate-y-1 hover:shadow-xl">
                <div className="relative aspect-[8/5]">
                  <Image src={`/images/industries/${ind.id}.jpg`} alt={ind.imageAlt} fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-extrabold text-ink">{ind.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-steel">{ind.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12 flex flex-col items-center justify-center gap-5 text-center sm:flex-row sm:text-left">
            <p className="text-ink">Not on the list? Tell us what you need moving and we’ll tell you what we can do.</p>
            <Button href="#quote" className="shrink-0 !bg-none !bg-brand">Get a quote</Button>
          </Reveal>

          <Reveal className="mt-14 flex flex-col gap-6 rounded-3xl bg-ink p-8 text-white sm:p-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow text-[#8fb8ff]">Transport consultancy</p>
              <p className="mt-3 text-lg leading-relaxed">Think you’re paying too much for freight? We’ll go through your transport costs with you and show you where you can save.</p>
            </div>
            <Button href={quoteLink("consultancy")} variant="ghost" className="shrink-0">Request a cost review</Button>
          </Reveal>
        </div>
      </section>

      {/* New: TRUSTED BY */}
      <TrustedBy />

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

      {/* New: TESTIMONIALS (stays hidden until three real quotes are added in site.ts) */}
      <Testimonials />

      {/* 8. QUOTE */}
      <QuoteSection />

      {/* 9. FAQ */}
      <FaqSection />

      {/* 10. FINAL CALL TO ACTION */}
      <CtaBand />
    </>
  );
}
