import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // The animated mockups are framework-agnostic illustrations: plain <img>
    // for tiny inline logos/avatars and one shared Inter stylesheet link.
    files: ["src/components/nova/mockups/**"],
    rules: {
      "@next/next/no-img-element": "off",
      "@next/next/no-page-custom-font": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Internal QA scripts and archived tooling; not part of the kit.
    "qa/**",
    "figma-OBSOLETE-working-copy/**",
    "dist-kit/**",
  ]),
]);

export default eslintConfig;
