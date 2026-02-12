

# Advanced SEO Audit -- Fixes

## Audit Summary

After reviewing all SEO-related files, I found **12 actionable issues** ranging from critical schema mismatches to missing metadata for new pages.

---

## Issue 1: FAQSchema Data is Stale (Critical)

`src/components/seo/FAQSchema.tsx` contains **old FAQ data** that doesn't match the updated `FAQ.tsx` component. The schema still mentions "waitlist," "free tier," and "native iOS/Android apps on our roadmap" -- all incorrect per the current brief.

**Fix:** Replace the hardcoded `faqData` array in `FAQSchema.tsx` with the exact questions/answers from `FAQ.tsx` (trial model, PWA, AI categorization, Paystack).

---

## Issue 2: Sitemap Missing New Pages (Critical)

`public/sitemap.xml` only lists 5 pages. Missing:
- `/about`
- `/blog`
- `/tools/budget-calculator`

**Fix:** Add all 3 new URLs to `sitemap.xml` with appropriate priorities and `lastmod` dates (2026-02-12).

---

## Issue 3: SEOHead Missing Metadata for New Pages (Critical)

`src/components/seo/SEOHead.tsx` `pageMetadata` only covers 5 routes. The `/about`, `/blog`, and `/tools/budget-calculator` pages fall back to the homepage metadata, meaning they all share the same title/description/canonical -- very bad for SEO.

**Fix:** Add entries for all 3 new routes:
- `/about` -- "About Us - Safe Spend" + mission-focused description
- `/blog` -- "Blog - Safe Spend" + content hub description  
- `/tools/budget-calculator` -- "Free 50/30/20 Budget Calculator - Safe Spend" + tool-focused description with keywords

---

## Issue 4: BreadcrumbSchema Missing New Pages

`src/components/seo/BreadcrumbSchema.tsx` `breadcrumbNames` doesn't include `/about`, `/blog`, or `/tools/budget-calculator`. These pages will show "Page" as their breadcrumb name in search results.

**Fix:** Add entries:
- `/about` -> "About"
- `/blog` -> "Blog"
- `/tools/budget-calculator` -> "Budget Calculator"

Also handle nested path: for `/tools/budget-calculator`, create a 3-level breadcrumb (Home > Tools > Budget Calculator).

---

## Issue 5: VisualBreadcrumbs Missing Labels

`src/components/seo/VisualBreadcrumbs.tsx` `pathLabels` doesn't include `about`, `blog`, or `budget-calculator`. These pages will show raw URL segments as labels.

**Fix:** Add:
- `"about"` -> "About"
- `"blog"` -> "Blog"
- `"tools"` -> "Tools"
- `"budget-calculator"` -> "Budget Calculator"

---

## Issue 6: Footer Navigation Broken on Subpages

The "Product" column links in `Footer.tsx` use `e.preventDefault()` + `scrollToSection()`. When a user is on `/about` or `/blog` and clicks "Features," nothing happens -- it tries to scroll to `#features` on the current page which doesn't exist.

**Fix:** Change Product links to navigate to `/#features`, `/#how-it-works`, etc. using proper `<Link>` or `<a>` tags that navigate to the homepage first. Remove `e.preventDefault()` for these links when not on the homepage.

---

## Issue 7: Navbar Logo Link Broken on Subpages

The logo `<a href="/">` in `Navbar.tsx` uses `e.preventDefault()` + `window.scrollTo()`. From any subpage, clicking the logo does nothing -- it just scrolls the current page to top instead of navigating home.

**Fix:** Use React Router's `<Link to="/">` or conditionally navigate: if on homepage, scroll to top; otherwise, navigate to `/`.

---

## Issue 8: Missing Open Graph Image Dimensions

`index.html` and `SEOHead.tsx` set `og:image` but never set `og:image:width` and `og:image:height`. Social platforms render previews faster and more reliably when dimensions are provided.

**Fix:** Add to `index.html`:
```html
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
```
Also add these in `SEOHead.tsx` dynamically.

---

## Issue 9: Missing `twitter:creator` Tag

`index.html` has `twitter:site` (@SafeSpend) but no `twitter:creator`. Both should be set for proper Twitter card attribution.

**Fix:** Add `<meta name="twitter:creator" content="@SafeSpend" />` to `index.html`.

---

## Issue 10: Static JSON-LD Renders on All Pages

The `SoftwareApplication` JSON-LD in `index.html` is always present -- even on `/privacy-policy` or `/tools/budget-calculator`. This is semantically incorrect; the schema should only appear on the homepage or a dedicated product page.

**Fix:** Move the `SoftwareApplication` schema from `index.html` into a React component (e.g., `SoftwareAppSchema.tsx`) that only renders on `/`. This follows the same pattern as `FAQSchema`, `HowToSchema`, etc.

---

## Issue 11: Budget Calculator Missing Structured Data

The `/tools/budget-calculator` page has no JSON-LD schema. It's a perfect candidate for a `WebApplication` or `HowTo` schema to appear as a rich result.

**Fix:** Add a small JSON-LD `HowTo` schema specific to the budget calculator page (e.g., "How to calculate your 50/30/20 budget").

---

## Issue 12: `robots.txt` Has Ineffective Directives

- `Crawl-delay` is ignored by Googlebot (use Search Console instead)
- `/*.json$` and `/*?*utm_` use regex-like patterns that aren't supported by all crawlers (robots.txt only supports simple path prefix matching and `*` wildcards, not `$` anchors)

**Fix:** Clean up `robots.txt`:
- Remove `Crawl-delay` for Googlebot (it's ignored)
- Fix pattern syntax: `/*.json` (remove `$`), keep UTM pattern as-is (the `*` wildcard works)

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/components/seo/FAQSchema.tsx` | Sync FAQ data with current FAQ.tsx content |
| `public/sitemap.xml` | Add /about, /blog, /tools/budget-calculator |
| `src/components/seo/SEOHead.tsx` | Add metadata for 3 new pages |
| `src/components/seo/BreadcrumbSchema.tsx` | Add breadcrumb names for new pages, handle nested paths |
| `src/components/seo/VisualBreadcrumbs.tsx` | Add path labels for new segments |
| `src/components/landing/Footer.tsx` | Fix Product links to work from subpages |
| `src/components/landing/Navbar.tsx` | Fix logo link to navigate home from subpages |
| `index.html` | Add og:image dimensions, twitter:creator, remove static JSON-LD |
| `public/robots.txt` | Clean up ineffective directives |

## Files to Create

| File | Purpose |
|------|---------|
| `src/components/seo/SoftwareAppSchema.tsx` | Homepage-only SoftwareApplication JSON-LD (moved from index.html) |
| `src/components/seo/BudgetCalculatorSchema.tsx` | HowTo schema for the calculator page |

## Files to Update (routing)

| File | Changes |
|------|---------|
| `src/App.tsx` | Import and render new schema components |
| `src/pages/BudgetCalculator.tsx` | Import and render BudgetCalculatorSchema |
| `src/components/seo/index.ts` | Export new schema components |

