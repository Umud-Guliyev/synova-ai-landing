// Serves the static export in `out/` the way a host does: clean URLs
// (`/pricing` → `pricing.html`), trailing slashes, and the 404 page.
// `next start` can't serve a static export, so use this after `npm run build`:
//
//   npm run preview            # http://localhost:4173
//   PORT=5000 npm run preview
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const root = join(process.cwd(), "out");
const port = Number(process.env.PORT) || 4173;

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
};

const isFile = async (p) => {
  try {
    return (await stat(p)).isFile();
  } catch {
    return false;
  }
};

async function resolve(pathname) {
  const clean = normalize(decodeURIComponent(pathname)).replace(/^(\.\.[/\\])+/, "").replace(/\/+$/, "");
  const base = join(root, clean);
  for (const candidate of [base, `${base}.html`, join(base, "index.html")]) {
    if (await isFile(candidate)) return candidate;
  }
  return null;
}

try {
  await stat(root);
} catch {
  console.error("No out/ folder. Run `npm run build` first.");
  process.exit(1);
}

createServer(async (req, res) => {
  const { pathname } = new URL(req.url ?? "/", "http://localhost");
  const file = await resolve(pathname);
  const status = file ? 200 : 404;
  const path = file ?? join(root, "404.html");
  try {
    const body = await readFile(path);
    res.writeHead(status, { "content-type": types[extname(path)] ?? "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(404).end("Not found");
  }
}).listen(port, () => console.log(`Preview: http://localhost:${port}`));
