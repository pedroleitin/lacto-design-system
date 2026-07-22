# Panel

Lacto's surface. Two variants, and choosing between them is not aesthetic — it
is about **what is behind it**.

| Variant | Background | Where |
|---|---|---|
| `glass` | `--lc-glass` + `blur(16px) saturate(1.4)` | Floating over a canvas or content |
| `solid` | opaque `--lc-panel` | Anchored to an edge: sidebar, dock, card |

Rule: **if there is user content behind it, use `glass`** — the blur preserves
the sense that the artwork is still down there. If the panel is pinned to an
edge with nothing behind it, `solid` is cheaper and more readable.

## Visual rules

| Rule | `glass` | `solid` |
|---|---|---|
| Background | `--lc-glass` | `--lc-panel` |
| Blur | `blur(16px) saturate(1.4)` | — |
| Border | 1px `--lc-glass-border` | — |
| Radius | 20px | 15px |
| Shadow | `--lc-shadow-panel` | — |
| Padding | `16px 18px` | `16px 18px` |

The `saturate(1.4)` is what keeps the glass from looking grey: without it the
blur washes the color out of whatever is behind.

## `body.lc-noblur` — the escape hatch

`backdrop-filter` forces the browser to recompose everything behind the panel on
every frame. With an animation running on the canvas, that tanks the frame rate.

Add `document.body.classList.add("lc-noblur")` while the animation runs: every
piece of glass in the system (`Panel`, the `Select` menu, `Toast`) switches to
`--lc-glass-solid`, an opaque background that is nearly identical. Layout, size
and perceived color do not change — only the cost.

```ts
const onPlay  = () => document.body.classList.add("lc-noblur");
const onPause = () => document.body.classList.remove("lc-noblur");
```

## Anchoring

`anchor` positions the panel over the screen: `top-left`, `top-right`,
`top-center`, `bottom-left`, `bottom-right`, `bottom-center`. Margins are 14px at
the top and sides, 16px at the bottom — the asymmetry compensates for the visual
weight of the footer.

The parent container must be `position: relative` (or be the window itself).

## Morph

When a panel swaps content **and** size, a hard cut jumps. The
`lc-panel--morph` class provides the system's sequence:

1. `.is-fading` — content fades out over 0.11s
2. swap the content, measure the new size
3. `.is-sizing` — width/height animate over 0.21s with `overflow: hidden`
4. the new content fades in

The `overflow: hidden` in step 3 prevents a scrollbar flashing mid-resize.

## Accessibility

- `Panel` is a semantics-free `<div>`. If it groups a region, pass
  `role="region"` + `aria-label`.
- `title` becomes an `<h2>` with the overline style — it keeps the document's
  heading hierarchy even though it looks like a small label.
- Contrast: `--lc-glass` over arbitrary content does not guarantee contrast. For
  critical text over an image, use `solid` or `--lc-glass-solid`.

## Props

| Prop | Type | Default |
|---|---|---|
| `variant` | `"glass" \| "solid"` | `"glass"` |
| `title` | `ReactNode` | — |
| `anchor` | `PanelAnchor` | — |
| `flush` | `boolean` | `false` |

## Usage

```tsx
<Panel title="Grid" anchor="bottom-center" style={{ width: 340 }}>
  <Slider label="Density" value={v} onChange={setV} />
</Panel>

<Panel variant="solid" anchor="bottom-left">
  <span className="lc-mono lc-tnum">x 128 · y 64</span>
</Panel>
```
