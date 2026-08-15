import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { getAllRoutes } from "./scripts/routes.mts";

/*
 * Prerendering is opt-in via PRERENDER=true.
 *
 * Every route currently serves the same 2,802-byte shell with an empty #root
 * and a canonical hardcoded to the homepage, so any crawler that does not
 * execute JS sees no content and canonicalises every URL to "/". Prerendering
 * fixes crawlability, the canonical bug, soft-404s, social unfurls and first
 * paint together.
 *
 * It is gated behind a flag rather than always-on because it needs Puppeteer
 * in the build environment, which the current host may not provide. Leaving it
 * off keeps the existing pipeline working exactly as before; CI (or a
 * Cloudflare Pages build) sets PRERENDER=true.
 */
async function prerenderPlugin() {
  if (process.env.PRERENDER !== "true") return null;

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
