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

### The three margins that exist

- **10px** — the `Sidebar`'s clearance from the window
- **14px / 16px** — anchored `Panel` (top and sides / bottom)
- **2px** — vertical `Divider` inside a toolbar

Turn the guides on below and hover: every element shows its box, the padding on
each side and the radius. The same switch exists in every component's example.

<!-- widget:anatomy -->

## Control heights

**36px is the canonical height.** Button, select and number field share it so
that any row of controls lines up with no adjustment.

<!-- widget:control-sizes -->
