# Implementation Plan: Full Responsive Layout (Desktop & Mobile)

**Branch**: `002-responsive-validation` | **Date**: 2026-08-23 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/002-responsive-validation/spec.md`

## Summary

The existing one-page homepage (`src/routes/index.tsx`) must render correctly with no horizontal
scroll, clipping, or overlap across the breakpoint range 360px–1920px, and gain a mobile navigation
menu (drawer) so the four nav destinations (Serviços, Sobre, Processo, Contato) stay reachable when
the desktop nav is hidden below the `md` (768px) breakpoint — matching desktop navigation parity.
The approach reuses the project's existing shadcn/ui primitives (`Sheet`, `Button`) rather than
adding new UI dependencies, and validation is a manual/visual pass against a fixed breakpoint list
(no new test framework is introduced).

## Technical Context

**Language/Version**: TypeScript 5.8, React 19

**Primary Dependencies**: TanStack Start (SSR) + TanStack Router (file-based routing), Tailwind CSS
v4, shadcn/ui component set on Radix UI (`Sheet` for the mobile drawer, `Button` for the trigger),
`lucide-react` (`Menu` / `X` icons) — all already present in the project, no new dependency added.

**Storage**: N/A — static, hard-coded page content; no data persistence involved.

**Testing**: No automated test framework is configured in this project (no CI yet, per the
constitution's Development Workflow section). Validation for this feature is a manual/visual pass
against the breakpoint list in Success Criteria, documented as a repeatable checklist in
`quickstart.md`. Introducing an automated visual-regression/E2E framework is treated as
out-of-scope for this feature (see `research.md`).

**Target Platform**: Web — evergreen desktop and mobile browsers, server-rendered via Nitro on
Cloudflare (existing deployment target, unchanged by this feature).

**Project Type**: Single web app (existing TanStack Start project under `src/`) — not a
frontend/backend split; this feature touches only the frontend route and its shared UI primitives.

**Performance Goals**: No new performance targets introduced; the change must not regress the
existing SSR-first rendering approach (Constitution Principle V).

**Constraints**: MUST reuse existing shadcn/ui primitives and Tailwind utility classes (Principle
I); MUST pass `npm run lint`, `npm run format`, and type-check before commit, and `npm run build`
before push (Principle II, IV); MUST NOT hand-edit generated router files (Principle III).

**Scale/Scope**: One route (`src/routes/index.tsx`), one new small piece of client UI state (mobile
menu open/closed), 8 validation breakpoints (360, 375, 414, 768, 1024, 1280, 1440, 1920px). No new
routes, no new backend surface, no new data entities.

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

| Principle                                | Check                                                                                                                                                  | Result   |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| I. Component-Driven UI (shadcn/ui First) | Mobile menu MUST be built from existing `Sheet` + `Button` primitives in `src/components/ui`, no new UI library added                                  | **PASS** |
| II. Type Safety & Quality Gates          | No generated files touched; lint/format/type-check remain required before commit                                                                       | **PASS** |
| III. File-Based Routing Discipline       | No new routes; only `src/routes/index.tsx` content/markup changes                                                                                      | **PASS** |
| IV. Lovable Sync Integrity               | Work happens as normal commits on a working branch; no history rewriting involved                                                                      | **PASS** |
| V. Simplicity & Content-First Delivery   | New client state is limited to a single boolean (menu open/closed), directly justified by the mobile-nav requirement; no speculative abstraction added | **PASS** |

No violations — Complexity Tracking is not needed for this feature.

## Project Structure

### Documentation (this feature)

```text
specs/002-responsive-validation/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
├── contracts/           # Phase 1 output (/speckit-plan command)
│   └── mobile-nav.md
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

### Source Code (repository root)

```text
src/
├── routes/
│   └── index.tsx          # Homepage route — primary target of this feature (layout + mobile nav)
├── components/
│   └── ui/                 # Existing shadcn/ui primitives — reused as-is:
│       ├── sheet.tsx        #   mobile nav drawer
│       └── button.tsx       #   drawer trigger
├── hooks/
│   └── use-mobile.tsx      # Existing viewport/breakpoint hook — available if needed for conditional logic
└── styles.css               # Tailwind v4 tokens; default breakpoint scale (sm/md/lg/xl/2xl), unchanged
```

**Structure Decision**: This is a single existing web application, not a multi-project setup — the
template's "Option 1/2/3" scaffolding does not apply. The feature is implemented entirely within
the current `src/` tree by editing `src/routes/index.tsx` and reusing existing `src/components/ui`
primitives; no new top-level directories are created. There is no `tests/` directory because the
project has no automated test runner configured (see Technical Context → Testing); validation is
tracked in `quickstart.md` instead.

## Complexity Tracking

> Not applicable — the Constitution Check above found no violations requiring justification.
