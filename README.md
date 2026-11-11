# Core Cargo Solutions Ltd: Website

Conversion-focused website for **Core Cargo Solutions Ltd**, a Manchester-based transport company offering urgent, same day and next day dedicated transport across the UK, plus transport consultancy.

## Pages
- `/` Home: hero with countdown and UK map, key stats, services, vehicle range (9 vehicles), how it works, sectors, airport collections, industries, trusted by, why Core Cargo, testimonials (hidden until real quotes are added), quote form, searchable FAQ, final call to action
- `/privacy`: privacy policy (draft)
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
- Add the 24/7 phone number to `site.phone` in `src/lib/site.ts` (a "Call now" button then appears in the final call to action)
- Set SMTP env vars on the host so quote requests are emailed
- Vehicle pictures are the client's own Core Cargo images in `public/images/vehicles/`. The blog, about and sharing banners (`scene-*.jpg`, `og-core-cargo.jpg`) are built from them
- Sector, airport and industry photos in `public/images/` are low-resolution placeholders taken from the design document. Replace with full-size photos (same file names)

## Client to confirm before launch (from the November 2026 wording document)
- "Within 10 minutes" and "Proof of delivery within the hour" promises are true
- MWB Van figures (estimates)
- Airport names, industries list and customer names in `src/lib/site.ts` (only name customers who have agreed, and use their official logos)
- The four new FAQ answers (cost, proof of delivery, airport collection, how to book)
- `/privacy` is a plain-English draft and needs the client's review
- Testimonials: the section is built but hidden. Add at least three real, approved quotes to `testimonials` in `src/lib/site.ts` and it appears on its own
