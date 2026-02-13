

# Internal Linking Improvement Plan

## Problem
Multiple pages across the site are "link islands" with little or no cross-linking, hurting SEO crawlability and user navigation. Calculator tools, the About page, and the blog have almost no internal links to other site sections.

## Changes

### 1. Add "Explore More Tools" section to each calculator page
Each of the 4 tool pages (Budget, Compound Interest, Debt Payoff, Emergency Fund) will get a small section above the CTA showing links to the other 3 tools. This creates a fully interconnected tools cluster.

**Files**: `BudgetCalculator.tsx`, `CompoundInterestCalculator.tsx`, `DebtPayoffCalculator.tsx`, `EmergencyFundCalculator.tsx`

### 2. Add internal links to the About page
Add a closing section with links to /blog, /contact, and /tools/budget-calculator to turn it from a dead end into a navigation hub.

**File**: `About.tsx`

### 3. Expand the Navbar with Blog and Tools links
Add "Blog" and "Tools" to the main navbar navigation so users (and crawlers) can reach these sections from the homepage.

**File**: `Navbar.tsx`

### 4. Expand LegalLayout footer with Blog and Tools links
Add /blog and /tools/budget-calculator links to the mini-footer that appears on all legal/tool/blog pages.

**File**: `LegalLayout.tsx`

### 5. Cross-link related legal pages
- Privacy Policy: add link to Cookies Policy
- Cookies Policy: add link to Privacy Policy
- Refund Policy: add link to /contact (not just mailto)
- Terms of Service: add link to Refund Policy and Privacy Policy

**Files**: `PrivacyPolicy.tsx`, `CookiesPolicy.tsx`, `RefundPolicy.tsx`, `TermsOfService.tsx`

### 6. Add tool promotion to Blog List page
Add a small "Free Tools" callout section below the blog filters linking to the 4 calculators, creating blog-to-tools internal links.

**File**: `BlogList.tsx`

---

## Technical Details

- All internal links will use React Router `<Link to="...">` (not `<a href>`) for SPA navigation
- Links will follow existing styling conventions: `text-primary hover:underline` for inline links, card-style for tool cross-links
- No new dependencies required
- Approximately 8-10 files modified, 0 new files created

## Summary of Link Improvements

| Gap | Fix |
|-----|-----|
| Tools are islands | "Explore More Tools" cross-links on each calculator |
| About is a dead end | Add CTA links to blog, contact, tools |
| Navbar missing pages | Add Blog and Tools nav items |
| LegalLayout footer sparse | Add Blog and Tools links |
| Legal pages don't cross-link | Add contextual cross-references |
| Blog has no tool links | Add "Free Tools" section on blog list |

