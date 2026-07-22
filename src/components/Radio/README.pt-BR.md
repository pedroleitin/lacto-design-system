# RadioGroup

> **Componente novo.** O que os projetos de origem chamavam de "radio button"
> (o controle *Animate* do grid-gen-2) é na verdade um `Segmented` de ícones em
> pílula. Este é o radio clássico, criado para o caso que o `Segmented` não
> cobre. **Confirme ou ajuste o desenho.**

## Radio ou Segmented?

| Situação | Componente |
|---|---|
| 2–4 opções curtas, lado a lado, troca frequente | `Segmented` |
| Opções com descrição, rótulo longo, ou mais de 4 | `RadioGroup` |
| Escolha dentro de formulário longo | `RadioGroup` |
| Escolha de ferramenta/modo na barra | `Segmented` ou `Tabs` |

## Regras visuais

| Regra | Valor |
|---|---|
| Marcador | círculo 18px, borda 2px `--lc-line-strong` |
| Ponto interno | 8px `--lc-text`, entra com `scale(0 → 1)` em 0.15s |
| Selecionado | borda vira `--lc-text` |
| Hover | borda vira `--lc-accent` |
| Press | `scale(0.93)` |
| Foco | anel `--lc-focus-ring` |
| Rótulo | 14px `--lc-text` |
| Dica (`hint`) | 12px `--lc-muted`, segunda linha |
| Espaçamento | coluna 10px · linha 14px |
| Legenda | estilo `.lc-overline` (12px maiúsculo espaçado, `--lc-muted`) |

O ponto cresce a partir do centro em vez de aparecer de repente — é a mesma
suavidade do polegar do `Switch`.

## Acessibilidade

- `<fieldset>` + `<legend>` agrupam semanticamente: o leitor anuncia o título
  do grupo antes de cada opção.
- Inputs nativos com o mesmo `name`: **setas do teclado navegam entre as opções
  de graça**, e apenas um item entra na ordem de Tab (comportamento correto de
  grupo de rádio).
- `hint` fica dentro do `<label>`, então também é anunciado.
- Nunca deixe um `RadioGroup` sem opção selecionada se houver um padrão óbvio.

## Props

| Prop | Tipo | Padrão |
|---|---|---|
| `legend` | `ReactNode` | — |
| `options` | `RadioOption[]` | — |
| `value` | `string` | — |
| `onChange` | `(value: string) => void` | — |
| `name` | `string` | gerado |
| `direction` | `"column" \| "row"` | `"column"` |

`RadioOption`: `{ value, label, hint?, disabled? }`

## Uso

```tsx
<RadioGroup
  legend="Formato"
  value={fmt}
  onChange={setFmt}
  options={[
    { value: "svg", label: "SVG", hint: "Vetorial" },
    { value: "png", label: "PNG", hint: "Bitmap" },
  ]}
/>
```
