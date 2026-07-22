# Icon

Wrapper sobre **Google Material Symbols Outlined**. O glifo é uma ligadura: o
nome do ícone é o próprio conteúdo de texto do `<span>`. Sem SVG inline, sem
biblioteca de ícones em JS.

A fonte é carregada uma vez no `index.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block" rel="stylesheet" />
```

> `display=block` (e não `swap`) evita o flash do nome do ícone em texto puro
> antes da fonte carregar.

## Regras visuais

| Regra | Valor |
|---|---|
| Família | `Material Symbols Outlined` |
| Peso ótico | `wght 500`, `opsz 24`, `GRAD 0` |
| Preenchimento | `FILL 0` (padrão) · `FILL 1` com `filled` |
| Cor | `currentColor` — herda do botão/texto pai |
| Alinhamento | `line-height: 1`, `flex-shrink: 0` |

### Tamanhos

| Token | px | Onde usar |
|---|---|---|
| `xs` | 14 | Badge, `Kbd`, ação inline dentro de campo |
| `sm` | 16 | Botão compacto (30px), item de menu |
| `md` | 20 | **Padrão.** Dentro de botões de 34–36px |
| `lg` | 24 | Cabeçalho, ícone isolado, estado vazio |
| `xl` | 32 | Ilustração, dropzone |

### Tons

`inherit` (padrão, segue o pai) · `muted` · `accent` · `danger`.
Ícone dentro de botão **nunca** define cor própria — deixa herdar, senão o
estado `active` (fundo amarelo) fica ilegível.

## Acessibilidade

- Sem `label` o ícone é decorativo: recebe `aria-hidden="true"`.
- Com `label` vira `role="img"` com nome acessível.
- Ícone sozinho como único conteúdo de um botão exige `aria-label` **no botão**
  (ver `IconButton`), não no ícone.
- `translate="no"` impede tradutores automáticos de quebrarem a ligadura.

## Props

| Prop | Tipo | Padrão |
|---|---|---|
| `name` | `string` | — |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"` |
| `tone` | `"inherit" \| "muted" \| "accent" \| "danger"` | `"inherit"` |
| `filled` | `boolean` | `false` |
| `label` | `string` | — |

## Uso

```tsx
<Icon name="undo" />
<Icon name="favorite" filled tone="accent" />
<Icon name="delete" size="sm" label="Excluir" />
```

## Ícones canônicos do Lacto

`undo` `redo` `pan_tool` `fit_screen` `zoom_in` `zoom_out` `palette` `draw`
`ink_eraser` `download` `upload` `settings` `dark_mode` `light_mode`
`volume_up` `play_arrow` `pause` `close` `add` `delete` `content_copy`
`expand_more` `chevron_right` `check` `casino` (aleatório).
