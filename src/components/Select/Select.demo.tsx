import { useState } from "react";
import { Select } from "./Select";

export default function SelectDemo() {
  const [size, setSize] = useState("4");
  const [ease, setEase] = useState("ease-out");
  const [fmt, setFmt] = useState("svg");

  return (
    <div style={{ display: "grid", gap: 20, maxWidth: 420 }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <Select
          prefix="Size" value={size} onChange={setSize}
          options={["2", "4", "8", "16", "32"].map((v) => ({ value: v, label: `${v} × ${v}` }))}
        />
        <Select
          prefix="Easing" value={ease} onChange={setEase}
          options={[
            { value: "linear", label: "linear" },
            { value: "ease-in", label: "ease in" },
            { value: "ease-out", label: "ease out" },
            { value: "spring", label: "spring" },
          ]}
        />
      </div>

      <Select
        block prefix="Format" value={fmt} onChange={setFmt}
        options={[
          { value: "svg", label: "SVG", icon: "shapes" },
          { value: "png", label: "PNG", icon: "image" },
          { value: "mp4", label: "MP4", icon: "movie" },
        ]}
      />

      <p style={{ fontSize: 12, color: "var(--lc-muted)" }}>
        Teclado: <code>↓</code> abre · <code>↑↓</code> navega · <code>Enter</code> escolhe · <code>Esc</code> fecha.
      </p>
    </div>
  );
}
