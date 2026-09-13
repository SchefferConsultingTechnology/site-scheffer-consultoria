# Phase 0 Research: Strong SEO Foundation

No `NEEDS CLARIFICATION` markers remain in the Technical Context — both spec-level decisions were
resolved directly by the user. This phase instead resolves the technical unknowns needed to
implement those decisions correctly.

## 1. How should 7 new top-level routes be added?

**Decision**: Flat files directly under `src/routes/`, one per page (`sobre.tsx`, `processo.tsx`,
`contato.tsx`, `aplicacoes-web.tsx`, `apps-mobile.tsx`, `marketing-digital.tsx`,
`social-media.tsx`), each calling `createFileRoute("/<path>")` exactly like the existing
`politica-de-privacidade.tsx`.

**Rationale**: The codebase already has exactly this pattern for a second top-level page. No route
groups, nested layouts, or a `_layout.tsx` pathless layout route are needed for 8 flat top-level
pages — introducing one would be exactly the kind of speculative structure Constitution Principle V
warns against for a site this size.

**Alternatives considered**: A TanStack Router pathless layout route (`_layout.tsx`) wrapping all
pages to share `SiteHeader`/`SiteFooter` automatically. Rejected for now — with only 8 routes, each
route file simply rendering `<SiteHeader />{children}<SiteFooter />` is equally simple and avoids
introducing a routing feature (pathless layouts) the project doesn't otherwise use; can be
revisited if the route count grows materially (e.g. once the future LatAm pages arrive).

## 2. How is content shared instead of duplicated across 8 routes?

**Decision**: Three extractions from the current `index.tsx`:

- `src/components/site-header.tsx` and `src/components/site-footer.tsx` — the header/nav and
  footer markup, unchanged visually, with `<a href="#...">` replaced by TanStack `<Link to="...">`.
- `src/components/service-detail.tsx` — the headline/summary/bullets block currently inlined in
  the "SERVICE DETAILS" `.map()` in `index.tsx`, taking one service object as a prop.
- `src/lib/services-data.ts` — the `services` array itself, with a `path` field added (e.g.
  `/aplicacoes-web`) alongside the existing `id` (kept for the legacy-anchor redirect and as the
  React list key on the homepage's overview cards).

**Rationale**: This is the direct fix for the duplication that would otherwise happen (four nearly
identical route files each hand-writing the same headline/summary/bullets JSX, and the header/
footer copy-pasted 8 times). It also satisfies FR-006 by giving the JSON-LD offer catalog
(`structured-data.ts`) and each service page the same single source of truth for service names/
descriptions.

**Alternatives considered**: Leaving each service page independently hand-written. Rejected —
guarantees the four pages drift out of sync with the homepage's card copy over time, which is
exactly the kind of duplication Constitution Principle V's "no unjustified complexity" cuts both
ways against (duplication is its own form of unjustified complexity here).

## 3. How do old in-page anchors (`#sobre`, `#servico-web`, etc.) keep working?

**Decision**: A small client-side lookup (`src/lib/legacy-anchor-redirect.ts`) mapping each old
hash fragment to its new route (`sobre → /sobre`, `servico-web → /aplicacoes-web`, etc.), applied
once via a `useEffect` on the home route: if `window.location.hash` matches a known legacy anchor
on mount, call `router.navigate({ to: mapped, replace: true })`.

**Rationale**: URL fragments (the part after `#`) are never sent in the HTTP request — the server
has no way to see `#sobre` and redirect accordingly. Resolving this is only possible client-side,
after the browser has already loaded `/` and parsed the fragment itself. `replace: true` avoids
polluting browser history with an intermediate hash-only entry.

**Alternatives considered**: A server-side redirect rule (e.g. Cloudflare `_redirects` file).
Rejected as technically impossible for this specific problem (fragments aren't visible
server-side); still useful for _path_-based redirects in general, but not applicable here since
the old URLs are all `/` plus a fragment, not distinct paths.

## 4. How should Search Console verification and analytics be wired without committing secrets?

**Decision**: Two optional environment variables — `PUBLIC_GSC_VERIFICATION` (the content of a
`<meta name="google-site-verification">` tag) and `PUBLIC_GA_MEASUREMENT_ID` (a GA4 `G-XXXX` ID).
Both are read server-side in `__root.tsx`'s `head()`/`scripts` and only emit their respective
tag/script when set; when unset, nothing renders — the feature ships inert by default per this
spec's Assumptions (the Google/analytics accounts don't exist yet).

**Rationale**: Matches the existing `RESEND_API_KEY`/`.dev.vars` precedent this project already
uses for exactly this kind of "real secret, needed in production, must never be a committed
literal" value (Constitution Principle IV). Using `PUBLIC_`-prefixed names signals (to whoever
configures Worker vars later) that these are non-secret identifiers safe to expose client-side,
distinguishing them from server-only secrets like `RESEND_API_KEY`.

**Alternatives considered**: A dedicated `@cloudflare/web-analytics` / Google Tag Manager
container instead of raw `gtag.js`. Rejected as a decision for whoever actually sets up analytics
later — out of scope for this feature per its Assumptions; the env-var seam this feature builds
works the same regardless of which analytics script ultimately fills it in.

## 5. What does the enriched structured data look like?

**Decision**: The homepage's existing `ProfessionalService` JSON-LD gains a `hasOfferCatalog`
(`OfferCatalog` → `itemListElement` → one `Offer`/`Service` per entry in `services-data.ts`) and an
optional `sameAs` array (populated once real social URLs exist, per spec FR-008). Each of the four
service pages additionally emits its own minimal `Service` JSON-LD (`name`, `description`,
`provider` referencing the business, `areaServed: "BR"`) via the shared `structured-data.ts`
builder — satisfying FR-006's "structured entries mirroring the four service pages" without
duplicating the business's identity fields on every page.

**Rationale**: `hasOfferCatalog` is schema.org's standard way to associate a `ProfessionalService`
with the specific services it offers; per-page `Service` markup reinforces topical relevance for
that page's own URL, which is the entire point of giving each service its own route.

**Alternatives considered**: A single, larger JSON-LD graph (`@graph`) spanning all pages via a
shared root script. Rejected — TanStack Router's per-route `head()` already composes cleanly with
one JSON-LD block per page; a cross-page graph would require the sort of shared global state this
project's SSR model doesn't otherwise use.
