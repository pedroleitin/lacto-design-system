# NumberField

Entrada numérica com a **mesma silhueta do `Select` e do `Button`** — 36px de
altura, 104px de largura mínima, raio 10px. É o que permite montar uma fileira
de controles (`Select` + `NumberField` + `Button`) sem nada desalinhar.

## Regras visuais

| Regra | Valor |
|---|---|
| Altura | 36px · largura mín. 104px |
| Fundo | `--lc-surface`, sem borda |
| Raio | 10px |
| Prefixo/sufixo | `--lc-muted`, não selecionável |
| Número | **mono, 700, `tabular-nums`, alinhado à direita** |
| Foco | anel `--lc-focus-ring` na pílula inteira |

### Sem setinhas

As setas nativas do `input[type=number]` são removidas (`appearance: textfield`
+ regras `-webkit-*-spin-button`). Elas quebram o alinhamento vertical, são
alvos pequenos demais e duplicam o que as setas do teclado já fazem melhor.

Alinhamento à direita + `tabular-nums`: os dígitos ficam ancorados e o campo
não "respira" quando o número muda de 9 para 10.

## Rascunho local

O valor digitado vive num estado local até `blur` ou `Enter`. Sem isso, estados
intermediários legítimos — `""`, `"-"`, `"1."` — seriam convertidos para `NaN`
ou `0` a cada tecla, e o campo brigaria com quem está digitando.

- `Enter` confirma e limita a `min`/`max`.
- `Esc` descarta e volta ao valor anterior.
- `blur` confirma.

## Acessibilidade

- `<input type="number">` nativo: setas ↑↓ ajustam pelo `step`, teclado
  numérico aparece no celular.
- `prefix` vira `<label htmlFor>` real; sem ele, passe `aria-label`.
- `min`/`max`/`step` são atributos nativos, então tecnologias assistivas leem a
  faixa válida.

## Props

| Prop | Tipo | Padrão |
|---|---|---|
| `value` | `number` | — |
| `onChange` | `(value: number) => void` | — |
| `prefix` | `string` | — |
| `suffix` | `string` | — |
| `min` / `max` | `number` | — |
| `step` | `number` | `1` |
| `disabled` | `boolean` | `false` |

## Uso

```tsx
<NumberField prefix="Duração" suffix="s" min={1} max={60}
             value={dur} onChange={setDur} />
```

## Quando usar `Slider` em vez disso

Quando o número é **explorado** (você arrasta até ficar bonito) e não digitado.
`NumberField` é para valores exatos e conhecidos: duração, FPS, margem.
