
# Fix Logo and Theme Consistency for Landing Page

## Problem Summary
The logo image has a dark background baked into it, which clashes with the current light-themed landing page. The main Safe Spend app uses a dark theme with teal/cyan accents, and the landing page should align with this aesthetic.

## Solution Overview
Update the landing page to use a dark theme that matches the main app's branding, ensuring the logo integrates seamlessly with its environment.

---

## Changes Required

### 1. Update CSS Design Tokens
**File:** `src/index.css`

- Change the light mode variables to match the main app's dark theme:
  - Background: Dark blue-gray (`~200 20% 10%`)
  - Foreground: Light gray/white (`~0 0% 95%`)
  - Primary: Teal/cyan (`~168 76% 42%`) - matching the app's accent
  - Accent: Keep complementary or match the teal
  - Update card, muted, and border colors for dark backgrounds

### 2. Update Navbar Component
**File:** `src/components/landing/Navbar.tsx`

- Update the navbar background to use a darker, more opaque backdrop
- Ensure border colors work on dark theme
- Adjust text colors for proper contrast

### 3. Update Hero Section
**File:** `src/components/landing/Hero.tsx`

- Adjust gradient backgrounds to use dark colors
- Update decorative blur circles to complement dark theme
- Ensure badge, text, and trust indicators have proper contrast

### 4. Update Features Section
**File:** `src/components/landing/Features.tsx`

- Update section background from `bg-muted/30` to appropriate dark variant
- Adjust card styling for dark theme (darker cards with subtle borders)

### 5. Update HowItWorks Section
**File:** `src/components/landing/HowItWorks.tsx`

- Adjust gradient colors to use teal/cyan palette
- Update step circles and connector lines for dark theme

### 6. Update Footer Section
**File:** `src/components/landing/Footer.tsx`

- Footer already uses `bg-foreground` which will need adjustment
- Update to maintain visual distinction from main content

### 7. Update WaitlistForm Component
**File:** `src/components/landing/WaitlistForm.tsx`

- Ensure input fields and buttons work well on dark backgrounds
- Update focus states and placeholder colors

---

## Technical Details

### New Color Palette (HSL Values)
```text
Background:     200 25% 8%     (Dark blue-gray)
Foreground:     0 0% 95%       (Off-white)
Primary:        168 76% 42%    (Teal - matching app sidebar)
Primary Light:  168 76% 15%    (Dark teal for backgrounds)
Accent:         168 76% 50%    (Brighter teal for highlights)
Card:           200 25% 12%    (Slightly lighter dark)
Muted:          200 25% 20%    (For muted backgrounds)
Border:         200 25% 18%    (Subtle borders)
```

### Visual Hierarchy on Dark Theme
- Logo: Will blend naturally with dark surroundings
- CTAs: Teal buttons will pop against dark background
- Cards: Subtle elevation with slightly lighter backgrounds
- Text: High contrast white/gray text

---

## Expected Outcome
- Landing page will have a cohesive dark theme matching the main app
- Logo will integrate seamlessly without awkward background contrast
- Brand identity maintained with teal/cyan accents throughout
- Professional, finance-focused aesthetic preserved
