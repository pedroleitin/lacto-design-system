import "./segmented.css";
import { Icon } from "../Icon/Icon";
import { Kbd } from "../Kbd/Kbd";

export interface SegmentedOption<T extends string = string> {
  value: T;
  label?: React.ReactNode;
  /** Glifo Material Symbols. Sozinho exige `title` para nome acessível. */
  icon?: string;
  title?: string;
  disabled?: boolean;
}

export interface SegmentedProps<T extends string = string> {
  options: SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  /** Rótulo à esquerda; renderiza a linha completa de sidebar. */
  label?: React.ReactNode;
  kbd?: string;
  shape?: "rounded" | "pill";
  tone?: "ink" | "accent";
  /** Largura fixa do trilho (px ou qualquer unidade CSS). */
  width?: number | string;
  className?: string;
  "aria-label"?: string;
}

export function Segmented<T extends string = string>({
  options,
  value,
  onChange,
  label,
  kbd,
  shape = "rounded",
  tone = "ink",
  width,
  className = "",
  ...aria
}: SegmentedProps<T>) {
  /* Com exatamente duas opções o controle vira um alternador: clicar na opção
     que já está ativa passa para a outra. Sem isso, metade dos cliques num
     controle binário não faz nada — e a expectativa de quem vê duas caixas
     lado a lado é a de um interruptor. */
  const other = options.length === 2
    ? options.find((o) => o.value !== value && !o.disabled)
    : undefined;

  const pick = (o: SegmentedOption<T>) =>
    onChange(other && o.value === value ? other.value : o.value);

  const control = (
    <div
      role="radiogroup"
      aria-label={aria["aria-label"]}
      className={[
        "lc-seg",
        shape === "pill" && "lc-seg--pill",
        tone === "accent" && "lc-seg--accent",
        !label && className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={width ? { width } : undefined}
    >
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={value === o.value}
          aria-label={o.title ?? (typeof o.label === "string" ? o.label : undefined)}
          title={o.title}
          disabled={o.disabled}
          onClick={() => pick(o)}
          className={`lc-seg__opt${value === o.value ? " is-active" : ""}`}
        >
          {o.icon ? <Icon name={o.icon} size="sm" /> : null}
          {o.label}
        </button>
      ))}
    </div>
  );

  if (!label) return control;

  return (
    <div className={`lc-seg-row ${className}`}>
      <span className="lc-seg-row__label">
        {label}
        {kbd ? <Kbd>{kbd}</Kbd> : null}
      </span>
      {control}
    </div>
  );
}
