`tokens.json` is the single source. `npm run tokens` generates
`src/tokens/tokens.css` with every variable prefixed `--lc-`, in light and dark.
Never edit the generated CSS.

## Flow

```
tokens.json  ──npm run tokens──▶  src/tokens/tokens.css
                                        │
                                        ▼
                              src/styles/base.css
                                        │
                                        ▼
                            components (var(--lc-*))
```

## Switching theme

```ts
document.documentElement.dataset.theme = "dark";  // or "light"
```

## tokens.json

<!-- widget:tokens-json -->
