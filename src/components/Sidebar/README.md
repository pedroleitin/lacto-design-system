# Sidebar

The controls panel. It does not touch the window edge: **10px of clearance on
all four sides**, 15px radius. That is what lets the dot grid show around it and
makes the panel look like it rests on the screen rather than being cut out of it.

## Anatomy

```
┌──────────────────────────┐
│ Title         [action]   │  header — fixed
├──────────────────────────┤  Divider full
│ ┌──────────────────────┐ │
│ │ controls…            │ │  body — scrollable
│ │                      │ │
│ │ hint (spacer)        │ │  pushed to the end
│ └──────────────────────┘ │
├──────────────────────────┤  Divider full
│ [Reset]     [Clear]      │  footer — fixed
└──────────────────────────┘
```

## Visual rules

| Rule | Value |
|---|---|
| Width | `--lc-size-sidebar` (320px) |
| Clearance | 10px on all sides |
| Background | opaque `--lc-panel`, no shadow |
| Radius | 15px |
| Title | 26px / 500, `line-height: 1` |
| Header padding | `16px 20px 12px` |
| Footer | 16px padding, actions with `flex: 1` (equal width) |
| Hint | 11px at 50% opacity, `line-height: 1.6` |
| Scrolling | `.lc-scroll` — 4px `--lc-line` bar |

The header and footer dividers are `full` (100%), not the default 90%: here they
mark the boundary of a **fixed region** against the scrolling area, and the full
line communicates that.

## `__spacer`

`margin-top: auto` on the last block of the body pushes it to the end of the
scrollable area. That is how the usage hint sits at the bottom of the content
without leaving the scroll — unlike `footer`, which never scrolls.

## Composition

`Sidebar` imposes no spacing on its content. The controls bring their own
padding:

- `Switch` and `Segmented` **with `label`** already come with `padding: 12px 20px`
  — drop them in as direct children.
- `Slider` and other bare controls need a wrapper:
  `<div style={{ padding: "12px 20px", display: "grid", gap: 9 }}>`.
- For many sections, put an `Accordion` as the single child.

## Responsiveness

Below 640px the sidebar becomes a full-width strip anchored to the bottom, with
`max-height: 60dvh`. `dvh` and not `vh`: on mobile the browser bar appears and
disappears, and `vh` would leave the footer cut off.

## Accessibility

- It is an `<aside>` — a complementary region, skippable by region navigation.
- Pass `aria-label` when there is more than one sidebar.
- The body is scrollable and keyboard-reachable (arrow scrolling works once a
  control inside is focused).
- The footer sits outside the scroll: destructive actions are always visible.

## Props

| Prop | Type | Default |
|---|---|---|
| `title` | `ReactNode` | — |
| `headerAction` | `ReactNode` | — |
| `footer` | `ReactNode` | — |
| `side` | `"left" \| "right"` | `"left"` |
| `inline` | `boolean` | `false` |

`inline` puts the sidebar in the layout flow instead of fixed to the window —
use it inside an application grid, or in demos.

## Usage

```tsx
<Sidebar
  title="Lacto"
  headerAction={<IconButton round icon="dark_mode" label="Theme" />}
  footer={<><Button kbd="r">Reset</Button><Button kbd="c">Clear</Button></>}
>
  <Accordion items={sections} single />
</Sidebar>
```
