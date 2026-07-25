# S1b — Path routing, per-slug share shells, a11y

> Written for builder-subagent execution; if something doesn't match, STOP and report rather than guess.
> Repo: `C:\Agent Projects\portfolio-rpg`. Branch: `feat/s1b-routing-shells` off `origin/main` (AFTER S1a is merged).
> Commit identity: `yovanmc <yovanmc@users.noreply.github.com>`.
> NO prose changes. Adding a `slug` metadata field to content items is allowed (mechanical metadata, not prose).
> Why shells exist: link-preview crawlers don't execute JS and hash fragments never reach the server — per-page previews REQUIRE a static HTML file per route with its own og tags.

## Task 1 — Slugs in the content model

File `src/content.ts`:
1. In `interface Item` (fields at lines ~17–38), add after `title: string;`:
   ```ts
     /** stable URL segment for routing + static share shells (S1b); never derived from title at runtime */
     slug?: string;
   ```
2. Add a `slug` line immediately after each `title:` line, exactly these values (current line refs):
   - `title: "MIA"` (~57) → `slug: "mia",`
   - `title: "Backend-harness"` (~81) → `slug: "backend-harness",`
   - `title: "The failure that left no logs"` (~94) → `slug: "the-failure-that-left-no-logs",`
   - `title: "Observability by default"` (~106) → `slug: "observability-by-default",`
   - `title: "notification-dispatch"` (~118) → `slug: "notification-dispatch",`
   - `title: "VideoTriage"` (~130) → `slug: "videotriage",`
   - `title: "AudioShelf"` (~142) → `slug: "audioshelf",`
   - `title: "MangaReader"` (~154) → `slug: "mangareader",`
   - `title: "VideoShelf"` (~166) → `slug: "videoshelf",`
   - `title: "Software Engineer"` (~186, experience) → `slug: "software-engineer",`
   Contact items get NO slug. Touch nothing else in this file.

## Task 2 — Router module

New file `src/router.ts`:

```ts
import { CATS } from "./content";
import type { PageRef } from "./components/CaseStudyPage";

/** /work/<slug>/ for projects, /experience/<slug>/ for experience. Trailing slash canonical (matches the static shell directories GitHub Pages serves). */
export function pathForPage(p: PageRef): string {
  const cat = CATS[p.ri];
  const item = cat?.items[p.si];
  if (!cat || !item || !item.slug) return "/";
  const prefix = cat.key === "experience" ? "/experience/" : "/work/";
  return prefix + item.slug + "/";
}

export function pageForPath(pathname: string): PageRef | null {
  const m = pathname.match(/^\/(work|experience)\/([a-z0-9-]+)\/?$/);
  if (!m) return null;
  const wantKey = m[1] === "experience" ? "experience" : "projects";
  for (let ri = 0; ri < CATS.length; ri++) {
    if (CATS[ri].key !== wantKey) continue;
    const si = CATS[ri].items.findIndex((it) => it.slug === m[2]);
    if (si >= 0) return { ri, si };
  }
  return null;
}
```

## Task 3 — Wire history into App.tsx

All edits in `src/App.tsx`:
1. Add import: `import { pathForPage, pageForPath } from "./router";`
2. In `openPage` (lines ~114–121), after `setPage({ ri, si });` add:
   ```tsx
       const path = pathForPage({ ri, si });
       if (path !== "/" && window.location.pathname !== path) window.history.pushState({ page: true }, "", path);
   ```
3. In `closePage` (~123–126) and in `back()`'s `if (s.page)` branch (~131–133), after `setPage(null);` add:
   ```tsx
       if (window.location.pathname !== "/") window.history.pushState(null, "", "/");
   ```
4. New mount effect (place after the existing keyboard/resize effect, ~217):
   ```tsx
     // deep-link entry + browser Back/Forward
     useEffect(() => {
       const initial = pageForPath(window.location.pathname);
       if (initial) {
         setBooted(true);
         setRootIdx(initial.ri);
         setSubIdx(initial.si);
         setPage(initial);
       }
       const onPop = () => {
         const p = pageForPath(window.location.pathname);
         setPage(p);
         if (p) {
           setBooted(true);
           setRootIdx(p.ri);
           setSubIdx(p.si);
         }
       };
       window.addEventListener("popstate", onPop);
       return () => window.removeEventListener("popstate", onPop);
       // eslint-disable-next-line react-hooks/exhaustive-deps
     }, []);
   ```

## Task 4 — Share shells at build time (Vite plugin)

1. Replace `vite.config.ts` with:

```ts
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
      if (count !== 10) this.error(`share-shells: expected 10 shells, wrote ${count} — slugs out of sync`);
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), shareShells()],
});
```

Notes for the builder: Vite loads its config via esbuild, so importing `./src/content` (pure data, no vite-specific imports) works. **Expected `tsc -b` failure (reproduced on a scratch build during the critique gate): `Cannot find module 'node:fs'` / `Cannot find name '__dirname'` — the repo has NO `@types/node`. The sanctioned fix (do it, don't stop): `npm i -D @types/node`, and add `"types": ["node"]` to `tsconfig.node.json`'s compilerOptions.** If a project-boundary error about importing `src/content.ts` ALSO appears, add `"src/content.ts"` to `tsconfig.node.json`'s `include`. If errors persist beyond those two fixes, STOP and report rather than restructuring.
The root-shell description sentence above is metadata I(orchestrator)-authored and OWNER-VISIBLE on shares — flag it in the PR description for the owner to veto (it is not case-study prose; it mirrors his site hero line).

2. `public/404.html` (new file) — unknown paths bounce home:

```html
<!doctype html>
<meta charset="utf-8" />
<title>Yovan — Backend Software Engineer</title>
<script>location.replace("/");</script>
```

3. `public/og-station.png` (new asset): rasterize the approved Station render once at share-card size:
   `& "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --headless --disable-gpu --virtual-time-budget=8000 --screenshot="C:\Agent Projects\portfolio-rpg\public\og-station.png" --window-size=1200,630 "file:///C:/Agent Projects/yovanmc.github.io/design_handoff_portfolio/station-loop/station-PASS-v2.html"`
   Then dispatch a `haiku` subagent to Read it and confirm (text verdict): stained-glass medallion visible and centered-ish, no blank/white frame, no personal info. If the render is off-center at 1200×630, retry with `--window-size=1260,660` and report which was used.

## Task 5 — a11y

1. `src/App.tsx`: add `role="button"` and `aria-label` to clickable divs: desktop root rows (~535), submenu rows (~595), submenu Back (~609), mobile sheet close (~661), mobile sheet rows (~684), mobile tabs (~748), detail-panel CTA (~479). Pattern: `role="button"` + `aria-label={...}` where the visible text isn't already the full label (rows whose text is visible need only `role`). Do not add tabIndex to rows (keyboard nav is the global arrow-key handler; adding 30 tab stops would fight it) — EXCEPT the mobile sheet close button: `tabIndex={0}`.
2. `src/components/CaseStudyPage.tsx`: give the overlay container `role="dialog"`, `aria-modal="true"`, `aria-label={item?.title ?? "Case study"}`, `tabIndex={-1}`, and a ref; add an effect: when `page` becomes non-null, store `document.activeElement`, call `ref.current?.focus()`; when it becomes null, restore focus to the stored element. (Escape already closes via App's global handler.)

## Verification (before PR)

1. `npm ci && npm run build` — exit 0 AND the build log contains `share-shells: wrote 10 shells`.
2. Static checks (no server needed):
   - `Select-String -Path dist\work\mia\index.html -Pattern 'og:title'` → shows `MIA — Yovan`.
   - `dist\experience\software-engineer\index.html` exists; `dist\404.html` exists; `dist\og-station.png` exists.
   - Root `dist\index.html` contains `og:image`.
3. `npm run preview` → headless-Edge capture of `http://localhost:<port>/work/mia/` — subagent (haiku) verdict: the MIA case-study overlay is open on load (deep link works cold). Second capture of `/` after pressing nothing — hero idle renders.
4. Interactive routing check (headless can't click): run `npx vite` dev server and use the preview tools if available, else verify by code review that popstate/pushState paths are exercised by the mount effect test above; note in the PR what was and wasn't runtime-verified (hard rule 2).
5. Kill any server PIDs you started.

## Ship

Commit `feat: path routing, per-slug share shells, dialog a11y` (+ trailer), push, PR, merge when clean (if self-merge is denied, report PR URL and stop), sync main. Post-merge after Pages deploys: `curl -s https://yovanmc.github.io/work/mia/ | Select-String 'og:title'` must show MIA; paste the output in the final report. Update `ROADMAP.md` (flip S1b → ✅ with PR #; hygiene pass) via the PR flow.
