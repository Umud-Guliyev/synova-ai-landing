# NOVA Figma ↔ code map

The code was built 1:1 from the NOVA Figma file. Use this map when you work with the Figma file through an MCP
server (e.g. Figma's official MCP: `get_design_context`, `get_screenshot`, `get_metadata`): look up the frame,
read it, and change the matching code. Node ids below are from the original NOVA file; in your duplicate they are
usually identical.

Figma file structure: page **00 · System** (tokens, text styles, components), page **01 · Website** (one section
per page, each with Desktop 1440 / Tablet 834 / Phone 390 frames), pages 02–06 (social media mockups).

## Tokens and styles

| Figma | Code |
| --- | --- |
| Variable collection **Colors** (`Text/*`, `Background/*`, `Surface/*`, `Border/*`, `Accent/*`) | `:root` in `src/app/globals.css` (`--nova-text-*`, `--nova-background-*`, `--nova-surface-*`, `--nova-border-*`, `--nova-accent-*`) |
| Variable collection **Grid** (`Space/*`, `Radius/*`) | `--nova-space-*`, `--nova-radius-*` |
| Text styles `Web/*`, `Tablet/*`, `Mobile/*` (H1, H2, H4, Body, Body S, Label, Label S, Eyebrow, Caption) | ramp classes `nova-h1` … `nova-caption` (one class covers all three styles; see `ai/design-system.md` §2) |
| Blue gradient fills (`#0082DE → #63BEFF`) | `bg-linear-to-b from-nova-accent to-nova-accent-secondary` |

## Components (page 00 · System)

| Figma component | Node (Desktop / Tablet / Phone) | Code |
| --- | --- | --- |
| Button / Primary, Button / Secondary | `49:7533`, `49:7534` | `Button` (`variant="primary" \| "secondary"`) |
| Nav / Desktop, Tablet, Phone | `49:7615` / `65:3081` / `65:2985` | `Nav` |
| Pricing / Desktop, Tablet, Phone | `66:5375` / `66:5704` / `66:9041` | `Pricing` |
| FAQ / Desktop, Tablet, Phone | `49:7406` / `66:5175` / `66:9310` | `Faq` |
| CTA Band / Desktop, Tablet, Phone | `49:7741` / `66:6116` / `66:11373` | `CtaBand` |
| Footer / Desktop, Tablet, Phone | `49:7883` / `66:6388` / `66:11667` | `Footer` |
| "Introduce" pill (not a component in Figma) | e.g. `21:6393` | `Eyebrow` (`tone="dark"` for `#2d2f2d`) |
| Filter pills (frames) | e.g. `73:7518` | `FilterPills` |

## Pages (page 01 · Website)

| Figma section | Frames (Desktop / Tablet / Phone) | Route | Page file |
| --- | --- | --- | --- |
| Home | `3:1518` / `65:1728` / `65:1920` | `/` | `src/app/page.tsx` |
| Pricing | `48:4485` / `66:11768` / `66:13330` | `/pricing` | `src/app/pricing/page.tsx` |
| Company | `63:7938` / `67:2956` / `67:3706` | `/company` | `src/app/company/page.tsx` |
| Blog | `67:6003` / `67:6709` / `67:6862` | `/blog` | `src/app/blog/page.tsx` |
| Article | `68:7383` / `68:8089` / `68:8242` | `/blog/[slug]` | `src/app/blog/[slug]/page.tsx` |
| Careers | `68:8763` / `68:9469` / `68:9622` | `/careers` | `src/app/careers/page.tsx` |
| Career Details | `68:10143` / `68:10849` / `68:11002` | `/careers/[slug]` | `src/app/careers/[slug]/page.tsx` |
| Integrations | `68:12257` / `68:12963` / `68:13116` | `/integrations` | `src/app/integrations/page.tsx` |
| Contact | `84:10507` / `84:10604` / `84:10700` | `/contact` | `src/app/contact/page.tsx` |
| FAQ | `70:5440` / `70:6146` / `70:6299` | `/faq` | `src/app/faq/page.tsx` |
| Book a Demo | `89:12108` / `89:12205` / `89:12302` | `/book-a-demo` | `src/app/book-a-demo/page.tsx` |
| Privacy Policy | `68:18101` / `68:18807` / `68:18960` | `/privacy-policy` | `src/app/privacy-policy/page.tsx` |
| Terms & Conditions | `68:19683` / `68:19737` / `68:19791` | `/terms` | `src/app/terms/page.tsx` |
| 404 | `68:20113` (desktop) | any unknown URL | `src/app/not-found.tsx` |
| Demo Received | `84:11827` (desktop) | `/demo-received` | `src/app/demo-received/page.tsx` |

Home sections: Hero `14:18` → `Hero` (dashboard = `mockups/hero-dashboard.tsx`), Founders `19:2107` →
`LogoStrip`, Benefits `21:6194` → `Benefits` (panels = `mockups/model-picker`, `context-assembly`,
`revenue-agent`), Features `49:7722` → `Features` (`mockups/workspace-chat`, `semantic-search`,
`workflow-pipeline`), Industries `46:1369` → `Industries`. Every inner page opens with a "Page Hero" frame →
`PageHero`. Component doc comments in `src/components/nova/*.tsx` name their exact source nodes.

## Known differences between the file and the code (intentional)

- Hidden frames named "7" (an old Industries version) sit on several desktop pages; they are not built.
- Inner-page CTA Band instances in Figma are 560 tall with a 3-line headline: a stale instance layout (their own
  background image is still 380 tall). The code uses the master component (508, 2 lines).
- Tablet and phone Home "Benefits" headlines in Figma still carry placeholder copy ("Built around your workflow…");
  the code uses the desktop copy everywhere.
- The first blog article in Figma contains privacy-policy text pasted by mistake; the code uses the article copy.
- Interaction states the file doesn't draw (mobile menu open, monthly pricing, form success/error, empty filter
  results) were designed in the same language and are documented in the component doc comments.
- The phone logo row is a ticker; in Figma it is a static row wider than the screen.
- Footer social icons sit in one row at every width with no divider line (designer's change after the file:
  Figma tablet stacks them vertically under a blue line, phone has a short blue line before them).
