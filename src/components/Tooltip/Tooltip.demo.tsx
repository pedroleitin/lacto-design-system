import { Button } from "../Button/Button";
import { IconButton } from "../IconButton/IconButton";

/* The <Tooltip /> singleton is already mounted at the root of the docs site,
   so a plain `title` on any element is enough. */
export default function TooltipDemo() {
  return (
    <div style={{ display: "grid", gap: 20 }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <Button title="Undoes the last action">Hover me</Button>
        <Button variant="pill" title="Also appears on Tab focus">Or press Tab</Button>
        <IconButton icon="palette" label="Color palette" />
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <Button title="Long hints wrap onto several lines, capped at 260px wide and centered.">
          Dica longa
        </Button>
      </div>

      <p style={{ marginTop: 40, color: "var(--lc-muted)", fontSize: 12 }}>
        A trigger near the top of the window flips the bubble below automatically.
      </p>
    </div>
  );
}
