# Toast

An ephemeral confirmation at the bottom center. "Copied", "Exported as SVG",
"Palette reordered".

## A provider-free API

`useToast()` returns `show` **and the node to render**. No `ToastProvider`, no
context, no wrapping the tree:

```tsx
const { show, toasts } = useToast();

return (
  <>
    {toasts}
    <Button onClick={() => show("Copied")}>Copy</Button>
  </>
);
```

The node is portaled to `<body>`, so where you place it does not matter. If
several components need to fire toasts, call the hook once near the root and
pass `show` down — or call the hook in each place (each gets its own stack,
which is usually acceptable and far simpler than a global context).

## Visual rules

| Rule | Value |
|---|---|
| Position | bottom center, 24px from the edge |
| Background | `--lc-glass` + `blur(16px) saturate(1.4)` |
| Border | 1px `--lc-glass-border` |
| Radius | 20px |
| Padding | `10px 18px` |
| Font | **mono** 13px |
| Shadow | `--lc-shadow-toast` |
| Entrance | `translateY(10px)` + fade, 0.22s `ease-out` |
| Exit | the inverse, 0.15s `ease-in` |
| Duration | 2200ms |
| Stacking | `column-reverse` — newest at the bottom, nearest the eye |

**Mono because almost every message carries data**: a file name, a count, a
format. A proportional font would make `"Exported as SVG"` and `"12 colors
added"` look like written text, when they are operation results.

`Toast` also obeys `body.lc-noblur` (see `Panel`).

## Tones

| Tone | Icon | Use |
|---|---|---|
| `neutral` | — | ordinary confirmation |
| `success` | green `check_circle` | operation completed |
| `danger` | `error`, red text | failed, but not blocking |

## Accessibility

- The host is `role="status"` with `aria-live="polite"`: the reader announces it
  without interrupting whatever it is saying.
- `aria-atomic="false"` — only the new message is read, not the whole stack.
- It is not focusable and has no close button: it dismisses itself. That is why
  you should **never put an action inside a toast** — keyboard users could not
  reach it.
- Do not use it for errors that require a decision. Field error → `TextField
  error`. Blocking error → a dialog (not in Lacto yet, see the backlog).

## API

| | |
|---|---|
| `useToast({ duration? })` | `duration` defaults to 2200ms |
| `show(message, tone?)` | `tone`: `"neutral"` \| `"success"` \| `"danger"` |
| `toasts` | React node to render once |

## Usage

```tsx
const { show, toasts } = useToast();

const copy = async () => {
  await navigator.clipboard.writeText(hex);
  show(`${hex} copied`, "success");
};
```
