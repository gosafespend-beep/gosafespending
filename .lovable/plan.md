

# Align Landing Page with Updated Product Brief

## Overview
The landing page needs updates to match the new product brief across pricing, features, CTAs, FAQs, SEO metadata, and structured data. The existing design system and theme are correct and will be preserved.

---

## 1. Pricing Section Overhaul (`src/components/landing/Pricing.tsx`)

The pricing model has completely changed.

**Current (wrong):** Free (R0 forever) + Pro (R79/month) in ZAR
**Brief (correct):** Free Trial (7 days) + Monthly ($9.99/mo) + Annual ($89.99/yr) in USD via Paystack

Changes:
- Replace 2-tier layout with 3-tier layout (Free Trial, Monthly, Annual)
- Switch currency from ZAR (R) to USD ($)
- Highlight Annual plan as "Best Value" (~25% discount)
- Update feature lists per tier (all tiers get full access)
- Update CTAs to "Start Free Trial" for all plans
- Add note: "After trial: read-only access until subscribed"
- Mention Paystack as payment processor for trust (supports cards, bank transfers, mobile money)

---

## 2. Features Section Update (`src/components/landing/Features.tsx`)

Add missing key features from the brief that aren't currently represented:

- **AI-Powered Categorization** -- smart auto-categorization of transactions (replace or add alongside existing cards)
- **PWA / Install Anywhere** -- installable on iOS, Android, desktop; works offline
- **Recurring Transactions** -- automate repeating expenses
- **Multi-Currency Support** -- track finances across currencies

Current 8 features to update/replace:
1. Expense Tracking -- keep
2. Smart Budgeting -- keep, add "Needs vs Wants classification", "budget rollover"
3. Savings Goals -- keep
4. Debt Payoff Planner -- keep, add "Snowball & Avalanche strategies"
5. Net Worth Dashboard -- keep, add "snapshots over time"
6. Bill Calendar -- keep, add "email reminders"
7. Reports & Analytics -- keep, add "cash flow forecast", "year-over-year comparison"
8. Financial Health Score -- keep

Add new feature cards or restructure to include AI categorization and PWA.

---

## 3. Hero Section Updates (`src/components/landing/Hero.tsx`)

- Change CTA button text from "Get Started Free" to "Start Free Trial"
- Update subheadline to mention AI: "Track expenses, build budgets, crush debt, and grow your savings -- powered by AI categorization, all in one beautiful dashboard."
- Add "PWA" mention to trust indicators or subtext: "Install on any device"
- Update trust indicator from "Enterprise-grade security" to include "Row Level Security" context or keep as-is for simplicity

---

## 4. FAQ Updates (`src/components/landing/FAQ.tsx`)

Update answers to match the brief:

- **"Is Safe Spend free to use?"** -- Update to reflect 7-day free trial model, then $9.99/mo or $89.99/yr. After trial, read-only access until subscribed.
- **"Is there a mobile app?"** -- Currently says "Native iOS and Android apps are on our roadmap." **Must change** to: "Safe Spend is a Progressive Web App (PWA) -- you can install it directly on your iPhone, Android phone, or desktop. It works offline too. No app store needed."
- **Add new FAQ:** "What happens after my free trial?" -- "You'll still have read-only access to all your data. Subscribe to regain full editing access. No data is ever deleted."
- **Add new FAQ:** "How does AI categorization work?" -- Brief description of smart auto-categorization.
- **Add new FAQ:** "What payment methods do you accept?" -- Mention Paystack: cards, bank transfers, mobile money.

---

## 5. Navbar CTA Update (`src/components/landing/Navbar.tsx`)

- Change "Get Started" button text to "Start Free Trial" (both desktop and mobile)

---

## 6. Sticky Bar Update (`src/components/landing/StickyWaitlistBar.tsx`)

- Change "Get Started Free" to "Start Free Trial"

---

## 7. FinalCTA Update (`src/components/landing/FinalCTA.tsx`)

- Change button text from "Get Started Free" to "Try Safe Spend Free"
- Update bottom text from "No credit card required. Free forever plan available." to "No credit card required. 7-day free trial."

---

## 8. HowItWorks Update (`src/components/landing/HowItWorks.tsx`)

- Change bottom CTA from "Start Now -- It's Free" to "Start Your Free Trial"

---

## 9. StatsCounter Currency Fix (`src/components/landing/StatsCounter.tsx`)

- Change "R5,000,000+" (ZAR) to "$5,000,000+" (USD) for "Money Tracked" stat

---

## 10. Comparison Table Update (`src/components/landing/Comparison.tsx`)

Add rows for new differentiators:
- "AI-powered categorization" -- Safe Spend: yes, Spreadsheets: no, Other Apps: partial
- "Works offline (PWA)" -- Safe Spend: yes, Spreadsheets: partial, Other Apps: partial
- "Recurring transaction automation" -- Safe Spend: yes, Spreadsheets: no, Other Apps: partial

---

## 11. SecuritySection Enhancement (`src/components/landing/SecuritySection.tsx`)

- Add "Row Level Security" card: "Every user's data is isolated at the database level with Row Level Security. No user can ever access another's data."
- Update existing copy to mention "user-owned data protected by RLS per user"

---

## 12. SEO & Metadata Updates

### `index.html`
- Update `<meta name="description">` to: "Track your spending, budgets, and savings goals with Safe Spend. Privacy-first, AI-powered personal finance tracker. Start your free trial today."
- Update JSON-LD schema:
  - Add `"operatingSystem": "Web, iOS, Android"` (PWA)
  - Update `offers` to reflect trial + paid pricing ($9.99/mo)
  - Add `"featureList"` with key features
  - Keep `applicationCategory: "FinanceApplication"`
- Update `og:description` to match new description
- OG image reference: keep `gosafespend.com/og-image.png?v=2` (already correct)

### `src/components/seo/SEOHead.tsx`
- Update default description for "/" to match new copy

---

## 13. UseCases Section (`src/components/landing/UseCases.tsx`)

- Update persona for "Students & Young Professionals" to mention the free trial
- Mention "Privacy-conscious individuals" as a persona (key target from brief) -- either add a 5th card or replace "Small Business Owners" with "Privacy-Conscious Users"

---

## 14. TrustBadges Update (`src/components/landing/TrustBadges.tsx`)

- Change "Free Plan Available / No credit card required" to "7-Day Free Trial / No credit card required"

---

## Summary of Files Modified

| File | Key Changes |
|------|-------------|
| `src/components/landing/Pricing.tsx` | 3-tier USD pricing, Paystack, trial model |
| `src/components/landing/Features.tsx` | Add AI categorization, PWA, multi-currency |
| `src/components/landing/Hero.tsx` | CTA text, AI mention, PWA |
| `src/components/landing/FAQ.tsx` | Updated answers, new questions |
| `src/components/landing/Navbar.tsx` | CTA: "Start Free Trial" |
| `src/components/landing/StickyWaitlistBar.tsx` | CTA: "Start Free Trial" |
| `src/components/landing/FinalCTA.tsx` | CTA: "Try Safe Spend Free" |
| `src/components/landing/HowItWorks.tsx` | CTA: "Start Your Free Trial" |
| `src/components/landing/StatsCounter.tsx` | ZAR to USD |
| `src/components/landing/Comparison.tsx` | Add AI, PWA, recurring rows |
| `src/components/landing/SecuritySection.tsx` | Add RLS card |
| `src/components/landing/TrustBadges.tsx` | "7-Day Free Trial" badge |
| `src/components/landing/UseCases.tsx` | Privacy-conscious persona |
| `index.html` | Meta descriptions, JSON-LD schema |
| `src/components/seo/SEOHead.tsx` | Default description update |

No new files need to be created. No files need to be deleted.

