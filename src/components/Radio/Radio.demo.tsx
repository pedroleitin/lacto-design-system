import { useState } from "react";
import { RadioGroup } from "./Radio";

export default function RadioDemo() {
  const [fmt, setFmt] = useState("svg");
  const [fit, setFit] = useState("cover");

  return (
    <div style={{ display: "grid", gap: 32, maxWidth: 420 }}>
      <RadioGroup
        legend="Export format"
        value={fmt}
        onChange={setFmt}
        options={[
          { value: "svg", label: "SVG", hint: "Vector, scales without quality loss" },
          { value: "png", label: "PNG", hint: "Bitmap with transparency" },
          { value: "mp4", label: "MP4", hint: "Animation video", disabled: true },
        ]}
      />

      <RadioGroup
        legend="Fit"
        direction="row"
        value={fit}
        onChange={setFit}
        options={[
          { value: "cover", label: "Cover" },
          { value: "contain", label: "Contain" },
          { value: "stretch", label: "Stretch" },
        ]}
      />
    </div>
  );
}
