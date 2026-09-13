# Implementation Plan: Strong SEO Foundation

**Branch**: `004-seo-improvements` | **Date**: 2026-09-12 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/004-seo-improvements/spec.md`

## Summary

Split the current single-page homepage into 8 independently indexable routes (home,
`/aplicacoes-web`, `/apps-mobile`, `/marketing-digital`, `/social-media`, `/sobre`, `/processo`,
`/contato`), each server-rendering its own unique title/description/canonical/Open Graph/Twitter
metadata, following the file-based routing convention already established by
`politica-de-privacidade.tsx`. The homepage keeps its current sections but turns them into a hub
that summarizes and links out to each dedicated page instead of containing the full content inline.
Structured data gains a machine-readable service catalog and (once real URLs are supplied)
`sameAs` social links, stays nationally scoped per the user's Latin-America-expansion plan, and the
four service pages each emit their own `Service` JSON-LD. Google Search Console verification and
an analytics tag become available via environment variables, off by default. The sitemap is
hand-updated to list all 8 indexable routes. Old in-page anchors (`#sobre`, `#servico-web`, etc.)
are redirected client-side to their new dedicated routes, since URL fragments never reach the
server and can only be handled after the page has already loaded.

## Technical Context

**Language/Version**: TypeScript 5.8, React 19

**Primary Dependencies**: No new npm dependency. Reused — TanStack Router's file-based routing
(already used for `/` and `/politica-de-privacidade`), the existing shadcn/ui primitives, and the
existing `ContactForm`/`openCalModal` components (relocated, not rewritten). New — none; the GA4
script tag is a plain `<script>` emitted from `head()`, not a package.

**Storage**: N/A — no persistence introduced.

**Testing**: No automated test framework is configured (same posture as `002` and `003`).
Validation is a manual pass documented in `quickstart.md`: fetching each route's server-rendered
HTML and checking its metadata/heading structure/JSON-LD, plus click-through navigation checks.

**Target Platform**: Cloudflare Workers via the existing Nitro `cloudflare-module` preset — same
deployment target as the rest of the site, unchanged by this feature.

**Project Type**: Single existing web app; adds 7 new file-based routes and 2 shared layout
components, no new backend service.

**Performance Goals**: No new SSR performance goal beyond today's baseline; the optional analytics
script MUST NOT measurably slow page load (spec SC-004) — loaded as a standard deferred `gtag.js`
snippet, not render-blocking.

**Constraints**: New routes MUST follow TanStack Router's file-based routing convention (Principle
III) — `src/router.tsx`/`src/routeTree.gen.ts` stay generated, never hand-edited. UI MUST reuse
existing shadcn/ui primitives and design tokens (Principle I) — this feature relocates and shares
existing JSX, it does not introduce new visual components. Any Search Console/analytics
identifier MUST be read from environment variables, never committed as a literal value (mirrors the
existing `RESEND_API_KEY` / `.dev.vars` pattern, Principle IV). Lint/format/type-check/build MUST
stay clean (Principle II).

**Scale/Scope**: 7 new route files, 2 new shared layout components (`SiteHeader`, `SiteFooter`), 1
new shared service-detail component, 1 new shared data module (`services-data.ts`) extracting the
`services` array that today lives inline in `index.tsx`, updates to `mobile-nav.tsx` (route links
instead of anchors), one small client-side legacy-anchor-redirect utility, updates to
`public/sitemap.xml`, and additive changes to `__root.tsx`'s global metadata.

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

| Principle                                | Check                                                                                                                                                                                                                                                                                                                                                                                                                            | Result   |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| I. Component-Driven UI (shadcn/ui First) | `SiteHeader`, `SiteFooter`, and a shared service-detail block are extracted from existing JSX in `index.tsx` — no new UI library, no new visual design, only reuse across more routes than today                                                                                                                                                                                                                                 | **PASS** |
| II. Type Safety & Quality Gates          | All new route files, components, and the shared data module MUST type-check/lint/format like the rest of the codebase; `routeTree.gen.ts` regenerates automatically from the new files, never hand-edited                                                                                                                                                                                                                        | **PASS** |
| III. File-Based Routing Discipline       | This feature's core mechanism _is_ adding routes the correct way: flat files under `src/routes`, matching the convention `politica-de-privacidade.tsx` already established                                                                                                                                                                                                                                                       | **PASS** |
| IV. Lovable Sync Integrity               | Shipped as incremental, buildable commits; GSC verification token and GA4 measurement ID are environment variables (`.dev.vars` locally, Worker secrets/vars in production), never committed literals                                                                                                                                                                                                                            | **PASS** |
| V. Simplicity & Content-First Delivery   | Turning anchor sections into real server-rendered pages is _more_ content-first, not less — it directly serves this principle's own cited goals (performance, SEO, maintainability) rather than adding client-side complexity. The legacy-anchor redirect is a single small client-side utility, justified because URL fragments are invisible to the server and can only be resolved after load — not a speculative abstraction | **PASS** |

No violations — Complexity Tracking is not needed for this feature.

_Re-checked after Phase 1 design (research.md, data-model.md, contracts/, quickstart.md): the
concrete design (flat file-based routes, extracted shared components, an env-var-gated
analytics/verification seam, a hand-maintained sitemap) introduces nothing beyond what the table
above already covers. No new violations; table stands unchanged._

## Project Structure

### Documentation (this feature)

```text
specs/004-seo-improvements/
├── plan.md                          # This file (/speckit-plan command output)
├── research.md                      # Phase 0 output (/speckit-plan command)
├── data-model.md                    # Phase 1 output (/speckit-plan command)
├── quickstart.md                    # Phase 1 output (/speckit-plan command)
├── contracts/                       # Phase 1 output (/speckit-plan command)
│   ├── page-metadata-contract.md
│   ├── structured-data-contract.md
│   └── sitemap-contract.md
└── tasks.md                         # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

### Source Code (repository root)

```text
src/
├── routes/
│   ├── index.tsx                    # MODIFIED — becomes a hub: hero + services overview cards
│   │                                  # (linking to dedicated pages) + about/contact teasers;
│   │                                  # own head() keeps the site-wide ProfessionalService JSON-LD
│   │                                  # (now with hasOfferCatalog); mounts the legacy-anchor redirect
│   ├── aplicacoes-web.tsx            # NEW — dedicated service page (own head() + Service JSON-LD)
│   ├── apps-mobile.tsx               # NEW — same shape
│   ├── marketing-digital.tsx         # NEW — same shape
│   ├── social-media.tsx              # NEW — same shape
│   ├── sobre.tsx                     # NEW — About content, extracted (own head())
│   ├── processo.tsx                  # NEW — Process steps, extracted from inside the old
│   │                                  # "Sobre" block (own head())
│   ├── contato.tsx                   # NEW — ContactForm + Agendar reunião + WhatsApp (own head())
│   └── politica-de-privacidade.tsx   # UNCHANGED
├── components/
│   ├── site-header.tsx               # NEW — extracted header/nav; links use TanStack <Link to=...>
│   │                                  # instead of `<a href="#...">`
│   ├── site-footer.tsx               # NEW — extracted footer; social icons resolve from
│   │                                  # SOCIAL_LINKS config, omitted/marked "em breve" if unset
│   ├── service-detail.tsx            # NEW — shared headline/summary/bullets block, reused by all
│   │                                  # 4 service pages (previously inline in index.tsx)
│   ├── mobile-nav.tsx                # MODIFIED — navLinks become route paths, not anchors
│   └── contact-form.tsx              # UNCHANGED (relocated to be used from contato.tsx)
└── lib/
    ├── services-data.ts              # NEW — the `services` array (id, path, icon, title, desc,
    │                                  # tag, headline, summary, bullets), single source of truth
    │                                  # for home's cards, each service page, and the JSON-LD catalog
    ├── structured-data.ts            # NEW — builds the shared ProfessionalService JSON-LD
    │                                  # (hasOfferCatalog + sameAs) and the per-service Service JSON-LD
    ├── legacy-anchor-redirect.ts      # NEW — hash → route lookup + a small hook used once on the
    │                                  # home route to replace old in-page anchors
    └── site-config.ts                # MODIFIED — adds SOCIAL_LINKS (empty/placeholder-safe)

public/
└── sitemap.xml                       # MODIFIED — lists all 8 indexable routes with lastmod
```

**Structure Decision**: Everything stays inside the existing `src/` tree, following the same
flat file-based routing convention `politica-de-privacidade.tsx` already established — no route
groups or nested directories are needed for 8 top-level pages. Shared UI extracted from
`index.tsx` goes into `src/components/` (peer to the existing `mobile-nav.tsx` and
`contact-form.tsx`), and shared non-UI data/logic goes into `src/lib/` (peer to the existing
`site-config.ts`), matching the project's existing split between those two directories. There is
still no `tests/` directory — same reasoning as `002` and `003` (no automated test runner
configured); validation is tracked in `quickstart.md`.

## Complexity Tracking

> Not applicable — the Constitution Check above found no violations requiring justification.
