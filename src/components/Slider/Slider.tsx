import { useLayoutEffect, useState } from "react";
import "./slider.css";
import { useTrackDrag } from "./useDrag";

export interface SliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  /** Sufixo do valor exibido, ex: "%" ou "px". */
  suffix?: string;
  /** Formatação completa do valor; ignora `suffix`. */
  format?: (value: number) => string;
  variant?: "bar" | "track";
  disabled?: boolean;
  className?: string;
}

const clampStep = (v: number, min: number, max: number, step: number) => {
  const snapped = Math.round((v - min) / step) * step + min;
  return parseFloat(Math.min(max, Math.max(min, snapped)).toFixed(6));
};

export function Slider({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  suffix = "",
  format,
  variant = "bar",
  disabled = false,
  className = "",
}: SliderProps) {
  const commit = (t: number) => onChange(clampStep(min + t * (max - min), min, max, step));
  const { ref, handlers } = useTrackDrag(commit);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const big = (max - min) / 10;
    const map: Record<string, number> = {
      ArrowLeft: -step, ArrowDown: -step, ArrowRight: step, ArrowUp: step,
      PageDown: -big, PageUp: big,
    };
    if (e.key in map) {
      e.preventDefault();
      onChange(clampStep(value + map[e.key], min, max, step));
    } else if (e.key === "Home") {
      e.preventDefault();
      onChange(min);
    } else if (e.key === "End") {
      e.preventDefault();
      onChange(max);
    }
  };

  const pct = max > min ? ((value - min) / (max - min)) * 100 : 0;
  const text = format ? format(value) : `${value}${suffix}`;

  const aria = {
    role: "slider" as const,
    tabIndex: disabled ? -1 : 0,
    "aria-label": label,
    "aria-valuemin": min,
    "aria-valuemax": max,
    "aria-valuenow": value,
    "aria-valuetext": text,
    "aria-disabled": disabled || undefined,
    onKeyDown,
  };

  if (variant === "track") {
    return (
      <div className={`lc-trk ${className}`} aria-disabled={disabled || undefined}>
        <div className="lc-trk__head">
          <span className="lc-trk__label">{label}</span>
          <span className="lc-trk__value">{text}</span>
        </div>
        <div ref={ref} className="lc-trk__rail" {...aria} {...handlers}>
          <div className="lc-trk__fill" style={{ width: `${pct}%` }} />
          <div className="lc-trk__thumb" style={{ left: `${pct}%` }} />
        </div>
      </div>
    );
  }

  return <BarSlider {...{ trackRef: ref, aria, handlers, pct, label, text, className }} />;
}

/** O texto claro é recortado pelo preenchimento, então precisa ter a largura do
 *  trilho inteiro — medida aqui e refeita quando o slider muda de tamanho. */
function BarSlider({
  trackRef,
  aria,
  handlers,
  pct,
  label,
  text,
  className,
}: {
  trackRef: React.RefObject<HTMLDivElement | null>;
  aria: Record<string, unknown>;
  handlers: Record<string, unknown>;
  pct: number;
  label: string;
  text: string;
  className: string;
}) {
  const [trackW, setTrackW] = useState(0);

  useLayoutEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setTrackW(el.clientWidth));
    ro.observe(el);
    setTrackW(el.clientWidth);
    return () => ro.disconnect();
  }, [trackRef]);

  const content = (
    <>
      <span>{label}</span>
      <span className="lc-rng__val">{text}</span>
    </>
  );

  return (
    <div ref={trackRef} className={`lc-rng ${className}`} {...aria} {...handlers}>
      <div className="lc-rng__content">{content}</div>
      <div className="lc-rng__fill" style={{ width: `${pct}%` }}>
        <div className="lc-rng__content lc-rng__content--light" style={{ width: trackW }}>
          {content}
        </div>
      </div>
    </div>
  );
}
