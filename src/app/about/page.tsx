import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/Button";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import QuoteSection from "@/components/QuoteSection";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { IconChart, IconCheck, IconClock, IconMap, IconShield, IconTruck } from "@/components/icons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Core Cargo Solutions | Manchester Transport Company",
  description:
    "Core Cargo Solutions Ltd is a Manchester based transport company delivering urgent, same day and dedicated freight transport across the UK, built on reliability and trust.",
  alternates: { canonical: "/about" },
};

// The logo strapline doubles as the operating model
const pillars = [
  { icon: IconChart, title: "Strategy", text: "We understand your requirements first, then plan the right vehicle, route and timing for each consignment." },
  { icon: IconClock, title: "Optimise", text: "Matching the vehicle to the load and running direct removes wasted space, wasted time and unnecessary cost." },
  { icon: IconTruck, title: "Deliver", text: "Collected on time, driven direct and signed for, with clear updates from the moment you book." },
];

const values = [
  { icon: IconShield, title: "Reliability", text: "We commit to timings we can keep, and we keep them." },
  { icon: IconCheck, title: "Trust", text: "Honest pricing, confirmed before you book. No surprises on the invoice." },
  { icon: IconMap, title: "Clear communication", text: "You always know where your consignment is and when it will arrive." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title={<>Logistics should be straightforward, dependable <span className="text-azure-light">and personal.</span></>}
        intro={`${site.name} is a Manchester based transport company delivering urgent, same day and dedicated freight across the UK.`}
      >
        <Button href="#quote">Work with us</Button>
      </PageHero>

      {/* Story */}
      <section className="container-x py-20 sm:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="relative">
            <div className="relative aspect-[3/4] overflow-hidden rounded-3xl">
              <Image src="/images/truck-yard-portrait.jpg" alt="Dedicated freight vehicle ready for dispatch" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-2 rounded-2xl bg-brand-gradient p-6 text-white shadow-2xl sm:-right-6">
              <p className="font-display text-sm font-semibold italic">&ldquo;{site.tagline}&rdquo;</p>
            </div>
          </Reveal>
          <div>
            <SectionHeading eyebrow="Our story" title="More than moving goods from A to B." />
            <Reveal className="mt-6 space-y-5 text-lg leading-relaxed text-steel">
              <p>
                At {site.name}, our ambition is to build lasting partnerships. We take time to understand each customer&apos;s requirements, provide tailored transport solutions and take personal responsibility for every delivery.
              </p>
              <p>
                Whether you need a one-off urgent movement or ongoing transport support, our approach is built on clear communication, flexibility and commitment to customer satisfaction.
              </p>
              <p>
                Alongside transport, we offer consultancy for businesses that want to understand and reduce what they spend moving freight.
              </p>
            </Reveal>
            <Reveal className="mt-8 flex items-center gap-4 border-t border-line pt-6">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-gradient font-display font-bold text-white">GI</span>
              <div>
                <p className="font-display font-bold">{site.director}</p>
                <p className="text-sm text-steel">Director, {site.name}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Strategy, Optimise, Deliver */}
      <section className="relative overflow-hidden bg-navy-gradient py-20 text-white sm:py-28">
        <div className="bg-grid absolute inset-0 opacity-30" aria-hidden="true" />
        <div className="container-x relative">
          <SectionHeading dark eyebrow="How we operate" title="Strategy. Optimise. Deliver." center intro="The three words under our logo describe exactly how every job is run." />
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 120} className="rounded-3xl border border-white/15 bg-white/5 p-8 backdrop-blur transition hover:bg-white/10">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-azure-gradient"><p.icon /></span>
                  <span className="font-display text-5xl font-black text-white/10">0{i + 1}</span>
                </div>
                <h3 className="mt-6 text-2xl font-extrabold">{p.title}</h3>
                <p className="mt-3 text-white/70">{p.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="container-x py-20 sm:py-28">
        <SectionHeading eyebrow="What we stand for" title="Values you can hold us to." center />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 100} className="rounded-3xl border border-line p-8 transition hover:-translate-y-1 hover:border-azure/40 hover:shadow-xl">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mist text-brand"><v.icon /></span>
              <h3 className="mt-6 text-xl font-extrabold">{v.title}</h3>
              <p className="mt-3 text-steel">{v.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <QuoteSection title="Let's talk about your next consignment." />
      <CtaBand />
    </>
  );
}
