import "./kbd.css";

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  /** A tecla, ex: "m", "⌘K", "esc". */
  children: React.ReactNode;
}

export function Kbd({ children, className = "", ...rest }: KbdProps) {
  return (
    <kbd className={`lc-kbd ${className}`} {...rest}>
      {children}
    </kbd>
  );
}
