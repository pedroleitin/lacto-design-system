# COPILOT.md — Lacto Design System

Guide for GitHub Copilot / AI agents in this repository.

> Project instructions are shared across agents. The canonical content lives in
> [`CLAUDE.md`](./CLAUDE.md) — read it first. This file summarizes the essentials.

## TL;DR

- **Project:** a design system distilled from four canvas tools (SVG_DRAW,
  grid_connect, grid-gen-2, swatch). 23 components + a browsable docs site.
- **Stack:** React 19 + Vite 7 + TypeScript + plain CSS custom properties.
  Only runtime dep besides React is `marked`. No Tailwind, no Storybook, no tests, no
  lint.
- **Language:** reply to the user in **Brazilian Portuguese**. Docs default to English
  (`README.md`), with `README.pt-BR.md` alongside.
- **Validate:** `npm run build` after any code change (runs `tsc --noEmit`; the only
  automated check). Visual verification via `playwright-core` (headless Chrome).
- **Style:** use `var(--lc-*)` from `tokens.json`; never hardcode a UI color, size,
  radius or duration.

## Commands

```bash
npm install
npm run dev        # docs site (5173, or --port 5199 if taken)
npm run build      # tsc --noEmit + dist/ — run to validate
npm run tokens     # tokens.json -> src/tokens/tokens.css (generated file)
```

## The five design rules

1. Binary on = `--lc-text` (dark). Choosing between options = `--lc-accent` (yellow).
2. Yellow is interaction (hover, focus), not state.
3. Numbers are mono — Ubuntu Mono + `tabular-nums`.
4. Labels recede (50% opacity), values advance (weight 700).
5. 36px is the canonical control height.

Spacing: **padding belongs to the component, gap to the container, margin is the
exception.**

## Code map

| Path | Responsibility |
| --- | --- |
| `tokens.json` | single source for colors, type, spacing, radius, motion, sizes |
| `scripts/build-tokens.mjs` | generates `src/tokens/tokens.css` (never edit that file) |
| `src/styles/base.css` | reset, `.lc-dots`, `.lc-scroll`, `.lc-overline`, `.lc-mono` |
| `src/components/<Name>/` | `.tsx` + `.css` + `README.md` + `README.pt-BR.md` + `.demo.tsx` |
| `src/index.ts` | export barrel — the public API |
| `src/docs/registry.ts` | one line per component; drives nav, stage and language switch |
| `src/docs/i18n.ts` | ~40 chrome strings in both languages |
| `src/docs/BoxGuides.tsx` | box-model inspector, docs only, not exported |
| `src/docs/pages/foundations/*.md` | foundation copy, one file per language |

## Adding a component

1. `src/components/<Name>/` with the five files.
2. Export from `src/index.ts`.
3. One line in `src/docs/registry.ts`.
4. `npm run build`.

## Accessibility floor

Real `<button>`/`<input>` elements; focus ring never removed; `IconButton` requires
`label`; state never conveyed by color alone; `prefers-reduced-motion` handled in
`base.css`; sliders expose `aria-valuetext`.

## Don't

- Add a dependency for what a few lines of CSS or the stdlib can do.
- Build components speculatively — see [`BACKLOG.md`](./BACKLOG.md).
- Edit `src/tokens/tokens.css`.
- Update one language's docs without the other.
