import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./select.css";
import { Button } from "../Button/Button";
import { Icon } from "../Icon/Icon";

export interface SelectOption<T extends string = string> {
  value: T;
  label?: string;
  icon?: string;
}

export interface SelectProps<T extends string = string> {
  options: SelectOption<T>[];
  value: T;
  onChange: (value: T) => void;
  /** Texto apagado antes do valor, ex: "Tamanho". */
  prefix?: string;
  /** Ocupa toda a largura disponível. */
  block?: boolean;
  disabled?: boolean;
  "aria-label"?: string;
  className?: string;
}

const hasDigit = (s: string) => /\d/.test(s);

export function Select<T extends string = string>({
  options,
  value,
  onChange,
  prefix,
  block = false,
  disabled = false,
  className = "",
  ...aria
}: SelectProps<T>) {
  const [open, setOpen] = useState(false);
  const [hi, setHi] = useState(0);
  const [pos, setPos] = useState({ left: 0, top: 0, minWidth: 0 });
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  const current = options.find((o) => o.value === value);
  const label = current?.label ?? value;

  // Posiciona o menu: abaixo do gatilho, ou acima se não couber.
  useLayoutEffect(() => {
    if (!open) return;
    const btn = btnRef.current;
    const menu = menuRef.current;
    if (!btn || !menu) return;
    const r = btn.getBoundingClientRect();
    const h = menu.offsetHeight;
    const below = window.innerHeight - r.bottom;
    setPos({
      left: r.left,
      top: below < h + 10 && r.top > h ? r.top - h - 6 : r.bottom + 6,
      minWidth: r.width,
    });
  }, [open]);

  // Fecha ao clicar fora, rolar ou redimensionar.
  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    const onDown = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node) && !btnRef.current?.contains(e.target as Node)) {
        close();
      }
    };
    document.addEventListener("mousedown", onDown);
    window.addEventListener("resize", close);
    window.addEventListener("scroll", close, true);
    return () => {
      document.removeEventListener("mousedown", onDown);
      window.removeEventListener("resize", close);
      window.removeEventListener("scroll", close, true);
    };
  }, [open]);

  const pick = (v: T) => {
    onChange(v);
    setOpen(false);
    btnRef.current?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setHi(Math.max(0, options.findIndex((o) => o.value === value)));
        setOpen(true);
      }
      return;
    }
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setHi((i) => (i + 1) % options.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHi((i) => (i - 1 + options.length) % options.length);
    } else if (e.key === "Home") {
      e.preventDefault();
      setHi(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setHi(options.length - 1);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      pick(options[hi].value);
    }
  };

  return (
    <div className={["lc-select", block && "lc-select--block", className].filter(Boolean).join(" ")}>
      <Button
        ref={btnRef}
        className="lc-select__btn"
        disabled={disabled}
        active={open}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={aria["aria-label"] ?? prefix}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onKeyDown}
      >
        <span className="lc-select__label">
          {prefix ? <span className="lc-select__prefix">{prefix}</span> : null}
          <b className={`lc-select__value${hasDigit(label) ? " is-numeric" : ""}`}>{label}</b>
        </span>
        <Icon name="expand_more" size="sm" className="lc-select__caret" />
      </Button>

      {open &&
        createPortal(
          <ul
            ref={menuRef}
            role="listbox"
            aria-label={aria["aria-label"] ?? prefix}
            className="lc-select__menu lc-scroll"
            style={{ left: pos.left, top: pos.top, minWidth: pos.minWidth }}
          >
            {options.map((o, i) => {
              const text = o.label ?? o.value;
              return (
                <li key={o.value}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={o.value === value}
                    onMouseEnter={() => setHi(i)}
                    onClick={() => pick(o.value)}
                    className={[
                      "lc-select__item",
                      o.value === value && "is-selected",
                      i === hi && "is-highlighted",
                      hasDigit(text) && "is-numeric",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    style={{ width: "100%" }}
                  >
                    {o.icon ? <Icon name={o.icon} size="sm" /> : null}
                    {text}
                  </button>
                </li>
              );
            })}
          </ul>,
          document.body,
        )}
    </div>
  );
}
