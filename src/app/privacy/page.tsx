import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Core Cargo Solutions Ltd uses the details you send through the quote form.",
  alternates: { canonical: "/privacy" },
};

// DRAFT: plain-English starting point. The client should review this (ideally with
// their adviser) and add their ICO registration details before launch.
const sections = [
  {
    h: "Who we are",
    p: [`${site.name} is a transport company based at ${site.address.street}, ${site.address.city} ${site.address.postcode}. We are the data controller for the details you send us through this website. You can reach us at ${site.email}.`],
  },
  {
    h: "What we collect",
    p: [
      "When you ask for a quote we collect your name, company (if you give one), email address and phone number, plus the details of the job: collection and delivery postcodes, when the goods are ready, and what you are moving.",
      "We do not ask for payment details on this website.",
    ],
  },
  {
    h: "How we use it",
    p: [
      "We only use your details to reply to your request: to give you a price and a collection time, and to arrange the job if you go ahead.",
      "We do not sell your details, and we do not add you to a marketing list.",
    ],
  },
  {
    h: "Why we are allowed to use it",
    p: ["We use your details because you asked us for a quote (steps taken at your request before entering into a contract) and because we have a legitimate interest in answering enquiries about our services."],
  },
  {
    h: "Who we share it with",
    p: ["Your request reaches us by email, so it is handled by our email and website hosting providers. If you book a job, the driver gets the details needed to collect and deliver it. We do not share your details with anyone else unless the law requires it."],
  },
  {
    h: "How long we keep it",
    p: ["If you do not book, we delete your enquiry within 12 months. If you do book, we keep the job records for as long as tax and business law requires, normally six years."],
  },
  {
    h: "Your rights",
    p: [
      `You can ask us for a copy of your details, ask us to correct or delete them, or object to how we use them. Email ${site.email} and we will reply within one month.`,
      "If you are not happy with our answer, you can complain to the Information Commissioner’s Office at ico.org.uk.",
    ],
  },
  {
    h: "Cookies",
    p: ["This website does not use advertising or tracking cookies."],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Privacy" title="Privacy policy" intro="What we do with the details you send us, in plain English." />
      <section className="container-x py-16 sm:py-24">
        <div className="mx-auto max-w-3xl space-y-10">
          {sections.map((s) => (
            <div key={s.h}>
              <h2 className="text-2xl font-extrabold text-ink">{s.h}</h2>
              {s.p.map((t) => (
                <p key={t} className="mt-3 leading-relaxed text-steel">{t}</p>
              ))}
            </div>
          ))}
          <p className="border-t border-line pt-6 text-sm text-steel">Last updated: November 2026</p>
        </div>
      </section>
    </>
  );
}
