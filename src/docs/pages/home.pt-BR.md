# Lacto

Sistema de design unificado, destilado de quatro projetos:
[SVG_DRAW](https://github.com/pedroleitin/SVG_DRAW),
[grid_connect](https://github.com/pedroleitin/grid_connect),
[grid-gen-2](https://github.com/pedroleitin/grid-gen-2) e
[swatch](https://github.com/pedroleitin/swatch).

Os quatro já falavam a mesma língua visual — mesma paleta, mesmas duas fontes,
mesmo amarelo. O que existia eram **variantes do mesmo componente** espalhadas
por repositórios diferentes. O Lacto escolhe uma versão de cada, documenta a
regra por trás dela e a entrega como componente React tipado.

## As cinco regras

1. **Binário ligado = `--lc-text` (escuro). Seleção entre opções = `--lc-accent`
   (amarelo).** Um `Switch` ligado fica escuro; um `Button` selecionado fica
   amarelo.

2. **Amarelo é interação, não estado.** `#FFC800` é o hover universal e o anel
   de foco. Ele diz "isto responde a você".

3. **Números são mono.** Todo valor, hex, coordenada, contagem e campo de texto
   usa Ubuntu Mono com `tabular-nums`. Prosa e rótulos usam Outfit.

4. **Rótulos recuam, valores avançam.** Rótulos de controle ficam a 50% de
   opacidade; o valor fica em peso 700. O que muda é o que tem contraste.

5. **36px é a altura canônica.** Botão, select e campo numérico compartilham
   ela — qualquer fileira de controles se alinha sem ajuste.

## Instalação

```bash
npm install
npm run dev        # abre este site
npm run tokens     # regenera src/tokens/tokens.css a partir de tokens.json
npm run typecheck  # verifica os tipos
```

## Usar em um projeto

```tsx
import "lacto/src/styles/base.css";
import { Button, Slider, Tooltip } from "lacto";

export function App() {
  return (
    <>
      <Tooltip />           {/* singleton: liga o title de todo mundo */}
      <Button kbd="c">Limpar</Button>
    </>
  );
}
```

O tema troca por atributo, sem provider:

```ts
document.documentElement.dataset.theme = "dark";
```

## Stack

React 19 · Vite 7 · TypeScript · **CSS puro com custom properties**.

Sem Tailwind (o consumidor precisaria replicar a config), sem Storybook (são
~40 pacotes para o que este site faz com um roteador de 20 linhas), sem
biblioteca de ícones (Material Symbols é uma fonte). A única dependência de
runtime além do React é `marked`, para renderizar estes documentos.

## Estrutura

```
tokens.json                       fonte única dos tokens
scripts/build-tokens.mjs          gera o CSS
src/
  tokens/tokens.css               GERADO — não editar
  styles/base.css                 reset, .lc-dots, .lc-scroll, .lc-overline
  components/<Nome>/
    <Nome>.tsx                    componente
    <nome>.css                    estilos
    README.md                     documentação (é o que você lê aqui)
    <Nome>.demo.tsx               exemplo interativo
  index.ts                        barrel de exportação
  docs/                           este site
```

Cada componente é uma pasta fechada: código, estilo, documentação e exemplo.
Nada de arquivo de estilo global por componente.
