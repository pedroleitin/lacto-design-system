# Select

A single-choice combobox. The trigger is a `Button solid` in disguise:
**muted prefix + bold value + caret**. The menu is portaled to `<body>` with the
system's glass.

It replaces the native `<select>` because that element cannot do two things this
system needs: a yellow selected item and blurred glass.

## Visual rules

### Trigger

| Rule | Value |
|---|---|
| Base | `Button variant="solid"`, 36px tall, 10px radius |
| Min width | 104px (`block` for 100%) |
| Prefix | `--lc-muted`, normal weight |
| Value | `--lc-text`, **700**, `capitalize`, ellipsis on overflow |
| Caret | `expand_more` 16px `--lc-muted`, rotates 180° when open |
| Open | the trigger enters the `active` (yellow) state |

### Menu

| Rule | Value |
|---|---|
| Background | `--lc-glass` + `blur(16px) saturate(1.4)` |
| Border | 1px `--lc-glass-border` |
| Radius | 14px · 6px padding · 2px gap |
| Shadow | `--lc-shadow-panel` |
| Max height | `50vh`, with the thin `.lc-scroll` scrollbar |
| Item | 13px, `padding: 7px 16px`, 9px radius |
| Hover / highlight | `--lc-hover` |
| Selected | `--lc-accent` + `--lc-accent-ink`, weight 700 |
| Position | 6px below the trigger; flips above if it doesn't fit |

**Labels containing digits automatically switch to mono** (`is-numeric`). It is
the system's number rule applied without you thinking about it: `"4 × 4"` comes
out mono, `"ease out"` comes out in Outfit.

## Why a portal

The trigger almost always lives inside a panel with `overflow: auto`. Rendering
the menu inline would get it clipped. Portaled to `<body>` and positioned with
`position: fixed`, it escapes any container — which is also why it closes on
scroll (the position would freeze).

## Accessibility

- Trigger: `aria-haspopup="listbox"` + `aria-expanded`.
- Menu: `role="listbox"`; items `role="option"` + `aria-selected`.
- Keyboard: `↓`/`Enter`/`Space` opens · `↑↓` navigates · `Home`/`End` ·
  `Enter` selects · `Esc` closes and returns focus to the trigger.
- The keyboard highlight (`is-highlighted`) and the mouse hover share one look,
  so the two modes never disagree on screen.
- Pass `aria-label` when there is no `prefix`.

## Props

| Prop | Type | Default |
|---|---|---|
| `options` | `SelectOption[]` | — |
| `value` | `string` | — |
| `onChange` | `(value: string) => void` | — |
| `prefix` | `string` | — |
| `block` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |

`SelectOption`: `{ value, label?, icon? }`

## Usage

```tsx
<Select prefix="Size" value={size} onChange={setSize}
        options={[{ value: "4", label: "4 × 4" }]} />
```

## When NOT to use it

Up to 4 short options → `Segmented` (all visible, one click fewer).
