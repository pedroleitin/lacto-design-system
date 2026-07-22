# RangeSlider

A range with **two thumbs** — a minimum and a maximum. It reuses the entire look
of `Slider variant="track"`: same 16px track, same 16px thumbs, same yellow
hover halo. The only difference is that the fill sits **between** the thumbs
rather than from the start to the value.

## Visual rules

| Rule | Value |
|---|---|
| Track | 16px, `--lc-line`, full radius |
| Fill | `--lc-text`, between the two thumbs, **no radius** |
| Thumbs | 16px `--lc-text` |
| Ticks | 6px `--lc-panel` dots at 50% opacity |
| Hover | `0 0 0 4px` halo of `--lc-accent` at 45% |
| Header | label `--lc-text` · value mono at 50% |

The center fill is square on purpose: rounded, it would read as a displaced
simple `Slider` rather than an interval.

## `ticks`

Pass labels by position (`["Empty","Short","Long","Double"]`) and the component:

1. draws the tick marks on the track,
2. shows the **name** instead of the number in the header and in
   `aria-valuetext`.

That is the right mode for categorical ranges. For numeric ranges, use `format`.

## Interaction

- **Pointer**: clicking moves the nearest thumb. On a tie (clicking exactly in
  the middle) it decides by side — clicking right of the max moves the max. The
  clicked thumb becomes "active" for the keyboard.
- The thumbs **cannot cross**: each is bounded by the other.
- **Keyboard**: arrows move the active thumb · `PageUp/PageDown` ±10% ·
  `Home`/`End` · **`[` and `]` switch which thumb the arrows control**.

## Accessibility

- The track is a `role="group"` with `aria-label`; each thumb is a
  `role="slider"` with its own `aria-valuenow` and `aria-valuetext`.
- Each thumb's `aria-valuemin/max` is bounded by the other, so the reader
  announces the real range of movement.
- One tab stop for the pair, with `[`/`]` switching inside — this avoids
  cluttering the tab order with two stops per range.

## Props

| Prop | Type | Default |
|---|---|---|
| `label` | `string` | — |
| `value` | `[number, number]` | — |
| `onChange` | `(value: [number, number]) => void` | — |
| `min` / `max` | `number` | `0` / `100` |
| `step` | `number` | `1` |
| `ticks` | `string[]` | — |
| `format` | `(v: number) => string` | — |
| `disabled` | `boolean` | `false` |

## Usage

```tsx
<RangeSlider label="Size" min={0} max={100} value={size}
             onChange={setSize} format={(v) => `${v}px`} />
```
