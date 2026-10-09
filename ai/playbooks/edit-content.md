# Playbook: edit content (copy, pricing, posts, jobs, links)

Content is separated from layout. Change content here and the pages update; don't edit components for copy.

| What | Where |
| --- | --- |
| Nav links, footer columns, social links | `src/data/nova.ts` → `navLinks`, `footerColumns`, `socialLinks` |
| FAQ questions and answers | `src/data/nova.ts` → `faqItems` |
| Pricing plans (names, prices, features, CTA) | `src/data/nova.ts` → `plans` (`annual` is shown by default, `monthly` on toggle) |
| Blog posts (title, category, cover, body) | `src/data/blog.ts` |
| Job openings | `src/data/jobs.ts` |
| Integrations (name, category, logo, description) | `src/data/integrations.ts` |
| Legal pages (clauses) | `src/data/legal.ts` |
| Hero and section copy on a page | props on the section in `src/app/**/page.tsx` (each section also has built-in defaults) |
| Site name, SEO title template, description | `src/app/layout.tsx` → `metadata` |

Rules
- Keep headlines in the two-tone pattern: a `title` and a short `titleMuted` tail.
- Keep lengths close to the originals. Headline boxes are sized from Figma; a much longer headline wraps to an
  extra line (acceptable) but check it at 390 wide.
- New blog posts / jobs: copy an existing entry, give it a unique `slug`; the detail page is generated from it.
  Images go in `public/nova/<area>/` and are referenced as `/nova/<area>/<file>`.
- After editing, run `npm run check`.
