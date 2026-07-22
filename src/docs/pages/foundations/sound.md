Generative interface sound: pure **Web Audio** — oscillators and envelopes, no
external library and **no audio file to load**. Ported from SVG_DRAW's
`features/audio.ts`, which in turn mirrors Grid-o-matic.

> **It starts muted.** Sound that plays unasked is hostile, and the browser
> would block the first one anyway — there is no user gesture before the first
> click. The preference is stored in `localStorage`, exactly like the theme.

## Try it

<!-- widget:sound-player -->

## The eight sounds

| Sound | Shape | For |
|---|---|---|
| `note(index)` | sine, 0.3s, vol 0.12 | something was **created** — a cell placed, an item added |
| `erase()` | sine, 0.12s, 600 → 300 Hz | something was **removed** |
| `toggle(on)` | sine, 0.09s, 660 → 990 / 440 | a **binary** flipped — `Switch`, `Checkbox` |
| `select()` | triangle, 0.06s, 1046 Hz | an **option** was chosen — `Segmented`, `Tabs`, `Select` |
| `reveal(open)` | sine, 0.14s, 420 ↔ 700 Hz | a section **opened or closed** — `Accordion`, `Select`, `Panel` |
| `success()` | two triangles, 659 → 988 Hz | the operation **finished** |
| `error()` | two squares, 311 → 233 Hz | the operation **failed** |
| `theme(toDark)` | two triangles, 0.18s + 0.22s | the theme flipped: **up** into dark, **down** into light |

Eight sounds, and the grammar behind them is one line: **rising creates and
confirms, falling removes and fails.** `note`, `toggle(true)`, `reveal(true)`,
`success` and `theme(true)` all go up; `erase`, `toggle(false)`,
`reveal(false)`, `error` and `theme(false)` all go down. Nobody has to learn
that — direction is the one thing hearing reports without training.

Volume is the second axis, and it encodes **how often the event happens**:
`select` at 0.06 and `reveal` at 0.05 are near-silent because they fire
constantly; `success` at 0.18 and `theme` at 0.26 are the loudest because they
are rare and worth a full stop. An event that happens every second must not
sound like an announcement.

`error` is the only one in the low register, on a square wave: it sinks to the
bottom of the spectrum instead of fighting for attention like an alarm. Failure
should be noticed, not screamed.

`note` is pitched: the index picks a degree of a two-octave, roughly C-major
scale. Feeding it a cell coordinate (`col + row`) makes drawing musical instead
of one repeated beep. That is the whole idea — the sound reports *where*, not
just *that*.

## Usage

```tsx
const { muted, setMuted, note, erase, toggle, select, reveal,
        success, error, theme } = useSound();

// on the canvas
onPlace={(col, row) => note(col + row)}
onErase={() => erase()}

// elsewhere
onToggle={(on) => toggle(on)}
onPick={() => select()}
onExported={() => success()}
onFailed={() => error()}

// on the theme toggle
const toggle = () => {
  const dark = next === "dark";
  setTheme(next);
  theme(dark);
};
```

### The mute toggle

There is no `SoundToggle` component — it is an `IconButton`, and building a
component for one composition would be one abstraction too many:

```tsx
<IconButton
  round
  icon={muted ? "volume_off" : "volume_up"}
  label={muted ? "Turn sound on" : "Turn sound off"}
  onClick={() => {
    setMuted(!muted);
    if (muted) note(9);   // a confirmation note when turning it back on
  }}
/>
```

The confirmation note matters: without it, turning sound *on* is the one action
in the app with no feedback at all.

Its home is the top-right chrome box, to the left of the theme toggle — the two
are the same kind of control.

## Why the values are not in `tokens.json`

They are not CSS properties. A custom property cannot usefully hold a frequency
scale, and having the same number in two places is worse than having it in one.
`src/sound/audio.ts` is the source for sound.

## One engine per page

`useSound` shares a single module-level `SoundEngine`, so every component that
calls the hook shares one `AudioContext`. Opening one context per component
would hit the browser's limit within a few dozen.

The context is created **lazily** and resumed on first real use — which always
happens inside a click, satisfying the autoplay policy. If the browser refuses,
every method silently does nothing; sound never throws and never blocks a UI
action.

## Accessibility

- Sound is **always** redundant. Every event that plays one also has a visible
  change — never use audio as the only signal.
- Muted is the default, and the preference persists.
- Volumes are low (0.1–0.26) and durations short (0.12–0.3s): this is
  punctuation, not a soundtrack.
- No component plays a sound on its own. `Button`, `Switch` and the rest are
  silent — the app decides what deserves to be heard. A design system that
  beeped on every click would be unusable within a minute.
