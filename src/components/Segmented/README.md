# Segmented

A single choice among 2–4 short options, all visible at once. It is Lacto's most
characteristic control: a recessed track with **one** solid segment on top.

## Shapes and tones

| | Track | Active segment | Where |
|---|---|---|---|
| `rounded` + `ink` | 10px radius, `line 20%` fill | solid `--lc-text`, 7px radius | **Default.** Sidebar, settings panel |
| `pill` + `ink` | full radius, options at 45% opacity | solid `--lc-text`, full radius | A row of icons (animation mode) |
| `rounded` + `accent` | `--lc-surface`, 1px dividers | `--lc-accent` | Toolbar, next to `Button` |

Rule: inside a **sidebar or panel** use `ink` (the active option is dark, yellow
is only hover). In the **toolbar** use `accent`, so the selected segment speaks
the same language as `Button active`.

## Visual rules

| Rule | Value |
|---|---|
| Track padding | 3px (`accent` tone: 0) |
| Enlarged hit area | `outline: 3px` in the track color |
| Track hover | everything turns `--lc-accent` at once |
| Option | 13px / 500, `padding: 6px 12px`, 7px radius |
| `pill` option | min 44px wide, 30px tall |
| Active | `--lc-text` fill, `--lc-panel` text |
| Transition | option color 0.15s · track 0.22s |
| Focus | `--lc-focus-ring` on the segment |

Hover paints the **whole track** yellow, not the segment under the cursor. That
is deliberate: it signals "this control is clickable" without promising which
option would be chosen. In the dark theme the segments invert to stay readable
on yellow.

## Two options: click to toggle

With **exactly two** options the control becomes a toggle: clicking the option
that is already active switches to the other one. Clicking either half always
changes the value.

Without it, half the clicks on a binary control do nothing — and two boxes side
by side read as a switch, so people click the one they can see rather than the
one they want. It kicks in automatically; there is no prop.

It does not apply with three or more options (there would be no single "other"
to move to), and it skips a disabled sibling.

> The control keeps `role="radiogroup"`, which describes the state correctly.
> Re-clicking a checked native radio does nothing, so this is a deliberate
> pointer affordance on top of the standard behaviour — not a replacement for
> it. If the two options are opposites of one setting rather than two named
> choices, use `Switch` instead.

## Icons

`icon` takes a Material Symbols glyph, rendered at 16px. An icon-only option
**requires** `title` — it becomes `aria-label` and feeds the `Tooltip`.

## Labelled row

With `label`, you get the full sidebar row (label at 50% opacity on the left,
control on the right, `12px 20px` padding), just like `Switch`. Use `width` to
line up tracks of different sizes in the same column.

## Accessibility

- `role="radiogroup"` with `role="radio"` + `aria-checked` on each option.
- Pass `aria-label` when there is no visible `label`.
- The active option is never distinguished by color alone: the solid fill
  changes the shape, and in `pill` the opacity changes too.

## Props

| Prop | Type | Default |
|---|---|---|
| `options` | `SegmentedOption[]` | — |
| `value` | `string` | — |
| `onChange` | `(value: string) => void` | — |
| `label` | `ReactNode` | — |
| `kbd` | `string` | — |
| `shape` | `"rounded" \| "pill"` | `"rounded"` |
| `tone` | `"ink" \| "accent"` | `"ink"` |
| `width` | `number \| string` | auto |

`SegmentedOption`: `{ value, label?, icon?, title?, disabled? }`

## Usage

```tsx
<Segmented
  label="Mode" kbd="m" width={140}
  value={mode} onChange={setMode}
  options={[{ value: "draw", label: "Draw" }, { value: "paint", label: "Paint" }]}
/>
```

## When NOT to use it

More than 4 options, or long labels → `Select`. Options with descriptions →
`RadioGroup`. Navigating between screens → `Tabs`.
