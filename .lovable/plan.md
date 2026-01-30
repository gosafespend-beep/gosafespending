
# Live CSS Dashboard Mockup - Implementation Plan

## Overview

Replace the static `app-preview.png` image with a pixel-perfect live CSS/React mockup that replicates the dashboard design exactly. This creates an interactive, animated preview that feels more dynamic and professional while maintaining the exact visual appearance.

## Benefits of Live CSS Mockup

- **Dynamic Animations**: Numbers can count up, cards can have subtle hover effects
- **Scalability**: Crisp on all screen sizes (no pixelation)
- **Interactivity**: Subtle hover states and micro-animations
- **Consistency**: Uses the same design tokens as the rest of the site
- **Performance**: CSS renders faster than large images on slow connections

---

## Dashboard Structure (Based on Current Image)

The mockup will replicate this exact layout:

```text
+------------------+----------------------------------------+
|    SIDEBAR       |              HEADER                    |
|                  |   Finance Tracker    January 2026     |
|  Safe Spend      +----------------------------------------+
|  Dashboard       |                                        |
|  Transactions    |   BALANCE    INCOME    EXPENSES   NET  |
|                  |   $18,715   $187,215  $168,500  $18,715|
|  TRACKING        +----------------------------------------+
|  Accounts        |                                        |
|  Debt Tracker    |   +-------------+  +-------------+     |
|  Savings Goals   |   | Low Savings |  | Rent Near   |     |
|  Insights        |   |    Alert    |  | Limit Alert |     |
|                  |   +-------------+  +-------------+     |
|  ANALYSIS        |                                        |
|  Reports         |   +-------------+  +-------------+     |
|  Net Worth       |   | Fixed Acct  |  | Groceries   |     |
|                  |   | Near Limit  |  | Near Limit  |     |
|  SETTINGS        |   +-------------+  +-------------+     |
|  Categories      |                                        |
|  Settings        |                                        |
+------------------+----------------------------------------+
```

---

## Implementation Details

### New Component: `DashboardMockup.tsx`

Create a self-contained component with these sub-elements:

#### 1. Sidebar
- Logo + "Safe Spend" branding
- Navigation sections: MAIN, TRACKING, ANALYSIS, SETTINGS
- Active state on "Dashboard" item with teal highlight
- Icons for each menu item (using Lucide icons)

#### 2. Header
- "Finance Tracker" title
- Month/year selector styled as a dropdown button

#### 3. Stats Cards Row
- 4 cards: Balance, Income, Expenses, Net
- Large dollar amounts with animated count-up effect
- Percentage indicators (showing 0%)
- Color-coded: Income (green), Expenses (red), Balance/Net (teal)

#### 4. Alert Cards Grid
- 4 warning cards in a 2x2 grid
- Yellow/orange warning styling
- Progress bars showing 100% used
- Text: "Low Savings", "Rent expense Near Limit", etc.

---

## Technical Approach

### Files to Create
| File | Purpose |
|------|---------|
| `src/components/landing/DashboardMockup.tsx` | Main mockup component with all dashboard elements |

### Files to Modify
| File | Change |
|------|--------|
| `src/components/landing/AppPreview.tsx` | Replace `<img>` with `<DashboardMockup />` component |

### Styling Strategy
- Use existing Tailwind classes and CSS variables from `index.css`
- Match the dark theme colors exactly (sidebar-background, card, border)
- Use the teal primary color for active states
- Scale down to fit within the browser frame (using transform or font-size scaling)

### Animation Enhancements
- Animated number count-up for dollar amounts (on scroll into view)
- Subtle pulse on active sidebar item
- Optional: gentle shimmer effect on stat cards
- Respects `prefers-reduced-motion` setting

---

## Visual Accuracy Checklist

The mockup will match the image exactly:
- Dark navy/slate background colors
- Teal accent colors for active states and primary elements
- Proper spacing and card shadows
- Correct typography hierarchy (section labels, values, descriptions)
- Warning cards with amber/orange accents
- Proper border radius on all cards

---

## Responsive Considerations

- Desktop: Full sidebar + main content area
- Tablet/Mobile: The mockup scales down proportionally within the browser frame
- The component uses a fixed aspect ratio container to maintain proportions

---

## Technical Notes

1. **Accessibility**: The mockup is decorative, so appropriate `aria-hidden="true"` will be applied
2. **Performance**: Pure CSS/Tailwind - no additional dependencies needed
3. **Maintainability**: Single component file keeps the mockup self-contained
4. **Animation**: Uses Framer Motion for count-up numbers (already installed)
