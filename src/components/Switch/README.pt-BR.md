# Switch

O booleano do Lacto. **Não existe checkbox tradicional para ligar/desligar
opções** neste sistema — todo alternador é um switch, herdado dos quatro
projetos de origem.

## Regras visuais

| Regra | Valor |
|---|---|
| Trilho (md) | 70 × 17px, raio total |
| Trilho (sm) | 44 × 18px |
| Polegar | 39px de largura (56% no `sm`) — mais da metade do trilho |
| Fundo do trilho | `color-mix(--lc-line 20%, transparent)` |
| Área de clique | `outline: 4px` na cor do trilho — cresce sem engordar o desenho |
| Desligado | polegar **vazado**: borda 4px `--lc-text`, fundo transparente |
| Ligado | polegar **sólido** `--lc-text`, encostado à direita |
| Hover | trilho e outline viram `--lc-accent` |
| Foco | outline 4px `--lc-accent` |
| Transição | posição 0.15s · cor 0.22s, ambas `--lc-motion-ease` |

O polegar largo é a assinatura: de longe o controle lê como uma barrinha que
desliza, não como uma bolinha.

### Regra de cor deste sistema

> **Binário ligado = `--lc-text` (escuro). Seleção entre opções = `--lc-accent`
> (amarelo).**

Por isso o switch ligado fica escuro, e não amarelo — o amarelo aqui é o
*hover*, sinalizando "clicável", e é a cor de escolha em `Button`, `Segmented`,
`Tabs` e `Select`.

No tema escuro o hover amarelo forçaria um polegar escuro sobre amarelo; por
isso o polegar troca para `--lc-panel` só nesse caso.

## Linha rotulada

Com `label`, o componente renderiza a linha inteira: rótulo à esquerda a 50%
de opacidade, switch empurrado à direita, padding `12px 20px`. É o layout de
sidebar dos quatro repositórios. Sem `label`, sai só o controle.

## Acessibilidade

- `role="switch"` + `aria-checked` — o leitor anuncia "ligado/desligado".
- `<label htmlFor>` conecta o texto ao controle: clicar no rótulo alterna.
- Espaço/Enter alternam (é um `<button>` nativo).
- `kbd` emite `aria-keyshortcuts`.
- Estado nunca depende só de cor: a posição do polegar e o vazado/sólido são
  redundantes com a cor.

## Props

| Prop | Tipo | Padrão |
|---|---|---|
| `checked` | `boolean` | — |
| `onChange` | `(checked: boolean) => void` | — |
| `label` | `ReactNode` | — |
| `kbd` | `string` | — |
| `size` | `"sm" \| "md"` | `"md"` |
| `disabled` | `boolean` | `false` |

## Uso

```tsx
<Switch label="Esconder guias" kbd="h" checked={hide} onChange={setHide} />
<Switch aria-label="Som" checked={sound} onChange={setSound} size="sm" />
```

## Quando usar `Checkbox` em vez disso

Só em **listas de seleção múltipla** (marcar vários itens de um conjunto) e em
formulários com envio explícito. Switch = efeito imediato; checkbox = escolha
que só vale depois de confirmar.
