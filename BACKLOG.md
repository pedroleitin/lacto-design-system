# Backlog

Pending work / ideas for upcoming iterations.

The component list below is also rendered in the docs site under **What's missing**
(`#/backlog`), with the full reasoning for each item. This file is the actionable
version: the questions that gate each item, plus the non-component work.

---

## Blocked on a decision

Nothing here can be built until these are answered.

- [ ] **Checkbox — dark or yellow fill?** Designed here (no source repo had a real
  checkbox; they all use `Switch`). Currently checked = filled with `--lc-text`,
  consistent with `Switch`. The alternative is `--lc-accent`, consistent with an active
  `Button`. *Confirm or change.*
- [ ] **RadioGroup — is `hint` enough?** Currently each option can carry a second line
  in `--lc-muted`. Do any cases need a thumbnail / visual preview instead?

## Next up (recommended order)

- [ ] **Modal / Dialog** — the only gap that currently forces a hack (`window.confirm`)
  on a destructive action. Already decided by the language: `--lc-glass` + blur, 20px
  radius, `--lc-shadow-panel`, native `<dialog>` (focus trap and `Esc` for free).
  *Open: dimmed overlay behind it, or just the glass blur? Fade + scale, or slide up
  like `Toast`?*
- [ ] **Popover / Context menu** — the whole mechanism already sits inside `Select`
  (portal, flip positioning, close on scroll). Extracting it is cheap and unlocks a
  canvas context menu. *Open: submenus? Anchored to an element, or at the cursor
  position for right-click?*
- [ ] **Progress** — video/sequence export is slow enough to need more than the
  `Badge pill` text. Already decided: `--lc-text` fill over a `--lc-line` track, 16px,
  full radius (identical to `Slider variant="track"`). *Open: linear bar or a ring
  around the triggering button? Indeterminate: pulse or travel?*

## Components — waiting for a real need

Each is YAGNI until a project asks. Listed so the decision is explicit rather than
forgotten.

- [ ] **Card** — content card (project thumbnail, gallery item, history snapshot;
  grid_connect's `.snap-item` is nearly this). *Open: whole card clickable, or internal
  hover-revealed actions like `Badge corner`?*
- [ ] **Textarea** — trivial from `TextField` (`min-height`, `resize: vertical`).
  *Open: character counter?*
- [ ] **Searchable combobox** — `Select` does not filter; past ~15 options (fonts,
  presets, shapes) it gets unpleasant. *Open: local filter or async loading?*
- [ ] **Alert / Banner** — the persistent counterpart to `Toast` ("export mode active",
  "unsaved file"). Tones already exist in `tokens.json`. *Open: pinned to the top or
  inline in the panel flow? Dismissible?*
- [ ] **Empty state** — `.lc-dots` + `Icon xl` + `--lc-muted` text + `Button pill`.
  *Open: custom illustration (grid-gen-2's stroke-draw animations suit this) or just an
  icon?*
- [ ] **Table** — rules already set (header in `.lc-overline`, rows split by
  `Divider full`, `--lc-hover` on hover, numbers in mono with `tabular-nums`).
  *Open: column sorting? Row selection? Frozen column?*
- [ ] **Tag / Chip** — removable chip for an applied filter. `Badge` covers the static
  marker.
- [ ] **Date / Time** — if ever needed, the lazy answer is `<input type="date">` styled
  with the tokens. *Open: date range or single date?*
- [ ] **Skeleton** — only makes sense with remote loading; every source project is
  local. *Open: will a new project load over the network?*
- [ ] **Avatar** — only makes sense with multiple users. *Open: accounts or
  collaboration in a new project?*
- [ ] **Breadcrumb / Pagination** — only for hierarchical navigation or long lists.
  Likely permanent YAGNI.

## Responsiveness

- [ ] **Mobile version** — nothing in the system was designed mobile-first. What exists
  today is damage control: `Sidebar` becomes a full-width bottom strip below 640px,
  `Tabs` scrolls horizontally instead of wrapping, and the docs grid collapses to one
  column at 860px. Everything else assumes a pointer and a wide viewport. Needs a pass
  over:
  - **Touch targets** — `Switch` (17px tall track), `Kbd`, `Badge corner` and the
    `Segmented` options are below the 44px comfortable minimum. The `outline` trick
    already enlarges the hit area on `Switch` and `Segmented`; the others do not have it.
  - **Hover-only affordances** — `Slider variant="bar"` only reveals its fill on hover,
    `TextField action` only appears on hover, `Badge onHover` is invisible until hover,
    and `Tooltip` has no touch equivalent. On a touch device these are all permanently
    in their resting state. *Open: reveal them on `:active`/focus, or keep them
    always-on below a breakpoint?*
  - **Floating panels** — `Panel anchor` positions assume screen corners that a phone
    does not really have. Likely a bottom sheet instead.
  - **The docs site itself** — the nav is a 280px column; on a phone it should collapse
    behind a button.
  - *Open: is there a target device, or is this "usable on a tablet" rather than "built
    for a phone"?*

## Documentation

- [ ] **Box-model guides: more room and more detail** — the inspector works but is
  cramped and only reports the basics.
  - **Breathing room:** with guides on, the stage should loosen up — more padding, more
    space between the demo elements — so the overlays of adjacent elements stop
    touching. Today a dense row (the `Button` demo) turns into a wall of dashed
    outlines.
  - **More detail:** the chip shows tag, size, padding, margin and radius. Missing:
    `gap` on the parent, `font-size`/`font-weight`, the resolved colors, and — most
    useful — **the token name instead of the raw pixel value** (`--lc-space-7` rather
    than `14`, `--lc-radius-lg` rather than `10px`), which is what actually teaches the
    system. That means a reverse lookup from computed value to token in `tokens.json`.
  - *Open: should the chip stay pinned to the hovered element, or move to a fixed panel
    at the side of the stage so it never covers what you are inspecting?*
- [ ] **Test the placement of the theme and language buttons** — right now the theme
  toggle sits next to the wordmark and the `EN / PT` switch sits on its own row below
  it, which eats vertical space at the top of the nav and reads as two unrelated
  controls. Worth trying: both on the same row; both moved to the bottom of the nav
  (they are set-once controls, not navigation); or a single settings popover. *Open:
  does the language switch need to be visible at all times, or is it a preference you
  set once?*
- [ ] **Translate demo copy** — example labels ("Columns", "Draw", "Exported as SVG")
  are English-only; the `EN / PT` switch does not reach them. Doing it properly needs a
  string map per demo (23 files) for content that is illustrative, not normative.
- [ ] **Usage/anti-usage pairs** — several READMEs describe when *not* to use a
  component in text; a side-by-side visual example would land harder.
- [ ] **Copy-to-clipboard on code blocks** in the docs site.

## Infrastructure

- [ ] **Publish as a package** — currently consumed by path
  (`import "lacto/src/styles/base.css"`). Decide between publishing to npm and
  consuming via a git dependency, then add a build that emits `dist/` types + CSS.
- [ ] **Tests** — none exist. The smallest useful start: a check that every entry in
  `src/docs/registry.ts` resolves to a component with both READMEs and a demo, and that
  every `var(--lc-*)` used in component CSS exists in `tokens.json`.
- [ ] **Linter** — no ESLint config. The source repos have one; worth matching.
- [ ] **Deploy the docs site** — static build, so any host works. Vercel matches the
  other projects.
- [ ] **Visual regression** — screenshot each component page in both themes and diff on
  change. Only worth it once the component set stops moving.

## Known issues

- [ ] **Dark-theme contrast on hovered `Segmented` / `Switch`** — the yellow hover forces
  per-theme overrides for the thumb and segment colors. It works, but the rule is
  encoded as CSS exceptions rather than as tokens. Worth revisiting if a third theme
  ever appears.
- [ ] **`Accordion` keeps closed content in the DOM** — required by the
  `grid-template-rows: 0fr → 1fr` animation. Heavy controls inside a closed section
  still mount; document the workaround or offer a `lazy` prop.
