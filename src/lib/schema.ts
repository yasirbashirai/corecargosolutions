import { site, services, faqText, type FaqItem } from "./site";

// LocalBusiness structured data shared by every page (Google uses it for local results)
export const businessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${site.url}/#business`,
  name: site.name,
  alternateName: site.shortName,
  slogan: site.tagline,
  url: site.url,
  email: site.email,
  ...(site.phone ? { telephone: site.phone } : {}),
  logo: `${site.url}/images/logo-full.png`,
  image: `${site.url}/images/hero-truck-road.jpg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    postalCode: site.address.postcode,
    addressCountry: site.address.country,
  },
  areaServed: { "@type": "Country", name: "United Kingdom" },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "00:00",
    closes: "23:59",
  },
  founder: { "@type": "Person", name: site.director, jobTitle: "Director" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Transport services",
    itemListElement: services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.title, description: s.short } })),
  },
};

export const faqSchema = (items: FaqItem[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: faqText(f) } })),
});
