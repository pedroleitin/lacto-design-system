Spacing in 2px steps up to 24px. No geometric scale: the interface is dense and
needs the in-between values (6, 9, 14, 18).

## Spacing

<!-- widget:space-scale -->

## Radius

<!-- widget:radius-grid -->

## Where each radius lives

- `xs` 4px — accent badge, keyboard shortcut
- `sm` 6px — color swatch, small thumbnail
- `md` 8px — tooltip, dropzone, thumbnail
- `lg` 10px — **button, field, select**
- `xl`–`2xl` 12–14px — accent segmented, menu
- `3xl` 15px — sidebar, solid panel
- `4xl` 20px — glass panel, toast
- `pill` 30px — outlined button
- `full` — switch, slider, tab, badge

## Nested radius

A child seated inside the parent's padding needs a **smaller** radius, or the
two curves run parallel instead of concentric and the gap between them fattens
at the corners. The rule is arithmetic, not taste:

```
inner radius = outer radius − padding
```

<!-- widget:nested-radius -->

Use the `.lc-nested` utility. The parent declares its own radius and padding
once; custom properties inherit, so the child only needs the class:

```css
.dock {
  --lc-r: var(--lc-radius-4xl);   /* 20px */
  --lc-p: var(--lc-space-5);      /* 10px */
  border-radius: var(--lc-r);
  padding: var(--lc-p);
}
```

```tsx
<Panel className="dock">
  <Button className="lc-nested">Undo</Button>
</Panel>
```

`.lc-nested` computes `max(0px, calc(var(--lc-r) - var(--lc-p)))` — the `max`
clamps to zero when the padding exceeds the radius. `Panel` already publishes
`--lc-r` and `--lc-p`, so a nested child inside a default panel works with no
setup.

**When the padding differs per axis, use the smaller one** — that is the side
where the curves come closest.

### What already obeys it

The rule was not invented here; it was already in the source projects,
unwritten. Writing it down is what makes it reusable:

| Container | Radius | Padding | Child | |
|---|---|---|---|---|
| `Segmented` track | 10px | 3px | option **7px** | ✓ |
| `Select` menu | 14px | 6px | item **8px** | ✓ |
| Dock (`Panel`) | 20px | 10px | button **10px** | ✓ |
| `Tabs` track | full | 5px | tab **full** | ✓ |
| `Sidebar` | 15px | 0 | full-bleed rows | ✓ |

A full radius stays full: a pill inside a pill needs no correction, because the
curve is already the tallest the box allows.

> `Select`'s menu item used to be 9px. It is now 8px — the rule was almost
> true, and making it true is cheaper than documenting an exception.

### When it does not apply

- The child does not touch the padding box (a floating badge, an absolutely
  positioned overlay).
- The child is full-bleed with no gap — then it inherits the parent's radius on
  the corners it touches, as `Sidebar` rows do.
- The parent has no radius. Zero minus anything is still zero.

## Margin and padding

Lacto barely uses `margin`. Space between siblings comes from `gap` on the
container; space inside comes from `padding` on the component itself. Margin
only appears where an element must detach from an edge it does not control —
the `Sidebar`'s 10px clearance, and dividers.

> **Padding belongs to the component. Gap belongs to the container. Margin is
> the exception.**

### Padding per component

| Where | Padding | Why |
|---|---|---|
| `Button` md | `0 14px` | height fixed at 36px; only the horizontal is padding |
| `Button` sm / lg | `0 12px` / `0 16px` | follows the height |
| `TextField` | `0 12px` | aligns its text with the button beside it |
| `Select` item | `7px 16px` | comfortable target inside the menu |
| `Panel` | `16px 18px` | larger horizontal: compensates the 20px radius |
| Sidebar row | `12px 20px` | `Switch` and `Segmented` with `label` already bring it |
| `Accordion` header | `14px 16px` | tall target, the whole row is clickable |
| `Accordion` body | `0 16px 24px` | the bottom is larger to clear the divider |
| `Slider` bar | `0 15px` | text inside the pill, away from the radius |
| `Tooltip` | `5px 9px` | compact: it is a label, not content |
| `Toast` | `10px 18px` | breathes more: it sits alone on screen |
| `Segmented` track | `3px` | the thin frame that reveals the active segment |

The rule behind the numbers: **horizontal padding is always larger than
vertical**, and the larger the radius, the larger the horizontal — in a 20px
corner, 16px of side padding already touches the curve.

### Gap between siblings

| Situation | Gap |
|---|---|
| Icon and text inside a button | `6px` |
| Buttons in a toolbar | `6px` |
| Action buttons (footer, form) | `8px` |
| **Stacked sliders** | `9px` |
| Color swatches | `6px` |
| `Select` menu items | `2px` |
| Controls inside an `Accordion` | `20px` |
| Columns of a wide panel | `18px` |

### The two margins that exist

- **10px** (`--lc-space-5`) — clearance from the window edge, for **everything**:
  `Sidebar` and any anchored `Panel`. One value, so two floating boxes on the same
  screen line up.
- **2px** — vertical `Divider` inside a toolbar

The anchored `Panel` used to sit at 14px on the sides and 16px at the bottom,
inherited from a different source repo. Two clearance conventions on one screen
is visible misalignment, so the system now has one.

Turn the guides on below and hover: every element shows its box, the padding on
each side and the radius. The same switch exists in every component's example.

<!-- widget:anatomy -->

## Control heights

**36px is the canonical height.** Button, select and number field share it so
that any row of controls lines up with no adjustment.

<!-- widget:control-sizes -->
