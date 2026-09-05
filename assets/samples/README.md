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
