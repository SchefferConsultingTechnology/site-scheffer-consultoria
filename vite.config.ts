// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { existsSync } from "node:fs";
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// `.dev.vars` is a Wrangler/Cloudflare convention for local secrets (RESEND_API_KEY, etc.).
// Plain `vite dev` doesn't read it on its own — only Wrangler/the Cloudflare Vite plugin do —
// so load it into process.env ourselves for local server functions to see it.
if (existsSync(".dev.vars")) {
  process.loadEnvFile(".dev.vars");
}

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
