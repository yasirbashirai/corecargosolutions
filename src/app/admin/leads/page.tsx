import type { Metadata } from "next";
import { cookies } from "next/headers";
import { readLeads, tokenMatches } from "@/lib/leads";
import { changeLead, logout } from "./actions";
import LoginForm from "./LoginForm";

export const metadata: Metadata = { title: "Leads", robots: { index: false, follow: false } };

const btn = "rounded-full bg-mist px-4 py-2 text-xs font-bold text-brand transition hover:bg-line";

export default async function LeadsPage() {
  const signedIn = tokenMatches((await cookies()).get("cc_admin")?.value);
  const configured = !!process.env.ADMIN_PASSWORD;

  if (!signedIn) {
    return (
      <main className="mx-auto max-w-3xl px-5 py-24">
        <h1 className="text-center text-3xl font-extrabold text-ink">Leads</h1>
        {configured ? (
          <LoginForm />
        ) : (
          <p className="mt-6 text-center text-steel">Set ADMIN_PASSWORD in the environment to turn on this page.</p>
        )}
      </main>
    );
  }

  const leads = await readLeads();
  const fresh = leads.filter((l) => l.status === "new").length;

  return (
    <main className="mx-auto max-w-4xl px-5 py-16">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-extrabold text-ink">Leads <span className="text-base font-semibold text-steel">({fresh} new, {leads.length} total)</span></h1>
        <form action={logout}><button className={btn}>Sign out</button></form>
      </div>

      {leads.length === 0 && <p className="mt-10 text-steel">No enquiries yet. They appear here as soon as someone submits the form.</p>}

      <ul className="mt-8 grid gap-4">
        {leads.map((l) => (
          <li key={l.id} className={`rounded-2xl border p-5 ${l.status === "new" ? "border-azure/40 bg-white shadow-md" : "border-line bg-mist/40"}`}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-display text-lg font-extrabold text-ink">{l.subject}</p>
                <p className="text-xs text-steel">{new Date(l.at).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short", timeZone: "Europe/London" })}</p>
              </div>
              <form action={changeLead} className="flex gap-2">
                <input type="hidden" name="id" value={l.id} />
                <button name="change" value={l.status === "new" ? "done" : "new"} className={btn}>{l.status === "new" ? "Mark done" : "Reopen"}</button>
                <button name="change" value="delete" className={`${btn} text-red-600`}>Delete</button>
              </form>
            </div>
            <dl className="mt-4 grid gap-x-6 gap-y-1.5 text-sm sm:grid-cols-[auto_1fr]">
              {l.fields.map(([label, value]) => (
                <div key={label} className="contents">
                  <dt className="font-semibold text-steel">{label}</dt>
                  <dd className="break-words text-ink">
                    {label === "Email" ? <a className="text-brand underline" href={`mailto:${value}`}>{value}</a>
                      : label === "Phone" ? <a className="text-brand underline" href={`tel:${value.replace(/[^+\d]/g, "")}`}>{value}</a>
                      : value}
                  </dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
    </main>
  );
}
