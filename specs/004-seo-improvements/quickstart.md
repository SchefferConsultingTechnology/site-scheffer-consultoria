# Quickstart: Validating the Strong SEO Foundation

## Prerequisites

- Dependencies installed (`npm install`).
- Dev server running: `npm run dev`.

## Setup

```bash
npm run dev
```

## Route metadata (User Stories 1 & 2)

For each of the 8 indexable routes below, fetch the server-rendered HTML directly (no JS
execution — e.g. `curl -s http://localhost:<port><path>`) and check the boxes:

| Route                | Unique `<title>` | Unique description | Canonical = own URL | Single `<h1>`, no skipped levels | `twitter:title`/`description` present |
| -------------------- | ---------------- | ------------------ | ------------------- | -------------------------------- | ------------------------------------- |
| `/`                  | [ ]              | [ ]                | [ ]                 | [ ]                              | [ ]                                   |
| `/aplicacoes-web`    | [ ]              | [ ]                | [ ]                 | [ ]                              | [ ]                                   |
| `/apps-mobile`       | [ ]              | [ ]                | [ ]                 | [ ]                              | [ ]                                   |
| `/marketing-digital` | [ ]              | [ ]                | [ ]                 | [ ]                              | [ ]                                   |
| `/social-media`      | [ ]              | [ ]                | [ ]                 | [ ]                              | [ ]                                   |
| `/sobre`             | [ ]              | [ ]                | [ ]                 | [ ]                              | [ ]                                   |
| `/processo`          | [ ]              | [ ]                | [ ]                 | [ ]                              | [ ]                                   |
| `/contato`           | [ ]              | [ ]                | [ ]                 | [ ]                              | [ ]                                   |

This validates SC-001 and SC-002. Cross-check "unique" by diffing the 8 titles and the 8
descriptions against each other — no duplicates allowed.

## Structured data (User Story 2)

1. Extract the homepage's JSON-LD block and parse it — confirm it validates as `ProfessionalService`
   with a `hasOfferCatalog.itemListElement` containing exactly 4 entries (one per service).
2. Extract each service page's JSON-LD block — confirm it validates as `Service` with a `provider`
   referencing the business.
3. Confirm `areaServed` is the literal `"BR"` everywhere it appears — no city/region/address.
4. Run both blocks through a standard schema.org validator and confirm zero errors (SC-005).

## Navigation (User Story 1)

1. From the homepage, click each header nav link (Serviços card "Saiba mais", Sobre, Processo,
   Contato) and confirm the browser URL actually changes to the dedicated route (not just an
   in-page scroll).
2. Repeat at a mobile width (≤767px) using the mobile nav drawer.
3. Confirm the homepage still shows the services overview cards, an About teaser, and a Contact
   call-to-action, each linking to its dedicated page (FR-002).

## Legacy anchor redirect (Edge Case / SC-007)

For each of `/#servicos`, `/#sobre`, `/#processo`, `/#contato`, `/#servico-web`,
`/#servico-mobile`, `/#servico-marketing`, `/#servico-social`:

1. Load the URL directly.
2. Confirm the browser ends up on the corresponding new route (or, for `/#servicos`, stays on `/`
   scrolled to the services overview) rather than a blank scroll or a broken state.

## Sitemap (User Story 2)

1. Fetch `/sitemap.xml` and confirm it lists exactly the 8 indexable routes, each with a
   `<lastmod>`.
2. Confirm `/politica-de-privacidade` is absent.

## Search Console & Analytics (User Story 3)

1. With `PUBLIC_GSC_VERIFICATION` and `PUBLIC_GA_MEASUREMENT_ID` unset, confirm neither the
   verification `<meta>` tag nor the GA4 `<script>` appears anywhere in the HTML.
2. Set both in `.dev.vars`, restart the dev server, and confirm both now render in every route's
   `<head>`.
3. With `PUBLIC_GA_MEASUREMENT_ID` set, load a page and confirm a pageview is recorded (browser
   network tab shows a request to Google's collect endpoint) with no visible delay to page render.

## Social links (User Story 4)

1. With `SOCIAL_LINKS` empty (default), confirm the footer does not present the Instagram/LinkedIn
   icons as live links to `#` — either omitted or visibly marked as not yet available.
2. Once real URLs are added to `SOCIAL_LINKS`, confirm the footer icons open them in a new tab and
   the homepage JSON-LD's `sameAs` array lists the same URLs (SC-006).

## Quality gates

```bash
npm run typecheck
npm run lint
npm run format
npm run build
```

All four MUST pass clean before this feature is considered complete (Constitution Principle II).

## Expected outcome

All checklist boxes above are checked, and every flow (route metadata, structured data,
navigation, legacy-anchor redirect, sitemap, Search Console/analytics wiring, social links)
behaves as described — with no code changes required beyond what is tracked in `tasks.md` for
this feature.
