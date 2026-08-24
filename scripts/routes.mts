/**
 * The route list used for both prerendering and the sitemap, so the two can
 * never disagree.
 *
 * Blog slugs come from Supabase at build time. If that request fails the build
 * still succeeds with the static routes only -- a missing article in the
 * sitemap is recoverable, a failed deploy is not.
 */

export const STATIC_ROUTES = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.7" },
  { path: "/blog", changefreq: "weekly", priority: "0.8" },
  { path: "/contact", changefreq: "monthly", priority: "0.7" },
  { path: "/tools/budget-calculator", changefreq: "monthly", priority: "0.9" },
  { path: "/tools/compound-interest-calculator", changefreq: "monthly", priority: "0.9" },
  { path: "/tools/debt-payoff-calculator", changefreq: "monthly", priority: "0.9" },
  { path: "/tools/emergency-fund-calculator", changefreq: "monthly", priority: "0.9" },
  { path: "/privacy-policy", changefreq: "yearly", priority: "0.3" },
  { path: "/terms-of-service", changefreq: "yearly", priority: "0.3" },
  { path: "/cookies-policy", changefreq: "yearly", priority: "0.3" },
  { path: "/refund-policy", changefreq: "yearly", priority: "0.4" },
] as const;

export interface RouteEntry {
  path: string;
  changefreq: string;
  priority: string;
  lastmod?: string;
}

export async function getBlogRoutes(): Promise<RouteEntry[]> {
  /*
   * These fall back to literals for the same reason the GA measurement ID
   * does: both are public. The anon key ships in every client bundle by
   * design, and what protects the data is Row Level Security, not secrecy.
   *
   * Without the fallback this silently returned zero blog routes on hosts
   * that do not expose build-time env vars -- which is exactly what happened
   * on the first Lovable deploy. Articles were left unprerendered and absent
   * from the sitemap, with only a warning in a build log nobody reads.
   *
   * A real secret must never be handled this way.
   */
  const url =
    process.env.VITE_SUPABASE_URL ?? "https://qeogqvjqvafbzufanwki.supabase.co";
  const key =
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFlb2dxdmpxdmFmYnp1ZmFud2tpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2MTAwNDksImV4cCI6MjA4NTE4NjA0OX0.H84dCTVcdwBcmliqWDhfRK9cHMfAWSae1EfNj-oAyF8";

  if (!url || !key) {
    console.warn(
      "[routes] Supabase credentials missing — building without blog routes.",
    );
    return [];
  }

  try {
    const response = await fetch(
      `${url}/rest/v1/blog_posts?select=slug,updated_at,published_at&is_published=eq.true&order=published_at.desc`,
      { headers: { apikey: key, Authorization: `Bearer ${key}` } },
    );

    if (!response.ok) {
      console.warn(`[routes] blog_posts request failed: ${response.status}`);
      return [];
    }

    const posts = (await response.json()) as Array<{
      slug: string;
      updated_at: string | null;
      published_at: string | null;
    }>;

    console.log(`[routes] discovered ${posts.length} published articles`);

    return posts.map((post) => ({
      path: `/blog/${post.slug}`,
      changefreq: "monthly",
      priority: "0.7",
      lastmod: (post.updated_at ?? post.published_at ?? "").slice(0, 10) || undefined,
    }));
  } catch (error) {
    console.warn("[routes] blog route discovery failed:", error);
    return [];
  }
}

export async function getAllRoutes(): Promise<RouteEntry[]> {
  /*
   * Static routes deliberately carry no <lastmod>. It used to be the build
   * date, which told crawlers every page changed on every deploy — a
   * non-page-specific fallback that devalues the signal. Omitting it is
   * valid sitemap XML; blog entries still carry a real updated_at.
   */
  const statics: RouteEntry[] = STATIC_ROUTES.map((route) => ({ ...route }));
  return [...statics, ...(await getBlogRoutes())];
}
