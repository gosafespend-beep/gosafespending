import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

/*
 * The wildcard stays here on purpose, unlike the other functions in this
 * project, which were moved to an origin allow-list.
 *
 * This serves a sitemap: a public document whose entire job is to be fetched by
 * anyone, mostly by crawlers that ignore CORS because they are not browsers.
 * An allow-list would protect nothing -- the content is public by definition --
 * while adding a way for the thing to break.
 *
 * Worth knowing: nothing currently calls this. The sitemap served at
 * /sitemap.xml is generated at build time by scripts/routes.mts, which is what
 * produces the 24 URLs live today. This function is very likely dead, and is
 * left in place rather than deleted because that is a separate decision from
 * the CORS work.
 */
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const SITE_URL = "https://gosafespend.com";
const TODAY = new Date().toISOString().split("T")[0];

const staticPages = [
  { loc: "/", changefreq: "weekly", priority: "1.0" },
  { loc: "/about", changefreq: "monthly", priority: "0.7" },
  { loc: "/blog", changefreq: "weekly", priority: "0.7" },
  { loc: "/contact", changefreq: "monthly", priority: "0.8" },
  { loc: "/tools/budget-calculator", changefreq: "monthly", priority: "0.8" },
  { loc: "/tools/compound-interest-calculator", changefreq: "monthly", priority: "0.8" },
  { loc: "/tools/debt-payoff-calculator", changefreq: "monthly", priority: "0.8" },
  { loc: "/tools/emergency-fund-calculator", changefreq: "monthly", priority: "0.8" },
  { loc: "/privacy-policy", changefreq: "yearly", priority: "0.3" },
  { loc: "/terms-of-service", changefreq: "yearly", priority: "0.3" },
  { loc: "/cookies-policy", changefreq: "yearly", priority: "0.3" },
  { loc: "/refund-policy", changefreq: "yearly", priority: "0.3" },
];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch all published blog posts
    const { data: posts, error } = await supabase
      .from("blog_posts")
      .select("slug, updated_at, published_at")
      .eq("is_published", true)
      .order("published_at", { ascending: false });

    if (error) {
      console.error("Error fetching blog posts:", error);
    }

    // Build XML
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // Static pages
    // Static pages: no <lastmod> — a build/request timestamp is not a
    // page-specific change date and misleads crawlers.
    for (const page of staticPages) {
      xml += `  <url>\n`;
      xml += `    <loc>${SITE_URL}${page.loc === "/" ? "" : page.loc}</loc>\n`;
      xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
      xml += `    <priority>${page.priority}</priority>\n`;
      xml += `  </url>\n`;
    }

    // Dynamic blog posts
    if (posts && posts.length > 0) {
      for (const post of posts) {
        const lastmod = (post.updated_at || post.published_at || TODAY).split("T")[0];
        xml += `  <url>\n`;
        xml += `    <loc>${SITE_URL}/blog/${post.slug}</loc>\n`;
        xml += `    <lastmod>${lastmod}</lastmod>\n`;
        xml += `    <changefreq>monthly</changefreq>\n`;
        xml += `    <priority>0.6</priority>\n`;
        xml += `  </url>\n`;
      }
    }

    xml += `</urlset>`;

    return new Response(xml, {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (err) {
    console.error("Sitemap generation error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
});
