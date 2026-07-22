import { useState } from "react";
import { Tabs, TabPanel } from "./Tabs";
import { Panel } from "../Panel/Panel";

export default function TabsDemo() {
  const [mode, setMode] = useState("compor");
  const [tab, setTab] = useState("grade");

  return (
    <div style={{ display: "grid", gap: 28 }}>
      <div
        className="lc-dots"
        style={{ position: "relative", height: 140, borderRadius: 20, border: "1px solid var(--lc-line)" }}
      >
        <Panel anchor="top-center" style={{ padding: 5 }}>
          <Tabs
            role="mode" aria-label="Working mode"
            items={[
              { value: "compor", label: "Compose" },
              { value: "animar", label: "Animate" },
              { value: "exportar", label: "Export" },
            ]}
            value={mode} onChange={setMode}
          />
        </Panel>
      </div>

      <div>
        <Tabs
          aria-label="Sections"
          items={[
            { value: "grade", label: "Grid", icon: "grid_on" },
            { value: "cores", label: "Colors", icon: "palette" },
            { value: "fx", label: "Effects", icon: "auto_awesome", disabled: true },
          ]}
          value={tab} onChange={setTab}
        />
        <div style={{ marginTop: 12, fontSize: 14, color: "var(--lc-muted)" }}>
          <TabPanel value="grade" active={tab}>Grid controls.</TabPanel>
          <TabPanel value="cores" active={tab}>Palette and colors.</TabPanel>
        </div>
      </div>
    </div>
  );
}
