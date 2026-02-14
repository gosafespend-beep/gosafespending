

# Fix Blog Article Styling

## Problem
The blog articles appear unstyled because the `@tailwindcss/typography` plugin is installed in `package.json` but **not registered** in `tailwind.config.ts`. The `prose` classes used in `ArticleContent.tsx` (e.g., `prose`, `prose-invert`, `prose-lg`, `prose-headings:...`) do nothing without the plugin being active.

## Fix
A single-line change in `tailwind.config.ts`:

### Update `tailwind.config.ts`
Add `require("@tailwindcss/typography")` to the plugins array alongside the existing `tailwindcss-animate` plugin.

**Before:**
```
plugins: [require("tailwindcss-animate")]
```

**After:**
```
plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")]
```

This will immediately activate all the `prose-*` classes already defined in `ArticleContent.tsx`, giving blog articles proper heading sizes, paragraph spacing, list styling, blockquote formatting, code blocks, and more -- with no other file changes needed.

