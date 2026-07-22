import { useState } from "react";
import { Segmented } from "./Segmented";

export default function SegmentedDemo() {
  const [mode, setMode] = useState("draw");
  const [style, setStyle] = useState("fill");
  const [anim, setAnim] = useState("off");
  const [shape, setShape] = useState("square");

  return (
    <div style={{ display: "grid", gap: 24 }}>
      <div style={{ display: "grid", gap: 4, maxWidth: 360, background: "var(--lc-panel)", borderRadius: 15, padding: "8px 0" }}>
        <Segmented
          label="Mode" kbd="m" value={mode} onChange={setMode} width={140}
          options={[{ value: "draw", label: "Draw" }, { value: "paint", label: "Paint" }]}
        />
        <Segmented
          label="Style" kbd="s" value={style} onChange={setStyle} width={140}
          options={[{ value: "fill", label: "Filled" }, { value: "stroke", label: "Outline" }]}
        />
        <Segmented
          label="Animate" shape="pill" value={anim} onChange={setAnim}
          options={[
            { value: "off", icon: "circle", title: "No animation" },
            { value: "draw", icon: "gesture", title: "Draw stroke" },
            { value: "loop", icon: "sync", title: "Looping" },
            { value: "bounce", icon: "swap_horiz", title: "Back and forth" },
          ]}
        />
      </div>

      <div>
        <p className="lc-overline" style={{ marginBottom: 10 }}>Accent tone (toolbar)</p>
        <Segmented
          tone="accent" value={shape} onChange={setShape} aria-label="Brush shape"
          options={[
            { value: "square", icon: "square", title: "Square" },
            { value: "circle", icon: "circle", title: "Circle" },
          ]}
        />
      </div>
    </div>
  );
}
