# Feature Specification: i18n Structure (Portuguese, English, Spanish)

**Feature Branch**: `005-i18n-structure`

**Created**: 2026-09-13

**Status**: Draft

**Input**: User description: "Vamos estruturar o i18n" (Let's structure the i18n), followed by:
3 languages — Português (default, unprefixed URLs, e.g. `/about`), English (`/en/...`), Español
(`/es/...`) — with a language selector in the site header (desktop and mobile). Portuguese's
current URLs (just stabilized in `004-seo-improvements` and a follow-up English rename) MUST NOT
change again.

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Switch language without losing your place (Priority: P1)

A visitor on any page of the site can pick a different language from a selector in the header and
lands on the same logical page in that language — not the homepage.

**Why this priority**: This is the core interaction the feature exists to deliver. Without it,
having translated content is not actually reachable in a predictable way.

**Independent Test**: From `/digital-marketing`, switch to English and confirm the visitor lands on
`/en/digital-marketing` (not `/en/` or `/digital-marketing`); repeat for Spanish and for switching
back to Portuguese from a non-Portuguese page.

**Acceptance Scenarios**:

1. **Given** a visitor on any page, **When** they open the language selector, **Then** they see all
   3 languages listed, with the current one visibly indicated.
2. **Given** a visitor on `/methodology`, **When** they select English, **Then** the URL becomes
   `/en/methodology` and the page renders fully in English.
3. **Given** a visitor on `/en/contact`, **When** they select Português, **Then** the URL becomes
   `/contact` (no `/pt/` prefix, per the default-language convention).
4. **Given** a visitor using the mobile nav drawer, **When** they open it, **Then** the language
   selector is present and works the same as on desktop.

---

### User Story 2 - Read the entire site in your own language (Priority: P1)

A visitor browsing in English or Spanish sees every piece of visible text — headlines, body copy,
bullet lists, buttons, form labels — in that language, on every page in scope, not a partial or
placeholder translation.

**Why this priority**: A language switcher that leads to partially-translated pages is worse than
not having one — it looks broken and undermines credibility with exactly the audience it's meant to
serve.

**Independent Test**: Load each in-scope page directly at its `/en/...` and `/es/...` URL and
confirm no Portuguese text remains visible anywhere on the page.

**Acceptance Scenarios**:

1. **Given** any in-scope page's English URL, **When** it loads, **Then** all visible text on that
   page is in English.
2. **Given** any in-scope page's Spanish URL, **When** it loads, **Then** all visible text on that
   page is in Spanish.
3. **Given** a visitor arrives directly at a `/en/...` or `/es/...` URL (e.g. from a shared link or
   search result), **When** the page first renders, **Then** it shows that language immediately —
   it does not flash Portuguese first.

---

### User Story 3 - Each language version can be found in search (Priority: P2)

A search engine indexing the site understands that `/about`, `/en/about`, and `/es/about` are the
same page in different languages, so it can serve the right one to a searcher in the right
language.

**Why this priority**: Without this, translating the content doesn't help the site actually get
found by non-Portuguese-speaking searchers — the payoff of `004-seo-improvements`'s per-page SEO
work would only reach Portuguese speakers.

**Independent Test**: Fetch the server-rendered HTML of a page and its two translated variants;
confirm each declares the other two as alternate-language versions of itself, and that the sitemap
lists all three URLs.

**Acceptance Scenarios**:

1. **Given** any in-scope page, **When** its HTML is inspected in any of its 3 language variants,
   **Then** it declares links to the other two language variants of the same page (and to itself).
2. **Given** the sitemap, **When** it is fetched, **Then** it lists the English and Spanish URLs
   alongside the existing Portuguese ones for every currently-indexable page.

---

### Edge Cases

- A visitor requests a language/page combination that doesn't exist yet (e.g. a future page added
  in Portuguese only) — this MUST NOT silently 404 or show a blank page; it needs a defined
  fallback.
- The existing legacy-anchor redirects (`/#sobre`, `/#servico-web`, etc., from before this site's
  multi-page restructuring) only need to keep working for the default Portuguese experience — they
  are not expected to have language-prefixed equivalents.
- First-time visitors are not auto-redirected based on browser/geo language detection — the
  default entry point stays Portuguese unless the visitor explicitly navigates to or selects
  `/en/...` or `/es/...`. This keeps URLs predictable and avoids fighting search engines that
  crawl a specific language URL directly (see Assumptions).

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: The site MUST support exactly 3 languages: Portuguese (default), English, and
  Spanish.
- **FR-002**: Portuguese pages MUST continue to be served at their current, unprefixed URLs
  (`/about`, `/contact`, `/web-apps`, etc.) with no change to those URLs. English pages MUST be
  served under an `/en/` prefix and Spanish under an `/es/` prefix, each mirroring the same page
  structure (e.g. `/methodology`, `/en/methodology`, `/es/methodology` are the same logical page).
- **FR-003**: A language selector MUST be visible in the site header, on both the desktop nav and
  the mobile nav drawer, showing all 3 languages and which one is currently active.
- **FR-004**: Switching languages via the selector MUST keep the visitor on the equivalent page in
  the new language, not send them to that language's homepage.
- **FR-005**: Every visible string on every in-scope page — headlines, body paragraphs, bullet
  lists, button/link labels, and meta title/description — MUST be available in all 3 languages,
  with no fallback to Portuguese text appearing on an English or Spanish page.
- **FR-006**: Each page's English and Spanish variants MUST render fully in that language from the
  very first server-rendered response — no visible flash of Portuguese content before switching.
- **FR-007**: Each of a page's 3 language variants MUST declare its relationship to the other two
  (so search engines and browsers can identify them as translations of the same page), and each
  MUST have its own correct canonical URL (not pointing at the Portuguese version).
- **FR-008**: The sitemap MUST include the English and Spanish URLs for every page that is
  currently indexable in Portuguese, excluding whichever pages are out of scope per this spec's
  clarifications (e.g. the privacy policy, already `noindex` today).
- **FR-009**: Requesting a language/page combination that does not exist MUST show a clear
  not-found state rather than a blank page or a silent 404 indistinguishable from a real error.
- **FR-010**: The contact form's field labels, placeholders, validation messages, and success/error
  status messages MUST be available in all 3 languages, matching the language of the page the form
  is embedded in.
- **FR-011**: The automatic confirmation e-mail sent after a successful contact-form submission
  MUST be sent in the same language as the page the visitor submitted the form from.
- **FR-012**: The privacy policy page MUST be available in all 3 languages, translated faithfully
  (same policies and the same LGPD legal basis) rather than rewritten for a different
  jurisdiction's privacy law. It remains `noindex` and excluded from the sitemap in all 3
  languages, unchanged from its current behavior.

### Key Entities

- **Locale**: One of the 3 supported languages — a code (`pt`, `en`, `es`), a display name, a
  default flag (Portuguese is the default), and its URL prefix (none, `/en`, `/es`).
- **Page**: One of the site's 9 logical pages (home, the 4 services, about, methodology, contact,
  and privacy policy), existing in 3 language variants that share the same structure but not the
  same URL or text.
- **Translated Content**: The set of visible strings for one page in one language — including, for
  the contact page, the form's field labels, placeholders, validation messages, and status
  messages — the thing that must reach 100% coverage per FR-005 before a language variant is
  considered complete.
- **Language Selector**: The header control a visitor uses to move between a page's language
  variants.
- **Confirmation E-mail**: The automatic e-mail sent to a visitor after a successful contact-form
  submission, existing in 3 language variants; which one is sent is determined by the language of
  the page the form was submitted from.

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: 100% of in-scope pages render with zero remaining source-language (Portuguese) text
  when viewed in English or Spanish.
- **SC-002**: A visitor can switch from any page to the same page in either other language in a
  single interaction with the header selector.
- **SC-003**: Every in-scope page's 3 language variants pass a standard SEO validator check for
  correct hreflang/canonical declarations with zero errors.
- **SC-004**: The sitemap lists 3 language variants for each of the 7 currently-indexable pages (21
  URLs total); the privacy policy stays excluded from the sitemap in all 3 languages, unchanged
  from today.
- **SC-005**: Loading any `/en/...` or `/es/...` URL directly (not via the selector) renders that
  language immediately, with no Portuguese flash, in 100% of manual spot checks.
- **SC-006**: Submitting the contact form from an English or Spanish page shows validation and
  status messages in that same language, and the confirmation e-mail the visitor receives is also
  in that language, in 100% of manual spot checks across all 3 languages.

## Assumptions

- No automatic language redirect based on the visitor's browser/geo settings — the Portuguese,
  unprefixed URL remains the default entry point for anyone not explicitly on an `/en/` or `/es/`
  URL or using the selector. This keeps URLs predictable and avoids the well-known SEO pitfall of
  auto-redirecting a crawler or a visitor away from the specific language URL they requested.
- Service-page translations (the 4 `/web-apps`, `/mobile-apps`, `/digital-marketing`,
  `/social-media` pages) should read as natural, professionally-written English/Spanish — not
  word-for-word literal translations — while preserving the same factual claims (e.g. "três
  décadas de experiência") made on the Portuguese original.
- The technical approach for storing/loading translations (a library vs. a hand-rolled dictionary
  structure) is treated as a planning-phase decision (`/speckit-plan`), not a product requirement —
  the user explicitly deferred it as an implementation detail.
- The existing legacy-anchor-redirect mechanism (for pre-restructuring anchors like `#sobre`) stays
  Portuguese-only; it is not extended with language-prefixed variants, since those anchors predate
  this site's current multi-page structure entirely and were never public under any language
  prefix.
- Translation authorship: a first-pass professional English/Spanish translation is drafted (by
  whoever implements this spec) for the business to review and correct afterward — the same
  precedent already set for the Portuguese service-page copy earlier in this project. This is not
  a blocking dependency on the business supplying copy first.
- Privacy policy scope: `/privacy-policy` IS translated into English and Spanish, in all 3
  language prefixes. It is translated faithfully (same policies, same LGPD legal basis — the
  business remains a Brazilian company processing data under Brazilian law regardless of the
  visitor's language) rather than rewritten for a different jurisdiction's privacy law; adapting
  the legal substance itself for other jurisdictions is explicitly out of scope and would require
  actual legal review, not a translation pass. It stays `noindex` and out of the sitemap in all 3
  languages, unchanged from today.
- Contact form and confirmation e-mail scope: BOTH are in scope for this feature, not deferred.
  The contact form's field labels, placeholders, validation messages, and status messages (success/
  error) must be available in all 3 languages depending on which language page the visitor
  submitted from. The automatic confirmation e-mail sent after a successful submission must be
  sent in the same language as the page the visitor submitted from (e.g. submitting from
  `/en/contact` sends the English confirmation e-mail), not always in Portuguese.
