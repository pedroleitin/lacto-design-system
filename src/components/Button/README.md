# Button

The system's most frequent control. Three variants, and **one** active state
shared by all of them: yellow `--lc-accent`.

## Variants

| Variant | Look | Where |
|---|---|---|
| `solid` | white surface, 10px radius, grey hover | **Default.** Toolbar, dock, panel actions |
| `pill` | 1.5px outline, 30px radius, **full yellow hover** | Menu/sidebar actions, primary call |
| `ghost` | no fill until hover | Quiet actions inside an already dense panel |

Rule of thumb: `pill` demands attention on hover (it goes fully yellow), `solid`
only warms up a shade. Don't mix the two in the same row.

## Visual rules

| Rule | Value |
|---|---|
| Height | `sm` 30px · `md` **36px** · `lg` 38px |
| Padding | `0 14px` (`sm` 12px, `lg` 16px) |
| Radius | 10px (`pill`: 30px) |
| Font | Outfit 13px / 500 (active: 600) |
| Inner gap | 6px between icon and text |
| Hover | `--lc-hover` (solid/ghost) · `--lc-accent` (pill) |
| Active | `--lc-accent` fill, `--lc-accent-ink` text, weight 600 |
| Press | `transform: scale(0.96)` over 0.12s |
| Focus | `0 0 0 2px var(--lc-accent)` ring |
| Disabled | `opacity: 0.35`, no press, `cursor: not-allowed` |

### Transition

Every color property animates over `0.16s cubic-bezier(0.4,0,0.2,1)`; the press
`transform` over `0.12s`. Slow color plus fast press is what makes the click
feel firm without feeling sluggish.

## Special states

**`active`** — the button represents a setting that is on (selected tool,
current mode). Renders `aria-pressed`.

**`hot`** — a blue `--lc-info` highlight while the user holds a modifier
(Shift/Alt/Cmd) that temporarily arms that tool. It is deliberately **different**
from yellow: yellow = chosen, blue = armed only while the key is held. See the
demo (hold Shift).

## Icon only

A button with no text is **not** a `Button` variant — it is the
[`IconButton`](#/c/icon-button) component. It locks width to height, zeroes the
padding, uses `press: 0.93` (stronger, because the target is smaller) and
**requires `label`**, which becomes `aria-label` and `title`. An icon button
with no accessible name is invisible to a screen reader, and splitting the
component is what makes that mistake impossible.

```tsx
<IconButton icon="undo" label="Undo" />
<IconButton icon="add" label="Add" variant="pill" round />
<IconButton icon="palette" label="Palette" active />
```

Every `Button` prop applies: `variant`, `size`, `active`, `hot`, `disabled`.

## Icon with text

Compose `<Icon>` as a child. The icon inherits `currentColor`, so it works on
its own in the active state. Use `size="sm"` (16px) inside buttons with text and
`size="md"` (20px) for icon-only buttons (prefer `IconButton` there).

## Shortcuts

`kbd="c"` draws the badge at the end of the label **and** declares
`aria-keyshortcuts`. Registering the listener is still the app's job.

## Accessibility

- `type="button"` by default — never submits a form by accident.
- `active` becomes `aria-pressed`, announced as "pressed".
- An icon-only button needs `aria-label` (use `IconButton`).
- Focus is never removed: the yellow ring passes in both themes.

## Props

| Prop | Type | Default |
|---|---|---|
| `variant` | `"solid" \| "pill" \| "ghost"` | `"solid"` |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` |
| `active` | `boolean` | `false` |
| `hot` | `boolean` | `false` |
| `kbd` | `string` | — |

Plus every native `<button>` attribute.

## Usage

```tsx
<Button onClick={save}>Save</Button>
<Button variant="pill"><Icon name="add" size="sm" />New palette</Button>
<Button active={tool === "draw"} onClick={() => setTool("draw")}>Draw</Button>
<Button kbd="c" onClick={clear}>Clear</Button>
```
