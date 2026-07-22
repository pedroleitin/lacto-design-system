# Tooltip

A **singleton**. Mount `<Tooltip />` once at the root of your app and every
element with a `title` gets Lacto's bubble — no wrapper around each trigger, no
provider, no context.

```tsx
// App.tsx
<>
  <Tooltip />
  <YourApp />
</>
```

```tsx
// Anywhere
<button title="Undo">…</button>
<IconButton icon="undo" label="Undo" />   {/* already emits title */}
```

## How it works

It listens for `pointerover` / `focusin` on `document` and walks up the tree
until it finds an element with `title` or `data-tip`. The first time, it
**steals** the `title` into `data-tip` — so the operating system's own bubble
never appears alongside ours. The bubble is portaled to `<body>`, so it is never
clipped by the `overflow` of the panel the trigger lives in.

## Visual rules

| Rule | Value |
|---|---|
| Background | `--lc-glass-solid` (opaque: it must be readable over anything) |
| Border | 1px `--lc-line` |
| Radius | 8px |
| Padding | `5px 9px` |
| Font | Outfit 12px, `line-height: 1.3`, centered |
| Max width | 260px, wraps to multiple lines |
| Shadow | `--lc-shadow-popover` |
| Distance | 8px from the trigger |
| Entrance | `opacity` + `translateY(2px)` over 0.12s |

### Positioning

Above the trigger, centered, with a 6px minimum margin from the window edges. If
it doesn't fit above, it flips below (`is-below`) and the animation enters from
the opposite side. Scrolling any container dismisses it.

## Accessibility

- `role="tooltip"`.
- Appears on **keyboard focus**, not just hover — that is what makes the hint
  useful for people navigating by Tab.
- `pointerdown` dismisses it: whoever clicked already knows what the button does.
- The hint is a supplement, never the only source of information. An icon-only
  button needs its own `aria-label` (`IconButton` guarantees this).
- Since the content is read from `title`, the screen reader already announces
  the text as the control's own accessible name.

## Props

| Prop | Type | Default |
|---|---|---|
| `gap` | `number` | `8` |

## When NOT to use it

For essential text (a form error, a required instruction). Tooltips disappear,
are not focusable, and do not exist on touch. Use `TextField` with
`error`/`hint`.
