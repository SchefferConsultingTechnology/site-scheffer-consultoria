---
description: "Task list template for feature implementation"
---

# Tasks: Full Responsive Layout (Desktop & Mobile)

**Input**: Design documents from `/specs/002-responsive-validation/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/mobile-nav.md, quickstart.md

**Tests**: Not included — the feature spec calls for manual/visual validation against the
breakpoint checklist in `quickstart.md`, not automated tests (see `research.md`'s "Manual/visual
validation" decision). No test framework is configured in this project.

**Organization**: Tasks are grouped by user story (from `spec.md`) to enable independent
implementation and validation of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)
- Every task includes an exact file path

## Path Conventions

Single existing project — all paths are relative to the repository root (`src/`, `specs/`).

---

## Phase 1: Setup

**Purpose**: Confirm the building blocks this feature reuses are actually present before touching
the route file.

- [x] T001 Verify `Sheet`, `SheetTrigger`, `SheetContent`, `SheetClose` are exported from
      `src/components/ui/sheet.tsx` and `Button` is exported from `src/components/ui/button.tsx`,
      matching the usage described in `specs/002-responsive-validation/contracts/mobile-nav.md`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: General responsive layout fixes to `src/routes/index.tsx` that both User Story 1
(mobile) and User Story 2 (desktop) depend on. All edits land in the same file, so these run
sequentially.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [x] T002 In `src/routes/index.tsx`, fix the header/nav wrapper (logo, spacing, "Falar agora" CTA)
      so it does not overflow or clip at widths from 360px up to 1920px (spec SC-001)
- [x] T003 In `src/routes/index.tsx`, fix the Hero section (heading, paragraph, CTA buttons, and the
      `stats` `<dl>` 3-column grid) so nothing clips or overlaps across 360–1920px (spec
      SC-001, SC-004)
- [x] T004 In `src/routes/index.tsx`, fix the Services grid (`services.map` cards, currently
      `sm:grid-cols-2 lg:grid-cols-4`) so it reflows cleanly from 1 column at 360px up to 4 columns
      by 1024px+ without overflow (spec SC-004)
- [x] T005 In `src/routes/index.tsx`, fix the About/Process section (`lg:grid-cols-2` layout and the
      4 process-step cards) so it stacks correctly on narrow widths and no step text clips (spec
      SC-001)
- [x] T006 In `src/routes/index.tsx`, fix the Contact CTA and Footer sections so the CTA buttons wrap
      without overlapping and the footer's social/e-mail icon row stays cleanly tappable at 360px
      (spec SC-002)

**Checkpoint**: General page layout holds across 360–1920px. Mobile nav parity (FR-004) is not yet
addressed — that is User Story 1.

---

## Phase 3: User Story 1 - Browse and convert from a mobile device (Priority: P1) 🎯 MVP

**Goal**: A mobile visitor can read every section, reach every part of the page (including via a
dedicated mobile nav menu), and complete the contact action, matching desktop capability.

**Independent Test**: Load the homepage at 375px, open the mobile nav menu, jump to each of the
four sections from it, then complete the "Falar agora" → contact e-mail flow in 3 taps or fewer.

### Implementation for User Story 1

- [x] T007 [P] [US1] Create `src/components/mobile-nav.tsx`: a component implementing the contract
      in `specs/002-responsive-validation/contracts/mobile-nav.md` — a `Button` trigger (Menu/X icon
      from `lucide-react`, `aria-expanded` reflecting state) that opens a `Sheet` (`side="right"`)
      containing links to `#servicos`, `#sobre`, `#processo`, `#contato`; each link click closes the
      drawer
- [x] T008 [US1] In `src/routes/index.tsx`, import and render `MobileNav` (from T007) in the header,
      visible only below the `md` breakpoint (mirroring the existing `hidden md:flex` desktop nav's
      inverse), with the "Falar agora" CTA remaining visible alongside it (depends on T007)
- [ ] T009 [US1] Follow the "Mobile navigation menu" and "Primary conversion path on mobile"
      sections of `specs/002-responsive-validation/quickstart.md` at 375px width and confirm every
      step passes, including the ≤3-tap conversion path (SC-003) (depends on T002–T006, T008)

**Checkpoint**: User Story 1 is fully functional and independently testable — mobile layout, mobile
nav menu, and the mobile conversion path all work.

---

## Phase 4: User Story 2 - Browse the site across common desktop widths (Priority: P2)

**Goal**: The existing desktop layout holds — no overlap, clipping, or broken spacing — across the
realistic range of desktop/laptop widths.

**Independent Test**: Resize the browser between 1024px and 1920px and confirm no element overlaps
another and no text is clipped.

### Implementation for User Story 2

- [ ] T010 [US2] Follow the breakpoint checklist rows for 1024px, 1280px, 1440px, and 1920px in
      `specs/002-responsive-validation/quickstart.md` and confirm no overlap/clipping (depends on
      T002–T006)
- [ ] T011 [US2] Follow the "ultra-wide desktop" edge case in
      `specs/002-responsive-validation/quickstart.md` at 2560px and confirm content stays
      constrained to its max-width container rather than stretching edge to edge (depends on
      T002–T006)

**Checkpoint**: User Stories 1 and 2 both hold independently.

---

## Phase 5: User Story 3 - Confirm responsiveness before shipping changes (Priority: P3)

**Goal**: A complete, recorded pass through the defined breakpoint checklist exists, so
responsiveness can be re-verified the same way in the future.

**Independent Test**: Walk the full breakpoint list in `quickstart.md` against the homepage and
confirm every row is free of layout defects.

### Implementation for User Story 3

- [ ] T012 [US3] Run the full breakpoint checklist table in
      `specs/002-responsive-validation/quickstart.md` (all 9 widths: 320, 360, 375, 414, 768, 1024,
      1280, 1440, 1920px) end-to-end and check off every box in that file, including the
      "Grid reflow (SC-004)" checklist (depends on T002–T011)
- [ ] T013 [US3] Follow the "landscape orientation" edge case in
      `specs/002-responsive-validation/quickstart.md` (short viewport height, wide width) and
      confirm the sticky header + hero do not consume the full visible height (depends on T002–T006)

**Checkpoint**: All three user stories are independently functional, and the full breakpoint matrix
is recorded in `quickstart.md`.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Quality gates and consistency cleanup that span the whole feature.

- [x] T014 Run `npm run typecheck` (`tsc --noEmit`) and fix any type errors in
      `src/routes/index.tsx` and `src/components/mobile-nav.tsx` (Constitution Principle II —
      type-check with no errors)
- [x] T015 Run `npm run lint` and `npm run format` and fix any issues in `src/routes/index.tsx` and
      `src/components/mobile-nav.tsx` (Constitution Principle II)
- [x] T016 Run `npm run build` and confirm it succeeds before pushing to the Lovable-connected
      branch (Constitution Principle IV)
- [x] T017 [P] Update the "no alternate menu" note in the Edge Cases / Assumptions of
      `specs/001-site-baseline/spec.md` to reflect that a mobile nav menu now exists (added in this
      feature), keeping the baseline spec accurate

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately.
- **Foundational (Phase 2)**: Depends on Setup — BLOCKS all user stories (T002–T006 all edit
  `src/routes/index.tsx`, so they run sequentially within this phase).
- **User Stories (Phase 3–5)**: All depend on Foundational (Phase 2) completion.
  - US1 (P1) is the MVP and should be done first.
  - US2 (P2) and US3 (P3) both depend on Foundational but not on each other or on US1's mobile-nav
    work (T007–T009) — they can proceed once Phase 2 is done.
- **Polish (Phase 6)**: Depends on all desired user stories being complete.

### Within Each User Story

- US1: T007 (new file) can start as soon as Foundational is done; T008 depends on T007; T009
  (validation) depends on both T008 and the Foundational layout fixes (T002–T006).
- US2: T010 and T011 both depend only on Foundational (T002–T006); independent of each other.
- US3: T012 depends on everything before it (it validates the full matrix); T013 depends only on
  Foundational.

### Parallel Opportunities

- T007 (`src/components/mobile-nav.tsx`) touches a different file than the Foundational tasks, so
  once Phase 2 is complete it can start immediately alongside Phase 4/5 validation work.
- T010 and T011 (US2) are read-only validation passes and can be done in parallel with each other,
  and in parallel with T007 (US1 implementation), since neither edits shared files.
- T017 (Polish) touches a different file (`specs/001-site-baseline/spec.md`) than T014/T015/T016 and
  can run in parallel with them.

---

## Parallel Example: After Foundational (Phase 2) completes

```bash
# These can run at the same time — different files / read-only validation:
Task: "Create src/components/mobile-nav.tsx per contracts/mobile-nav.md"          # T007
Task: "Run quickstart.md desktop breakpoint checklist (1024–1920px)"              # T010
Task: "Run quickstart.md ultra-wide desktop edge case (2560px)"                   # T011
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 (Setup) and Phase 2 (Foundational) — required for every story.
2. Complete Phase 3 (US1): mobile nav menu + mobile layout + mobile conversion path.
3. **STOP and VALIDATE**: run T009's quickstart checks independently.
4. This alone satisfies the highest-priority responsiveness requirement (mobile).

### Incremental Delivery

1. Setup + Foundational → shared layout fixes land.
2. Add US1 → validate independently → this is the MVP (mobile works end-to-end).
3. Add US2 → validate independently → desktop range confirmed.
4. Add US3 → validate independently → full breakpoint matrix recorded for future reuse.
5. Polish (lint/format/build + spec consistency update).

## Notes

- [P] tasks touch different files and have no dependency on incomplete same-phase work.
- [Story] labels map tasks to `spec.md`'s user stories for traceability.
- Almost all Foundational and US1 work lands in `src/routes/index.tsx` and the new
  `src/components/mobile-nav.tsx` — avoid parallelizing tasks that touch `index.tsx` simultaneously.
- Commit after each task or logical group; do not amend or force-push already-pushed commits
  (Constitution Principle IV).
