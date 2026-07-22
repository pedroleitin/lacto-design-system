# Checkbox

> **New component.** None of the four repositories had a real checkbox — they
> all use `Switch`, even for what would be multi-select. Designed here from the
> existing language (18px square, 6px radius, `--lc-text` fill, yellow hover).
> **Confirm or adjust the design.**

## Switch or Checkbox?

| Situation | Component |
|---|---|
| Turn one option on/off with immediate effect | `Switch` |
| Tick several items in a list | `Checkbox` |
| Form with an explicit submit button | `Checkbox` |
| Accepting terms | `Checkbox` |

## Visual rules

| Rule | Value |
|---|---|
| Box | 18 × 18px, `--lc-radius-sm` (6px) |
| Border | 2px `--lc-line-strong` |
| Hover | border turns `--lc-accent` |
| Checked | `--lc-text` fill and border, `check` glyph in `--lc-panel` |
| Indeterminate | same as checked, with the `remove` glyph |
| Glyph | Material Symbols 14px, `wght 700` |
| Press | `scale(0.93)` |
| Focus | `--lc-focus-ring` on the box |
| Label gap | 8px |

It follows the same color rule as `Switch`: **binary on = `--lc-text`**, with
yellow reserved for hover and for choosing between options.

## Accessibility

- Uses a native `<input type="checkbox">`, visually hidden but focusable:
  keyboard, `:checked`, `:indeterminate` and form submission all work for free.
- Everything sits inside a `<label>` — clicking the text toggles.
- `indeterminate` is applied via the DOM (it does not exist as an HTML
  attribute) and is announced as "partially checked".
- Without `label`, pass `aria-label`.

## Props

| Prop | Type | Default |
|---|---|---|
| `checked` | `boolean` | — |
| `onChange` | `(checked: boolean) => void` | — |
| `label` | `ReactNode` | — |
| `indeterminate` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |

Plus native `<input>` attributes (`name`, `value`, `required`…).

## Usage

```tsx
<Checkbox label="Show grid" checked={grid} onChange={setGrid} />
<Checkbox label="All" checked={all} indeterminate={some} onChange={toggleAll} />
```
