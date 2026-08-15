import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    // supabase/ is included so the edge-function escaping and validation
    // helpers are covered -- they guard a security boundary and were
    // previously outside the test glob entirely.
    include: [
      "src/**/*.{test,spec}.{ts,tsx}",
      "supabase/**/*.{test,spec}.{ts,tsx}",
    ],
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});
