# Deployment and remaining manual steps

Everything in this file needs credentials, console access or a decision that
code alone cannot supply. The code changes are done and verified; these are the
steps that make them take effect.

Ordered by urgency.

---

## 1. Check for existing abuse of the email relay — do this first

Before anything else, open the Resend dashboard and look at the send log.

Until this branch is deployed, `send-contact-email` and `send-newsletter-email`
accept requests from any origin with no rate limit, and the newsletter function
mails whatever address the caller supplies. If the endpoints were found, you
will see sends to addresses that never visited the site.

If there is abuse: rotate `RESEND_API_KEY`, then check the sending domain's
reputation (Google Postmaster Tools, Microsoft SNDS) before assuming delivery is
healthy.

---

## 2. Deploy the database changes

Two new migrations. The baseline one describes objects that **already exist** in
the live project, so mark it applied rather than running it:

```bash
supabase migration repair --status applied 20260101000000
supabase db push
```

`20260101000000_baseline_functions_and_roles.sql` defines
`update_updated_at_column()` and `has_role()`/`user_roles`. Existing migrations
referenced both but neither was ever defined here, so the schema could not be
rebuilt from source. Verify with `supabase db reset` against a local instance.

`20260816090000_rate_limits.sql` adds the table and function the edge functions
now depend on. **Deploy this before the functions**, or every request fails open
(the helper is deliberately fail-open so a database problem cannot take the
contact form offline, but you want the limit actually working).

---

## 3. Deploy the edge functions

```bash
supabase functions deploy send-contact-email
supabase functions deploy send-newsletter-email
```

They now need `SUPABASE_SERVICE_ROLE_KEY` in the function environment — the
newsletter function writes the subscription row itself, so that the only address
it will ever mail is one it just recorded.

**Verify after deploying:**

```bash
# Rejected: wrong origin
curl -X POST -H "Origin: https://evil.test" -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}' \
  https://<project>.supabase.co/functions/v1/send-newsletter-email
# expect 403

# Rejected: sixth request from one IP within the hour
# expect 429

# Escaping: send this as the contact message to an address you control
#   <a href="https://evil.test">click</a>
# It must arrive as visible literal text, not a rendered link.
```

---

## 4. Decide D1: who owns the build

This is the one open decision that blocks a finished capability.

Prerendering is implemented and verified — all 24 routes emit static HTML with
correct per-route titles, canonicals and `og:type`, and a blog article ships
2,031 words without running any JS. But it is **opt-in via `PRERENDER=true`**,
so it does nothing until a build sets it.

```bash
npm run build            # current behaviour, unchanged
npm run build:prerender  # prerendered output
```

It is gated because it needs Puppeteer in the build environment.

- **Branch A — stay on Lovable.** Try `build:prerender` in their pipeline. If
  Puppeteer is unavailable it will fail, and the fallback is a Cloudflare Worker
  using `HTMLRewriter` to inject per-route meta into the shell. That fixes
  metadata and social unfurls but *not* body-content indexing.
- **Branch B — GitHub Actions → Cloudflare Pages.** `.github/workflows/ci.yml`
  is ready; add a deploy step. This is the branch where `public/_headers` and
  `public/_routes.json` actually apply.

Set these repository secrets either way: `VITE_SUPABASE_URL`,
`VITE_SUPABASE_PUBLISHABLE_KEY`.

---

## 5. Apply the security headers

`public/_headers` is honoured by Cloudflare Pages and Netlify. **If the site
stays on a host that ignores it, none of these headers ship** — replicate them
as Cloudflare Transform Rules (Rules → Transform Rules → Modify Response
Header).

Ship `frame-ancestors 'none'` and `X-Frame-Options: DENY` immediately; they need
no testing. For the full CSP, deploy it once as
`Content-Security-Policy-Report-Only`, watch for 48 hours, then enforce.

The `connect-src` list already includes PostHog. Apply the same headers to
`app.gosafespend.com`, which currently has none either.

Verify: `curl -D - https://gosafespend.com/ -o /dev/null`, and try loading the
site in an iframe from another origin — it must be refused.

---

## 6. Turn analytics on

Nothing is tracked until `VITE_POSTHOG_KEY` is set. Without it every `track()`
call is a no-op, which is why the build works fine without one.

1. Create a PostHog project (EU cloud, to match the privacy positioning).
2. Set `VITE_POSTHOG_KEY` and `VITE_POSTHOG_HOST` in the build environment.
3. **Initialise the same project in the app codebase with
   `cross_subdomain_cookie: true`.** This is the load-bearing part: conversion
   happens on `app.gosafespend.com`, so without a cookie scoped to
   `.gosafespend.com` every conversion arrives as a fresh anonymous session and
   attribution is lost at the exact moment it matters.

**The single check that proves it works:** load the marketing site, click a CTA,
and confirm the app reports the *same* distinct ID.

### Still needed in the app codebase (not this repo)

- Read `?plan=monthly|annual` and preselect it.
- Read the `ft_*` params at signup and persist them onto the user record.
- Emit `signup_started`, `signup_completed`, `onboarding_completed`,
  `first_transaction_created`, `first_budget_created`, `trial_started`,
  `subscription_started` (with `plan`, `amount`, `currency`, `country`) and
  `subscription_cancelled`.

`subscription_started.country` is what settles the D2 market question with data
rather than opinion.

---

## 7. Search Console and Bing Webmaster

Neither is verified today, so organic performance is invisible. Verify
`gosafespend.com` and `app.gosafespend.com` separately, then submit
`/sitemap.xml` — now generated at build time from the same route list used for
prerendering, so it always includes every article.

Note the old `Disallow: /*?*utm_` and `/*?*ref=` rules were removed: canonicals
already prevent duplicate indexing, while blocking the crawl also discarded the
link equity campaigns earn.

---

## 8. Things left deliberately incomplete

**Company identity (LEG-4).** `Footer.tsx` carries a
`[LEGAL ENTITY NAME], [JURISDICTION]` placeholder. This was not invented,
because it has to be accurate. For a financial product, anonymity is the
strongest negative trust signal there is — it is the one thing every scam in the
category shares — so this is worth doing properly and soon. A named founder with
a real photo on the About page does more for a privacy-motivated buyer than any
statistic.

**Real product screenshots (MOB-1).** The mobile preview is a faithful mock, not
a capture, because the app is behind auth. It fixes the actual defect — the
desktop mockup rendered 4px text at 320px — but a real screenshot would be
better. Capture the transaction list, budget screen and dashboard at 2x, crop,
export WebP, and swap them in.

**The excluded data issue.** Out of scope by request, and still the largest
business risk in the audit: the hardcoded statistics in `StatsCounter.tsx`, the
six testimonials in `TestimonialsCarousel.tsx`, and the `aggregateRating` of
4.9 from 1,247 ratings in `SoftwareAppSchema.tsx` — which is published to Google
as structured data, contradicts the visible page, and sits on a company whose
own schema says `foundingDate: "2026"`. Deleting the `aggregateRating` block is
five lines and nothing depends on it.

**Legal review (LEG-5).** Route to a qualified professional: the GDPR claim and
consent mechanism; comparative advertising in the comparison table; the
calculator disclaimers; and subscription/refund terms for your target market.

**Pre-existing lint errors.** Three `@typescript-eslint/no-empty-object-type`
errors in generated shadcn files (`ui/textarea.tsx`, `ui/command.tsx`). Not
introduced here and not fixed, to avoid churn in generated code — but CI runs
`npm run lint`, so either fix them or scope the lint task to exclude `ui/`.
