import Image from "next/image";
import { site } from "@/lib/site";
import Button from "./Button";
import Reveal from "./Reveal";

/** Closing call to action band. */
export default function CtaBand({
  title = "Freight that cannot wait? We are ready now.",
  text = "Urgent collections within the hour, same day and next day dedicated transport, 24 hours a day across the UK.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="container-x py-20">
      <Reveal className="relative isolate overflow-hidden rounded-[2rem] bg-navy-gradient px-6 py-14 text-white sm:px-14 sm:py-20">
        <div className="bg-grid absolute inset-0 -z-10 opacity-40" aria-hidden="true" />
        <Image src="/images/logo-mark-white.png" alt="" width={648} height={619} className="absolute -right-16 -top-10 -z-10 w-80 opacity-[0.07] sm:w-[28rem]" aria-hidden="true" />
        <div className="grid items-center gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">{title}</h2>
            <p className="mt-5 max-w-2xl text-lg text-white/75">{text}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-end">
            <Button href="/contact#quote" variant="light">Get a quote</Button>
            {site.phone ? (
              <Button href={`tel:${site.phone.replace(/\s/g, "")}`} variant="ghost" arrow={false}>Call {site.phone}</Button>
            ) : (
              <Button href={`mailto:${site.email}`} variant="ghost" arrow={false}>Email operations</Button>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
