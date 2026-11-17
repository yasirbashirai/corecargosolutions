import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

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

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, LEADS_TO } = process.env;

  // Without SMTP settings, log the lead so nothing is lost during development.
  // In production a logged lead is a lost customer, so fail loudly instead.
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.log(`[quote] ${subject}\n${lines.join("\n")}`);
    if (process.env.NODE_ENV === "production") {
      console.error("[quote] SMTP is not configured. Set SMTP_HOST, SMTP_USER, SMTP_PASS and LEADS_TO so enquiries are emailed.");
      return NextResponse.json({ error: "Email is not configured" }, { status: 503 });
    }
    return NextResponse.json({ ok: true });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT) || 587,
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
    await transporter.sendMail({
      from: `"Core Cargo Website" <${SMTP_USER}>`,
      to: LEADS_TO || "operations@corecargo.co.uk",
      replyTo: lead.email,
      subject,
      text: lines.join("\n"),
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[quote] email failed", err);
    return NextResponse.json({ error: "Could not send" }, { status: 500 });
  }
}
