# Lacto

A unified design system, distilled from four projects:
[SVG_DRAW](https://github.com/pedroleitin/SVG_DRAW),
[grid_connect](https://github.com/pedroleitin/grid_connect),
[grid-gen-2](https://github.com/pedroleitin/grid-gen-2) and
[swatch](https://github.com/pedroleitin/swatch).

All four already spoke the same visual language — same palette, same two
typefaces, same yellow. What existed were **variants of the same component**
scattered across repositories. Lacto picks one version of each, documents the
rule behind it, and ships it as a typed React component.

## The five rules

1. **Binary on = `--lc-text` (dark). Choosing between options = `--lc-accent`
   (yellow).** A `Switch` that is on goes dark; a selected `Button` goes yellow.

2. **Yellow is interaction, not state.** `#FFC800` is the universal hover and the
   focus ring. It says "this responds to you".

3. **Numbers are mono.** Every value, hex, coordinate, count and text field uses
   Ubuntu Mono with `tabular-nums`. Running text and labels use Outfit.

4. **Labels recede, values advance.** Control labels sit at 50% opacity; the
   value is weight 700. What changes is what carries contrast.

5. **36px is the canonical height.** Button, select and number field share it —
   any row of controls lines up with no adjustment.

## Install

```bash
npm install
npm run dev        # opens this site
npm run tokens     # regenerates src/tokens/tokens.css from tokens.json
npm run typecheck  # checks the types
```

## Use it in a project

```tsx
import "lacto/src/styles/base.css";
import { Button, Slider, Tooltip } from "lacto";

export function App() {
  return (
    <>
      <Tooltip />           {/* singleton: wires up everyone's title */}
      <Button kbd="c">Clear</Button>
    </>
  );
}
```

The theme switches by attribute, with no provider:

```ts
document.documentElement.dataset.theme = "dark";
```

## Stack

React 19 · Vite 7 · TypeScript · **plain CSS with custom properties**.

No Tailwind (consumers would have to replicate the config), no Storybook
(~40 packages for what this site does with a 20-line router), no icon library
(Material Symbols is a font). The only runtime dependency besides React is
`marked`, to render these documents.

## Structure

```
tokens.json                       single source for the tokens
scripts/build-tokens.mjs          generates the CSS
src/
  tokens/tokens.css               GENERATED — do not edit
  styles/base.css                 reset, .lc-dots, .lc-scroll, .lc-overline
  components/<Name>/
    <Name>.tsx                    component
    <name>.css                    styles
    README.md                     documentation in English (what you are reading)
    README.pt-BR.md               Portuguese translation
    <Name>.demo.tsx               interactive example
  index.ts                        export barrel
  docs/                           this site
```

Every component is a closed folder: code, styles, docs and example. No global
per-component stylesheet.

## Languages

English is the default. Portuguese lives beside it in `README.pt-BR.md`, and the
`EN / PT` switch at the top of the sidebar changes the whole site.
