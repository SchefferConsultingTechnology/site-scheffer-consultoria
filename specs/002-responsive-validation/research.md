# Phase 0 Research: Full Responsive Layout (Desktop & Mobile)

No items in Technical Context were left as `NEEDS CLARIFICATION` — the project's existing code and
tooling gave a reasonable default for every decision below. This document records those decisions
for traceability rather than resolving open unknowns.

## Decision: Mobile nav drawer built from the existing `Sheet` primitive

**Decision**: Use `src/components/ui/sheet.tsx` (Radix `Dialog` under the hood), opened from a
`Button` trigger with `lucide-react`'s `Menu`/`X` icons, as the mobile navigation drawer.

**Rationale**: Already installed, already part of the design system (Constitution Principle I), and
Radix `Dialog` provides the accessibility behavior a nav drawer needs for free: focus trap, `Esc` to
close, click-outside to close, `aria-expanded`/`aria-modal` wiring.

**Alternatives considered**:

- `src/components/ui/drawer.tsx` (vaul-based bottom sheet) — better suited to bottom action sheets;
  a side drawer (`Sheet` with `side="right"`) is the more conventional pattern for a nav menu.
- `src/components/ui/navigation-menu.tsx` — designed for desktop mega-menus with nested triggers;
  overkill for four flat anchor links.
- A hand-rolled `<div>` toggle — would duplicate accessibility behavior `Sheet` already provides,
  violating Principle I (reuse existing primitives before building new ones).

## Decision: Validate against the existing Tailwind breakpoint scale

**Decision**: Use Tailwind's default breakpoints already in use across the codebase (`sm` 640,
`md` 768, `lg` 1024, `xl` 1280, `2xl` 1536), and additionally spot-check the exact widths listed in
the spec's Success Criteria (360, 375, 414, 768, 1024, 1280, 1440, 1920).

**Rationale**: `src/styles.css` does not override the default breakpoint scale, and existing markup
already keys off it (e.g. `hidden md:flex`, `sm:grid-cols-2 lg:grid-cols-4`). Introducing a custom
breakpoint scale would create two competing systems for no benefit.

**Alternatives considered**: Defining custom `@theme` breakpoints — rejected as unnecessary
complexity (Principle V / YAGNI) with no requirement driving it.

## Decision: Manual/visual validation, no new automated test framework

**Decision**: Responsiveness is validated by manually resizing the browser / using device emulation
in devtools against the breakpoint list, following the checklist in `quickstart.md`. No automated
visual-regression or E2E framework (e.g. Playwright) is introduced by this feature.

**Rationale**: The project has zero test tooling configured today (constitution's Development
Workflow section documents this as a known state, not an oversight). Adding a new test framework is
a governance-level, stack-changing decision (constitution's Technology Stack section) that is
disproportionate to a layout/responsiveness fix and out of scope here.

**Alternatives considered**: Playwright with a viewport matrix and screenshot assertions — more
rigorous and reusable for future regressions, but a meaningfully larger scope change; flagged as a
candidate for a future, separate feature/constitution amendment if manual QA proves insufficient.

## Decision: Mobile menu open state is local component state

**Decision**: The drawer's open/closed state is a plain `useState<boolean>` scoped to the header
component, not lifted to a store or the URL.

**Rationale**: The state is purely transient UI state with a single consumer; no other part of the
page needs to read or react to it (Principle V simplicity).

**Alternatives considered**: URL/search-param-driven open state — would let the drawer be
deep-linked or preserved across navigation, but there is no requirement for that and it adds
routing complexity with no user-facing benefit.
