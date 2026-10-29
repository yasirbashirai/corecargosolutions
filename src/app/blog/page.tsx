import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import QuoteSection from "@/components/QuoteSection";
import Reveal from "@/components/Reveal";
import { IconArrow } from "@/components/icons";
import { formatDate, posts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Freight & Transport Insights Blog",
  description:
    "Practical guides on same day freight delivery, urgent transport services, choosing the right vehicle and reducing transport costs, from Core Cargo Solutions.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const [featured, ...rest] = posts;
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title={<>Practical guides for <span className="text-azure-light">moving freight</span> faster.</>}
        intro="Advice on urgent transport, vehicle selection and transport costs for manufacturers, forwarders and fabricators."
      />

      <section className="container-x py-20 sm:py-24">
        {/* Featured article */}
        <Reveal>
          <Link href={`/blog/${featured.slug}`} className="group grid overflow-hidden rounded-[2rem] border border-line bg-white transition hover:shadow-2xl lg:grid-cols-2">
            <div className="relative aspect-[16/10] lg:aspect-auto">
              <Image src={featured.image} alt={featured.imageAlt} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-12">
              <p className="eyebrow text-azure">Featured · {featured.keyword}</p>
              <h2 className="mt-4 text-2xl font-extrabold leading-tight sm:text-3xl">{featured.title}</h2>
              <p className="mt-4 text-steel">{featured.description}</p>
              <p className="mt-6 text-sm text-steel">{formatDate(featured.date)} · {featured.readMins} min read</p>
              <span className="mt-6 inline-flex items-center gap-2 font-semibold text-azure">Read article <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
            </div>
          </Link>
        </Reveal>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {rest.map((p, i) => (
            <Reveal key={p.slug} delay={i * 100} as="article">
              <Link href={`/blog/${p.slug}`} className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white transition hover:-translate-y-1 hover:shadow-xl">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={p.image} alt={p.imageAlt} fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="eyebrow text-azure">{p.keyword}</p>
                  <h3 className="mt-3 flex-1 text-lg font-bold leading-snug">{p.title}</h3>
                  <p className="mt-4 text-xs text-steel">{formatDate(p.date)} · {p.readMins} min read</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <QuoteSection />
      <CtaBand />
    </>
  );
}
