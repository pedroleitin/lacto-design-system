import "./badge.css";

export type BadgeTone = "neutral" | "accent" | "danger" | "success";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  /** Formato maior, com padding — para contadores e progresso. */
  pill?: boolean;
  /** Sobrepõe o canto do pai (que precisa ter `.lc-badge-host`). */
  corner?: "left" | "right";
  /** Só aparece no hover do pai `.lc-badge-host`. */
  onHover?: boolean;
  /** Vira <button> clicável (ex: badge de excluir). */
  onClick?: React.MouseEventHandler;
  /** Obrigatório quando clicável. */
  label?: string;
}

export function Badge({
  tone = "neutral",
  pill = false,
  corner,
  onHover = false,
  onClick,
  label,
  className = "",
  children,
  ...rest
}: BadgeProps) {
  const cls = [
    "lc-badge",
    tone !== "neutral" && `lc-badge--${tone}`,
    pill && "lc-badge--pill",
    corner && `lc-badge--corner lc-badge--corner-${corner}`,
    onHover && "lc-badge--on-hover",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (onClick) {
    return (
      <button type="button" className={cls} onClick={onClick} aria-label={label} title={label}>
        {children}
      </button>
    );
  }

  return (
    <span className={cls} {...rest}>
      {children}
    </span>
  );
}
