import { useState } from "react";
import { Panel } from "./Panel";
import { Button } from "../Button/Button";
import { IconButton } from "../IconButton/IconButton";
import { Slider } from "../Slider/Slider";

export default function PanelDemo() {
  const [v, setV] = useState(40);

  return (
    <div
      className="lc-dots"
      style={{ position: "relative", height: 340, borderRadius: 20, overflow: "hidden", border: "1px solid var(--lc-line)" }}
    >
      <Panel anchor="top-right" style={{ padding: 5, display: "flex", gap: 2 }}>
        <IconButton round icon="volume_up" label="Sound" />
        <IconButton round icon="dark_mode" label="Theme" />
      </Panel>

      <Panel anchor="bottom-center" style={{ width: 300 }}>
        <h2 className="lc-overline" style={{ marginBottom: 10 }}>Grid</h2>
        <Slider label="Density" value={v} onChange={setV} />
        <div style={{ display: "flex", gap: 6, marginTop: 12 }}>
          <Button style={{ flex: 1 }}>Apply</Button>
          <Button style={{ flex: 1 }}>Reset</Button>
        </div>
      </Panel>

      <Panel variant="solid" anchor="bottom-left" style={{ padding: "12px 14px", fontSize: 12, color: "var(--lc-muted)" }}>
        <span className="lc-mono lc-tnum">x 128 · y 64 · 42 formas</span>
      </Panel>
    </div>
  );
}
