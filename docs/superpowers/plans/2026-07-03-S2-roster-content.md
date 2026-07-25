# S2 — Roster & content

> **Written for builder-subagent execution; if something doesn't match, STOP and report rather than guess.**
> All prose below is OWNER-APPROVED VERBATIM (interview 2026-07-03). Builders must not rewrite, re-punctuate, or "improve" any string — copy exactly. The owner approves the full `content.ts` diff before merge (hard spec constraint, no exceptions).

**Repo:** `C:\Agent Projects\portfolio-rpg` (github.com/yovanmc/yovanmc.github.io)
**Branch:** `s2-roster-content`
**Build:** `npm ci` (first time) · `npm run build` (tsc + vite). No test suite.
**Commit identity:** `yovanmc <yovanmc@users.noreply.github.com>` (verify `git config user.name` / `user.email` in-repo before first commit; set locally if missing — never `--author` overrides).

## Scope (owner-locked 2026-07-03)

1. Remove 4 superseded project entries: `videotriage`, `audioshelf`, `mangareader`, `videoshelf`.
2. Add **Curio** project entry (exact code below), appended after `notification-dispatch`.
3. Add **Arizona State University** experience entry (exact code below), after `Software Engineer`.
4. Replace three fields of the **Software Engineer** entry (exact strings below).
5. Punctuation sweep of remaining prose: 7 exact string replacements below (owner-approved). Rule being enforced: owner's voice uses NO em dashes, NO en dashes, NO semicolons in prose.
6. Update the og-shell count assertion in `vite.config.ts` from `10` to `8`.

**Explicitly OUT of scope:** Compass entry (owner declined 2026-07-03 — roster is now 6 projects + 1 future meta entry); any Dynatrace claim edits (owner decision 2026-07-03: claim stays verbatim in all three spots — `content.ts` lines with "Dynatrace invited" and the meta "shown to Dynatrace's guild" are NOT touched); the "Building this site" meta entry (that is S3b); repo links for Curio (gated on S4); any prose not quoted in this plan.

---

## Task 1 — content.ts: removals

File: `src/content.ts`. In the `projects` category `items` array, delete the four complete entry objects whose `slug` values are `"videotriage"`, `"audioshelf"`, `"mangareader"`, `"videoshelf"` (they are consecutive, after `notification-dispatch`, roughly lines 136–189 pre-edit). Delete each whole `{ ... },` object. Do not touch any other entry.

**Verify:** `npx tsc -b` passes (NOT `tsc --noEmit` — the root tsconfig is solution-style with `"files": []`, so bare `--noEmit` type-checks nothing and exits 0 even on broken code; verified empirically 2026-07-03); `Grep "videotriage|audioshelf|mangareader|videoshelf" src/` returns nothing.

## Task 2 — content.ts: add Curio entry

Append to the `projects` items array (after the `notification-dispatch` entry, i.e. last):

```ts
      {
        title: "Curio",
        slug: "curio",
        meta: "One app for video, audio, comics, and music",
        stat: "4 apps → 1",
        body: "Curio started as a video player and snowballed into a centralized experience for all media (video, audio, comics, and music). It superseded four of my own applications and serves its own phone companion.",
        summary:
          "Curio was originally a video player. I liked the style of Windows' Movies & TV app but wanted to expand it with capabilities common in applications like Plex, and I wanted the same unified experience for audio, with features like the old Windows XP Media Player visualizations. The app snowballed into a centralized experience. Once I realized that I had separate apps for video, audio, books, and comics, I decided one unified codebase was easier to handle and build off of. Curio superseded all four. My role was direction and database design. I had Claude handle how the code would work, and I focused on making sure the database would never need to be redone over and over. One of the hardest parts was the phone companion. I had a central app and server, but how that experience would translate to mobile or tablets was initially a mystery to me. I had to work through constraints such as screen size, UX, and keeping that experience consistent across different screen sizes. The desktop app self-hosts as the server for that companion. The code is private for now.",
        metrics: [
          ["4 → 1", "separate apps unified into one platform"],
          ["Video · audio · comics · music", "one library, one experience"],
          ["Self-hosting", "the desktop app serves its own phone companion"],
        ],
        tags: ["C#", "WPF", "SQLite", "PWA"],
        link: "#",
        linkLabel: "CASE STUDY",
      },
```

No `repo` field — the code is private until S4 passes. The final summary sentence ("The code is private for now.") is the owner-approved private-code note.

## Task 3 — content.ts: add ASU experience entry

In the `experience` category `items` array, append after the `Software Engineer` entry:

```ts
      {
        title: "Arizona State University",
        slug: "arizona-state-university",
        meta: "B.S., Graphic Information Technology",
        stat: "Cum laude, Dec 2025",
        body: "The Graphic Information Technology program was a lot of frontend and backend work but it had a distinct focus on presentation. I graduated cum laude while working full-time at UWM.",
        tags: ["Education", "Cum laude"],
        link: "",
        linkLabel: "",
      },
```

No `summary` field — the page falls back to `body` by design.

## Task 4 — content.ts: Software Engineer revision (3 fields)

In the `Software Engineer` entry (slug `software-engineer`), replace exactly these three field values:

- `stat`: `"2022 — Present"` → `"2022 - present"`
- `body` → exactly:
```
Backend and platform engineering at United Wholesale Mortgage. I work on the messaging backbone behind the MIA assistant, observability automation, and cross-stack production debugging.
```
- `summary` → exactly:
```
Software Engineer at United Wholesale Mortgage since 2022, working on backend and platform systems. I built the text channel and the per-user-number backbone behind MIA, the AI assistant UWM launched to its brokers. I automated golden-signal observability so any team could stand up reliability checks in seconds (work Dynatrace invited me to present to their global automation guild) and chased down the kind of cross-stack failures that never show up on a dashboard. To keep it simple, I build systems and libraries that others can trust and utilize without worrying about the specifics.
```

`title`, `slug`, `meta`, `tags`, `link`, `linkLabel` unchanged. Note the summary DOES keep "Dynatrace invited me to present to their global automation guild" — that is deliberate (owner decision), do not soften it.

## Task 5 — content.ts: punctuation sweep (7 exact replacements)

Owner-approved 2026-07-03. Apply as exact old→new string edits. If an old string is not found verbatim, STOP and report.

1. MIA summary: `the dedicated number every user gets — 50,000 at launch, one per user — which routes` → `the dedicated number every user gets (50,000 at launch, one per user) which routes`
2. MIA summary: `and it just works; you cannot do that with a shared short code` → `and it just works. You cannot do that with a shared short code`
3. Backend-harness summary: `never reads the code itself; the agent that writes code and the agent that evaluates it are kept apart` → `never reads the code itself. The agent that writes code and the agent that evaluates it are kept apart`
4. No-logs summary: `a message that never sent — but the audit trail showed no failures anywhere` → `a message that never sent, but the audit trail showed no failures anywhere`
5. No-logs summary: `removing the HTTP layer entirely — zero changes required from any consumer, same at-least-once guarantees` → `removing the HTTP layer entirely. Zero changes were required from any consumer, with the same at-least-once guarantees`
6. Observability summary: `was a manual, per-team job — slow, easy to skip, and inconsistent across services` → `was a manual, per-team job. It was slow, easy to skip, and inconsistent across services`
7. Observability summary: `it was not a one-off — other people could use it without thinking about the plumbing underneath` → `it was not a one-off. Other people could use it without thinking about the plumbing underneath`

**Then verify (both must hold):**
- `Grep pattern "—|–" path src/content.ts` → **exactly one expected match**: the file-header block comment near line 6 ("…any prose here — content changes go through…") is a code comment, NOT owner prose, and is out of scope — leave it and do not stop over it. Any OTHER match is a failure.
- `Grep pattern "^\s*(body|summary|meta|blurb|stat):.*;" path src/content.ts` → **zero matches** (string fields are single-line; a match means a leftover semicolon in prose). If either grep finds something NOT covered by the edits above (e.g. in the contact section, which this plan's author did not fully read), STOP and report the exact line — do not fix unapproved prose yourself.

## Task 6 — vite.config.ts: og-shell count assertion

The `shareShells()` plugin in `vite.config.ts` hard-fails the build unless the number of generated per-slug shells equals a literal `10`. After S2 the slugged items are 6 projects + 2 experience = **8**. Find the assertion (shape: `if (count !== 10) this.error(...)` — exact variable name may differ) and change `10` → `8`. If no such literal-count check exists in `vite.config.ts`, STOP and report.

## Task 7 — build + DOM verification

1. `npm run build` → must succeed. The shell plugin itself now enforces exactly 8 shells (this is the primary structural check).
2. Confirm in `dist/`: `dist/work/curio/index.html` and `dist/experience/arizona-state-university/index.html` exist and contain `og:title` for the right entry; `dist/work/videotriage/` (and the other three removed slugs) do NOT exist.
3. DOM checks via Claude-Preview (serve the built site or dev server; **do not use raw headless-Edge for sub-478px widths** — known min-width clamp, see ROADMAP gotchas; use `preview_resize` + `preview_eval`):
   - Projects menu lists exactly 6 items, Curio last; Experience lists 2.
   - Deep links `/work/curio` and `/experience/arizona-state-university` open the right overlay (check `location.pathname`, aria state, and INLINE style — computed transition styles are unreliable in the preview tab, see ROADMAP gotchas).
   - A removed slug (`/work/videotriage`) bounces to home via the 404 path.
4. Desktop visual capture (1440px) via headless Edge; a **pinned `model: 'haiku'` subagent** reads the PNGs against this checklist and returns a text verdict: Curio card renders with stat "4 apps → 1" and 3 metric boxes; ASU card renders with "Cum laude, Dec 2025"; no placeholder/missing-image artifacts on the changed cards. Never load PNGs into the orchestrator.

Accepted side effect (do not "fix"): external links to the four removed slugs will 404-bounce to home. They were live for ~1 day; acceptable.

## Task 8 — owner diff approval gate (REQUIRED, before PR merge)

Present the **complete `git diff` of `src/content.ts`** to the owner as text in chat and get explicit approval. This is a hard spec constraint. If the owner edits anything, apply and re-show. Only then: push branch → open PR → `sleep ~20s` → `gh pr checks <PR#> --watch` (foreground) → `gh pr merge <PR#> --merge --delete-branch` → sync main → flip the S2 row in `ROADMAP.md` to ✅ Merged with PR # (+ hygiene pass) → ping owner.
