A warm, desaturated palette with a single accent: the yellow `#FFC800`. Every
token exists in light and dark, and the theme switches through `[data-theme]` on
`<html>` — no component knows which theme is active.

## The system's color rule

> **Binary on = `--lc-text` (dark). Choosing between options = `--lc-accent`
> (yellow).**

A `Switch` that is on goes dark; a selected `Button` goes yellow. Yellow is also
the universal hover and the focus ring — it is the color that says "this
responds to you", not "this is on".

<!-- widget:color-grid -->

## Dotted background

The `.lc-dots` class is the system's signature: 1.25px dots on a 25px grid, at
50% opacity, in `--lc-dot`. Use it on any work area — canvas, demo stage, empty
state.

<!-- widget:dots-preview -->
