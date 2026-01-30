
Goal
- Remove the “huge blank space” under the alert cards inside the DashboardMockup preview and make the sidebar feel vertically “filled” (less dead space), by adding realistic dashboard sections (a graph + list) and by letting the layout intentionally occupy the available height.

What’s happening now (root cause)
- The mockup container has a fixed aspect ratio (currently `aspect-[2/1]`), so it always reserves a specific height.
- Inside that fixed height, the main content only renders:
  1) header
  2) stats row
  3) alerts grid
- Those elements don’t add up to the full available height, so the remaining height becomes empty space.
- The sidebar has the same issue: navigation content is top-aligned with nothing “anchoring” the bottom.

Solution (high level)
1) Add a “Spending Trend” graph panel directly under the alert cards.
2) Add an additional panel next to or under the graph (e.g., “Recent Transactions” list or “Top Categories”).
3) Adjust the layout so the new bottom section expands to fill the remaining vertical space (so we don’t just keep adding content and accidentally create scrollbars).

Implementation design (DashboardMockup)
A) Layout adjustments to guarantee “fill”
- Change the main content area wrapper from a `space-y-*` stack to a true flex column layout:
  - `ContentArea` becomes `flex flex-col` with `gap-*`
  - Add a bottom “dashboard lower section” wrapper with `flex-1 min-h-0`
  - Ensure its child cards use `h-full` so the section expands to consume leftover space.
- Keep overflow behavior controlled:
  - Prefer `overflow-hidden` inside the mockup (to avoid tiny scrollbars inside the BrowserFrame).
  - If needed for smaller viewports, allow only the “transactions list” panel to scroll (not the whole mockup).

B) New sections to add under Alerts
1) Spending Trend (Graph) card
- A new card component under alerts:
  - Title: “Spending Trend”
  - Sub-label: “Last 7 days” (or “This month”)
  - Right-side stat: “$2,340” (example)
- Graph implementation approach (pick the simplest stable option):
  Option 1 (recommended for perfect predictability at tiny sizes): Pure CSS “bar sparkline”
  - Render ~10 vertical bars using divs with varying heights, using `bg-primary/70` and `bg-primary/20`.
  - This avoids Recharts sizing quirks in very small containers.
  Option 2: Recharts mini area/line chart
  - Use `ResponsiveContainer` with an explicit small height (e.g., 56–80px).
  - Hide axes/ticks entirely; use a subtle gradient fill.
  - This looks great, but can be more fragile in tiny/animated containers.
- Either way, the goal is a graph that visually reads as a chart and fills space.

2) Secondary panel to balance the layout (fills remaining space)
- Add one of:
  a) Recent Transactions card (recommended; visually dense, great at filling height)
     - 5–7 rows, each row: merchant label + category + amount (green/red)
     - Include small colored dot or icon at left
     - If height is tight, truncate merchant names and keep typography small
  b) Top Categories card
     - 4–6 categories with slim progress bars (like the alert bars)
     - Example: Rent 78%, Groceries 64%, Transport 35%, Subscriptions 22%

C) Sidebar “fill” improvement
- Add a bottom-anchored sidebar footer section:
  - Use `mt-auto` to push it to the bottom.
  - Include either:
    - “Monthly Budget” mini progress bar + “Remaining $420”
    - Optional tiny “Upgrade” CTA (decorative button style, no click behavior required)
- This makes the sidebar feel complete and eliminates the “floating menu” look.

Files to change
- src/components/landing/DashboardMockup.tsx
  - Add new mock data arrays:
    - `trendData` (if using Recharts) or `sparkBars` (if using CSS bars)
    - `recentTransactions` or `topCategories`
  - Add new subcomponents:
    - `SpendingTrendCard`
    - `RecentTransactionsCard` (or `TopCategoriesCard`)
    - `SidebarFooterCard` (optional)
  - Update the main content layout to use a `flex` structure that intentionally fills height.

Visual acceptance criteria (what “fixed” means)
- No obvious empty block under the alert cards; that area is now occupied by:
  - a graph panel (spending trend), and
  - a list/progress panel (transactions/categories)
- Sidebar no longer looks “cut short”; bottom area contains a small footer module.
- No ugly internal scrollbars in normal desktop preview (1536px wide).
- On smaller viewports, if overflow is unavoidable, only the transactions list can scroll (not the whole mockup).

Testing checklist
- Verify on desktop preview: App Preview section shows no blank gap under alerts.
- Verify on mobile width: mockup remains readable and doesn’t collapse weirdly.
- Verify “prefers-reduced-motion”: count-up and any chart animation doesn’t feel jarring.
- Confirm the new content doesn’t imply bank connections (keep it generic/manual).

Notes / tradeoffs
- If you want the mockup to match a specific existing screenshot “exactly,” we’ll need the reference image for the “below alerts” area too. Otherwise, we’ll add realistic dashboard content that matches the existing style system (colors, spacing, borders) but is newly designed to fill the space.
