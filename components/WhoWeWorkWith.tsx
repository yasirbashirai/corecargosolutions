import Image from "next/image";
import Link from "next/link";
import { airports, sectors } from "@/lib/site";
import { IconArrow, IconBeam, IconFactory, IconGlobe, IconPlane } from "./icons";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const icons = [IconFactory, IconGlobe, IconBeam, IconPlane];
const cards = [
  ...sectors.map((sector) => ({ ...sector, href: "#quote", cta: "Get a quote", tagLabel: "Typical jobs" })),
  {
    id: "airport",
    title: "Airport collections",
    body: "Landed at the airport? We collect from the cargo terminal, landside, and drive it direct to your customer, day or night, with proof of delivery within the hour.",
    image: "/images/airport-landside.webp",
    imageAlt: "A cargo aircraft on the stand at an airport with cargo loaders around it",
    imagePosition: "55% 55%",
    tags: airports,
    tagLabel: "Airports we collect from",
    href: "/contact?service=airport#quote",
    cta: "Book an airport collection",
  },
];

export default function WhoWeWorkWith() {
  return (
    <section className="container-x py-20 sm:py-28" aria-labelledby="sectors-title">
      <SectionHeading eyebrow="Who we work with" title={<span id="sectors-title">Whatever you make or <br className="hidden sm:block" />move, we’ll get it there.</span>} intro="Manufacturers, freight forwarders, fabricators and airport cargo all call us when a load can’t wait. One vehicle, one driver, straight to the door." center />
      <div className="wg-grid mt-12">
        {cards.map((card, i) => {
          const Icon = icons[i];
          return (
            <Reveal key={card.id} delay={(i % 2) * 100} as="article" className="wg-card group">
              <div className="wg-card__photo">
                <Image src={card.image} alt={card.imageAlt} fill sizes="(min-width:1280px) 568px, (min-width:761px) 47vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" style={{ objectPosition: card.imagePosition }} />
              </div>
              <div className="wg-card__body">
                <span className="wg-card__icon"><Icon className="h-6 w-6" /></span>
                <h3 className="mt-6 text-2xl font-extrabold">{card.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-white/85">{card.body}</p>
                <ul className="wg-card__tags" aria-label={card.tagLabel}>
                  {card.tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
                <div className="mt-auto pt-6">
                  <Link href={card.href} className="group/link inline-flex items-center gap-3 text-sm font-bold">
                    <span className="border-b-2 border-[#8fb8ff] pb-1">{card.cta}</span>
                    <IconArrow className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
