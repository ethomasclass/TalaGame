# Art style samples

Two style probes for the game's 2D look, both authored as plain SVG and
rasterised with headless Chromium.

| File | Style | Notes |
|---|---|---|
| `venba-style-test.svg` | Textured / painterly | Gradients, soft light, `feTurbulence` edge grain |
| `characters-flat.svg` | Clean flat shapes | Solid fills only — no gradients, no filters |

## Rendering

```
NODE_PATH=/opt/node22/lib/node_modules node tools/render-svg.js <in.svg> <out.png> [scale]
```

Scale is a device-pixel multiplier (default 2), so a 1600x900 source renders
at 3200x1800. Output has a transparent background where the source does.

## Why these two

`venba-style-test.svg` is the expensive end: the chalky edge comes from
chaining two `feDisplacementMap` passes (coarse wobble + fine fuzz) over
every shape group, and the lighting is layered gradient ellipses in
`screen` / `multiply` blend modes.

`characters-flat.svg` is the cheap end. Every shape is a solid fill, which
means it is also the only one of the two that could be rebuilt inside
Canva — Canva's shape API takes a single hex fill per shape and supports
no gradients, blurs, blend modes or filters.

---

## Nine Mornings style probes

| File | What it tests |
|---|---|
| `recipe-card-states.html` | The card degrading across scenes 1, 3 and 5 — the game's thesis as an interface |
| `scene-dawn.html` | A full 1280x720 game screen: dawn-light staging, silhouettes, HUD, dialogue panel |

Both are plain HTML at the spec's fixed stage size, using the palette and
type stack from the design doc (Fraunces / Source Sans 3 / IBM Plex Mono).
Caveat is embedded as base64 in `assets/fonts/caveat-embed.css` so the
handwriting survives in a single self-contained file with no network calls.

Render either with:

```
NODE_PATH=/opt/node22/lib/node_modules node tools/render-page.js <in.html> <out.png> 1280 720 2
```

### Technique notes

**Card damage** is three independent layers, so any step can be set to any
legibility without rewriting the card: `.f1`/`.f2`/`.f3` fade and blur
progressively, `.gone` removes text entirely, `.gap` leaves the ruled blank
the player chooses into. Stains are radial gradients with a darker tide-line
at the edge, pushed through an `feDisplacementMap` so no two are the same shape.

**Rim light** on silhouettes is a gold copy of the figure drawn underneath at
a small offset toward the light source. It aligns to any pose automatically,
which hand-placed highlight paths do not.

### Camera rule (decided after the three-quarter test)

`scene-cooking.html` put Tala at three-quarter turn and the face broke —
flat shapes cannot lie about depth in the nose, far eye and jaw all at
once. The fix is structural, and it is the one Venba uses:

- **Dialogue scenes: characters straight-on** (see `venba-style-test.svg`).
  One drawing per character plus swappable mouth/brow/eye groups.
- **Cooking scenes: top-down, no character on screen**
  (`scene-cooking-topdown.html`). The player *is* the hands. The only hand
  ever drawn is the cursor glove, which is UI, not anatomy.

Animation in both is CSS keyframes on SVG groups. Always transform the
parent of a textured (`filter="url(#rough)"`) group, never the group
itself, or the grain shimmers frame to frame.

Render a looping GIF with:

```
NODE_PATH=/opt/node22/lib/node_modules node tools/render-gif.js <in.html> <out.gif> 640 360 2.8 15
```

---

## The committed direction: straight-on faces, top-down cooking

| File | What it is |
|---|---|
| `expressions-tala.html` | One head, four expressions. Only brows, eyes and mouth swap. |
| `cast-ramos.html` | The cast: Tala, Divina (Ma) and Rey (Pa), straight-on, in one style. |
| `scene-dining.html` | Dialogue format: the family straight-on at the table, scene 4 "The envelope". |
| `scene-cooking-topdown.html` | Cooking format: top-down, no character on screen, cursor glove as the only hand. |
| `scene-cooking.html` | Kept as the counter-example: a three-quarter face, which is where flat shapes break. |

### Rules of the grammar

1. **Characters are drawn straight-on only.** No three-quarter, no profile.
   A flat-shape face cannot describe depth in the nose, far eye and jaw at
   once, so the turn is simply never drawn.
2. **One base head per character, expression parts swap on top.** The
   parts are named groups (`brows-*`, `eyes-*`, `mouth-*`) so a scene beat
   can set an expression by class, not by redrawing.
3. **Cooking is top-down with no character on screen.** The player is the
   hands, and the only hand is a UI cursor glove. Drawn hands fail from
   above for the same reason faces fail in three-quarter.
4. **Animate the parent, not the textured group.** The `feDisplacementMap`
   grain is applied to an inner group; motion goes on a wrapper. And keep
   the SVG `transform` attribute and any CSS-animated `transform` on
   different elements, because the CSS one replaces the attribute.

### Idle life

Every character in `scene-dining.html` blinks and breathes on its own
offset. That, plus steam on any dish, is enough to keep a static scene from
feeling like a slide. Reaction beats are an expression-part swap.

### Cast note

Ma and Pa were first drawn inside the Venba probe and inherited its Tamil
signifiers (bindi, sari, heavy moustache, a sharp bridge-line nose). Those
were wrong for Divina and Rey Ramos and have been redrawn: rounder, fuller
faces with a soft broad nose drawn as an underside only; hair pulled back
into a low bun for front of house; thin rectangular frames, receding
hairline and grey temples for a man of fifty; small hoops and a thin cross;
a cardigan and an apron over work clothes. The parol in the window carries
the season. Skin tones vary slightly across the family, as they do in real
families. Still worth a look from a Filipino colleague before anything
ships, as the spec itself says.

---

## Scene 3: the restaurant dining room (`scene-restaurant.html`)

Four tables, one occupied. Tala watches from the kitchen pass. The
customer is seen from behind and never gets a face: she is unnamed in the
spec, not Filipino, and not someone the story wants the player to
connect with, so the straight-on grammar's one other legal view (a pure
back view) is the right one for her.

### Movement beyond the eyes

Everything here is a transform on a group, no redraw, no sprite sheet:

| Motion | How |
|---|---|
| Head nod | `rotate` about the neck on the head group, once every ~7s |
| Pour | The arm+pitcher group rotates about the shoulder; the water stream fades in at the tilt |
| Talking | Two mouth parts toggled with `steps()` while a line is on screen |
| The customer leans back | Slow `rotate` about the chair base |
| Tala shifts her weight | Small `translateX` + `rotate` on the whole figure |
| Headlights across the wall | A blurred wedge translating across a clipped wall, every 11s |
| Snow past the window | Circles falling inside the window clip on staggered delays |
| Pendants | Opacity flicker on the light pools |

Rule that makes this work: a character is built as body / head / arm
groups from the start, so each can carry its own animation. The engine's
`expr` system swaps face parts; a `motion` field on a beat would toggle
these classes the same way.
