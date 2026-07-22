# Accordion

Collapsible sections. It is the main structure of the source projects' sidebars —
what keeps a 40-control panel navigable.

## Visual rules

| Rule | Value |
|---|---|
| Header | `padding: 14px 16px`, text 14px / 500 |
| Title | `--lc-text` at **60%** opacity → 100% on hover |
| Hover | **the whole item** gets `--lc-hover` |
| Chevron | `expand_more` 16px in a 24px disc |
| Chevron disc | invisible → `rgba(127,127,127,0.2)` on hover |
| Open chevron | `rotate(180deg)` over 0.22s |
| Body | `padding: 0 16px 24px`, `gap: 20px` |
| Divider | a `Divider` (90%) after each item, except the last |

Three things happen at once on hover — the item lights up, the title becomes
opaque, the chevron's disc appears. Together they say "this whole row is
clickable", which is true: the target is the entire header, not just the little
arrow.

## The opening animation

`grid-template-rows: 0fr → 1fr` with `overflow: hidden` on the child.

It is the only way to animate to the **real height** of the content in pure CSS.
The common alternative (`max-height: 500px`) forces you to guess a value: guess
low and it clips; guess high and the animation crawls at the start and the
content pops in. With `fr`, the curve is always correct, whatever the content.

## `single`

One item open at a time. Use it in tall sidebars, where several open sections
would force constant scrolling. For short panels, allow multiple.

## Accessibility

- The header is a `<button>` with `aria-expanded` and `aria-controls`.
- The body is a `role="region"` with the matching `id`.
- Enter/Space toggle (native button).
- Visible focus: `--lc-focus-ring` on the header.
- Closed content stays in the DOM (the animation depends on it). If there are
  heavy controls inside, mount them conditionally — but keep the region present.

## Props

| Prop | Type | Default |
|---|---|---|
| `items` | `AccordionItemData[]` | — |
| `open` | `string[]` | — (controlled) |
| `onOpenChange` | `(open: string[]) => void` | — |
| `defaultOpen` | `string[]` | `[]` |
| `single` | `boolean` | `false` |

`AccordionItemData`: `{ id, title, content }`

## Usage

```tsx
<Accordion
  single
  defaultOpen={["grid"]}
  items={[
    { id: "grid", title: "Grid", content: <Slider … /> },
    { id: "colors", title: "Colors", content: <Palette /> },
  ]}
/>
```

Controls that already carry their own horizontal padding (`Switch` and
`Segmented` with `label`) should bleed past the body padding with negative
margins — the two paddings come from different places and must not stack.
