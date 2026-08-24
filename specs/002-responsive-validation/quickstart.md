# Quickstart: Validating Full Responsive Layout (Desktop & Mobile)

## Prerequisites

- Dependencies installed (`npm install` or `bun install`).
- Dev server running: `npm run dev` (opens the homepage at `/`).

## Setup

```bash
npm run dev
```

Open the printed local URL in a browser with devtools (Chrome/Firefox/Edge all support device
toolbar / responsive design mode).

## Validation checklist (maps to spec Success Criteria)

For each width below, open devtools' responsive/device mode and set the viewport to that exact
width (device toolbar → custom size), then check the boxes:

| Width  | No horizontal scroll | No clipped/overlapping content | Interactive elements tappable (SC-002) |
| ------ | -------------------- | ------------------------------ | -------------------------------------- |
| 320px  | [ ]                  | [ ]                            | [ ]                                    |
| 360px  | [ ]                  | [ ]                            | [ ]                                    |
| 375px  | [ ]                  | [ ]                            | [ ]                                    |
| 414px  | [ ]                  | [ ]                            | [ ]                                    |
| 768px  | [ ]                  | [ ]                            | [ ]                                    |
| 1024px | [ ]                  | [ ]                            | [ ]                                    |
| 1280px | [ ]                  | [ ]                            | [ ]                                    |
| 1440px | [ ]                  | [ ]                            | [ ]                                    |
| 1920px | [ ]                  | [ ]                            | [ ]                                    |

This directly validates **SC-001** and **SC-002**.

## Mobile navigation menu (User Story 1, Scenario 4)

At any width below 768px:

1. Confirm the desktop nav links (Serviços/Sobre/Processo/Contato) are hidden and a menu trigger is
   visible in the header instead.
2. Tap the menu trigger → drawer opens showing all four links.
3. Tap "Contato" → drawer closes and the page scrolls to the Contact section.
4. Re-open the drawer, then close it via: the close control, the `Esc` key, and by clicking outside
   the drawer — confirm all three work.

## Primary conversion path on mobile (SC-003)

At a mobile width (e.g. 375px), starting from page load:

1. Tap "Falar agora" (header) or "Começar um projeto" (hero).
2. Tap the e-mail contact button in the Contact section.
3. Confirm the e-mail client opens addressed to `contato@schefferconsultoria.com.br`.
4. Count taps used — should be **3 or fewer** to satisfy SC-003.

## Grid reflow (SC-004)

At 360–414px and again at 1024px+, confirm:

- [ ] The Services section's 4 cards are not fixed at 4 columns on narrow widths (1–2 columns
      expected) and reach up to 4 columns on wide desktop widths.
- [ ] The Process section's 4 steps remain readable (stacked) on narrow widths.

## Edge cases to spot-check

- Landscape phone/tablet (short height, wide width): sticky header + hero must not consume the
  full visible height, leaving no room to see any other content without scrolling.
- Ultra-wide desktop (2560px+): content stays constrained to its max-width container rather than
  stretching edge to edge.

## Expected outcome

All checklist boxes above are checked, and all four numbered flows (mobile nav, conversion path,
grid reflow, edge cases) behave as described — with no code changes required beyond what is tracked
in `tasks.md` for this feature.
