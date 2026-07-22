import "./colorSwatch.css";

export interface ColorSwatchProps {
  value: string;
  /** Sem `onChange`, a amostra é só leitura (não abre o seletor). */
  onChange?: (value: string) => void;
  /** Contorno accent — parte de uma paleta com item selecionado. */
  selected?: boolean;
  round?: boolean;
  size?: "md" | "lg";
  /** Nome acessível. Padrão: o próprio valor hex. */
  label?: string;
  className?: string;
}

export function ColorSwatch({
  value,
  onChange,
  selected = false,
  round = false,
  size = "md",
  label,
  className = "",
}: ColorSwatchProps) {
  const cls = [
    "lc-swatch",
    round && "lc-swatch--round",
    size === "lg" && "lc-swatch--lg",
    selected && "is-selected",
    !onChange && "lc-swatch--static",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={cls} style={{ background: value }} title={label ?? value}>
      {onChange ? (
        <input
          type="color"
          className="lc-swatch__input"
          value={value}
          aria-label={label ?? `Cor ${value}`}
          onChange={(e) => onChange(e.target.value.toUpperCase())}
        />
      ) : null}
    </span>
  );
}

export interface ColorSwatchAddProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

/** Botão tracejado para acrescentar uma cor à paleta. */
export function ColorSwatchAdd({
  label = "Adicionar cor",
  className = "",
  ...rest
}: ColorSwatchAddProps) {
  return (
    <button
      type="button"
      className={`lc-swatch-add ${className}`}
      aria-label={label}
      title={label}
      {...rest}
    >
      +
    </button>
  );
}
