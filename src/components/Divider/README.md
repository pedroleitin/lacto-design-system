# Divider

A 1px line. The detail that matters: **the horizontal one spans 90% of the
width, centered**.

That 5% inset on each end is deliberate. An edge-to-edge line makes the sidebar
read as a table — the sections become cells. With the gap, the line separates
without closing, and the panel still looks like a panel.

## Visual rules

| Rule | Value |
|---|---|
| Thickness | 1px |
| Color (light) | `--lc-line` |
| Color (dark) | `rgba(255,255,255,0.08)` — weaker than the token, or it jumps |
| Horizontal | 90% width, `margin: 0 auto` |
| `full` | 100% |
| Vertical | `align-self: stretch`, `margin: 2px` |

In the dark theme the divider does **not** use raw `--lc-line`: over an almost
black panel, that line would be more visible than the content. White at 8% keeps
the perceived hierarchy identical on both sides.

## Usage

- **Horizontal**: between accordion items, between sidebar sections, above a row
  of actions pinned to a footer.
- **Vertical**: between groups of buttons inside a toolbar.
- **`full`**: only when the divider coincides with a card's edge.

The last item in a list gets no divider. In `Accordion` that is already automatic
(`:last-child`).

## Accessibility

`role="separator"` + `aria-orientation`. It is decorative in almost every case,
but declaring the orientation helps navigation by regions.

## Props

| Prop | Type | Default |
|---|---|---|
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` |
| `full` | `boolean` | `false` |

## Usage

```tsx
<Divider />
<Divider orientation="vertical" />
```
