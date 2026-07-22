import { useState } from "react";
import { RangeSlider, type Range } from "./RangeSlider";

export default function RangeSliderDemo() {
  const [types, setTypes] = useState<Range>([1, 2]);
  const [size, setSize] = useState<Range>([20, 70]);

  return (
    <div style={{ display: "grid", gap: 28, maxWidth: 380 }}>
      <RangeSlider
        label="Type range"
        min={0} max={3}
        value={types} onChange={setTypes}
        ticks={["Empty", "Short", "Long", "Double"]}
      />
      <RangeSlider
        label="Cell size"
        min={0} max={100}
        value={size} onChange={setSize}
        format={(v) => `${v}px`}
      />
      <p style={{ fontSize: 12, color: "var(--lc-muted)" }}>
        Com o trilho focado: setas movem o polegar ativo, <code>[</code> e <code>]</code> trocam de polegar.
      </p>
    </div>
  );
}
