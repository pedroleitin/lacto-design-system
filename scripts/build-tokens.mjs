/** tokens.json -> src/tokens/tokens.css. Prefixo --lc-. Rode: npm run tokens */
import { readFileSync, writeFileSync } from "node:fs";

const t = JSON.parse(readFileSync(new URL("../tokens.json", import.meta.url), "utf8"));
const skip = (k) => k.startsWith("$") || k.startsWith("_");

/** Grupos "planos": valor é string. Grupos de cor: valor é {light,dark}. */
const flat = (group, prefix) =>
  Object.entries(t[group] ?? {})
    .filter(([k, v]) => !skip(k) && typeof v === "string")
    .map(([k, v]) => `  --lc-${prefix}${k}: ${v};`)
    .join("\n");

const colors = (mode) =>
  Object.entries(t.color)
    .filter(([k, v]) => !skip(k) && v && typeof v === "object")
    .map(([k, v]) => `  --lc-${k}: ${v[mode]};`)
    .join("\n");

const css = `/* GERADO por scripts/build-tokens.mjs — não editar à mão. Fonte: tokens.json */

:root,
[data-theme="light"] {
${colors("light")}

${flat("font", "font-")}
${flat("font-size", "text-")}
${flat("font-weight", "weight-")}
${flat("letter-spacing", "tracking-")}
${flat("radius", "radius-")}
${flat("space", "space-")}
${flat("size", "size-")}
${flat("icon-size", "icon-")}
${flat("icon-weight", "icon-weight-")}
${flat("motion", "motion-")}
${flat("press", "press-")}
${flat("blur", "blur-")}
${flat("z", "z-")}
${flat("elevation", "shadow-")}
${flat("focus", "focus-")}
}

[data-theme="dark"] {
${colors("dark")}
}
`;

writeFileSync(new URL("../src/tokens/tokens.css", import.meta.url), css);
console.log("src/tokens/tokens.css gerado");
