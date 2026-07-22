# Dropzone

An area that accepts files by drag-and-drop **and** by click.

## Visual rules

| Rule | Value |
|---|---|
| Border | **1.5px dashed** `--lc-line` |
| Radius | 8px |
| Background | transparent |
| Text | 12px `--lc-muted`, centered |
| Icon | `upload` 24px |
| Hint | 10px at 70% opacity |
| Hover | border `--lc-muted`, text `--lc-text` |
| Dragging over | **solid** `--lc-accent` border + `accent` fill at 10% |
| Transition | 0.12s (fast — it has to keep up with the cursor) |

### Dashed becomes solid

The "you can drop here" signal is not just color: the **border switches from
dashed to solid**. A change in border style registers in peripheral vision and
for people who cannot tell yellow from grey — while the file is in the air, the
user is not looking at the box, they are looking at the cursor.

## `tile` variant

98 × 46px, icon and text side by side, 1px border. It occupies exactly **two
tiles** of a 46px thumbnail row with `gap: 6px`. Always the **last** item in the
row.

## Interaction

- Clicking opens the native picker (a hidden `<input type="file">`).
- Dropping files fires `onFiles`.
- Without `multiple`, only the first file is passed along — even if several are
  dropped.
- The input is cleared after each pick, so selecting the **same file** twice in
  a row fires the event both times.

## Accessibility

- It is a real `<button>`: focusable, activated by Enter/Space, announced as a
  button. Dragging is a bonus, not the only path.
- The label is the visible text — say what is expected, not "Dropzone".
- `hint` sits inside the button, so it is announced too: use it for formats and
  size limits.
- Validate type and size in `onFiles` and report the error outside the component
  (a `Toast danger` or a nearby message). The native picker's `accept` does
  **not** restrict what can be dropped.

## Props

| Prop | Type | Default |
|---|---|---|
| `onFiles` | `(files: File[]) => void` | — |
| `accept` | `string` | — |
| `multiple` | `boolean` | `false` |
| `label` | `ReactNode` | "Drop a file…" |
| `hint` | `ReactNode` | — |
| `icon` | `string` | `"upload"` |
| `tile` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |

## Usage

```tsx
<Dropzone
  multiple accept="image/*,.svg"
  label="Drop images or click to browse"
  hint="SVG, PNG or JPG · up to 5 MB"
  onFiles={(files) => files.forEach(load)}
/>

<Dropzone tile label="Upload" onFiles={addShape} />
```
