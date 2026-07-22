import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./tooltip.css";

interface Pos {
  left: number;
  top: number;
  below: boolean;
}

/** O elemento mais próximo (subindo) que carrega uma dica. */
function tipTarget(node: EventTarget | null): HTMLElement | null {
  let el = node as HTMLElement | null;
  while (el && el !== document.body) {
    if (el.hasAttribute?.("title") || el.hasAttribute?.("data-tip")) return el;
    el = el.parentElement;
  }
  return null;
}

/** Rouba o `title` nativo para `data-tip` na primeira vez, para o balão do SO
 *  nunca aparecer junto com o nosso. */
function textFor(el: HTMLElement): string {
  const native = el.getAttribute("title");
  if (native != null) {
    el.setAttribute("data-tip", native);
    el.removeAttribute("title");
  }
  return el.getAttribute("data-tip") ?? "";
}

export interface TooltipProps {
  /** Distância entre o gatilho e o balão. */
  gap?: number;
}

/**
 * Singleton de tooltip. Monte **uma vez** na raiz do app: todo elemento com
 * `title` (ou `data-tip`) passa a ter o balão do Lacto, sem envolver cada
 * gatilho num wrapper.
 */
export function Tooltip({ gap = 8 }: TooltipProps) {
  const [text, setText] = useState("");
  const [pos, setPos] = useState<Pos>({ left: 0, top: 0, below: false });
  const ref = useRef<HTMLDivElement>(null);
  const current = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const place = (el: HTMLElement) => {
      const bubble = ref.current;
      if (!bubble) return;
      const r = el.getBoundingClientRect();
      const w = bubble.offsetWidth;
      const h = bubble.offsetHeight;
      let left = r.left + r.width / 2 - w / 2;
      left = Math.max(6, Math.min(left, window.innerWidth - w - 6));
      let top = r.top - h - gap;
      const below = top < 6;
      if (below) top = r.bottom + gap;
      setPos({ left: Math.round(left), top: Math.round(top), below });
    };

    const show = (el: HTMLElement) => {
      const t = textFor(el).trim();
      if (!t) return;
      current.current = el;
      setText(t);
      // Mede depois de pintar o texto, senão a largura é a do balão anterior.
      requestAnimationFrame(() => place(el));
    };

    const hide = () => {
      current.current = null;
      setText("");
    };

    const onOver = (e: PointerEvent) => {
      const target = tipTarget(e.target);
      if (target && target !== current.current) show(target);
    };
    const onOut = (e: PointerEvent) => {
      if (!current.current) return;
      if (tipTarget(e.relatedTarget) !== current.current) hide();
    };
    const onFocus = (e: FocusEvent) => {
      const target = tipTarget(e.target);
      if (target) show(target);
    };

    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);
    document.addEventListener("pointerdown", hide, true);
    document.addEventListener("focusin", onFocus);
    document.addEventListener("focusout", hide);
    window.addEventListener("scroll", hide, true);
    return () => {
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      document.removeEventListener("pointerdown", hide, true);
      document.removeEventListener("focusin", onFocus);
      document.removeEventListener("focusout", hide);
      window.removeEventListener("scroll", hide, true);
    };
  }, [gap]);

  return createPortal(
    <div
      ref={ref}
      role="tooltip"
      className={[
        "lc-tooltip",
        text && "is-visible",
        pos.below && "is-below",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ left: pos.left, top: pos.top }}
    >
      {text}
    </div>,
    document.body,
  );
}
