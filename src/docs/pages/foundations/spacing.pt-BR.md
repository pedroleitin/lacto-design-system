Espaçamentos em passos de 2px até 24px. Nada de escala geométrica: a interface é
densa e precisa de valores intermediários (6, 9, 14, 18).

## Espaçamento

<!-- widget:space-scale -->

## Raio

<!-- widget:radius-grid -->

## Onde cada raio vive

- `xs` 4px — badge accent, atalho de teclado
- `sm` 6px — amostra de cor, miniatura pequena
- `md` 8px — tooltip, dropzone, miniatura
- `lg` 10px — **botão, campo, select**
- `xl`–`2xl` 12–14px — segmented accent, menu
- `3xl` 15px — sidebar, painel sólido
- `4xl` 20px — painel de vidro, toast
- `pill` 30px — botão contornado
- `full` — switch, slider, aba, badge

## Raio aninhado

Um filho encaixado no padding do pai precisa de um raio **menor**, ou as duas
curvas ficam paralelas em vez de concêntricas e a folga entre elas engorda nos
cantos. A regra é aritmética, não gosto:

```
raio interno = raio externo − padding
```

<!-- widget:nested-radius -->

Use o utilitário `.lc-nested`. O pai declara o próprio raio e padding uma vez;
custom properties herdam, então o filho só precisa da classe:

```css
.dock {
  --lc-r: var(--lc-radius-4xl);   /* 20px */
  --lc-p: var(--lc-space-5);      /* 10px */
  border-radius: var(--lc-r);
  padding: var(--lc-p);
}
```

```tsx
<Panel className="dock">
  <Button className="lc-nested">Desfazer</Button>
</Panel>
```

O `.lc-nested` calcula `max(0px, calc(var(--lc-r) - var(--lc-p)))` — o `max`
trava em zero quando o padding passa do raio. O `Panel` já publica `--lc-r` e
`--lc-p`, então um filho aninhado dentro de um painel padrão funciona sem
nenhum ajuste.

**Quando o padding é diferente em cada eixo, use o menor** — é o lado onde as
curvas chegam mais perto.

### O que já obedece

A regra não foi inventada aqui; ela já estava nos projetos de origem, sem estar
escrita. Escrevê-la é o que a torna reutilizável:

| Contêiner | Raio | Padding | Filho | |
|---|---|---|---|---|
| Trilho do `Segmented` | 10px | 3px | opção **7px** | ✓ |
| Menu do `Select` | 14px | 6px | item **8px** | ✓ |
| Dock (`Panel`) | 20px | 10px | botão **10px** | ✓ |
| Trilho do `Tabs` | total | 5px | aba **total** | ✓ |
| `Sidebar` | 15px | 0 | linhas de borda a borda | ✓ |

Raio total continua total: uma pílula dentro de outra não precisa de correção,
porque a curva já é a maior que a caixa permite.

> O item do menu do `Select` era 9px. Agora é 8px — a regra já era quase
> verdadeira, e torná-la verdadeira sai mais barato que documentar a exceção.

### Quando não vale

- O filho não encosta na caixa de padding (um badge flutuante, uma sobreposição
  posicionada em absoluto).
- O filho é de borda a borda, sem folga — aí ele herda o raio do pai nos cantos
  que toca, como fazem as linhas da `Sidebar`.
- O pai não tem raio. Zero menos qualquer coisa continua zero.

## Margem e padding

O Lacto quase não usa `margin`. O espaço entre irmãos vem de `gap` no contêiner;
o espaço interno vem de `padding` no próprio componente. Margem só aparece onde
um elemento precisa se descolar de uma borda que ele não controla — a folga de
10px da `Sidebar`, e os divisores.

> **Padding é do componente. Gap é do contêiner. Margem é exceção.**

### Padding por componente

| Onde | Padding | Por quê |
|---|---|---|
| `Button` md | `0 14px` | altura fixa em 36px; só o horizontal é padding |
| `Button` sm / lg | `0 12px` / `0 16px` | acompanha a altura |
| `TextField` | `0 12px` | alinha o texto com o do botão ao lado |
| `Select` item | `7px 16px` | alvo confortável dentro do menu |
| `Panel` | `16px 18px` | horizontal maior: compensa o raio de 20px |
| Linha de sidebar | `12px 20px` | `Switch` e `Segmented` com `label` já trazem |
| `Accordion` cabeçalho | `14px 16px` | alvo alto, a linha inteira é clicável |
| `Accordion` corpo | `0 16px 24px` | o inferior é maior para separar do divisor |
| `Slider` bar | `0 15px` | texto dentro da pílula, longe do raio |
| `Tooltip` | `5px 9px` | compacto: é rótulo, não conteúdo |
| `Toast` | `10px 18px` | respira mais: fica sozinho na tela |
| Trilho do `Segmented` | `3px` | a moldura fina que revela o segmento ativo |

Regra por trás dos números: **o padding horizontal é sempre maior que o
vertical**, e quanto maior o raio, maior o horizontal — num canto de 20px, 16px
de padding lateral já encostam na curva.

### Gap entre irmãos

| Situação | Gap |
|---|---|
| Ícone e texto dentro de um botão | `6px` |
| Botões numa barra de ferramentas | `6px` |
| Botões de ação (rodapé, formulário) | `8px` |
| **Sliders empilhados** | `9px` |
| Amostras de cor | `6px` |
| Itens de menu do `Select` | `2px` |
| Controles dentro de um `Accordion` | `20px` |
| Colunas de um painel largo | `18px` |

### As duas margens que existem

- **10px** (`--lc-space-5`) — folga em relação à borda da janela, para **tudo**:
  `Sidebar` e qualquer `Panel` ancorado. Um valor só, para duas caixas
  flutuantes na mesma tela se alinharem.
- **2px** — `Divider` vertical dentro de uma barra

O `Panel` ancorado ficava a 14px nas laterais e 16px embaixo, herdado de outro
repositório de origem. Duas convenções de folga numa tela só é desalinhamento
visível, então o sistema passou a ter uma.

Ligue as guias abaixo e passe o mouse: cada elemento mostra sua caixa, o padding
de cada lado e o raio. O mesmo interruptor existe no exemplo de todo componente.

<!-- widget:anatomy -->

## Alturas de controle

**36px é a altura canônica.** Botão, select e campo numérico compartilham ela
para que qualquer fileira de controles se alinhe sem ajuste.

<!-- widget:control-sizes -->
