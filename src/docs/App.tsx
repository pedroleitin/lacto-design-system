import { useEffect, useRef, useState, type ReactNode } from "react";
import { marked } from "marked";
import "../styles/base.css";
import "./docs.css";

import {
  COMPONENTS, FOUNDATIONS, GROUPS, HOME, BACKLOG,
  type Bilingual, type Entry,
} from "./registry";
import { WIDGETS, GuideLegend } from "./pages/Foundations";
import { useBoxGuides } from "./BoxGuides";
import { LANGS, readLang, writeLang, t, type Lang } from "./i18n";

import { Tooltip } from "../components/Tooltip/Tooltip";
import { IconButton } from "../components/IconButton/IconButton";
import { Badge } from "../components/Badge/Badge";
import { Segmented } from "../components/Segmented/Segmented";
import { Switch } from "../components/Switch/Switch";

/** Roteador de hash. 20 linhas em vez de uma dependência. */
function useHashRoute() {
  const read = () => window.location.hash.slice(1) || "/";
  const [route, setRoute] = useState(read);
  useEffect(() => {
    const on = () => {
      setRoute(read());
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  return route;
}

function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">(
    () => (localStorage.getItem("lacto-theme") as "light" | "dark") ?? "light",
  );
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("lacto-theme", theme);
  }, [theme]);
  return { theme, setTheme };
}

function Markdown({ source }: { source: string }) {
  return (
    <div
      className="doc__md"
      dangerouslySetInnerHTML={{ __html: marked.parse(source, { async: false }) }}
    />
  );
}

/**
 * Markdown com widgets interativos costurados nos marcadores
 * `<!-- widget:nome -->`. É o que permite manter todo o texto corrido em .md
 * (um arquivo por idioma) sem perder as partes interativas.
 */
function Content({ source, lang }: { source: string; lang: Lang }) {
  // O split com grupo de captura alterna: [markdown, nome, markdown, nome, …]
  const parts = source.split(/^<!--\s*widget:([\w-]+)\s*-->$/m);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <div key={i}>{WIDGETS[part]?.(lang) ?? null}</div>
        ) : part.trim() ? (
          <Markdown key={i} source={part} />
        ) : null,
      )}
    </>
  );
}

function ComponentPage({ entry, lang }: { entry: Entry; lang: Lang }) {
  const [dots, setDots] = useState("dots");
  const [guides, setGuides] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const overlay = useBoxGuides(guides, stageRef);
  const { Demo } = entry;

  return (
    <>
      <div className="doc__stage-bar">
        <span className="lc-overline">{t(lang, "interactiveExample")}</span>
        <span style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span className="lc-overline">{t(lang, "guides")}</span>
            <Switch aria-label={t(lang, "guides")} checked={guides} onChange={setGuides} size="sm" />
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span className="lc-overline">{t(lang, "background")}</span>
            <Segmented
              aria-label={t(lang, "background")}
              value={dots}
              onChange={setDots}
              options={[
                { value: "dots", label: t(lang, "dots") },
                { value: "plain", label: t(lang, "plain") },
              ]}
            />
          </span>
        </span>
      </div>

      {guides ? <GuideLegend lang={lang} /> : null}

      <div
        ref={stageRef}
        className={`doc__stage${dots === "dots" ? " lc-dots" : ""}${guides ? " doc__stage--guides" : ""}`}
      >
        <Demo />
      </div>
      {overlay}
      <Markdown source={entry.md[lang]} />
    </>
  );
}

function NavLink({ href, label, active, badge }: {
  href: string; label: string; active: boolean; badge?: ReactNode;
}) {
  return (
    <a href={href} className={`doc__link${active ? " is-active" : ""}`}>
      {label}
      {badge}
    </a>
  );
}

export default function App() {
  const route = useHashRoute();
  const { theme, setTheme } = useTheme();
  const [lang, setLang] = useState<Lang>(readLang);

  useEffect(() => writeLang(lang), [lang]);

  const component = COMPONENTS.find((c) => route === `/c/${c.slug}`);
  const foundation = FOUNDATIONS.find((f) => route === `/f/${f.slug}`);

  const page = (md: Bilingual) => <Content source={md[lang]} lang={lang} />;

  let title = "Lacto";
  let body: ReactNode = page(HOME);

  if (component) {
    title = component.name;
    body = <ComponentPage entry={component} lang={lang} />;
  } else if (foundation) {
    title = t(lang, foundation.key);
    body = page(foundation.md);
  } else if (route === "/backlog") {
    title = t(lang, "backlog");
    body = page(BACKLOG);
  }

  return (
    <div className="doc">
      <Tooltip />

      <nav className="doc__nav lc-scroll">
        <div className="doc__brand">
          <a href="#/" className="doc__logo">Lacto</a>
          <IconButton
            round
            size="sm"
            iconSize="sm"
            icon={theme === "dark" ? "light_mode" : "dark_mode"}
            label={theme === "dark" ? t(lang, "lightTheme") : t(lang, "darkTheme")}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          />
        </div>

        <div className="doc__lang">
          <Segmented
            aria-label={t(lang, "language")}
            value={lang}
            onChange={setLang}
            options={LANGS.map((l) => ({ value: l, label: l === "en" ? "EN" : "PT" }))}
          />
        </div>

        <NavLink href="#/" label={t(lang, "overview")} active={route === "/"} />
        <NavLink href="#/backlog" label={t(lang, "backlog")} active={route === "/backlog"} />

        <p className="doc__group lc-overline">{t(lang, "foundations")}</p>
        {FOUNDATIONS.map((f) => (
          <NavLink
            key={f.slug}
            href={`#/f/${f.slug}`}
            label={t(lang, f.key)}
            active={route === `/f/${f.slug}`}
          />
        ))}

        {GROUPS.map((g) => (
          <div key={g}>
            <p className="doc__group lc-overline">{t(lang, g)}</p>
            {COMPONENTS.filter((c) => c.group === g).map((c) => (
              <NavLink
                key={c.slug}
                href={`#/c/${c.slug}`}
                label={c.name}
                active={route === `/c/${c.slug}`}
                badge={c.isNew ? <Badge tone="accent">{t(lang, "new")}</Badge> : undefined}
              />
            ))}
          </div>
        ))}
      </nav>

      <main className="doc__main">
        <h1 className="doc__title">{title}</h1>
        {body}
      </main>
    </div>
  );
}
