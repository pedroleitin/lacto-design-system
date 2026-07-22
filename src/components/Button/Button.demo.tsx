import { useEffect, useState } from "react";
import { Button } from "./Button";
import { Icon } from "../Icon/Icon";
import { IconButton } from "../IconButton/IconButton";

export default function ButtonDemo() {
  const [tool, setTool] = useState("draw");
  const [shift, setShift] = useState(false);

  // O realce `hot` acompanha a tecla Shift — segure Shift para ver.
  useEffect(() => {
    const on = (e: KeyboardEvent) => setShift(e.shiftKey);
    window.addEventListener("keydown", on);
    window.addEventListener("keyup", on);
    return () => {
      window.removeEventListener("keydown", on);
      window.removeEventListener("keyup", on);
    };
  }, []);

  const row = { display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" as const };

  return (
    <div style={{ display: "grid", gap: 20 }}>
      <div style={row}>
        <Button>Solid</Button>
        <Button variant="pill">Pill</Button>
        <Button variant="ghost">Ghost</Button>
        <Button active>Active</Button>
        <Button disabled>Disabled</Button>
      </div>

      <div style={row}>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>

      <div style={row}>
        <Button><Icon name="download" size="sm" />Export</Button>
        <Button variant="pill"><Icon name="add" size="sm" />New palette</Button>
        <Button kbd="c">Clear</Button>
        <Button kbd="r">Reset</Button>
      </div>

      <div style={{ ...row, gap: 6 }}>
        <IconButton icon="undo" label="Undo" />
        <IconButton icon="redo" label="Redo" />
        <IconButton icon="download" label="Download" variant="solid" />
        <IconButton icon="settings" label="Settings" variant="solid" />
        <IconButton icon="add" label="Add" variant="pill" round />
        <IconButton icon="palette" label="Palette" active />
        <span style={{ fontSize: 12, color: "var(--lc-muted)" }}>← icon only: use IconButton</span>
      </div>

      <div style={row}>
        {["draw", "erase", "pan"].map((t) => (
          <Button key={t} active={tool === t} onClick={() => setTool(t)}>
            {t}
          </Button>
        ))}
        <Button hot={shift}>Hold Shift</Button>
      </div>
    </div>
  );
}
