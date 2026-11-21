import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { saveLead } from "@/lib/leads";

// Fields we accept from the quote form, with their labels for the email
const FIELDS: Record<string, string> = {
  service: "Service", from: "Collection postcode", to: "Delivery postcode", ready: "Ready for collection",
  goods: "What they are moving", weight: "Weight (kg)", pallets: "Pallets", longest: "Longest item (m)",
  tailLift: "Tail lift needed / no forklift", vehicle: "Suggested vehicle",
  name: "Name", company: "Company", email: "Email", phone: "Phone",
};

const clean = (v: unknown) => String(v ?? "").replace(/[<>]/g, "").trim().slice(0, 2000);
// Keeps submitted values off the email header lines
const oneLine = (v: string) => v.replace(/[\r\n]+/g, " ").trim();

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Honeypot filled in: pretend success so bots move on
  if (clean(body.website)) return NextResponse.json({ ok: true });

  const lead = Object.fromEntries(Object.keys(FIELDS).map((k) => [k, clean(body[k])]));
  if (!lead.name || !/^\S+@\S+\.\S+$/.test(lead.email)) {
    return NextResponse.json({ error: "Name and a valid email are required" }, { status: 422 });
  }

  const lines = Object.entries(FIELDS)
    .filter(([k]) => lead[k])
    .map(([k, label]) => `${label}: ${lead[k]}`);
  const head = oneLine(`${lead.from || lead.company || lead.name}${lead.to ? ` to ${lead.to}` : ""}`);
  const subject = oneLine(`New ${lead.service === "Transport consultancy" ? "consultancy enquiry" : "quote request"}: ${head}`);

  let saved = true;
  try {
    await saveLead(subject, Object.entries(FIELDS).filter(([k]) => lead[k]).map(([k, label]) => [label, lead[k]]));
  } catch (err) {
    saved = false;
    console.error("[quote] could not save lead", err);
  }

  const { RESEND_API_KEY, RESEND_FROM, SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, LEADS_TO } = process.env;
  const to = LEADS_TO || "operations@corecargo.co.uk";

  let emailed = false;
  try {
    if (RESEND_API_KEY) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: RESEND_FROM || "Core Cargo Website <onboarding@resend.dev>",
          to: to.split(",").map((a) => a.trim()),
          reply_to: lead.email,
          subject,
          text: lines.join("\n"),
        }),
      });
      if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
      emailed = true;
    } else if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT) || 587,
        secure: Number(SMTP_PORT) === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
      });
      await transporter.sendMail({
        from: `"Core Cargo Website" <${SMTP_USER}>`,
        to,
        replyTo: lead.email,
        subject,
        text: lines.join("\n"),
      });
      emailed = true;
    }
  } catch (err) {
    console.error("[quote] email failed", err);
  }

  if (!saved && !emailed) {
    console.error(`[quote] LEAD NOT DELIVERED: ${subject}\n${lines.join("\n")}`);
    return NextResponse.json({ error: "Could not deliver" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
