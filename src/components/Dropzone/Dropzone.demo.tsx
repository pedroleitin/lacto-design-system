import { useState } from "react";
import { Dropzone } from "./Dropzone";
import { Icon } from "../Icon/Icon";

export default function DropzoneDemo() {
  const [names, setNames] = useState<string[]>([]);

  return (
    <div style={{ display: "grid", gap: 20, maxWidth: 360 }}>
      <Dropzone
        multiple
        accept="image/*,.svg"
        label="Drop images or click to browse"
        hint="SVG, PNG or JPG · up to 5 MB"
        onFiles={(f) => setNames(f.map((x) => x.name))}
      />

      <div>
        <p className="lc-overline" style={{ marginBottom: 10 }}>Compact, in a row of shapes</p>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {["square", "circle", "change_history"].map((s) => (
            <span key={s} style={{ width: 46, height: 46, display: "grid", placeItems: "center", background: "var(--lc-surface)", borderRadius: 8 }}>
              <Icon name={s} />
            </span>
          ))}
          <Dropzone tile label="Upload" onFiles={(f) => setNames(f.map((x) => x.name))} />
        </div>
      </div>

      {names.length > 0 && (
        <p className="lc-mono" style={{ fontSize: 12, color: "var(--lc-muted)" }}>
          {names.join(", ")}
        </p>
      )}
    </div>
  );
}
