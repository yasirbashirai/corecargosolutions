// Single source of truth for business details, services and vehicle data.
// Update values here and every page, form and schema block picks them up.

export const site = {
  name: "Core Cargo Solutions Ltd",
  shortName: "Core Cargo",
  tagline: "Driven by Reliability. Powered by Trust.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://corecargo.co.uk",
  email: "operations@corecargo.co.uk",
  // TODO: add the 24/7 operations number when supplied. While empty, call buttons fall back to email.
  phone: "",
  director: "Guled Issa",
  hours: "24 hours a day, 7 days a week",
  address: {
    street: "Bartle House, Oxford Court",
    city: "Manchester",
    region: "Lancashire",
    postcode: "M2 3WQ",
    country: "GB",
  },
  coverage: "UK nationwide",
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export type Service = {
  id: string;
  title: string;
  short: string;
  // Short promise shown as a pill on the home page service cards
  tag: string;
  body: string;
  points: string[];
};

// Core services, ordered by commercial priority (urgent and same day first)
export const services: Service[] = [
  {
    id: "same-day",
    title: "Same Day Dedicated Transport",
    short: "Your load gets its own vehicle and goes straight there. Book this morning, delivered today, Nationwide.",
    tag: "Nationwide · 24/7",
    body: "Your goods travel on a vehicle booked exclusively for your consignment. No co-loading, no depot transfers and no sorting hubs, which means fewer touch points and a direct run from collection to delivery.",
    points: ["Exclusive use of the vehicle", "Direct route, no hub transfers", "Proof of delivery on completion"],
  },
  {
    id: "urgent",
    title: "Urgent Collections Within the Hour",
    short: "Line down? Part missing? We aim to have a driver with you within the hour, day or night.",
    tag: "Within the hour",
    body: "When production is at risk or a shipment has missed its connection, we aim to have a vehicle at your collection point within the hour across major UK locations, then run it straight through to destination.",
    points: ["Target collection within 60 minutes", "Available 24/7, including weekends", "Live updates from collection to delivery"],
  },
  {
    id: "next-day",
    title: "Next Day Dedicated Delivery",
    short: "Planned runs with fixed collection and delivery times, so you can tell your customer exactly when.",
    tag: "Fixed time windows",
    body: "For consignments that need certainty rather than speed, book a dedicated vehicle for a timed next day delivery. Ideal for scheduled production inputs, exhibition freight and project deliveries.",
    points: ["Timed collection and delivery slots", "Matched to the right vehicle size", "Ideal for regular scheduled runs"],
  },
  {
    id: "consultancy",
    title: "Transport Consultancy",
    short: "Paying too much for freight? We look at how you move goods today and show you where to save.",
    tag: "Written cost review",
    body: "We look at your current carriers, rates, vehicle choices and booking patterns, then give you a clear written summary of where money and time are being lost and what to change first.",
    points: ["Review of current transport spend", "Vehicle and routing recommendations", "Clear, written action points"],
  },
];

// Choices on step 1 of the quote form. Airport is a quote option only, it has no service page block.
export const quoteServices = [
  { id: "same-day", label: "Same day", note: "Dedicated vehicle, today" },
  { id: "urgent", label: "Urgent", note: "Collected within the hour" },
  { id: "next-day", label: "Next day", note: "Dedicated, booked ahead" },
  { id: "airport", label: "Airport", note: "Landside collection" },
  { id: "consultancy", label: "Transport consultancy", note: "Review my transport costs" },
];

export type Vehicle = {
  id: string;
  name: string;
  // "a" or "an", so links read "Quote for an XLWB Van"
  article: "a" | "an";
  bestFor: string;
  length: string;
  width: string;
  height: string;
  payload: string;
  pallets: string;
  // Core Cargo vehicle picture (transparent PNG in public/images/vehicles)
  image: { src: string; width: number; height: number };
  // Upper bounds used by the quote form to suggest a vehicle
  maxKg: number;
  maxPallets: number;
  maxLength: number;
  tailLift: boolean;
};

// Indicative UK vehicle specifications. Actual capacity varies by make and model.
// TODO: MWB Van figures are estimates, confirm with the client.
export const vehicles: Vehicle[] = [
  { id: "small-van", image: { src: "/images/vehicles/small-van.png", width: 810, height: 366 }, name: "Small Van", article: "a", bestFor: "Documents, samples and small parts", length: "1.2–1.5 m", width: "1.2 m", height: "1.1 m", payload: "350–450 kg", pallets: "1 pallet", maxKg: 450, maxPallets: 1, maxLength: 1.5, tailLift: false },
  { id: "swb-van", image: { src: "/images/vehicles/swb-van.png", width: 811, height: 382 }, name: "SWB Van", article: "an", bestFor: "Boxed goods and single pallets", length: "2.4 m", width: "1.2 m", height: "1.6 m", payload: "800–1,000 kg", pallets: "2 pallets", maxKg: 1000, maxPallets: 2, maxLength: 2.4, tailLift: false },
  { id: "mwb-van", image: { src: "/images/vehicles/mwb-van.png", width: 863, height: 382 }, name: "MWB Van", article: "an", bestFor: "Mixed loads and machine parts", length: "3.0 m", width: "1.2 m", height: "1.6–1.7 m", payload: "1,000–1,100 kg", pallets: "2 pallets", maxKg: 1100, maxPallets: 2, maxLength: 3.0, tailLift: false },
  { id: "lwb-van", image: { src: "/images/vehicles/lwb-van.png", width: 882, height: 369 }, name: "LWB Van", article: "an", bestFor: "Long items and multi-pallet loads", length: "4.0 m", width: "1.2 m", height: "1.7 m", payload: "1,000–1,250 kg", pallets: "3 pallets", maxKg: 1250, maxPallets: 3, maxLength: 4.0, tailLift: false },
  { id: "xlwb-van", image: { src: "/images/vehicles/xlwb-van.png", width: 887, height: 337 }, name: "XLWB Van", article: "an", bestFor: "Taller, heavier multi-pallet loads", length: "4.0 m", width: "1.25 m", height: "1.75 m", payload: "1,250–1,400 kg", pallets: "4 pallets", maxKg: 1400, maxPallets: 4, maxLength: 4.0, tailLift: false },
  { id: "luton", image: { src: "/images/vehicles/luton.png", width: 885, height: 405 }, name: "Luton with Tail Lift", article: "a", bestFor: "Bulky freight without a forklift on site", length: "4.2–4.6 m", width: "2.2 m", height: "2.0–2.4 m", payload: "1,000–1,400 kg", pallets: "6 pallets", maxKg: 1400, maxPallets: 6, maxLength: 4.6, tailLift: true },
  { id: "rigid-75", image: { src: "/images/vehicles/rigid-75.png", width: 853, height: 387 }, name: "7.5 Tonne Rigid", article: "a", bestFor: "Part loads and fabricated steel", length: "6.0 m", width: "2.4 m", height: "2.4 m", payload: "2,400 kg", pallets: "10 pallets", maxKg: 2400, maxPallets: 10, maxLength: 6.0, tailLift: true },
  { id: "rigid-18", image: { src: "/images/vehicles/rigid-18.png", width: 873, height: 324 }, name: "18 Tonne Rigid", article: "an", bestFor: "Heavy part loads and plant", length: "7.6 m", width: "2.4 m", height: "2.4 m", payload: "9,000 kg", pallets: "14 pallets", maxKg: 9000, maxPallets: 14, maxLength: 7.6, tailLift: true },
  { id: "artic", image: { src: "/images/vehicles/artic.png", width: 953, height: 258 }, name: "Articulated Lorry", article: "an", bestFor: "Full loads, nationwide", length: "13.6 m", width: "2.45 m", height: "2.6–2.9 m", payload: "24,000 kg", pallets: "26 pallets", maxKg: 24000, maxPallets: 26, maxLength: 13.6, tailLift: false },
];

// Smallest vehicle that fits the stated weight, pallet count and longest item.
// With needsTailLift, only vehicles that carry a tail lift are considered.
export function suggestVehicle(kg: number, pallets: number, length = 0, needsTailLift = false): Vehicle {
  const pool = needsTailLift ? vehicles.filter((v) => v.tailLift) : vehicles;
  return (
    pool.find((v) => kg <= v.maxKg && pallets <= v.maxPallets && length <= v.maxLength) ??
    (needsTailLift ? pool[pool.length - 1] : vehicles[vehicles.length - 1])
  );
}

export const sectors = [
  {
    id: "manufacturers",
    title: "Manufacturers",
    body: "When a part is holding up your line, we collect it and drive it straight to you. Raw materials and finished orders too, so production keeps running.",
    image: "/images/manufacturers.webp",
    imageAlt: "A factory worker in safety glasses checks a clutch plate on a packing line",
    imagePosition: "50% 38%",
    tags: ["Line-down parts", "Raw materials", "Finished orders"],
  },
  {
    id: "freight-forwarders",
    title: "Freight forwarders",
    body: "We cover the UK leg for you, from a port or an airport to your customer’s door. You get clear updates and a proof of delivery to pass straight on.",
    image: "/images/freight-forwarders.webp",
    imageAlt: "A logistics coordinator at his desk tracking a shipment on a spreadsheet",
    imagePosition: "30% 50%",
    tags: ["Port to door", "Airport to door", "POD to pass on"],
  },
  {
    id: "fabricators",
    title: "Fabricators",
    body: "Steel, frames and fabricated parts need the right vehicle. We match it to your load, from a long-wheelbase van to a rigid, and take it there in one trip.",
    image: "/images/fabricators.webp",
    imageAlt: "A fabricator in a welding mask grinding steel with sparks flying",
    imagePosition: "50% 60%",
    tags: ["Steel and frames", "Long loads", "One trip"],
  },
];

// Airport landside collections band.
// TODO: airport names are placeholders, keep only the ones Core Cargo really collects from.
export const airports = ["Manchester", "Heathrow", "East Midlands", "Birmingham", "Gatwick", "Stansted"];

// Industries grid. TODO: keep only the industries Core Cargo really serves.
export const industries = [
  { id: "aerospace-defence", title: "Aerospace & Defence", body: "Time-critical parts and equipment, collected and delivered with care.", imageAlt: "Aircraft engine in a hangar" },
  { id: "automotive", title: "Automotive", body: "Line-down parts and components, to the plant, the dealer or the garage.", imageAlt: "Robots assembling a car body on a production line" },
  { id: "engineering", title: "Engineering", body: "Machine parts, tooling and heavy awkward loads on the right vehicle.", imageAlt: "Two engineers in hard hats review drawings and a tablet beside a machine" },
  { id: "events-entertainment", title: "Events & Entertainment", body: "Staging, sound and lighting kit, on time for load-in and load-out.", imageAlt: "Stage lighting rig at an event" },
  { id: "it", title: "IT", body: "Servers, networking kit and equipment, delivered straight to site.", imageAlt: "Server racks in a data room" },
  { id: "manufacturing-packaging", title: "Manufacturing & Packaging", body: "Materials in and finished goods out, so your line never waits.", imageAlt: "Conveyor lines in a packaging plant" },
  { id: "oil-gas", title: "Oil & Gas", body: "Spares and equipment for site, moved fast when downtime costs.", imageAlt: "Refinery lit up at night" },
  { id: "pharmaceutical-healthcare", title: "Pharmaceutical & Healthcare", body: "Urgent supplies and equipment, collected and delivered direct.", imageAlt: "Hospital staff moving medical equipment along a corridor" },
  { id: "retail", title: "Retail", body: "Stock, displays and urgent top-ups, delivered where they’re needed.", imageAlt: "Bright retail shop floor with product displays" },
];

// Logo artwork extracted without colour changes from the supplied Round 2 PDF.
// Sealco remains text until its logo is supplied. Member artwork remains provisional.
export const customers: { name: string; image?: string; height: number; width: number }[] = [
  { name: "GXO", image: "/logos/gxo.svg", height: 34, width: 99 },
  { name: "Rolls-Royce", image: "/logos/rr.svg", height: 58, width: 37 },
  { name: "Sealco", height: 0, width: 0 },
  { name: "B&Q", image: "/logos/bq.svg", height: 48, width: 48 },
  { name: "Dunelm", image: "/logos/dunelm.svg", height: 40, width: 104 },
  { name: "Screwfix", image: "/logos/screwfix.svg", height: 26, width: 127 },
  { name: "Aston Martin", image: "/logos/aston.svg", height: 18, width: 182 },
  { name: "Jaguar Land Rover", image: "/logos/jlr.svg", height: 42, width: 48 },
  { name: "Kellogg’s", image: "/logos/kelloggs.svg", height: 36, width: 101 },
  { name: "JCB", image: "/logos/jcb.svg", height: 38, width: 101 },
  { name: "Sephora", image: "/logos/sephora.svg", height: 20, width: 137 },
  { name: "China Cargo Airlines", image: "/logos/china-cargo.png", height: 46, width: 204 },
];

export type Testimonial = {
  quote: string; // the customer's own words, two or three sentences
  moved: string; // type of job, shown as "What we moved: ..."
  name: string;
  role: string;
  company: string;
};

// Real, approved customer quotes only. The Testimonials section stays hidden
// until at least three are listed here. Never add invented quotes or star ratings.
export const testimonials: Testimonial[] = [];

export type FaqItem = {
  q: string;
  a: string;
  // Optional link shown at the end of the answer
  link?: { before: string; label: string; href: string; after: string };
};

export const faqs: FaqItem[] = [
  {
    q: "How quickly can you collect an urgent consignment?",
    a: "For urgent jobs we aim to have a vehicle at your collection point within the hour at major UK locations. When you ask for a quote, we confirm a realistic time before you book.",
  },
  {
    q: "What does dedicated transport mean?",
    a: "Your goods get the vehicle to themselves. It isn’t shared with anyone else’s load, and it goes straight from collection to delivery with no depots and no hand-offs on the way.",
  },
  {
    q: "Do you operate outside Manchester?",
    a: "Yes. We’re based in Manchester but cover the whole UK for same day and next day dedicated transport.",
  },
  {
    q: "Which vehicle do I need?",
    a: "Tell us the weight, the number of pallets and the length of your longest item. The quote form suggests a vehicle and we confirm the size with you before you book. Not sure? Just ask.",
    link: { before: "You can also see every vehicle on our ", label: "vehicle range", href: "/services#vehicles", after: "." },
  },
  {
    q: "What types of trailer and vehicle body can you provide?",
    a: "We can provide both curtain-sider and box vehicles. A curtain-sider opens down the side, so a forklift can load from the side and tall or awkward loads are easy to get on. A box vehicle gives you a fully enclosed, secure load area that keeps your goods out of the weather. Tell us which you need when you ask for a quote, or give us the load details and we’ll recommend one.",
    link: { before: "You can see the sizes on our ", label: "vehicle range", href: "#vehicles", after: "." },
  },
  {
    q: "Are you available at night and at weekends?",
    a: "Yes. We’re open 24 hours a day, every day, including bank holidays.",
  },
  {
    q: "What does the transport consultancy involve?",
    a: "We go through what you spend on transport now, which carriers you use and how you book. Then we send you a written summary showing where you could cut cost and delays, and what to do next.",
  },
  // TODO: the four answers below are drafts, confirm with the client.
  {
    q: "How much will it cost?",
    a: "It depends on the distance, the vehicle and how soon you need it. Send us the route and the load and we’ll give you a price and a collection time before you book. There’s no obligation.",
  },
  {
    q: "Do I get proof of delivery?",
    a: "Yes. Once your goods are signed for, your proof of delivery is emailed to you within the hour.",
  },
  {
    q: "Can you collect from an airport?",
    a: "Yes. We collect from the airport cargo terminal, landside, and drive it direct to your customer, day or night. Choose “Airport” on the quote form and tell us the airport.",
  },
  {
    q: "How do I book?",
    a: "Fill in the quote form or email operations@corecargo.co.uk. We come back within 10 minutes with a price and a collection time, and your driver is on the way as soon as you say yes.",
  },
];

// Full answer text, including any link sentence, for search and structured data
export const faqText = (f: FaqItem) => (f.link ? `${f.a} ${f.link.before}${f.link.label}${f.link.after}` : f.a);
