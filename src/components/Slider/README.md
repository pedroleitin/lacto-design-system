# Slider

Two variants of the same control. `bar` is Lacto's signature.

## `variant="bar"` (default)

A tall pill whose **dark fill is the value**, with the label on the left and the
number on the right, **inside** it. No thumb, no external label: the whole
control is the bar.

### Rest and hover

The slider stays discreet until you get close. At rest the track and fill are
nearly invisible and only the label and value carry contrast — a column of ten
sliders reads as a list of values, not as ten bars fighting each other. On hover
(or keyboard focus) all three gain weight **at the same time**, over 0.18s.

| Rule | Rest | Hover / focus |
|---|---|---|
| Track | `--lc-line` at **20%** | full `--lc-line` |
| Fill | `--lc-text` at **5%** | solid `--lc-text` |
| Light text | `opacity: 0` | `opacity: 1` |

| Rule | Value |
|---|---|
| Height | 34px, full radius |
| Text padding | `0 15px` |
| Label | Outfit 13px |
| Value | **mono, 700, tabular-nums** |
| Transition | `--lc-motion-slider` (0.18s `ease`) |
| Focus | `--lc-focus-ring` ring |

The light text is only revealed together with the dark fill — at rest it would
be white on a light background. The trick: the text is drawn **twice** — dark on
the light track, and light inside the fill (which has `overflow: hidden`,
clipping it at the exact position). So the text contrasts at any value, with no
luminance math. The light copy must be as wide as the whole track; a
`ResizeObserver` keeps that measurement current.

## `variant="track"`

Label and value **above**, a 16px track with a 16px round thumb. For narrow
columns where the text would not fit inside the bar.

| Rule | Value |
|---|---|
| Header | label `--lc-text` at 50% · value `--lc-muted` mono |
| Track | 16px, `--lc-line`, full radius |
| Fill | `--lc-text`, square right edge |
| Thumb | 16px `--lc-text` |
| Hover | `0 0 0 4px` halo of `--lc-accent` at 45% on the thumb |

## Numbers are always mono

Every displayed value uses `--lc-font-mono` with `tabular-nums`. That is why the
number does not jitter while you drag — every digit takes the same width. A
system rule, not a detail of this component.

## Interaction

- **Mouse/touch**: clicking anywhere jumps to that value; dragging continues.
  `setPointerCapture` keeps the gesture alive outside the box.
- **Keyboard**: `←↓` / `→↑` = ±`step` · `PageUp/PageDown` = ±10% of the range ·
  `Home`/`End` = min/max.
- `touch-action: none` — dragging does not scroll the page.

## Accessibility

- `role="slider"` with `aria-valuemin/max/now` and **`aria-valuetext`** (the
  formatted text, e.g. `"45%"`, is what the reader announces — not the raw
  number).
- `aria-label` comes from `label`.
- Disabled leaves the tab order (`tabIndex: -1`) and sets `aria-disabled`.

## Props

| Prop | Type | Default |
|---|---|---|
| `label` | `string` | — |
| `value` | `number` | — |
| `onChange` | `(value: number) => void` | — |
| `min` / `max` | `number` | `0` / `100` |
| `step` | `number` | `1` |
| `suffix` | `string` | `""` |
| `format` | `(v: number) => string` | — |
| `variant` | `"bar" \| "track"` | `"bar"` |
| `disabled` | `boolean` | `false` |

## Usage

```tsx
<Slider label="Columns" min={1} max={20} value={cols} onChange={setCols} />
<Slider label="Opacity" min={0} max={1} step={0.05} value={op}
        onChange={setOp} format={(v) => v.toFixed(2)} />
```

In a stack of `bar` sliders, use `gap: 9px` — that is the system's breathing
room.
