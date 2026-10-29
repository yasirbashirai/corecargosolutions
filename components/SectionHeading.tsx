import Reveal from "./Reveal";

/** Eyebrow + headline + optional intro, used at the top of each section. */
export default function SectionHeading({
  eyebrow,
  title,
  intro,
  center = false,
  dark = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  center?: boolean;
  dark?: boolean;
}) {
  return (
    <Reveal className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      <p className={`eyebrow ${dark ? "text-azure-light" : "text-azure"}`}>{eyebrow}</p>
      <h2 className={`mt-3 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl ${dark ? "text-white" : "text-ink"}`}>{title}</h2>
      {intro && <p className={`mt-5 text-lg leading-relaxed ${dark ? "text-white/70" : "text-steel"}`}>{intro}</p>}
    </Reveal>
  );
}
