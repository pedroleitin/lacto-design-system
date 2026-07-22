One curve — `cubic-bezier(0.4, 0, 0.2, 1)` — and six durations. Hover and click
the buttons below to feel the difference between them.

> **Hover and color: 0.16s. Press: 0.12s. Slider: 0.18s. Layout and morph:
> 0.22s. Open/close a section: 0.28s.**

## Durations

<!-- widget:motion-scale -->

## Principles

- **Color animates, position does not.** Hover, focus and selection transition.
  A cursor jumping from cell to cell does not — it must be instant, or it feels
  mushy.
- **Press is faster than hover.** 0.12s against 0.16s: the click has to feel
  immediate, the hover can be smooth.
- **Press scale: 0.93 on small targets, 0.96 on text buttons.** A smaller area
  needs a larger displacement for the feedback to register.
- **Layout animates to the real height.** `grid-template-rows: 0fr → 1fr`, never
  a guessed `max-height`.
- **`prefers-reduced-motion` turns everything off.** It is already in
  `base.css` — no component has to handle it.

## Try it

<!-- widget:motion-buttons -->
