import { useState } from "react";
import { Switch } from "./Switch";

export default function SwitchDemo() {
  const [guides, setGuides] = useState(true);
  const [smooth, setSmooth] = useState(false);
  const [compact, setCompact] = useState(true);

  return (
    <div style={{ display: "grid", gap: 4, maxWidth: 360, background: "var(--lc-panel)", borderRadius: 15, padding: "8px 0" }}>
      <Switch label="Hide guides" kbd="h" checked={guides} onChange={setGuides} />
      <Switch label="Smooth joins" checked={smooth} onChange={setSmooth} />
      <Switch label="Compact (44×18)" size="sm" checked={compact} onChange={setCompact} />
      <Switch label="Disabled" checked={false} onChange={() => {}} disabled />
    </div>
  );
}
