# CLAUDE.md — Lacto Design System

Guide for AI agents (Claude/Copilot) working in this repository. The user's global
preferences live in the top-level `CLAUDE.md`; this file covers what is specific to the
project.

## What it is

A unified design system distilled from four projects — **SVG_DRAW**, **grid_connect**,
**grid-gen-2** and **swatch**. All four already shared a visual language (cream + dark
theme, `#ffc800` accent, Outfit / Ubuntu Mono); what existed were *variants of the same
component* scattered across repositories. Lacto picks one version of each, documents the
rule behind it, and ships it as a typed React component plus a browsable docs site.

## Stack

- **React 19** + **Vite 7** + **TypeScript** (strict)
- **Plain CSS with custom properties** — no Tailwind, no CSS-in-JS
- **marked** — the only runtime dependency besides React, used to render the docs
- **Google Material Symbols Outlined** as a font (ligatures) — no icon library
- No test runner, no configured linter

Deliberately *not* used, and why:

| Rejected | Reason |
|---|---|
| Tailwind | consumers would have to replicate the config; the source repos already use real CSS classes |
| Storybook | ~40 packages for what the site does with a 20-line hash router |
| react-router | a hash router is 20 lines |
| Any icon library | Material Symbols is a font; the name is the text content |

## Commands

```bash
npm install
npm run dev        # docs site with hot reload
npm run build      # tsc --noEmit + production build in dist/
npm run tokens     # regenerates src/tokens/tokens.css from tokens.json
npm run typecheck  # types only
```

**Always run `npm run build` after changing code** — it runs the typecheck and is the
only automated check available. There are no tests or lint.

> Port 5173 is often taken by another of the user's projects. If Vite fails with
> "Port 5173 is already in use", start it on another port (`npx vite --port 5199`).

## Conventions

- **Language:** reply to the user in **Brazilian Portuguese**. Code comments in
  Portuguese, short, and only when they explain *why*, not *what*.
- **Docs language:** English is the default (`README.md`); Portuguese is the extra
  (`README.pt-BR.md`). Both must be updated together — a component with only one of the
  two is incomplete.
- **Tokens:** never hardcode a value that exists in `tokens.json`. Use `var(--lc-*)`.
  `src/tokens/tokens.css` is **generated** — edit `tokens.json` and run `npm run tokens`.
- **Smallest possible change** that solves the request, in the style of existing code.

## The five design rules

Any new component must obey these. They are what makes the system read as one thing:

1. **Binary on = `--lc-text` (dark). Choosing between options = `--lc-accent` (yellow).**
   A `Switch` that is on goes dark; a selected `Button` goes yellow.
2. **Yellow is interaction, not state** — universal hover and focus ring.
3. **Numbers are mono** — Ubuntu Mono with `tabular-nums` for every value, hex,
   coordinate, count and text field. Running text and labels use Outfit.
4. **Labels recede (50% opacity), values advance (weight 700).**
5. **36px is the canonical height** of button, select and number field, so any row of
   controls lines up with no adjustment.

Plus the spacing rule: **padding belongs to the component, gap belongs to the container,
margin is the exception** (only three margins exist in the whole system — see the
Spacing page).

## Architecture

```
tokens.json                    single source for the visual tokens
scripts/build-tokens.mjs       tokens.json -> src/tokens/tokens.css
src/
  tokens/tokens.css            GENERATED — do not edit by hand
  styles/base.css              reset, .lc-dots, .lc-scroll, .lc-overline, .lc-mono
  components/<Name>/
    <Name>.tsx                 component
    <name>.css                 styles (imported by the .tsx)
    README.md                  English docs
    README.pt-BR.md            Portuguese docs
    <Name>.demo.tsx            interactive example (default export)
  index.ts                     export barrel
  docs/                        the site — NOT part of the package
    App.tsx                    hash router + chrome
    registry.ts                one line per component
    i18n.ts                    ~40 chrome strings, both languages
    BoxGuides.tsx              box-model inspector (docs only)
    pages/Foundations.tsx      interactive widgets for the foundation pages
    pages/foundations/*.md     foundation copy, one file per language
```

### Adding a component

1. Create `src/components/<Name>/` with the four files above.
2. Export it from `src/index.ts`.
3. Add one line to `src/docs/registry.ts` (imports both READMEs and the demo).
4. `npm run build`.

Nothing else is wired by hand — the nav, the interactive stage, the guides toggle and
the language switch all come from the registry entry.

### Foundation pages

Copy lives in markdown (`pages/foundations/<page>.md` and `.pt-BR.md`). Interactive
parts are stitched in by markers:

```md
## Radius

<!-- widget:radius-grid -->
```

The marker name maps to `WIDGETS` in `pages/Foundations.tsx`. **Translating a page means
translating a `.md`, never touching TSX.**

## Accessibility floor

Not optional, not simplified away:

- Every interactive element is a real `<button>` / `<input>` — never a `div` with
  `onClick`.
- Focus is never removed without restoring the accent ring (`--lc-focus-ring`).
- Icon-only buttons go through `IconButton`, which makes `label` required.
- State is never conveyed by color alone (position, fill, shape carry it too).
- `prefers-reduced-motion` is handled once in `base.css`.
- Sliders expose `aria-valuetext` (the formatted string), not just the raw number.

## Visual verification

Done with `playwright-core` (headless Chrome via `channel: "chrome"`) in the session
folder. Standard setup:

```js
import { chromium } from "playwright-core";
const b = await chromium.launch({ channel: "chrome" });
const p = await b.newPage({ viewport: { width: 1400, height: 900 } });
await p.addInitScript(() => localStorage.clear()); // clean theme/language state
await p.goto("http://localhost:5199/", { waitUntil: "networkidle" });
```

Check **both themes** (`document.documentElement.dataset.theme`) and both languages.
Clean up temporary screenshots/scripts when done.

## What not to do

- Don't add a dependency for something a few lines of CSS or the stdlib can do.
- Don't build a component "for later" — see `BACKLOG.md` for the open list and the
  questions that gate each item.
- Don't edit `src/tokens/tokens.css`.
- Don't let the English and Portuguese docs drift apart.
