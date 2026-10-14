# Tax review interface

The shared `lib/theme.ts` is the source of typography, palette, spacing and component appearance. `app/providers.tsx` applies it through ThemeProvider and CssBaseline with the App Router Emotion cache. Palette CSS variables keep evidence-document and application layout styles aligned with the theme.

Inter is self-hosted through Fontsource at 400, 500, 600 and 700 weights. The fallback stack is Inter, Roboto, Helvetica, Arial, sans-serif. Page headings use 28px/600/1.25; section headings 18px/600; body and navigation 14px; supporting labels 12–13px; prominent financial values 32px/600 with tabular numerals. Buttons use sentence case and 13–14px text.

The palette uses #237A67 green, #24313A primary text, #596773 secondary text, #F6F7F9 page background, white paper and #E2E7EC borders. Spacing follows MUI's 8px scale. Cards have 8px corners and no elevation; controls have 6px corners. Standard input/button height is 40px, with 32px compact actions and 24px status chips.

MUI component overrides define interaction, hover, disabled and keyboard focus states. Evidence, row and tile button variants serve linked sources, figures and workpaper areas. ListItemButton provides a subtle selected background and active strip; its focus outline remains separate from selection. Numerical table cells are right-aligned and use tabular numerals. Scrollable record regions are keyboard focusable.

Responsive Box/Stack layouts use sx for application-specific geometry. The sidebar is 240px at desktop sizes, with an icon rail on smaller laptops and a navigation drawer on mobile. Main padding is 24–32px. Summary cards are 152px tall. The overview's six compact priority rows lead into the full review queue, where complete descriptions and references remain available.

Validation confirms loaded Inter font assets, exact typography and summary sizes, three complete priority issues above the fold at 1280×800 and 1024×768, and no page overflow at 390px. Axe checks cover all eight main screens, the figure drawer and verification dialog. Workflow tests cover saved adjustments, verifications, bulk selection, undo, role masking, keyboard focus and Escape. Document geometry checks cover long pages and short mobile dialogs.
