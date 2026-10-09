import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Every page is prerendered and nothing needs a server, so the build is a
  // plain folder of HTML/CSS/JS (`out/`) that any static host can serve:
  // Cloudflare Pages, Netlify, GitHub Pages, S3, nginx...
  output: "export",
  // The kit lives in its own repo; pin the workspace root so Turbopack does not
  // walk up to a parent lockfile.
  turbopack: { root: __dirname },
};

export default nextConfig;
