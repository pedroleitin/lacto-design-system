import { useToast } from "./Toast";
import { Button } from "../Button/Button";

export default function ToastDemo() {
  const { show, toasts } = useToast();

  return (
    <>
      {toasts}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <Button onClick={() => show("Palette reordered")}>Neutral</Button>
        <Button onClick={() => show("Exported as SVG", "success")}>Success</Button>
        <Button onClick={() => show("Invalid HEX format", "danger")}>Error</Button>
        <Button onClick={() => { show("First"); show("Second", "success"); }}>
          Stack two
        </Button>
      </div>
    </>
  );
}
