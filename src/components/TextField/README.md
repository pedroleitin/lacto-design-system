# TextField

A single-line text field. **The value always comes out in Ubuntu Mono** — it is
Lacto's most visible rule: anything the user types or reads as data is
monospaced.

## Visual rules

| Rule | Value |
|---|---|
| Height | `md` 38px · `sm` 30px |
| Background | `--lc-surface` (with `outlined`: `--lc-bg` + `--lc-line` border) |
| Border | 1.5px transparent → `--lc-accent` on focus |
| Radius | 10px |
| Padding | `0 12px` (`sm`: 8px) |
| Value font | **mono** 13px (`sm`: 12px) |
| Placeholder | `--lc-muted` at 70% |
| Label | 12px `--lc-muted`, above |
| Message | 11px `--lc-muted`, below |
| Focus | accent border + `--lc-focus-ring` ring |
| Read-only | `opacity: 0.7` |

### Filled or outlined?

- **Default** (`--lc-surface`): inside panels, where the field needs to stand
  out from the panel background.
- **`outlined`** (`--lc-bg` + border): over light surfaces, where a white field
  would disappear.

## `hex` mode

Centers the text, forces uppercase and turns on `tabular-nums`. It is the
system's color field — the native picker has no hex input, so this field is the
only way to type an exact value.

## Trailing action

`action` takes an `IconButton` that stays **invisible until hover or focus**
(`opacity: 0 → 0.55 → 1`). A column of fields never becomes a wall of icons, but
the action is one movement away.

## Error

`error` (instead of `hint`) paints the border and message with `--lc-danger`,
sets `aria-invalid` and announces the message with `role="alert"`. The error is
never color alone: the message is required.

## Accessibility

- A real `<label htmlFor>` — clicking the label focuses the field.
- `aria-describedby` links `hint`/`error` to the field.
- `aria-invalid` in the error state.
- `spellCheck={false}` by default (most fields hold data, not written text).
- Without a visible `label`, pass `aria-label`.

## Props

| Prop | Type | Default |
|---|---|---|
| `label` | `ReactNode` | — |
| `hint` | `ReactNode` | — |
| `error` | `ReactNode` | — |
| `icon` | `string` | — |
| `action` | `ReactNode` | — |
| `size` | `"sm" \| "md"` | `"md"` |
| `outlined` | `boolean` | `false` |
| `hex` | `boolean` | `false` |

Plus every `<input>` attribute.

## Usage

```tsx
<TextField label="Name" value={v} onChange={(e) => set(e.target.value)} />

<TextField label="Color" hex maxLength={7} value={hex} onChange={…}
           error={valid ? undefined : "Use #RRGGBB."} />

<TextField label="Link" readOnly outlined value={url}
           action={<IconButton icon="content_copy" label="Copy" size="sm" iconSize="xs" />} />
```
