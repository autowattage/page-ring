// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import mdx from "@astrojs/mdx";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  output: "server",
  site: `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`,

  vite: {
    plugins: [tailwindcss()],
    server: {
      cors: { preflightContinue: true },
    },
  },

  adapter: vercel(),

  integrations: [mdx()],

  markdown: {
    shikiConfig: {
      theme: "catppuccin-latte",
    },
  },
});
