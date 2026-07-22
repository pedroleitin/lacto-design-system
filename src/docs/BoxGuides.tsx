/** Inspetor de box model para os exemplos do site.
 *
 *  Ligado, desenha o contorno tracejado de todo elemento do palco e, sob o
 *  cursor, uma sobreposição em três camadas — margem, borda e padding — mais
 *  uma etiqueta com os valores computados. É o mesmo modelo do DevTools, mas
 *  restrito ao palco e usando as cores do Lacto.
 *
 *  Só existe na documentação; nada disso é exportado no `src/index.ts`. */
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface Box {
  /** Retângulo da borda, em coordenadas de viewport. */
  top: number;
  left: number;
  width: number;
  height: number;
  margin: [number, number, number, number];
  padding: [number, number, number, number];
  radius: string;
  tag: string;
}

const px = (v: string) => Math.round(parseFloat(v) || 0);

/** Lista curta de valores: 0 → "0"; iguais → um só; senão "t r b l". */
function short([t, r, b, l]: [number, number, number, number]) {
  if (t === r && r === b && b === l) return `${t}`;
  if (t === b && r === l) return `${t} ${r}`;
  return `${t} ${r} ${b} ${l}`;
}

function measure(el: HTMLElement): Box {
  const r = el.getBoundingClientRect();
  const cs = getComputedStyle(el);
  return {
    top: r.top,
    left: r.left,
    width: r.width,
    height: r.height,
    margin: [
      px(cs.marginTop), px(cs.marginRight), px(cs.marginBottom), px(cs.marginLeft),
    ],
    padding: [
      px(cs.paddingTop), px(cs.paddingRight), px(cs.paddingBottom), px(cs.paddingLeft),
    ],
    radius: cs.borderRadius,
    tag: el.tagName.toLowerCase() + (el.className && typeof el.className === "string"
      ? "." + el.className.trim().split(/\s+/).filter((c) => c.startsWith("lc-"))[0]
      : ""),
  };
}

/**
 * @param enabled  liga o inspetor
 * @param root     o palco; só elementos dentro dele são medidos
 */
export function useBoxGuides(enabled: boolean, root: React.RefObject<HTMLElement | null>) {
  const [box, setBox] = useState<Box | null>(null);

  useEffect(() => {
    if (!enabled) {
      setBox(null);
      return;
    }
    const onMove = (e: PointerEvent) => {
      const host = root.current;
      if (!host) return;
      const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
      // Fora do palco, ou o próprio palco: nada a medir.
      if (!el || el === host || !host.contains(el)) {
        setBox(null);
        return;
      }
      setBox(measure(el));
    };
    const onLeave = () => setBox(null);

    document.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("scroll", onLeave, true);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onLeave, true);
    };
  }, [enabled, root]);

  if (!enabled || !box) return null;

  const [mt, mr, mb, ml] = box.margin;
  const [pt, pr, pb, pl] = box.padding;
  const hasMargin = mt || mr || mb || ml;
  const hasPadding = pt || pr || pb || pl;

  return createPortal(
    <div className="lc-guide">
      {/* margem — banda externa */}
      {hasMargin ? (
        <div
          className="lc-guide__margin"
          style={{
            top: box.top - mt,
            left: box.left - ml,
            width: box.width + ml + mr,
            height: box.height + mt + mb,
          }}
        />
      ) : null}

      {/* caixa da borda — respeita o raio real do elemento */}
      <div
        className="lc-guide__border"
        style={{
          top: box.top,
          left: box.left,
          width: box.width,
          height: box.height,
          borderRadius: box.radius,
        }}
      />

      {/* padding — banda interna */}
      {hasPadding ? (
        <div
          className="lc-guide__padding"
          style={{
            top: box.top,
            left: box.left,
            width: box.width,
            height: box.height,
            borderRadius: box.radius,
            borderTopWidth: pt,
            borderRightWidth: pr,
            borderBottomWidth: pb,
            borderLeftWidth: pl,
          }}
        />
      ) : null}

      <div
        className="lc-guide__chip"
        style={{
          top: box.top - mt - 26 < 8 ? box.top + box.height + mb + 8 : box.top - mt - 26,
          left: box.left - ml,
        }}
      >
        <b>{box.tag}</b>
        <span>{Math.round(box.width)}×{Math.round(box.height)}</span>
        {hasPadding ? <span>p {short(box.padding)}</span> : null}
        {hasMargin ? <span>m {short(box.margin)}</span> : null}
        <span>r {box.radius.split(" ")[0]}</span>
      </div>
    </div>,
    document.body,
  );
}
