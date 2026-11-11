"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { quoteServices, site, suggestVehicle } from "@/lib/site";
import { IconArrow, IconBolt, IconCalendar, IconChart, IconCheck, IconClock, IconPlane } from "./icons";

type Data = {
  service: string;
  from: string;
  to: string;
  ready: "asap" | "time";
  date: string;
  goods: string;
  weight: string;
  pallets: string;
  longest: string;
  tailLift: boolean;
  name: string;
  company: string;
  email: string;
  phone: string;
  website: string; // honeypot, must stay empty
};

const empty: Data = {
  service: "same-day", from: "", to: "", ready: "asap", date: "", goods: "", weight: "", pallets: "", longest: "",
  tailLift: false, name: "", company: "", email: "", phone: "", website: "",
};

type Errors = Partial<Record<keyof Data, string>>;

const serviceIcons: Record<string, (p: { className?: string }) => React.ReactNode> = {
  "same-day": IconClock,
  urgent: IconBolt,
  "next-day": IconCalendar,
  airport: IconPlane,
  consultancy: IconChart,
};

const field =
  "w-full rounded-xl border border-line bg-mist/40 px-4 py-3 text-base text-ink outline-none transition placeholder:text-steel/60 focus:border-azure focus:bg-white focus:ring-4 focus:ring-azure/15";
const bad = "border-red-400 focus:border-red-500 focus:ring-red-500/15";
const label = "mb-1.5 block text-[11px] font-bold uppercase tracking-[0.12em] text-steel";
const chip = "inline-flex rounded-full bg-mist px-3 py-1.5 text-xs font-semibold text-brand";

const POSTCODE = /^[A-Z]{1,2}\d[A-Z\d]? \d[A-Z]{2}$/;

// Tidy a UK postcode as it is typed: m23wq becomes M2 3WQ
function tidyPostcode(value: string) {
  const s = value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 7);
  return s.length >= 5 && /\d[A-Z]{2}$/.test(s) ? `${s.slice(0, -3)} ${s.slice(-3)}` : s;
}

const num = (v: string) => Number(v.replace(",", "."));
const badNumber = (v: string) => v.trim() !== "" && !(num(v) > 0);

/** Reads ?service=urgent from the address bar so links can open the form with a service selected. */
function ServiceFromUrl({ onService }: { onService: (id: string) => void }) {
  const wanted = useSearchParams().get("service");
  useEffect(() => {
    if (wanted && quoteServices.some((s) => s.id === wanted)) onService(wanted);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wanted]);
  return null;
}

function FieldError({ id, text }: { id: string; text?: string }) {
  return text ? <p id={id} className="mt-1.5 text-xs font-medium text-red-600" role="alert">{text}</p> : null;
}

/**
 * Three step quote request: Route, Load, Contact.
 * Step 2 suggests a vehicle from the weight, pallets and longest item.
 * Transport consultancy skips the Load step, so it is two steps: Service, Contact.
 */
export default function QuoteForm({ defaultService = "same-day", title = "Request a quote" }: { defaultService?: string; title?: string }) {
  const [data, setData] = useState<Data>({ ...empty, service: defaultService });
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const isConsultancy = data.service === "consultancy";
  const steps = isConsultancy ? ["Service", "Contact"] : ["Route", "Load", "Contact"];
  const current = steps[Math.min(step, steps.length - 1)];
  const isLast = step >= steps.length - 1;

  const update = <K extends keyof Data>(k: K, v: Data[K]) => {
    setData((d) => ({ ...d, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  // Live vehicle suggestion based on the load details entered so far
  const kg = num(data.weight) > 0 ? num(data.weight) : 0;
  const pallets = num(data.pallets) > 0 ? num(data.pallets) : 0;
  const longest = num(data.longest) > 0 ? num(data.longest) : 0;
  const suggestion = useMemo(
    () => (kg || pallets || longest ? suggestVehicle(kg, pallets, longest, data.tailLift) : null),
    [kg, pallets, longest, data.tailLift]
  );
  const used = suggestion && kg ? Math.min(100, Math.round((kg / suggestion.maxKg) * 100)) : 0;

  const serviceLabel = quoteServices.find((s) => s.id === data.service)?.label ?? "";
  const readyLabel = data.ready === "asap" ? "As soon as possible" : data.date ? new Date(data.date).toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) : "";
  const summary = isConsultancy
    ? [serviceLabel]
    : [serviceLabel, data.from && data.to ? `${data.from} to ${data.to}` : "", readyLabel, suggestion?.name ?? ""].filter(Boolean);

  function validate(): Errors {
    const e: Errors = {};
    if (current === "Route") {
      if (!POSTCODE.test(data.from)) e.from = "Enter a UK postcode, for example M2 3WQ";
      if (!POSTCODE.test(data.to)) e.to = "Enter a UK postcode, for example M2 3WQ";
      if (data.ready === "time" && !data.date) e.date = "Choose a date and time";
    }
    if (current === "Load") {
      if (badNumber(data.weight)) e.weight = "Enter a number above zero";
      if (badNumber(data.pallets)) e.pallets = "Enter a number above zero";
      if (badNumber(data.longest)) e.longest = "Enter a number above zero";
    }
    if (current === "Contact") {
      if (!data.name.trim()) e.name = "Enter your name";
      if (!/^\S+@\S+\.\S+$/.test(data.email.trim())) e.email = "Enter an email we can reply to";
      if (data.phone.replace(/\D/g, "").length < 10) e.phone = "Enter a phone number, including the area code";
    }
    return e;
  }

  function next() {
    const e = validate();
    setErrors(e);
    if (!Object.keys(e).length) setStep((s) => s + 1);
  }

  async function submit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!isLast) return next();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          service: serviceLabel,
          ready: isConsultancy ? "" : readyLabel,
          tailLift: data.tailLift ? "Yes" : "",
          vehicle: isConsultancy ? "" : suggestion?.name ?? "",
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  function restart() {
    setData({ ...empty, service: defaultService });
    setStep(0);
    setErrors({});
    setStatus("idle");
  }

  if (status === "sent") {
    return (
      <div className="rounded-[1.75rem] border border-line bg-white px-6 py-12 text-center shadow-2xl shadow-brand/15 sm:px-10" role="status">
        <div className="mx-auto flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          <IconCheck className="h-8 w-8 stroke-[2.6]" />
        </div>
        <h3 className="mt-6 text-2xl font-extrabold text-ink">Thanks {data.name.trim().split(/\s+/)[0]}, we’ve got it.</h3>
        <p className="mx-auto mt-3 max-w-sm leading-relaxed text-steel">
          We’ll come back to you within 10 minutes with a price and a collection time. Nothing is booked until you say yes.
        </p>
        <ul className="mt-6 flex flex-wrap justify-center gap-2">
          {summary.map((s) => <li key={s} className={chip}>{s}</li>)}
        </ul>
        <button type="button" onClick={restart} className="mt-7 rounded-full bg-mist px-6 py-3 text-sm font-bold text-brand transition hover:bg-line">
          Start another quote
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="rounded-[1.75rem] border border-line bg-white p-6 shadow-2xl shadow-brand/15 sm:p-8">
      <Suspense fallback={null}>
        <ServiceFromUrl onService={(id) => { update("service", id); setStep(0); }} />
      </Suspense>

      <div className="flex items-center justify-between gap-4">
        <h3 className="text-xl font-extrabold text-ink">{title}</h3>
        <span className="text-sm font-semibold text-steel">Step {Math.min(step, steps.length - 1) + 1} of {steps.length}</span>
      </div>

      {/* Progress */}
      <div className="mt-4 grid gap-2" style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}>
        {steps.map((s, i) => (
          <div key={s}>
            <div className={`h-1.5 rounded-full transition-all duration-500 ${i <= step ? "bg-brand-gradient" : "bg-mist"}`} />
            <p className={`mt-2 text-xs font-semibold ${i === step ? "text-brand" : i < step ? "text-ink" : "text-steel/70"}`}>{s}</p>
          </div>
        ))}
      </div>

      <div className="mt-5">
        {/* Step 1: Route (or Service, for consultancy) */}
        {step === 0 && (
          <div className="grid gap-5">
            <fieldset>
              <legend className={label}>What do you need?</legend>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {quoteServices.map((s) => {
                  const Icon = serviceIcons[s.id];
                  const active = data.service === s.id;
                  return (
                    <label
                      key={s.id}
                      className={`flex cursor-pointer items-center gap-3.5 rounded-2xl border px-4 py-3 transition has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-azure/20 ${s.id === "consultancy" ? "sm:col-span-2" : ""} ${active ? "border-brand bg-mist shadow-md shadow-brand/10" : "border-line bg-mist/40 hover:border-azure/40"}`}
                    >
                      <input type="radio" name="service" value={s.id} checked={active} onChange={() => update("service", s.id)} className="sr-only" />
                      <Icon className="h-5 w-5 shrink-0 text-brand" />
                      <span>
                        <span className="block font-display text-sm font-bold text-ink">{s.label}</span>
                        <span className="block text-xs text-steel">{s.note}</span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            {!isConsultancy && (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={label} htmlFor="q-from">Collection postcode</label>
                    <input id="q-from" className={`${field} ${errors.from ? bad : ""}`} placeholder="e.g. M2 3WQ" value={data.from} onChange={(e) => update("from", tidyPostcode(e.target.value))} autoComplete="postal-code" autoCapitalize="characters" aria-invalid={!!errors.from} aria-describedby="q-from-err" />
                    <FieldError id="q-from-err" text={errors.from} />
                  </div>
                  <div>
                    <label className={label} htmlFor="q-to">Delivery postcode</label>
                    <input id="q-to" className={`${field} ${errors.to ? bad : ""}`} placeholder="e.g. B1 1AA" value={data.to} onChange={(e) => update("to", tidyPostcode(e.target.value))} autoComplete="off" autoCapitalize="characters" aria-invalid={!!errors.to} aria-describedby="q-to-err" />
                    <FieldError id="q-to-err" text={errors.to} />
                  </div>
                </div>

                <fieldset>
                  <legend className={label}>Ready for collection</legend>
                  <div className="grid grid-cols-2 gap-1 rounded-2xl bg-mist p-1">
                    {([["asap", "As soon as possible"], ["time", "Pick a time"]] as const).map(([id, text]) => (
                      <label key={id} className={`cursor-pointer rounded-xl px-3 py-2.5 text-center text-sm font-semibold transition has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-azure/20 ${data.ready === id ? "bg-white text-brand shadow" : "text-steel hover:text-ink"}`}>
                        <input type="radio" name="ready" value={id} checked={data.ready === id} onChange={() => update("ready", id)} className="sr-only" />
                        {text}
                      </label>
                    ))}
                  </div>
                  {data.ready === "time" && (
                    <div className="mt-3">
                      <label className="sr-only" htmlFor="q-date">Collection date and time</label>
                      <input id="q-date" type="datetime-local" className={`${field} ${errors.date ? bad : ""}`} value={data.date} onChange={(e) => update("date", e.target.value)} aria-invalid={!!errors.date} aria-describedby="q-date-err" />
                      <FieldError id="q-date-err" text={errors.date} />
                    </div>
                  )}
                </fieldset>
              </>
            )}
          </div>
        )}

        {/* Step 2: Load, with the live vehicle suggestion */}
        {current === "Load" && (
          <div className="grid gap-4">
            <div>
              <label className={label} htmlFor="q-goods">What are you moving?</label>
              <textarea id="q-goods" rows={2} className={field} placeholder={data.service === "airport" ? "e.g. Two pallets at Manchester Airport cargo terminal" : "e.g. Two pallets of machine parts"} value={data.goods} onChange={(e) => update("goods", e.target.value)} />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {([["weight", "Weight (kg)", "numeric"], ["pallets", "Pallets", "numeric"], ["longest", "Longest (m)", "decimal"]] as const).map(([k, text, mode]) => (
                <div key={k}>
                  <label className={label} htmlFor={`q-${k}`}>{text}</label>
                  <input id={`q-${k}`} inputMode={mode} className={`${field} ${errors[k] ? bad : ""}`} value={data[k]} onChange={(e) => update(k, e.target.value)} aria-invalid={!!errors[k]} aria-describedby={`q-${k}-err`} />
                  <FieldError id={`q-${k}-err`} text={errors[k]} />
                </div>
              ))}
            </div>
            <label className="flex cursor-pointer items-start gap-3 text-sm text-ink">
              <input type="checkbox" checked={data.tailLift} onChange={(e) => update("tailLift", e.target.checked)} className="mt-0.5 h-5 w-5 shrink-0 rounded border-line accent-[#03438f]" />
              It needs a tail lift, or there’s no forklift at either end
            </label>

            <div className={`rounded-2xl border p-4 transition-all sm:p-5 ${suggestion ? "border-azure/25 bg-mist/70" : "border-dashed border-line"}`} aria-live="polite">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-azure">Suggested vehicle</p>
              {suggestion ? (
                <>
                  <p className="mt-1 font-display text-xl font-extrabold text-brand">{suggestion.name}</p>
                  <p className="text-sm text-steel">{suggestion.bestFor}</p>
                  <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink">
                    <span>Up to <strong>{suggestion.maxLength} m</strong></span>
                    <span><strong>{suggestion.maxKg.toLocaleString("en-GB")} kg</strong> payload</span>
                    <span><strong>{suggestion.maxPallets}</strong> {suggestion.maxPallets === 1 ? "pallet" : "pallets"}</span>
                  </p>
                  {kg > 0 && (
                    <>
                      <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-line">
                        <div className="h-full rounded-full bg-brand-gradient transition-all duration-500" style={{ width: `${used}%` }} />
                      </div>
                      <p className="mt-2 text-xs text-steel">Your load uses about {used}% of the payload</p>
                    </>
                  )}
                </>
              ) : (
                <p className="mt-1 text-sm text-steel">Add a weight, pallets or length and we’ll suggest one.</p>
              )}
            </div>
            <p className="-mt-1 text-xs text-steel">Not sure of the figures? Leave them blank and we’ll size it for you.</p>
          </div>
        )}

        {/* Step 3: Contact */}
        {step > 0 && current === "Contact" && (
          <div className="grid gap-4">
            <ul className="flex flex-wrap gap-2">
              {summary.map((s) => <li key={s} className={chip}>{s}</li>)}
            </ul>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={label} htmlFor="q-name">Your name</label>
                <input id="q-name" className={`${field} ${errors.name ? bad : ""}`} value={data.name} onChange={(e) => update("name", e.target.value)} autoComplete="name" aria-invalid={!!errors.name} aria-describedby="q-name-err" />
                <FieldError id="q-name-err" text={errors.name} />
              </div>
              <div>
                <label className={label} htmlFor="q-company">Company <span className="font-medium normal-case tracking-normal">(optional)</span></label>
                <input id="q-company" className={field} value={data.company} onChange={(e) => update("company", e.target.value)} autoComplete="organization" />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={label} htmlFor="q-email">Email</label>
                <input id="q-email" type="email" className={`${field} ${errors.email ? bad : ""}`} value={data.email} onChange={(e) => update("email", e.target.value)} autoComplete="email" aria-invalid={!!errors.email} aria-describedby="q-email-err" />
                <FieldError id="q-email-err" text={errors.email} />
              </div>
              <div>
                <label className={label} htmlFor="q-phone">Phone</label>
                <input id="q-phone" type="tel" className={`${field} ${errors.phone ? bad : ""}`} value={data.phone} onChange={(e) => update("phone", e.target.value)} autoComplete="tel" aria-invalid={!!errors.phone} aria-describedby="q-phone-err" />
                <FieldError id="q-phone-err" text={errors.phone} />
              </div>
            </div>
            <p className="text-xs text-steel">
              We only use your details to reply to this request. <Link href="/privacy" className="font-semibold text-brand underline underline-offset-2">Privacy policy</Link>
            </p>
            {/* Honeypot: hidden from people, filled in by bots */}
            <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" value={data.website} onChange={(e) => update("website", e.target.value)} aria-hidden="true" />
          </div>
        )}
      </div>

      {status === "error" && (
        <p className="mt-4 text-sm font-medium text-red-600" role="alert">
          Sorry, that didn’t send. Please try again, or email <a href={`mailto:${site.email}`} className="underline">{site.email}</a>.
        </p>
      )}

      <div className="mt-6 flex items-center justify-between gap-3">
        {step > 0 ? (
          <button type="button" onClick={() => { setErrors({}); setStep((s) => s - 1); }} className="rounded-full px-2 py-3 text-sm font-bold text-steel hover:text-ink">
            Back
          </button>
        ) : <span />}
        <button type="submit" disabled={status === "sending"} className="group inline-flex items-center gap-2 rounded-full bg-brand-gradient px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand/30 transition hover:-translate-y-0.5 disabled:opacity-60">
          {status === "sending" ? "Sending..." : isLast ? "Get my quote" : "Continue"}
          <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
      <p className="mt-4 text-center text-xs text-steel sm:text-right">No obligation. We confirm price and collection time before you book.</p>
    </form>
  );
}
