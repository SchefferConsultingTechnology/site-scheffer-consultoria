# Feature Specification: Strong SEO Foundation

**Feature Branch**: `004-seo-improvements`

**Created**: 2026-09-12

**Status**: Draft

**Input**: User description: "Preciso de um SEO forte neste site" (I need strong SEO on this
site). Follow-up audit conducted in-conversation found: a heading-hierarchy bug in the 4 service
detail sections (`<h3>` used where `<h2>` is correct), no Google Search Console or analytics
integration anywhere in the codebase, placeholder (`href="#"`) social links with no corresponding
`sameAs` in the structured data, no local-business signal (address/service area) in the structured
data, incomplete Open Graph/Twitter metadata, a sitemap listing only the homepage with no
`lastmod`, and an open structural question about whether the site's main sections should get their
own dedicated routes instead of homepage anchors. Clarified with the user: yes, dedicated routes —
for the 4 services **and** for Sobre, Processo, and Contato; and the structured data should stay
nationally scoped (no specific city/region) for now, since the business plans to later expand into
Latin America with a bilingual (PT/ES) site.

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Every major section has its own dedicated, indexable page (Priority: P1)

Instead of the four services, "Sobre" (About), "Processo" (Process), and "Contato" (Contact) being
anchor sections on one long homepage, each becomes its own page with its own URL, so a visitor (or
a search engine) can land directly on the specific content they searched for.

**Why this priority**: This is the structural change that unlocks everything else in this spec —
without independent URLs, no page can carry its own title/description/ranking signal for a
service-specific or page-specific search query. It is also the largest-scope item, so it must be
validated first.

**Independent Test**: Navigate directly to each new route
(`/aplicacoes-web`, `/apps-mobile`, `/marketing-digital`, `/social-media`, `/sobre`, `/processo`,
`/contato`) without going through the homepage, and confirm each renders its full, relevant content
on its own.

**Acceptance Scenarios**:

1. **Given** a visitor with a direct link to `/apps-mobile` (or any of the other six new routes),
   **When** they open it, **Then** the page loads that section's full content on its own, without
   requiring a prior visit to the homepage.
2. **Given** the homepage, **When** a visitor clicks a service card, "Sobre", "Processo", or
   "Contato" in the header nav, **Then** they navigate to that section's dedicated page (not an
   in-page scroll to an anchor).
3. **Given** the homepage, **When** it renders, **Then** it still summarizes each section (services
   overview, about teaser, contact call-to-action) and links out to each dedicated page, so it
   continues to work as an entry point rather than requiring visitors to already know the new URLs.

---

### User Story 2 - Search engines can accurately read and rank every page (Priority: P1)

A search engine crawler indexing the site sees a correct, unambiguous heading structure on every
page, complete and unique metadata (title, description, canonical URL, Open Graph, Twitter Card)
per page, and structured data (JSON-LD) that fully and accurately describes the business and the
services it offers.

**Why this priority**: This is foundational, on-page technical SEO that applies to every route
created in Story 1. Shipping new routes without correct per-page metadata and heading structure
would waste most of Story 1's benefit.

**Independent Test**: Fetch the server-rendered HTML (no JavaScript execution) of every indexable
route and confirm: exactly one `<h1>`, no skipped heading levels, a unique `<title>` and meta
description per route, a canonical link pointing at that route's own URL, and valid JSON-LD that
parses and includes the business's services.

**Acceptance Scenarios**:

1. **Given** any indexable route's HTML, **When** the heading elements are extracted in document
   order, **Then** there is exactly one `<h1>` and every subsequent heading is a logical child of
   the nearest preceding heading one level above it (no jump from `<h1>` to `<h4>`, no first-level
   section using `<h3>` as if it were `<h2>`).
2. **Given** any indexable route, **When** its HTML `<head>` is inspected, **Then** it has its own
   `<title>`, meta description, canonical URL, `og:url`, `og:title`, `og:description`,
   `twitter:title`, and `twitter:description` — none of them copied unchanged from another route.
3. **Given** the structured data (JSON-LD), **When** it is parsed as JSON, **Then** it validates
   against schema.org's `ProfessionalService` (or more specific) type and lists the four services
   the business offers as structured entries, not only as free-text description.

---

### User Story 3 - The business can measure and monitor organic search performance (Priority: P2)

Whoever manages the site's marketing can see, in Google Search Console and an analytics tool,
which pages are indexed, which search queries bring visitors, and how many visitors arrive from
organic search — instead of having no visibility at all.

**Why this priority**: Without this, every other SEO effort in this spec is unmeasurable — there is
no way to know whether the new pages actually got indexed or improved ranking or traffic.

**Independent Test**: Load the site, confirm the Search Console ownership signal is present and
verifiable, and confirm the analytics tool records a pageview for a real visit — independent of
whether any other item in this spec has shipped yet.

**Acceptance Scenarios**:

1. **Given** the site is deployed to production, **When** ownership is verified in Google Search
   Console using the site's own verification method, **Then** verification succeeds and the
   sitemap (listing all new routes from Story 1) can be submitted from within Search Console.
2. **Given** a visitor loads any page of the site, **When** the page finishes loading, **Then** the
   configured analytics tool records the visit without blocking or measurably slowing down page
   render.

---

### User Story 4 - The business's identity is consistent across the web (Priority: P3)

A visitor or a search engine following the site's social links lands on the business's real,
active social profiles, and the structured data on the site links to those same profiles — instead
of dead placeholder links and a structured-data entity with no known social presence.

**Why this priority**: This strengthens entity recognition (e.g. Google's Knowledge Panel) and
gives real visitors a working path to the business's social channels, but it depends on the
business supplying real URLs and is lower-impact than Stories 1–3.

**Independent Test**: Click each social icon in the footer and confirm it opens the business's real
profile in a new tab; parse the JSON-LD and confirm its `sameAs` array contains the same URLs.

**Acceptance Scenarios**:

1. **Given** the footer social icons, **When** a visitor clicks one, **Then** it opens the
   business's real, active profile for that network in a new tab (never a placeholder `#` link).
2. **Given** the homepage's JSON-LD, **When** it is parsed, **Then** its `sameAs` array lists every
   social profile URL also linked from the footer, with no mismatches.

---

### Edge Cases

- What happens to the site's existing in-page anchors (`#servicos`, `#sobre`, `#processo`,
  `#contato`, `#servico-web`, etc.) once dedicated pages exist? Any visitor or external link still
  using the old anchor-style link should land somewhere reasonable (e.g. the equivalent new page)
  rather than a broken or misleading scroll position.
- What happens if a social profile URL becomes invalid or the account is deleted later? The
  `sameAs` entry and footer link for that network should be straightforward to remove without
  touching unrelated markup.
- What happens if the business adds even more indexable routes later (e.g. the planned Latin
  America expansion, or a blog)? The sitemap generation approach MUST make it obvious that a new
  route needs to be added, rather than silently omitting it.
- What happens for a route that intentionally should not be indexed (e.g. the existing privacy
  policy page)? It MUST keep its `noindex` directive and MUST NOT be listed in the sitemap.
- What happens to Search Console verification if the canonical domain changes (per the existing
  `SITE_URL` TODO about confirming `www` vs. apex)? Verification and canonical URLs must be
  re-checked against whatever domain is finalized before this feature is considered complete.

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: The four services (Aplicações Web, Apps Mobile, Marketing Digital, Social Media),
  "Sobre", "Processo", and "Contato" MUST each be an independently indexable route with its own
  canonical URL — not a homepage anchor.
- **FR-002**: The homepage MUST continue to summarize every section (services overview, about
  teaser, contact call-to-action) and link to each dedicated page, so it keeps working as the
  site's entry point rather than requiring visitors to already know the new URLs.
- **FR-003**: The existing header/footer navigation MUST be updated to link directly to the new
  dedicated routes; visitors following an old in-page anchor link MUST still land on reasonable,
  equivalent content rather than a broken link or an empty scroll target.
- **FR-004**: Every page MUST use exactly one `<h1>` and MUST NOT skip heading levels; this
  includes fixing the four service detail sections, which currently use `<h3>` where `<h2>` is
  correct for a first-level page section.
- **FR-005**: Every indexable route MUST render, server-side, its own unique `<title>`, meta
  description, canonical link, Open Graph tags (including `og:title`, `og:description`, `og:url`,
  and `og:image` with explicit width/height), and Twitter Card tags (including `twitter:title` and
  `twitter:description`) — none inherited unchanged from another route.
- **FR-006**: The structured data (JSON-LD) MUST list the business's services as structured
  entries (e.g. an offer catalog), mirroring the four service pages, so the association between the
  business and each service is machine-readable, not only present as prose.
- **FR-007**: The structured data's `areaServed` MUST stay nationally scoped (Brazil) without a
  specific city, region, or physical address, reflecting the business's plan to later expand
  regionally into Latin America.
- **FR-008**: The structured data MUST include a `sameAs` array listing the business's real social
  profile URLs once available; until real URLs are supplied, placeholder social links MUST NOT be
  presented to visitors as if they were live (either omit the icons or clearly mark them as
  "coming soon"), rather than linking to `#`.
- **FR-009**: The sitemap MUST list every currently indexable route (home, the four service pages,
  Sobre, Processo, Contato — and only indexable routes; routes marked `noindex` MUST be excluded)
  with an accurate `lastmod` date, and the process for adding a new indexable route MUST make
  updating the sitemap an explicit, visible step.
- **FR-010**: The site MUST support verifying ownership in Google Search Console and loading an
  analytics tool via configuration (e.g. environment variables or a config file), without
  hardcoding any account-specific verification token or measurement ID directly into version
  control as a committed secret.

### Key Entities

- **Indexable Route**: A URL on the site that search engines should crawl and rank: the homepage,
  the four service pages, Sobre, Processo, and Contato. Has its own title, description, canonical
  URL, and sitemap entry.
- **Non-Indexable Route**: A URL that exists for visitors but is intentionally excluded from search
  results (e.g. the privacy policy page). Marked `noindex`, excluded from the sitemap.
- **Structured Data Entity**: The JSON-LD description of the business itself — its identity,
  contact information, national (not regional) service area, services offered, and linked social
  profiles (`sameAs`).
- **Service**: One of the four offerings (Aplicações Web, Apps Mobile, Marketing Digital, Social
  Media), each with its own dedicated page and its own structured-data entry.

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: The site has at least 8 independently indexable routes (home, the four service
  pages, Sobre, Processo, Contato), each with a unique title and meta description (no two routes
  share the same value for either) and its own sitemap entry.
- **SC-002**: Every one of those routes passes a heading-hierarchy audit with zero skipped levels
  and exactly one `<h1>`.
- **SC-003**: Google Search Console reports the site as verified and the sitemap as successfully
  submitted, with zero submission errors.
- **SC-004**: Analytics records visits for 100% of real page loads sampled after launch, with no
  measurable increase in page load time attributable to the analytics script.
- **SC-005**: The structured data validates with zero errors in a standard schema.org validator and
  includes at least one entry per service the business offers.
- **SC-006**: Every social link presented to visitors resolves to a real, active profile (zero
  placeholder `#` links remain in production).
- **SC-007**: Following any of the site's pre-existing anchor-style links (e.g. a bookmark or
  external link to `/#contato`) still lands the visitor on reasonable, equivalent content after the
  new dedicated routes ship.

## Assumptions

- Google Search Console and an analytics tool are not yet set up for this domain; this feature
  covers making the site ready to be verified/instrumented (FR-010), not creating the external
  Google/analytics accounts themselves, which is the business's own action outside this codebase.
- Real social profile URLs are not yet available at spec time. Where they are not supplied by the
  time this feature ships, FR-008's fallback (omit or mark "coming soon" rather than link to `#`)
  applies; social links and `sameAs` entries can be added in a small follow-up once URLs are
  available, without needing to revisit this spec.
- The canonical domain (`schefferconsultoria.com.br` vs. an alternate like `scheffer.solutions`,
  referenced elsewhere in this project's recent work) is assumed to already be settled by the time
  this feature ships; if it is not, resolving it is a prerequisite for FR-005's canonical URLs and
  Search Console verification, not something this feature decides.
- The planned Latin America expansion (bilingual PT/ES) is explicitly **out of scope** for this
  feature. This spec only ensures the structured data doesn't lock in a single-region claim that
  would need to be undone later (FR-007); actual internationalization (hreflang, translated
  content, locale routing) is a separate, future feature.
- "Processo" currently exists as a sub-block nested inside the "Sobre" section's markup rather than
  as its own top-level section; giving it a dedicated route requires separating that content out,
  which is implementation work for the planning phase, not a spec-level concern.
- This feature does not include ongoing content marketing (e.g. a blog) as a lever for organic
  growth; it is scoped to the technical/on-page SEO, site structure, and measurement foundation
  described above.
