# Dropzone

Área que aceita arquivos por arrastar-e-soltar **e** por clique.

## Regras visuais

| Regra | Valor |
|---|---|
| Borda | **1.5px tracejada** `--lc-line` |
| Raio | 8px |
| Fundo | transparente |
| Texto | 12px `--lc-muted`, centralizado |
| Ícone | `upload` 24px |
| Dica | 10px a 70% de opacidade |
| Hover | borda `--lc-muted`, texto `--lc-text` |
| Arrastando | borda **sólida** `--lc-accent` + fundo `accent` a 10% |
| Transição | 0.12s (rápida — precisa acompanhar o cursor) |

### Tracejado vira sólido

O sinal de "pode soltar aqui" não é só a cor: a **borda troca de tracejada para
sólida**. Mudança de estilo de borda é perceptível na visão periférica e para
quem não distingue o amarelo do cinza — enquanto o arquivo está no ar, o
usuário não está olhando para a caixa, está olhando para o cursor.

## Variante `tile`

98 × 46px, ícone e texto lado a lado, borda de 1px. Ocupa exatamente **duas
peças** de uma fileira de miniaturas de 46px com `gap: 6px`. É sempre o
**último** item da fileira.

## Interação

- Clique abre o seletor nativo (`<input type="file">` oculto).
- Soltar arquivos dispara `onFiles`.
- Sem `multiple`, só o primeiro arquivo é passado adiante — mesmo se soltarem
  vários.
- O input é limpo após cada escolha, então selecionar o **mesmo arquivo** duas
  vezes seguidas dispara o evento nas duas.

## Acessibilidade

- É um `<button>` de verdade: focável, ativável por Enter/Espaço, anunciado
  como botão. Arrastar é um bônus, não o único caminho.
- O rótulo é o texto visível — diga o que se espera, não "Dropzone".
- `hint` fica dentro do botão, então também é anunciado: use-o para formatos e
  limite de tamanho.
- Valide tipo e tamanho em `onFiles` e reporte o erro fora do componente (um
  `Toast danger` ou uma mensagem próxima). O `accept` do seletor nativo **não**
  restringe o que pode ser solto.

## Props

| Prop | Tipo | Padrão |
|---|---|---|
| `onFiles` | `(files: File[]) => void` | — |
| `accept` | `string` | — |
| `multiple` | `boolean` | `false` |
| `label` | `ReactNode` | "Solte um arquivo…" |
| `hint` | `ReactNode` | — |
| `icon` | `string` | `"upload"` |
| `tile` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |

## Uso

```tsx
<Dropzone
  multiple accept="image/*,.svg"
  label="Solte imagens ou clique para procurar"
  hint="SVG, PNG ou JPG · até 5 MB"
  onFiles={(files) => files.forEach(load)}
/>

<Dropzone tile label="Enviar" onFiles={addShape} />
```
