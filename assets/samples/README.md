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
