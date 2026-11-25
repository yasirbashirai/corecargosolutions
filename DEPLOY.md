# Deploying Core Cargo Solutions on Vercel

The site is already live on Vercel and deploys from GitHub. This file is the runbook for
keeping it that way: what is configured, what is still missing, and how to ship changes.

- **Vercel project:** `yasir-bashirs-projects/corecargosolutions`
- **Production URL:** https://www.corecargo.co.uk
- **Repository:** `git@github.com:yasirbashirai/corecargosolutions.git` (branch `main`)
- **Framework:** Next.js 16 (App Router), auto-detected by Vercel. No `vercel.json` needed.

---

## 1. Current production status (checked November 2026)

| Item | Status |
| --- | --- |
| Latest production deployment | Ready, built from commit `ed28fbd` |
| `/`, `/services`, `/about`, `/contact`, `/blog`, `/privacy` | 200 |
| `/admin/leads` | 200, but page says “Set `ADMIN_PASSWORD`…” |
| `sitemap.xml`, `robots.txt` | 200, using `https://corecargo.co.uk` |
| Security headers | Present |
| Env vars set | `LEADS_TO`, `RESEND_API_KEY` |
| Env vars missing | `ADMIN_PASSWORD`, Upstash Redis keys, optional `RESEND_FROM` |

**Important:** Vercel's filesystem is read-only, so the fallback `data/leads.json` store cannot
work there. Without Upstash Redis, a submitted quote is emailed (when Resend succeeds) but does
not appear at `/admin/leads`. Adding Redis is the fix; the code already supports it.

---

## 2. Required environment variables

Set these in **Vercel → Project → Settings → Environment Variables → Production** (and Preview
if you want previews to work). Redeploy after changing anything.

| Variable | Status | Value |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Recommended | `https://corecargo.co.uk` (already the code fallback, but explicit is safer) |
| `ADMIN_PASSWORD` | **Missing** | long random string: `openssl rand -base64 24` |
| `LEADS_TO` | Set | `operations@corecargo.co.uk` |
| `RESEND_API_KEY` | Set | `re_...` |
| `RESEND_FROM` | Missing (optional) | `Core Cargo <quotes@corecargo.co.uk>` once the domain is verified in Resend |
| `KV_REST_API_URL` | **Missing** | set by the Upstash integration |
| `KV_REST_API_TOKEN` | **Missing** | set by the Upstash integration |
| `SMTP_*` | Optional | only if sending by SMTP instead of Resend |

`NEXT_PUBLIC_*` values are inlined at build time, so changing `NEXT_PUBLIC_SITE_URL` requires a
redeploy, not just a restart.

### Add an env var from the CLI

```bash
printf '%s' 'the-value' | vercel env add ADMIN_PASSWORD production
vercel env ls production
```

---

## 3. Turn on lead storage (Upstash Redis)

The `/admin/leads` inbox needs a database because Vercel cannot write files.

1. Vercel dashboard → **Storage** → **Create Database** → **Upstash Redis** (Marketplace).
2. Pick a region close to the functions (e.g. `eu-west-1` / London), free tier is enough.
3. **Connect** it to the `corecargosolutions` project, environment **Production**.
4. Vercel adds `KV_REST_API_URL` and `KV_REST_API_TOKEN` automatically. Confirm with
   `vercel env ls production`.
5. Redeploy so the running functions pick up the variables.

Any of these names is accepted by the code: `KV_REST_API_URL` / `KV_REST_API_TOKEN` or
`UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN`.

### Verify storage

1. Open https://www.corecargo.co.uk/contact and submit a genuine test enquiry.
2. Sign in at https://www.corecargo.co.uk/admin/leads with `ADMIN_PASSWORD`.
3. The lead should appear as **new**. Delete the test lead afterwards.

If the inbox stays empty, check **Vercel → Logs** for `[quote] could not save lead`.

---

## 4. Normal deploy workflow

Vercel auto-deploys on push:

```bash
git add -A
git commit -m "Describe the change"
git push origin main
```

- Every other branch gets a preview URL; `main` goes to production.
- Manual deploy from the CLI: `vercel --prod` (the project is already linked in `.vercel/`,
  which is gitignored).
- Build settings are the defaults: install `npm install`, build `npm run build`.
  Node version is set in Project Settings (currently 26.x); `package.json` requires `>=20.9.0`.

Before pushing:

```bash
npm run typecheck
npm run build
```

---

## 5. Domain and email

- `www.corecargo.co.uk` is the production domain and is already attached. Confirm the apex
  `corecargo.co.uk` redirects to `www` (Vercel → Domains).
- HTTPS certificates are managed by Vercel.
- Resend: verify `corecargo.co.uk` under Resend → Domains (SPF/DKIM/DMARC), then set
  `RESEND_FROM`. Until then Resend only delivers to the signup address, so keep `LEADS_TO`
  pointed there while testing.
- Email failures are logged as `[quote] email failed` in Vercel Logs; the lead is still saved
  when Redis is configured.

---

## 6. Post-deploy checklist

- [ ] `/`, `/services`, `/about`, `/contact`, `/blog`, `/privacy` return 200
- [ ] All four blog articles open
- [ ] Images load through `next/image`
- [ ] Contact form: success message, email received, lead visible at `/admin/leads`
- [ ] `/admin/leads` rejects a wrong password and accepts `ADMIN_PASSWORD`
- [ ] `sitemap.xml` and `robots.txt` use `https://corecargo.co.uk`
- [ ] Response headers: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`,
      `Permissions-Policy`, `Strict-Transport-Security`
- [ ] Mobile menu, map animation and reduced-motion mode behave on a phone

---

## 7. Rollback and logs

- **Rollback:** Vercel → Deployments → open the last good production build → **Promote to
  Production**. Leads in Upstash are unaffected.
- **Logs:** Vercel → Project → Logs, or `vercel logs https://www.corecargo.co.uk`.
- **Local parity:** `vercel env pull .env.local` (writes secrets to the gitignored `.env.local`),
  then `npm run dev`.

---

## 8. Notes specific to this app

- `/api/quote` is a Node serverless function; `nodemailer` and `crypto` are compatible with the
  Node runtime.
- The admin cookie is `httpOnly`, `sameSite=strict`, `secure` in production, scoped to `/admin`.
- `robots.txt` disallows `/api/` and `/admin/`.
- `data/` and `.env*` are gitignored; never commit production values.
