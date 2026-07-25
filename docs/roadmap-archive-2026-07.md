# Roadmap archive — shipped milestone detail (2026-07)

Pointer file. `ROADMAP.md` keeps a compact history table (one row per shipped milestone);
this file preserves the fuller shipped-milestone notes that predated the 2026-07-07
North Star prune, for anyone digging into why a past PR did what it did. Full
step-by-step detail always lives in the linked plan docs under
`docs/superpowers/plans/`; this file is the middle layer between the one-line
table and the full plan.

## S1a — Visual & copy fixes (PR #4, merged)

Plan: `docs/superpowers/plans/2026-07-02-S1a-visual-copy-fixes.md`

Station hero turned ON; mobile tab `minWidth:0` + ellipsis fix; stale `content.ts`
and README doc comments corrected; CI Node version skew fixed (24 → 22).

## S1b — Routing + share previews + a11y (PR #6, merged)

Plan: `docs/superpowers/plans/2026-07-02-S1b-routing-shells-a11y.md`

10 static OG shells (one per case-study slug) + a share card + 404 bounce page;
`pushState`/`popstate`-based path deep links so case studies are directly linkable;
dialog accessibility (focus trap + restore, ARIA roles) added to the case-study
overlay.

Note: the root `og:description` meta tag was orchestrator-authored (not owner
prose) — flagged in the PR #6 description as something the owner may still want
to veto/rewrite. Carried forward here in case it resurfaces.

## S2 — Roster & content (PR #9, merged)

Plan: `docs/superpowers/plans/2026-07-03-S2-roster-content.md`

Removed 4 superseded roster entries; added Curio (repo link withheld until S4
publication gate clears) and ASU; revised the Software Engineer entry (3-field
rewrite); site-wide punctuation sweep to the owner's no-em-dash/no-en-dash/
no-semicolon rule — including one em dash on content.ts line 90 that the
original plan missed (owner approved a colon mid-run as the fix once found).
OG shell count dropped 10 → 8 as part of the roster trim. Owner approved the
full `content.ts` diff on 2026-07-03 before merge.

---

For anything not covered above (art direction, confidentiality rules, declined
items, cross-cutting gotchas), see the Decision log & gotchas section in
`ROADMAP.md` directly — those are living/current, not archival, and were not moved.
