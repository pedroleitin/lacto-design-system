# Icon

A wrapper around **Google Material Symbols Outlined**. The glyph is a ligature:
the icon name is the text content of the `<span>`. No inline SVG, no JavaScript
icon library.

The font is loaded once in `index.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block" rel="stylesheet" />
```

> `display=block` (not `swap`) prevents the icon name flashing as plain text
> before the font loads.

## Visual rules

| Rule | Value |
|---|---|
| Family | `Material Symbols Outlined` |
| Optical weight | `wght 500`, `opsz 24`, `GRAD 0` |
| Fill | `FILL 0` (default) · `FILL 1` with `filled` |
| Color | `currentColor` — inherits from the parent button or text |
| Alignment | `line-height: 1`, `flex-shrink: 0` |

### Sizes

| Token | px | Where |
|---|---|---|
| `xs` | 14 | Badge, `Kbd`, inline field action |
| `sm` | 16 | Compact button (30px), menu item |
| `md` | 20 | **Default.** Inside 34–36px buttons |
| `lg` | 24 | Heading, standalone icon, empty state |
| `xl` | 32 | Illustration, dropzone |

### Tones

`inherit` (default, follows the parent) · `muted` · `accent` · `danger`.
An icon inside a button **never** sets its own color — let it inherit, or the
`active` state (yellow fill) becomes unreadable.

## Accessibility

- Without `label` the icon is decorative and gets `aria-hidden="true"`.
- With `label` it becomes `role="img"` with an accessible name.
- An icon that is a button's only content needs `aria-label` **on the button**
  (see `IconButton`), not on the icon.
- `translate="no"` keeps machine translators from breaking the ligature.

## Props

| Prop | Type | Default |
|---|---|---|
| `name` | `string` | — |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"` |
| `tone` | `"inherit" \| "muted" \| "accent" \| "danger"` | `"inherit"` |
| `filled` | `boolean` | `false` |
| `label` | `string` | — |

## Usage

```tsx
<Icon name="undo" />
<Icon name="favorite" filled tone="accent" />
<Icon name="delete" size="sm" label="Delete" />
```

## Lacto's canonical icons

`undo` `redo` `pan_tool` `fit_screen` `zoom_in` `zoom_out` `palette` `draw`
`ink_eraser` `download` `upload` `settings` `dark_mode` `light_mode`
`volume_up` `play_arrow` `pause` `close` `add` `delete` `content_copy`
`expand_more` `chevron_right` `check` `casino` (random).
