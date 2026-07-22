import "./iconButton.css";
import { Button, type ButtonProps } from "../Button/Button";
import { Icon, type IconSize } from "../Icon/Icon";

export interface IconButtonProps extends Omit<ButtonProps, "children" | "kbd"> {
  /** Nome do glifo Material Symbols. */
  icon: string;
  /** Obrigatório: é o nome acessível do botão. */
  label: string;
  /** Círculo em vez de quadrado arredondado. */
  round?: boolean;
  filled?: boolean;
  iconSize?: IconSize;
}

export function IconButton({
  icon,
  label,
  round = false,
  filled = false,
  iconSize = "md",
  variant = "ghost",
  className = "",
  ...rest
}: IconButtonProps) {
  const cls = ["lc-icon-btn", round && "lc-icon-btn--round", className]
    .filter(Boolean)
    .join(" ");

  return (
    <Button variant={variant} className={cls} aria-label={label} title={label} {...rest}>
      <Icon name={icon} size={iconSize} filled={filled} />
    </Button>
  );
}
