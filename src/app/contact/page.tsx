import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import QuoteForm from "@/components/QuoteForm";
import Reveal from "@/components/Reveal";
import { IconClock, IconMail, IconMap, IconPhone } from "@/components/icons";
import { quoteServices, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & Get a Quote | Urgent Transport Manchester",
  description:
    "Get a quote for urgent, same day or dedicated transport anywhere in the UK. Core Cargo Solutions, Bartle House, Oxford Court, Manchester M2 3WQ. Open 24/7.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ service?: string }> }) {
  // Deep links such as /contact?service=consultancy preselect the service
  const { service } = await searchParams;
  const defaultService = quoteServices.some((s) => s.id === service) ? service : "same-day";

  const mapQuery = encodeURIComponent(`${site.address.street}, ${site.address.city} ${site.address.postcode}`);

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={<>Get a quote. <span className="text-azure-light">Get moving.</span></>}
        intro="Operations run 24 hours a day. Send your route and load details and we’ll confirm price and collection time."
        image="/images/office-reception.jpg"
        imageAlt="Core Cargo Solutions office reception"
      />

      <section id="quote" className="container-x scroll-mt-28 py-20 sm:py-24">
        <div className="grid items-start gap-12 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <QuoteForm defaultService={defaultService} title="Request a quote" />
          </Reveal>

          <div className="space-y-5 lg:col-span-2">
            {[
              { icon: IconMail, label: "Email", value: site.email, href: `mailto:${site.email}` },
              ...(site.phone ? [{ icon: IconPhone, label: "Phone", value: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` }] : []),
              { icon: IconMap, label: "Office", value: `${site.address.street}, ${site.address.city} ${site.address.postcode}`, href: `https://www.google.com/maps/search/?api=1&query=${mapQuery}` },
              { icon: IconClock, label: "Hours", value: `Open ${site.hours}` },
            ].map((c, i) => {
              const inner = (
                <>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-gradient text-white"><c.icon /></span>
                  <div>
                    <p className="eyebrow text-steel">{c.label}</p>
                    <p className="mt-1 break-words font-display font-bold text-ink">{c.value}</p>
                  </div>
                </>
              );
              return (
                <Reveal key={c.label} delay={i * 80}>
                  {c.href ? (
                    <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="flex gap-4 rounded-3xl border border-line p-6 transition hover:border-azure/40 hover:shadow-lg">{inner}</a>
                  ) : (
                    <div className="flex gap-4 rounded-3xl border border-line p-6">{inner}</div>
                  )}
                </Reveal>
              );
            })}

            <Reveal className="overflow-hidden rounded-3xl border border-line">
              <iframe
                title="Core Cargo Solutions office location"
                src={`https://maps.google.com/maps?q=${mapQuery}&z=15&output=embed`}
                className="h-64 w-full grayscale-[40%]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Director card */}
      <section className="container-x pb-20">
        <Reveal className="relative isolate flex flex-col items-start gap-6 overflow-hidden rounded-[2rem] bg-navy-gradient p-8 text-white sm:flex-row sm:items-center sm:p-12">
          <Image src="/images/logo-mark-white.png" alt="" width={648} height={619} className="absolute -right-10 -top-8 -z-10 w-64 opacity-10" aria-hidden="true" />
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white font-display text-xl font-black text-brand">GI</span>
          <div>
            <p className="text-xl font-bold">Speak directly with {site.director}, Director.</p>
            <p className="mt-2 text-white/70">Every enquiry is handled personally. No call centres, no ticket queues.</p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
