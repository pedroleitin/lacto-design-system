# Badge

Marcador pequeno: contador, estado, marca de canto, botão de excluir de
miniatura.

## Tons

| Tom | Uso |
|---|---|
| `neutral` | contagem, quantidade |
| `accent` | marca permanente ("esta forma é animada"), progresso |
| `danger` | excluir |
| `success` | confirmação |

## Regras visuais

| Regra | Valor |
|---|---|
| Altura | 15px · `min-width: 15px` (círculo quando é 1 caractere) |
| Fonte | 9px / 700 |
| Raio | total (`accent`: `--lc-radius-xs`, 4px) |
| `pill` | `padding: 5px 11px`, 12px / 500, `tabular-nums` |
| `corner` | `position: absolute`, 3px do canto, `z-index: 2`, sombra `--lc-shadow-badge` |

O tom `accent` usa cantos de 4px em vez de círculo: é uma **etiqueta**
permanente, e a forma quadrada a distingue do badge redondo de ação.

## Marca de canto

O pai precisa da classe `.lc-badge-host` e de `position: relative`.

- `corner="left"` — marca **permanente** de estado (o item é animado, é novo…).
- `corner="right"` + `onHover` — **ação**, tipicamente excluir: invisível até o
  mouse entrar no item.

Isso deixa a grade de miniaturas limpa e coloca a ação destrutiva exatamente
onde a mão já está.

## Badge clicável

Com `onClick`, renderiza `<button>` e **exige `label`** (vira `aria-label` e
`title`, alimentando o `Tooltip`). Um "×" sem nome acessível é ilegível para
leitor de tela.

## `:empty`

Badge sem conteúdo não é renderizado (`display: none`). Assim uma pílula de
progresso pode existir no JSX o tempo todo e só aparecer quando tiver texto —
sem condicional no componente pai.

## Acessibilidade

- Badge informativo é decorativo se o dado já estiver no texto ao lado; se não
  estiver, dê `aria-label` ao elemento pai.
- Badge de ação é botão de verdade: focável, ativável por teclado, e aparece
  também no `:focus-visible` (não só no hover) — senão seria inalcançável sem
  mouse.
- Não use badge só de cor para transmitir estado.

## Props

| Prop | Tipo | Padrão |
|---|---|---|
| `tone` | `"neutral" \| "accent" \| "danger" \| "success"` | `"neutral"` |
| `pill` | `boolean` | `false` |
| `corner` | `"left" \| "right"` | — |
| `onHover` | `boolean` | `false` |
| `onClick` | `MouseEventHandler` | — |
| `label` | `string` | — (obrigatório se clicável) |

## Uso

```tsx
<Badge tone="accent">ANIM</Badge>
<Badge pill tone="accent">Exportando 42%</Badge>

<div className="lc-badge-host" style={{ position: "relative" }}>
  <img … />
  <Badge tone="danger" corner="right" onHover label="Excluir" onClick={remove}>×</Badge>
</div>
```
