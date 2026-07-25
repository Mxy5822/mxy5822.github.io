# Battle Gameplay Addendum — Boss Rush, Abilities, Progression

Extends `2026-07-02-spectacle-and-battle-design.md` (§S5/§S6). Owner-approved design session 2026-07-24/25. Where this addendum conflicts with the base spec, this addendum wins; deviations are listed explicitly at the end.

## Shape: a boss rush

The battle is a four-boss rush, fought in the order the owner faced the real problems the bosses personify. Each victory unlocks a new ability and permanently raises stats. Every boss is beatable with the loadout available when it is reached — unlocks add speed and style, never gatekeep.

Rush order:

1. **The Alert Storm** — a swarm of ten screecher bats; nine are noise, one is the real alert. Personifies alert fatigue: finding the signal in the noise.
2. **The Cascade** — a floating chain of six linked nodes; a failure pulse travels the chain and a completed loop triggers a retry storm. Personifies cascading failure in distributed systems.
3. **The Silent Failure** — a spectral body inside floating armor that vanishes, leaving the empty armor untargetable. Personifies the production failure that leaves no logs.
4. **Imposter Syndrome** — a glitching dark mirror of the hero. The finale: it replays corrupted copies of every gimmick already beaten, plus the hero's own moves.

## Hero abilities

Starting kit (available from battle start):

| Ability | MP | Effect (first-pass tuning) |
|---|---|---|
| Attack | 0 | ~12 dmg; +1 MP on hit (attacking is never a dead turn) |
| Critical Thinking | 2 | buff: +50% damage dealt, −25% damage taken, 3 turns; boss tells linger longer while active |
| Power Through | 3 | heavy single-target hit, ~28 dmg |
| Debug | 2 | debuff bolt: ~6 dmg + 4/turn DoT (3 turns) + a persistent purple mark |

Unlocks (one per boss victory, RPG archetype first, themed second):

| Ability | Unlocked by | MP | Effect |
|---|---|---|---|
| Fan Out | Alert Storm | 3 | AoE: ~10 dmg to all targets |
| Rollback | The Cascade | 3 | heal 30 + cleanse own debuffs |
| Root Cause | The Silent Failure | 3 | ~22 dmg; ignores evasion/stealth, reveals hidden, bonus vs marked |
| Ship It | Imposter Syndrome (mid-fight, at 50% boss HP) | 5 | finisher, ~60 dmg |

Ability names are owner-approved creative trait names (not project names). Each ability's inspect panel carries a one-line "forged from: [case study]" link so the roster mapping survives the renaming.

## Economy and stats

- Hero: HP 100, MP pool 10 to start; +1 MP per turn, +1 more when Attack hits.
- Boss kill rider: **+10 max HP, +2 max MP** per victory (leveling feel, zero leveling system).
- Turn order: hero → boss, classic alternation.

## Per-boss mechanics (beatable with loadout on hand; one streamlined line each)

1. **Alert Storm** (kit: starting four). Real bat 60 HP, fakes 8 HP each. All ten stitch their mouths shut between "scream windows"; during a scream all ten open their mouths but only the real one screams red. Hitting a fake reshuffles the swarm. Any-pattern: Attack chips fakes down. Streamlined: Critical Thinking (extends the scream window) → Debug the red screamer (the mark persists after mouths close) → focus fire. Victory forges **Fan Out** — the tool the fight made you want.
2. **The Cascade** (+ Fan Out). Six nodes, 25 HP each; the pulse lights nodes head→tail; a completed loop fires a 25-dmg retry storm. Killing nodes shortens the chain. Any-pattern: burst nodes, eat storms. Streamlined: Debug the lit node — a debugged node cannot pass the pulse, breaking the loop by hand. Victory forges **Rollback**, arriving exactly when fights get long enough to need sustain.
3. **The Silent Failure** (+ Rollback). 140 HP; cycles body ↔ empty-armor untargetable phase; strikes from invisibility for 18. Any-pattern: hit the body windows, Rollback through the unseen hits. Streamlined: Debug it before it vanishes — the mark's motes betray its position and the DoT ticks while it hides. Victory forges **Root Cause**.
4. **Imposter Syndrome** (near-full kit). 180 HP. Recap phases: swarm-clones itself (the mark/reveal tools answer), runs a corrupt pulse (Debug breaks it), vanishes (Root Cause rips it back), and mirrors the hero's last special back as a weaker glitchy copy. At 50% HP it degenerates into glitch-copy spam and **Ship It unlocks mid-fight**; raw damage can still finish it — Ship It is catharsis, not a requirement.

## Case-study unlock channel (deviation from base spec)

The base spec mapped spells 1:1 to roster entries by name. This addendum renames abilities to trait names; the unlock channel moves accordingly:

- Each boss victory unlocks the case studies of the work that boss personifies.
- The starting three abilities' linked studies unlock on first cast.
- Full clear = whole roster seen → meta entry unlock + victory screen with the contact CTA (unchanged from base spec).

All names, slugs, and flavor text still pass the base spec's constraint-2 review before commit (unchanged; see base spec).

## Asset backlog implied by this design

Prototype sprites for the hero (idle, attack, buff, cast-debuff, hit, KO) and all four bosses (models + signature idles: glitch, vanish cycle, scream cycle, pulse cycle) exist under `docs/battle-prototypes/` as self-contained HTML labs. Still to produce during S6:

- Hero: Power Through, Fan Out, Rollback (all DONE 2026-07-25, in `hero-battle.html`); Root Cause, Ship It animations.
- Each boss: attack, hit, death frames.
- Per-spell impact VFX rendered on top of the enemy (owner decision 2026-07-25): each spell gets its own overlay animation at the target; the enemy itself only flashes/flinches. Build these alongside the boss hit frames.

## Deviations from the base spec, consolidated

1. One boss ("the Silent Failure") → four bosses in a rush. S5's engine scope grows accordingly; the classic-menu fallback and opt-in entry are unchanged.
2. Spell names are creative trait names, not roster-entry names (owner decision 2026-07-25); roster mapping preserved via "forged from" links.
3. Case-study unlocks move from per-cast to per-victory (plus first-cast for the starting three).
4. Progression added: per-victory ability unlock + stat rider.
