import { useState } from "react";
import { ColorSwatch, ColorSwatchAdd } from "./ColorSwatch";
import { TextField } from "../TextField/TextField";

export default function ColorSwatchDemo() {
  const [palette, setPalette] = useState(["#FFC800", "#E03131", "#37B24D", "#3B82F6"]);
  const [sel, setSel] = useState(0);
  const [bg, setBg] = useState("#F7F5EF");

  const setAt = (i: number, v: string) =>
    setPalette((p) => p.map((c, j) => (j === i ? v : c)));

  return (
    <div style={{ display: "grid", gap: 24, maxWidth: 380 }}>
      <div>
        <p className="lc-overline" style={{ marginBottom: 10 }}>Palette</p>
        <div className="lc-swatches">
          {palette.map((c, i) => (
            <span key={i} onClick={() => setSel(i)}>
              <ColorSwatch value={c} selected={sel === i} onChange={(v) => setAt(i, v)} />
            </span>
          ))}
          <ColorSwatchAdd onClick={() => setPalette((p) => [...p, "#FFFFFF"])} />
        </div>
      </div>

      <div>
        <p className="lc-overline" style={{ marginBottom: 10 }}>Canvas background</p>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <ColorSwatch value={bg} onChange={setBg} />
          <TextField hex maxLength={7} value={bg} onChange={(e) => setBg(e.target.value)} />
        </div>
      </div>

      <div>
        <p className="lc-overline" style={{ marginBottom: 10 }}>Round, large and read-only</p>
        <div className="lc-swatches">
          <ColorSwatch round size="lg" value="#FFC800" onChange={() => {}} />
          <ColorSwatch round size="lg" value="#414141" onChange={() => {}} />
          <ColorSwatch round value="#E03131" />
          <ColorSwatch value="#37B24D" />
        </div>
      </div>
    </div>
  );
}
