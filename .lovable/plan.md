

# Dynamic Blog System (CMS via Supabase)

## Why CMS over Hardcoded?

For your use case, a database-driven blog is clearly the right choice:

| Factor | Hardcoded (MDX/TSX) | CMS (Supabase DB) |
|--------|---------------------|---------------------|
| Adding articles | Requires code deploy | Admin panel, instant |
| Non-dev authors | Cannot contribute | Full access via admin |
| Scalability | Slower as files grow | Handles thousands |
| SEO control | Manual per file | Dynamic meta from DB |
| Content updates | Git commit needed | Edit live, no deploy |
| Already have admin? | Redundant | Perfect fit |

Since you already have an admin panel in a separate app connected to the same Supabase project, the CMS approach lets you write/edit/publish articles from the admin panel and this landing site simply reads and renders them.

---

## Architecture Overview

```text
Admin Panel App                    Landing Site (this app)
+-----------------------+          +---------------------------+
| Blog Editor Form      |          | /blog         (list page) |
| - Title, slug, body   |  -----> | /blog/:slug   (article)   |
| - Featured image      | Supabase| - Reads from blog_posts   |
| - SEO fields          |   DB    | - Renders markdown/HTML   |
| - Publish toggle      |          | - Dynamic SEO meta        |
+-----------------------+          +---------------------------+
```

---

## Implementation Plan

### Step 1: Create `blog_posts` Table (Migration)

New Supabase table with all fields needed for SEO-rich articles:

- `id` (uuid, PK)
- `title` (text, required) -- article headline
- `slug` (text, unique, required) -- URL-friendly identifier
- `excerpt` (text) -- 150-160 char meta description
- `content` (text) -- full article body in Markdown or HTML
- `featured_image` (text, nullable) -- URL to hero image
- `author_name` (text, default 'Safe Spend Team')
- `category` (text, nullable) -- e.g., "Budgeting", "Saving"
- `tags` (text[], default '{}') -- for filtering/related posts
- `is_published` (boolean, default false) -- draft vs live
- `published_at` (timestamptz, nullable) -- when it went live
- `meta_title` (text, nullable) -- custom SEO title override
- `meta_description` (text, nullable) -- custom meta description override
- `reading_time_minutes` (integer, default 5)
- `created_at` / `updated_at` (timestamptz)

RLS Policies:
- **SELECT**: Anyone can read where `is_published = true` (public blog)
- **INSERT/UPDATE/DELETE**: Admin only (`has_role(auth.uid(), 'admin')`)

### Step 2: Create Blog List Page (`/blog`)

Replace the current "Coming Soon" placeholder with a dynamic page that:

- Fetches all published posts ordered by `published_at DESC`
- Displays a grid of article cards (featured image, title, excerpt, date, category, reading time)
- Includes a category filter bar
- Shows a loading skeleton while fetching
- Falls back to a "No articles yet" state if empty
- Proper SEO with `ArticleList` schema

### Step 3: Create Blog Article Page (`/blog/:slug`)

New route and page component:

- Fetches single post by `slug` where `is_published = true`
- Renders markdown content (using a lightweight markdown renderer)
- Full SEO: dynamic `<title>`, `meta description`, `og:type = "article"`, `article:published_time`
- Structured data: `Article` JSON-LD schema with author, datePublished, image
- Related posts section at bottom (same category)
- Share buttons (Twitter, copy link)
- 404 handling for invalid slugs
- Breadcrumbs: Home > Blog > Article Title

### Step 4: Update Routing (`App.tsx`)

- Add `/blog/:slug` route for individual articles
- Keep `/blog` for the listing page

### Step 5: Update SEO Infrastructure

- `SEOHead.tsx`: Handle dynamic article metadata (title, description, image, type="article")
- `BreadcrumbSchema.tsx`: Support dynamic blog post breadcrumbs
- New `BlogArticleSchema.tsx`: `Article` JSON-LD for individual posts
- `sitemap.xml`: Note that a static sitemap won't auto-update; consider adding a dynamic sitemap edge function later

### Step 6: Add Markdown Rendering

Install a lightweight markdown-to-HTML library. Options:
- `react-markdown` with `remark-gfm` -- most popular, supports GitHub-flavored markdown
- This allows the admin panel to store content as Markdown, which renders beautifully on the frontend

---

## New Dependencies

- `react-markdown` -- render Markdown content
- `remark-gfm` -- GitHub-flavored Markdown support (tables, strikethrough, etc.)

## Files to Create

| File | Purpose |
|------|---------|
| `supabase/migrations/create_blog_posts.sql` | Database table + RLS |
| `src/pages/BlogList.tsx` | Blog listing page |
| `src/pages/BlogArticle.tsx` | Individual article page |
| `src/components/blog/BlogCard.tsx` | Article preview card |
| `src/components/blog/BlogFilters.tsx` | Category filter bar |
| `src/components/blog/ArticleContent.tsx` | Markdown renderer + styling |
| `src/components/blog/RelatedPosts.tsx` | Related articles section |
| `src/components/blog/ShareButtons.tsx` | Social share buttons |
| `src/components/seo/BlogArticleSchema.tsx` | Article JSON-LD |

## Files to Modify

| File | Changes |
|------|---------|
| `src/pages/Blog.tsx` | Replace placeholder with BlogList |
| `src/App.tsx` | Add `/blog/:slug` route |
| `src/components/seo/SEOHead.tsx` | Support dynamic article meta |
| `src/components/seo/BreadcrumbSchema.tsx` | Dynamic blog breadcrumbs |
| `src/components/seo/VisualBreadcrumbs.tsx` | Dynamic blog breadcrumbs |
| `public/sitemap.xml` | Note: static for now |

---

## Content Strategy Note

Once this is built, you can create your first article from the admin panel. A strong first article for SEO would be something like:

**"The 50/30/20 Budget Rule: A Complete Guide to Managing Your Money"**
- Targets high-volume keyword ("50/30/20 rule")
- Links to your Budget Calculator tool (internal linking)
- Establishes topical authority in personal finance
- ~1,500-2,000 words for comprehensive coverage

