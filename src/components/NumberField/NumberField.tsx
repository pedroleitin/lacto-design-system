import { useEffect, useId, useState } from "react";
import "./numberField.css";

export interface NumberFieldProps {
  value: number;
  onChange: (value: number) => void;
  /** Rótulo apagado à esquerda, ex: "Duração". */
  prefix?: string;
  /** Unidade apagada à direita, ex: "s" ou "px". */
  suffix?: string;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  "aria-label"?: string;
  className?: string;
}

export function NumberField({
  value,
  onChange,
  prefix,
  suffix,
  min,
  max,
  step = 1,
  disabled = false,
  className = "",
  ...aria
}: NumberFieldProps) {
  const id = useId();
  // Rascunho local: enquanto digita, "" e "-" precisam ser estados válidos.
  const [draft, setDraft] = useState(String(value));
  useEffect(() => setDraft(String(value)), [value]);

  const clamp = (n: number) =>
    Math.min(max ?? Infinity, Math.max(min ?? -Infinity, n));

  const commit = () => {
    const n = parseFloat(draft);
    if (Number.isNaN(n)) {
      setDraft(String(value));
      return;
    }
    const next = clamp(n);
    setDraft(String(next));
    if (next !== value) onChange(next);
  };

  return (
    <div
      className={["lc-num", disabled && "lc-num--disabled", className]
        .filter(Boolean)
        .join(" ")}
    >
      {prefix ? (
        <label className="lc-num__prefix" htmlFor={id}>
          {prefix}
        </label>
      ) : null}
      <input
        id={id}
        type="number"
        className="lc-num__input"
        value={draft}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        aria-label={aria["aria-label"] ?? prefix}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            commit();
          }
          if (e.key === "Escape") setDraft(String(value));
        }}
      />
      {suffix ? <span className="lc-num__suffix">{suffix}</span> : null}
    </div>
  );
}
