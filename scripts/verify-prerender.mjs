/**
 * Asserts the prerendered output is actually usable to a crawler that runs no
 * JavaScript.
 *
 * A build can "succeed" while producing pages that are empty shells, or that
 * all claim the same canonical, or that contain only a Suspense fallback
 * because a lazy chunk hadn't resolved when the snapshot was taken. Each of
 * those silently undoes the SEO work, and none is visible in the build log.
 */

import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const dist = join(process.cwd(), "dist");
const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };

const read = (route) => {
  const path = join(dist, route === "/" ? "index.html" : `${route}/index.html`);
  return existsSync(path) ? readFileSync(path, "utf-8") : null;
};

const REQUIRED = [
  { route: "/", mustContain: "never asks for your bank login", canonical: "https://gosafespend.com" },
  { route: "/tools/budget-calculator", mustContain: "50/30/20", canonical: "https://gosafespend.com/tools/budget-calculator" },
  { route: "/contact", mustContain: "Get in Touch", canonical: "https://gosafespend.com/contact" },
  { route: "/privacy-policy", mustContain: "Privacy", canonical: "https://gosafespend.com/privacy-policy" },
];

const titles = new Map();

for (const { route, mustContain, canonical } of REQUIRED) {
  const html = read(route);
  if (!html) { failures.push(`${route}: no prerendered file`); continue; }

  check(!html.includes('<div id="root"></div>'),
    `${route}: #root is empty — the page was not prerendered`);
  check(html.includes(mustContain),
    `${route}: expected body copy "${mustContain}" missing from static HTML`);

  const canon = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  check(canon === canonical,
    `${route}: canonical is "${canon}", expected "${canonical}"`);

  const title = html.match(/<title>([^<]*)<\/title>/)?.[1];
  check(Boolean(title), `${route}: no <title>`);
  if (title) {
    if (titles.has(title)) {
      failures.push(`${route}: shares its title with ${titles.get(title)} — metadata is not per-route`);
    }
    titles.set(title, route);
  }

  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  check(h1s === 1, `${route}: ${h1s} <h1> elements, expected exactly 1`);
}

// Blog articles are the pages prerendering matters most for, since their
// content lives in the database rather than the bundle.
const sitemap = existsSync(join(dist, "sitemap.xml"))
  ? readFileSync(join(dist, "sitemap.xml"), "utf-8")
  : "";
const articles = [...sitemap.matchAll(/<loc>https:\/\/gosafespend\.com(\/blog\/[^<]+)<\/loc>/g)].map((m) => m[1]);

if (articles.length === 0) {
  console.warn("[verify] no blog articles in sitemap — skipping article checks");
} else {
  const sample = articles[0];
  const html = read(sample);
  if (!html) {
    failures.push(`${sample}: article in sitemap but not prerendered`);
  } else {
    const words = html.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " ").split(/\s+/).length;
    check(words > 500, `${sample}: only ${words} words in static HTML — article body did not render`);
    check(/<meta property="og:type" content="article"/.test(html),
      `${sample}: og:type is not "article"`);
  }
}

if (failures.length) {
  console.error(`\n[verify] ${failures.length} prerender problem(s):`);
  for (const f of failures) console.error(`  ✗ ${f}`);
  process.exit(1);
}

console.log(`[verify] prerendered output OK (${REQUIRED.length} routes + ${articles.length} articles)`);
