# NOVA design system — rules for humans and AI agents

Read this before changing anything visual. NOVA was ported 1:1 from its Figma file and every page matches
the three Figma artboards (1440 / 834 / 390) to within a couple of pixels. These rules are what keeps it
that way when you, or an AI agent, extend it.

## 1. Tokens are the only source of color, radius, spacing and motion

All design tokens live in **one place**: the `:root` block of `src/app/globals.css`. Tailwind reads them
through `@theme inline` in the same file, so they are available as classes.

| Token (CSS) | Tailwind class | Value | Use for |
| --- | --- | --- | --- |
| `--nova-text-primary` | `text-nova-text` | #161816 | Headings, primary text, dark icons |
| `--nova-text-secondary` | `text-nova-text-secondary` | #757677 | Body copy, descriptions, meta |
| `--nova-text-muted` | `text-nova-text-muted` | #a7a9ac | Second half of two-tone headings, placeholders |
| `--nova-text-inverse` | `text-nova-text-inverse` | #ffffff | Text on dark or accent fills |
| `--nova-text-inverse-secondary` | `text-nova-text-inverse-secondary` | white 60% | Body copy on dark sections |
| `--nova-background-primary` | `bg-nova-bg` | #ffffff | Cards, pills, inputs |
| `--nova-background-secondary` | `bg-nova-bg-secondary` | #f7f7f7 | **Page background** (body) |
| `--nova-surface-primary` | `bg-nova-surface` | #ffffff | Surfaces on the page bg |
| `--nova-surface-secondary` | `bg-nova-surface-secondary` | #f3f4f2 | Nested surfaces, hovers |
| `--nova-surface-inverse` | `bg-nova-inverse` | #161816 | Dark sections (Industries) |
| `--nova-surface-inverse-raised` | `bg-nova-inverse-raised` | #2d2f2d | Pills and chips on dark sections |
| `--nova-accent-primary` | `bg-nova-accent` / `text-nova-accent` | #0082de | **Brand color**: gradients, active states, links |
| `--nova-accent-secondary` | `…-nova-accent-secondary` | #63beff | Bottom of every brand gradient |
| `--nova-accent-soft` | `bg-nova-soft` | #161816 | Primary buttons, active filter pill |
| `--nova-accent-tint` | `bg-nova-tint` | #ecf7ff | Tinted backgrounds behind accent content |
| `--nova-border-default` | `border-nova-border` | #e4e7e2 | Card borders, dividers, inputs |
| `--nova-border-inverse` | `border-nova-border-inverse` | white 10% | Hairlines on dark sections |
| `--nova-radius-12/16/24/999` | `rounded-nova-sm/md/lg/pill` | 12/16/24/999 | Chips / cards / big panels / pills |
| `--nova-space-*` | Tailwind spacing (`gap-4` = 16) | 4…64 | Spacing follows the 4px grid |
| `--nova-ease`, `--nova-dur*` | `ease-nova`, `duration-[var(--nova-dur)]` | | All transitions |

**Rules**
- Never write a hex, rgb() or px radius that duplicates a token. If a value is missing, add a token to
  `:root` (and to `@theme inline` if it needs a class), then run `npm run tokens`.
- The brand is `--nova-accent-primary` + `--nova-accent-secondary`. Everything blue in the kit, including the
  logo mark, the hero tint, every gradient panel and the animated mockups, reads these two tokens. Changing
  them rebrands the whole site. (Exceptions: the six Industries illustrations and third-party logos are
  image files; see `ai/playbooks/rebrand.md`.)
- `ai/tokens.json` is generated from `globals.css` by `npm run tokens`. Don't edit it by hand.

## 2. Type: use the ramp classes, not font sizes

Headings are **DM Sans** (`--font-display`), everything else is **Geist** (`--font-sans`). The Figma file has
three ramps (Mobile / Tablet / Web); each class below steps through all three at 768px and 1024px.

| Class | Phone | Tablet (≥768) | Desktop (≥1024) | Font |
| --- | --- | --- | --- | --- |
| `nova-h1` | 34/39 | 46/51 | 62/68 | DM Sans 600 |
| `nova-h2` | 27/32 | 36/41 | 46/52 | DM Sans 500 |
| `nova-h2-italic` | same as h2, italic | | | DM Sans 500 italic |
| `nova-h4` | 17/23 | 19/25 | 21/27 | DM Sans 500 |
| `nova-eyebrow` | 11/14 | 13/16 | 14/16 | Geist 600 |
| `nova-body` | 14/22 | 15/24 | 16/26 | Geist 400 |
| `nova-body-s` | 13/20 | 13/20 | 13/20 | Geist 400 |
| `nova-label` | 15/19 | 15/19 | 15/19 | Geist 500 |
| `nova-label-s` | 13/20 | 12/16 | 13/17 | Geist 500 |
| `nova-caption` | 10/15 | 11/16 | 12/17 | Geist 400 |

- Letter spacing is 0 everywhere.
- DM Sans must stay loaded as a **variable font with the `opsz` axis** (`src/app/layout.tsx`) and the classes use
  `font-optical-sizing: auto`. That is how Figma renders it; with a static cut the headlines are ~12% wider
  and wrap a line early.
- One-off sizes that exist in the design (e.g. the legal clause title 30/36, blog card title 30/36 italic) are
  written as Tailwind arbitrary values next to a comment naming the Figma style.

## 3. Layout

- Breakpoints: **phone** < 768 (artboard 390), **tablet** `md:` 768–1023 (artboard 834), **desktop** `lg:` ≥ 1024
  (artboard 1440). Always design all three.
- Content column: `mx-auto w-full max-w-[1440px] px-5 md:px-10 lg:px-[100px]` (the `Container` component) →
  350 / 754 / 1240 wide.
- Section vertical padding: **32 / 40 / 64** (phone / tablet / desktop) for content sections; page heroes use
  **64 / 64 / 80**.
- Page background is `#f7f7f7`; sections without a fill show it. White is for cards and pills.
- Grids: 3 columns on desktop, 2 or 1 on tablet, 1 on phone (check the section's Figma artboard).

## 4. Section anatomy (the NOVA pattern)

Almost every section opens with the same stack, gap 16:

1. `Eyebrow` pill: NOVA spark mark + UPPERCASE label (`tone="dark"` on dark sections).
2. Two-tone H2: the first part in `text-nova-text`, the tail in `text-nova-text-muted`
   (`<Heading muted="…">`, or `title` + `titleMuted` props).
3. One-paragraph lede in `nova-body text-nova-text-secondary`.

Then the content (cards, grid, form). Keep this order and these gaps when you add sections.

Visual panels are **blue gradient panels** (`bg-linear-to-b from-nova-accent to-nova-accent-secondary`,
radius 16 or 24) with a white product-UI card inside. The animated ones live in `src/components/nova/mockups/`.

## 5. Components before markup

Use the existing components (catalog: `ai/components.md`) before writing new markup. New components go in
`src/components/nova/<kebab-name>.tsx` and must:
- be self-contained: typed props, a `DEFAULT_*` content constant so `<Thing />` renders with zero props, and
  imports limited to `react`, sibling kit files and `motion/react` (mockups only);
- carry a doc comment saying what it is and which Figma node it comes from;
- be exported from `src/components/nova/index.ts`;
- use tokens and ramp classes only (sections 1–2).

Content that repeats (posts, jobs, integrations, FAQ, plans, nav/footer links) lives in `src/data/*.ts`, typed,
and is passed in as props. Pages in `src/app/**/page.tsx` only compose sections and pass data.

## 6. Motion

**Every section enters with an element-by-element stagger — never a whole block at once.**

- Wrap a section's text block (or its text + media row) in `<Stagger>`. Items reveal in DOM order: eyebrow →
  heading → text → buttons → media, `--nova-stagger` (80ms) apart, each rising `--nova-rise` (24px) and fading in
  over `--nova-dur-reveal` (900ms) on `--nova-ease-reveal`.
- `Eyebrow`, `Heading` and `Lede` mark themselves as items. Mark anything else with `data-nova-item`.
- Section headings reveal **word by word**: add `data-nova-item` + the `nova-words` class and wrap the text in
  `splitWords(...)` (`Heading` already does). Words rise 12px and un-blur, `--nova-word-step` (35ms) apart.
- Card grids and lists use `<Stagger mode="grid">`: its direct children reveal as they scroll in, delayed by their
  column, so each row sweeps left to right at any breakpoint. Key the Stagger on the active filter when a filter
  swaps the list, so new cards animate in.
- **Top of the page** (the first block under the nav): use `<Stagger trigger="load">` and give each item its order
  in the markup with `style={itemIndex(n)}`. That entrance is pure CSS and starts on first paint, so the main
  headline (the LCP element) doesn't wait for JavaScript. Everything below the fold uses the default scroll trigger.
- `<Reveal>` still exists for a single element that should fade in on its own.
- Buttons (`.nova-btn`): color shift, 1px lift on hover, slight press on active, arrow nudge. Never scale up.
- **Smooth scrolling**: `<SmoothScroll />` (Lenis) is mounted once in `src/app/layout.tsx`. Wheel and trackpad
  glide (`lerp` 0.085), touch stays native, reduced motion turns it off, `#anchor` / `#` links glide, and it pauses
  while a menu or modal sets `overflow: hidden`. To scroll from code use `window.novaLenis?.scrollTo(target)`.
  Elements that must keep their own scroll (a scrollable panel, a map) get `data-lenis-prevent`.
- **Performance rules (smooth scrolling runs on the main thread, so these are mandatory):**
  animate only `opacity` and `transform` (no `filter`/blur, no layout properties); no `:has()` in CSS; entrance
  and step reveals are CSS transitions (the mockups' `Reveal` is a CSS transition, not a motion animation); no
  layout reads (`offsetLeft`, `getBoundingClientRect`, `getComputedStyle`) in scroll or observer callbacks.
- Infinite loops inside mockups (spinners, pulses, blinking carets) are CSS keyframes (`nova-mk-*` in
  `globals.css`), never `repeat: Infinity` in `motion`: JS loops write styles every frame and make scrolling janky.
- All timing is tokens in `:root` (`--nova-stagger`, `--nova-rise`, `--nova-dur-reveal`, `--nova-ease-reveal`,
  `--nova-dur-word`, `--nova-word-step`). Change the feel of the whole site there.
- `prefers-reduced-motion` and no-JavaScript both show everything immediately (handled in `globals.css`); new
  motion must respect reduced motion too.

## 7. Accessibility

- One `h1` per page (the hero). Section titles are `h2`, card titles `h3`.
- Interactive elements are real `<a>` / `<button>` / form controls, with visible focus:
  `outline-offset-2 focus-visible:outline-2 focus-visible:outline-nova-accent`.
- Images have `alt` (decorative ones `alt=""`). Forms have labels, required state and error text.

## 8. Don'ts

- Don't hardcode colors, radii or font sizes that exist as tokens or classes.
- Don't add a UI library or CSS framework. Tailwind + tokens only.
- Don't change the type ramp or the section paddings to "fix" one page; if something doesn't fit, check the
  Figma artboard first.
- Don't remove the `BEGIN/END:nextjs-agent-rules` block in `AGENTS.md`; Next regenerates it.
