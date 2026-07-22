# Lacto Design System

A unified design system, distilled from four projects:
[SVG_DRAW](https://github.com/pedroleitin/SVG_DRAW) ·
[grid_connect](https://github.com/pedroleitin/grid_connect) ·
[grid-gen-2](https://github.com/pedroleitin/grid-gen-2) ·
[swatch](https://github.com/pedroleitin/swatch)

**23 components** in React + TypeScript, each with its styles, documentation and
an interactive example. Browsable site included.

> 🇧🇷 [Leia em português](README.pt-BR.md)

## Run it

```bash
npm install
npm run dev
```

Opens the documentation site at `http://localhost:5173`.

| Command | What it does |
|---|---|
| `npm run dev` | Documentation site with hot reload |
| `npm run build` | Typecheck + production build into `dist/` |
| `npm run preview` | Serves the build |
| `npm run tokens` | Regenerates `src/tokens/tokens.css` from `tokens.json` |
| `npm run typecheck` | Types only |

## Stack

React 19 · Vite 7 · TypeScript · plain CSS with custom properties.

No Tailwind, no Storybook, no icon library. The only runtime dependency besides
React is `marked`, to render the documentation.

## Structure

```
tokens.json                    single source for the visual tokens
scripts/build-tokens.mjs       generates the CSS from it
src/
  tokens/tokens.css            GENERATED — do not edit by hand
  styles/base.css              reset, .lc-dots, .lc-scroll, .lc-overline
  components/<Name>/
    <Name>.tsx                 component
    <name>.css                 styles
    README.md                  visual rules, a11y, props (English)
    README.pt-BR.md            Portuguese translation
    <Name>.demo.tsx            interactive example
  index.ts                     export barrel
  docs/                        the site (not part of the package)
```

## Components

**Action** — Icon, Button, IconButton, Kbd
**Input** — TextField, NumberField, Slider, RangeSlider, ColorSwatch, Dropzone
**Selection** — Switch, Checkbox\*, RadioGroup\*, Segmented, Select
**Structure** — Panel, Sidebar, Accordion, Tabs, Divider
**Feedback** — Tooltip, Toast, Badge

\* Created for Lacto; they did not exist in the source repositories. See
**What's missing** on the site.

## The five rules

1. **Binary on = `--lc-text` (dark). Choosing between options = `--lc-accent`
   (yellow).**
2. **Yellow is interaction, not state** — universal hover and focus ring.
3. **Numbers are mono** — Ubuntu Mono with `tabular-nums` for every value.
4. **Labels recede (50% opacity), values advance (weight 700).**
5. **36px is the canonical height** of button, select and number field.

## Use it in another project

```tsx
import "lacto/src/styles/base.css";
import { Button, Slider, Tooltip } from "lacto";

<Tooltip />                      {/* singleton, once at the root */}
<Button kbd="c">Clear</Button>
```

Theme:

```ts
document.documentElement.dataset.theme = "dark";
```

## Languages

English is the default, in `README.md`. Portuguese lives beside it in
`README.pt-BR.md`, in the root and in every component folder. The site has an
`EN / PT` switch at the top of the sidebar, persisted in `localStorage`.
