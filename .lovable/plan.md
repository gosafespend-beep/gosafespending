

# Mobile Optimization Audit

## Summary

After extensively reviewing every component and visually testing on a 375x812 viewport, the app is generally well-optimized for mobile. Most sections use responsive Tailwind classes (`sm:`, `md:`, `lg:`) correctly. However, I found several issues ranging from critical to minor.

---

## Issues Found

### 1. Comparison Table - Cramped on Mobile (High Priority)
The comparison table uses a fixed `grid-cols-4` layout at all breakpoints. On mobile (375px), the four columns are extremely cramped -- feature names wrap to 3+ lines, column headers ("Safe Spend", "Spreadsheets", "Other Apps") are tiny, and the table is barely readable.

**Fix**: Make the table horizontally scrollable on mobile with `overflow-x-auto`, or redesign as a stacked card layout for mobile where each feature row shows the comparison as a mini-card instead of a table row.

**File**: `src/components/landing/Comparison.tsx`

### 2. Mobile Menu Not Full-Screen (Medium Priority)
The mobile navigation menu opens as a slide-down panel but doesn't cover the entire viewport. Content from the page is visible behind/below the menu, which looks unfinished. Additionally, when the menu is open, the page behind can still be scrolled to awkward positions.

**Fix**: Make the mobile menu take full viewport height (`h-[calc(100vh-64px)]`) with its own scroll context, and add a backdrop overlay to prevent interaction with content behind it.

**File**: `src/components/landing/Navbar.tsx`

### 3. Sticky Bar Overlaps Footer Content (Medium Priority)
The sticky "Start Free Trial" bar at the bottom overlaps the footer links and the bottom of content sections. There is no bottom padding/margin to account for the bar's height (~56px).

**Fix**: Add `pb-16` or similar bottom padding to the footer and to the main page container to ensure no content is hidden behind the sticky bar.

**Files**: `src/components/landing/Footer.tsx`, `src/pages/Index.tsx`

### 4. Touch Target Sizes (Low-Medium Priority)
Several interactive elements are below the recommended 44x44px minimum touch target size:
- Testimonial carousel dot indicators (8x8px, expanding to 24x8px for active)
- FAQ category filter buttons (small padding on mobile)
- Footer links have adequate text size but tight vertical spacing (`space-y-3`)

**Fix**: Increase dot indicator sizes to at least 32px touch area with padding, and ensure all interactive elements meet 44px minimum.

**Files**: `src/components/landing/TestimonialsCarousel.tsx`, `src/components/landing/FAQ.tsx`

### 5. Footer Grid Layout on Small Mobile (Low Priority)
The footer uses `grid-cols-2 md:grid-cols-6`. On very narrow screens (320px), the two-column layout for "Tools" column (with 6 links including external ones) looks acceptable but could wrap oddly with longer link text.

**File**: `src/components/landing/Footer.tsx`

### 6. Dashboard Mockup Readability on Mobile (Low Priority)
The `DashboardMockup` component is decorative (`aria-hidden="true"`) so it doesn't need to be readable, but on mobile the `aspect-[2/1]` ratio makes it quite small. The text is essentially invisible. This is acceptable as a visual element but could benefit from being hidden on very small screens or shown as a static image instead.

**File**: `src/components/landing/DashboardMockup.tsx`

### 7. Stats Counter Large Numbers on Small Screens (Low Priority)
The "$5,000,000+" counter uses `text-3xl sm:text-4xl` which can cause the dollar figure to be quite wide on 320px screens, potentially causing horizontal overflow within the 2-column grid.

**File**: `src/components/landing/StatsCounter.tsx`

---

## What's Already Good

- Viewport meta tag is correctly set
- Hero section scales well with responsive text sizes
- Pricing cards stack to single column on mobile
- Features grid goes from 4-col to 2-col to 1-col correctly
- Use Cases and Security sections stack properly
- Tool calculator pages render well on mobile
- LegalLayout pages are fully responsive
- `prefers-reduced-motion` is respected throughout
- Navbar hamburger menu exists with proper aria attributes
- FeatureAnnotation is correctly hidden on mobile (`hidden lg:block`)
- Sticky waitlist bar text hides on mobile (`hidden sm:block`)
- All pages use proper responsive padding (`px-4 sm:px-6 lg:px-8`)

---

## Technical Implementation

### Comparison Table Fix (Highest Impact)
Replace the fixed 4-column grid with a horizontally scrollable container on mobile:

```text
<div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
  <div className="min-w-[500px] sm:min-w-0">
    <!-- existing grid content -->
  </div>
</div>
```

### Mobile Menu Fix
Change the mobile menu `motion.div` to use full height and add overlay:

```text
// Add backdrop overlay
<div className="fixed inset-0 bg-black/50 z-40" onClick={close} />

// Menu panel
<div className="fixed top-[65px] inset-x-0 bottom-0 bg-background overflow-y-auto">
```

### Sticky Bar Bottom Padding
Add `pb-16` to footer to prevent overlap.

### Touch Targets
Wrap carousel dots in larger padding containers (min 44px).

---

## Priority Order
1. Comparison table horizontal scroll (most visible issue)
2. Mobile menu full-screen + overlay
3. Sticky bar footer overlap
4. Touch target sizes
5. Stats counter overflow protection
6. Minor polish items
