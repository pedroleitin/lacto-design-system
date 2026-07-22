`tokens.json` é a fonte única. `npm run tokens` gera `src/tokens/tokens.css` com
todas as variáveis prefixadas por `--lc-`, em claro e escuro. Nunca edite o CSS
gerado.

## Fluxo

```
tokens.json  ──npm run tokens──▶  src/tokens/tokens.css
                                        │
                                        ▼
                              src/styles/base.css
                                        │
                                        ▼
                            componentes (var(--lc-*))
```

## Trocar de tema

```ts
document.documentElement.dataset.theme = "dark";  // ou "light"
```

## tokens.json

<!-- widget:tokens-json -->
