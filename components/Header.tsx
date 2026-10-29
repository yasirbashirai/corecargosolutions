"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";
import { IconClock, IconMail, IconMap, IconPhone } from "./icons";

/**
 * Sticky header: slim operations bar on top, main nav below.
 * Gains a shadow once the page scrolls; collapses into a drawer on mobile.
 */
export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile drawer whenever the route changes
  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50">
      {/* Operations bar */}
      <div className="hidden bg-ink text-white/80 md:block">
        <div className="container-x flex h-10 items-center justify-between text-xs">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Operations live 24/7
            </span>
            <span className="flex items-center gap-1.5"><IconMap className="h-3.5 w-3.5" />Manchester · {site.coverage}</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5"><IconClock className="h-3.5 w-3.5" />Urgent collections within the hour</span>
            <a href={`mailto:${site.email}`} className="flex items-center gap-1.5 hover:text-white"><IconMail className="h-3.5 w-3.5" />{site.email}</a>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className={`border-b transition-all duration-300 ${scrolled ? "border-line bg-white/90 shadow-lg shadow-ink/5 backdrop-blur-xl" : "border-transparent bg-white"}`}>
        <div className="container-x flex h-18 items-center justify-between gap-6 py-3">
          <Link href="/" aria-label={`${site.name} home`} className="shrink-0">
            <Image src="/images/logo-horizontal.png" alt={site.name} width={1404} height={300} priority className="h-11 w-auto sm:h-12" />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-colors ${isActive(item.href) ? "text-brand" : "text-graphite hover:text-brand"}`}
              >
                {item.label}
                {isActive(item.href) && <span className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-brand-gradient" />}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {site.phone && (
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hidden items-center gap-2 text-sm font-semibold text-ink xl:flex">
                <IconPhone className="h-4 w-4 text-azure" />{site.phone}
              </a>
            )}
            <Link href="/contact#quote" className="hidden rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand/25 transition hover:-translate-y-0.5 sm:inline-flex">
              Get a Quote
            </Link>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <span className="relative block h-3 w-5">
                <span className={`absolute left-0 h-0.5 w-5 bg-ink transition-all ${open ? "top-1.5 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 top-1.5 h-0.5 w-5 bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
                <span className={`absolute left-0 h-0.5 w-5 bg-ink transition-all ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
              </span>
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <div className={`grid overflow-hidden transition-all duration-300 lg:hidden ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
          <div className="min-h-0">
            <nav className="container-x flex flex-col gap-1 pb-6" aria-label="Mobile">
              {nav.map((item) => (
                <Link key={item.href} href={item.href} className={`rounded-xl px-4 py-3 font-semibold ${isActive(item.href) ? "bg-mist text-brand" : "text-graphite"}`}>
                  {item.label}
                </Link>
              ))}
              <Link href="/contact#quote" className="mt-2 rounded-full bg-brand-gradient px-5 py-3 text-center font-semibold text-white">
                Get a Quote
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
