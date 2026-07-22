Uma paleta quente e dessaturada com um único acento: o amarelo `#FFC800`. Todo
token existe em claro e escuro, e o tema troca por `[data-theme]` no `<html>` —
nenhum componente sabe qual tema está ativo.

## Regra de cor do sistema

> **Binário ligado = `--lc-text` (escuro). Seleção entre opções = `--lc-accent`
> (amarelo).**

Um `Switch` ligado fica escuro; um `Button` selecionado fica amarelo. O amarelo
também é o hover universal e o anel de foco — é a cor que diz "isto responde a
você", não "isto está ligado".

<!-- widget:color-grid -->

## Fundo pontilhado

A classe `.lc-dots` é a assinatura do sistema: pontos de 1,25px numa grade de
25px, a 50% de opacidade, em `--lc-dot`. Use em qualquer área de trabalho —
canvas, palco de demo, estado vazio.

<!-- widget:dots-preview -->
