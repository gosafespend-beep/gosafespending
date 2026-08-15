/**
 * Generates dist/sitemap.xml after the build.
 *
 * There used to be two sitemaps: a static public/sitemap.xml listing 12 URLs
 * with no blog articles and every lastmod frozen at 2026-02-14, plus an edge
 * function returning 24 URLs including the articles. Both were declared in
 * robots.txt, so whichever was submitted to Search Console decided whether the
 * entire content investment was visible to Google -- and the conventional path
 * was the one that hid it.
 *
 * Generating here removes the runtime dependency and reuses the same route
 * list as prerendering, so the two cannot drift.
 */

import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { getAllRoutes } from "./routes.mts";

const BASE_URL = "https://gosafespend.com";

const routes = await getAllRoutes();

const body = routes
  .map((route) => {
    const loc = `${BASE_URL}${route.path === "/" ? "/" : route.path}`;
    return [
      "  <url>",
      `    <loc>${loc}</loc>`,
      route.lastmod ? `    <lastmod>${route.lastmod}</lastmod>` : null,
      `    <changefreq>${route.changefreq}</changefreq>`,
      `    <priority>${route.priority}</priority>`,
      "  </url>",
    ]
      .filter(Boolean)
      .join("\n");
  })
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;

const outputPath = resolve(process.cwd(), "dist", "sitemap.xml");
writeFileSync(outputPath, xml, "utf-8");
console.log(`[sitemap] wrote ${routes.length} URLs to ${outputPath}`);
