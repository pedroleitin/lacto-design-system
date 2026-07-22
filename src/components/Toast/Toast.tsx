import { useCallback, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./toast.css";
import { Icon } from "../Icon/Icon";

export type ToastTone = "neutral" | "success" | "danger";

interface ToastItem {
  id: number;
  message: string;
  tone: ToastTone;
  closing?: boolean;
}

const ICON: Record<ToastTone, string | null> = {
  neutral: null,
  success: "check_circle",
  danger: "error",
};

export interface UseToastOptions {
  /** Tempo em tela, em ms. */
  duration?: number;
}

/**
 * Sem provider, sem contexto: o hook devolve `show` e o próprio nó a
 * renderizar. Monte o nó uma vez, perto da raiz.
 *
 * ```tsx
 * const { show, toasts } = useToast();
 * return <>{toasts}<button onClick={() => show("Copiado")}>…</button></>;
 * ```
 */
export function useToast({ duration = 2200 }: UseToastOptions = {}) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const seq = useRef(0);

  const show = useCallback(
    (message: string, tone: ToastTone = "neutral") => {
      const id = ++seq.current;
      setItems((p) => [...p, { id, message, tone }]);
      // Marca como saindo antes de remover, para a animação de saída rodar.
      setTimeout(() => {
        setItems((p) => p.map((t) => (t.id === id ? { ...t, closing: true } : t)));
        setTimeout(() => setItems((p) => p.filter((t) => t.id !== id)), 180);
      }, duration);
    },
    [duration],
  );

  const toasts = createPortal(
    <div className="lc-toast-host" role="status" aria-live="polite" aria-atomic="false">
      {items.map((t) => (
        <div
          key={t.id}
          className={[
            "lc-toast",
            t.tone !== "neutral" && `lc-toast--${t.tone}`,
            t.closing && "lc-toast--closing",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {ICON[t.tone] ? <Icon name={ICON[t.tone]!} size="sm" /> : null}
          {t.message}
        </div>
      ))}
    </div>,
    document.body,
  );

  return { show, toasts };
}
