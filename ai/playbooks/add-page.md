# Playbook: add a page

Goal: a new route that looks like it shipped with NOVA. Read `ai/design-system.md` and `ai/components.md` first.

1. **Pick the closest existing page** as the template (list in `ai/components.md` → "Pages"). A marketing page
   with sections → `/company`; a list with filters → `/blog` or `/integrations`; a form → `/contact`;
   long text → `/privacy-policy`; a detail page from data → `/blog/[slug]`.
2. **Create the route**: `src/app/<route>/page.tsx`. Every page has the same frame:
   ```tsx
   import type { Metadata } from "next";
   import { CtaBand, Footer, Nav, PageHero } from "@/components/nova";
   import { footerColumns, navLinks, socialLinks } from "@/data/nova";

   export const metadata: Metadata = { title: "…", description: "…" };

   export default function Page() {
     return (
       <main className="flex min-h-screen flex-col">
         <Nav links={navLinks} />
         <PageHero eyebrow="…" title="…" titleMuted="…" description="…" />
         {/* sections */}
         <CtaBand />
         <Footer columns={footerColumns} social={socialLinks} />
       </main>
     );
   }
   ```
   `title` in metadata becomes "Title · NOVA" through the template in `layout.tsx`.
3. **Compose sections from existing components** first (`Benefits`, `Features`, `Industries`, `LogoStrip`,
   `Pricing`, `Faq`, grids and cards listed in `ai/components.md`). Pass copy as props. Only when nothing fits,
   follow `ai/playbooks/add-section.md`.
4. **Data**: if the page lists things (items, people, posts), put them in `src/data/<name>.ts` with a type, and
   map over them in the page or a component.
5. **Dynamic routes** (`/things/[slug]`): copy the pattern from `src/app/blog/[slug]/page.tsx`
   (`generateStaticParams`, async `params`, `generateMetadata`, `notFound()`). This is Next 16: read the guide in
   `node_modules/next/dist/docs/` before writing route code.
6. **Link it**: add it to `navLinks` and/or `footerColumns` in `src/data/nova.ts` if it should be reachable.
7. **Verify**: `npm run check`, then open the page at 1440, 834 and 390 wide. Hero padding, section padding and
   headline wraps should look like the neighbouring pages.
