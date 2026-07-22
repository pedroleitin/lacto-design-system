import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Slider } from "../Slider/Slider";
import { Switch } from "../Switch/Switch";
import { Segmented } from "../Segmented/Segmented";
import { Button } from "../Button/Button";
import { IconButton } from "../IconButton/IconButton";

export default function SidebarDemo() {
  const [cols, setCols] = useState(8);
  const [size, setSize] = useState(120);
  const [mode, setMode] = useState("draw");
  const [guides, setGuides] = useState(false);

  return (
    <div
      className="lc-dots"
      style={{ position: "relative", height: 460, borderRadius: 20, overflow: "hidden", border: "1px solid var(--lc-line)" }}
    >
      <Sidebar
        inline
        title="Lacto"
        headerAction={<IconButton round icon="dark_mode" label="Theme" size="sm" iconSize="sm" />}
        style={{ width: 300 }}
        footer={
          <>
            <Button kbd="r">Reset</Button>
            <Button kbd="c">Clear</Button>
          </>
        }
      >
        <div style={{ padding: "12px 20px", display: "grid", gap: 9 }}>
          <Slider label="Columns" min={1} max={20} value={cols} onChange={setCols} />
          <Slider label="Size" min={35} max={200} suffix="px" value={size} onChange={setSize} />
        </div>
        <Segmented
          label="Mode" kbd="m" width={140} value={mode} onChange={setMode}
          options={[{ value: "draw", label: "Draw" }, { value: "paint", label: "Paint" }]}
        />
        <Switch label="Hide guides" kbd="h" checked={guides} onChange={setGuides} />
        <p className="lc-sidebar__hint lc-sidebar__spacer">
          Scroll to pan, Ctrl/Cmd+scroll to zoom, Space+drag to move.
        </p>
      </Sidebar>
    </div>
  );
}
