

# Blog Article Mobile and Desktop Optimization

## Overview
Four targeted improvements to make blog articles look polished on all screen sizes and fix a layout bug.

---

## 1. Fix empty "Last updated:" text on blog articles

**Problem:** `LegalLayout` always renders `Last updated: {lastUpdated}`, but `BlogArticle` passes an empty string, resulting in a visible "Last updated:" with nothing after it.

**Fix in `LegalLayout.tsx`:** Conditionally render the "Last updated" line only when `lastUpdated` is non-empty.

```
{lastUpdated && (
  <p className="text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
)}
```

Also conditionally render the `<h1>` only when `title` is non-empty, since blog articles supply their own header.

---

## 2. Responsive typography (mobile-friendly text size)

**Problem:** `ArticleContent.tsx` uses `prose-lg` at all sizes, which produces oversized text on small screens.

**Fix in `ArticleContent.tsx`:** Change the class from `prose prose-invert prose-lg` to `prose prose-invert md:prose-lg`. This uses the default (base) prose size on mobile and upgrades to `prose-lg` on medium screens and above.

---

## 3. Mobile-friendly share buttons

**Problem:** The share buttons are small inline elements that can be hard to tap on mobile (violates the 44px touch target standard).

**Fix in `ShareButtons.tsx`:**
- Wrap in a responsive flex container: `flex flex-col sm:flex-row items-stretch sm:items-center gap-3`
- Use `size="default"` instead of `size="sm"` on mobile via responsive classes, making buttons full-width on small screens: `w-full sm:w-auto`
- This ensures comfortable touch targets on mobile while keeping the compact inline look on desktop

---

## 4. Desktop table of contents sidebar

**Problem:** On wide screens, the article content sits in a narrow `max-w-3xl` column with large empty margins on both sides.

**Fix:** Add a sticky Table of Contents (TOC) that appears on `xl` screens in the right margin.

### New component: `src/components/blog/TableOfContents.tsx`
- Accepts the article `content` (markdown string) as a prop
- Parses H2 and H3 headings from the markdown using a simple regex (`/^#{2,3}\s+(.+)$/gm`)
- Renders a sticky sidebar (`sticky top-24`) with heading links
- Each link scrolls to the corresponding heading using `id`-based anchors
- Highlights the currently visible heading using an `IntersectionObserver`
- Hidden on screens smaller than `xl` (`hidden xl:block`)

### Update `ArticleContent.tsx`
- Add `id` attributes to rendered `h2` and `h3` elements via the `components` prop on `ReactMarkdown`, generating slugs from heading text (e.g., "Build Your Budget" becomes `build-your-budget`)

### Update `BlogArticle.tsx` layout
- Change the article container from a single column to a relative layout on `xl`:
  ```
  <div className="max-w-3xl mx-auto xl:max-w-none xl:grid xl:grid-cols-[1fr_220px] xl:gap-12">
    <div className="max-w-3xl">
      {/* existing article content */}
    </div>
    <aside className="hidden xl:block">
      <TableOfContents content={post.content} />
    </aside>
  </div>
  ```
- The TOC sits in the right column, sticky as users scroll

---

## Technical Details

### Files modified
| File | Change |
|------|--------|
| `src/components/legal/LegalLayout.tsx` | Conditionally render title and last-updated |
| `src/components/blog/ArticleContent.tsx` | Responsive prose sizing + heading IDs |
| `src/components/blog/ShareButtons.tsx` | Full-width buttons on mobile |
| `src/pages/BlogArticle.tsx` | Grid layout for TOC on desktop |

### New file
| File | Purpose |
|------|---------|
| `src/components/blog/TableOfContents.tsx` | Sticky TOC sidebar with scroll-spy |

### No new dependencies required
All changes use existing packages (react-markdown `components` prop, IntersectionObserver API, Tailwind responsive utilities).

