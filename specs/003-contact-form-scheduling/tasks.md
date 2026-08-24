---
description: "Task list template for feature implementation"
---

# Tasks: Contact Form & Meeting Scheduling

**Input**: Design documents from `/specs/003-contact-form-scheduling/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/send-contact-email.md,
contracts/cal-embed.md, quickstart.md

**Tests**: Not included — same posture as `002-responsive-validation`: no test framework is
configured, validation is manual against `quickstart.md`.

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

**Purpose**: Install the two new dependencies and provide the local secret they need.

- [x] T001 Add `resend` and `@calcom/embed-react` to `package.json` and install them
- [x] T002 [P] Add `RESEND_API_KEY=re_...` to `.dev.vars` at the repository root (gitignored;
      used by the server function created in Phase 3) — use Resend's sandbox key/sender
      (`onboarding@resend.dev`) if the project's sending domain isn't DNS-verified yet, per
      `specs/003-contact-form-scheduling/quickstart.md`

---

## Phase 2: Foundational

No cross-story blocking infrastructure exists for this feature: User Story 1's e-mail stack and
User Story 2's Cal.com modal are fully independent subsystems that only share the same page section
for layout purposes. Each entity/component is created within the earliest story that needs it (see
Phase 3). Proceed directly to Phase 3 once Phase 1 is complete.

---

## Phase 3: User Story 1 - Send a message through the contact form (Priority: P1) 🎯 MVP

**Goal**: A visitor fills in the on-page form and the message reaches the company, without
depending on the visitor's own e-mail client.

**Independent Test**: Submit the form with valid data at `/`; confirm an on-page success
confirmation appears and the message is delivered.

### Implementation for User Story 1

- [X] T003 [US1] Create `src/lib/contact-schema.ts`: the shared zod schema for name (required,
      2–100 chars), email (required, well-formed), phone (optional, 8–20 chars), company (optional,
      up to 100 chars), message (required, 10–2000 chars), honeypot (required, must be empty), and
      renderedAt (required, epoch ms) — per `specs/003-contact-form-scheduling/data-model.md`
- [X] T004 [US1] Create `src/lib/send-contact-email.server.ts`: a TanStack `createServerFn` that
      re-validates the payload against `contact-schema.ts`, silently returns `{ ok: true }` without
      calling Resend if the honeypot is non-empty or `renderedAt` fails the time-trap check, and
      otherwise calls the Resend API to send the message to `contato@schefferconsultoria.com.br`
      with `replyTo` set to the visitor's e-mail, returning `{ ok: true }` or
      `{ ok: false, error: "validation" | "delivery_failed" }` — per
      `specs/003-contact-form-scheduling/contracts/send-contact-email.md` (depends on T003)
- [X] T005 [US1] Create `src/components/contact-form.tsx`: a form using `react-hook-form` +
      `@hookform/resolvers/zod` (resolver from `contact-schema.ts`) and the existing shadcn/ui
      `Form`, `Input`, `Textarea`, `Button` primitives, with visible fields for name/email/message
      (required) and phone/company (optional), a hidden honeypot input, a `renderedAt` value
      captured on mount, and a submit handler calling `sendContactEmail` — on success, show an
      on-page confirmation in place of the form (depends on T003, T004)
- [X] T006 [US1] In `src/routes/index.tsx`, replace the `mailto:` e-mail button in the Contact CTA
      section with `<ContactForm />`, removing the now-unused `Mail` icon usage on that button (the
      `Mail` icon import stays in use elsewhere in the file — check before removing the import)
      (depends on T005)
- [ ] T007 [US1] Follow the "Contact form (User Story 1)" section of
      `specs/003-contact-form-scheduling/quickstart.md` (all 4 steps) and confirm every step
      passes, including the timing checks for SC-001 and SC-003 (depends on T006)

**Checkpoint**: User Story 1 is fully functional and independently testable.

---

## Phase 4: User Story 2 - Book a meeting directly (Priority: P2)

**Goal**: Clicking "Agendar reunião" opens a real, in-page Cal.com scheduling modal instead of the
current `#` placeholder.

**Independent Test**: Click "Agendar reunião" and confirm a modal opens showing real availability,
with no navigation away from the page.

### Implementation for User Story 2

- [X] T008 [P] [US2] Create `src/lib/open-cal-modal.ts`: exports a function that calls
      `@calcom/embed-react`'s `getCalApi()` then `cal("modal", { calLink })`, with the company's
      Cal.com `calLink` as a named constant in this file — per
      `specs/003-contact-form-scheduling/contracts/cal-embed.md`
- [X] T009 [US2] In `src/routes/index.tsx`, replace the "Agendar reunião" button's `href="#"` with
      an `onClick` calling the function from T008 (depends on T008)
- [ ] T010 [US2] Follow the "Scheduling modal (User Story 2)" section of
      `specs/003-contact-form-scheduling/quickstart.md` (all 3 steps) and confirm every step
      passes, including SC-004 (depends on T009)

**Checkpoint**: User Story 2 is fully functional and independently testable — fully independent of
User Story 1.

---

## Phase 5: User Story 3 - Reach the company even if the form fails (Priority: P3)

**Goal**: If message delivery fails, the visitor sees a clear error and a fallback way to reach the
company, instead of a dead end.

**Independent Test**: Force a delivery failure and confirm the visitor sees an error state with a
visible fallback e-mail link.

### Implementation for User Story 3

- [X] T011 [US3] In `src/components/contact-form.tsx`, handle the
      `{ ok: false, error: "delivery_failed" }` response from `sendContactEmail`: show a clear
      inline error message plus a visible fallback `mailto:contato@schefferconsultoria.com.br`
      link/address, without discarding what the visitor already typed (depends on T006)
- [ ] T012 [US3] Follow the "Failure fallback (User Story 3)" section of
      `specs/003-contact-form-scheduling/quickstart.md` and confirm the fallback appears correctly
      on a forced delivery failure, then restore the valid `RESEND_API_KEY` (depends on T011)

**Checkpoint**: All three user stories are independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Quality gates, mobile parity, and consistency cleanup that span the whole feature.

- [ ] T013 Follow the "Mobile" section of `specs/003-contact-form-scheduling/quickstart.md` at
      375px width and confirm the form and the Cal.com modal are both fully usable, with no
      regression against `specs/002-responsive-validation/quickstart.md` (SC-005) (depends on T007,
      T010)
- [X] T014 Run `npm run typecheck` and fix any type errors in `src/lib/contact-schema.ts`,
      `src/lib/send-contact-email.server.ts`, `src/lib/open-cal-modal.ts`,
      `src/components/contact-form.tsx`, and `src/routes/index.tsx` (Constitution Principle II)
- [X] T015 Run `npm run lint` and `npm run format` and fix any issues in the same files
      (Constitution Principle II)
- [X] T016 Run `npm run build` and confirm it succeeds before pushing to the Lovable-connected
      branch (Constitution Principle IV)
- [X] T017 [P] Update the Edge Cases / Assumptions in `specs/001-site-baseline/spec.md` to note
      that the `mailto:` and "Agendar reunião" placeholder gaps recorded there are now resolved by
      this feature

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately.
- **Foundational (Phase 2)**: Empty for this feature (see note above) — proceed directly from Setup
  to the user stories.
- **User Stories (Phase 3–5)**: All depend on Setup (Phase 1) completion.
  - US1 (P1) is the MVP and should be done first.
  - US2 (P2) is fully independent of US1 — it can start immediately after Setup, in parallel with
    US1 if staffed.
  - US3 (P3) depends on US1 (it adds an error-state branch to the same `contact-form.tsx` and
    `send-contact-email.server.ts` built in Phase 3) — it is not independent of US1 the way US2 is.
- **Polish (Phase 6)**: Depends on all desired user stories being complete.

### Within Each User Story

- US1: T003 → T004 → T005 → T006 → T007, strictly sequential (each depends on the previous file
  existing).
- US2: T008 (new file) can start as soon as Setup is done; T009 depends on T008; T010 depends on
  T009.
- US3: T011 depends on T006 (US1's form must exist first); T012 depends on T011.

### Parallel Opportunities

- T002 (Setup, `.dev.vars`) can run in parallel with T001 (`package.json`) — different files.
- T008 (`src/lib/open-cal-modal.ts`, US2) can run in parallel with all of US1's tasks (T003–T007)
  once Setup is done — fully disjoint files and logic.
- T017 (Polish, `specs/001-site-baseline/spec.md`) can run in parallel with T014–T016.

---

## Parallel Example: After Setup (Phase 1) completes

```bash
# US1 and US2 can proceed at the same time — disjoint files:
Task: "Create src/lib/contact-schema.ts per data-model.md"                    # T003 (US1, start of chain)
Task: "Create src/lib/open-cal-modal.ts per contracts/cal-embed.md"           # T008 (US2, start of chain)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 (Setup).
2. Complete Phase 3 (US1): schema → server function → form → wire into the route → validate.
3. **STOP and VALIDATE**: run T007's quickstart checks independently.
4. This alone replaces the unreliable `mailto:` mechanism with a working contact form — the
   feature's single most important job.

### Incremental Delivery

1. Setup → both subsystems' dependencies are ready.
2. Add US1 → validate independently → contact form works end-to-end (MVP).
3. Add US2 → validate independently → scheduling modal works, fully independent of US1.
4. Add US3 → validate independently → failure fallback covers US1's one weak point.
5. Polish (mobile parity check, lint/format/build, baseline spec consistency update).

## Notes

- [P] tasks touch different files and have no dependency on incomplete same-phase work.
- [Story] labels map tasks to `spec.md`'s user stories for traceability.
- US3 is a real exception to "most stories should be independent": it extends US1's own files
  rather than adding new ones, so it is ordered after US1 even though it could in principle be
  built alongside US2.
- Commit after each task or logical group; do not amend or force-push already-pushed commits
  (Constitution Principle IV).
