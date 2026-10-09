# Playbook: add a section

Goal: a new section that is indistinguishable from the ones NOVA ships. Read `ai/design-system.md` first.

1. **Check the catalog** (`ai/components.md`). Many "new" sections are an existing one with different props
   (e.g. `Features` rows with other copy and visuals, `Benefits` with other cards, `Industries` with other items).
2. **File**: `src/components/nova/<kebab-name>.tsx`, component `PascalName`, exported from
   `src/components/nova/index.ts` together with its props type.
3. **Skeleton** (copy the structure of `benefits.tsx`):
   ```tsx
   export type ThingProps = { eyebrow?: ReactNode; title?: ReactNode; titleMuted?: ReactNode; items?: Item[] };
   const DEFAULT_ITEMS: Item[] = [/* real-looking content, no lorem ipsum */];

   /** What it is. Figma: <node id> if it comes from the file. */
   export function Thing({ eyebrow = "…", title = "…", titleMuted = "…", items = DEFAULT_ITEMS }: ThingProps) {
     return (
       <section className="w-full py-8 md:py-10 lg:py-16">
         <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-5 md:gap-12 md:px-10 lg:px-[100px]">
           {/* Stagger: eyebrow → heading (word by word) come in one after another */}
           <Stagger className="flex flex-col items-start gap-4">
             <Eyebrow>{eyebrow}</Eyebrow>
             <Heading muted={titleMuted}>{title}</Heading>
           </Stagger>
           {/* cards: each one reveals as it scrolls in, row by row, left to right */}
           <Stagger as="ul" mode="grid" className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
             {items.map((item) => <li key={item.id}>{/* card */}</li>)}
           </Stagger>
         </div>
       </section>
     );
   }
   ```
4. **Rules** (from the design system):
   - Tokens and ramp classes only; no hex values, no raw font sizes that exist in the ramp.
   - Section padding 32 / 40 / 64; eyebrow → H2 → lede with gap 16; content gap 40 (phone) / 48 (tablet+).
   - Cards: `bg-nova-bg rounded-nova-md` (16) with padding 20–32; panels: blue gradient, radius 16/24.
   - Grids: 3 → 2/1 → 1 columns across desktop → tablet → phone, gap 16–24.
   - Dark variant: `bg-nova-inverse`, `Eyebrow tone="dark"`, text `text-nova-text-inverse` /
     `text-nova-text-inverse-secondary`, borders `border-nova-border-inverse`.
   - Motion: every section staggers in (see `ai/design-system.md` §6): `<Stagger>` around text blocks,
     `<Stagger mode="grid">` around card lists, `data-nova-item` on extra pieces (buttons row, media).
   - Interactive? Add `"use client"` and keep state local.
5. **Use it** on a page, passing copy as props.
6. **Verify**: `npm run check`, then look at it at 1440, 834 and 390 wide next to a neighbouring section.
   Headline and body sizes must match neighbours exactly.
