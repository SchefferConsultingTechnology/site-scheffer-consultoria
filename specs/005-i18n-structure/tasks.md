# Tasks: i18n Structure (Portuguese, English, Spanish)

**Input**: Design documents from `/specs/005-i18n-structure/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: No automated test framework is configured for this project (same posture as `002`–
`004`). Validation is manual, tracked in `quickstart.md`.

**Organization**: Tasks are grouped by user story from `spec.md` (US1 and US2 are both P1, US3 is
P2). Because this feature's architecture ties routing (US1) and content completeness (US2)
tightly together — a route can't meaningfully exist without content to render — Foundational
scaffolds every page with placeholder English/Spanish text (a literal copy of the Portuguese,
clearly a stand-in), US1 makes all 27 routes and the language selector reachable and correctly
wired (still showing placeholder text on EN/ES), and US2 replaces every placeholder with a real
translation. This means US1's own acceptance criteria (does switching land on the right URL) is
independently verifiable before US2 finishes, even though the two ship in the same effort.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)
- File paths are exact and relative to the repository root

---

## Phase 1: Setup

- [X] T001 Create `src/content/locale.ts`: `LOCALES` (`["pt","en","es"]`), `Locale` type,
      `DEFAULT_LOCALE`, and the `PAGE_PATHS` lookup (9 page keys × 3 URLs each) per `data-model.md`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Rebuild every existing Portuguese page on the new locale-aware architecture —
extracted shared page components, typed content modules (Portuguese values, with English/Spanish
temporarily filled by copying the Portuguese text as an explicit placeholder) — with **zero**
change in behavior or output for the existing Portuguese routes.

**⚠️ CRITICAL**: No US1/US2/US3 work can begin until this phase is complete and the Portuguese
site has been verified to behave exactly as before.

- [X] T002 [P] Create `src/lib/seo-links.ts`: `buildSeoLinks(page, locale)` per
      `contracts/hreflang-sitemap-contract.md` (canonical + 3 hreflang alternates + x-default)
      (depends on T001)
- [X] T003 [P] Create `src/content/home.ts`: `HomeContent` type + `homeContent: Record<Locale,
      HomeContent>`, `pt` values matching today's `src/routes/index.tsx` copy exactly, `en`/`es`
      temporarily set to the same Portuguese strings as an explicit placeholder (replaced in US2)
- [X] T004 [P] Create `src/content/about.ts`: same pattern as T003, sourced from today's
      `src/routes/about.tsx`
- [X] T005 [P] Create `src/content/methodology.ts`: same pattern, sourced from
      `src/routes/methodology.tsx` (including the 4 process steps)
- [X] T006 [P] Create `src/content/contact.ts`: same pattern, sourced from
      `src/routes/contact.tsx` and `src/components/contact-form.tsx` — content includes the page
      copy AND the form's field labels, placeholders, validation messages, and success/error
      status messages (spec FR-010)
- [X] T007 [P] Create `src/content/privacy-policy.ts`: same pattern, sourced from
      `src/routes/privacy-policy.tsx`'s full section list (this is the largest content module —
      legal text, still just Portuguese + placeholder at this stage)
- [X] T008 [P] Update `src/lib/services-data.ts`: convert `title`/`desc`/`tag`/`headline`/
      `summary`/`bullets` on each of the 4 services from plain strings to `Record<Locale, ...>`
      (Portuguese values + placeholder en/es); `id`, `path` (still the Portuguese URL), and `icon`
      stay as they are — the English/Spanish URLs for a service are resolved via `PAGE_PATHS`
      elsewhere, not stored here (depends on T001)
- [X] T009 [P] Create `src/pages/home-page.tsx`: extract the JSX from `src/routes/index.tsx` into
      a component taking `locale: Locale`, rendering `homeContent[locale]` (depends on T003)
- [X] T010 [P] Create `src/pages/about-page.tsx`: extract from `src/routes/about.tsx`, taking
      `locale`, rendering `aboutContent[locale]` (depends on T004)
- [X] T011 [P] Create `src/pages/methodology-page.tsx`: extract from
      `src/routes/methodology.tsx` (depends on T005)
- [X] T012 [P] Create `src/pages/contact-page.tsx`: extract from `src/routes/contact.tsx`,
      rendering `<ContactForm locale={locale} />` (depends on T006)
- [X] T013 [P] Create `src/pages/privacy-policy-page.tsx`: extract from
      `src/routes/privacy-policy.tsx` (depends on T007)
- [X] T014 [P] Update `src/components/service-detail.tsx`: take a `locale: Locale` prop in
      addition to `service`, resolving `service.title[locale]`, `service.summary[locale]`, etc.
      (depends on T008)
- [X] T015 Update `src/lib/contact-schema.ts`: replace the single `contactSchema` export with
      `buildContactSchema(locale: Locale)`, using `contact.ts`'s validation-message strings for
      that locale; add a `locale: z.enum(LOCALES)` field to the schema (depends on T001, T006)
- [X] T016 Update `src/components/contact-form.tsx`: accept a `locale: Locale` prop, call
      `buildContactSchema(locale)`, and replace every hardcoded label/placeholder/status string
      with the matching `contactContent[locale]` field (depends on T006, T015)
- [X] T017 Update `src/lib/contact-confirmation-email.ts`: accept a `locale: Locale` parameter,
      resolve subject/body copy from `contact.ts`'s e-mail-related strings for that locale
      (depends on T006)
- [X] T018 Update `src/lib/send-contact-email.server.ts`: read the validated `locale` field from
      the submission and pass it to `buildContactConfirmationEmail(locale, data)` (depends on
      T015, T017)
- [X] T019 Update `src/routes/index.tsx`: become a thin wrapper — `head()` uses
      `buildSeoLinks("home", "pt")` + `homeContent.pt`'s meta fields; `component` renders
      `<HomePage locale="pt" />` (depends on T002, T003, T009)
- [X] T020 Update `src/routes/about.tsx`: same thin-wrapper pattern (depends on T002, T004, T010)
- [X] T021 Update `src/routes/methodology.tsx`: same (depends on T002, T005, T011)
- [X] T022 Update `src/routes/contact.tsx`: same, renders `<ContactPage locale="pt" />` (depends
      on T002, T006, T012)
- [X] T023 Update `src/routes/privacy-policy.tsx`: same, keeps its existing `noindex` meta tag
      (depends on T002, T007, T013)
- [X] T024 [P] Update `src/routes/web-apps.tsx`: thin wrapper passing `locale="pt"` into the
      locale-aware `ServiceDetail` (depends on T002, T008, T014)
- [X] T025 [P] Update `src/routes/mobile-apps.tsx`: same (depends on T002, T008, T014)
- [X] T026 [P] Update `src/routes/digital-marketing.tsx`: same (depends on T002, T008, T014)
- [X] T027 [P] Update `src/routes/social-media.tsx`: same (depends on T002, T008, T014)

**Checkpoint**: `npm run build` succeeds; every existing Portuguese route renders identically to
before this phase (a pure refactor — confirm via the same manual spot checks used in
`004-seo-improvements`'s quickstart before proceeding).

---

## Phase 3: User Story 1 - Switch language without losing your place (Priority: P1) 🎯 MVP

**Goal**: A language selector in the header lets a visitor move between a page's 3 language
variants, landing on the equivalent page each time — all 27 routes exist and are reachable.

**Independent Test**: From `/digital-marketing`, switch to English via the selector and confirm
the browser ends up at `/en/digital-marketing` (not `/en` or unchanged); repeat for Spanish and for
switching back to Portuguese from a non-Portuguese page.

### Implementation for User Story 1

- [X] T028 [P] [US1] Create `src/content/common.ts`: `Record<Locale, {...}>` for shared chrome
      strings — nav labels (Serviços/Sobre/Metodologia/Contato and their EN/ES equivalents), the
      "Falar agora" CTA, footer copyright line and "Política de Privacidade" link text, and the
      language selector's own labels (language names) — real translations, not placeholders
      (depends on T001)
- [X] T029 [US1] Create `src/components/language-selector.tsx`: a dropdown listing the 3
      languages (current one indicated), using `PAGE_PATHS[page][otherLocale]` to build each
      option's link (depends on T001, T028)
- [X] T030 [US1] Update `src/components/site-header.tsx`: accept `locale: Locale` and `page:
      PageKey` props, replace hardcoded nav labels with `commonContent[locale].nav.*`, render
      `<LanguageSelector page={page} locale={locale} />` (depends on T028, T029)
- [X] T031 [US1] Update `src/components/mobile-nav.tsx`: same prop/translation/selector changes
      for the drawer (depends on T028, T029)
- [X] T032 [US1] Update `src/components/site-footer.tsx`: accept `locale: Locale`, replace
      hardcoded footer strings with `commonContent[locale].footer.*` (depends on T028)
- [X] T033 [US1] Update all 9 existing Portuguese route files (`index.tsx`, `about.tsx`,
      `methodology.tsx`, `contact.tsx`, `privacy-policy.tsx`, `web-apps.tsx`, `mobile-apps.tsx`,
      `digital-marketing.tsx`, `social-media.tsx`) to pass `locale="pt"` and their `page` key into
      `SiteHeader`/`SiteFooter` per T030–T032's new required props (depends on T030, T031, T032;
      touches the files produced by T019–T027)
- [X] T034 [P] [US1] Create `src/routes/en/index.tsx` and `src/routes/es/index.tsx`: thin
      wrappers per `contracts/routing-contract.md`, `createFileRoute("/en")`/`("/es")`,
      `buildSeoLinks("home", locale)`, rendering `<HomePage locale="en|es" />` (depends on T002,
      T009, T029)
- [X] T035 [P] [US1] Create `src/routes/en/about.tsx` and `src/routes/es/about.tsx` (depends on
      T002, T010, T029)
- [X] T036 [P] [US1] Create `src/routes/en/methodology.tsx` and `src/routes/es/methodology.tsx`
      (depends on T002, T011, T029)
- [X] T037 [P] [US1] Create `src/routes/en/contact.tsx` and `src/routes/es/contact.tsx`,
      rendering `<ContactPage locale="en|es" />` (depends on T002, T012, T029)
- [X] T038 [P] [US1] Create `src/routes/en/privacy-policy.tsx` and
      `src/routes/es/privacy-policy.tsx`, keeping the `noindex` meta tag (depends on T002, T013,
      T029)
- [X] T039 [P] [US1] Create `src/routes/en/web-apps.tsx` and `src/routes/es/web-apps.tsx` (depends
      on T002, T014, T029)
- [X] T040 [P] [US1] Create `src/routes/en/mobile-apps.tsx` and `src/routes/es/mobile-apps.tsx`
      (depends on T002, T014, T029)
- [X] T041 [P] [US1] Create `src/routes/en/digital-marketing.tsx` and
      `src/routes/es/digital-marketing.tsx` (depends on T002, T014, T029)
- [X] T042 [P] [US1] Create `src/routes/en/social-media.tsx` and `src/routes/es/social-media.tsx`
      (depends on T002, T014, T029)

**Checkpoint**: All 27 routes (9 pages × 3 locales) are reachable; the language selector, on every
page, correctly links to the same page in each of the other 2 languages. English/Spanish page
*bodies* still show placeholder (Portuguese) text — that's User Story 2's job, not a bug here.

---

## Phase 4: User Story 2 - Read the entire site in your own language (Priority: P1)

**Goal**: Every visible string on every in-scope page — including the contact form and its
confirmation e-mail — is a real translation, not the Portuguese placeholder.

**Independent Test**: Load each in-scope page directly at its `/en/...` and `/es/...` URL and
confirm no Portuguese text remains visible anywhere on the page.

### Implementation for User Story 2

- [X] T043 [P] [US2] Replace the `en`/`es` placeholders in `src/content/home.ts` with real
      translations (depends on T003)
- [X] T044 [P] [US2] Replace the `en`/`es` placeholders in `src/content/about.ts` (depends on
      T004)
- [X] T045 [P] [US2] Replace the `en`/`es` placeholders in `src/content/methodology.ts` (depends
      on T005)
- [X] T046 [P] [US2] Replace the `en`/`es` placeholders in `src/content/contact.ts`, including the
      form field labels, placeholders, validation messages, and status messages (spec FR-010)
      (depends on T006)
- [X] T047 [P] [US2] Replace the `en`/`es` placeholders in `src/content/privacy-policy.ts` —
      translate faithfully, same policies and the same LGPD legal basis, not rewritten for a
      different jurisdiction (spec FR-012) (depends on T007)
- [X] T048 [P] [US2] Replace the `en`/`es` placeholders for all 4 services in
      `src/lib/services-data.ts` (depends on T008)
- [X] T049 [US2] Replace the `en`/`es` placeholder e-mail copy in
      `src/lib/contact-confirmation-email.ts` (depends on T017, T046)

**Checkpoint**: Zero Portuguese text remains on any `/en/...` or `/es/...` page; submitting the
contact form from an English or Spanish page shows validation/status messages and receives a
confirmation e-mail in that same language (spec SC-001, SC-006).

---

## Phase 5: User Story 3 - Each language version can be found in search (Priority: P2)

**Goal**: Every page's 3 language variants correctly declare their relationship to each other, and
the sitemap lists all indexable language variants.

**Independent Test**: Fetch a page's 3 language URLs and confirm each declares the other two as
alternate-language versions of itself; confirm the sitemap lists all 3 language URLs for every
currently-indexable page.

### Implementation for User Story 3

- [X] T050 [US3] Update `public/sitemap.xml`: 21 entries (7 indexable pages × 3 locales) per
      `contracts/hreflang-sitemap-contract.md`; `privacy-policy` stays excluded in all 3
      languages (depends on T001, all of T034–T042 for final URLs)
- [X] T051 [US3] Audit all 27 routes' `canonical`/`hreflang` links (already produced by every
      route's `buildSeoLinks` call from T019–T027 and T034–T042) and the sitemap against
      `contracts/hreflang-sitemap-contract.md`; fix any inconsistency found (depends on T050)

**Checkpoint**: All 3 user stories are independently functional — switching works (US1), content
is fully translated (US2), and each language variant is correctly cross-linked for search engines
(US3).

---

## Phase 6: Polish & Cross-Cutting Concerns

- [X] T052 [P] Run `npm run typecheck` and fix any type errors across all new/changed files
- [X] T053 [P] Run `npm run lint` and `npm run format`, fixing any issues
- [X] T054 Run `npm run build` and confirm it succeeds (depends on T052, T053)
- [X] T055 Run the full `quickstart.md` validation pass end-to-end — all 27 routes, the language
      selector from multiple starting pages, hreflang/canonical/sitemap, and the contact
      form/confirmation e-mail in all 3 languages (depends on all prior tasks)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Setup (T001) — BLOCKS User Story 1
- **User Story 1 (Phase 3)**: Depends on Foundational completion
- **User Story 2 (Phase 4)**: Depends on Foundational (the content modules it edits must exist)
  and, practically, on User Story 1 (so there's a route to view the translated content on) —
  though its own tasks (T043–T049) only touch content files, not route files, so they could be
  written in parallel with Phase 3 if desired; the checkpoint validation still requires Phase 3's
  routes to exist
- **User Story 3 (Phase 5)**: Depends on User Story 1 (needs final routes/URLs to list)
- **Polish (Phase 6)**: Depends on all three user stories being complete

### Parallel Opportunities

- Within Foundational, T002–T014 (content modules, page-component extractions, the
  `services-data.ts` conversion) can all run in parallel — different files, no interdependency
  among themselves. T015–T018 (contact schema/form/e-mail chain) are sequential. T019–T027 (route
  rewiring) can run in parallel with each other once their respective content/page-component
  tasks are done.
- Within User Story 1, T028 first, then T029–T032 (selector + 3 chrome components), then T033
  (touches all 9 existing route files — sequential, single batch), then T034–T042 (16 new route
  files across 9 tasks) all in parallel.
- Within User Story 2, T043–T048 (6 content files) are fully parallel; T049 (email copy) depends
  on T046.
- T052/T053 (typecheck, lint/format) can run in parallel; T054 (build) depends on both.

---

## Implementation Strategy

### MVP First (Through User Story 1)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational — verify the Portuguese site is unchanged
3. Complete Phase 3: User Story 1 — all 27 routes reachable, selector works correctly
4. **STOP and VALIDATE**: navigate every page in all 3 languages via the selector; confirm correct
   URLs even though EN/ES bodies still show placeholder text
5. This is a legitimate incremental milestone even though it isn't "done" — the mechanism is
   proven before the (larger, translation-heavy) content work of User Story 2 begins

### Incremental Delivery

1. Setup + Foundational → Portuguese site rebuilt on the new architecture, unchanged behavior
2. User Story 1 → navigation mechanism proven across all 27 routes
3. User Story 2 → real translations replace every placeholder (the bulk of the remaining effort)
4. User Story 3 → sitemap + hreflang audit (mostly already correct as a side effect of US1's
   `buildSeoLinks` usage — this phase is verification more than new construction)
5. Polish → full quality gate pass and end-to-end quickstart validation
