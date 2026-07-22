# Toast

Confirmação efêmera no rodapé central. "Copiado", "Exportado como SVG",
"Paleta reordenada".

## API sem provider

`useToast()` devolve `show` **e o nó a renderizar**. Sem `ToastProvider`, sem
contexto, sem envolver a árvore:

```tsx
const { show, toasts } = useToast();

return (
  <>
    {toasts}
    <Button onClick={() => show("Copiado")}>Copiar</Button>
  </>
);
```

O nó é portado para `<body>`, então tanto faz onde você o coloca. Se vários
componentes precisarem disparar toasts, chame o hook uma vez perto da raiz e
passe `show` para baixo — ou chame o hook em cada lugar (cada um terá sua
própria pilha, o que costuma ser aceitável e é bem mais simples que um
contexto global).

## Regras visuais

| Regra | Valor |
|---|---|
| Posição | rodapé centralizado, 24px da borda |
| Fundo | `--lc-glass` + `blur(16px) saturate(1.4)` |
| Borda | 1px `--lc-glass-border` |
| Raio | 20px |
| Padding | `10px 18px` |
| Fonte | **mono** 13px |
| Sombra | `--lc-shadow-toast` |
| Entrada | `translateY(10px)` + fade, 0.22s `ease-out` |
| Saída | inverso, 0.15s `ease-in` |
| Duração | 2200ms |
| Empilhamento | `column-reverse` — o mais novo embaixo, perto do olhar |

**Mono porque quase toda mensagem carrega um dado**: um nome de arquivo, uma
contagem, um formato. Fonte proporcional faria `"Exportado como SVG"` e
`"12 cores adicionadas"` parecerem prosa, quando são retorno de operação.

O `Toast` também obedece `body.lc-noblur` (ver `Panel`).

## Tons

| Tom | Ícone | Uso |
|---|---|---|
| `neutral` | — | confirmação comum |
| `success` | `check_circle` verde | operação concluída |
| `danger` | `error`, texto vermelho | falhou, mas não bloqueia |

## Acessibilidade

- O host é `role="status"` com `aria-live="polite"`: o leitor anuncia sem
  interromper o que estiver falando.
- `aria-atomic="false"` — só a mensagem nova é lida, não a pilha inteira.
- Não é focável e não tem botão de fechar: some sozinho. Por isso **nunca
  coloque uma ação dentro de um toast** — quem navega por teclado não a
  alcançaria.
- Não use para erros que exigem decisão. Erro de campo → `TextField error`.
  Erro bloqueante → um diálogo (ainda não existe no Lacto, ver o backlog).

## API

| | |
|---|---|
| `useToast({ duration? })` | `duration` padrão 2200ms |
| `show(message, tone?)` | `tone`: `"neutral"` \| `"success"` \| `"danger"` |
| `toasts` | nó React a renderizar uma vez |

## Uso

```tsx
const { show, toasts } = useToast();

const copy = async () => {
  await navigator.clipboard.writeText(hex);
  show(`${hex} copiado`, "success");
};
```
