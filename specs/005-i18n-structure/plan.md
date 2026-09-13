# Implementation Plan: i18n Structure (Portuguese, English, Spanish)

**Branch**: `005-i18n-structure` | **Date**: 2026-09-13 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/005-i18n-structure/spec.md`

## Summary

Add English (`/en/...`) and Spanish (`/es/...`) variants of all 9 pages, mirroring the existing
Portuguese (default, unprefixed) ones, via TanStack Router directory-based routing
(`src/routes/en/`, `src/routes/es/`) with each locale's route file a thin wrapper around a shared
page component. Content is extracted from today's route files into typed,
`Record<Locale, ...>`-shaped data modules (extending the pattern `services-data.ts` already uses),
so each page's JSX/layout is written once and rendered with whichever locale's content the route
supplies — no new npm dependency; a hand-rolled, fully-typed content dictionary is deliberately
chosen over an i18n library given the fixed 3-language set and lack of pluralization/interpolation
needs. The contact form's zod schema becomes a locale-parameterized factory, and the confirmation
e-mail is sent in the language the visitor submitted from. Every page variant gets correct
canonical + hreflang links, and the sitemap grows from 8 to 21 URLs (7 indexable pages × 3
languages; the privacy policy — translated but still `noindex` — stays out of it in all 3).

## Technical Context

**Language/Version**: TypeScript 5.8, React 19

**Primary Dependencies**: No new npm dependency. Reused — TanStack Router's directory-based
file routing (new to this project, but a standard, already-supported convention of the same
router already in use), the existing shadcn/ui primitives, `react-hook-form` + `zod` +
`@hookform/resolvers` (contact form), `resend` (confirmation e-mail).

**Storage**: N/A — translated content lives in versioned TypeScript data modules, not a database.

**Testing**: No automated test framework configured (same posture as `002`–`004`). Validation is a
manual pass documented in `quickstart.md`.

**Target Platform**: Cloudflare Workers via the existing Nitro `cloudflare-module` preset —
unchanged by this feature.

**Project Type**: Single existing web app; adds 16 new route files (8 pages × 2 new locales) as
thin wrappers, plus shared page components and locale-keyed content data modules — no new backend
service.

**Performance Goals**: No new goal beyond today's SSR baseline; content is static data bundled at
build time (no runtime translation fetch/lazy-load), so no added latency per locale.

**Constraints**: New routes MUST follow TanStack Router's file-based routing convention (Principle
III) — directory-per-locale, mirroring the existing flat Portuguese routes. UI MUST reuse existing
shadcn/ui primitives (Principle I) — this feature restructures content/routing, not visual design.
Lint/format/type-check/build MUST stay clean (Principle II). No new client-side state/library
introduced without justification (Principle V) — the content-dictionary approach is the direct
expression of that principle applied to this feature's actual needs (3 fixed languages, static
text, no pluralization).

**Scale/Scope**: 16 new route files, ~6 new content data modules (home, services ×4 sharing one
shape, about, methodology, contact, privacy-policy, plus a `common.ts` for shared nav/footer/button
strings), a `Locale` type + `PAGE_PATHS` lookup for the language selector's "same page, other
language" URLs, a new `LanguageSelector` component wired into `SiteHeader`/`MobileNav`, the contact
schema turned into a per-locale factory, 2 new confirmation-e-mail language variants, hreflang link
generation reused across all 27 route files (9 pages × 3 locales), and a 21-URL sitemap.

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

| Principle | Check | Result |
| --- | --- | --- |
| I. Component-Driven UI (shadcn/ui First) | No new UI primitives; existing `SiteHeader`/`SiteFooter`/`ContactForm`/page sections are extended with a `locale` prop and a new small `LanguageSelector` built from existing patterns (a dropdown, matching e.g. `MobileNav`'s existing Sheet-based menu style) | **PASS** |
| II. Type Safety & Quality Gates | Content dictionaries are typed `Record<Locale, Shape>` so TypeScript itself catches a missing-locale entry at compile time; `routeTree.gen.ts` regenerates automatically for the 16 new files, never hand-edited | **PASS** |
| III. File-Based Routing Discipline | New locale routes follow TanStack Router's directory-based file routing exactly as the framework intends — a standard, supported convention, not a workaround | **PASS** |
| IV. Lovable Sync Integrity | Shipped as incremental, buildable commits; no secrets involved | **PASS** |
| V. Simplicity & Content-First Delivery | Deliberately rejects an i18n library (research.md §1) in favor of a typed static dictionary — the simpler option that fully covers this feature's actual needs (3 fixed languages, no pluralization/interpolation, no runtime language switching beyond navigation). Shared page components eliminate 3x JSX duplication across locales | **PASS** |

No violations — Complexity Tracking is not needed for this feature.

_Re-checked after Phase 1 design (research.md, data-model.md, contracts/, quickstart.md): the
concrete design (directory-based locale routes, shared page components, typed content
dictionaries, a locale-parameterized contact schema/e-mail, a centralized hreflang builder)
introduces nothing beyond what the table above already covers. No new violations; table stands
unchanged._

## Project Structure

### Documentation (this feature)

```text
specs/005-i18n-structure/
├── plan.md                          # This file (/speckit-plan command output)
├── research.md                      # Phase 0 output (/speckit-plan command)
├── data-model.md                    # Phase 1 output (/speckit-plan command)
├── quickstart.md                    # Phase 1 output (/speckit-plan command)
├── contracts/                       # Phase 1 output (/speckit-plan command)
│   ├── content-dictionary-contract.md
│   ├── routing-contract.md
│   └── hreflang-sitemap-contract.md
└── tasks.md                         # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

### Source Code (repository root)

```text
src/
├── routes/
│   ├── index.tsx, about.tsx, methodology.tsx, contact.tsx, web-apps.tsx,
│   │   mobile-apps.tsx, digital-marketing.tsx, social-media.tsx,
│   │   privacy-policy.tsx           # UNCHANGED paths — become thin locale="pt" wrappers
│   │   around the same shared page components used by en/es
│   ├── en/
│   │   ├── index.tsx, about.tsx, methodology.tsx, contact.tsx, web-apps.tsx,
│   │   │   mobile-apps.tsx, digital-marketing.tsx, social-media.tsx,
│   │   │   privacy-policy.tsx       # NEW — each: createFileRoute("/en/...") + locale="en"
│   └── es/
│       └── (same 9 files, locale="es")  # NEW
├── pages/                            # NEW — shared page components, one per logical page,
│   │                                  # each taking `locale` and rendering that locale's content
│   ├── home-page.tsx, about-page.tsx, methodology-page.tsx, contact-page.tsx,
│   │   service-page.tsx (reused by all 4 services), privacy-policy-page.tsx
├── content/                          # NEW — typed Record<Locale, ...> content per page
│   ├── locale.ts                     # Locale type, LOCALES list, PAGE_PATHS lookup
│   ├── common.ts                     # nav/footer/button/generic strings shared across pages
│   ├── home.ts, about.ts, methodology.ts, contact.ts, services.ts, privacy-policy.ts
├── components/
│   ├── language-selector.tsx         # NEW — header language dropdown
│   ├── site-header.tsx, mobile-nav.tsx, site-footer.tsx  # MODIFIED — take `locale`, render
│   │                                  # LanguageSelector, use content/common.ts strings
│   └── contact-form.tsx              # MODIFIED — takes `locale`, uses per-locale schema/labels
└── lib/
    ├── contact-schema.ts             # MODIFIED — schema becomes buildContactSchema(locale)
    ├── contact-confirmation-email.ts # MODIFIED — takes locale, selects template copy
    ├── send-contact-email.server.ts  # MODIFIED — validated `locale` field selects e-mail language
    ├── seo-links.ts                  # NEW — builds canonical + hreflang link list for a page/locale
    └── services-data.ts              # MODIFIED — service copy fields become Record<Locale, ...>

public/
└── sitemap.xml                       # MODIFIED — 21 URLs (7 indexable pages × 3 locales)
```

**Structure Decision**: `src/routes/en/` and `src/routes/es/` mirror the root's flat Portuguese
routes as subdirectories — TanStack Router's standard directory-based file routing, not a custom
scheme. New `src/pages/` holds the actual page JSX (written once per logical page); new
`src/content/` holds the translated data those pages render. This split is what lets 27 route
files exist without 27 copies of any page's layout — each route file is ~5 lines (route
registration + `<XPage locale="en" />`). `src/lib/` gains the cross-cutting pieces (schema factory,
email template, hreflang builder) that already lived there for their Portuguese-only versions.

## Complexity Tracking

> Not applicable — the Constitution Check above found no violations requiring justification.
