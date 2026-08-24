# UI Contract: Mobile Navigation Menu

This is not a network/API contract — the site has no backend surface of its own beyond static SSR
rendering. This documents the behavioral contract the mobile nav UI must satisfy, since it is the
one new piece of interactive behavior this feature adds.

## Trigger

- Rendered in the header, visible only below the `md` (768px) breakpoint — the same breakpoint
  where the desktop nav links are hidden today (`hidden md:flex`).
- Built from the existing `Button` primitive; icon toggles between `Menu` (closed) and `X` (open).
- `aria-expanded` reflects the drawer's open state; `aria-controls` references the drawer content.

## Drawer (built on `Sheet` / Radix `Dialog`)

- Opens as an overlay (`side="right"`, per the existing `sheetVariants` default) containing exactly
  the four nav destinations already present in desktop nav: Serviços (`#servicos`), Sobre
  (`#sobre`), Processo (`#processo`), Contato (`#contato`).
- Each link, when activated, both closes the drawer and scrolls the page to the target section
  (native anchor-link behavior is sufficient; no custom scroll logic required).
- Closing affordances: explicit close control, `Esc` key, click/tap outside the drawer content —
  all provided by the underlying Radix `Dialog`/`Sheet` behavior, not reimplemented.
- Focus is trapped within the drawer while open and returns to the trigger button on close (default
  Radix `Dialog` behavior).

## Non-goals

- No new routes, query params, or persisted state.
- No animation requirements beyond the `Sheet` component's existing open/close transition.
- No changes to the desktop nav's existing behavior or markup.
