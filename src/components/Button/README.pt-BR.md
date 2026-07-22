# Button

O controle mais frequente do sistema. Três variantes, e **um** estado ativo
compartilhado por todas: amarelo `--lc-accent`.

## Variantes

| Variante | Aparência | Onde usar |
|---|---|---|
| `solid` | superfície branca, raio 10px, hover cinza | **Padrão.** Barra de ferramentas, dock, ações de painel |
| `pill` | contorno 1.5px, raio 30px, **hover amarelo cheio** | Ações de menu/sidebar, chamada principal |
| `ghost` | sem fundo até o hover | Ações discretas dentro de um painel já denso |

Regra de ouro: `pill` chama atenção no hover (fica amarelo inteiro), `solid` só
esquenta um tom. Não misture as duas na mesma fileira.

## Regras visuais

| Regra | Valor |
|---|---|
| Altura | `sm` 30px · `md` **36px** · `lg` 38px |
| Padding | `0 14px` (`sm` 12px, `lg` 16px) |
| Raio | 10px (`pill`: 30px) |
| Fonte | Outfit 13px / 500 (ativo: 600) |
| Gap interno | 6px entre ícone e texto |
| Hover | `--lc-hover` (solid/ghost) · `--lc-accent` (pill) |
| Ativo | fundo `--lc-accent`, texto `--lc-accent-ink`, peso 600 |
| Press | `transform: scale(0.96)` em 0.12s |
| Foco | anel `0 0 0 2px var(--lc-accent)` |
| Desabilitado | `opacity: 0.35`, sem press, `cursor: not-allowed` |

### Transição

Todas as propriedades de cor animam em `0.16s cubic-bezier(0.4,0,0.2,1)`;
o `transform` do press em `0.12s`. Cor lenta + press rápido é o que dá a
sensação de "clique firme" sem parecer travado.

## Estados especiais

**`active`** — o botão representa uma escolha ligada (ferramenta selecionada,
modo atual). Renderiza `aria-pressed`.

**`hot`** — realce azul `--lc-info` enquanto o usuário segura um modificador
(Shift/Alt/Cmd) que arma temporariamente aquela ferramenta. É deliberadamente
**diferente** do amarelo: amarelo = escolhido, azul = armado só enquanto a
tecla estiver pressionada. Veja a demo (segure Shift).

## Só ícone

Botão sem texto **não** é uma variante do `Button` — é o componente
[`IconButton`](#/c/icon-button). Ele trava a largura na altura, zera o padding,
usa `press: 0.93` (mais forte, porque o alvo é menor) e **exige `label`**, que
vira `aria-label` e `title`. Um botão de ícone sem nome acessível é invisível
para leitor de tela, e separar o componente é o que torna esse erro impossível.

```tsx
<IconButton icon="undo" label="Desfazer" />
<IconButton icon="add" label="Adicionar" variant="pill" round />
<IconButton icon="palette" label="Paleta" active />
```

Todas as props do `Button` valem: `variant`, `size`, `active`, `hot`, `disabled`.

## Ícone com texto

Componha `<Icon>` como filho. O ícone herda `currentColor`, então funciona
sozinho no estado ativo. Use `size="sm"` (16px) dentro de botões com texto e
`size="md"` (20px) em botões só de ícone (aí prefira `IconButton`).

## Atalhos

`kbd="c"` desenha o badge no fim do rótulo **e** declara `aria-keyshortcuts`.
Registrar o listener continua sendo responsabilidade do app.

## Acessibilidade

- `type="button"` por padrão — não submete formulário por acidente.
- `active` vira `aria-pressed`, lido como "pressionado".
- Botão só com ícone precisa de `aria-label` (use `IconButton`).
- Foco visível nunca é removido: o anel amarelo passa em ambos os temas.

## Props

| Prop | Tipo | Padrão |
|---|---|---|
| `variant` | `"solid" \| "pill" \| "ghost"` | `"solid"` |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` |
| `active` | `boolean` | `false` |
| `hot` | `boolean` | `false` |
| `kbd` | `string` | — |

Mais todos os atributos nativos de `<button>`.

## Uso

```tsx
<Button onClick={save}>Salvar</Button>
<Button variant="pill"><Icon name="add" size="sm" />Nova paleta</Button>
<Button active={tool === "draw"} onClick={() => setTool("draw")}>Desenhar</Button>
<Button kbd="c" onClick={clear}>Limpar</Button>
```
