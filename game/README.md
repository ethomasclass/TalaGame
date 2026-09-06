# Nine Mornings — playable slice

`nine-mornings.html` is a single self-contained file: open it in a browser.
It runs scene 4, "The envelope", end to end with the three mechanics from
the spec wired to real state.

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

## Build

The file is assembled by the Python block in the session history from the
sample sheets (`assets/samples/*.html`); character rigs and backgrounds are
inlined SVG, and Caveat is embedded as base64. `tools/playtest.js` drives it
through every state with Playwright and screenshots each one to
`assets/samples/playtest/`.
