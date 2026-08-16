import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { getAllRoutes } from "./scripts/routes.mts";

/*
 * Prerendering: on by default, degrades instead of failing.
 *
 * Without it every route serves the same 2,802-byte shell with an empty #root
 * and a canonical hardcoded to the homepage, so any crawler that does not
 * execute JS sees no content and canonicalises every URL to "/". Prerendering
 * fixes crawlability, the canonical bug, soft-404s, social unfurls and first
 * paint together, which makes it the highest-leverage build step here.
 *
 * It needs Puppeteer, which not every build environment provides. Rather than
 * gate it behind a flag nobody remembers to set, it attempts to load and warns
 * loudly if it cannot -- so a host without Puppeteer still produces a working
 * (if unprerendered) build instead of a red pipeline.
 *
 * Set PRERENDER=false to skip it deliberately, or PRERENDER_REQUIRED=true to
 * make an unprerendered build a hard error (recommended in CI, so the SEO work
 * cannot silently regress).
 */
async function prerenderPlugin() {
  if (process.env.PRERENDER === "false") {
    console.log("[prerender] skipped (PRERENDER=false)");
    return null;
  }

  try {
    const [{ default: prerender }, { default: puppeteerRenderer }] =
      await Promise.all([
        import("@prerenderer/rollup-plugin"),
        import("@prerenderer/renderer-puppeteer"),
      ]);

    const routes = (await getAllRoutes()).map((route) => route.path);
    console.log(`[prerender] rendering ${routes.length} routes`);

    return prerender({
      routes,
      renderer: puppeteerRenderer,
      rendererOptions: {
        // Long enough for lazy route chunks to resolve their Suspense
        // boundaries -- otherwise prerendered pages contain only the fallback.
        renderAfterTime: 2500,
        maxConcurrentRoutes: 4,
        launchOptions: { args: ["--no-sandbox", "--disable-setuid-sandbox"] },
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (process.env.PRERENDER_REQUIRED === "true") {
      throw new Error(`[prerender] required but unavailable: ${message}`);
    }
    console.warn(
      `\n[prerender] UNAVAILABLE -- building without it: ${message}\n` +
        "[prerender] Pages will serve an empty shell to crawlers that do not " +
        "run JS.\n[prerender] See DEPLOYMENT.md for the Cloudflare Worker " +
        "fallback.\n",
    );
    return null;
  }
}

export default defineConfig(async ({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    mode !== "development" && (await prerenderPlugin()),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Split the heavy vendors so a homepage visitor does not pay for the
        // charting and markdown libraries used only on other routes.
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          motion: ["framer-motion"],
          charts: ["recharts"],
          markdown: ["react-markdown", "remark-gfm"],
        },
      },
    },
  },
}));
