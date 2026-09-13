# Phase 0 Research: i18n Structure (Portuguese, English, Spanish)

No `NEEDS CLARIFICATION` markers remain in the Technical Context — the spec-level decisions were
resolved with the user. This phase resolves the technical unknowns needed to implement them.

## 1. Library vs. hand-rolled content dictionary

**Decision**: A typed, hand-rolled content dictionary (`Record<Locale, PageContent>` per page in
`src/content/`) — no i18n library (`react-i18next`, `@lingui/react`, etc.).

**Rationale**: This site has exactly 3 fixed languages, chosen by the business, not
user-extensible; content is static prose known at build time (no runtime fetch, no user-generated
or dynamic strings); and there is no pluralization or complex interpolation need (the one dynamic
value — a visitor's name in the confirmation e-mail — is a single template-literal substitution).
None of the problems an i18n library exists to solve (namespace lazy-loading, plural rules across
many locales, runtime language detection, translator-facing tooling) apply here. A plain
`Record<Locale, T>` object gets a real advantage a string-keyed library doesn't provide for free:
TypeScript itself refuses to compile if any locale is missing a field, catching an incomplete
translation at build time instead of a silent fallback at runtime. This is the direct application
of Constitution Principle V — the simpler option fully covers this feature's actual requirements.

**Alternatives considered**: `react-i18next` — rejected; would add a runtime dependency, a
provider tree, and a string-key indirection (`t("about.heading")`) that trades compile-time safety
for flexibility this project doesn't need. Worth revisiting only if the language count grows past
what's comfortable to hand-maintain as literal objects, or if content needs to become
editor-managed (CMS-driven) rather than developer-authored — neither is the case today.

## 2. Routing structure for locale-prefixed pages

**Decision**: Directory-based file routes — `src/routes/en/<page>.tsx` and
`src/routes/es/<page>.tsx`, mirroring the existing flat `src/routes/<page>.tsx` (Portuguese, kept
exactly where it is). Each locale route file is a thin wrapper: register the path via
`createFileRoute`, supply that locale's `head()` (title/description/canonical/hreflang, from
`src/lib/seo-links.ts` + that page's content module), and render the shared page component with
`locale="en"` (or `"es"`).

**Rationale**: TanStack Router's file-based routing supports nested directories as a first-class,
standard convention — this isn't a custom scheme layered on top of it. It keeps the 27 total route
files organized by locale in the file tree (9 per language) rather than 18 new flatly-named files
(`en.about.tsx`, `es.about.tsx`, ...) competing alphabetically with the existing 9 Portuguese
ones in a single flat list.

**Alternatives considered**: Flat dot-notation filenames (`en.about.tsx`) — also valid in TanStack
Router, but rejected for readability once the file count doubles/triples; a single dynamic
`$locale.tsx` catch-all route — rejected because it would require default-locale URLs to also
carry a (possibly optional) `$locale` param, risking exactly the kind of default-route disturbance
the spec explicitly rules out (Portuguese URLs must not change again), and because per-locale
`head()` metadata (static title/description per page/locale) is more natural as separate route
files than as runtime branches inside one shared route.

## 3. Sharing page layout without tripling JSX

**Decision**: Extract each logical page's JSX into `src/pages/<page>-page.tsx`, taking a `locale:
Locale` prop (and, for the 4 service pages, reusing one `service-page.tsx` parameterized by which
service, same as today's `ServiceDetail` pattern). The component looks up its own content via
`content[locale]` and renders it; it does not know or care which route file rendered it.

**Rationale**: Directly avoids the alternative of copy-pasting each page's layout 3 times (once per
locale route file), which would turn every future layout tweak into a 3-file edit and an easy
source of the 3 language variants silently drifting apart visually. This mirrors the project's
existing `ServiceDetail` extraction from `004-seo-improvements` — one shared presentational
component, multiple thin call sites.

**Alternatives considered**: Duplicating JSX per locale route file — rejected for the maintenance-
drift risk above; a runtime `useLocale()` React context read from the router instead of an explicit
prop — rejected as an unnecessary indirection when the locale is already statically known at each
route's own registration (Principle V: no runtime mechanism where a compile-time one suffices).

## 4. Language selector: "same page, other language" navigation

**Decision**: A `PAGE_PATHS` lookup in `src/content/locale.ts` — one entry per logical page, e.g.
`{ about: { pt: "/about", en: "/en/about", es: "/es/about" } }`. Each page component receives (in
addition to `locale`) a `page` key identifying itself in this table; `LanguageSelector` reads both
to compute the other two languages' URLs for a `<Link>` to each.

**Rationale**: This is the same shape as `services-data.ts`'s existing `path` field, just widened
to 3 languages instead of 1 — reusing an established pattern rather than inventing a new one (e.g.
URL string-rewriting/pattern-matching the current path, which would be more "automatic" but far
more fragile and implicit than an explicit lookup table for a fixed set of 9 pages).

**Alternatives considered**: Deriving the target URL by string-replacing the current pathname's
locale segment — rejected as fragile (breaks the moment a page's slug isn't spelled identically
across all 3 languages, which privacy-policy's translated content might eventually want) and less
explicit than a lookup table that's trivial to audit.

## 5. hreflang + canonical per page/locale

**Decision**: A `buildSeoLinks(page, locale)` helper in `src/lib/seo-links.ts` returning the
`links` array every route's `head()` spreads in: `rel="canonical"` for that page's own URL in that
locale, plus one `rel="alternate" hreflang="{pt|en|es}"` per language variant (from the same
`PAGE_PATHS` table), plus one `hreflang="x-default"` pointing at the Portuguese (default) URL —
the standard convention search engines expect for signaling a language-agnostic default.

**Rationale**: Centralizing this in one helper, driven by the same `PAGE_PATHS` table the language
selector uses, guarantees the two can't drift out of sync with each other (the selector's links and
the hreflang links are always the same 3 URLs, computed once).

**Alternatives considered**: Hand-writing the alternate-language `<link>` tags inline in each of
the 27 route files — rejected as exactly the kind of copy-paste that silently rots when a URL
changes in only 26 of 27 places.

## 6. Contact form validation messages and confirmation e-mail language

**Decision**: `src/lib/contact-schema.ts`'s `contactSchema` becomes `buildContactSchema(locale)`,
a function returning a zod schema with that locale's validation-message strings baked in; the
contact page passes its own `locale` when constructing the resolver. The submitted form payload
includes a validated `locale` field (one of the 3 codes); `sendContactEmail` (server-side) uses it
to pick which of the 3 confirmation-e-mail templates (`buildContactConfirmationEmail`, now
locale-aware) to send — not the Accept-Language header or any other signal, since the visitor's
chosen page language is the one unambiguous, already-known source of truth.

**Rationale**: Both the client-visible messages and the server-sent e-mail need to agree on
language; passing the page's own locale explicitly through the payload (rather than re-deriving it
server-side from headers, which can be unreliable behind proxies/CDNs) is simple and exactly
matches what FR-011 asks for ("same language as the page the visitor submitted from").

**Alternatives considered**: Inferring language server-side from the `Accept-Language` request
header — rejected: that reflects the visitor's browser/OS setting, not which page (language) they
were actually looking at and typed into, which could differ and would violate FR-011's intent.

## 7. Untranslated 404 page

**Decision**: The existing single `NotFoundComponent` in `__root.tsx` (Portuguese-only) remains the
fallback for any unmatched route, regardless of attempted locale prefix. It is not translated as
part of this feature.

**Rationale**: FR-009 requires a "clear not-found state," not a translated one — a generic
not-found page reached by mistyping a URL is a low-value target for translation effort compared to
the 9 real pages. Revisit only if this becomes a recurring complaint.

**Alternatives considered**: A localized 404 per locale prefix — rejected as scope the spec doesn't
actually ask for; adds 2 more translated surfaces for a page most visitors never intentionally see.
