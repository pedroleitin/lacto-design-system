import "./tabs.css";
import { Icon } from "../Icon/Icon";

export interface TabItem<T extends string = string> {
  value: T;
  label: React.ReactNode;
  icon?: string;
  disabled?: boolean;
}

export interface TabsProps<T extends string = string> {
  items: TabItem<T>[];
  value: T;
  onChange: (value: T) => void;
  /** `tab` para navegação entre painéis; `mode` para trocar de ferramenta. */
  role?: "tab" | "mode";
  className?: string;
  "aria-label"?: string;
}

export function Tabs<T extends string = string>({
  items,
  value,
  onChange,
  role = "tab",
  className = "",
  ...aria
}: TabsProps<T>) {
  const isTab = role === "tab";

  const onKeyDown = (e: React.KeyboardEvent) => {
    const i = items.findIndex((t) => t.value === value);
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    // Pula desabilitadas, dá a volta no fim.
    for (let n = 1; n <= items.length; n++) {
      const next = items[(i + step * n + items.length * n) % items.length];
      if (next && !next.disabled) {
        onChange(next.value);
        break;
      }
    }
  };

  return (
    <div
      className={`lc-tabs ${className}`}
      role={isTab ? "tablist" : "radiogroup"}
      aria-label={aria["aria-label"]}
      onKeyDown={onKeyDown}
    >
      {items.map((t) => {
        const active = t.value === value;
        return (
          <button
            key={t.value}
            type="button"
            role={isTab ? "tab" : "radio"}
            aria-selected={isTab ? active : undefined}
            aria-checked={isTab ? undefined : active}
            aria-controls={isTab ? `lc-tabpanel-${t.value}` : undefined}
            tabIndex={isTab && !active ? -1 : 0}
            disabled={t.disabled}
            onClick={() => onChange(t.value)}
            className={`lc-tab${active ? " is-active" : ""}`}
          >
            {t.icon ? <Icon name={t.icon} size="sm" /> : null}
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

export interface TabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  active: string;
}

export function TabPanel({ value, active, children, ...rest }: TabPanelProps) {
  if (value !== active) return null;
  return (
    <div id={`lc-tabpanel-${value}`} role="tabpanel" tabIndex={0} {...rest}>
      {children}
    </div>
  );
}
