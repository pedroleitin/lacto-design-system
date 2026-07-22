import "./icon.css";

export type IconSize = "xs" | "sm" | "md" | "lg" | "xl";
export type IconTone = "inherit" | "muted" | "accent" | "danger";

export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Nome do glifo no Material Symbols, ex: "settings", "play_arrow". */
  name: string;
  size?: IconSize;
  tone?: IconTone;
  /** Variante preenchida (FILL 1). */
  filled?: boolean;
  /** Rótulo acessível. Sem ele o ícone é decorativo (aria-hidden). */
  label?: string;
}

export function Icon({
  name,
  size = "md",
  tone = "inherit",
  filled = false,
  label,
  className = "",
  ...rest
}: IconProps) {
  const cls = [
    "lc-icon",
    `lc-icon--${size}`,
    tone !== "inherit" && `lc-icon--${tone}`,
    filled && "lc-icon--filled",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span
      className={cls}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      translate="no"
      {...rest}
    >
      {name}
    </span>
  );
}
