# Playbook: rebrand NOVA

Goal: turn NOVA into the user's brand (name, colors, fonts, logo, copy) without breaking the layout.
Read `ai/design-system.md` first.

## 0. Collect the brand (ask only for what the user didn't give)
- Product name (e.g. "Acme").
- Brand color (one hex). Optional: a second color for the bottom of gradients.
- Optional: heading font and body font (Google Fonts names), logo SVG, one-line positioning.
If only a brand color is given, derive the rest:
- `--nova-accent-secondary`: the brand color mixed ~45% toward white (a lighter, same-hue tint).
- `--nova-accent-tint`: the brand color at ~8% on white (a very pale background tint).
Check contrast: white text on the brand color must reach 4.5:1 for button labels; if not, darken the color
slightly and tell the user.

## 1. Colors (the whole site follows these)
Edit only the `:root` block in `src/app/globals.css`:
- `--nova-accent-primary`, `--nova-accent-secondary`, `--nova-accent-tint` → brand.
- Leave neutrals (`--nova-text-*`, `--nova-background-*`, `--nova-border-*`) unless the user asks for a
  different neutral feel.
Everything that reads blue (logo mark, hero tint, gradient panels, CTA band, pricing highlight, filter states,
animated mockups) updates from these three tokens.

Image files that contain the old blue and don't read tokens. Replace `#0082DE` → accent, `#63BEFF` → secondary
and `#ECF7FF` / `#EAF6FF` → tint inside these SVGs (case-insensitive, text edit of the SVG source):
- `public/nova/logo-dark.svg`, `public/nova/logo-light.svg`, `public/nova/icons/spark.svg`,
  `public/nova/icons/check-blue.svg`, `public/nova/icons/check-white.svg`
- `public/nova/home/industry-*.svg` (six Industries illustrations)
- `public/nova/careers/chip-*.svg`
- `public/nova/mockups/novamark.svg`, `assistant.svg`, `sidebar-workspaces.svg`
- any new `.svg` a search for `0082de` (case-insensitive) finds under `public/nova/`.
**Don't touch third-party logos**, even if their blue is close: `public/nova/integrations/logo-*.svg` and
`public/nova/mockups/{salesforce,slack,notion,github,gdrive,chatgpt,claude,gemini}.*`.
Raster images (photos, blog covers) are not recolored; mention them to the user.

## 2. Name
- **Logo name first:** set `name` in `src/data/brand.ts`. The `<Logo />` (nav, footer, hero mockup) reads it:
  "Nova" draws the outlined Figma wordmark, any other name is set live in DM Sans Medium at the wordmark's size
  and tracking, so no redrawing is needed. If the user changes the heading font, the logo word follows only if
  you also change the font in `logo.tsx` (it uses `--font-dm-sans`).
- Then replace the product name in copy. Search `src/` **case-insensitively** for `nova`, and change only
  user-facing strings: JSX text, string props, `src/data/*.ts`, `metadata` in `src/app/**`. Skip identifiers,
  imports, CSS token names (`--nova-*`, `nova-*` classes), component names and file paths.
  The lowercase hits that ARE copy: e-mail addresses (`hello@nova.ai`, `privacy@nova.ai`, `security@nova.ai`,
  `solutions@nova.ai`, `nova@email.com` placeholders), the mockup URL `app.nova.ai/workspace`, the social handle
  `x.com/nova_support`. Use the user's real domain/handles if given, otherwise `<name>.ai` / `<name>_support`
  and tell the user they are placeholders.
- `src/app/layout.tsx`: `metadata.title`, `applicationName`, `openGraph.siteName`.
- Judgement calls, decided here so every agent does the same:
  - Product sub-names keep their pattern: "NOVA-Reasoning v2.4" → "<NAME>-Reasoning v2.4",
    "Nova Orchestrator" → "<Name> Orchestrator".
  - Legal entity: "NOVA Technologies Inc." → "<Name> Technologies Inc." unless the user gives the real entity.
  - All-caps eyebrow labels stay all-caps ("ABOUT NOVA" → "ABOUT <NAME>").
  - Fix articles after the swap ("a Orbit agent" → "an Orbit agent"): search for `a <Name>` when the new name
    starts with a vowel sound.
- Leave the internal prefix `nova` on tokens, classes and folders. It is the kit's namespace, invisible to
  visitors; renaming it is a large refactor for no visual gain.

## 3. Logo
- **No logo supplied:** step 2 already renamed the wordmark. The mark (the gradient rounded "n") follows the
  brand color but keeps its shape, which was drawn for Nova. Tell the user it is a placeholder mark and that they
  can send an SVG to replace it.
- **Logo SVG supplied:** replace the markup inside `src/components/nova/logo.tsx` (both `Logo` and `LogoMark`).
  Keep the component signatures, `role="img"` + `aria-label`, set the wordmark paths to `fill="currentColor"`
  and brand-colored parts to `var(--nova-accent-primary)` so they keep following the tokens. Hex values from
  the user's own logo SVG are the one allowed exception to "no new hex in components". Size is set by height
  only (`h-8`, `h-12`, `w-auto`), so the new proportions just work.
- `src/app/icon.svg` (favicon): recolor it (it holds the old blue), or replace it with the new mark.
- `src/app/opengraph-image.png` (1200×630 social preview) shows the NOVA hero. After the rebrand, replace it with a
  1200×630 screenshot of the new home page top (or tell the user it is still the old one).
- `public/nova/logo-dark.svg` / `logo-light.svg` are standalone logo files (not used by the pages): replace
  them with the new logo too.

## 4. Fonts (optional)
- `src/app/layout.tsx`: swap the `next/font/google` imports. Keep the CSS variable names `--font-geist` (body)
  and `--font-dm-sans` (display) so nothing else changes, or rename them in both `layout.tsx` and the
  `@theme inline` block.
- If the new heading font is not variable with an `opsz` axis, remove `axes: ["opsz"]`.
- After a font change, headings may wrap differently. Check the hero and section headings at 1440 / 834 / 390
  and adjust `max-w-*` on the heading if a line breaks badly. Never change the type ramp sizes.

## 5. Copy
Hero, section titles and ledes are props with defaults inside each component, and page content is in
`src/data/*.ts`. Prefer passing new copy as props from the page (`src/app/**/page.tsx`) or editing the data
files, so components stay reusable. Keep the two-tone headline pattern (title + muted tail).
Note: shared content (FAQ, pricing plans, nav, footer) exists twice on purpose: as component defaults (so a
component works with zero props in another project) and in `src/data/nova.ts` (what the pages pass). The pages
render the data file, so edit `src/data/nova.ts`; update the component defaults too so the two don't drift.

## 6. Verify
1. `npm run tokens` (refreshes `ai/tokens.json`) and `npm run catalog` if you changed a component's props or
   doc comment.
2. `npm run check` (types, lint, production build) must pass.
3. Look at the result: `npm run dev` (live reload) or, after the build, `npm run preview`
   (serves `out/` at http://localhost:4173 with clean URLs; `next start` can't serve a static export).
   Check `/`, `/pricing`, `/company` at 1440, 834 and 390 wide: no old blue left (search the page's computed
   colors for the old hex), no leftover old name, no broken wraps, buttons readable.
4. Report to the user what changed and what stays a placeholder (logo mark, domain and e-mails, raster images
   such as photos and blog covers, third-party logos).
