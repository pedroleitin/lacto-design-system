# Sidebar

O painel de controles. Não encosta na borda da janela: **10px de folga nos
quatro lados**, raio de 15px. É o que faz a grade de pontos aparecer em volta e
o painel parecer apoiado sobre a tela, e não recortado dela.

## Anatomia

```
┌──────────────────────────┐
│ Título        [ação]     │  header — fixo
├──────────────────────────┤  Divider full
│ ┌──────────────────────┐ │
│ │ controles…           │ │  body — rolável
│ │                      │ │
│ │ dica (spacer)        │ │  empurrada para o fim
│ └──────────────────────┘ │
├──────────────────────────┤  Divider full
│ [Resetar]   [Limpar]     │  footer — fixo
└──────────────────────────┘
```

## Regras visuais

| Regra | Valor |
|---|---|
| Largura | `--lc-size-sidebar` (320px) |
| Folga | 10px em todos os lados |
| Fundo | `--lc-panel` opaco, sem sombra |
| Raio | 15px |
| Título | 26px / 500, `line-height: 1` |
| Padding do header | `16px 20px 12px` |
| Rodapé | padding 16px, ações com `flex: 1` (largura igual) |
| Dica | 11px a 50% de opacidade, `line-height: 1.6` |
| Rolagem | `.lc-scroll` — barra de 4px `--lc-line` |

Os divisores do header e do footer são `full` (100%), não os 90% padrão: aqui
eles marcam a fronteira de uma **região fixa** contra a área rolável, e a linha
completa comunica isso.

## `__spacer`

`margin-top: auto` no último bloco do corpo o empurra para o fim da área
rolável. É como a dica de uso fica no rodapé do conteúdo sem sair da rolagem —
diferente do `footer`, que nunca rola.

## Composição

A `Sidebar` não impõe espaçamento ao conteúdo. Os controles trazem o próprio
padding:

- `Switch` e `Segmented` **com `label`** já vêm com `padding: 12px 20px` —
  coloque-os direto como filhos.
- `Slider` e outros controles nus precisam de um invólucro:
  `<div style={{ padding: "12px 20px", display: "grid", gap: 9 }}>`.
- Para muitas seções, coloque um `Accordion` como filho único.

## Responsividade

Abaixo de 640px a sidebar vira uma faixa de largura total ancorada no rodapé,
com `max-height: 60dvh`. `dvh` e não `vh`: no mobile a barra do navegador
aparece e some, e `vh` deixaria o rodapé cortado.

## Acessibilidade

- É um `<aside>` — região de complemento, pulável pela navegação por regiões.
- Passe `aria-label` quando houver mais de uma sidebar.
- O corpo é rolável e focável por teclado (a rolagem por setas funciona ao
  focar um controle dentro dele).
- O rodapé fica fora da rolagem: as ações destrutivas estão sempre visíveis.

## Props

| Prop | Tipo | Padrão |
|---|---|---|
| `title` | `ReactNode` | — |
| `headerAction` | `ReactNode` | — |
| `footer` | `ReactNode` | — |
| `side` | `"left" \| "right"` | `"left"` |
| `inline` | `boolean` | `false` |

`inline` põe a sidebar no fluxo do layout em vez de fixa na janela — use dentro
de um grid de aplicação, ou em demos.

## Uso

```tsx
<Sidebar
  title="Lacto"
  headerAction={<IconButton round icon="dark_mode" label="Tema" />}
  footer={<><Button kbd="r">Resetar</Button><Button kbd="c">Limpar</Button></>}
>
  <Accordion items={sections} single />
</Sidebar>
```
