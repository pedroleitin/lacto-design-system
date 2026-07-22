# Switch

Lacto's boolean. **There is no traditional checkbox for turning options on and
off in this system** — every toggle is a switch, inherited from the four source
projects.

## Visual rules

| Rule | Value |
|---|---|
| Track (md) | 70 × 17px, full radius |
| Track (sm) | 44 × 18px |
| Thumb | 39px wide (56% on `sm`) — more than half the track |
| Track fill | `color-mix(--lc-line 20%, transparent)` |
| Hit area | `outline: 4px` in the track color — grows without thickening the drawing |
| Off | **hollow** thumb: 4px `--lc-text` border, transparent fill |
| On | **solid** `--lc-text` thumb, flush right |
| Hover | track and outline both turn `--lc-accent` |
| Focus | 4px `--lc-accent` outline |
| Transition | position 0.15s · color 0.22s, both `--lc-motion-ease` |

The wide thumb is the signature: from a distance the control reads as a bar that
slides, not as a dot.

### This system's color rule

> **Binary on = `--lc-text` (dark). Choosing between options = `--lc-accent`
> (yellow).**

That is why an on switch is dark rather than yellow — here yellow is the
*hover*, signalling "clickable", and it is the selection color in `Button`,
`Segmented`, `Tabs` and `Select`.

In the dark theme the yellow hover would force a dark thumb on yellow; that is
the only case where the thumb switches to `--lc-panel`.

## Labelled row

With `label`, the component renders the whole row: label on the left at 50%
opacity, switch pushed right, `12px 20px` padding. This is the sidebar layout
from all four repositories. Without `label`, you get just the control.

## Accessibility

- `role="switch"` + `aria-checked` — the reader announces "on/off".
- `<label htmlFor>` connects the text to the control: clicking the label toggles.
- Space/Enter toggle (it is a native `<button>`).
- `kbd` emits `aria-keyshortcuts`.
- State never depends on color alone: thumb position and hollow/solid are
  redundant with the color.

## Props

| Prop | Type | Default |
|---|---|---|
| `checked` | `boolean` | — |
| `onChange` | `(checked: boolean) => void` | — |
| `label` | `ReactNode` | — |
| `kbd` | `string` | — |
| `size` | `"sm" \| "md"` | `"md"` |
| `disabled` | `boolean` | `false` |

## Usage

```tsx
<Switch label="Hide guides" kbd="h" checked={hide} onChange={setHide} />
<Switch aria-label="Sound" checked={sound} onChange={setSound} size="sm" />
```

## When to use `Checkbox` instead

Only for **multi-select lists** (ticking several items of a set) and forms with
an explicit submit. Switch = immediate effect; checkbox = a choice that only
counts once confirmed.
