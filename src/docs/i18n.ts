/** Idiomas do site. Inglês é o padrão; português é a versão extra.
 *
 *  Só existem aqui as poucas palavras do chrome do site e dos widgets. Todo
 *  texto corrido — README de componente, fundamentos, visão geral — vive em
 *  markdown, um arquivo por idioma. */

export type Lang = "en" | "pt-BR";

export const LANGS: Lang[] = ["en", "pt-BR"];

const STRINGS = {
  en: {
    overview: "Overview",
    backlog: "What's missing",
    foundations: "Foundations",
    new: "NEW",

    // grupos de componentes
    action: "Action",
    input: "Input",
    selection: "Selection",
    structure: "Structure",
    feedback: "Feedback",

    // páginas de fundamentos
    colors: "Colors",
    typography: "Typography",
    spacing: "Spacing & radius",
    motion: "Motion",
    icons: "Icons",
    tokens: "Tokens",

    // barra do palco
    interactiveExample: "Interactive example",
    liveAnatomy: "Live anatomy",
    guides: "Guides",
    background: "Background",
    dots: "Dots",
    plain: "Plain",

    // legenda do inspetor
    margin: "margin",
    borderRadius: "border + radius",
    padding: "padding",
    hoverHint: "hover any element on the stage",

    // chrome
    lightTheme: "Light theme",
    darkTheme: "Dark theme",
    language: "Language",
    dark: "dark",

    // amostras
    sansSample: "Generative 4×4 grid",
    pangram: "The quick brown fox",
    density: "Density",
    guidesVisible: "Guides visible",
    apply: "Apply",
    reset: "Reset",
    hoverDemo: "Hover 0.16s",
    pillDemo: "Pill: full yellow hover",
    activeDemo: "Active",
  },

  "pt-BR": {
    overview: "Visão geral",
    backlog: "O que falta criar",
    foundations: "Fundamentos",
    new: "NOVO",

    action: "Ação",
    input: "Entrada",
    selection: "Seleção",
    structure: "Estrutura",
    feedback: "Retorno",

    colors: "Cores",
    typography: "Tipografia",
    spacing: "Espaçamento e raio",
    motion: "Movimento",
    icons: "Ícones",
    tokens: "Tokens",

    interactiveExample: "Exemplo interativo",
    liveAnatomy: "Anatomia ao vivo",
    guides: "Guias",
    background: "Fundo",
    dots: "Pontos",
    plain: "Liso",

    margin: "margem",
    borderRadius: "borda + raio",
    padding: "padding",
    hoverHint: "passe o mouse sobre qualquer elemento do palco",

    lightTheme: "Tema claro",
    darkTheme: "Tema escuro",
    language: "Idioma",
    dark: "escuro",

    sansSample: "Grade generativa 4×4",
    pangram: "O rápido cão marrom",
    density: "Densidade",
    guidesVisible: "Guias visíveis",
    apply: "Aplicar",
    reset: "Resetar",
    hoverDemo: "Hover 0.16s",
    pillDemo: "Pill: hover amarelo cheio",
    activeDemo: "Ativo",
  },
} satisfies Record<Lang, Record<string, string>>;

export type StringKey = keyof (typeof STRINGS)["en"];

export const t = (lang: Lang, key: StringKey) => STRINGS[lang][key];

const KEY = "lacto-lang";

/** Idioma salvo, ou o padrão (inglês). */
export function readLang(): Lang {
  const saved = localStorage.getItem(KEY);
  return saved === "pt-BR" || saved === "en" ? saved : "en";
}

export function writeLang(lang: Lang) {
  localStorage.setItem(KEY, lang);
  document.documentElement.lang = lang;
}
