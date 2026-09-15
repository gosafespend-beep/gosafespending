# "Thirty Seconds a Day" — Ebook as the front door to Safe Spend

The book is a 50+ page guide with a setup checklist, 12 chapters, worksheets and a 30-day plan — every chapter already points back into the product. That makes it three things at once: a lead magnet for people not ready to sign up, an onboarding manual for new users, and a month of email content that is already written.

This plan wires it up end to end: a gated download, a dedicated page, placements across the site, and a 5-email sequence that walks a reader through the 30-day plan.

---

## 1. The download itself

The PDF is stored privately, not as a public file anyone can hotlink. Every download link is generated per request and expires, so the email address is what buys access.

- Upload the book to a private storage bucket.
- A request with a valid email gets a fresh, time-limited link (7 days) emailed to them.
- If they lose it, re-entering the same email sends a new link rather than creating a duplicate contact.

## 2. A dedicated ebook page — `/ebook`

A real page, not just a form in a strip. This is the page that gets shared, linked and ranked.

Contents:
- Headline built on the book's own promise: "Thirty seconds a day. A practical guide to knowing where your money goes."
- Cover image plus a short "what's inside" list drawn from the contents page (12 chapters, 6 worksheets, glossary, 30-day plan).
- Three chapter teasers, including the "$340 She Couldn't Account For" case study — a real excerpt does more than a feature list.
- Email form with explicit consent, then a confirmation state telling them to check their inbox.
- Below the form: link to the free calculators and a soft "or just start using it free" CTA to the app.

The page is added to the shared route list so it is prerendered, in the sitemap, and carries its own title, description, social image and Book structured data.

## 3. Where the book is offered across the site

| Placement | What changes |
|---|---|
| Newsletter section (homepage) | Reframed from "stay in the loop" to "get the free 60-page guide" — same form, far stronger reason to enter an email. Newsletter consent stays attached. |
| Blog articles | A compact inline offer under each article, since blog readers are already reading about this exact topic. |
| Calculator pages | A one-line offer under each result: the book has a chapter on the thing they just calculated (50/30/20, debt payoff, emergency fund, compound growth). |
| Navbar / Footer | "Free Guide" link to `/ebook`. |
| Exit-intent / sticky bar | Second variant of the sticky bar offering the book to visitors who scrolled past pricing without converting. |
| App signup | A stable, shareable endpoint the app can call so every new account is emailed the book on day one. Requires one small change in the app project — noted below as a dependency. |

## 4. The 30-day email sequence

Five emails, mapped to the book's own structure so each one has a concrete action the reader can take in minutes.

| When | Subject focus | Ask |
|---|---|---|
| Day 0 | Here's your book + the setup checklist | Download, create a free account |
| Day 2 | The Weekend Audit (Ch. 1) — the $340 story | Log one day of spending |
| Day 7 | Build a budget from real data (Ch. 3–4) | Use the 50/30/20 calculator, then build the real thing in the app |
| Day 14 | Snowball vs avalanche (Ch. 7) / emergency fund (Ch. 8) | Compare payoff strategies |
| Day 30 | The Day 30 review (Ch. 12) | Record a net worth snapshot; trial-to-paid nudge |

Sending is driven by a scheduled job that wakes up regularly, picks up contacts whose next email is due, sends it and advances them a stage. Every email carries an unsubscribe link that stops the sequence immediately, and links into the app are tagged so you can see which email produced signups.

## 5. Measurement

Events for: ebook page view, email submitted, email delivered, link clicked, download opened, and app signup attributed to an ebook email. This answers whether the book earns its place or just sits there.

---

## Technical details

**Storage:** private Supabase Storage bucket `ebook`; the PDF uploaded once. Signed URLs (7 day TTL) minted server-side per request. No public bucket, no file committed to the repo.

**Data:** new table `public.ebook_leads` — `id`, `email` (unique, citext-lowered), `source` (page/blog/calculator/app_signup), `drip_stage` (int, default 0), `next_send_at` (timestamptz), `unsubscribed_at`, `confirmed_at`, `created_at`, plus an `unsubscribe_token` (uuid). RLS enabled with no anon/authenticated policies; `GRANT ALL ... TO service_role` only — all access is through edge functions. Newsletter subscribers continue to go to `waitlist`; a lead who ticks the newsletter box gets a row in both.

**Edge functions:**
- `send-ebook` — POST `{ email, source }`. Reuses `_shared/security.ts` (`corsFor`, `isValidEmail`, `withinRateLimit`, `serviceClient`) exactly as `send-newsletter-email` does. Upserts the lead, mints a signed URL, sends the Day 0 email via Resend from `info@gosafespend.com`, sets `drip_stage = 1` and `next_send_at = now() + 2 days`. Returns `{ success }` only — never echoes state that would let it be used to probe addresses.
- `send-ebook-drip` — invoked by `pg_cron` (hourly). Selects due, non-unsubscribed leads in small batches, sends the stage email, advances stage and `next_send_at`, stops after stage 5.
- `ebook-unsubscribe` — GET with token, sets `unsubscribed_at`, returns a simple confirmation page.
- Email HTML lives in `supabase/functions/_shared/ebook-emails.ts` so the two senders share templates. No PII in logs, per project policy.

**Frontend:**
- `src/pages/Ebook.tsx`, lazy-routed in `App.tsx`; entry added to `scripts/routes.mts` so sitemap and prerender pick it up.
- `src/components/shared/EbookOffer.tsx` — one form component with `variant="page" | "inline" | "compact"`, used by the ebook page, blog articles, calculators and the reworked homepage section. Zod email validation, consent checkbox, live-region announcements, 44px targets — matching the existing newsletter component.
- `src/components/seo/BookSchema.tsx` for structured data.
- Cover image generated to `src/assets/` and reused for the page and the `/ebook` social card.

**Dependency outside this project:** emailing the book automatically at account creation needs the app at `app.gosafespend.com` to call `send-ebook` after signup. This plan builds and documents that endpoint; the call itself has to be added in the app project.

**Not included:** web-readable chapter pages (agreed to keep it PDF-only for now) — the route and schema are structured so chapters can be added later without rework.
