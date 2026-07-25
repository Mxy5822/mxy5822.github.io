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
