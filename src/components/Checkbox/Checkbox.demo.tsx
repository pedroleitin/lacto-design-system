import { useState } from "react";
import { Checkbox } from "./Checkbox";

const LAYERS = ["Outline", "Fill", "Shadow", "Grid"];

export default function CheckboxDemo() {
  const [on, setOn] = useState<string[]>(["Outline", "Grid"]);
  const all = on.length === LAYERS.length;

  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 320 }}>
      <Checkbox
        label={<strong>All layers</strong>}
        checked={all}
        indeterminate={on.length > 0}
        onChange={(v) => setOn(v ? LAYERS : [])}
      />
      <div style={{ display: "grid", gap: 10, paddingLeft: 26 }}>
        {LAYERS.map((l) => (
          <Checkbox
            key={l}
            label={l}
            checked={on.includes(l)}
            onChange={(v) => setOn((p) => (v ? [...p, l] : p.filter((x) => x !== l)))}
          />
        ))}
      </div>
      <Checkbox label="Disabled" checked={false} onChange={() => {}} disabled />
    </div>
  );
}
