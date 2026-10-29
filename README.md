# Core Cargo Solutions Ltd: Website

Conversion-focused website for **Core Cargo Solutions Ltd**, a Manchester-based transport company offering urgent, same day and next day dedicated transport across the UK, plus transport consultancy.

## Pages
- `/` Home: hero with 2 CTAs, metrics, services, interactive vehicle range, process, sectors, FAQ, quote form
- `/services`: all 4 services, vehicle range, dedicated vs network comparison
- `/about`: story, Strategy / Optimise / Deliver, values
- `/contact`: quote form, contact details, map (`?service=consultancy` preselects consultancy)
- `/blog` + `/blog/[slug]`: 4 SEO articles

## Stack
Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · Nodemailer

## Getting started
```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Configuration
- Business details, services, vehicles, FAQs: `src/lib/site.ts`
- Blog articles: `src/lib/posts.ts`
- Form email: copy `.env.example` to `.env.local` and set the SMTP values. Without them, leads are logged to the server console.

## Open items
- Add the 24/7 phone number to `site.phone` in `src/lib/site.ts`
- Replace the US truck photos in `public/images/` with UK fleet photos (same file names)
- Set SMTP env vars on the host so quote requests are emailed
