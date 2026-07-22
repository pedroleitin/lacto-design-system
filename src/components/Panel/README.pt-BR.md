# Panel

A superfície do Lacto. Duas variantes, e a escolha entre elas não é estética —
é sobre **o que existe atrás**.

| Variante | Fundo | Onde |
|---|---|---|
| `glass` | `--lc-glass` + `blur(16px) saturate(1.4)` | Flutuando sobre canvas/conteúdo |
| `solid` | `--lc-panel` opaco | Ancorado numa borda: sidebar, dock, cartão |

Regra: **se há conteúdo do usuário atrás, use `glass`** — o blur mantém a
noção de que a arte continua ali embaixo. Se o painel está preso a uma borda e
não tem nada atrás, `solid` é mais barato e mais legível.

## Regras visuais

| Regra | `glass` | `solid` |
|---|---|---|
| Fundo | `--lc-glass` | `--lc-panel` |
| Blur | `blur(16px) saturate(1.4)` | — |
| Borda | 1px `--lc-glass-border` | — |
| Raio | 20px | 15px |
| Sombra | `--lc-shadow-panel` | — |
| Padding | `16px 18px` | `16px 18px` |

O `saturate(1.4)` é o que impede o vidro de parecer cinza: sem ele o blur
lava a cor do que está atrás.

## `body.lc-noblur` — a válvula de escape

`backdrop-filter` obriga o navegador a recompor tudo que está atrás do painel a
cada quadro. Com uma animação rodando no canvas, isso derruba o FPS.

Ligue `document.body.classList.add("lc-noblur")` enquanto a animação roda: todo
vidro do sistema (`Panel`, menu do `Select`, `Toast`) troca para
`--lc-glass-solid`, um fundo opaco quase idêntico. Layout, tamanho e cor
percebida não mudam — só o custo.

```ts
const onPlay  = () => document.body.classList.add("lc-noblur");
const onPause = () => document.body.classList.remove("lc-noblur");
```

## Ancoragem

`anchor` posiciona o painel sobre a tela: `top-left`, `top-right`,
`top-center`, `bottom-left`, `bottom-right`, `bottom-center`. A folga é de
**10px em todos os lados** (`--lc-space-5`) — a mesma da `Sidebar`, para duas
caixas flutuantes na mesma tela se alinharem.

O container pai precisa ser `position: relative` (ou ser a própria janela).

## Morph

Quando o painel troca de conteúdo **e** de tamanho, uma troca seca dá um salto.
A classe `lc-panel--morph` dá a sequência do sistema:

1. `.is-fading` — conteúdo some em 0.11s
2. troca o conteúdo, mede o novo tamanho
3. `.is-sizing` — largura/altura animam em 0.21s com `overflow: hidden`
4. o novo conteúdo aparece

O `overflow: hidden` durante o passo 3 evita o flash de barra de rolagem no
meio do redimensionamento.

## Acessibilidade

- `Panel` é um `<div>` sem semântica própria. Se ele agrupa uma região, passe
  `role="region"` + `aria-label`.
- `title` vira `<h2>` com estilo overline — mantém a hierarquia de cabeçalhos
  do documento mesmo com aparência de rótulo pequeno.
- Contraste: `--lc-glass` sobre conteúdo arbitrário não garante contraste. Para
  texto crítico sobre imagem, use `solid` ou `--lc-glass-solid`.

## Props

| Prop | Tipo | Padrão |
|---|---|---|
| `variant` | `"glass" \| "solid"` | `"glass"` |
| `title` | `ReactNode` | — |
| `anchor` | `PanelAnchor` | — |
| `flush` | `boolean` | `false` |

## Uso

```tsx
<Panel title="Grade" anchor="bottom-center" style={{ width: 340 }}>
  <Slider label="Densidade" value={v} onChange={setV} />
</Panel>

<Panel variant="solid" anchor="bottom-left">
  <span className="lc-mono lc-tnum">x 128 · y 64</span>
</Panel>
```
