# IconButton

A `Button` with its width locked to its height and a single `Icon` inside. It
exists for one reason: **to make an icon button without an accessible name
impossible** — `label` is a required prop.

## Visual rules

| Rule | Value |
|---|---|
| Size | square: `sm` 30 · `md` **36** · `lg` 38 |
| Radius | 10px, or `--lc-radius-full` with `round` |
| Icon | `md` (20px) — `sm` (16px) only in an `sm` button |
| Default variant | `ghost` (the icon floats over the panel) |
| Press | `scale(0.93)` — stronger than a text `Button`, because the target is smaller and the feedback needs to register |

Hover, active, focus and disabled are inherited from `Button`.

### Square or round?

- **Square** (default): inside toolbars, next to buttons with text.
- **Round** (`round`): chrome actions — theme, sound, close — and actions
  floating over content.

## Accessibility

- `label` becomes both `aria-label` **and** `title` (the `title` feeds Lacto's
  `Tooltip`).
- An on state uses `active` → `aria-pressed`.
- Never use an icon whose meaning depends on color alone.

## Props

| Prop | Type | Default |
|---|---|---|
| `icon` | `string` | — |
| `label` | `string` | — (required) |
| `round` | `boolean` | `false` |
| `filled` | `boolean` | `false` |
| `iconSize` | `IconSize` | `"md"` |
| `variant` | `"solid" \| "pill" \| "ghost"` | `"ghost"` |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` |
| `active` | `boolean` | `false` |

## Usage

```tsx
<IconButton icon="undo" label="Undo" onClick={undo} />
<IconButton round icon="dark_mode" label="Dark theme" active={dark} onClick={toggle} />
```

## When NOT to use it

If the action has no universally readable icon, use `Button` with text. An
ambiguous icon with a tooltip is still an ambiguous icon.
