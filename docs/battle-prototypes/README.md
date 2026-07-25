# Battle sprite prototypes

Self-contained HTML labs from the 2026-07 sprite design sessions. Open any file directly in a browser — no server, no dependencies. Each draws its sprites from a palette-letter grid at integer scale (`image-rendering: pixelated`) with a shared auto-outline pass; the animation loops run on plain `setTimeout`/`setInterval`.

These are the working source of truth for S6 asset production. The grids and palettes in these files ARE the sprites — regenerating PNG sheets is a matter of screenshotting the canvases at the desired scale.

| File | Contents |
|---|---|
| `hero-battle.html` | Hero sprite + full animation set: 2-frame idle, 7-frame iai draw-cut attack, buff (gold shimmer + rising sparkles), cast-debuff (charge → purple bolt), flinch+guard hit, 3-frame KO, plus per-frame static cells |
| `boss-alert-storm.html` | The Alert Storm final (10-bat swarm, hidden → scream → hidden cycle, one red signal) + the three rejected imp drafts and solo closeups |
| `boss-cascade.html` | The Cascade final (6-node chain, 6-frame sequential pulse head→tail with afterglow and hot links) + the three rejected drafts |
| `boss-silent-failure.html` | The Silent Failure final (spectral body ↔ fade ↔ empty-armor untargetable cycle) + the three rejected silhouette drafts |
| `boss-imposter-syndrome.html` | Imposter Syndrome final (palette-remapped dark mirror of the hero with glitch tear frames) |

Design context: `../superpowers/specs/2026-07-25-battle-gameplay-addendum.md`.
