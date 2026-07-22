import "./button.css";
import { Kbd } from "../Kbd/Kbd";

export type ButtonVariant = "solid" | "pill" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Estado selecionado/ligado — pinta de accent. */
  active?: boolean;
  /** Realce momentâneo enquanto um modificador está pressionado. */
  hot?: boolean;
  /** Atalho de teclado mostrado como badge no fim do rótulo. */
  kbd?: string;
  /** React 19: ref é uma prop normal, repassada ao <button>. */
  ref?: React.Ref<HTMLButtonElement>;
}

export function Button({
  variant = "solid",
  size = "md",
  active = false,
  hot = false,
  kbd,
  type = "button",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const cls = [
    "lc-btn",
    `lc-btn--${variant}`,
    size !== "md" && `lc-btn--${size}`,
    active && "is-active",
    hot && "is-hot",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={cls}
      aria-pressed={active || undefined}
      aria-keyshortcuts={kbd}
      {...rest}
    >
      {children}
      {kbd ? <Kbd>{kbd}</Kbd> : null}
    </button>
  );
}
