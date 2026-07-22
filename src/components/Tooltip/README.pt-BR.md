# Tooltip

Um **singleton**. Monte `<Tooltip />` uma vez na raiz do app e todo elemento com
`title` passa a ter o balão do Lacto — sem envolver cada gatilho num wrapper,
sem provider, sem context.

```tsx
// App.tsx
<>
  <Tooltip />
  <SuaApp />
</>
```

```tsx
// Em qualquer lugar
<button title="Desfazer">…</button>
<IconButton icon="undo" label="Desfazer" />   {/* já emite title */}
```

## Como funciona

Ouve `pointerover` / `focusin` no `document` e sobe a árvore até achar um
elemento com `title` ou `data-tip`. Na primeira vez, **rouba** o `title` para
`data-tip` — assim o balão nativo do sistema operacional nunca aparece junto.
O balão é portado para `<body>`, então nunca é cortado pelo `overflow` do
painel onde o gatilho vive.

## Regras visuais

| Regra | Valor |
|---|---|
| Fundo | `--lc-glass-solid` (opaco: precisa ser legível sobre qualquer coisa) |
| Borda | 1px `--lc-line` |
| Raio | 8px |
| Padding | `5px 9px` |
| Fonte | Outfit 12px, `line-height: 1.3`, centralizado |
| Largura máx. | 260px, quebra em várias linhas |
| Sombra | `--lc-shadow-popover` |
| Distância | 8px do gatilho |
| Entrada | `opacity` + `translateY(2px)` em 0.12s |

### Posicionamento

Acima do gatilho, centralizado, com 6px de margem mínima das bordas da janela.
Se não couber acima, vira para baixo (`is-below`) e a animação entra pelo lado
oposto. Rolagem em qualquer container fecha o balão.

## Acessibilidade

- `role="tooltip"`.
- Aparece no **foco por teclado**, não só no hover — é o que torna a dica útil
  para quem navega por Tab.
- `pointerdown` fecha: quem clicou já sabe o que o botão faz.
- A dica é complemento, nunca a única fonte da informação. Botão só de ícone
  precisa de `aria-label` próprio (o `IconButton` já garante).
- Como o conteúdo é lido do `title`, o leitor de tela já anuncia o texto pelo
  nome acessível do próprio controle.

## Props

| Prop | Tipo | Padrão |
|---|---|---|
| `gap` | `number` | `8` |

## Quando NÃO usar

Para texto essencial (erro de formulário, instrução obrigatória). Tooltip some,
não é focável e não existe em touch. Use `TextField` com `error`/`hint`.
