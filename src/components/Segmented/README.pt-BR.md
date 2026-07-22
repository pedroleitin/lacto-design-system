# Segmented

Escolha única entre 2–4 opções curtas, todas visíveis ao mesmo tempo. É o
controle mais característico do Lacto: um trilho rebaixado com **um** segmento
sólido por cima.

## Formas e tons

| | Trilho | Segmento ativo | Onde usar |
|---|---|---|---|
| `rounded` + `ink` | raio 10, fundo `line 20%` | `--lc-text` sólido, raio 7 | **Padrão.** Sidebar, painel de ajustes |
| `pill` + `ink` | raio total, opções a 45% de opacidade | `--lc-text` sólido, raio total | Fileira de ícones (modo de animação) |
| `rounded` + `accent` | `--lc-surface`, divisórias 1px | `--lc-accent` | Barra de ferramentas, junto de `Button` |

Regra: dentro de **sidebar/painel** use `ink` (o ativo é escuro, o amarelo é só
hover). Na **barra de ferramentas** use `accent`, para o segmento selecionado
falar a mesma língua do `Button active`.

## Regras visuais

| Regra | Valor |
|---|---|
| Padding do trilho | 3px (tom `accent`: 0) |
| Área ampliada | `outline: 3px` na cor do trilho |
| Hover do trilho | tudo vira `--lc-accent` de uma vez |
| Opção | 13px / 500, `padding: 6px 12px`, raio 7px |
| Opção `pill` | mín. 44px de largura, altura 30px |
| Ativo | fundo `--lc-text`, texto `--lc-panel` |
| Transição | cor da opção 0.15s · trilho 0.22s |
| Foco | anel `--lc-focus-ring` no segmento |

O hover pinta o **trilho inteiro** de amarelo, não o segmento sob o cursor.
É intencional: sinaliza "este controle é clicável" sem prometer qual opção
seria escolhida. No tema escuro os segmentos invertem para continuar legíveis
sobre o amarelo.

## Duas opções: clicar alterna

Com **exatamente duas** opções o controle vira um alternador: clicar na opção
que já está ativa passa para a outra. Clicar em qualquer metade sempre muda o
valor.

Sem isso, metade dos cliques num controle binário não faz nada — e duas caixas
lado a lado leem como um interruptor, então a pessoa clica na que está vendo, e
não na que quer. Liga sozinho; não tem prop.

Não vale com três ou mais opções (não haveria uma "outra" única para onde ir), e
pula um irmão desabilitado.

> O controle mantém `role="radiogroup"`, que descreve o estado corretamente.
> Reclicar um radio nativo já marcado não faz nada, então isto é uma affordance
> deliberada de ponteiro **em cima** do comportamento padrão, não uma
> substituição. Se as duas opções forem os opostos de um mesmo ajuste, e não
> duas escolhas nomeadas, use `Switch`.

## Ícones

`icon` aceita um glifo Material Symbols, renderizado a 16px. Opção só de ícone
**exige** `title` — vira `aria-label` e alimenta o `Tooltip`.

## Linha rotulada

Com `label`, sai a linha de sidebar completa (rótulo a 50% de opacidade à
esquerda, controle à direita, padding `12px 20px`), igual à do `Switch`. Use
`width` para alinhar trilhos de tamanhos diferentes na mesma coluna.

## Acessibilidade

- `role="radiogroup"` com `role="radio"` + `aria-checked` em cada opção.
- Passe `aria-label` quando não houver `label` visível.
- A opção ativa nunca se distingue só por cor: o fundo sólido muda a forma, e
  no `pill` a opacidade também.

## Props

| Prop | Tipo | Padrão |
|---|---|---|
| `options` | `SegmentedOption[]` | — |
| `value` | `string` | — |
| `onChange` | `(value: string) => void` | — |
| `label` | `ReactNode` | — |
| `kbd` | `string` | — |
| `shape` | `"rounded" \| "pill"` | `"rounded"` |
| `tone` | `"ink" \| "accent"` | `"ink"` |
| `width` | `number \| string` | auto |

`SegmentedOption`: `{ value, label?, icon?, title?, disabled? }`

## Uso

```tsx
<Segmented
  label="Modo" kbd="m" width={140}
  value={mode} onChange={setMode}
  options={[{ value: "draw", label: "Desenhar" }, { value: "paint", label: "Pintar" }]}
/>
```

## Quando NÃO usar

Mais de 4 opções, ou rótulos longos → `Select`. Opções com descrição →
`RadioGroup`. Navegação entre telas → `Tabs`.
