# What's missing

The 23 existing components came from your repositories. This list is what a
complete design system usually has and **your projects never needed** — because
they are four canvas tools, not form-and-content applications.

Nothing here has been built. Each item states what the existing language already
decides, and **the question only you can answer**. Answer the ones that matter
and I will build them.

---

## Already created by me — confirm the design

I built these two because the gap was too large to ignore. They are marked
**NEW** in the navigation.

### Checkbox

None of the four repositories has a checkbox: they all use `Switch`, including
for what would be multi-select.

What I drew: an 18px square, 6px radius, 2px `--lc-line-strong` border, checked =
filled with `--lc-text` and a `check` glyph in `--lc-panel`, yellow hover.

**Question:** should the checked fill be dark (`--lc-text`, as I drew it,
consistent with `Switch`) or yellow (`--lc-accent`, consistent with an active
`Button`)?

### RadioGroup

What grid-gen-2 calls a "radio button" (its *Animate* control) is in fact a
pill-shaped icon `Segmented` — already covered. The classic radio did not exist.

What I drew: an 18px circle with an 8px inner dot that grows with `scale(0→1)`.

**Question:** does the `hint` (a second line in `--lc-muted`) cover your case, or
do you need options with a thumbnail/visual preview?

---

## Structure and navigation

### Modal / Dialog

Does not exist in any project — everything is a non-modal floating panel, which
is correct for canvas tools. But destructive confirmation ("delete this
palette?") currently has nowhere to live.

Already decided by the language: `--lc-glass` + blur, 20px radius,
`--lc-shadow-panel`, a native `<dialog>` (focus trap and `Esc` for free).

**Questions:** a dimmed overlay behind it, or just the glass blur? Does it enter
with a fade + scale, or slide up from the bottom (like `Toast`)?

### Popover / Context menu

`Select` already has the entire mechanism: portal, positioning with flipping,
close on scroll. What is missing is generalising it into a reusable `Popover`
(right-click on the canvas, a "more actions" menu).

**Questions:** do you need submenus? Does it need to appear at the cursor
position (right-click) or always anchored to an element?

### Card

You have `Panel`, which handles a controls panel. What is missing is the
**content** card — a project thumbnail, a gallery item, a history snapshot
(grid_connect's `.snap-item` is nearly that).

Already decided: `--lc-surface`, 12–15px radius, hover with an `--lc-accent`
border.

**Questions:** is the whole card clickable, or does it have internal actions
(delete, duplicate) revealed on hover, like `Badge corner`?

### Breadcrumb / Pagination

These only make sense in an app with hierarchical navigation or long lists. None
of the four has either.

**Question:** will a new project have paginated lists? If not, this is YAGNI —
leave it out.

---

## Data entry

### Textarea

Trivial from `TextField` (same box, `min-height`, `resize: vertical`). I did not
build it because no project has a long text field.

**Question:** do you need a character counter?

### Searchable combobox

The current `Select` does not filter. Past roughly 15 options (fonts, presets,
shapes) it becomes unpleasant.

**Question:** does the search filter locally, or does it need to load
asynchronously?

### Date / Time

No project has dates. If you need them, the lazy answer is
`<input type="date">` styled with the tokens — native, accessible, zero
dependencies.

**Question:** do you need a date range, or is a single date enough?

---

## Feedback and state

### Progress / Spinner

`Badge pill` already covers textual progress ("Exporting 42%") and is what your
projects use. What is missing is the bar and the indeterminate state.

Already decided: `--lc-text` fill over a `--lc-line` track, 16px, full radius —
identical to `Slider variant="track"`.

**Questions:** a linear bar, or a ring around the button that triggered the
action? For indeterminate: does it pulse or travel?

### Skeleton

Only makes sense with remote loading. Your projects are all local.

**Question:** will a new project load data over the network?

### Alert / Banner

`Toast` covers the ephemeral. What is missing is the **persistent** message
("export mode active", "unsaved file").

Already decided: the `danger`/`success`/`info` tones already exist in
`tokens.json`.

**Questions:** where does it live — pinned to the top, or embedded in the panel
flow? Is it dismissible?

### Empty state

An empty canvas, a search with no results. It combines `.lc-dots` + `Icon xl` +
`--lc-muted` text + a `Button pill`.

**Question:** do you want a custom illustration (the stroke-drawing animations in
grid-gen-2's `App.css` are great for this) or is an icon enough?

---

## Data

### Table

No project has a table. If you need one, the rules are already set: header in
`.lc-overline`, rows separated by `Divider full`, `--lc-hover` on hover,
**numbers in mono with `tabular-nums`**.

**Questions:** do you need column sorting? Row selection? A frozen column?

### Avatar / Tag / Chip

`Badge` covers the small marker. What is missing is the removable chip (an
applied filter) and the avatar (which only makes sense with multiple users).

**Question:** will a new project have accounts or collaboration? If not, drop the
avatar.

---

## Recommendation

If I had to pick **three** to build now, in order:

1. **Modal/Dialog** — the only gap that currently forces a hack
   (`window.confirm`) on a destructive action.
2. **Popover** — the mechanism is already sitting inside `Select`; extracting it
   is cheap and unlocks a canvas context menu.
3. **Progress** — video/sequence export is slow enough to need more than a text
   pill.

The rest waits until a real project asks. A component built "for later" ages
without ever being used — and then someone has to decide whether to fix it or
delete it.
