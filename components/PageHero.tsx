import Image from "next/image";
import Reveal from "./Reveal";

/** Inner-page hero: dark navy panel with optional photo, breadcrumb label and intro. */
export default function PageHero({
  eyebrow,
  title,
  intro,
  image,
  imageAlt = "",
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  image?: string;
  imageAlt?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-gradient text-white">
      {image && (
        <>
          <Image src={image} alt={imageAlt} fill priority sizes="100vw" className="animate-kenburns -z-20 object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#001c40] via-[#001c40]/85 to-[#003880]/40" />
        </>
      )}
      <div className="bg-grid absolute inset-0 -z-10 opacity-30" aria-hidden="true" />
      <div className="container-x py-20 sm:py-28">
        <Reveal className="max-w-3xl">
          <p className="eyebrow text-azure-light">{eyebrow}</p>
          <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">{title}</h1>
          {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">{intro}</p>}
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </Reveal>
      </div>
    </section>
  );
}
