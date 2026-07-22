# Kbd

Badge de atalho de teclado. Aparece **dentro** do rótulo do controle que ele
aciona — nunca numa legenda separada. É o que torna o app aprendível sem
tutorial: você lê o botão e já leva a tecla junto.

## Regras visuais

| Regra | Valor |
|---|---|
| Tamanho | `1.35em` × `1.35em` — relativo à fonte ao redor |
| Fonte | mono, `0.82em`, `600`, maiúscula |
| Raio | `--lc-radius-xs` (4px) |
| Fundo | `color-mix(var(--lc-line) 45%, transparent)` |
| Opacidade | `0.75` (some no fundo, aparece quando procurado) |
| Margem | `6px` à esquerda do texto |

Por ser dimensionado em `em`, o mesmo componente funciona num rótulo de 11px e
num título de 20px sem ajuste.

Dentro de um botão em `hover` ou `active` (fundo amarelo), o badge troca para
`currentColor` a 18% — mantém contraste sem virar um segundo destaque.

## Acessibilidade

- É `aria-hidden` na prática quando o atalho já está no `title`/`aria-keyshortcuts`
  do controle pai. Prefira declarar `aria-keyshortcuts="m"` no botão.
- Não é foco de tab: é rótulo, não controle.

## Uso

```tsx
<Button kbd="m">Modo</Button>

<span>Limpar <Kbd>c</Kbd></span>
```

## Quando NÃO usar

Em telas touch, ou para atalhos que só existem numa plataforma. O badge promete
que a tecla funciona — se não funciona, não mostre.
