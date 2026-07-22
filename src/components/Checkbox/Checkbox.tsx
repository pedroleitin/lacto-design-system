import { useEffect, useRef } from "react";
import "./checkbox.css";
import { Icon } from "../Icon/Icon";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "type" | "size"> {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: React.ReactNode;
  /** Parcialmente marcado (pai de uma lista com seleção parcial). */
  indeterminate?: boolean;
}

export function Checkbox({
  checked,
  onChange,
  label,
  indeterminate = false,
  disabled = false,
  className = "",
  ...rest
}: CheckboxProps) {
  const ref = useRef<HTMLInputElement>(null);

  // `indeterminate` só existe via DOM, não como atributo.
  useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate && !checked;
  }, [indeterminate, checked]);

  return (
    <label
      className={["lc-check", disabled && "lc-check--disabled", className]
        .filter(Boolean)
        .join(" ")}
    >
      <input
        ref={ref}
        type="checkbox"
        className="lc-check__input"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        {...rest}
      />
      <span className="lc-check__box" aria-hidden="true">
        <Icon name={indeterminate && !checked ? "remove" : "check"} />
      </span>
      {label ? <span className="lc-check__label">{label}</span> : null}
    </label>
  );
}
