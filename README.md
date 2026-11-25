# Core Cargo Solutions Ltd: Website

Conversion-focused website for **Core Cargo Solutions Ltd**, a Manchester-based transport company offering urgent, same day and next day dedicated transport across the UK, plus transport consultancy.

## Pages
- `/` Home: photo hero with countdown and UK/Ireland map (18 places), key stats, services, vehicle range (9 vehicles), how it works, four sector cards including airport collections, industries, customer logos, why Core Cargo, testimonials (hidden until real quotes are added), quote form, searchable FAQ (11 questions), final call to action
- `/privacy`: privacy policy (draft)
- `/services`: all 4 services, vehicle range, dedicated vs network comparison
- `/about`: story, Strategy / Optimise / Deliver, values
- `/contact`: quote form, contact details, map (`?service=consultancy` preselects consultancy; `?service=airport#quote` preselects airport collections)
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
- Leads and email: copy `.env.example` to `.env` and set Resend (or SMTP) plus `ADMIN_PASSWORD`. Leads are stored in Upstash Redis when configured, otherwise in `data/leads.json`, and shown at `/admin/leads`. In development a lead without email credentials is logged to the server console; in production the form refuses the submission and tells the visitor to email, so no enquiry is silently lost.
- Canonicals and the sitemap use `NEXT_PUBLIC_SITE_URL`; set it before building for production.

## Deployment
Live on **Vercel** at https://www.corecargo.co.uk, deploying automatically from this GitHub
repository (`main`). The full runbook, required environment variables, Upstash setup and
post-deploy checks are in [`DEPLOY.md`](./DEPLOY.md).

- Node 20.9 or newer (`engines` in `package.json`); Vercel uses its project Node version.
- Build `npm run build`, verify `npm run typecheck`; Vercel runs the build on every push.
- Leads need Upstash Redis in production: Vercel's filesystem is read-only, so the local
  `data/leads.json` fallback only works in development or on a persistent server.
- Security headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, HSTS) are set in `next.config.ts`; `X-Powered-By` is disabled.

## Open items
- Add the 24/7 phone number to `site.phone` in `src/lib/site.ts` (a "Call now" button then appears in the final call to action)
- Set SMTP env vars on the host so quote requests are emailed
- Vehicle pictures are the client's own Core Cargo images in `public/images/vehicles/`. The blog, about and sharing banners (`scene-*.jpg`, `og-core-cargo.jpg`) are built from them
- The Round 2 supplied photos are installed for the hero, Same Day service, three sector cards and Engineering tile. Their prescribed crops and responsive photo bands are implemented.
- The airport photo is retained as requested until its replacement is supplied. The fabricators photo is 612 px wide and the hero is 1535 px wide; replace them with larger originals when available, without enlarging these copies.
- Customer logos and the temporary membership marks were extracted as vector paths from the supplied developer PDF, preserving their artwork and colours; China Cargo uses the supplied PNG. The referenced ZIP was not available. Sealco remains text. Replace reference copies with supplied brand-pack files when available, especially the official Logistics UK and BIFA member logos.

## Round 2 implementation
- Responsive header logo/bar sizes: 56/80, 64/88, 72/96 and 80/104 px; scrolled size 56/80 px.
- Updated hero wording, DAF background, Manchester hub and 18-place UK/Ireland route animation.
- MAN lorry photo in the Same Day card; four equal sector cards with supplied photos, job tags and the airport enquiry link.
- Engineering photo and alt text; customer logo rows with hover/manual pause and a fully visible static layout for reduced motion.
- New trailer/body FAQ in position five, vehicle-range anchor and matching plain-text structured data.
- Logistics UK and BIFA membership block beneath Company and Operations.
- Reduced motion stops the map cursor, timer ring, pulses and logo movement. Closed mobile navigation is excluded from keyboard and screen-reader interaction.

## Client to confirm before launch (from the November 2026 wording document)
- "Within 10 minutes" and "Proof of delivery within the hour" promises are true
- MWB Van figures (estimates)
- Airport names, industries list and customer names in `src/lib/site.ts` (only name customers who have agreed, and use their official logos)
- The four new FAQ answers (cost, proof of delivery, airport collection, how to book)
- `/privacy` is a plain-English draft and needs the client's review
- Testimonials: the section is built but hidden. Add at least three real, approved quotes to `testimonials` in `src/lib/site.ts` and it appears on its own
