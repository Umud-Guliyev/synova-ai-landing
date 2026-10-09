# Playbook: bring a Figma change into the code

Use when the user edited the NOVA Figma file (or their duplicate) and wants the site to match, and a Figma MCP
server is connected (tools like `get_design_context`, `get_screenshot`, `get_metadata`).

1. **Find the target.** Ask for the Figma link to the changed frame/node if you don't have it (the `node-id` in
   the URL). Look it up in `ai/figma-map.md` to find the route, section component and file.
2. **Read, don't write.** Call `get_screenshot` and `get_design_context` on the node (and `get_variable_defs` if
   colors or type changed). Treat Figma as read-only unless the user explicitly asks you to edit it.
3. **Classify the change** and edit the right layer:
   - a variable value (color, radius, spacing) → the token in `src/app/globals.css` `:root`, then `npm run tokens`;
   - a text style → the matching ramp class in `globals.css` (it affects every use: confirm with the user);
   - copy → the page's props or `src/data/*.ts`;
   - layout or a new element inside a section → that section's component in `src/components/nova/`;
   - a new section or page → `add-section.md` / `add-page.md`.
4. **Translate, don't paste.** The MCP returns React + Tailwind with absolute values. Map every value to tokens and
   ramp classes (`ai/design-system.md`); never paste raw hex, px font sizes or absolute positioning.
5. **All three artboards.** Read the Tablet and Phone frames of the same section too (`ai/figma-map.md`), and apply
   the breakpoint differences with `md:` / `lg:`.
6. **Verify** with `npm run check`, then compare the page at 1440 / 834 / 390 with `get_screenshot` of each frame.
   Report what changed and anything in Figma you could not map.
