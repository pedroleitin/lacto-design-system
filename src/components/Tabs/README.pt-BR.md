# Tabs

Fileira de pílulas para trocar de **modo** ou de **seção**. No topo central da
tela, dentro de um `Panel` de vidro, é o trocador de modos que dá a estrutura
do app inteiro.

## Regras visuais

| Regra | Valor |
|---|---|
| Trilho | `padding: 5px`, raio total, `gap: 4px` |
| Aba | `padding: 7px 20px`, 14px / 500, raio total |
| Inativa | `--lc-muted` |
| Hover | **só a cor** vira `--lc-text` — sem fundo |
| Ativa | fundo `--lc-accent`, texto `--lc-accent-ink`, peso 600 |
| Press | `scale(0.93)` |
| Foco | anel `--lc-focus-ring` |

O hover não pinta fundo de propósito. Numa fileira de 3–4 pílulas, um fundo no
hover competiria com a pílula amarela e o olho perderia qual está ativa. Só
recuperar o contraste do texto já basta para dizer "clicável".

O trilho não tem fundo próprio — ele herda o `Panel` de vidro em que está. Fora
de um `Panel`, a fileira flutua sobre a página sem caixa.

### A forma que você realmente vê

O trilho já é `--lc-radius-full`, mas quase toda fileira vive dentro de um
`Panel` de vidro — e é o raio de 20px **do painel** que aparece na tela. Quando o
painel não contém nada além da fileira, ele acompanha a forma do conteúdo:

```css
.lc-panel:has(> .lc-tabs:only-child) {
  border-radius: var(--lc-radius-full);
}
```

O `:only-child` é a trava: um painel que também tenha outro conteúdo mantém os
20px normais, porque ali o retângulo arredondado é o certo.

## `role="tab"` vs `role="mode"`

| | Semântica | Quando |
|---|---|---|
| `tab` (padrão) | `tablist` / `tab` + `tabpanel` | Navegar entre painéis de conteúdo |
| `mode` | `radiogroup` / `radio` | Trocar o **modo** do app, sem trocar de painel |

A distinção importa para leitor de tela: `tablist` promete que existe um painel
correspondente. O trocador de modos (Compor / Animar / Exportar) muda o
comportamento das ferramentas, não a região exibida — então é `radiogroup`.

## Acessibilidade

- **Setas ←→ navegam**, dão a volta no fim e pulam abas desabilitadas.
- Com `role="tab"`, só a aba ativa fica na ordem de Tab (`tabIndex: -1` nas
  outras) — o padrão correto de tablist: Tab entra na fileira, setas se movem
  dentro dela, Tab sai para o painel.
- `TabPanel` recebe `role="tabpanel"`, `tabIndex={0}` e o `id` ligado por
  `aria-controls`.
- Passe sempre `aria-label` na fileira.

## Props

| Prop | Tipo | Padrão |
|---|---|---|
| `items` | `TabItem[]` | — |
| `value` | `string` | — |
| `onChange` | `(value: string) => void` | — |
| `role` | `"tab" \| "mode"` | `"tab"` |

`TabItem`: `{ value, label, icon?, disabled? }`

## Uso

```tsx
<Panel anchor="top-center" style={{ padding: 5 }}>
  <Tabs role="mode" aria-label="Modo"
    items={[{ value: "compor", label: "Compor" }, { value: "animar", label: "Animar" }]}
    value={mode} onChange={setMode} />
</Panel>

<Tabs aria-label="Seções" items={sections} value={tab} onChange={setTab} />
<TabPanel value="grade" active={tab}>…</TabPanel>
```

## Quando NÃO usar

Escolha binária ou de 2–3 opções dentro de um painel → `Segmented`. `Tabs` é
para navegação de topo; `Segmented` é para um ajuste dentro de um formulário.
