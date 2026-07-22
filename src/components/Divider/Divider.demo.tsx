import { Divider } from "./Divider";
import { Button } from "../Button/Button";

export default function DividerDemo() {
  return (
    <div style={{ display: "grid", gap: 24, maxWidth: 340 }}>
      <div style={{ background: "var(--lc-panel)", borderRadius: 15, padding: "12px 0" }}>
        <div style={{ padding: "10px 20px", fontSize: 14 }}>Grid</div>
        <Divider />
        <div style={{ padding: "10px 20px", fontSize: 14 }}>Colors</div>
        <Divider />
        <div style={{ padding: "10px 20px", fontSize: 14 }}>Export</div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 6, background: "var(--lc-panel)", borderRadius: 15, padding: 10, width: "fit-content" }}>
        <Button size="sm">Undo</Button>
        <Button size="sm">Redo</Button>
        <Divider orientation="vertical" />
        <Button size="sm">Fit</Button>
      </div>
    </div>
  );
}
