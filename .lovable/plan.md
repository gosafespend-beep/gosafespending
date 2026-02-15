

# Blog Article Rendering Improvements

## Overview
After reviewing the live blog article, I found several issues to fix and opportunities to improve the reading experience.

---

## 1. Remove visible SEO metadata from article content

**Problem:** The article content includes raw SEO notes at the bottom ("Primary Keyword Used Naturally:", "Secondary Keywords Integrated:") that are visible to readers. This is internal content that should be stripped before rendering.

**Fix in `ArticleContent.tsx`:** Strip everything after a line starting with `**Primary Keyword` (or similar SEO markers) before passing content to ReactMarkdown. A simple regex trim before rendering.

---

## 2. Render the CTA (Call-to-Action) section

**Problem:** Each blog post has CTA fields (`cta_headline`, `cta_description`, `cta_button_text`, `cta_url`) stored in the database, but these are never rendered. The current article has a CTA ready: "Start Managing Your Money Smarter" linking to the app.

**Fix in `BlogArticle.tsx`:** Add a styled CTA banner between the article content and the share buttons. It should display `cta_headline`, `cta_description`, and a button linking to `cta_url`. Use the app's primary color for emphasis -- a card with a primary-tinted background, bold headline, description text, and a prominent button.

**Update the `BlogPost` interface** to include `cta_headline`, `cta_description`, `cta_button_text`, and `cta_url`.

---

## 3. Improve blockquote styling

**Problem:** Blockquotes in the article (used for key callouts like "The absolute minimum amount you need to survive monthly") blend in too much with regular text. They need more visual distinction.

**Fix in `ArticleContent.tsx`:** Add stronger blockquote styling:
- Add a subtle primary-tinted background (`prose-blockquote:bg-primary/5`)
- Add padding and rounded corners (`prose-blockquote:pl-6 prose-blockquote:py-4 prose-blockquote:rounded-lg`)
- Make blockquote text slightly italic for emphasis

---

## 4. Add a progress reading bar

**Problem:** The article is long (6 min read) with no visual indicator of reading progress.

**Fix in `BlogArticle.tsx`:** Add a thin fixed progress bar at the very top of the page (below the sticky header) that fills as the user scrolls. Uses a simple scroll event listener calculating `scrollTop / (scrollHeight - clientHeight)`. Styled as a 3px tall primary-colored bar.

---

## 5. Add "Back to top" button

**Problem:** After scrolling through a long article, there's no quick way to return to the top.

**Fix in `BlogArticle.tsx`:** Add a floating "Back to top" button (small circular button with an arrow-up icon) that appears after scrolling past the first screen. Fixed position in the bottom-right corner, smooth-scrolls to top on click.

---

## Technical Details

### Files modified
| File | Change |
|------|--------|
| `src/components/blog/ArticleContent.tsx` | Strip SEO metadata from content; improve blockquote styles |
| `src/pages/BlogArticle.tsx` | Add CTA section, reading progress bar, back-to-top button; update BlogPost interface |

### No new dependencies required
All changes use existing packages and browser APIs (scroll events, `window.scrollTo`).

