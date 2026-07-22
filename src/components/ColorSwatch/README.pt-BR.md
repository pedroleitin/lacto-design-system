# ColorSwatch

Um quadrado (ou círculo) de cor que abre o seletor nativo do sistema
operacional ao ser clicado.

## O truque do input nativo

`<input type="color">` é insubstituível — só ele abre o seletor do SO, com
conta-gotas e paletas do sistema. Mas ele não é estilizável: tem cantos e
molduras próprias em cada navegador.

A solução: o `<input>` é posicionado a **150% de largura e altura, deslocado
-25%**, dentro de um invólucro com `overflow: hidden`. As bordas nativas ficam
fora da área visível e a cor preenche o invólucro inteiro. A área de clique
continua sendo o input, então o comportamento nativo é preservado 100%.

## Regras visuais

| Regra | Valor |
|---|---|
| Tamanho | `md` 34px · `lg` 46px |
| Raio | `--lc-radius-sm` (6px), ou total com `round` |
| Borda | 1px `--lc-line` (`lg`: 1.5px) |
| Hover | borda vira `--lc-accent`; `round` também faz `scale(1.08)` |
| Press | `scale(0.96)` |
| Selecionado | `outline: 2px --lc-accent` com `outline-offset: 1px` |
| Foco | mesmo contorno do selecionado |

O estado selecionado usa `outline` **por fora**, nunca `border` — uma borda
comeria pixels da área de cor, e numa amostra de 34px isso muda a cor percebida.

## Só leitura

Sem `onChange`, o input não é renderizado: a amostra vira estática, sem
cursor de ponteiro e sem hover. Para exibir uma paleta que não se edita.

## `ColorSwatchAdd`

Botão tracejado do mesmo tamanho, para acrescentar uma cor. Contorno tracejado
+ `+` em `--lc-muted`; no hover ambos viram `--lc-accent`. Sempre o **último**
item da fileira.

## Acessibilidade

- O input recebe `aria-label` com o valor da cor (`"Cor #FFC800"`).
- O invólucro recebe `title` — o `Tooltip` do Lacto mostra o hex no hover.
- Cor **nunca** é a única informação: emparelhe com `TextField hex` quando o
  valor exato importar. Quem não distingue as cores precisa do código.
- `focus-within` mostra o contorno, então navegar por Tab pela paleta é visível.

## Props

| Prop | Tipo | Padrão |
|---|---|---|
| `value` | `string` (hex) | — |
| `onChange` | `(value: string) => void` | — (só leitura sem ele) |
| `selected` | `boolean` | `false` |
| `round` | `boolean` | `false` |
| `size` | `"md" \| "lg"` | `"md"` |
| `label` | `string` | o próprio hex |

## Uso

```tsx
<ColorSwatch value={color} onChange={setColor} />

<div className="lc-swatches">
  {palette.map((c, i) => (
    <ColorSwatch key={i} value={c} selected={i === sel} onChange={(v) => setAt(i, v)} />
  ))}
  <ColorSwatchAdd onClick={add} />
</div>
```

`.lc-swatches` é o utilitário de fileira: `flex`, `wrap`, `gap: 6px`.
