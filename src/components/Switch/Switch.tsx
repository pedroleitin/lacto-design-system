import { useId } from "react";
import "./switch.css";
import { Kbd } from "../Kbd/Kbd";

export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  /** Rótulo à esquerda. Sem ele, use `aria-label`. */
  label?: React.ReactNode;
  /** Atalho de teclado mostrado ao lado do rótulo. */
  kbd?: string;
  size?: "sm" | "md";
  disabled?: boolean;
  "aria-label"?: string;
  className?: string;
}

export function Switch({
  checked,
  onChange,
  label,
  kbd,
  size = "md",
  disabled = false,
  className = "",
  ...aria
}: SwitchProps) {
  const id = useId();
  const control = (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      aria-keyshortcuts={kbd}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={["lc-switch", size === "sm" && "lc-switch--sm", !label && className]
        .filter(Boolean)
        .join(" ")}
      {...aria}
    >
      <span className="lc-switch__thumb" />
    </button>
  );

  if (!label) return control;

  return (
    <div className={`lc-switch-row ${className}`}>
      <label className="lc-switch-row__label" htmlFor={id}>
        {label}
        {kbd ? <Kbd>{kbd}</Kbd> : null}
      </label>
      {control}
    </div>
  );
}
