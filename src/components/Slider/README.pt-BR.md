# Slider

Duas variantes do mesmo controle. A `bar` é a assinatura do Lacto.

## `variant="bar"` (padrão)

Uma pílula alta cujo **preenchimento escuro é o valor**, com rótulo à esquerda
e número à direita **dentro** dela. Sem polegar, sem rótulo externo: o controle
inteiro é a barra.

O texto claro só é revelado junto com o preenchimento escuro — em repouso ele
seria branco sobre um fundo claro. O truque: o texto é desenhado **duas vezes** — escuro sobre o trilho claro, e
claro dentro do preenchimento (que tem `overflow: hidden`, recortando-o na
posição exata). Assim o texto contrasta em qualquer valor, sem calcular
luminância. A cópia clara precisa ter a largura do trilho inteiro; um
`ResizeObserver` mantém essa medida.

### Repouso e hover

O slider é discreto até você chegar perto. Em repouso, trilho e preenchimento
são quase invisíveis e só o rótulo e o valor têm contraste — uma coluna com dez
sliders lê como uma lista de valores, não como dez barras competindo entre si.
No hover (ou no foco por teclado) as três coisas ganham peso **ao mesmo
tempo**, em 0.18s.

| Regra | Repouso | Hover / foco |
|---|---|---|
| Trilho | `--lc-line` a **20%** | `--lc-line` cheio |
| Preenchimento | `--lc-text` a **5%** | `--lc-text` sólido |
| Texto claro | `opacity: 0` | `opacity: 1` |

| Regra | Valor |
|---|---|
| Altura | 34px, raio total |
| Padding do texto | `0 15px` |
| Rótulo | Outfit 13px |
| Valor | **mono, 700, tabular-nums** |
| Transição | `--lc-motion-slider` (0.18s `ease`) |
| Foco | anel `--lc-focus-ring` |

## `variant="track"`

Rótulo e valor **acima**, trilho de 16px com polegar redondo de 16px. Para
colunas estreitas onde o texto não caberia dentro da barra.

| Regra | Valor |
|---|---|
| Cabeçalho | rótulo `--lc-text` a 50% · valor `--lc-muted` mono |
| Trilho | 16px, `--lc-line`, raio total |
| Preenchimento | `--lc-text`, canto direito reto |
| Polegar | 16px `--lc-text` |
| Hover | halo `0 0 0 4px` de `--lc-accent` a 45% no polegar |

## Números são sempre mono

Todo valor exibido usa `--lc-font-mono` com `tabular-nums`. É por isso que o
número não "pula" enquanto você arrasta — cada dígito ocupa a mesma largura.
Regra do sistema, não detalhe deste componente.

## Interação

- **Mouse/toque**: clicar em qualquer ponto salta para o valor; arrastar
  continua. `setPointerCapture` mantém o gesto mesmo saindo da caixa.
- **Teclado**: `←↓` / `→↑` = ±`step` · `PageUp/PageDown` = ±10% da faixa ·
  `Home`/`End` = mínimo/máximo.
- `touch-action: none` — arrastar não rola a página.

## Acessibilidade

- `role="slider"` com `aria-valuemin/max/now` e **`aria-valuetext`** (o texto
  formatado, ex: `"45%"`, é o que o leitor anuncia — não o número cru).
- `aria-label` vem do `label`.
- Desabilitado sai da ordem de Tab (`tabIndex: -1`) e marca `aria-disabled`.

## Props

| Prop | Tipo | Padrão |
|---|---|---|
| `label` | `string` | — |
| `value` | `number` | — |
| `onChange` | `(value: number) => void` | — |
| `min` / `max` | `number` | `0` / `100` |
| `step` | `number` | `1` |
| `suffix` | `string` | `""` |
| `format` | `(v: number) => string` | — |
| `variant` | `"bar" \| "track"` | `"bar"` |
| `disabled` | `boolean` | `false` |

## Uso

```tsx
<Slider label="Colunas" min={1} max={20} value={cols} onChange={setCols} />
<Slider label="Opacidade" min={0} max={1} step={0.05} value={op}
        onChange={setOp} format={(v) => v.toFixed(2)} />
```

Numa pilha de sliders `bar`, use `gap: 9px` — é o respiro do sistema.
