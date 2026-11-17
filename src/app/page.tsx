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
import WhoWeWorkWith from "@/components/WhoWeWorkWith";
import VehicleSelector from "@/components/VehicleSelector";
import { IconArrow, IconBolt, IconBox, IconCalendar, IconChart, IconCheck, IconClock, IconMap, IconShield, IconTimer, IconTruck } from "@/components/icons";
import { faqs, industries, services, vehicles } from "@/lib/site";
import { faqSchema } from "@/lib/schema";

const serviceIcons = [IconTruck, IconBolt, IconCalendar, IconChart];

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

// Service cards link to the quote form with that service already selected
const quoteLink = (id: string) => `/?service=${id}#quote`;

export default function Home() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />

      {/* 1. HERO: strong headline, two CTAs, live dispatch widget */}
      <section className="cc-hero relative isolate overflow-hidden text-white">
        <div className="cc-hero__photo" aria-hidden="true">
          <Image src="/images/core-cargo-truck-hero.webp" alt="" width={1535} height={1024} preload fetchPriority="high" unoptimized className="cc-hero__image" />
        </div>
        <div className="container-x cc-hero__layout">
          <div className="cc-hero__copy">
            <Reveal>
              <ResponseTimer />
              <h1 className="cc-hero__title mt-6 font-black leading-[1.05]">
                <span className="block">Freight that can’t wait?</span>{" "}
                <span className="block bg-gradient-to-r from-[#7fb4f2] to-white bg-clip-text text-transparent">We’re already on our way.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
                A HGV vehicle or a van just for your load. We collect within the hour and drive it straight to the door, day or night, Nationwide.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button href="/contact#quote">Get an instant quote</Button>
                <Button href="/services" variant="ghost">Explore services</Button>
              </div>
              <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/70">
                {["No co-loading", "No depot transfers", "No chasing proof of delivery"].map((t) => (
                  <li key={t} className="flex items-center gap-2"><IconCheck className="h-4 w-4 text-azure-light" />{t}</li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Dispatch widget: illustrates the dedicated, direct journey */}
          <Reveal delay={200} className="cc-hero__dispatch">
            <div className="rounded-3xl border border-white/25 bg-[#08234b]/65 p-6 shadow-2xl backdrop-blur-md">
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

        <div className="cs-grid mt-12 grid gap-5">
          {/* Featured card with the Core Cargo articulated lorry */}
          <Reveal className="cs-feature group relative isolate flex flex-col justify-end overflow-hidden rounded-3xl bg-[#081530] text-white">
            <div className="cs-feature__photo">
              <Image src="/images/services-same-day-truck.webp" alt="" fill sizes="(min-width:981px) 50vw, (min-width:621px) 50vw, 100vw" className="cs-feature__image" />
            </div>
            <span className="absolute left-7 top-7 z-10 flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 backdrop-blur"><IconTruck className="h-5 w-5" /></span>
            <div className="cs-feature__body relative p-7 sm:p-8">
            <h3 className="text-xl font-extrabold">{services[0].title}</h3>
            <p className="mt-3 max-w-md text-white/80">{services[0].short}</p>
            <p className="mt-4"><span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">{services[0].tag}</span></p>
            <div className="mt-6 flex items-center justify-between gap-4">
              <Link href={`/services#${services[0].id}`} className="group inline-flex items-center gap-2 text-sm font-bold">Learn more <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
              <Link href={quoteLink(services[0].id)} className="rounded-full border border-white/60 px-4 py-1.5 text-sm font-semibold transition hover:bg-white hover:text-brand">Get a quote</Link>
            </div>
            </div>
          </Reveal>

          {services.slice(1).map((s, i) => {
            const Icon = serviceIcons[i + 1];
            const highlight = s.id === "urgent";
            return (
              <Reveal
                key={s.id}
                delay={(i + 1) * 100}
                className={`group flex flex-col rounded-3xl border p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${highlight ? "cs-urgent border-transparent bg-brand-gradient text-white" : "border-line bg-white hover:border-azure/40"}`}
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
      <section id="vehicles" className="scroll-mt-40 bg-mist py-20 sm:py-28">
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

      {/* 6. WHO WE WORK WITH */}
      <WhoWeWorkWith />

      {/* New: INDUSTRIES WE COVER, then the consultancy banner at full width */}
      <section className="bg-mist py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="Industries we cover" title={<>Urgent freight for <br className="hidden sm:block" />every kind of business.</>} intro="Here are the industries we deliver for. Don’t see yours? Just ask." center />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind, i) => (
              <Reveal key={ind.id} delay={(i % 3) * 100} className="overflow-hidden rounded-3xl border border-line bg-white transition hover:-translate-y-1 hover:shadow-xl">
                <div className="relative aspect-[8/5]">
                  <Image src={ind.id === "engineering" ? "/images/engineering.webp" : `/images/industries/${ind.id}.jpg`} alt={ind.imageAlt} fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover" style={ind.id === "engineering" ? { objectPosition: "50% 90%" } : undefined} />
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
