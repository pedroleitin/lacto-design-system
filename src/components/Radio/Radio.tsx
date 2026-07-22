import { useId } from "react";
import "./radio.css";

export interface RadioOption<T extends string = string> {
  value: T;
  label: React.ReactNode;
  /** Segunda linha explicativa, em `--lc-muted`. */
  hint?: React.ReactNode;
  disabled?: boolean;
}

export interface RadioGroupProps<T extends string = string> {
  /** Título do conjunto — vira o `<legend>` do `<fieldset>`. */
  legend?: React.ReactNode;
  options: RadioOption<T>[];
  value: T;
  onChange: (value: T) => void;
  /** Compartilhado pelos inputs; gerado se omitido. */
  name?: string;
  direction?: "column" | "row";
  className?: string;
}

export function RadioGroup<T extends string = string>({
  legend,
  options,
  value,
  onChange,
  name,
  direction = "column",
  className = "",
}: RadioGroupProps<T>) {
  const auto = useId();
  const group = name ?? auto;

  return (
    <fieldset
      className={[
        "lc-radio-group",
        direction === "row" && "lc-radio-group--row",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {legend ? (
        <legend className="lc-radio-group__legend lc-overline">{legend}</legend>
      ) : null}

      {options.map((o) => (
        <label
          key={o.value}
          className={["lc-radio", o.disabled && "lc-radio--disabled"]
            .filter(Boolean)
            .join(" ")}
        >
          <input
            type="radio"
            className="lc-radio__input"
            name={group}
            value={o.value}
            checked={value === o.value}
            disabled={o.disabled}
            onChange={() => onChange(o.value)}
          />
          <span className="lc-radio__dot" aria-hidden="true" />
          <span className="lc-radio__text">
            <span>{o.label}</span>
            {o.hint ? <span className="lc-radio__hint">{o.hint}</span> : null}
          </span>
        </label>
      ))}
    </fieldset>
  );
}
