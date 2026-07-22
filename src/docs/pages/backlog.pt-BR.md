# O que falta criar

Os 23 componentes existentes vieram dos seus repositórios. Esta lista é o que
um design system completo normalmente tem e **os seus projetos nunca
precisaram** — porque são quatro ferramentas de canvas, não aplicativos de
formulário e conteúdo.

Nada aqui foi construído. Cada item traz o que já está decidido pela linguagem
existente e **a pergunta que só você responde**. Responda as que interessam e
eu construo.

---

## Já criados por mim — confirme o desenho

Estes dois eu criei porque a lacuna era grande demais para ignorar. Estão
marcados como **NOVO** na navegação.

### Checkbox

Nenhum dos quatro repositórios tem checkbox: todos usam `Switch`, inclusive
para o que seria seleção múltipla.

Desenhei: quadrado de 18px, raio 6, borda 2px `--lc-line-strong`, marcado =
preenchido com `--lc-text` e glifo `check` em `--lc-panel`, hover amarelo.

**Pergunta:** o preenchimento marcado deve ser escuro (`--lc-text`, como
desenhei, coerente com o `Switch`) ou amarelo (`--lc-accent`, coerente com o
`Button` ativo)?

### RadioGroup

O que o grid-gen-2 chama de "radio button" (o controle *Animate*) é, na
verdade, um `Segmented` de ícones em pílula — já está coberto. O radio clássico
não existia.

Desenhei: círculo de 18px, ponto interno de 8px que cresce com `scale(0→1)`.

**Pergunta:** o `hint` (segunda linha em `--lc-muted`) resolve seu caso, ou
você precisa de opções com miniatura/preview visual?

---

## Estrutura e navegação

### Modal / Dialog

Não existe em nenhum projeto — tudo é painel flutuante não-modal, o que é
correto para ferramentas de canvas. Mas confirmação destrutiva ("apagar esta
paleta?") hoje não tem onde morar.

Já decidido pela linguagem: vidro `--lc-glass` + blur, raio 20px, sombra
`--lc-shadow-panel`, `<dialog>` nativo (foco preso e `Esc` de graça).

**Perguntas:** overlay escurecido atrás ou só o blur do vidro? Entra com fade
+ escala, ou deslizando de baixo (como o `Toast`)?

### Popover / Menu de contexto

O `Select` já tem a mecânica inteira: portal, posicionamento com inversão,
fechar ao rolar. Falta generalizar num `Popover` reutilizável (botão direito no
canvas, menu de "mais ações").

**Perguntas:** precisa de submenus? Precisa aparecer na posição do cursor
(botão direito) ou sempre ancorado a um elemento?

### Card

Você tem `Panel`, que resolve painel de controles. Falta o card de **conteúdo**
— miniatura de projeto, item de galeria, snapshot de histórico (o
`.snap-item` do grid_connect é quase isso).

Já decidido: `--lc-surface`, raio 12–15px, hover com borda `--lc-accent`.

**Perguntas:** o card inteiro é clicável, ou tem ações internas (excluir,
duplicar) reveladas no hover, como o `Badge corner`?

### Breadcrumb / Pagination

Só fazem sentido em app com navegação hierárquica ou listas longas. Nenhum dos
quatro tem.

**Pergunta:** algum projeto novo vai ter listas paginadas? Se não, é YAGNI —
deixe fora.

---

## Entrada de dados

### Textarea

Trivial a partir do `TextField` (mesma caixa, `min-height`, `resize: vertical`).
Não construí porque nenhum projeto tem campo de texto longo.

**Pergunta:** precisa de contador de caracteres?

### Combobox com busca

O `Select` atual não filtra. Com mais de ~15 opções (fontes, presets, formas)
ele fica ruim.

**Pergunta:** a busca filtra localmente, ou precisa carregar de forma assíncrona?

### Date / Time

Nenhum projeto tem data. Se precisar, a resposta preguiçosa é
`<input type="date">` estilizado com os tokens — nativo, acessível, zero
dependência.

**Pergunta:** precisa de faixa de datas, ou uma data só resolve?

---

## Retorno e estado

### Progress / Spinner

O `Badge pill` já cobre progresso em texto ("Exportando 42%") e é o que os seus
projetos usam. Falta a barra e o indeterminado.

Já decidido: preenchimento `--lc-text` sobre trilho `--lc-line`, 16px, raio
total — igual ao `Slider variant="track"`.

**Perguntas:** barra linear, ou anel circular em volta do botão que disparou a
ação? Para o indeterminado: pulsa ou percorre?

### Skeleton

Só faz sentido com carregamento remoto. Seus projetos são todos locais.

**Pergunta:** algum projeto novo carrega dados de rede?

### Alert / Banner

`Toast` cobre o efêmero. Falta a mensagem **persistente** ("modo de exportação
ativo", "arquivo não salvo").

Já decidido: os tons `danger`/`success`/`info` já existem em `tokens.json`.

**Perguntas:** onde ele vive — fixado no topo, ou embutido no fluxo do painel?
É dispensável pelo usuário?

### Empty state

Tela vazia, busca sem resultado. Combina `.lc-dots` + `Icon xl` + texto
`--lc-muted` + um `Button pill`.

**Pergunta:** quer uma ilustração própria (as animações de traço do
`App.css` do grid-gen-2 são ótimas para isso) ou basta um ícone?

---

## Dados

### Table

Nenhum projeto tem tabela. Se precisar, as regras já estão dadas: cabeçalho em
`.lc-overline`, linhas separadas por `Divider full`, hover `--lc-hover`,
**números em mono com `tabular-nums`**.

**Perguntas:** precisa de ordenação por coluna? Seleção de linhas? Coluna fixa?

### Avatar / Tag / Chip

`Badge` cobre marcador pequeno. Falta o chip removível (filtro aplicado) e o
avatar (só faz sentido com múltiplos usuários).

**Pergunta:** algum projeto novo tem contas ou colaboração? Se não, corte o
avatar.

---

## Recomendação

Se eu tivesse que escolher **três** para construir agora, na ordem:

1. **Modal/Dialog** — é a única lacuna que hoje força uma gambiarra
   (`window.confirm`) em ação destrutiva.
2. **Popover** — a mecânica já está pronta dentro do `Select`; extrair custa
   pouco e destrava menu de contexto no canvas.
3. **Progress** — exportação de vídeo/sequência é lenta o bastante para exigir
   mais que uma pílula de texto.

O resto espera até um projeto real pedir. Componente construído "para depois"
envelhece sem nunca ter sido usado — e aí alguém precisa decidir se conserta ou
apaga.
