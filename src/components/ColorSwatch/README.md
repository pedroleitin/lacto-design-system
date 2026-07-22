# ColorSwatch

A square (or circle) of color that opens the operating system's native picker
when clicked.

## The native input trick

`<input type="color">` is irreplaceable — it is the only thing that opens the OS
picker, with the eyedropper and system palettes. But it cannot be styled: every
browser gives it its own corners and chrome.

The fix: the `<input>` is sized to **150% width and height, offset by -25%**,
inside a wrapper with `overflow: hidden`. The native edges fall outside the
visible area and the color fills the wrapper completely. The hit area is still
the input, so native behaviour is preserved 100%.

## Visual rules

| Rule | Value |
|---|---|
| Size | `md` 34px · `lg` 46px |
| Radius | `--lc-radius-sm` (6px), or full with `round` |
| Border | 1px `--lc-line` (`lg`: 1.5px) |
| Hover | border turns `--lc-accent`; `round` also does `scale(1.08)` |
| Press | `scale(0.96)` |
| Selected | `outline: 2px --lc-accent` with `outline-offset: 1px` |
| Focus | same outline as selected |

The selected state uses an **outside** `outline`, never a `border` — a border
would eat pixels of the color area, and on a 34px swatch that changes the
perceived color.

## Read-only

Without `onChange` the input is not rendered: the swatch becomes static, with no
pointer cursor and no hover. For displaying a palette that cannot be edited.

## `ColorSwatchAdd`

A dashed button the same size, for adding a color. Dashed outline plus a `+` in
`--lc-muted`; on hover both turn `--lc-accent`. Always the **last** item in the
row.

## Accessibility

- The input gets an `aria-label` with the color value (`"Color #FFC800"`).
- The wrapper gets a `title` — Lacto's `Tooltip` shows the hex on hover.
- Color is **never** the only information: pair it with `TextField hex` when the
  exact value matters. People who cannot tell the colors apart need the code.
- `focus-within` shows the outline, so tabbing through a palette is visible.

## Props

| Prop | Type | Default |
|---|---|---|
| `value` | `string` (hex) | — |
| `onChange` | `(value: string) => void` | — (read-only without it) |
| `selected` | `boolean` | `false` |
| `round` | `boolean` | `false` |
| `size` | `"md" \| "lg"` | `"md"` |
| `label` | `string` | the hex itself |

## Usage

```tsx
<ColorSwatch value={color} onChange={setColor} />

<div className="lc-swatches">
  {palette.map((c, i) => (
    <ColorSwatch key={i} value={c} selected={i === sel} onChange={(v) => setAt(i, v)} />
  ))}
  <ColorSwatchAdd onClick={add} />
</div>
```

`.lc-swatches` is the row utility: `flex`, `wrap`, `gap: 6px`.
