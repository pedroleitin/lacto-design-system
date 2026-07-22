import { useState } from "react";
import { Slider } from "./Slider";

export default function SliderDemo() {
  const [cols, setCols] = useState(8);
  const [size, setSize] = useState(120);
  const [blob, setBlob] = useState(45);
  const [op, setOp] = useState(0.6);

  return (
    <div style={{ display: "grid", gap: 28, maxWidth: 380 }}>
      <div style={{ display: "grid", gap: 9 }}>
        <p className="lc-overline">variant="bar" — default</p>
        <Slider label="Columns" min={1} max={20} value={cols} onChange={setCols} />
        <Slider label="Size" min={35} max={200} suffix="px" value={size} onChange={setSize} />
        <Slider
          label="Opacity" min={0} max={1} step={0.05} value={op} onChange={setOp}
          format={(v) => v.toFixed(2)}
        />
        <Slider label="Disabled" value={30} onChange={() => {}} disabled />
      </div>

      <div style={{ display: "grid", gap: 16 }}>
        <p className="lc-overline">variant="track"</p>
        <Slider variant="track" label="Spread" min={5} max={90} suffix="%" value={blob} onChange={setBlob} />
        <Slider variant="track" label="Columns" min={1} max={20} value={cols} onChange={setCols} />
      </div>
    </div>
  );
}
