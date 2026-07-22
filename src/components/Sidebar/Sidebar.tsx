import "./sidebar.css";
import { Divider } from "../Divider/Divider";

export interface SidebarProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  /** Cabeçalho fixo (normalmente o nome do app). */
  title?: React.ReactNode;
  /** Ação à direita do título, ex: alternar tema. */
  headerAction?: React.ReactNode;
  /** Ações fixadas no rodapé, fora da rolagem. */
  footer?: React.ReactNode;
  side?: "left" | "right";
  /** No fluxo do layout, em vez de fixa na janela. */
  inline?: boolean;
}

export function Sidebar({
  title,
  headerAction,
  footer,
  side = "left",
  inline = false,
  className = "",
  children,
  ...rest
}: SidebarProps) {
  return (
    <aside
      className={[
        "lc-sidebar",
        side === "right" && "lc-sidebar--right",
        inline && "lc-sidebar--inline",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {title ? (
        <>
          <div className="lc-sidebar__header">
            <span>{title}</span>
            {headerAction}
          </div>
          <Divider full />
        </>
      ) : null}

      <div className="lc-sidebar__body lc-scroll">{children}</div>

      {footer ? (
        <>
          <Divider full />
          <div className="lc-sidebar__footer">{footer}</div>
        </>
      ) : null}
    </aside>
  );
}
