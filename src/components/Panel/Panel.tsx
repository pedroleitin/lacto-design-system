import "./panel.css";

export type PanelAnchor =
  | "top-left" | "top-right" | "top-center"
  | "bottom-left" | "bottom-right" | "bottom-center";

export interface PanelProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  variant?: "glass" | "solid";
  /** Título em estilo overline no topo do painel. */
  title?: React.ReactNode;
  /** Posiciona o painel flutuando sobre a tela. */
  anchor?: PanelAnchor;
  /** Sem padding interno — para painéis que gerenciam o próprio espaçamento. */
  flush?: boolean;
}

export function Panel({
  variant = "glass",
  title,
  anchor,
  flush = false,
  className = "",
  children,
  ...rest
}: PanelProps) {
  const cls = [
    "lc-panel",
    `lc-panel--${variant}`,
    flush && "lc-panel--flush",
    anchor && `lc-panel--float lc-panel--${anchor}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cls} {...rest}>
      {title ? <h2 className="lc-panel__title lc-overline">{title}</h2> : null}
      {children}
    </div>
  );
}
