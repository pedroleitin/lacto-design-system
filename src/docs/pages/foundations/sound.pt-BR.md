Som generativo de interface: **Web Audio** puro — osciladores e envelopes, sem
biblioteca externa e **sem nenhum arquivo de áudio para carregar**. Portado do
`features/audio.ts` do SVG_DRAW, que por sua vez espelha o Grid-o-matic.

> **Começa mudo.** Som que toca sem ser pedido é hostil, e o navegador
> bloquearia o primeiro de qualquer forma — não há gesto do usuário antes do
> primeiro clique. A preferência fica no `localStorage`, igual ao tema.

## Experimente

<!-- widget:sound-player -->

## Os oito sons

| Som | Forma | Para |
|---|---|---|
| `note(index)` | senoide, 0.3s, vol 0.12 | algo foi **criado** — uma célula colocada, um item adicionado |
| `erase()` | senoide, 0.12s, 600 → 300 Hz | algo foi **removido** |
| `toggle(on)` | senoide, 0.09s, 660 → 990 / 440 | um **binário** virou — `Switch`, `Checkbox` |
| `select()` | triangular, 0.06s, 1046 Hz | uma **opção** foi escolhida — `Segmented`, `Tabs`, `Select` |
| `reveal(open)` | senoide, 0.14s, 420 ↔ 700 Hz | uma seção **abriu ou fechou** — `Accordion`, `Select`, `Panel` |
| `success()` | duas triangulares, 659 → 988 Hz | a operação **terminou** |
| `error()` | duas quadradas, 311 → 233 Hz | a operação **falhou** |
| `theme(toDark)` | duas triangulares, 0.18s + 0.22s | o tema virou: **sobe** para o escuro, **desce** para o claro |

Oito sons, e a gramática por trás deles cabe numa linha: **subir cria e
confirma, descer remove e falha.** `note`, `toggle(true)`, `reveal(true)`,
`success` e `theme(true)` sobem; `erase`, `toggle(false)`, `reveal(false)`,
`error` e `theme(false)` descem. Ninguém precisa aprender isso — direção é a
única coisa que a audição informa sem treino.

O volume é o segundo eixo, e codifica **com que frequência o evento acontece**:
`select` em 0.06 e `reveal` em 0.05 são quase inaudíveis porque disparam o
tempo todo; `success` em 0.18 e `theme` em 0.26 são os mais altos porque são
raros e merecem um ponto final. Um evento que acontece a cada segundo não pode
soar como um anúncio.

`error` é o único no registro grave, em onda quadrada: some no fundo do
espectro em vez de brigar por atenção como um alarme. Falha deve ser percebida,
não gritada.

`note` é afinada: o índice escolhe um grau de uma escala de duas oitavas,
próxima de dó maior. Passar a coordenada da célula (`col + row`) faz o desenho
virar algo musical em vez de um bipe repetido. É essa a ideia toda — o som
informa *onde*, não só *que aconteceu*.

## Uso

```tsx
const { muted, setMuted, note, erase, toggle, select, reveal,
        success, error, theme } = useSound();

// no canvas
onPlace={(col, row) => note(col + row)}
onErase={() => erase()}

// em outros lugares
onToggle={(on) => toggle(on)}
onPick={() => select()}
onExported={() => success()}
onFailed={() => error()}

// no botão de tema
const toggle = () => {
  const dark = next === "dark";
  setTheme(next);
  theme(dark);
};
```

### O botão de mudo

Não existe componente `SoundToggle` — é um `IconButton`, e criar um componente
para uma composição só seria uma abstração a mais do que o necessário:

```tsx
<IconButton
  round
  icon={muted ? "volume_off" : "volume_up"}
  label={muted ? "Ligar o som" : "Desligar o som"}
  onClick={() => {
    setMuted(!muted);
    if (muted) note(9);   // nota de confirmação ao religar
  }}
/>
```

A nota de confirmação importa: sem ela, ligar o som é a única ação do app sem
retorno nenhum.

O lugar dele é a caixa de chrome no canto superior direito, à esquerda do botão
de tema — os dois são o mesmo tipo de controle.

## Por que os valores não estão em `tokens.json`

Eles não são propriedades CSS. Uma custom property não guarda uma escala de
frequências de forma útil, e ter o mesmo número em dois lugares é pior do que
tê-lo num só. `src/sound/audio.ts` é a fonte para o som.

## Um motor por página

O `useSound` compartilha um único `SoundEngine` no nível do módulo, então todo
componente que chama o hook usa o mesmo `AudioContext`. Abrir um contexto por
componente estouraria o limite do navegador em poucas dezenas.

O contexto é criado **sob demanda** e resumido no primeiro uso real — que sempre
acontece dentro de um clique, satisfazendo a política de autoplay. Se o
navegador recusar, todos os métodos silenciosamente não fazem nada; o som nunca
lança erro e nunca trava uma ação da interface.

## Acessibilidade

- O som é **sempre** redundante. Todo evento que toca um também tem uma mudança
  visível — nunca use áudio como sinal único.
- Mudo é o padrão, e a preferência persiste.
- Os volumes são baixos (0.1–0.26) e as durações curtas (0.12–0.3s): isto é
  pontuação, não trilha sonora.
- Nenhum componente toca som sozinho. `Button`, `Switch` e os demais são
  silenciosos — o app decide o que merece ser ouvido. Um design system que
  bipasse a cada clique seria insuportável em um minuto.
