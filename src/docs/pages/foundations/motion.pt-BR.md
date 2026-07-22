Uma única curva — `cubic-bezier(0.4, 0, 0.2, 1)` — e seis durações. Passe o
mouse e clique nos botões abaixo para sentir a diferença entre elas.

> **Hover e cor: 0.16s. Press: 0.12s. Slider: 0.18s. Layout e morph: 0.22s.
> Abrir/fechar seção: 0.28s.**

## Durações

<!-- widget:motion-scale -->

## Princípios

- **Cor animada, posição não.** Hover, foco e seleção transicionam. Um cursor
  que salta de célula em célula não — ele deve ser instantâneo, senão fica
  "molenga".
- **Press mais rápido que hover.** 0.12s contra 0.16s: o clique precisa parecer
  imediato, o hover pode ser suave.
- **Escala de press: 0.93 em alvos pequenos, 0.96 em botões com texto.** Área
  menor exige deslocamento maior para o feedback ser perceptível.
- **Layout anima até a altura real.** `grid-template-rows: 0fr → 1fr`, nunca
  `max-height` chutado.
- **`prefers-reduced-motion` desliga tudo.** Já está no `base.css` — nenhum
  componente precisa tratar.

## Experimente

<!-- widget:motion-buttons -->
