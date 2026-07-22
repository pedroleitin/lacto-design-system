# Kbd

A keyboard-shortcut badge. It lives **inside** the label of the control it
triggers — never in a separate legend. This is what makes an app learnable
without a tutorial: you read the button and the key comes with it.

## Visual rules

| Rule | Value |
|---|---|
| Size | `1.35em` × `1.35em` — relative to the surrounding font |
| Font | mono, `0.82em`, `600`, uppercase |
| Radius | `--lc-radius-xs` (4px) |
| Background | `color-mix(var(--lc-line) 45%, transparent)` |
| Opacity | `0.75` (recedes until you look for it) |
| Margin | `6px` to the left of the text |

Because it is sized in `em`, the same component works in an 11px label and in a
20px heading with no adjustment.

Inside a button that is hovered or `active` (yellow fill), the badge switches to
`currentColor` at 18% — keeping contrast without becoming a second highlight.

## Accessibility

- In practice it is `aria-hidden` when the shortcut is already on the parent
  control's `title`/`aria-keyshortcuts`. Prefer declaring
  `aria-keyshortcuts="m"` on the button.
- Not a tab stop: it is a label, not a control.

## Usage

```tsx
<Button kbd="m">Mode</Button>

<span>Clear <Kbd>c</Kbd></span>
```

## When NOT to use it

On touch screens, or for shortcuts that only exist on one platform. The badge
promises the key works — if it doesn't, don't show it.
