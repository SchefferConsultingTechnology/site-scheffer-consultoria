# Feature Specification: Full Responsive Layout (Desktop & Mobile)

**Feature Branch**: `002-responsive-validation`

**Created**: 2026-08-23

**Status**: Draft

**Input**: User description: "apenas a constitution terá dois idiomas, a aplicação completa
inicialmente será apenas em português. A aplicação deve ser 100% responsiva, desktop e mobile,
precisamos validar isso." (Only the constitution is bilingual — the application itself stays
Portuguese-only for now. The application must be 100% responsive across desktop and mobile, and
this needs to be validated.)

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Browse and convert from a mobile device (Priority: P1)

A visitor opens the site on a smartphone and can read every section, reach every part of the page,
and complete the same contact action a desktop visitor would — without broken layout, clipped
text, or horizontal scrolling.

**Why this priority**: A large share of visits to a marketing site come from mobile. If the layout
breaks or the primary contact action is hard to reach on a phone, the site fails at its one job
(Principle V) for most visitors.

**Independent Test**: Load the homepage at common mobile widths (e.g. 320–430px) and confirm every
section renders fully, with no horizontal scroll, and the contact action is reachable and usable.

**Acceptance Scenarios**:

1. **Given** a visitor on a mobile-width viewport, **When** they load the homepage, **Then** the
   header, hero, services, about, process, contact, and footer sections are all fully visible with
   no horizontal scrolling and no clipped or overlapping content.
2. **Given** a mobile visitor, **When** they tap "Falar agora" or "Começar um projeto", **Then**
   they reach the Contact section and can open the e-mail contact action, the same as on desktop.
3. **Given** a mobile visitor, **When** they view the Services and Process sections, **Then** the
   four-item grids reflow into a single (or double) column layout that stays fully readable.
4. **Given** a mobile visitor, **When** they open the mobile navigation menu, **Then** they see
   links to Serviços, Sobre, Processo, and Contato and can jump directly to any of them, then close
   the menu.

---

### User Story 2 - Browse the site across common desktop widths (Priority: P2)

A visitor on a laptop or a wide desktop monitor sees a layout that adapts to the available width
without ever overlapping elements, clipping text, or leaving obviously broken empty space.

**Why this priority**: Desktop is the layout that already exists and mostly works today; this
story is about confirming it holds across the realistic range of desktop widths, not building it
from scratch.

**Independent Test**: Resize the browser window across common desktop/laptop widths and confirm no
element overlaps another and no text is clipped.

**Acceptance Scenarios**:

1. **Given** a visitor resizes the browser between roughly 1024px and 1920px, **When** the layout
   responds, **Then** no element overlaps another, no text is clipped, and the content stays
   centered within its max-width container.

---

### User Story 3 - Confirm responsiveness before shipping changes (Priority: P3)

Whoever makes changes to the site can check the page against a defined, repeatable set of
breakpoints and confirm nothing regressed, instead of relying on an ad hoc "looks fine to me".

**Why this priority**: Supports the first two stories over time but is a process safeguard, not a
visitor-facing outcome by itself.

**Independent Test**: Walk through the defined breakpoint list against the homepage and confirm
each one is free of layout defects.

**Acceptance Scenarios**:

1. **Given** the defined set of breakpoints (see Success Criteria), **When** each is checked
   against the homepage, **Then** no layout defects are found at any of them.

---

### Edge Cases

- What happens at very narrow widths (below ~360px, e.g. older/smaller phones)? Content must still
  be usable, even if visually tighter.
- What happens in landscape orientation on a phone or tablet (short viewport height, wide width)?
  Sticky header and large hero content must not consume the entire visible height.
- What happens on ultra-wide desktop monitors (2560px and above)? Content must stay constrained to
  a readable max width rather than stretching edge to edge.
- What happens to touch targets (nav links, CTA buttons, footer icons) on mobile — are they large
  enough to tap reliably without accidentally hitting a neighboring element?

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: The homepage MUST render all sections (header, hero, services, about, process,
  contact, footer) without horizontal scrolling or clipped content at any viewport width from
  360px up to at least 1920px.
- **FR-002**: All interactive elements (nav links, CTA buttons, footer social/e-mail links) MUST
  have a minimum touch target size of 44×44 CSS px on mobile (WCAG 2.5.5) and MUST NOT visually
  overlap each other at any supported width.
- **FR-003**: Grid-based sections (the 4-card Services grid and the 4-step Process list) MUST
  reflow to fewer columns on narrow viewports instead of shrinking content illegibly or
  overflowing the viewport.
- **FR-004**: On viewport widths where the current desktop nav links (Serviços, Sobre, Processo,
  Contato) are hidden, the site MUST provide a mobile navigation menu (e.g. a toggle that opens a
  drawer/sheet) giving direct access to all four destinations, matching desktop navigation parity.
  The always-visible "Falar agora" CTA remains available in addition to this menu, not instead of
  it.
- **FR-005**: Layout and spacing changes needed to satisfy responsiveness MUST reuse the project's
  existing design tokens and utility classes rather than introducing a separate mobile-only visual
  system (Constitution Principle I).
- **FR-006**: A repeatable checklist of breakpoints MUST exist and be checked against the homepage
  to confirm the "100% responsive" requirement before this feature is considered complete.

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: The homepage is free of horizontal scrolling and clipped/overlapping content at all
  of the following widths: 320px, 360px, 375px, 414px, 768px, 1024px, 1280px, 1440px, 1920px.
- **SC-002**: 100% of interactive elements (nav, CTAs, footer links) meet the 44×44px minimum
  touch target and are tappable/clickable without mis-hits at every width in SC-001.
- **SC-003**: A visitor can go from landing on the homepage to opening the contact e-mail action in
  3 taps or fewer on a mobile-width viewport.
- **SC-004**: The Services and Process grids never display fewer than 1 or more than 4 columns
  inappropriately for the viewport (i.e., they visibly reflow rather than staying fixed at the
  desktop column count on narrow screens).

## Assumptions

- "Desktop and mobile" is interpreted using the breakpoint already established in the codebase
  (`md` = 768px in Tailwind), consistent with the existing header's `hidden md:flex` nav behavior;
  no separate "tablet" scenario beyond that boundary is treated as a distinct requirement.
- This feature covers the existing homepage baseline described in `001-site-baseline`; it does not
  add new sections or content, only responsive behavior for what already exists.
- Content stays Portuguese-only for the application itself, per the user's clarification; only the
  project constitution is maintained bilingually (EN/PT-BR) as governance documentation, not as
  site content.
