// Blog articles. Each article is plain data so it can move into a CMS later
// without changing the page templates.

export type Post = {
  slug: string;
  title: string;
  description: string;
  keyword: string;
  date: string; // ISO date
  readMins: number;
  image: string;
  imageAlt: string;
  intro: string;
  sections: { heading: string; paragraphs: string[]; list?: string[] }[];
};

export const posts: Post[] = [
  {
    slug: "same-day-freight-delivery-uk",
    title: "Same Day Freight Delivery in the UK: How Dedicated Transport Works",
    description:
      "How same day freight delivery works in the UK, when a dedicated vehicle is the right choice, and what affects collection and delivery times.",
    keyword: "Same Day Freight Delivery",
    date: "2026-10-20",
    readMins: 5,
    image: "/images/truck-temperature.jpg",
    imageAlt: "Dedicated freight vehicle on the road for a same day delivery",
    intro:
      "Same day freight delivery is often the difference between a production line that keeps running and one that stops. Here is how a dedicated same day service works, and how to get the most from it.",
    sections: [
      {
        heading: "What makes same day freight different",
        paragraphs: [
          "Standard pallet networks move freight through regional hubs overnight. That model is efficient for routine freight, but every hub adds handling, waiting time and risk of damage.",
          "Same day freight delivery removes the network. A single vehicle is booked for your consignment, collects it, and drives it directly to the delivery address. There is no sorting, no transfer and no waiting for other customers' freight.",
        ],
      },
      {
        heading: "When dedicated same day transport makes sense",
        paragraphs: ["A dedicated vehicle is usually the right choice when the cost of delay is higher than the cost of the vehicle. Typical examples include:"],
        list: [
          "Replacement parts for a line-down production stoppage",
          "Freight that has missed a ferry, flight or vessel connection",
          "Fragile or high value goods that should not be handled repeatedly",
          "Exhibition, project and installation deliveries with a fixed time slot",
        ],
      },
      {
        heading: "What affects collection and delivery times",
        paragraphs: [
          "Distance is only one factor. Time of day, motorway conditions, loading arrangements at both ends and driver hours rules for longer journeys all play a part.",
          "Giving accurate information at the quote stage, including the exact address, opening times and whether a forklift is available, allows a realistic timeline to be confirmed before you book.",
        ],
      },
      {
        heading: "How to book",
        paragraphs: [
          "Request a quote with your collection and delivery postcodes, the weight and number of pallets, and the time you need it delivered. Core Cargo Solutions will confirm the vehicle, price and collection time before you commit.",
        ],
      },
    ],
  },
  {
    slug: "urgent-transport-services-checklist",
    title: "Urgent Transport Services: What to Have Ready When You Book",
    description:
      "A practical checklist for booking urgent transport services in the UK, so your vehicle is dispatched faster and arrives without problems.",
    keyword: "Urgent Transport Services",
    date: "2026-10-13",
    readMins: 4,
    image: "/images/truck-tanker.jpg",
    imageAlt: "Commercial vehicle ready for an urgent transport collection",
    intro:
      "When freight is urgent, minutes matter. Most delays on urgent jobs come from missing information at the booking stage. This checklist helps you get a vehicle moving quickly.",
    sections: [
      {
        heading: "The essentials",
        paragraphs: ["Before you call or submit a quote request, have these details ready:"],
        list: [
          "Full collection and delivery addresses, including postcodes",
          "Contact names and phone numbers at both ends",
          "Weight, number of pallets and the size of the largest item",
          "Ready time at collection and the latest acceptable delivery time",
          "Whether loading and unloading equipment is available on site",
        ],
      },
      {
        heading: "Details that prevent problems on arrival",
        paragraphs: [
          "Site access restrictions, booking-in requirements at distribution centres and any personal protective equipment rules should be shared in advance. A driver who arrives prepared is loaded and moving faster.",
          "If the goods are hazardous, temperature sensitive or unusually long, mention it early so the right vehicle is assigned the first time.",
        ],
      },
      {
        heading: "Keeping everyone informed",
        paragraphs: [
          "Urgent jobs usually involve several people waiting on the outcome. Agree who receives updates, and ask for confirmation at collection and proof of delivery on completion so you can close the job quickly.",
        ],
      },
    ],
  },
  {
    slug: "choosing-the-right-vehicle",
    title: "Van, Luton or Rigid? Choosing the Right Vehicle for Dedicated Transport",
    description:
      "A simple guide to UK dedicated transport vehicle sizes, from small vans to articulated lorries, and how to choose the right one for your load.",
    keyword: "Dedicated Transport Services",
    date: "2026-10-06",
    readMins: 5,
    image: "/images/truck-flatbed.jpg",
    imageAlt: "Flatbed vehicle suitable for long and fabricated loads",
    intro:
      "Booking a vehicle that is too small causes failed collections. Booking one that is too large wastes money. Here is how to choose the right vehicle for dedicated transport.",
    sections: [
      {
        heading: "Start with three numbers",
        paragraphs: [
          "Total weight, number of pallets, and the length of the longest item. These three figures decide the vehicle in almost every case.",
        ],
      },
      {
        heading: "Indicative UK vehicle sizes",
        paragraphs: ["Capacities vary by make and model, but as a guide:"],
        list: [
          "Small van: up to around 600 kg and one pallet",
          "SWB and MWB vans: up to around 1,000 to 1,100 kg and two pallets",
          "LWB van: up to around 1,200 kg, three pallets and items up to 4 metres",
          "Luton with tail lift: four pallets, ideal where there is no forklift",
          "7.5 tonne rigid: around 2,500 kg payload and 8 to 10 pallets",
          "18 tonne rigid: around 8,000 kg payload and 14 to 16 pallets",
          "Articulated lorry: full loads of up to 26 pallets",
        ],
      },
      {
        heading: "Loading equipment matters",
        paragraphs: [
          "If there is no forklift at collection or delivery, a tail lift vehicle is usually required for palletised freight. Long fabricated items may need a flatbed or curtain-sided vehicle for side loading.",
          "Our quote form suggests a vehicle based on your weight and pallet count, and every booking is checked before it is confirmed.",
        ],
      },
    ],
  },
  {
    slug: "transport-cost-review",
    title: "Five Signs Your Business Is Overpaying for Transport",
    description:
      "Common reasons UK businesses overpay for freight and courier transport, and how a structured transport cost review finds the savings.",
    keyword: "Transport Consultancy",
    date: "2026-09-29",
    readMins: 4,
    image: "/images/truck-tipper.jpg",
    imageAlt: "Commercial vehicle representing business transport costs",
    intro:
      "Transport spend tends to grow quietly. Rates drift, urgent jobs become routine, and vehicles are booked out of habit. These are the signs a review is overdue.",
    sections: [
      {
        heading: "The warning signs",
        paragraphs: ["If any of the following sound familiar, there is likely money to recover:"],
        list: [
          "Urgent same day jobs are booked every week rather than occasionally",
          "Vehicles are regularly booked larger than the load requires",
          "Rates have not been compared or renegotiated in over a year",
          "Several carriers are used with no clear view of total spend",
          "Failed collections and waiting time charges appear on invoices",
        ],
      },
      {
        heading: "What a transport cost review covers",
        paragraphs: [
          "A review looks at what you move, how often, on which vehicles and at what price. It identifies patterns, such as recurring urgent jobs that could be planned, and quantifies the cost of each.",
          "The output should be practical: a short written summary of where money is being lost and which changes deliver the biggest result first.",
        ],
      },
      {
        heading: "Getting started",
        paragraphs: [
          "Core Cargo Solutions offers transport consultancy alongside its dedicated transport services. Request a review through the contact page and share a recent sample of invoices to begin.",
        ],
      },
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}
