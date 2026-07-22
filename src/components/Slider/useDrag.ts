import { useRef } from "react";

/** Arrasto sobre um trilho: converte clientX na fração 0..1 do elemento e
 *  captura o ponteiro para o gesto não se perder ao sair da caixa. */
export function useTrackDrag(onFraction: (t: number) => void) {
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const fraction = (clientX: number) => {
    const el = ref.current;
    if (!el) return 0;
    const r = el.getBoundingClientRect();
    return Math.min(1, Math.max(0, (clientX - r.left) / r.width));
  };

  return {
    ref,
    handlers: {
      onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        onFraction(fraction(e.clientX));
      },
      onPointerMove: (e: React.PointerEvent<HTMLDivElement>) => {
        if (dragging.current) onFraction(fraction(e.clientX));
      },
      onPointerUp: () => {
        dragging.current = false;
      },
      onPointerCancel: () => {
        dragging.current = false;
      },
    },
    fraction,
  };
}
