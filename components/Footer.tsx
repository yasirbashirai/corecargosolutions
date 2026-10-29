import Image from "next/image";
import Link from "next/link";
import { nav, services, site } from "@/lib/site";
import { IconClock, IconMail, IconMap, IconPhone } from "./icons";

/** Site footer with services, company links and NAP (name, address, phone) details for local SEO. */
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-ink text-white/70">
      <div className="bg-grid absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="container-x relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Image src="/images/logo-horizontal-white.png" alt={site.name} width={1404} height={300} className="h-12 w-auto" />
          <p className="mt-6 max-w-sm leading-relaxed">
            Urgent, same day and next day dedicated transport across the UK, with transport consultancy for businesses that want to move freight for less.
          </p>
          <p className="mt-6 font-display text-sm font-semibold italic text-white">{site.tagline}</p>
        </div>

        <div className="lg:col-span-3">
          <h3 className="eyebrow text-white">Services</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {services.map((s) => (
              <li key={s.id}><Link href={`/services#${s.id}`} className="transition hover:text-white">{s.title}</Link></li>
            ))}
            <li><Link href="/services#vehicles" className="transition hover:text-white">Vehicle Range</Link></li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h3 className="eyebrow text-white">Company</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {nav.map((n) => (
              <li key={n.href}><Link href={n.href} className="transition hover:text-white">{n.label}</Link></li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h3 className="eyebrow text-white">Operations</h3>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="flex gap-3"><IconMap className="h-5 w-5 shrink-0 text-azure-light" /><span>{site.address.street}<br />{site.address.city} {site.address.postcode}</span></li>
            <li className="flex gap-3"><IconMail className="h-5 w-5 shrink-0 text-azure-light" /><a href={`mailto:${site.email}`} className="hover:text-white">{site.email}</a></li>
            {site.phone && <li className="flex gap-3"><IconPhone className="h-5 w-5 shrink-0 text-azure-light" /><a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-white">{site.phone}</a></li>}
            <li className="flex gap-3"><IconClock className="h-5 w-5 shrink-0 text-azure-light" /><span>Open {site.hours}</span></li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container-x flex flex-col gap-2 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {site.name}. All rights reserved.</p>
          <p>Same Day Freight Delivery · Dedicated Transport Services · Urgent Transport Services</p>
        </div>
      </div>
    </footer>
  );
}
