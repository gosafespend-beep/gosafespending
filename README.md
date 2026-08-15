# Safe Spend — marketing site

The landing page, blog and free calculators for [gosafespend.com](https://gosafespend.com).
The product itself lives in a separate codebase at `app.gosafespend.com`.

React 18 + Vite + TypeScript + Tailwind + shadcn/ui, with Supabase for blog
content, newsletter signups and transactional email.

## Getting started

```bash
npm install
cp .env.example .env   # fill in the Supabase values
npm run dev            # http://localhost:8080
```

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build + sitemap |
| `npm run build:prerender` | Production build with prerendering (needs Puppeteer) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm test` | Vitest |
| `npm run bundle:check` | Fails if the homepage payload exceeds budget |

## Layout

```
src/
  components/landing/   Landing page sections
  components/seo/       JSON-LD emitters and metadata
  components/ui/        shadcn primitives + CtaLink
  lib/                  analytics, appLink, finance maths
  pages/                One per route
scripts/                Build-time route discovery, sitemap, bundle budget
supabase/
  functions/            Deno edge functions (contact, newsletter, sitemap)
  migrations/           Schema. Rebuildable from scratch with `supabase db reset`
```

## Two things worth knowing before you change anything

**All CTAs go through `<CtaLink>`.** It attaches campaign parameters and fires
the `cta_click` event. `CtaLocation` is a closed union, so a new CTA will not
typecheck until you decide how it is reported. Do not hand-write
`<a href={APP_URL}>` — that is how six CTAs ended up untracked.

**Prerendering is opt-in.** `PRERENDER=true` produces static HTML per route.
Without it every route serves an empty shell, which is invisible to any crawler
that does not execute JS. See `DEPLOYMENT.md`.

## Deploying

See [DEPLOYMENT.md](./DEPLOYMENT.md) — it covers the database migrations, edge
function deployment, security headers, analytics setup and the manual steps that
code cannot do.
