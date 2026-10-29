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
  body: string;
  points: string[];
};

// Core services, ordered by commercial priority (urgent and same day first)
export const services: Service[] = [
  {
    id: "same-day",
    title: "Same Day Dedicated Transport",
    short: "One vehicle, one load, collected and delivered the same day anywhere in the UK.",
    body: "Your goods travel on a vehicle booked exclusively for your consignment. No co-loading, no depot transfers and no sorting hubs, which means fewer touch points and a direct run from collection to delivery.",
    points: ["Exclusive use of the vehicle", "Direct route, no hub transfers", "Proof of delivery on completion"],
  },
  {
    id: "urgent",
    title: "Urgent Collections Within the Hour",
    short: "For line-down parts, missed connections and time-critical freight that cannot wait.",
    body: "When production is at risk or a shipment has missed its connection, we aim to have a vehicle at your collection point within the hour across major UK locations, then run it straight through to destination.",
    points: ["Target collection within 60 minutes", "Available 24/7, including weekends", "Live updates from collection to delivery"],
  },
  {
    id: "next-day",
    title: "Next Day Dedicated Delivery",
    short: "Planned dedicated movements with fixed collection and delivery windows.",
    body: "For consignments that need certainty rather than speed, book a dedicated vehicle for a timed next day delivery. Ideal for scheduled production inputs, exhibition freight and project deliveries.",
    points: ["Timed collection and delivery slots", "Matched to the right vehicle size", "Ideal for regular scheduled runs"],
  },
  {
    id: "consultancy",
    title: "Transport Consultancy",
    short: "A practical review of how you move freight today, and where cost and delay can be removed.",
    body: "We look at your current carriers, rates, vehicle choices and booking patterns, then give you a clear written summary of where money and time are being lost and what to change first.",
    points: ["Review of current transport spend", "Vehicle and routing recommendations", "Clear, written action points"],
  },
];

export type Vehicle = {
  id: string;
  name: string;
  bestFor: string;
  length: string;
  payload: string;
  pallets: string;
  // Upper bounds used by the quote form to suggest a vehicle
  maxKg: number;
  maxPallets: number;
};

// Indicative UK vehicle specifications. Actual capacity varies by make and model.
export const vehicles: Vehicle[] = [
  { id: "small-van", name: "Small Van", bestFor: "Documents, samples and small parts", length: "1.8 m", payload: "up to 600 kg", pallets: "1 pallet", maxKg: 600, maxPallets: 1 },
  { id: "swb-van", name: "SWB Van", bestFor: "Boxed goods and single pallets", length: "2.4 m", payload: "up to 1,000 kg", pallets: "2 pallets", maxKg: 1000, maxPallets: 2 },
  { id: "mwb-van", name: "MWB Van", bestFor: "Mixed loads and machine parts", length: "3.0 m", payload: "up to 1,100 kg", pallets: "2 pallets", maxKg: 1100, maxPallets: 2 },
  { id: "lwb-van", name: "LWB Van", bestFor: "Long items and multi-pallet loads", length: "4.0 m", payload: "up to 1,200 kg", pallets: "3 pallets", maxKg: 1200, maxPallets: 3 },
  { id: "luton", name: "Luton with Tail Lift", bestFor: "Bulky freight without a forklift on site", length: "4.0 m", payload: "up to 1,000 kg", pallets: "4 pallets", maxKg: 1000, maxPallets: 4 },
  { id: "rigid-75", name: "7.5 Tonne Rigid", bestFor: "Part loads and fabricated steel", length: "6.0 m", payload: "up to 2,500 kg", pallets: "8 to 10 pallets", maxKg: 2500, maxPallets: 10 },
  { id: "rigid-18", name: "18 Tonne Rigid", bestFor: "Heavy part loads and plant", length: "7.3 m", payload: "up to 8,000 kg", pallets: "14 to 16 pallets", maxKg: 8000, maxPallets: 16 },
  { id: "artic", name: "Articulated Lorry", bestFor: "Full loads, nationwide", length: "13.6 m", payload: "up to 24,000 kg", pallets: "26 pallets", maxKg: 24000, maxPallets: 26 },
];

// Smallest vehicle that fits the stated weight and pallet count
export function suggestVehicle(kg: number, pallets: number): Vehicle {
  return (
    vehicles.find((v) => kg <= v.maxKg && pallets <= v.maxPallets) ?? vehicles[vehicles.length - 1]
  );
}

export const sectors = [
  {
    title: "Manufacturers",
    body: "Line-down parts, raw materials and finished goods moved direct, so production keeps running.",
  },
  {
    title: "Freight Forwarders",
    body: "Reliable domestic legs for port, airport and bonded movements, with clear updates you can pass on.",
  },
  {
    title: "Fabricators",
    body: "Steel, frames and fabricated assemblies on the right vehicle, from long-wheelbase vans to rigids.",
  },
];

export const faqs = [
  {
    q: "How quickly can you collect an urgent consignment?",
    a: "For urgent jobs we aim to have a vehicle at your collection point within the hour across major UK locations. When you request a quote we confirm a realistic collection time before you commit.",
  },
  {
    q: "What does dedicated transport mean?",
    a: "The vehicle is booked exclusively for your consignment. It is not shared with other customers and does not pass through a sorting depot, so it travels directly from collection to delivery.",
  },
  {
    q: "Do you operate outside Manchester?",
    a: "Yes. We are based in Manchester and run same day and next day dedicated transport across the whole of the UK.",
  },
  {
    q: "Which vehicle do I need?",
    a: "Tell us the weight, the number of pallets and the dimensions of the longest item. Our quote form suggests a vehicle automatically, and we confirm the right size before booking.",
  },
  {
    q: "Are you available at night and at weekends?",
    a: "Yes. Operations run 24 hours a day, 7 days a week, including bank holidays.",
  },
  {
    q: "What does the transport consultancy involve?",
    a: "We review your current transport spend, carriers and booking patterns, then provide a written summary of where cost and delay can be reduced, with practical next steps.",
  },
];
