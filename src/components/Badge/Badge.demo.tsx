import { Badge } from "./Badge";
import { Icon } from "../Icon/Icon";

export default function BadgeDemo() {
  const tile = {
    position: "relative" as const,
    width: 46,
    height: 46,
    display: "grid",
    placeItems: "center",
    background: "var(--lc-surface)",
    borderRadius: 8,
  };

  return (
    <div style={{ display: "grid", gap: 24 }}>
      <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
        <Badge>3</Badge>
        <Badge tone="accent">ANIM</Badge>
        <Badge tone="danger">×</Badge>
        <Badge tone="success">✓</Badge>
      </div>

      <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
        <Badge pill tone="accent">Exporting 42%</Badge>
        <Badge pill>12 shapes</Badge>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <div className="lc-badge-host" style={tile}>
          <Icon name="square" />
          <Badge tone="danger" corner="right" onHover label="Delete shape" onClick={() => {}}>×</Badge>
        </div>
        <div className="lc-badge-host" style={tile}>
          <Icon name="circle" />
          <Badge tone="accent" corner="left">A</Badge>
          <Badge tone="danger" corner="right" onHover label="Delete shape" onClick={() => {}}>×</Badge>
        </div>
        <span style={{ alignSelf: "center", fontSize: 12, color: "var(--lc-muted)" }}>
          ← hover the thumbnails
        </span>
      </div>
    </div>
  );
}
