import "./divider.css";

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: "horizontal" | "vertical";
  /** Sem o recuo de 10% nas pontas. */
  full?: boolean;
}

export function Divider({
  orientation = "horizontal",
  full = false,
  className = "",
  ...rest
}: DividerProps) {
  return (
    <hr
      role="separator"
      aria-orientation={orientation}
      className={[
        "lc-divider",
        orientation === "vertical" && "lc-divider--vertical",
        full && "lc-divider--full",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    />
  );
}
