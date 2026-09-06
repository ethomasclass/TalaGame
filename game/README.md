# Nine Mornings — playable slice

`nine-mornings.html` is a single self-contained file: open it in a browser.
It runs all five scenes (December 16 to 24) end to end, then the wish and
the debrief, with the three mechanics from the spec wired to real state.
`nine-mornings-artifact.html` is the same page without the document
wrapper, for publishing.

| Key | Does |
|---|---|
| Enter / → / click | advance dialogue |
| ← | back one beat |
| ↑ ↓ or 1–3 | choose (cooking step, phone reply) |
| D | toggle the dev readout of `STATE` |
| R | restart |

## What is wired

- `STATE = { mornings, honesty, invitedHannah, cook }` exactly as in the
  spec's technical notes. Nothing else persists.
- **Expressions are data.** Each beat can set `expr:{ma:'counting', pa:'down'}`
  and the engine swaps the brow, eye and mouth groups by `href`. The
  speaking character brightens; the others dim slightly.
- **Cooking** is the missing-step chooser. The choice is recorded in
  `STATE.cook`, and Pa's next line is picked from it. No fail state: the
  wrong choice produces a different dish and a different reaction.
- **The phone** types Bea's lines in one at a time, offers three replies,
  adjusts `STATE.honesty` silently, and Bea's follow-up depends on the reply.
- The end card reads the state back so you can see it took.

## What carries across scenes

| State | Written in | Read in |
|---|---|---|
| `invitedHannah` | scene 2, third period | scene 5: Hannah at the door, the purple exchange |
| `honesty` (first write) | scene 1, the first Bea thread | — |
| `mornings` | scene 3, the alarm | the counter, the wish's framing, the end card |
| `honesty` | every Bea thread | scene 5: whether Bea's last reply is warm or hollow |
| `cook` | each cooking beat | the next line from whoever tastes it |
| `wish` | scene 5 | the end card only. Never judged. |

## The cooking steps

| Scene | Dish | Step | How it is played |
|---|---|---|---|
| 1 | Tsokolate | drag, then one chip | The tutorial. Drag the tablea into the pot; pick how long to whisk. |
| 2 | Adobo | pour | Hold the vinegar over the pot; when you stop is the ratio. |
| 3 | Pancit | three chips | Lola's way, the way it sells, or halfway. |
| 4 | Bibingka | timed drag | The batter sets while you hold the egg. |
| 5 | Puto bumbong | scoop drag, then three chips | Scoop once for loose; then steam, turn out, top. |

Nothing is scored on screen. Every outcome is a different dish and a
different line from whoever tastes it.

## Build

Run `python3 tools/build-game.py`. It assembles both builds from
`game/base-layers.html` (the frozen dining and cooking base scenes),
`tools/cook-layer.py` (the cooking layer: base plus an overlay of every
dish dressing and draggable, each checked for balanced groups),
`tools/scene2-layers.py`, `tools/scene5-layers.py`,
`tools/scene-ext-layers.py` and the sample sheets; character rigs and backgrounds are
inlined SVG, and Caveat is embedded as base64. `tools/playtest.js [main|getup]` walks the whole build from a queue of
decisions with Playwright, screenshots every screen to
`assets/samples/playtest/`, and prints the final `STATE`. Both variants
must end with `errors: none`.
