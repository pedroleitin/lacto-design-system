# IconButton

`Button` com largura travada na altura e um único `Icon` dentro. Existe para
uma coisa: **impossibilitar um botão de ícone sem nome acessível** — `label` é
prop obrigatória.

## Regras visuais

| Regra | Valor |
|---|---|
| Dimensão | quadrado: `sm` 30 · `md` **36** · `lg` 38 |
| Raio | 10px, ou `--lc-radius-full` com `round` |
| Ícone | `md` (20px) — `sm` (16px) só em botão `sm` |
| Variante padrão | `ghost` (o ícone flutua sobre o painel) |
| Press | `scale(0.93)` — mais forte que o `Button` de texto, porque a área é menor e o feedback precisa ser perceptível |

Herda hover, ativo, foco e desabilitado do `Button`.

### Quadrado ou redondo?

- **Quadrado** (padrão): dentro de barras de ferramenta, ao lado de botões com texto.
- **Redondo** (`round`): ações de chrome — tema, som, fechar — e ações flutuando sobre conteúdo.

## Acessibilidade

- `label` vira `aria-label` **e** `title` (o `title` alimenta o `Tooltip` do Lacto).
- Estado ligado usa `active` → `aria-pressed`.
- Nunca use um ícone cujo significado dependa de cor sozinha.

## Props

| Prop | Tipo | Padrão |
|---|---|---|
| `icon` | `string` | — |
| `label` | `string` | — (obrigatório) |
| `round` | `boolean` | `false` |
| `filled` | `boolean` | `false` |
| `iconSize` | `IconSize` | `"md"` |
| `variant` | `"solid" \| "pill" \| "ghost"` | `"ghost"` |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` |
| `active` | `boolean` | `false` |

## Uso

```tsx
<IconButton icon="undo" label="Desfazer" onClick={undo} />
<IconButton round icon="dark_mode" label="Tema escuro" active={dark} onClick={toggle} />
```

## Quando NÃO usar

Se a ação não tem um ícone universalmente legível, use `Button` com texto. Um
ícone ambíguo com tooltip continua sendo um ícone ambíguo.
