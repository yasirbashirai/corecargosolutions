import { site } from "@/lib/site";
import Button from "./Button";
import Reveal from "./Reveal";
import { IconCheck, IconClock, IconShield } from "./icons";

const reasons = [
  { icon: IconClock, text: "Reply in 10 minutes" },
  { icon: IconCheck, text: "Dedicated vehicle" },
  { icon: IconShield, text: "Proof of delivery within the hour" },
];

/** Closing call to action band with a live pill, three short reasons and an animated route. */
export default function CtaBand({
  title = "Freight that can’t wait? We’re ready now.",
  text = "Urgent collections within the hour, same day and next day dedicated transport, 24 hours a day across the UK.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="container-x py-20">
      <Reveal className="relative isolate overflow-hidden rounded-[2rem] bg-navy-gradient px-6 py-14 text-white shadow-2xl shadow-brand/20 sm:px-14 sm:py-20">
        <div className="bg-grid absolute inset-0 -z-10 opacity-40" aria-hidden="true" />
        <div className="grid items-center gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold backdrop-blur">
              <span className="live-dot" /> Operations live now · open 24/7
            </span>
            <h2 className="mt-6 text-4xl font-black leading-[1.05] sm:text-5xl lg:text-6xl">{title}</h2>
            <p className="mt-5 max-w-xl text-lg text-white/75">{text}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href="/contact#quote" variant="light">Get a quote</Button>
              <Button href={`mailto:${site.email}`} variant="ghost" arrow={false}>Email operations</Button>
              {site.phone && <Button href={`tel:${site.phone.replace(/\s/g, "")}`} variant="ghost" arrow={false}>Call now</Button>}
            </div>
            <ul className="mt-8 flex max-w-md flex-wrap gap-x-6 gap-y-3 text-sm text-white/85">
              {reasons.map((r) => (
                <li key={r.text} className="flex items-center gap-2"><r.icon className="h-4 w-4 text-[#8fb8ff]" />{r.text}</li>
              ))}
            </ul>
          </div>

          {/* Animated route: a van drives from Collected to Delivered on a loop */}
          <div className="relative mx-auto w-full max-w-sm lg:col-span-2" aria-hidden="true">
            <svg viewBox="-20 -20 370 310" className="w-full overflow-visible">
              {[60, 110, 165].map((r) => (
                <circle key={r} cx="165" cy="135" r={r} fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="1" />
              ))}
              <path d="M30 250 C 110 250, 110 150, 180 150 S 250 60, 300 20" fill="none" stroke="rgba(255,255,255,.3)" strokeWidth="2" strokeDasharray="4 7" strokeLinecap="round" />
              <path d="M30 250 C 110 250, 110 150, 180 150 S 250 60, 300 20" pathLength={1} fill="none" stroke="#8fb8ff" strokeWidth="3.5" strokeLinecap="round" className="route-line" />
              <g className="route-van">
                <g transform="translate(-14 -9)">
                  <path d="M0 3.5Q0 1 2.5 1H17l7 6.5V15H0z" fill="#fff" />
                  <path d="M16 3.5h1.2l4 4H16z" fill="#06204a" />
                  <circle cx="6" cy="15.5" r="3" fill="#06204a" stroke="#fff" strokeWidth="1.2" />
                  <circle cx="19" cy="15.5" r="3" fill="#06204a" stroke="#fff" strokeWidth="1.2" />
                </g>
              </g>
            </svg>
            <div className="absolute bottom-0 left-0 flex items-center gap-3 rounded-full border border-white/20 bg-white/10 py-2 pl-3 pr-5 backdrop-blur">
              <span className="h-3 w-3 rounded-full border-2 border-white/60 bg-white" />
              <span>
                <span className="block text-sm font-semibold leading-tight">Collected</span>
                <span className="block text-xs text-white/65">Straight from your door</span>
              </span>
            </div>
            <div className="absolute right-0 top-0 flex items-center gap-3 rounded-full border border-white/20 bg-white/10 py-2 pl-3 pr-5 backdrop-blur">
              <span className="live-dot !h-3 !w-3" />
              <span>
                <span className="block text-sm font-semibold leading-tight">Delivered</span>
                <span className="block text-xs text-white/65">Proof of delivery within the hour</span>
              </span>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
