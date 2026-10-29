"use client";

import { useMemo, useState } from "react";
import { services, suggestVehicle, vehicles } from "@/lib/site";
import { IconArrow, IconCheck, IconTruck } from "./icons";

type Data = {
  service: string;
  from: string;
  to: string;
  date: string;
  weight: string;
  pallets: string;
  longest: string;
  vehicle: string;
  goods: string;
  spend: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  notes: string;
  website: string; // honeypot, must stay empty
};

const empty: Data = {
  service: "same-day", from: "", to: "", date: "", weight: "", pallets: "", longest: "",
  vehicle: "", goods: "", spend: "", name: "", company: "", email: "", phone: "", notes: "", website: "",
};

const steps = ["Route", "Load", "Contact"];

const field =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-steel/60 focus:border-azure focus:ring-4 focus:ring-azure/15";
const label = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-steel";

/**
 * Three step quote request. Step 2 suggests a vehicle from weight and pallet count,
 * which removes most of the back-and-forth from manual quoting.
 * Consultancy enquiries swap the load step for a short spend question.
 */
export default function QuoteForm({ defaultService = "same-day", title = "Request a quote" }: { defaultService?: string; title?: string }) {
  const [data, setData] = useState<Data>({ ...empty, service: defaultService });
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  const set = (k: keyof Data) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setData((d) => ({ ...d, [k]: e.target.value }));

  const isConsultancy = data.service === "consultancy";

  // Live vehicle suggestion based on the load details entered so far
  const suggestion = useMemo(() => {
    const kg = Number(data.weight) || 0;
    const p = Number(data.pallets) || 0;
    return kg || p ? suggestVehicle(kg, p) : null;
  }, [data.weight, data.pallets]);

  // Minimal per-step validation so users cannot skip required fields
  function stepError(): string {
    if (step === 0 && !isConsultancy && (!data.from.trim() || !data.to.trim())) return "Please enter collection and delivery postcodes.";
    if (step === 2) {
      if (!data.name.trim()) return "Please enter your name.";
      if (!/^\S+@\S+\.\S+$/.test(data.email)) return "Please enter a valid email address.";
    }
    return "";
  }

  function next() {
    const err = stepError();
    setError(err);
    if (!err) setStep((s) => Math.min(s + 1, steps.length - 1));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const err = stepError();
    setError(err);
    if (err) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, vehicle: data.vehicle || suggestion?.name || "" }),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again or email us directly.");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-3xl border border-line bg-white p-8 text-center shadow-2xl shadow-ink/10 sm:p-10">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-gradient text-white">
          <IconCheck className="h-8 w-8" />
        </div>
        <h3 className="mt-6 text-2xl font-bold">Request received</h3>
        <p className="mt-3 text-steel">Thank you, {data.name.split(" ")[0]}. Our operations team will confirm your price and collection time shortly.</p>
        <button type="button" onClick={() => { setData({ ...empty, service: defaultService }); setStep(0); setStatus("idle"); }} className="mt-6 text-sm font-semibold text-azure hover:underline">
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="rounded-3xl border border-line bg-white p-6 shadow-2xl shadow-ink/10 sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-xl font-bold text-ink">{title}</h3>
        <span className="text-xs font-semibold text-steel">Step {step + 1} of {steps.length}</span>
      </div>

      {/* Progress */}
      <div className="mt-5 grid grid-cols-3 gap-2">
        {steps.map((s, i) => (
          <div key={s}>
            <div className={`h-1.5 rounded-full transition-all duration-500 ${i <= step ? "bg-brand-gradient" : "bg-mist"}`} />
            <p className={`mt-2 text-xs font-semibold ${i <= step ? "text-brand" : "text-steel/70"}`}>{s}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 min-h-[17rem]">
        {step === 0 && (
          <div className="grid gap-4">
            <div>
              <label className={label} htmlFor="q-service">Service</label>
              <select id="q-service" className={field} value={data.service} onChange={set("service")}>
                {services.map((s) => <option key={s.id} value={s.id}>{s.title}</option>)}
              </select>
            </div>
            {!isConsultancy && (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={label} htmlFor="q-from">Collection postcode</label>
                    <input id="q-from" className={field} placeholder="e.g. M2 3WQ" value={data.from} onChange={set("from")} autoComplete="postal-code" />
                  </div>
                  <div>
                    <label className={label} htmlFor="q-to">Delivery postcode</label>
                    <input id="q-to" className={field} placeholder="e.g. B1 1AA" value={data.to} onChange={set("to")} />
                  </div>
                </div>
                <div>
                  <label className={label} htmlFor="q-date">Ready for collection</label>
                  <input id="q-date" type="datetime-local" className={field} value={data.date} onChange={set("date")} />
                </div>
              </>
            )}
            {isConsultancy && (
              <p className="rounded-xl bg-mist p-4 text-sm leading-relaxed text-steel">
                Tell us a little about your current transport and we will arrange a short call to scope the review.
              </p>
            )}
          </div>
        )}

        {step === 1 && !isConsultancy && (
          <div className="grid gap-4">
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className={label} htmlFor="q-weight">Weight (kg)</label>
                <input id="q-weight" inputMode="numeric" className={field} placeholder="450" value={data.weight} onChange={set("weight")} />
              </div>
              <div>
                <label className={label} htmlFor="q-pallets">Pallets</label>
                <input id="q-pallets" inputMode="numeric" className={field} placeholder="2" value={data.pallets} onChange={set("pallets")} />
              </div>
              <div>
                <label className={label} htmlFor="q-longest">Longest (m)</label>
                <input id="q-longest" inputMode="decimal" className={field} placeholder="1.2" value={data.longest} onChange={set("longest")} />
              </div>
            </div>

            {/* Live vehicle suggestion */}
            <div className={`flex items-center gap-4 rounded-2xl border p-4 transition-all ${suggestion ? "border-azure/30 bg-azure/5" : "border-dashed border-line"}`}>
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-gradient text-white"><IconTruck className="h-5 w-5" /></div>
              <div className="text-sm">
                {suggestion ? (
                  <>
                    <p className="font-semibold text-ink">Suggested: {suggestion.name}</p>
                    <p className="text-steel">{suggestion.payload} · {suggestion.pallets}</p>
                  </>
                ) : (
                  <p className="text-steel">Enter weight and pallets to see the right vehicle.</p>
                )}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={label} htmlFor="q-vehicle">Vehicle (optional)</label>
                <select id="q-vehicle" className={field} value={data.vehicle} onChange={set("vehicle")}>
                  <option value="">Use suggestion</option>
                  {vehicles.map((v) => <option key={v.id} value={v.name}>{v.name}</option>)}
                </select>
              </div>
              <div>
                <label className={label} htmlFor="q-goods">Goods</label>
                <input id="q-goods" className={field} placeholder="e.g. machine parts" value={data.goods} onChange={set("goods")} />
              </div>
            </div>
          </div>
        )}

        {step === 1 && isConsultancy && (
          <div className="grid gap-4">
            <div>
              <label className={label} htmlFor="q-spend">Approximate monthly transport spend</label>
              <select id="q-spend" className={field} value={data.spend} onChange={set("spend")}>
                <option value="">Select a range</option>
                <option>Under £2,000</option>
                <option>£2,000 to £10,000</option>
                <option>£10,000 to £50,000</option>
                <option>Over £50,000</option>
              </select>
            </div>
            <div>
              <label className={label} htmlFor="q-notes-c">What would you like reviewed?</label>
              <textarea id="q-notes-c" rows={5} className={field} placeholder="Carriers, rates, urgent jobs, vehicle choices..." value={data.notes} onChange={set("notes")} />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={label} htmlFor="q-name">Full name</label>
                <input id="q-name" className={field} value={data.name} onChange={set("name")} autoComplete="name" />
              </div>
              <div>
                <label className={label} htmlFor="q-company">Company</label>
                <input id="q-company" className={field} value={data.company} onChange={set("company")} autoComplete="organization" />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={label} htmlFor="q-email">Email</label>
                <input id="q-email" type="email" className={field} value={data.email} onChange={set("email")} autoComplete="email" />
              </div>
              <div>
                <label className={label} htmlFor="q-phone">Phone</label>
                <input id="q-phone" type="tel" className={field} value={data.phone} onChange={set("phone")} autoComplete="tel" />
              </div>
            </div>
            {!isConsultancy && (
              <div>
                <label className={label} htmlFor="q-notes">Anything else? (optional)</label>
                <textarea id="q-notes" rows={2} className={field} placeholder="Access, tail lift, booking-in times..." value={data.notes} onChange={set("notes")} />
              </div>
            )}
            {/* Honeypot: hidden from people, filled in by bots */}
            <input type="text" tabIndex={-1} autoComplete="off" className="hidden" value={data.website} onChange={set("website")} aria-hidden="true" />
          </div>
        )}
      </div>

      {error && <p className="mt-4 text-sm font-medium text-red-600" role="alert">{error}</p>}

      <div className="mt-6 flex items-center justify-between gap-3">
        {step > 0 ? (
          <button type="button" onClick={() => { setError(""); setStep((s) => s - 1); }} className="rounded-full px-5 py-3 text-sm font-semibold text-steel hover:text-ink">
            Back
          </button>
        ) : <span />}
        {step < steps.length - 1 ? (
          <button type="button" onClick={next} className="group inline-flex items-center gap-2 rounded-full bg-brand-gradient px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:-translate-y-0.5">
            Continue <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        ) : (
          <button type="submit" disabled={status === "sending"} className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:-translate-y-0.5 disabled:opacity-60">
            {status === "sending" ? "Sending..." : isConsultancy ? "Request a review" : "Get my quote"}
          </button>
        )}
      </div>
      <p className="mt-4 text-center text-xs text-steel">No obligation. We confirm price and collection time before you book.</p>
    </form>
  );
}
