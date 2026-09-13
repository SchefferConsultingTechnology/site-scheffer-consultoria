# Tasks: Strong SEO Foundation

**Input**: Design documents from `/specs/004-seo-improvements/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: No automated test framework is configured for this project (same posture as
`002-responsive-validation` and `003-contact-form-scheduling`). Validation is manual, tracked in
`quickstart.md`.

**Organization**: Tasks are grouped by user story from `spec.md`, in priority order (P1, P1, P2,
P3), so each story can be implemented and validated independently.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: Which user story this task belongs to (US1–US4)
- File paths are exact and relative to the repository root

---

## Phase 1: Setup

**Purpose**: Environment scaffolding shared by later phases. No new npm dependency is needed for
this feature (per `plan.md`'s Technical Context).

- [x] T001 Add commented-out placeholders for `PUBLIC_GSC_VERIFICATION` and
      `PUBLIC_GA_MEASUREMENT_ID` to `.dev.vars`, with a one-line comment each explaining what they
      are and that they're optional, matching the existing `RESEND_API_KEY` documentation style in
      that file

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared data and components every new route in User Story 1 depends on

**⚠️ CRITICAL**: No User Story 1 route file can be written cleanly until this phase is complete

- [x] T002 [P] Extract the `services` array from `src/routes/index.tsx` into
      `src/lib/services-data.ts`, adding a `path` field per service (`/aplicacoes-web`,
      `/apps-mobile`, `/marketing-digital`, `/social-media`) alongside the existing `id`/`icon`/
      `title`/`desc`/`tag`/`headline`/`summary`/`bullets` fields, per `data-model.md`'s `Service`
      entity
- [x] T003 [P] Add an empty `SOCIAL_LINKS: { network: string; url: string }[]` export (starting as
      `[]`) to `src/lib/site-config.ts`, per `data-model.md`
- [x] T004 [P] Create `src/components/site-header.tsx`: extract the header/nav markup from
      `src/routes/index.tsx`, replacing `<a href="#servicos">`/`#sobre`/`#processo`/`#contato`
      with TanStack `<Link to="/sobre">`, `<Link to="/processo">`, `<Link to="/contato">`, and
      `<Link to="/" hash="servicos">` for "Serviços"; the "Falar agora" CTA links to `/contato`
- [x] T005 [P] Create `src/components/site-footer.tsx`: extract the footer markup from
      `src/routes/index.tsx`; render the Instagram/LinkedIn icons only when `SOCIAL_LINKS` (T003)
      has entries for that network, otherwise omit that icon (or show a non-interactive "em breve"
      badge) instead of linking to `#` (spec FR-008)
- [x] T006 [P] Create `src/components/service-detail.tsx`: extract the headline/summary/bullets
      block from `src/routes/index.tsx`'s "SERVICE DETAILS" section into a component that takes one
      `Service` (T002) as a prop; render the headline as this component's `<h1>` — it is now always
      used as a dedicated page's main heading, not a homepage subsection (spec FR-004)
- [x] T007 [P] Update `src/components/mobile-nav.tsx`: change `navLinks` from anchor hashes to
      route paths (`/sobre`, `/processo`, `/contato`), using the same `<Link to="/" hash="servicos">`
      pattern as T004 for "Serviços"

**Checkpoint**: Shared data/components exist — User Story 1 route files can now be written.

---

## Phase 3: User Story 1 - Every major section has its own dedicated, indexable page (Priority: P1) 🎯 MVP

**Goal**: The four services, Sobre, Processo, and Contato each become their own route instead of a
homepage anchor; the homepage keeps summarizing and linking to each.

**Independent Test**: Navigate directly to each of the 7 new routes without going through the
homepage and confirm each renders its full, relevant content on its own; confirm the homepage still
links to all of them.

### Implementation for User Story 1

- [x] T008 [P] [US1] Create `src/routes/aplicacoes-web.tsx`: `createFileRoute("/aplicacoes-web")`
      rendering `<SiteHeader />` + `<ServiceDetail service={...} />` (the "Aplicações Web" entry
      from `services-data.ts`, T002) + `<SiteFooter />` (depends on T002, T004–T006)
- [x] T009 [P] [US1] Create `src/routes/apps-mobile.tsx`: same shape as T008 for the "Apps Mobile"
      service (depends on T002, T004–T006)
- [x] T010 [P] [US1] Create `src/routes/marketing-digital.tsx`: same shape as T008 for the
      "Marketing Digital" service (depends on T002, T004–T006)
- [x] T011 [P] [US1] Create `src/routes/social-media.tsx`: same shape as T008 for the
      "Social Media" service (depends on T002, T004–T006)
- [x] T012 [P] [US1] Create `src/routes/sobre.tsx`: `createFileRoute("/sobre")`, extracting the
      About text/bullet list from `src/routes/index.tsx`'s current "ABOUT" section (excluding the
      nested Process block) as this page's `<h1>` + content, wrapped in `<SiteHeader />`/
      `<SiteFooter />` (depends on T004–T005)
- [x] T013 [P] [US1] Create `src/routes/processo.tsx`: `createFileRoute("/processo")`, extracting
      the 4-step process list currently nested inside the "ABOUT" section's `id="processo"` div in
      `src/routes/index.tsx`; give it its own `<h1>` (e.g. "Como trabalhamos"), since it previously
      had no heading of its own, wrapped in `<SiteHeader />`/`<SiteFooter />` (depends on T004–T005)
- [x] T014 [P] [US1] Create `src/routes/contato.tsx`: `createFileRoute("/contato")`, extracting the
      `<ContactForm />` + "Agendar reunião" + WhatsApp CTA block from `src/routes/index.tsx`'s "CTA"
      section, with the CTA heading ("Pronto para tirar seu projeto do papel?") as this page's
      `<h1>`, wrapped in `<SiteHeader />`/`<SiteFooter />` (depends on T004–T005)
- [x] T015 [US1] Rewrite `src/routes/index.tsx`: keep the Hero (`<h1>` unchanged) and the Services
      overview card grid, updating each card's "Saiba mais" link to `<Link to={s.path}>` (T002)
      instead of `#${s.id}`; remove the inline "SERVICE DETAILS" map and the full "ABOUT"/"CTA"
      section bodies; replace them with a short About teaser (paragraph + `<Link to="/sobre">`) and
      a short Contact teaser (paragraph + `<Link to="/contato">`); replace the inline header/footer
      JSX with `<SiteHeader />`/`<SiteFooter />` (depends on T002, T004–T014)
- [x] T016 [P] [US1] Create `src/lib/legacy-anchor-redirect.ts`: the hash→path lookup table per
      `data-model.md`'s `LegacyAnchorRedirect` entity (`servicos→/`, `sobre→/sobre`,
      `processo→/processo`, `contato→/contato`, `servico-web→/aplicacoes-web`,
      `servico-mobile→/apps-mobile`, `servico-marketing→/marketing-digital`,
      `servico-social→/social-media`)
- [x] T017 [US1] In `src/routes/index.tsx`, add a mount-time effect that checks
      `window.location.hash` against T016's lookup and calls `router.navigate({ to, replace: true })`
      when matched, per `research.md` §3 (depends on T015, T016)

**Checkpoint**: User Story 1 is fully functional and independently testable — every dedicated route
is reachable directly, the homepage still links out to each, and old anchor links redirect.

---

## Phase 4: User Story 2 - Search engines can accurately read and rank every page (Priority: P1)

**Goal**: Every route has correct heading structure, complete unique metadata, and valid
structured data.

**Independent Test**: Fetch each route's server-rendered HTML and confirm exactly one `<h1>`, no
skipped heading levels, unique title/description/canonical/OG/Twitter tags, and valid JSON-LD
listing the business's services.

### Implementation for User Story 2

- [x] T018 [P] [US2] Create `src/lib/structured-data.ts`: builder functions for the business
      `ProfessionalService` JSON-LD (with `hasOfferCatalog` generated from `services-data.ts`
      (T002) and an optional `sameAs` from `SOCIAL_LINKS` (T003), omitted entirely when empty) and
      the per-service `Service` JSON-LD, per `contracts/structured-data-contract.md`
- [x] T019 [US2] In `src/routes/index.tsx`, replace the existing inline `structuredData` object
      with T018's business JSON-LD builder (depends on T018, T015)
- [x] T020 [P] [US2] In `src/routes/aplicacoes-web.tsx`, add `head()` with unique title,
      description, canonical link, `og:title`/`og:description`/`og:url`, `twitter:title`/
      `twitter:description`, and this service's `Service` JSON-LD from T018, per
      `contracts/page-metadata-contract.md` (depends on T008, T018)
- [x] T021 [P] [US2] Same as T020 for `src/routes/apps-mobile.tsx` (depends on T009, T018)
- [x] T022 [P] [US2] Same as T020 for `src/routes/marketing-digital.tsx` (depends on T010, T018)
- [x] T023 [P] [US2] Same as T020 for `src/routes/social-media.tsx` (depends on T011, T018)
- [x] T024 [P] [US2] In `src/routes/sobre.tsx`, add `head()` with unique title, description,
      canonical link, `og:title`/`og:description`/`og:url`, and `twitter:title`/
      `twitter:description`, per `contracts/page-metadata-contract.md` (depends on T012)
- [x] T025 [P] [US2] Same as T024 for `src/routes/processo.tsx` (depends on T013)
- [x] T026 [P] [US2] Same as T024 for `src/routes/contato.tsx` (depends on T014)
- [x] T027 [US2] In `src/routes/__root.tsx`, add `twitter:title`/`twitter:description` (mirroring
      the existing global title/description) and explicit `og:image:width`/`og:image:height` to
      the global meta tags (spec FR-005)
- [x] T028 [US2] Audit all 8 routes' heading hierarchy and JSON-LD against
      `contracts/page-metadata-contract.md` and `contracts/structured-data-contract.md`, following
      `quickstart.md`'s "Route metadata" and "Structured data" sections; fix any remaining issues
      (depends on T019–T027)

**Checkpoint**: User Stories 1 and 2 both hold — every route has correct metadata and structured
data, independently of Search Console/analytics (US3) or social links (US4).

---

## Phase 5: User Story 3 - The business can measure and monitor organic search performance (Priority: P2)

**Goal**: Search Console verification and analytics become available via configuration, and the
sitemap accurately lists every indexable route.

**Independent Test**: With the env vars set, confirm the verification meta tag and analytics
script render; with them unset, confirm neither renders. Confirm the sitemap lists all 8 routes.

### Implementation for User Story 3

- [x] T029 [US3] In `src/routes/__root.tsx`, read `process.env.PUBLIC_GSC_VERIFICATION` and render
      a `<meta name="google-site-verification" content="...">` tag only when the variable is set
      (depends on T001)
- [x] T030 [US3] In `src/routes/__root.tsx`, read `process.env.PUBLIC_GA_MEASUREMENT_ID` and render
      the standard `gtag.js` snippet only when the variable is set, loaded so it does not block
      page render (depends on T001, T029)
- [x] T031 [P] [US3] Update `public/sitemap.xml`: list all 8 indexable routes (`/`, the four
      service pages, `/sobre`, `/processo`, `/contato`) with `<lastmod>`/`<changefreq>`/
      `<priority>` per `contracts/sitemap-contract.md`; confirm `politica-de-privacidade` stays
      excluded (depends on T008–T014)
- [x] T032 [US3] Follow the "Search Console & Analytics" and "Sitemap" sections of
      `quickstart.md`: verify the tags render only when their env vars are set, and the sitemap
      lists the right routes (depends on T029–T031)

**Checkpoint**: Verification/analytics wiring works and the sitemap is accurate — ready for the
business to verify in Search Console once those accounts exist.

---

## Phase 6: User Story 4 - The business's identity is consistent across the web (Priority: P3)

**Goal**: Real social profile URLs replace placeholder links, and structured data references them.

**Independent Test**: Click each footer social icon and confirm it opens a real, active profile;
confirm the homepage JSON-LD's `sameAs` array matches.

### Implementation for User Story 4

- [ ] T033 [US4] Once the business supplies real Instagram/LinkedIn URLs, populate `SOCIAL_LINKS`
      in `src/lib/site-config.ts` (T003) — until they are supplied, confirm `SiteFooter` (T005)
      correctly omits/marks the icons rather than linking to `#` (blocked on real URLs; spec
      Assumptions)
- [ ] T034 [US4] Follow the "Social links" section of `quickstart.md`: confirm footer links and the
      homepage JSON-LD `sameAs` (T018/T019) match once `SOCIAL_LINKS` is populated (depends on T033)

**Checkpoint**: All four user stories are independently functional.

---

## Phase 7: Polish & Cross-Cutting Concerns

- [x] T035 [P] Run `npm run typecheck` and fix any type errors across all new/changed files
- [x] T036 [P] Run `npm run lint` and `npm run format`, fixing any issues
- [x] T037 Run `npm run build` and confirm it succeeds before pushing to the Lovable-connected
      branch (depends on T035, T036)
- [x] T038 Run the full `quickstart.md` validation pass end-to-end, checking every box in that file
      (depends on T008–T034)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: No dependency on Setup's content, but conventionally done first —
  BLOCKS all of User Story 1
- **User Story 1 (Phase 3)**: Depends on Foundational (Phase 2) completion
- **User Story 2 (Phase 4)**: Depends on User Story 1's route files existing (T008–T015) — each
  route needs to exist before it can get a `head()`
- **User Story 3 (Phase 5)**: Depends on Setup (T001) for the env var names, and on User Story 1's
  final route paths (T008–T014) for the sitemap — does not depend on User Story 2
- **User Story 4 (Phase 6)**: Depends on Foundational (T003, T005) and User Story 2 (T018/T019) for
  `sameAs` — otherwise independent
- **Polish (Phase 7)**: Depends on all four user stories being complete

### Parallel Opportunities

- All Foundational tasks (T002–T007) can run in parallel — different files, no interdependency
- All 7 new route files in User Story 1 (T008–T014) can run in parallel once Foundational is done;
  T016 (new file) can run alongside them; T015 and T017 are sequential (both touch
  `src/routes/index.tsx`)
- In User Story 2, T018 first, then T020–T026 (7 different route files) in parallel; T019 and T027
  are sequential (each touches a file — `index.tsx`, `__root.tsx` — already targeted by another
  task in the phase)
- T029/T030 both touch `src/routes/__root.tsx` — sequential, not parallel
- T035/T036 can run in parallel (different tool invocations); T037 depends on both

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (blocks everything else)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: every route reachable directly, homepage links out, old anchors redirect
5. Ship — the site is already structurally correct even before per-page metadata (US2) lands

### Incremental Delivery

1. Setup + Foundational → shared data/components ready
2. User Story 1 → dedicated routes exist (MVP for the structural SEO change)
3. User Story 2 → every route ranks correctly (the other P1 — do this immediately after US1, not
   as an optional follow-up, since the two together are what "strong SEO" actually means)
4. User Story 3 → measurement wiring, whenever the business has Search Console/GA4 accounts ready
5. User Story 4 → real social links, whenever the business supplies them
