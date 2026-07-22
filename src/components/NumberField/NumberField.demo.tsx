import { useState } from "react";
import { NumberField } from "./NumberField";
import { Select } from "../Select/Select";

export default function NumberFieldDemo() {
  const [dur, setDur] = useState(4);
  const [fps, setFps] = useState(30);
  const [res, setRes] = useState("1080");

  return (
    <div style={{ display: "grid", gap: 20 }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <NumberField prefix="Duration" suffix="s" min={1} max={60} value={dur} onChange={setDur} />
        <NumberField prefix="FPS" min={1} max={120} value={fps} onChange={setFps} />
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        <Select prefix="Resolution" value={res} onChange={setRes}
          options={[{ value: "720", label: "720p" }, { value: "1080", label: "1080p" }, { value: "2160", label: "4K" }]} />
        <NumberField prefix="Margin" suffix="px" min={0} max={200} value={24} onChange={() => {}} />
        <span className="lc-mono lc-tnum" style={{ fontSize: 12, color: "var(--lc-muted)" }}>
          {res} × {res} · {dur}s · {fps}fps
        </span>
      </div>
    </div>
  );
}
