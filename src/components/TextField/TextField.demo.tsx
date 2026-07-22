import { useState } from "react";
import { TextField } from "./TextField";
import { IconButton } from "../IconButton/IconButton";

export default function TextFieldDemo() {
  const [name, setName] = useState("");
  const [hexv, setHexv] = useState("#FFC800");
  const valid = /^#[0-9A-Fa-f]{6}$/.test(hexv);

  return (
    <div style={{ display: "grid", gap: 20, maxWidth: 340 }}>
      <TextField
        label="File name"
        placeholder="my-grid"
        value={name}
        onChange={(e) => setName(e.target.value)}
        hint="No extension — it is added on export."
      />

      <TextField
        label="Color"
        hex
        maxLength={7}
        value={hexv}
        onChange={(e) => setHexv(e.target.value)}
        error={valid ? undefined : "Invalid format. Use #RRGGBB."}
      />

      <TextField
        label="Share link"
        readOnly
        outlined
        value="https://lacto.design/p/8f2a"
        action={<IconButton icon="content_copy" label="Copy link" size="sm" iconSize="xs" />}
      />

      <TextField label="Search" size="sm" icon="search" placeholder="Filter shapes…" />

      <TextField label="Disabled" value="—" onChange={() => {}} disabled />
    </div>
  );
}
