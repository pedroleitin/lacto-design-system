# Accordion

Seções recolhíveis. É a estrutura principal das sidebars dos projetos de
origem — o que mantém um painel de 40 controles navegável.

## Regras visuais

| Regra | Valor |
|---|---|
| Cabeçalho | `padding: 14px 16px`, texto 14px / 500 |
| Título | `--lc-text` a **60%** de opacidade → 100% no hover |
| Hover | **o item inteiro** ganha `--lc-hover` |
| Seta | `expand_more` 16px num disco de 24px |
| Disco da seta | invisível → `rgba(127,127,127,0.2)` no hover |
| Seta aberta | `rotate(180deg)` em 0.22s |
| Corpo | `padding: 0 16px 24px`, `gap: 20px` |
| Divisor | `Divider` (90%) ao fim de cada item, exceto o último |

Três coisas acontecem ao mesmo tempo no hover — item acende, título fica opaco,
disco da seta aparece. Juntas elas dizem "esta linha inteira é clicável", que é
verdade: o alvo é o cabeçalho todo, não só a setinha.

## A animação de abrir

`grid-template-rows: 0fr → 1fr` com `overflow: hidden` no filho.

É o único jeito de animar até a **altura real** do conteúdo em CSS puro. A
alternativa comum (`max-height: 500px`) obriga a chutar um valor: chutou baixo,
corta; chutou alto, a animação fica lenta no começo e o conteúdo aparece de
supetão. Com `fr`, a curva é sempre correta, qualquer que seja o conteúdo.

## `single`

Um item aberto por vez. Use em sidebars altas, onde vários abertos exigiriam
rolagem constante. Para painéis curtos, deixe múltiplos.

## Acessibilidade

- Cabeçalho é `<button>` com `aria-expanded` e `aria-controls`.
- Corpo é `role="region"` com `id` correspondente.
- Enter/Espaço alternam (botão nativo).
- Foco visível: anel `--lc-focus-ring` no cabeçalho.
- O conteúdo fechado continua no DOM (a animação depende disso). Se houver
  controles pesados dentro, monte-os condicionalmente — mas mantenha a região
  presente.

## Props

| Prop | Tipo | Padrão |
|---|---|---|
| `items` | `AccordionItemData[]` | — |
| `open` | `string[]` | — (controlado) |
| `onOpenChange` | `(open: string[]) => void` | — |
| `defaultOpen` | `string[]` | `[]` |
| `single` | `boolean` | `false` |

`AccordionItemData`: `{ id, title, content }`

## Uso

```tsx
<Accordion
  single
  defaultOpen={["grid"]}
  items={[
    { id: "grid", title: "Grade", content: <Slider … /> },
    { id: "colors", title: "Cores", content: <Palette /> },
  ]}
/>
```

Controles que já têm o próprio padding lateral (`Switch` e `Segmented` com
`label`) devem sangrar o padding do corpo com margens negativas — os dois
padrões vêm de lugares diferentes e não devem se somar.
