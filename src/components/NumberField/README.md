# NumberField

Numeric input with the **same silhouette as `Select` and `Button`** — 36px tall,
104px minimum width, 10px radius. That is what lets you build a row of controls
(`Select` + `NumberField` + `Button`) with nothing falling out of line.

## Visual rules

| Rule | Value |
|---|---|
| Height | 36px · min width 104px |
| Background | `--lc-surface`, no border |
| Radius | 10px |
| Prefix/suffix | `--lc-muted`, not selectable |
| Number | **mono, 700, `tabular-nums`, right-aligned** |
| Focus | `--lc-focus-ring` on the whole pill |

### No spinners

The native `input[type=number]` arrows are removed (`appearance: textfield` plus
the `-webkit-*-spin-button` rules). They break vertical alignment, are too small
to aim at, and duplicate what the keyboard arrows already do better.

Right alignment plus `tabular-nums`: the digits stay anchored and the field
doesn't breathe when the number goes from 9 to 10.

## Local draft

The typed value lives in local state until `blur` or `Enter`. Without that,
legitimate intermediate states — `""`, `"-"`, `"1."` — would be coerced to `NaN`
or `0` on every keystroke, and the field would fight whoever is typing.

- `Enter` commits and clamps to `min`/`max`.
- `Esc` discards and restores the previous value.
- `blur` commits.

## Accessibility

- Native `<input type="number">`: ↑↓ arrows step by `step`, and the numeric
  keypad appears on mobile.
- `prefix` becomes a real `<label htmlFor>`; without it, pass `aria-label`.
- `min`/`max`/`step` are native attributes, so assistive tech reads the valid
  range.

## Props

| Prop | Type | Default |
|---|---|---|
| `value` | `number` | — |
| `onChange` | `(value: number) => void` | — |
| `prefix` | `string` | — |
| `suffix` | `string` | — |
| `min` / `max` | `number` | — |
| `step` | `number` | `1` |
| `disabled` | `boolean` | `false` |

## Usage

```tsx
<NumberField prefix="Duration" suffix="s" min={1} max={60}
             value={dur} onChange={setDur} />
```

## When to use `Slider` instead

When the number is **explored** (you drag until it looks right) rather than
typed. `NumberField` is for exact, known values: duration, FPS, margin.
