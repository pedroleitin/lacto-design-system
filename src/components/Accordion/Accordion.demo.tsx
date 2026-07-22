import { useState } from "react";
import { Accordion } from "./Accordion";
import { Slider } from "../Slider/Slider";
import { Switch } from "../Switch/Switch";
import { ColorSwatch, ColorSwatchAdd } from "../ColorSwatch/ColorSwatch";

export default function AccordionDemo() {
  const [cols, setCols] = useState(8);
  const [caps, setCaps] = useState(true);

  return (
    <div style={{ maxWidth: 320, background: "var(--lc-panel)", borderRadius: 15, overflow: "hidden" }}>
      <Accordion
        single
        defaultOpen={["grid"]}
        items={[
          {
            id: "grid",
            title: "Grid",
            content: (
              <>
                <Slider label="Columns" min={1} max={20} value={cols} onChange={setCols} />
                <Slider label="Spacing" min={0} max={80} suffix="px" value={12} onChange={() => {}} />
              </>
            ),
          },
          {
            id: "colors",
            title: "Colors",
            content: (
              <div className="lc-swatches">
                {["#FFC800", "#E03131", "#414141"].map((c) => (
                  <ColorSwatch key={c} value={c} onChange={() => {}} />
                ))}
                <ColorSwatchAdd />
              </div>
            ),
          },
          {
            id: "fx",
            title: "Effects",
            content: (
              <div style={{ marginLeft: -20, marginRight: -20 }}>
                <Switch label="Round caps" checked={caps} onChange={setCaps} />
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
