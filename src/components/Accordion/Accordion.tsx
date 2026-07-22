import { useState } from "react";
import "./accordion.css";
import { Icon } from "../Icon/Icon";
import { Divider } from "../Divider/Divider";

export interface AccordionItemData {
  id: string;
  title: React.ReactNode;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItemData[];
  /** Itens abertos (controlado). */
  open?: string[];
  onOpenChange?: (open: string[]) => void;
  /** Abertos no início (não controlado). */
  defaultOpen?: string[];
  /** Só um item aberto por vez. */
  single?: boolean;
  className?: string;
}

export function Accordion({
  items,
  open,
  onOpenChange,
  defaultOpen = [],
  single = false,
  className = "",
}: AccordionProps) {
  const [inner, setInner] = useState<string[]>(defaultOpen);
  const current = open ?? inner;

  const toggle = (id: string) => {
    const isOpen = current.includes(id);
    const next = single
      ? isOpen
        ? []
        : [id]
      : isOpen
        ? current.filter((x) => x !== id)
        : [...current, id];
    if (open === undefined) setInner(next);
    onOpenChange?.(next);
  };

  return (
    <div className={`lc-acc ${className}`}>
      {items.map((item) => {
        const isOpen = current.includes(item.id);
        return (
          <div key={item.id} className="lc-acc__item">
            <button
              type="button"
              className="lc-acc__header"
              aria-expanded={isOpen}
              aria-controls={`lc-acc-${item.id}`}
              onClick={() => toggle(item.id)}
            >
              <span className="lc-acc__title">{item.title}</span>
              <span className="lc-acc__chevron">
                <Icon name="expand_more" size="sm" />
              </span>
            </button>

            <div
              id={`lc-acc-${item.id}`}
              role="region"
              className={`lc-acc__region${isOpen ? " lc-acc__region--open" : ""}`}
            >
              <div className="lc-acc__clip">
                <div className="lc-acc__body">
                  {item.content}
                </div>
              </div>
            </div>

            <Divider />
          </div>
        );
      })}
    </div>
  );
}
