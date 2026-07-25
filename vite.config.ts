import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { CATS } from "./src/content";

const SITE = "https://yovanmc.github.io";

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function ogBlock(title: string, desc: string, url: string): string {
  return [
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="Yovan — Backend Software Engineer" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(desc)}" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:image" content="${SITE}/og-station.png" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<link rel="canonical" href="${esc(url)}" />`,
  ].join("\n    ");
}

function shareShells(): Plugin {
  return {
    name: "share-shells",
    closeBundle() {
      const dist = resolve(__dirname, "dist");
      const base = readFileSync(resolve(dist, "index.html"), "utf8");
      let count = 0;
      for (const cat of CATS) {
        if (cat.key === "contact") continue;
        const prefix = cat.key === "experience" ? "experience" : "work";
        for (const item of cat.items) {
          if (!item.slug) continue;
          const url = `${SITE}/${prefix}/${item.slug}/`;
          const title = `${item.title} — Yovan`;
          const html = base
            .replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
            .replace(
              /<meta name="description"[^>]*\/>/,
              `<meta name="description" content="${esc(item.meta)}" />\n    ${ogBlock(title, item.meta, url)}`,
            );
          const dir = resolve(dist, prefix, item.slug);
          mkdirSync(dir, { recursive: true });
          writeFileSync(resolve(dir, "index.html"), html);
          count++;
        }
      }
      // root og block
      const rootUrl = `${SITE}/`;
      writeFileSync(
        resolve(dist, "index.html"),
        base.replace(
          /<meta name="description"[^>]*\/>/,
          `<meta name="description" content="Yovan — Backend Software Engineer. Portfolio." />\n    ${ogBlock("Yovan — Backend Software Engineer", "Reliable services at scale — case studies, tooling, and the systems behind them.", rootUrl)}`,
        ),
      );
      this.warn(`share-shells: wrote ${count} shells`);
      if (count !== 8) this.error(`share-shells: expected 8 shells, wrote ${count} — slugs out of sync`);
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), shareShells()],
});
