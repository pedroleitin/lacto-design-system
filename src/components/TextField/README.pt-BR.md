# TextField

Campo de texto de uma linha. **O valor sempre sai em Ubuntu Mono** — é a regra
mais visível do Lacto: tudo que o usuário digita ou lê como dado é monoespaçado.

## Regras visuais

| Regra | Valor |
|---|---|
| Altura | `md` 38px · `sm` 30px |
| Fundo | `--lc-surface` (com `outlined`: `--lc-bg` + borda `--lc-line`) |
| Borda | 1.5px transparente → `--lc-accent` no foco |
| Raio | 10px |
| Padding | `0 12px` (`sm`: 8px) |
| Fonte do valor | **mono** 13px (`sm`: 12px) |
| Placeholder | `--lc-muted` a 70% |
| Rótulo | 12px `--lc-muted`, acima |
| Mensagem | 11px `--lc-muted`, abaixo |
| Foco | borda accent + anel `--lc-focus-ring` |
| Somente leitura | `opacity: 0.7` |

### Preenchido ou contornado?

- **Padrão** (`--lc-surface`): dentro de painéis, onde o campo precisa se
  destacar do fundo do painel.
- **`outlined`** (`--lc-bg` + borda): sobre superfícies claras, onde um campo
  branco desapareceria.

## Modo `hex`

Centraliza, força maiúsculas e liga `tabular-nums`. É o campo de cor do sistema
— o seletor nativo não tem entrada hex, então este campo é a única forma de
digitar um valor exato.

## Ação à direita

`action` recebe um `IconButton` que fica **invisível até o hover ou o foco**
(`opacity: 0 → 0.55 → 1`). Assim uma coluna de campos não vira uma parede de
ícones, mas a ação está a um movimento de distância.

## Erro

`error` (em vez de `hint`) pinta borda e mensagem de `--lc-danger`, marca
`aria-invalid` e anuncia a mensagem com `role="alert"`. O erro nunca é só cor:
a mensagem é obrigatória.

## Acessibilidade

- `<label htmlFor>` real — clicar no rótulo foca o campo.
- `aria-describedby` liga `hint`/`error` ao campo.
- `aria-invalid` no estado de erro.
- `spellCheck={false}` por padrão (a maioria dos campos é de dados, não prosa).
- Sem `label` visível, passe `aria-label`.

## Props

| Prop | Tipo | Padrão |
|---|---|---|
| `label` | `ReactNode` | — |
| `hint` | `ReactNode` | — |
| `error` | `ReactNode` | — |
| `icon` | `string` | — |
| `action` | `ReactNode` | — |
| `size` | `"sm" \| "md"` | `"md"` |
| `outlined` | `boolean` | `false` |
| `hex` | `boolean` | `false` |

Mais todos os atributos de `<input>`.

## Uso

```tsx
<TextField label="Nome" value={v} onChange={(e) => set(e.target.value)} />

<TextField label="Cor" hex maxLength={7} value={hex} onChange={…}
           error={valid ? undefined : "Use #RRGGBB."} />

<TextField label="Link" readOnly outlined value={url}
           action={<IconButton icon="content_copy" label="Copiar" size="sm" iconSize="xs" />} />
```
