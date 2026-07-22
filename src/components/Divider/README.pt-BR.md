# Divider

Uma linha de 1px. O detalhe que importa: **a horizontal ocupa 90% da largura,
centralizada**.

Esse recuo de 5% em cada ponta é deliberado. Uma linha de borda a borda faz a
sidebar ler como uma tabela — as seções viram células. Com a folga, a linha
separa sem fechar, e o painel continua parecendo um painel.

## Regras visuais

| Regra | Valor |
|---|---|
| Espessura | 1px |
| Cor (claro) | `--lc-line` |
| Cor (escuro) | `rgba(255,255,255,0.08)` — mais fraca que o token, senão salta |
| Horizontal | 90% da largura, `margin: 0 auto` |
| `full` | 100% |
| Vertical | `align-self: stretch`, `margin: 2px` |

No tema escuro o divisor **não** usa `--lc-line` puro: sobre um painel quase
preto, aquela linha ficaria mais visível que o conteúdo. Um branco a 8% mantém
a mesma hierarquia percebida dos dois lados.

## Uso

- **Horizontal**: entre itens de acordeão, entre seções de sidebar, acima da
  fileira de ações fixada no rodapé.
- **Vertical**: entre grupos de botões dentro de uma barra de ferramentas.
- **`full`**: apenas quando o divisor coincide com a borda de um card.

O último item de uma lista não leva divisor. No `Accordion` isso já é
automático (`:last-child`).

## Acessibilidade

`role="separator"` + `aria-orientation`. É decorativo em quase todo caso, mas
declarar a orientação ajuda a navegação por regiões.

## Props

| Prop | Tipo | Padrão |
|---|---|---|
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` |
| `full` | `boolean` | `false` |

## Uso

```tsx
<Divider />
<Divider orientation="vertical" />
```
