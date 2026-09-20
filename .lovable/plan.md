# Fix the missing blog cover images

## What's wrong

14 of the 26 published articles have a cover file that isn't an image at all. The stored files end in `.jpg`, but their contents are a saved web page (HTML), so every browser shows an empty grey box instead of a picture. Confirmed by downloading the files directly: 14 come back as HTML, the rest are real images.

Affected articles (all published):

- beginners-guide-investing-stocks-2026
- how-to-start-retirement-fund-20s-30s
- top-5-low-risk-investments-2026
- cryptocurrency-beginners-guide-2026
- pay-off-student-loans-faster
- credit-score-mastery-build-repair-maximize
- smart-ways-refinance-debt-2026
- side-hustle-ideas-that-work-2026
- travel-smart-without-breaking-the-bank
- financial-minimalism-spend-less-live-more
- build-10000-emergency-fund-quickly
- ultimate-guide-retirement-savings-2026
- protect-money-times-of-inflation
- beginners-guide-real-estate-investing

Nothing is wrong with the blog code — it points at exactly the files that were uploaded.

## The fix

1. Create 14 new cover images, one per article, matching each topic (investing, retirement, credit, debt, travel, real estate, and so on).
2. Keep them consistent with the site: dark background, teal accent, clean illustrated style, same 3:2 shape as the existing good covers, so the blog grid looks uniform.
3. Replace the broken cover link on each of the 14 articles with the new image.
4. Reload the live blog page and confirm all 26 cards show a picture, and open two articles to confirm the header image and the social-share preview both work.

## Technical notes

- Covers generated at 1200x800, saved as JPEG, and published through the project's CDN asset pipeline (`lovable-assets`), which gives each a stable permanent URL.
- A single migration updates `blog_posts.featured_image` for the 14 affected slugs. `og_image` is left as-is; article sharing already falls back to `featured_image`.
- The broken objects in the `blog-images` storage bucket are left in place — no other content points at them, and removing them is not needed for the fix.
- Verification via Playwright against the live site, asserting `naturalWidth > 0` for every `img` in the blog grid.
