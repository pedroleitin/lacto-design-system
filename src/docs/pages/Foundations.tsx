/** Widgets das páginas de fundamentos.
 *
 *  O texto corrido vive em markdown (um arquivo por idioma); aqui ficam só as
 *  partes que precisam ler `tokens.json` ou ser interativas. O markdown chama
 *  cada uma por um marcador `<!-- widget:nome -->`.
 *
 *  Consequência prática: traduzir uma página é traduzir um .md, nunca mexer
 *  neste arquivo. */
import { useRef, useState, type ReactNode } from "react";
import tokens from "../../../tokens.json";
import { Icon, type IconSize } from "../../components/Icon/Icon";
import { Button } from "../../components/Button/Button";
import { Switch } from "../../components/Switch/Switch";
import { Slider } from "../../components/Slider/Slider";
import { Panel } from "../../components/Panel/Panel";
import { useBoxGuides } from "../BoxGuides";
import { type Lang, t } from "../i18n";

type ColorToken = { light: string; dark: string; use: string; "use-pt-BR": string };

const clean = (o: object) => Object.entries(o).filter(([k]) => !k.startsWith("_"));

/* ── Cores ──────────────────────────────────────────────────────────────── */
function ColorGrid({ lang }: { lang: Lang }) {
  const entries = clean(tokens.color).filter(
    ([, v]) => v && typeof v === "object",
  ) as [string, ColorToken][];

  return (
    <div className="doc__grid">
      {entries.map(([name, tok]) => (
        <div key={name} className="doc__chip">
          <div className="doc__chip-swatch" style={{ background: `var(--lc-${name})` }} />
          <div className="doc__chip-body">
            <span className="doc__chip-name">--lc-{name}</span>
            <span className="doc__chip-val">{tok.light}</span>
            <span className="doc__chip-val">{tok.dark} · {t(lang, "dark")}</span>
            <span className="doc__chip-use">{lang === "pt-BR" ? tok["use-pt-BR"] : tok.use}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

const DotsPreview = () => (
  <div
    className="lc-dots"
    style={{ height: 140, borderRadius: 20, border: "1px solid var(--lc-line)", margin: "16px 0 32px" }}
  />
);

/* ── Tipografia ─────────────────────────────────────────────────────────── */
function FontSamples({ lang }: { lang: Lang }) {
  return (
    <div style={{ display: "grid", gap: 20, margin: "0 0 32px" }}>
      <div>
        <div className="doc__chip-val" style={{ marginBottom: 6 }}>--lc-font-sans · Outfit</div>
        <div style={{ fontFamily: "var(--lc-font-sans)", fontSize: 30 }}>
          {t(lang, "sansSample")}
        </div>
      </div>
      <div>
        <div className="doc__chip-val" style={{ marginBottom: 6 }}>--lc-font-mono · Ubuntu Mono</div>
        <div style={{ fontFamily: "var(--lc-font-mono)", fontSize: 30 }}>
          #FFC800 · 1024×768 · 42.5%
        </div>
      </div>
    </div>
  );
}

function TypeScale({ lang }: { lang: Lang }) {
  return (
    <div style={{ marginBottom: 32 }}>
      {clean(tokens["font-size"]).map(([k, v]) => (
        <div key={k} className="doc__row">
          <span className="doc__row-key">--lc-text-{k}</span>
          <span className="doc__row-val">{v as string}</span>
          <span style={{ fontSize: v as string, lineHeight: 1.2 }}>{t(lang, "pangram")}</span>
        </div>
      ))}
    </div>
  );
}

const OverlineSample = () => (
  <p className="lc-overline" style={{ margin: "12px 0 32px" }}>OVERLINE</p>
);

/* ── Espaçamento ────────────────────────────────────────────────────────── */
const SpaceScale = () => (
  <div style={{ marginBottom: 32 }}>
    {clean(tokens.space).map(([k, v]) => (
      <div key={k} className="doc__row">
        <span className="doc__row-key">--lc-space-{k}</span>
        <span className="doc__row-val">{v as string}</span>
        <span className="doc__bar" style={{ width: v as string }} />
      </div>
    ))}
  </div>
);

const RadiusGrid = () => (
  <div className="doc__grid" style={{ margin: "16px 0 32px" }}>
    {clean(tokens.radius).map(([k, v]) => (
      <div key={k} style={{ display: "grid", gap: 8, justifyItems: "center" }}>
        <div
          style={{
            width: "100%",
            height: 64,
            background: "var(--lc-surface)",
            border: "1px solid var(--lc-line)",
            borderRadius: v as string,
          }}
        />
        <span className="doc__chip-val">--lc-radius-{k} · {v as string}</span>
      </div>
    ))}
  </div>
);

const ControlSizes = () => (
  <div style={{ marginBottom: 32 }}>
    {clean(tokens.size).map(([k, v]) => (
      <div key={k} className="doc__row">
        <span className="doc__row-key">--lc-size-{k}</span>
        <span className="doc__row-val">{v as string}</span>
      </div>
    ))}
  </div>
);

/** Legenda de cores do inspetor — compartilhada com as páginas de componente. */
export function GuideLegend({ lang }: { lang: Lang }) {
  return (
    <div className="doc__legend">
      <span>
        <i style={{ background: "color-mix(in srgb, var(--lc-danger) 22%, transparent)" }} />
        {t(lang, "margin")}
      </span>
      <span>
        <i style={{ background: "transparent", outline: "1.5px solid var(--lc-accent)" }} />
        {t(lang, "borderRadius")}
      </span>
      <span>
        <i style={{ background: "color-mix(in srgb, var(--lc-info) 30%, transparent)" }} />
        {t(lang, "padding")}
      </span>
      <span>{t(lang, "hoverHint")}</span>
    </div>
  );
}

/** Palco pequeno com o mesmo inspetor de box model das páginas de componente. */
function Anatomy({ lang }: { lang: Lang }) {
  const [guides, setGuides] = useState(true);
  const [v, setV] = useState(60);
  const ref = useRef<HTMLDivElement>(null);
  const overlay = useBoxGuides(guides, ref);

  return (
    <div style={{ marginBottom: 32 }}>
      <div className="doc__stage-bar">
        <span className="lc-overline">{t(lang, "liveAnatomy")}</span>
        <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span className="lc-overline">{t(lang, "guides")}</span>
          <Switch aria-label={t(lang, "guides")} size="sm" checked={guides} onChange={setGuides} />
        </span>
      </div>

      {guides ? <GuideLegend lang={lang} /> : null}

      <div ref={ref} className={`doc__stage lc-dots${guides ? " doc__stage--guides" : ""}`}>
        <Panel variant="solid" flush style={{ width: 300, margin: "0 auto" }}>
          <div style={{ padding: "12px 20px", display: "grid", gap: 9 }}>
            <Slider label={t(lang, "density")} value={v} onChange={setV} />
          </div>
          <Switch label={t(lang, "guidesVisible")} checked onChange={() => {}} />
          <div style={{ display: "flex", gap: 8, padding: 16 }}>
            <Button style={{ flex: 1 }}>{t(lang, "apply")}</Button>
            <Button variant="pill" style={{ flex: 1 }}>{t(lang, "reset")}</Button>
          </div>
        </Panel>
      </div>
      {overlay}
    </div>
  );
}

/* ── Movimento ──────────────────────────────────────────────────────────── */
const MotionScale = () => (
  <div style={{ marginBottom: 32 }}>
    {clean(tokens.motion)
      .filter(([k, v]) => !k.startsWith("ease") && typeof v === "string")
      .map(([k, v]) => (
        <div key={k} className="doc__row">
          <span className="doc__row-key">--lc-motion-{k}</span>
          <span className="doc__row-val">{v as string}</span>
          <span className="doc__bar" style={{ width: `calc(${v as string} * 400)`, opacity: 0.5 }} />
        </div>
      ))}
  </div>
);

function MotionButtons({ lang }: { lang: Lang }) {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "12px 0 32px" }}>
      <Button>{t(lang, "hoverDemo")}</Button>
      <Button variant="pill">{t(lang, "pillDemo")}</Button>
      <Button active>{t(lang, "activeDemo")}</Button>
    </div>
  );
}

/* ── Ícones ─────────────────────────────────────────────────────────────── */
const IconSizes = () => (
  <div style={{ marginBottom: 32 }}>
    {clean(tokens["icon-size"]).map(([k, v]) => (
      <div key={k} className="doc__row">
        <span className="doc__row-key">--lc-icon-{k}</span>
        <span className="doc__row-val">{v as string}</span>
        <Icon name="palette" size={k as IconSize} />
      </div>
    ))}
  </div>
);

const IconTones = () => (
  <div style={{ display: "flex", gap: 16, margin: "12px 0 32px" }}>
    <Icon name="favorite" size="lg" />
    <Icon name="favorite" size="lg" tone="muted" />
    <Icon name="favorite" size="lg" tone="accent" filled />
    <Icon name="favorite" size="lg" tone="danger" filled />
  </div>
);

const CANONICAL = [
  "undo", "redo", "pan_tool", "fit_screen", "zoom_in", "zoom_out",
  "palette", "draw", "ink_eraser", "download", "upload", "settings",
  "dark_mode", "light_mode", "volume_up", "play_arrow", "pause", "close",
  "add", "delete", "content_copy", "expand_more", "chevron_right", "check",
  "casino", "grid_on", "shapes", "image", "movie", "search",
];

const IconSet = () => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(96px, 1fr))",
      gap: 12,
      margin: "16px 0 32px",
    }}
  >
    {CANONICAL.map((n) => (
      <div
        key={n}
        style={{
          display: "grid",
          justifyItems: "center",
          gap: 6,
          padding: "14px 6px",
          border: "1px solid var(--lc-line)",
          borderRadius: 12,
        }}
      >
        <Icon name={n} size="lg" />
        <code style={{ fontSize: 10, color: "var(--lc-muted)", textAlign: "center" }}>{n}</code>
      </div>
    ))}
  </div>
);

/* ── Tokens ─────────────────────────────────────────────────────────────── */
const TokensJson = () => (
  <pre className="doc__md" style={{ maxHeight: 520, overflow: "auto" }}>
    <code>{JSON.stringify(tokens, null, 2)}</code>
  </pre>
);

/** Marcador `<!-- widget:nome -->` no markdown → componente aqui. */
export const WIDGETS: Record<string, (lang: Lang) => ReactNode> = {
  "color-grid": (lang) => <ColorGrid lang={lang} />,
  "dots-preview": () => <DotsPreview />,
  "font-samples": (lang) => <FontSamples lang={lang} />,
  "type-scale": (lang) => <TypeScale lang={lang} />,
  "overline-sample": () => <OverlineSample />,
  "space-scale": () => <SpaceScale />,
  "radius-grid": () => <RadiusGrid />,
  "anatomy": (lang) => <Anatomy lang={lang} />,
  "control-sizes": () => <ControlSizes />,
  "motion-scale": () => <MotionScale />,
  "motion-buttons": (lang) => <MotionButtons lang={lang} />,
  "icon-sizes": () => <IconSizes />,
  "icon-tones": () => <IconTones />,
  "icon-set": () => <IconSet />,
  "tokens-json": () => <TokensJson />,
};
