# Select

Combobox de escolha única. O gatilho é um `Button solid` disfarçado de pílula:
**prefixo apagado + valor em negrito + seta**. O menu é portado para `<body>`
com o vidro do sistema.

Substitui o `<select>` nativo porque este precisa de duas coisas que o nativo
não dá: o item selecionado em amarelo e o vidro com blur.

## Regras visuais

### Gatilho

| Regra | Valor |
|---|---|
| Base | `Button variant="solid"`, altura 36px, raio 10px |
| Largura mín. | 104px (`block` para 100%) |
| Prefixo | `--lc-muted`, peso normal |
| Valor | `--lc-text`, **700**, `capitalize`, corta com reticências |
| Seta | `expand_more` 16px `--lc-muted`, gira 180° ao abrir |
| Aberto | o gatilho fica no estado `active` (amarelo) |

### Menu

| Regra | Valor |
|---|---|
| Fundo | `--lc-glass` + `blur(16px) saturate(1.4)` |
| Borda | 1px `--lc-glass-border` |
| Raio | 14px · padding 6px · gap 2px |
| Sombra | `--lc-shadow-panel` |
| Altura máx. | `50vh`, com a scrollbar fina `.lc-scroll` |
| Item | 13px, `padding: 7px 16px`, raio 9px |
| Hover / destaque | `--lc-hover` |
| Selecionado | `--lc-accent` + `--lc-accent-ink`, peso 700 |
| Posição | 6px abaixo do gatilho; inverte para cima se não couber |

**Rótulos com dígitos entram automaticamente em mono** (`is-numeric`). É a
regra de números do sistema aplicada sem você pensar nela: `"4 × 4"` sai mono,
`"ease out"` sai em Outfit.

## Por que portal

O gatilho quase sempre vive dentro de um painel com `overflow: auto`. Renderizar
o menu inline faria ele ser cortado. Portado para `<body>` e posicionado com
`position: fixed`, ele escapa de qualquer container — e por isso fecha ao
rolar (a posição travaria).

## Acessibilidade

- Gatilho: `aria-haspopup="listbox"` + `aria-expanded`.
- Menu: `role="listbox"`; itens `role="option"` + `aria-selected`.
- Teclado: `↓`/`Enter`/`Espaço` abre · `↑↓` navega · `Home`/`End` · `Enter`
  escolhe · `Esc` fecha e devolve o foco ao gatilho.
- O destaque do teclado (`is-highlighted`) e o hover do mouse compartilham o
  mesmo visual, então os dois modos nunca discordam na tela.
- Passe `aria-label` quando não houver `prefix`.

## Props

| Prop | Tipo | Padrão |
|---|---|---|
| `options` | `SelectOption[]` | — |
| `value` | `string` | — |
| `onChange` | `(value: string) => void` | — |
| `prefix` | `string` | — |
| `block` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |

`SelectOption`: `{ value, label?, icon? }`

## Uso

```tsx
<Select prefix="Tamanho" value={size} onChange={setSize}
        options={[{ value: "4", label: "4 × 4" }]} />
```

## Quando NÃO usar

Até 4 opções curtas → `Segmented` (todas visíveis, um clique a menos).
