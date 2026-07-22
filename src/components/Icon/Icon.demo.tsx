import { Icon } from "./Icon";

export default function IconDemo() {
  const row = { display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" as const };
  return (
    <div style={{ display: "grid", gap: 20 }}>
      <div style={row}>
        <Icon name="draw" size="xs" />
        <Icon name="draw" size="sm" />
        <Icon name="draw" size="md" />
        <Icon name="draw" size="lg" />
        <Icon name="draw" size="xl" />
      </div>
      <div style={row}>
        <Icon name="favorite" />
        <Icon name="favorite" filled />
        <Icon name="favorite" tone="muted" />
        <Icon name="favorite" tone="accent" filled />
        <Icon name="delete" tone="danger" />
      </div>
      <div style={row}>
        {["undo", "redo", "pan_tool", "fit_screen", "palette", "download", "settings", "play_arrow"].map((n) => (
          <span key={n} style={{ display: "grid", justifyItems: "center", gap: 4, width: 72 }}>
            <Icon name={n} size="lg" />
            <code style={{ fontSize: 10, color: "var(--lc-muted)" }}>{n}</code>
          </span>
        ))}
      </div>
    </div>
  );
}
