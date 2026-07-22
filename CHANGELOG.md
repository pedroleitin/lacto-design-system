# Changelog

All notable changes to this project. The format loosely follows
[Keep a Changelog](https://keepachangelog.com/), and the project is versioned in
`package.json` (currently **0.1.0**).

## [0.1.0]

First release. A unified design system distilled from four projects —
[SVG_DRAW](https://github.com/pedroleitin/SVG_DRAW),
[grid_connect](https://github.com/pedroleitin/grid_connect),
[grid-gen-2](https://github.com/pedroleitin/grid-gen-2) and
[swatch](https://github.com/pedroleitin/swatch) — as **React 19 + Vite 7 + TypeScript**
with plain CSS custom properties.

All four repositories already shared a visual language (cream + dark theme, `#ffc800`
accent, Outfit / Ubuntu Mono). What existed were *variants of the same component*
scattered across them; this release picks one version of each and documents the rule
behind it.

### Added

- **21 components ported** from the source repositories, plus **2 new ones**:
  - *Action* — Icon, Button, IconButton, Kbd
  - *Input* — TextField, NumberField, Slider, RangeSlider, ColorSwatch, Dropzone
  - *Selection* — Switch, **Checkbox** (new), **RadioGroup** (new), Segmented, Select
  - *Structure* — Panel, Sidebar, Accordion, Tabs, Divider
  - *Feedback* — Tooltip, Toast, Badge
- **`tokens.json` as the single source** for colors, typography, spacing, radius,
  sizes, motion, elevation, blur and focus, with `npm run tokens` generating
  `src/tokens/tokens.css` (light + dark, `--lc-` prefix).
- **Documentation site** — hash router in ~20 lines, no Storybook. Every component page
  has an interactive example, per-component docs, and a stage with a dot-grid/plain
  background toggle.
- **Box-model inspector** — a *Guides* switch on every example that outlines each
  element and, on hover, overlays margin / border+radius / padding with a chip showing
  the computed values.
- **Foundation pages** — Colors, Typography, Spacing & radius, Motion, Icons, Tokens.
  Copy lives in markdown; interactive widgets are stitched in via `<!-- widget:name -->`
  markers.
- **Bilingual docs** — English by default (`README.md`), Portuguese alongside
  (`README.pt-BR.md`), in the root and in every component folder. `EN / PT` switch in
  the sidebar, persisted in `localStorage`.
- **Light/dark theme** via `[data-theme]` on `<html>`, with no provider.
- **Google Material Symbols Outlined** as an icon font (ligatures), with size, weight
  and tone tokens.

### Design decisions recorded

- **Binary on = `--lc-text` (dark); choosing between options = `--lc-accent` (yellow).**
  Reconciles the source repos, where a `Switch` fills dark and an active `Button` fills
  yellow.
- **Numbers are mono** — Ubuntu Mono with `tabular-nums` for every value, hex,
  coordinate and text field.
- **36px canonical control height**, so `Button`, `Select` and `NumberField` line up in
  any row.
- **Padding belongs to the component, gap to the container, margin is the exception** —
  only three margins exist in the whole system.
- `Slider variant="bar"` keeps grid_connect's two-stage behaviour: track at 20% and
  fill at 5% at rest, everything gaining weight together on hover over 0.18s.

### Deliberately not included

- **Tailwind** — consumers would have to replicate the config; the source repos already
  use real CSS classes.
- **Storybook** — ~40 packages for what the site does with a 20-line hash router.
- **An icon library** — Material Symbols is a font; the icon name is the text content.
- **react-router** — a hash router is 20 lines.

### Known gaps

- Demo copy is English-only; the language switch does not translate example labels.
- No tests and no linter — `npm run build` (which runs `tsc --noEmit`) is the only
  automated check.
- `Checkbox` and `RadioGroup` were designed here rather than ported, and their visual
  treatment is pending confirmation. See [`BACKLOG.md`](./BACKLOG.md).
