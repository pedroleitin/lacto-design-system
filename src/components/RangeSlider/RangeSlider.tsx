import { useRef, useState } from "react";
import "./rangeSlider.css";

export type Range = [number, number];

export interface RangeSliderProps {
  label: string;
  value: Range;
  onChange: (value: Range) => void;
  min?: number;
  max?: number;
  step?: number;
  /** Rótulos por posição, ex: ["Vazio","Curto","Longo","Duplo"]. Também
   *  desenha as marcas no trilho. */
  ticks?: string[];
  format?: (value: number) => string;
  disabled?: boolean;
  className?: string;
}

export function RangeSlider({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  ticks,
  format,
  disabled = false,
  className = "",
}: RangeSliderProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const dragging = useRef<0 | 1 | null>(null);
  const [focused, setFocused] = useState<0 | 1>(0);
  const [lo, hi] = value;

  const snap = (v: number) =>
    parseFloat(
      Math.min(max, Math.max(min, Math.round((v - min) / step) * step + min)).toFixed(6),
    );

  const valueAt = (clientX: number) => {
    const el = railRef.current;
    if (!el) return min;
    const r = el.getBoundingClientRect();
    const t = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
    return snap(min + t * (max - min));
  };

  /** Move o polegar `which`, sem deixar um passar do outro. */
  const set = (which: 0 | 1, v: number) => {
    const next: Range = which === 0 ? [Math.min(v, hi), hi] : [lo, Math.max(v, lo)];
    if (next[0] !== lo || next[1] !== hi) onChange(next);
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const v = valueAt(e.clientX);
    // Empatou (clique exatamente no meio)? Escolhe pelo lado do clique.
    const dLo = Math.abs(v - lo);
    const dHi = Math.abs(v - hi);
    const which: 0 | 1 = dLo === dHi ? (v >= hi ? 1 : 0) : dLo < dHi ? 0 : 1;
    dragging.current = which;
    setFocused(which);
    e.currentTarget.setPointerCapture(e.pointerId);
    set(which, v);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragging.current !== null) set(dragging.current, valueAt(e.clientX));
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const big = (max - min) / 10;
    const map: Record<string, number> = {
      ArrowLeft: -step, ArrowDown: -step, ArrowRight: step, ArrowUp: step,
      PageDown: -big, PageUp: big,
    };
    if (e.key === "Tab") return;
    if (e.key in map) {
      e.preventDefault();
      set(focused, snap(value[focused] + map[e.key]));
    } else if (e.key === "Home") {
      e.preventDefault();
      set(focused, min);
    } else if (e.key === "End") {
      e.preventDefault();
      set(focused, max);
    } else if (e.key === "]" || e.key === "[") {
      // Alterna qual polegar as setas controlam.
      e.preventDefault();
      setFocused((f) => (f === 0 ? 1 : 0));
    }
  };

  const pct = (v: number) => (max > min ? ((v - min) / (max - min)) * 100 : 0);
  const show = (v: number) => (ticks ? ticks[Math.round(v)] ?? String(v) : format ? format(v) : String(v));
  const text = `${show(lo)} – ${show(hi)}`;

  return (
    <div className={`lc-range ${className}`} aria-disabled={disabled || undefined}>
      <div className="lc-range__head">
        <span className="lc-range__label">{label}</span>
        <span className="lc-range__value">{text}</span>
      </div>

      <div
        ref={railRef}
        className="lc-range__rail"
        role="group"
        aria-label={label}
        tabIndex={disabled ? -1 : 0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={() => (dragging.current = null)}
        onPointerCancel={() => (dragging.current = null)}
        onKeyDown={onKeyDown}
      >
        <div
          className="lc-range__fill"
          style={{ left: `${pct(lo)}%`, width: `${pct(hi) - pct(lo)}%` }}
        />

        {ticks?.map((t, i) => (
          <span key={t} className="lc-range__tick" style={{ left: `${(i / (ticks.length - 1)) * 100}%` }} />
        ))}

        {([0, 1] as const).map((i) => (
          <span
            key={i}
            className={`lc-range__thumb${focused === i ? " lc-range__thumb--active" : ""}`}
            style={{ left: `${pct(value[i])}%` }}
            role="slider"
            aria-label={`${label} — ${i === 0 ? "mínimo" : "máximo"}`}
            aria-valuemin={i === 0 ? min : lo}
            aria-valuemax={i === 0 ? hi : max}
            aria-valuenow={value[i]}
            aria-valuetext={show(value[i])}
          />
        ))}
      </div>
    </div>
  );
}
