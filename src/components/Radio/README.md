# RadioGroup

> **New component.** What the source projects called a "radio button" (grid-gen-2's
> *Animate* control) is actually a pill-shaped icon `Segmented`. The classic
> radio did not exist. Created here for the case `Segmented` does not cover.
> **Confirm or adjust the design.**

## Radio or Segmented?

| Situation | Component |
|---|---|
| 2–4 short options, side by side, switched often | `Segmented` |
| Options with a description, long labels, or more than 4 | `RadioGroup` |
| A choice inside a long form | `RadioGroup` |
| Tool/mode selection in a toolbar | `Segmented` or `Tabs` |

## Visual rules

| Rule | Value |
|---|---|
| Marker | 18px circle, 2px `--lc-line-strong` border |
| Inner dot | 8px `--lc-text`, enters with `scale(0 → 1)` over 0.15s |
| Selected | border turns `--lc-text` |
| Hover | border turns `--lc-accent` |
| Press | `scale(0.93)` |
| Focus | `--lc-focus-ring` |
| Label | 14px `--lc-text` |
| Hint | 12px `--lc-muted`, second line |
| Spacing | column 10px · row 14px |
| Legend | `.lc-overline` style (12px uppercase tracked, `--lc-muted`) |

The dot grows from the center instead of appearing all at once — the same
softness as the `Switch` thumb.

## Accessibility

- `<fieldset>` + `<legend>` group it semantically: the reader announces the
  group title before each option.
- Native inputs sharing a `name`: **arrow keys navigate between options for
  free**, and only one item enters the tab order (the correct radio-group
  behaviour).
- `hint` sits inside the `<label>`, so it is announced too.
- Never leave a `RadioGroup` with nothing selected when an obvious default
  exists.

## Props

| Prop | Type | Default |
|---|---|---|
| `legend` | `ReactNode` | — |
| `options` | `RadioOption[]` | — |
| `value` | `string` | — |
| `onChange` | `(value: string) => void` | — |
| `name` | `string` | generated |
| `direction` | `"column" \| "row"` | `"column"` |

`RadioOption`: `{ value, label, hint?, disabled? }`

## Usage

```tsx
<RadioGroup
  legend="Format"
  value={fmt}
  onChange={setFmt}
  options={[
    { value: "svg", label: "SVG", hint: "Vector" },
    { value: "png", label: "PNG", hint: "Bitmap" },
  ]}
/>
```
