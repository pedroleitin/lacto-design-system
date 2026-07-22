import { useId } from "react";
import "./textField.css";
import { Icon } from "../Icon/Icon";

export interface TextFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: React.ReactNode;
  /** Texto de apoio abaixo do campo. Substituído por `error` quando houver. */
  hint?: React.ReactNode;
  /** Mensagem de erro; deixa o campo em estado inválido. */
  error?: React.ReactNode;
  /** Glifo Material Symbols à esquerda. */
  icon?: string;
  /** Botão à direita, revelado no hover/foco (copiar, limpar…). */
  action?: React.ReactNode;
  size?: "sm" | "md";
  /** Fundo `--lc-bg` com borda visível, em vez da superfície branca. */
  outlined?: boolean;
  /** Centralizado e maiúsculo, para códigos hex. */
  hex?: boolean;
}

export function TextField({
  label,
  hint,
  error,
  icon,
  action,
  size = "md",
  outlined = false,
  hex = false,
  disabled = false,
  className = "",
  id,
  ...rest
}: TextFieldProps) {
  const auto = useId();
  const fieldId = id ?? auto;
  const msgId = `${fieldId}-msg`;
  const msg = error ?? hint;

  return (
    <div
      className={[
        "lc-field",
        size === "sm" && "lc-field--sm",
        outlined && "lc-field--outlined",
        hex && "lc-field--hex",
        error && "lc-field--invalid",
        disabled && "lc-field--disabled",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {label ? (
        <label className="lc-field__label" htmlFor={fieldId}>
          {label}
        </label>
      ) : null}

      <div className="lc-field__wrap">
        {icon ? <Icon name={icon} size="sm" /> : null}
        <input
          id={fieldId}
          type="text"
          spellCheck={false}
          className="lc-field__input"
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={msg ? msgId : undefined}
          {...rest}
        />
        {action ? <span className="lc-field__action">{action}</span> : null}
      </div>

      {msg ? (
        <span id={msgId} className="lc-field__msg" role={error ? "alert" : undefined}>
          {msg}
        </span>
      ) : null}
    </div>
  );
}
