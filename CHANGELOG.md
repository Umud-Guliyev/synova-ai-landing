# Changelog

## 2.2.0

From a real one-prompt rebrand test (fresh unzip, agent follows AGENTS.md only; 53 files, check passed):

- Logo name lives in `src/data/brand.ts`. "Nova" keeps the outlined Figma wordmark; any other name is set live
  in DM Sans Medium at the same size and tracking, so a rebrand no longer means redrawing the logo. `LogoMark`
  exported for icon-size uses; the hero mockup and model picker use the components (no more hard-coded blue
  logo SVGs). Logo is sized by height only.
- `npm run preview` (and `npm start`) serves the static build in `out/` with clean URLs; `next start` can't.
- Rebrand playbook: case-insensitive name search incl. e-mails, domains and handles; fixed judgement calls
  (sub-product names, legal entity, all-caps labels, a/an); logo mark placeholder note; why FAQ/pricing content
  exists twice; favicon; verify with preview.
- SEO: `sitemap.xml`, `robots.txt` and a 1200×630 social image (`opengraph-image.png`); the site URL lives in
  `src/data/brand.ts` (`siteUrl`, from `NEXT_PUBLIC_SITE_URL`).
- AGENTS.md "First run": how to set up and show the site to a non-technical buyer, step by step.
- Mockups no longer carry old-blue fallbacks in `var()`; `ai/tokens.json` and `ai/components.md` regenerated.

## 2.1.3

Full visual review of every page against the Figma file at 1440 / 834 / 390.

- Message pages (Demo received, 404): the "Back to Home" button is centred again.
- Home tablet/phone: the hero gradient runs behind the nav (`Nav transparent`); the dashboard veil fades where
  Figma does; Features text columns use the tablet widths from the design (237 / 255 / 292).
- Nav: no hairline under the tablet/phone bar (Figma has none).
- Filter pills: a row that fits is centred below 1024px (Careers, Integrations); Integrations tablet gap 8.
- Pricing: Pro card dividers use the border token, as in Figma.
- FAQ +/− sign: smaller, heavier and centred on the question's first line.
- Forms: value/placeholder text keeps 12/16 on phone. Career bullets are small grey dots.
- Industries tablet card padding 24; Revenue Agent done check is green.
- Footer pins to the bottom on short pages (no light strip under it on phone).
- No hydration error with reduced motion on (mockups switch to the final state after hydration).

## 2.1.2

- Smooth scrolling without glitches under load: Lenis now ticks inside motion's frame loop (scroll set before
  styles are written, no forced layout each frame), no `:has()` selectors left in the stagger CSS, word reveals and
  mockup reveals animate opacity/transform only (no blur), and the mockups' step reveals are CSS transitions.
  Under 6× CPU load: frames over 50ms 41 → 2.

## 2.1.1

- Smoother scrolling: the mockups' infinite loops (pulses, spinners, caret, typing dots) run as CSS on the
  compositor, mockup timelines pause while off screen, grid reveals no longer read layout mid-scroll, and the
  smooth-scroll lock check no longer forces style recalculation. Lenis lerp 0.1.

## 2.1.0

- Smooth scrolling site-wide (`SmoothScroll`, Lenis): wheel and trackpad glide, touch stays native, anchors
  and back-to-top glide, off under reduced motion, pauses while the page is locked.
- Footer social icons in one row at every width.
- Buttons link to real pages (Start Free → /pricing, Book Demo → /book-a-demo).
- Accessibility/SEO: h1 on /pricing, heading outline fixed on Blog and Integrations (Lighthouse 100/100/100).
- Page-top entrances run on CSS (`<Stagger trigger="load">`), LCP on a slow phone 2.9s → 1.7s.

## 2.0.0

The full NOVA site, and an AI layer.

- All 15 routes from the Figma file: Home, Pricing, Company, Blog + 6 articles, Careers + 6 roles,
  Integrations, Contact, Book a Demo, Demo Received, FAQ, Privacy Policy, Terms, 404. Every section matched to
  its artboards at 1440 / 834 / 390.
- New sections: Hero with animated dashboard, logo strip, Benefits and Features with 6 animated product
  mockups, Industries, page heroes, pricing comparison, company vision / stats / leadership, blog grid and
  article, careers perks / open positions / job detail + application form, integrations grid, contact and demo
  forms, legal documents.
- DM Sans now loads as a variable font with optical sizing, which matches Figma's rendering. The old width
  workarounds are gone and every headline breaks where the file breaks.
- The brand is three tokens: the logo mark, hero tint, gradients and the mockups all follow them.
- `Button` gained the 48px `lg` size (new default) and renders a real `<button>` when given a `type`.
- AI layer: `AGENTS.md`, `ai/design-system.md`, generated `ai/components.md` and `ai/tokens.json`, playbooks
  (rebrand, add page, add section, edit content, sync from Figma), `ai/figma-map.md`, Claude Code skills, a
  Cursor rule and `PROMPTS.md`.
- New scripts: `npm run check`, `npm run tokens`, `npm run catalog`.

## 1.0.0

First release.

- Five sections ported 1:1 from the NOVA Figma library: Nav, FAQ, Pricing,
  CTA Band, Footer
- All three artboards matched exactly (390 / 834 / 1440) with the file's three
  separate type ramps
- Working behaviour on top of the static design: mobile menu sheet, FAQ
  accordion, monthly and annual pricing toggle
- Motion layer: scroll reveal, collapsing regions, sliding billing indicator,
  button and card interactions, all switched off under
  `prefers-reduced-motion`
- Every component carries its own defaults, so a single file can be copied into
  another project and still render
