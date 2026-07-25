# S1a — Visual & copy fixes

> Written for builder-subagent execution; if something doesn't match, STOP and report rather than guess.
> Repo: `C:\Agent Projects\portfolio-rpg` (origin = yovanmc/yovanmc.github.io; Pages deploys from main).
> Branch: `feat/s1a-visual-copy` off `origin/main`. Commit identity: `yovanmc <yovanmc@users.noreply.github.com>` (global config already set). NO prose changes to case-study content — this plan touches zero owner-voice text.

## Task 1 — Turn the Station hero on

File `src/App.tsx`. Replace lines 11–14:

```tsx
// The KH stained-glass Station hero is temporarily hidden while the design is
// reworked. The component (and its scrim) stay intact — flip this to true to
// bring it back.
const SHOW_STATION = false;
```

with:

```tsx
// The KH stained-glass Station hero (design LOCKED — see README). The scrim at
// the hero block renders only when this is on.
const SHOW_STATION = true;
```

No other wiring is needed (verified: the only uses are `App.tsx:270` render and `:289` scrim, both `SHOW_STATION &&`).

## Task 2 — Fix the mobile command-bar clip at 390px

File `src/App.tsx`, mobile command bar tabs (lines ~745–774). Mechanism of the bug: each tab is `flex: 1` (default `min-width: auto`) with an unconstrained 16px Marcellus label — at 390px the row overflows and the last tab ("Contact") clips off-screen (observed in live render).

In the tab `<div>` style object (currently starting `flex: 1, display: "flex", flexDirection: "column", ...` at ~754), add one property:

```tsx
                minWidth: 0,
```

In the label span (line ~771), replace:

```tsx
              <span style={{ fontFamily: SERIF, fontSize: "16px", color: "inherit" }}>{c.label}</span>
```

with:

```tsx
              <span
                style={{
                  fontFamily: SERIF,
                  fontSize: "15px",
                  color: "inherit",
                  maxWidth: "100%",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {c.label}
              </span>
```

## Task 3 — Fix the stale content.ts header comment

File `src/content.ts`, replace lines 1–8 (the block comment) with:

```ts
/**
 * Content model for the RPG command menu.
 *
 * ALL copy in this file is Yovan's own writing, confidentiality-reviewed
 * (carried over from the vetted Astro case studies, then extended). Do NOT
 * rewrite, re-tone, or "improve" any prose here — content changes go through
 * the owner. See docs/superpowers/specs/2026-07-02-spectacle-and-battle-design.md.
 */
```

## Task 4 — Fix the stale README status

File `README.md`:
- Line 25 (the `src/content.ts` table row): replace the bold trailing sentence `**Placeholder copy — replace with Yovan's real content before deploy.**` with `**Real, confidentiality-reviewed copy — owner-voice; do not edit prose without the owner.**`
- Lines 39–43 (`## Status` section): replace the paragraph so it reads:

```md
## Status

Live at https://yovanmc.github.io (GitHub Pages, deploys from main via
.github/workflows/deploy.yml). Hero (Station + name), desktop command menu,
detail panel, case-study overlay, mobile sheet + command bar,
keyboard/mouse/touch input, WebAudio blips. Content is real and
confidentiality-reviewed (owner-voice). Roadmap: ROADMAP.md.
```

(Exact surrounding text may differ slightly — preserve everything else in the file; only the stale claims change. If the section reads materially differently than described, STOP and report.)

## Task 5 — Align CI Node with the local toolchain floor

File `.github/workflows/deploy.yml` line 24: change `node-version: 24` to `node-version: 22`. (README pins Vite 5 for local Node 20.13; 22 is the current LTS line and closer to local — removes the "builds only ever tested on 24" skew. Vite 5 supports Node 18/20/22+.)

## Verification (before PR)

1. `npm ci && npm run build` — must exit 0 (run with minimal output).
2. `npm run preview` (serves dist on a local port; note the port it prints), then capture:
   - `& "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --headless --disable-gpu --virtual-time-budget=8000 --screenshot=<scratchpad>\s1a-desktop.png --window-size=1440,900 http://localhost:<port>/` (if that exe path fails, try `C:\Program Files\Microsoft\Edge\Application\msedge.exe`)
   - same with `--window-size=390,844` → `s1a-mobile.png`
3. Rasterize the approved Station reference once: same headless command against `file:///C:/Agent Projects/yovanmc.github.io/design_handoff_portfolio/station-loop/station-PASS-v2.html` → `station-ref.png`.
4. Dispatch a subagent (model `haiku`) to Read the three PNGs and return a TEXT verdict: (a) desktop shows a stained-glass medallion behind the "Yovan" hero matching the reference's design (same structure/palette; exact pixel match NOT required — scale/backdrop differ); (b) mobile at 390px shows all three tabs with "Contact" fully visible; (c) nothing else regressed (menu, starfield, hero text present). Act on the verdict; do NOT read the PNGs yourself into the orchestrating context.
5. Kill the preview server (the PID you started).

## Ship

Commit `feat: turn on Station hero, fix mobile tab clip, correct stale docs` (+ Claude trailer), push, `gh pr create --fill`, merge when clean (`gh pr merge --merge --delete-branch`; if the environment denies self-merge, report the PR URL and stop). Then `git switch main && git pull`. Post-merge: wait ~2 min for Pages deploy, spot-check `https://yovanmc.github.io` with one headless capture + subagent verdict (Station visible live). Update `ROADMAP.md`: flip S1a to `✅ Merged` with PR # and one-line summary; run the hygiene pass; commit via the same PR flow.
