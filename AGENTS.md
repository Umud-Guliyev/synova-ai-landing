<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# NOVA kit — instructions for AI coding agents

NOVA is a production Next.js + Tailwind v4 marketing site for an AI SaaS product (15 routes), built 1:1 from
its Figma file. You are probably here to rebrand it, change content, or add pages and sections. The kit is set
up so you can do that without the result drifting from the design.

## First run (the person may not be technical)
If the user asks you to set up, start or show the site (for example "Set up NovaOS and show me the website"):
1. Check Node.js 20.9+ (`node -v`). If it's missing, tell them in one plain sentence to install the LTS version
   from https://nodejs.org, then continue once they say it's done.
2. Run `npm install`, then start `npm run dev` in the background and wait until it's ready.
3. Give them http://localhost:3000 (open it in their browser if you can).
4. Ask what they'd like to change: the name and brand color, the text, pricing, or pages. Offer those as
   simple options.
Talk in plain language, no jargon, one step at a time. After each change, tell them to refresh the browser
page, and keep `npm run check` passing.

## Read first (in this order)
1. `ai/design-system.md` — tokens, type ramp, breakpoints, section anatomy, rules. **Mandatory before any visual change.**
2. `ai/components.md` — every component with its props and where it's used. Reuse before you write markup.
3. The playbook for the task:
   - rebrand (name, colors, fonts, logo) → `ai/playbooks/rebrand.md`
   - add a page → `ai/playbooks/add-page.md`
   - add a section → `ai/playbooks/add-section.md`
   - change copy, prices, posts, jobs, links → `ai/playbooks/edit-content.md`
   - bring a Figma change into the code → `ai/playbooks/sync-from-figma.md` (+ `ai/figma-map.md`)
   Claude Code users get the same playbooks as skills in `.claude/skills/` (`nova-rebrand`, `nova-add-page`,
   `nova-add-section`, `nova-edit-content`, `nova-sync-figma`).

## Project map
- `src/app/globals.css` — **all design tokens** (`:root`) + Tailwind theme + type ramp classes. Single source of truth.
- `src/app/layout.tsx` — fonts (Geist + DM Sans variable with `opsz`), site metadata.
- `src/app/**/page.tsx` — routes. Pages only compose sections and pass data.
- `src/components/nova/` — the kit: sections, cards, forms, primitives, all exported from `index.ts`.
- `src/components/nova/mockups/` — animated product-UI mockups (`motion/react`).
- `src/data/` — all content (links, FAQ, plans, posts, jobs, integrations, legal).
- `public/nova/` — images and illustrations, per area.
- `ai/` — design system docs, component catalog, playbooks, `tokens.json` (generated).

## Non-negotiables
- Colors, radii, spacing and motion come from tokens (`--nova-*` / `nova-*` classes). No new hex values in
  components. Brand = `--nova-accent-primary` + `--nova-accent-secondary`.
- Text uses the ramp classes (`nova-h1`, `nova-h2`, `nova-h4`, `nova-body`, …), which already handle phone /
  tablet / desktop. Don't set font sizes that exist in the ramp.
- Every change must work at 390, 834 and 1440 wide (breakpoints `md:` 768, `lg:` 1024).
- Keep components self-contained (typed props + defaults) and content in `src/data/`.
- Don't add UI or CSS libraries. Don't edit the `nextjs-agent-rules` block above.

## Commands
- `npm run dev` — dev server (http://localhost:3000).
- `npm run preview` — serve the production build in `out/` (http://localhost:4173), after `npm run build`.
- `npm run check` — typecheck + lint + production build. Must pass before you say you're done.
- `npm run tokens` — regenerate `ai/tokens.json` after editing tokens.
- `npm run catalog` — regenerate `ai/components.md` after adding or changing components.

## Done means
`npm run check` passes, you looked at the affected pages at the three widths, and you told the user what you
changed and anything you couldn't do.
