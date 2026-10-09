// Exports the design tokens from src/app/globals.css (the single source of
// truth) to ai/tokens.json in the W3C Design Tokens (DTCG) format, so the same
// values can be imported into Figma (Tokens Studio, variables plugins) or read
// by other tools. Run after editing tokens:  npm run tokens
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const css = readFileSync(new URL("../src/app/globals.css", import.meta.url), "utf8");
const root = css.match(/:root\s*{([\s\S]*?)\n}/);
if (!root) throw new Error("No :root block found in globals.css");

const tokens = {};
const typeOf = (name, value) => {
  if (/^(#|rgb|hsl|color-mix)/.test(value)) return "color";
  if (name.startsWith("ease")) return "cubicBezier";
  if (name.startsWith("dur")) return "duration";
  if (/px$/.test(value)) return "dimension";
  return "string";
};

for (const [, name, value] of root[1].matchAll(/--nova-([\w-]+):\s*([^;]+);/g)) {
  // --nova-text-primary -> text.primary ; --nova-surface-inverse-raised -> surface.inverse-raised
  const [group, ...rest] = name.split("-");
  const key = rest.join("-") || "default";
  const type = typeOf(group, value.trim());
  let v = value.trim();
  if (type === "cubicBezier") v = v.replace(/cubic-bezier\(|\)/g, "").split(",").map(Number);
  (tokens[group] ??= {})[key] = { $type: type, $value: v, $extensions: { css: `--nova-${name}` } };
}

mkdirSync(new URL("../ai/", import.meta.url), { recursive: true });
writeFileSync(new URL("../ai/tokens.json", import.meta.url), JSON.stringify(tokens, null, 2) + "\n");
const count = Object.values(tokens).reduce((n, g) => n + Object.keys(g).length, 0);
console.log(`ai/tokens.json: ${count} tokens in ${Object.keys(tokens).length} groups`);
