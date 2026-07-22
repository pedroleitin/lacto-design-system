# Badge

A small marker: a counter, a state, a corner mark, a thumbnail's delete button.

## Tones

| Tone | Use |
|---|---|
| `neutral` | count, quantity |
| `accent` | permanent mark ("this shape is animated"), progress |
| `danger` | delete |
| `success` | confirmation |

## Visual rules

| Rule | Value |
|---|---|
| Height | 15px · `min-width: 15px` (a circle when it holds one character) |
| Font | 9px / 700 |
| Radius | full (`accent`: `--lc-radius-xs`, 4px) |
| `pill` | `padding: 5px 11px`, 12px / 500, `tabular-nums` |
| `corner` | `position: absolute`, 3px from the corner, `z-index: 2`, `--lc-shadow-badge` |

The `accent` tone uses 4px corners instead of a circle: it is a permanent
**tag**, and the squarer shape sets it apart from the round action badge.

## Corner mark

The parent needs the `.lc-badge-host` class and `position: relative`.

- `corner="left"` — a **permanent** state mark (the item is animated, is new…).
- `corner="right"` + `onHover` — an **action**, typically delete: invisible until
  the mouse enters the item.

This keeps a thumbnail grid clean and puts the destructive action exactly where
the hand already is.

## Clickable badge

With `onClick` it renders a `<button>` and **requires `label`** (it becomes
`aria-label` and `title`, feeding the `Tooltip`). A nameless "×" is unreadable
to a screen reader.

## `:empty`

A badge with no content is not rendered (`display: none`). So a progress pill can
sit in the JSX permanently and only appear once it has text — no conditional in
the parent.

## Accessibility

- An informational badge is decorative if the data is already in the adjacent
  text; if it isn't, give the parent an `aria-label`.
- An action badge is a real button: focusable, keyboard-activatable, and it also
  appears on `:focus-visible` (not just hover) — otherwise it would be
  unreachable without a mouse.
- Never use a color-only badge to convey state.

## Props

| Prop | Type | Default |
|---|---|---|
| `tone` | `"neutral" \| "accent" \| "danger" \| "success"` | `"neutral"` |
| `pill` | `boolean` | `false` |
| `corner` | `"left" \| "right"` | — |
| `onHover` | `boolean` | `false` |
| `onClick` | `MouseEventHandler` | — |
| `label` | `string` | — (required if clickable) |

## Usage

```tsx
<Badge tone="accent">ANIM</Badge>
<Badge pill tone="accent">Exporting 42%</Badge>

<div className="lc-badge-host" style={{ position: "relative" }}>
  <img … />
  <Badge tone="danger" corner="right" onHover label="Delete" onClick={remove}>×</Badge>
</div>
```
