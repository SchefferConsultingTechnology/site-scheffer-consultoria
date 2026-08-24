# Feature Specification: Institutional Site Baseline

**Feature Branch**: `001-site-baseline`

**Created**: 2026-08-23

**Status**: Draft

**Input**: User description: "Já é um projeto desenvolvido, portanto a specify é apenas validação do que já existe." (Document and validate the current, already-built one-page institutional/marketing site as the baseline specification.)

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Contact the company (Priority: P1)

A prospective client lands on the homepage, reviews what Scheffer Consultoria offers, and reaches
out to start a conversation about a project.

**Why this priority**: This is the entire purpose of the site — every other section exists to build
enough trust and clarity for the visitor to complete this action.

**Independent Test**: Load the homepage, use either the header CTA or the hero CTA, and confirm the
visitor lands on a way to contact the company (e-mail).

**Acceptance Scenarios**:

1. **Given** a visitor on the homepage, **When** they click "Falar agora" (header) or "Começar um
   projeto" (hero), **Then** the page scrolls to the Contact section.
2. **Given** a visitor in the Contact section, **When** they click the e-mail button, **Then**
   their e-mail client opens a new message addressed to `contato@schefferconsultoria.com.br`.

---

### User Story 2 - Evaluate the company's credibility (Priority: P2)

A visitor who is not yet ready to reach out reviews the company's experience, differentiators, and
way of working before deciding whether to contact them.

**Why this priority**: Directly supports User Story 1 — visitors who don't trust the company won't
convert — but it is not the conversion action itself.

**Independent Test**: Navigate to the "Sobre" section via the nav link and confirm the
differentiators list, the four-step process, and the hero's summary statistics are visible.

**Acceptance Scenarios**:

1. **Given** a visitor on the homepage, **When** the page loads, **Then** the hero displays three
   summary statistics (years in the market, projects delivered, support availability).
2. **Given** a visitor clicks "Sobre" in the nav, **When** the page scrolls to that section,
   **Then** they see the differentiators list and the four-step process (Descoberta, Estratégia,
   Execução, Crescimento).
3. **Given** a visitor clicks "Serviços" in the nav, **When** the page scrolls to that section,
   **Then** they see the four service offerings, each with an icon, title, description, and tag.

---

### User Story 3 - Follow the brand on social media (Priority: P3)

A visitor who wants to keep up with the company beyond a one-time visit looks for its social media
profiles in the footer.

**Why this priority**: A secondary, lower-intent channel compared to direct contact; the site's
value is not dependent on it.

**Independent Test**: From the footer, attempt to open the Instagram and LinkedIn icons.

**Acceptance Scenarios**:

1. **Given** a visitor at the footer, **When** they click the Instagram or LinkedIn icon, **Then**
   they are taken to the corresponding social profile.
   _(Currently these links point to a placeholder `#` and do not navigate anywhere — see
   Assumptions.)_

---

### Edge Cases

- What happens on a mobile-width viewport? Below the `md` breakpoint the desktop nav links
  ("Serviços / Sobre / Processo / Contato") are hidden and replaced by a mobile navigation menu
  (drawer) offering the same four destinations, in addition to the "Falar agora" CTA button, which
  remains visible at all widths. (Resolved by `002-responsive-validation` — previously there was no
  alternate menu on mobile.)
- What happens when a visitor clicks "Agendar reunião"? It opens an in-page Cal.com scheduling
  modal showing real availability. (Resolved by `003-contact-form-scheduling` — previously it
  pointed to a placeholder `#` and performed no action.)
- What happens when a visitor clicks the Instagram or LinkedIn footer icon? Same as above — both
  currently point to `#` rather than a real profile URL.

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: The system MUST render a single-page site at the root route (`/`) composed of, in
  order: header/navigation, hero, services, about, process, contact call-to-action, and footer.
- **FR-002**: The header MUST offer in-page navigation to the Services, About, Process, and Contact
  sections, plus a persistent "Falar agora" call-to-action visible at all viewport widths.
- **FR-003**: The Services section MUST list exactly four offerings — Aplicações Web, Apps Mobile,
  Marketing Digital, Social Media — each with an icon, title, short description, and a tag.
- **FR-004**: The hero MUST display three summary statistics: years in the market, projects
  delivered, and support availability.
- **FR-005**: The About section MUST present the company's differentiators as a list and MUST
  present a four-step process (Descoberta, Estratégia, Execução, Crescimento), each with a title
  and description.
- **FR-006**: The Contact section MUST provide an on-page contact form that delivers messages to
  `contato@schefferconsultoria.com.br` as the primary way to reach the company. (Updated by
  `003-contact-form-scheduling` — previously this was a direct `mailto:` link.)
- **FR-007**: The footer MUST display the company name and logo, a copyright line with the current
  year computed at render time, and links for Instagram, LinkedIn, and e-mail.
- **FR-008**: All content and navigation MUST be usable without requiring the visitor to create an
  account, log in, or submit any personal data through a form.
- **FR-009**: The page MUST be fully readable and navigable via anchor links without client-side
  JavaScript having finished executing (content is server-rendered).

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: A first-time visitor can locate a way to contact the company without scrolling, from
  the moment the homepage finishes loading.
- **SC-002**: All four advertised services are visible to a visitor after at most one scroll action
  on a standard desktop viewport.
- **SC-003**: A visitor can find the company's key credibility signals (years of experience,
  projects delivered, support model) within the first screen of content.
- **SC-004**: Every in-page navigation link (Serviços, Sobre, Processo, Contato) successfully
  scrolls the visitor to its corresponding section 100% of the time.

## Assumptions

- This specification documents the site's current, already-implemented behavior as a baseline; it
  does not introduce new functionality.
- The Instagram/LinkedIn footer icons currently link to a `#` placeholder and are not wired to a
  real destination yet. This is recorded here as a known gap in the baseline, not as a requirement
  to be fulfilled by this spec. ("Agendar reunião" was the same kind of placeholder and is now
  resolved — see FR-006 and the Edge Cases above.)
- Page content is presently Portuguese (pt-BR) only; an English version of the site's content is
  out of scope for this baseline. (This is independent of the project constitution, which is
  maintained bilingually as a governance document, not as site content.)
- Content is static and hard-coded in the route component; there is no CMS or backend data source,
  so this spec has no Key Entities section.
