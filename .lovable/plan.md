

# Fix OG Image Caching Issue

## Problem
The new OG image is correctly deployed to `https://gosafespend.com/og-image.png`, but social media platforms are displaying cached versions of the old image.

## Solution Overview
Add a cache-busting query parameter to all OG image URLs, forcing social platforms to fetch the new image.

---

## Implementation Steps

### Step 1: Update index.html
Update the static OG image references to include a version parameter.

**File:** `index.html`

- Line 28: Change `og-image.png` to `og-image.png?v=2`
- Line 35: Change `og-image.png` to `og-image.png?v=2`

```html
<!-- Open Graph -->
<meta property="og:image" content="https://gosafespend.com/og-image.png?v=2" />

<!-- Twitter -->
<meta name="twitter:image" content="https://gosafespend.com/og-image.png?v=2" />
```

### Step 2: Update SEOHead.tsx
Update the dynamic OG image default to use the versioned URL.

**File:** `src/components/seo/SEOHead.tsx`

- Line 13: Update `DEFAULT_IMAGE` constant

```typescript
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png?v=2`;
```

---

## Post-Implementation Verification

After publishing, manually clear platform caches using these tools:

| Platform | Debug Tool URL |
|----------|----------------|
| Facebook | https://developers.facebook.com/tools/debug/ |
| X/Twitter | https://cards-dev.x.com/validator |
| LinkedIn | https://www.linkedin.com/post-inspector/ |

For each tool:
1. Enter `https://gosafespend.com`
2. Click the refresh/scrape button
3. Verify the new image appears

---

## Technical Details

**Why this works:**
- Social platforms cache images based on the full URL including query parameters
- Adding `?v=2` makes it a "new" URL that has never been cached
- Future image updates can increment to `?v=3`, `?v=4`, etc.

**Files modified:**
1. `index.html` — 2 line changes (og:image, twitter:image)
2. `src/components/seo/SEOHead.tsx` — 1 line change (DEFAULT_IMAGE constant)

