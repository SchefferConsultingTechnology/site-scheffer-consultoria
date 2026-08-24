# Implementation Plan: Contact Form & Meeting Scheduling

**Branch**: `003-contact-form-scheduling` | **Date**: 2026-08-23 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/003-contact-form-scheduling/spec.md`

## Summary

Replace the homepage's `mailto:` contact link with an on-page form (name/e-mail/message required,
phone/company optional) that delivers messages via a server-side function calling the Resend API,
and replace the "Agendar reunião" placeholder with a Cal.com modal embed triggered on click — the
visitor never leaves the site for either flow. Both reuse already-installed dependencies
(react-hook-form, zod, @hookform/resolvers, shadcn/ui primitives) plus two new, narrowly-scoped
packages (`resend`, `@calcom/embed-react`) for the parts the project has no existing capability for.

## Technical Context

**Language/Version**: TypeScript 5.8, React 19

**Primary Dependencies**: Reused — TanStack Start server functions (`createServerFn`, already used
in `src/start.ts`'s middleware), `react-hook-form` + `zod` + `@hookform/resolvers` + shadcn/ui
`Form`/`Input`/`Textarea`/`Button` (all already in `package.json` and `src/components/ui`). New —
`resend` (HTTP-based transactional e-mail SDK, Workers-compatible; no SMTP available on Cloudflare
Workers) and `@calcom/embed-react` (official Cal.com embed, used in modal mode).

**Storage**: N/A — per spec Assumptions, no message database/CMS is introduced; a submission is
transmitted to Resend and discarded, not persisted anywhere in this codebase.

**Testing**: No automated test framework is configured (same posture as `002-responsive-validation`).
Validation is a manual pass documented in `quickstart.md`: real form submission + inline validation
checks, plus a scripted request-level check of the server function.

**Target Platform**: Cloudflare Workers via the existing Nitro `cloudflare-module` preset — same
deployment target as the rest of the site, unchanged by this feature.

**Project Type**: Single existing web app; adds one server function and one client component, no
new routes, no separate backend service.

**Performance Goals**: Visitor sees a success or error state within 5 seconds of submitting
(spec SC-003); no new goals beyond that.

**Constraints**: MUST reuse the existing shadcn/ui + react-hook-form + zod stack (Principle I) MUST
NOT persist submissions (spec Assumptions, Principle V); the Resend API key MUST be stored as a
Cloudflare Worker secret / `.dev.vars` entry, never committed (matches the project's existing
`.gitignore` "Wrangler / Cloudflare" section); MUST pass lint/format/type-check and build
(Principle II, IV) before commit/push.

**Scale/Scope**: One new server function (`sendContactEmail`), one new form component, one Cal.com
modal trigger wired to the existing "Agendar reunião" button. No new pages/routes, no new data
entities beyond the transient submission described in `data-model.md`.

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

| Principle                                | Check                                                                                                                                                                                                                                                                                                       | Result   |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| I. Component-Driven UI (shadcn/ui First) | Form built entirely from existing `Form`/`Input`/`Textarea`/`Button` primitives; no ad hoc styling library added. `@calcom/embed-react` is a new UI dependency, but no existing primitive covers scheduling — introducing it is the reuse-first path applied to a genuinely new capability, not a duplicate | **PASS** |
| II. Type Safety & Quality Gates          | New server function and component MUST type-check/lint/format like the rest of the codebase; no generated files touched                                                                                                                                                                                     | **PASS** |
| III. File-Based Routing Discipline       | No new routes; the server function is a TanStack RPC-style function, not a file-route, and lives outside `src/routes`                                                                                                                                                                                       | **PASS** |
| IV. Lovable Sync Integrity               | Normal commits on a working branch; secrets kept out of git via `.dev.vars`/Worker secrets, consistent with existing `.gitignore`                                                                                                                                                                           | **PASS** |
| V. Simplicity & Content-First Delivery   | No persistence layer added; anti-abuse kept to a honeypot + time-trap (no new infra like a KV namespace) for v1; Cal.com wired as a click-triggered modal, not a permanently inline widget, so no unrequested layout weight is added                                                                        | **PASS** |

No violations — Complexity Tracking is not needed for this feature.

## Project Structure

### Documentation (this feature)

```text
specs/003-contact-form-scheduling/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md         # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
├── contracts/           # Phase 1 output (/speckit-plan command)
│   ├── send-contact-email.md
│   └── cal-embed.md
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

### Source Code (repository root)

```text
src/
├── routes/
│   └── index.tsx                    # Contact section: renders ContactForm, wires "Agendar
│                                      # reunião" button to the Cal.com modal trigger
├── components/
│   ├── contact-form.tsx             # NEW — form UI (react-hook-form + zod resolver + shadcn
│   │                                  # Form/Input/Textarea/Button), calls the server function
│   └── ui/                           # Existing shadcn/ui primitives — reused as-is:
│       ├── form.tsx
│       ├── input.tsx
│       ├── textarea.tsx
│       └── button.tsx
└── lib/
    ├── contact-schema.ts            # NEW — zod schema shared by client form validation and the
    │                                  # server function's own re-validation
    └── send-contact-email.server.ts # NEW — TanStack server function calling Resend; `.server.ts`
                                       # suffix follows the project's existing eslint.config.js
                                       # convention for server-only modules
```

**Structure Decision**: Everything lives inside the existing `src/` tree; no new top-level
directories. The server function is colocated in `src/lib/` (next to the project's other
non-route utilities like `error-capture.ts`) rather than a new `server/` folder, and named with the
`.server.ts` suffix the project's own ESLint config already documents as the TanStack Start
convention for server-only modules (see `eslint.config.js`'s `no-restricted-imports` message).
There is still no `tests/` directory — same reasoning as `002-responsive-validation` (no automated
test runner configured); validation is tracked in `quickstart.md`.

## Complexity Tracking

> Not applicable — the Constitution Check above found no violations requiring justification.
