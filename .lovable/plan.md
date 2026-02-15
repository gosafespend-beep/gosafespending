

# Blog UI/UX Audit -- 10/10 Plan

## Current State

After reviewing the blog list page and article page, here's what's working well and what needs fixing.

### What's Good
- Blog list grid layout is clean with proper cards
- Category filters work well
- Featured images render correctly
- Reading progress bar and back-to-top button are functional
- CTA section is now compact and well-positioned

---

## Issues Found

### 1. Related Articles links are underlined (Critical)

The "Continue Reading" section shows underlined, link-colored titles and excerpts. This happens because the entire article page content sits inside a `prose prose-invert` container (from `LegalLayout.tsx` line 42), which auto-styles all `<a>` tags with underlines.

**Fix:** Add `no-underline` and hover color styling to the Related Posts links in `RelatedPosts.tsx` to override the prose defaults.

### 2. Share buttons only offer Twitter and Copy Link

Missing LinkedIn and Facebook -- two of the most common sharing channels for financial content.

**Fix:** Add LinkedIn and Facebook share buttons in `ShareButtons.tsx`.

### 3. No visual separator between article body and CTA

The CTA blends into the article text without clear visual breathing room.

**Fix:** Add a subtle top border or extra margin above the CTA in `BlogArticle.tsx`.

### 4. "Back to Blog" link is underlined

The back navigation link at the top of articles also inherits prose underline styling.

**Fix:** The link already has explicit styling but it's inside the prose container. Add `no-underline` class.

### 5. Related Articles section could show more posts

Currently fetching up to 4 but only 2 show for the "Saving" category. The fallback logic works but 4 related articles would provide better engagement.

**Fix:** Already fetching 4 -- this is a data issue, not a code issue. No change needed.

---

## Technical Changes

### File: `src/components/blog/RelatedPosts.tsx`
- Add `no-underline` to all Link elements to prevent prose underline inheritance
- Add `[&_*]:no-underline` to ensure child elements are also unstyled

### File: `src/components/blog/ShareButtons.tsx`
- Add LinkedIn share button using `https://www.linkedin.com/sharing/share-offsite/?url=`
- Add Facebook share button using `https://www.facebook.com/sharer/sharer.php?u=`

### File: `src/pages/BlogArticle.tsx`
- Add `no-underline` to the "Back to Blog" Link to override prose defaults
- Add slightly more spacing above the CTA section for better visual separation

### No new dependencies required

All changes use existing packages and native browser APIs.

