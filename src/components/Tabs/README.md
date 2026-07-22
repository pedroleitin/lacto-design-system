# Tabs

A row of pills for switching **mode** or **section**. At the top center of the
screen, inside a glass `Panel`, it is the mode switcher that gives the whole app
its structure.

## Visual rules

| Rule | Value |
|---|---|
| Track | `padding: 5px`, full radius, `gap: 4px` |
| Tab | `padding: 7px 20px`, 14px / 500, full radius |
| Inactive | `--lc-muted` |
| Hover | **color only** turns `--lc-text` — no fill |
| Active | `--lc-accent` fill, `--lc-accent-ink` text, weight 600 |
| Press | `scale(0.93)` |
| Focus | `--lc-focus-ring` ring |

Hover deliberately paints no fill. In a row of 3–4 pills, a hover background
would compete with the yellow pill and the eye would lose track of which one is
active. Just restoring the text contrast is enough to say "clickable".

The track has no background of its own — it inherits the glass `Panel` it sits
in. Outside a `Panel`, the row floats over the page with no box.

### The shape you actually see

The track is already `--lc-radius-full`, but almost every row lives inside a
glass `Panel` — and it is the **panel's** 20px radius that shows on screen. When
the panel holds nothing but the row, it follows the shape of its content:

```css
.lc-panel:has(> .lc-tabs:only-child) {
  border-radius: var(--lc-radius-full);
}
```

`:only-child` is the guard: a panel that also holds other content keeps its
normal 20px, because there the rounded rectangle is correct.

## `role="tab"` vs `role="mode"`

| | Semantics | When |
|---|---|---|
| `tab` (default) | `tablist` / `tab` + `tabpanel` | Navigating between content panels |
| `mode` | `radiogroup` / `radio` | Switching the app's **mode**, without switching panel |

The distinction matters for screen readers: `tablist` promises a corresponding
panel exists. A mode switcher (Compose / Animate / Export) changes how the tools
behave, not which region is shown — so it is a `radiogroup`.

## Accessibility

- **Arrow keys ←→ navigate**, wrap at the ends and skip disabled tabs.
- With `role="tab"`, only the active tab is in the tab order (`tabIndex: -1` on
  the others) — the correct tablist pattern: Tab enters the row, arrows move
  within it, Tab leaves for the panel.
- `TabPanel` gets `role="tabpanel"`, `tabIndex={0}` and the `id` linked by
  `aria-controls`.
- Always pass `aria-label` on the row.

## Props

| Prop | Type | Default |
|---|---|---|
| `items` | `TabItem[]` | — |
| `value` | `string` | — |
| `onChange` | `(value: string) => void` | — |
| `role` | `"tab" \| "mode"` | `"tab"` |

`TabItem`: `{ value, label, icon?, disabled? }`

## Usage

```tsx
<Panel anchor="top-center" style={{ padding: 5 }}>
  <Tabs role="mode" aria-label="Mode"
    items={[{ value: "compose", label: "Compose" }, { value: "animate", label: "Animate" }]}
    value={mode} onChange={setMode} />
</Panel>

<Tabs aria-label="Sections" items={sections} value={tab} onChange={setTab} />
<TabPanel value="grid" active={tab}>…</TabPanel>
```

## When NOT to use it

A binary choice, or 2–3 options inside a panel → `Segmented`. `Tabs` is for
top-level navigation; `Segmented` is for a setting inside a form.
