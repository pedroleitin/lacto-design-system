# Checkbox

> **Componente novo.** Nenhum dos quatro repositórios tinha checkbox de verdade
> — todos usam `Switch` inclusive para o que seria seleção múltipla. Desenhado
> aqui a partir da linguagem existente (quadrado 18px, raio 6, preenchimento
> `--lc-text`, hover amarelo). **Confirme ou ajuste o desenho.**

## Switch ou Checkbox?

| Situação | Componente |
|---|---|
| Ligar/desligar uma opção com efeito imediato | `Switch` |
| Marcar vários itens de uma lista | `Checkbox` |
| Formulário com botão de envio explícito | `Checkbox` |
| Aceite de termos | `Checkbox` |

## Regras visuais

| Regra | Valor |
|---|---|
| Caixa | 18 × 18px, raio `--lc-radius-sm` (6px) |
| Borda | 2px `--lc-line-strong` |
| Hover | borda vira `--lc-accent` |
| Marcado | fundo e borda `--lc-text`, glifo `check` em `--lc-panel` |
| Indeterminado | igual ao marcado, com o glifo `remove` |
| Glifo | Material Symbols 14px, `wght 700` |
| Press | `scale(0.93)` |
| Foco | anel `--lc-focus-ring` na caixa |
| Gap rótulo | 8px |

Segue a mesma regra de cor do `Switch`: **binário ligado = `--lc-text`**, o
amarelo fica reservado ao hover e à seleção entre opções.

## Acessibilidade

- Usa `<input type="checkbox">` nativo, visualmente oculto mas focável: teclado,
  `:checked`, `:indeterminate` e envio de formulário funcionam de graça.
- Tudo dentro de um `<label>` — clicar no texto alterna.
- `indeterminate` é aplicado via DOM (não existe como atributo HTML) e é lido
  como "parcialmente marcado".
- Sem `label`, passe `aria-label`.

## Props

| Prop | Tipo | Padrão |
|---|---|---|
| `checked` | `boolean` | — |
| `onChange` | `(checked: boolean) => void` | — |
| `label` | `ReactNode` | — |
| `indeterminate` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |

Mais os atributos nativos de `<input>` (`name`, `value`, `required`…).

## Uso

```tsx
<Checkbox label="Mostrar grade" checked={grid} onChange={setGrid} />
<Checkbox label="Todas" checked={all} indeterminate={some} onChange={toggleAll} />
```
