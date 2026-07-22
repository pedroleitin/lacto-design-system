import { useState } from "react";
import { IconButton } from "./IconButton";

export default function IconButtonDemo() {
  const [muted, setMuted] = useState(false);
  const [fav, setFav] = useState(false);
  const row = { display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" as const };

  return (
    <div style={{ display: "grid", gap: 20 }}>
      <div style={row}>
        <IconButton icon="undo" label="Undo" />
        <IconButton icon="redo" label="Redo" />
        <IconButton icon="pan_tool" label="Pan" />
        <IconButton icon="fit_screen" label="Fit to screen" />
      </div>

      <div style={row}>
        <IconButton icon="settings" label="Settings" variant="solid" />
        <IconButton icon="download" label="Download" variant="solid" />
        <IconButton icon="add" label="Add" variant="pill" round />
      </div>

      <div style={row}>
        <IconButton
          round
          icon={muted ? "volume_off" : "volume_up"}
          label={muted ? "Unmute" : "Mute"}
          active={muted}
          onClick={() => setMuted((v) => !v)}
        />
        <IconButton
          round
          icon="favorite"
          filled={fav}
          label="Favorite"
          active={fav}
          onClick={() => setFav((v) => !v)}
        />
        <IconButton icon="delete" label="Delete" iconSize="sm" size="sm" />
      </div>
    </div>
  );
}
