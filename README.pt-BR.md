# Lacto Design System

Sistema de design unificado, destilado de quatro projetos:
[SVG_DRAW](https://github.com/pedroleitin/SVG_DRAW) ·
[grid_connect](https://github.com/pedroleitin/grid_connect) ·
[grid-gen-2](https://github.com/pedroleitin/grid-gen-2) ·
[swatch](https://github.com/pedroleitin/swatch)

**23 componentes** React + TypeScript, cada um com estilos, documentação e
exemplo interativo. Site navegável incluído.

> 🇬🇧 [Read in English](README.md)

## Rodar

```bash
npm install
npm run dev
```

Abre o site de documentação em `http://localhost:5173`.

| Comando | O que faz |
|---|---|
| `npm run dev` | Site de documentação com hot reload |
| `npm run build` | Typecheck + build de produção em `dist/` |
| `npm run preview` | Serve o build |
| `npm run tokens` | Regenera `src/tokens/tokens.css` a partir de `tokens.json` |
| `npm run typecheck` | Só os tipos |

## Stack

React 19 · Vite 7 · TypeScript · CSS puro com custom properties.

Sem Tailwind, sem Storybook, sem biblioteca de ícones. Única dependência de
runtime além do React: `marked`, para renderizar a documentação.

## Estrutura

```
tokens.json                    fonte única dos tokens visuais
scripts/build-tokens.mjs       gera o CSS a partir dele
src/
  tokens/tokens.css            GERADO — não editar à mão
  styles/base.css              reset, .lc-dots, .lc-scroll, .lc-overline
  components/<Nome>/
    <Nome>.tsx                 componente
    <nome>.css                 estilos
    README.md                  regras visuais, a11y, props (inglês)
    README.pt-BR.md            tradução em português
    <Nome>.demo.tsx            exemplo interativo
  index.ts                     barrel de exportação
  docs/                        o site (não faz parte do pacote)
```

## Componentes

**Ação** — Icon, Button, IconButton, Kbd
**Entrada** — TextField, NumberField, Slider, RangeSlider, ColorSwatch, Dropzone
**Seleção** — Switch, Checkbox\*, RadioGroup\*, Segmented, Select
**Estrutura** — Panel, Sidebar, Accordion, Tabs, Divider
**Retorno** — Tooltip, Toast, Badge

\* Criados no Lacto; não existiam nos repositórios de origem. Ver
**O que falta criar** no site.

## As cinco regras

1. **Binário ligado = `--lc-text` (escuro). Seleção entre opções = `--lc-accent`
   (amarelo).**
2. **Amarelo é interação, não estado** — hover universal e anel de foco.
3. **Números são mono** — Ubuntu Mono com `tabular-nums` para todo valor.
4. **Rótulos recuam (50% de opacidade), valores avançam (peso 700).**
5. **36px é a altura canônica** de botão, select e campo numérico.

## Idiomas

Inglês é o padrão, em `README.md`. O português fica ao lado em
`README.pt-BR.md`, na raiz e em cada pasta de componente. O site tem um seletor
`EN / PT` no topo da sidebar, guardado no `localStorage`.

## Usar em outro projeto

```tsx
import "lacto/src/styles/base.css";
import { Button, Slider, Tooltip } from "lacto";

<Tooltip />                      {/* singleton, uma vez na raiz */}
<Button kbd="c">Limpar</Button>
```

Tema:

```ts
document.documentElement.dataset.theme = "dark";
```
