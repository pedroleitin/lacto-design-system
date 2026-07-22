# RangeSlider

Faixa com **dois polegares** — um mínimo e um máximo. Reaproveita inteiro o
visual do `Slider variant="track"`: mesmo trilho de 16px, mesmos polegares de
16px, mesmo halo amarelo no hover. A única diferença é que o preenchimento fica
**entre** os polegares, e não do começo até o valor.

## Regras visuais

| Regra | Valor |
|---|---|
| Trilho | 16px, `--lc-line`, raio total |
| Preenchimento | `--lc-text`, entre os dois polegares, **sem raio** |
| Polegares | 16px `--lc-text` |
| Marcas | pontos de 6px `--lc-panel` a 50% de opacidade |
| Hover | halo `0 0 0 4px` de `--lc-accent` a 45% |
| Cabeçalho | rótulo `--lc-text` · valor mono a 50% |

O preenchimento central é reto de propósito: arredondado, ele leria como um
`Slider` simples deslocado, e não como um intervalo.

## `ticks`

Passe rótulos por posição (`["Vazio","Curto","Longo","Duplo"]`) e o componente:

1. desenha as marcas no trilho,
2. exibe o **nome** em vez do número no cabeçalho e no `aria-valuetext`.

É o modo certo para faixas categóricas. Para faixas numéricas, use `format`.

## Interação

- **Ponteiro**: clicar move o polegar mais próximo. Em caso de empate (clique
  exatamente no meio), decide pelo lado — clique à direita do máximo move o
  máximo. O polegar clicado fica "ativo" para o teclado.
- Os polegares **não se cruzam**: cada um é limitado pelo outro.
- **Teclado**: setas movem o polegar ativo · `PageUp/PageDown` ±10% ·
  `Home`/`End` · **`[` e `]` trocam qual polegar as setas controlam**.

## Acessibilidade

- O trilho é `role="group"` com `aria-label`; cada polegar é um `role="slider"`
  com seu próprio `aria-valuenow` e `aria-valuetext`.
- `aria-valuemin/max` de cada polegar é limitado pelo outro, então o leitor
  anuncia a faixa real de movimento.
- Um único ponto de tabulação para o par, com `[`/`]` alternando dentro — evita
  encher a ordem de Tab com dois paradas por faixa.

## Props

| Prop | Tipo | Padrão |
|---|---|---|
| `label` | `string` | — |
| `value` | `[number, number]` | — |
| `onChange` | `(value: [number, number]) => void` | — |
| `min` / `max` | `number` | `0` / `100` |
| `step` | `number` | `1` |
| `ticks` | `string[]` | — |
| `format` | `(v: number) => string` | — |
| `disabled` | `boolean` | `false` |

## Uso

```tsx
<RangeSlider label="Tamanho" min={0} max={100} value={size}
             onChange={setSize} format={(v) => `${v}px`} />
```
