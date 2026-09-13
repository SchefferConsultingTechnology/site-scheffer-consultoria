# Phase 1 Data Model: Strong SEO Foundation

No database or persistence is introduced (Constitution Principle V — this remains a
static/server-rendered marketing site). The "entities" below are in-code data shapes shared across
routes and components, plus the site's public metadata artifacts.

## Service

The single source of truth for the four offerings, living in `src/lib/services-data.ts`. Reused by
the homepage's overview cards, each dedicated service page, and the JSON-LD offer catalog.

| Field      | Type         | Notes                                                                                                                                      |
| ---------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `id`       | `string`     | Stable slug (`servico-web`, `servico-mobile`, ...). Used as the React list key on the homepage and as a legacy-anchor-redirect source key. |
| `path`     | `string`     | The dedicated route (`/aplicacoes-web`, ...). Used for `<Link>` targets, canonical URLs, and JSON-LD `url`.                                |
| `icon`     | `LucideIcon` | Unchanged from today.                                                                                                                      |
| `title`    | `string`     | Short name shown on the homepage card and as the page's H1/eyebrow (e.g. "Aplicações Web").                                                |
| `desc`     | `string`     | One-line summary shown on the homepage overview card.                                                                                      |
| `tag`      | `string`     | Small badge shown on the homepage overview card (e.g. "Full-stack").                                                                       |
| `headline` | `string`     | The dedicated page's main heading.                                                                                                         |
| `summary`  | `string`     | The dedicated page's 2–4 sentence description.                                                                                             |
| `bullets`  | `string[]`   | The dedicated page's "what's included" list.                                                                                               |

No validation rules beyond "all fields required, non-empty" — this is static content, not
user input.

## PageMetadata (contract, not a runtime type)

Every indexable route's `head()` MUST supply values for this shape. Documented here as the
contract every route file is expected to satisfy (see
`contracts/page-metadata-contract.md`); not necessarily a single shared TypeScript type, since
TanStack Router's `head()` return shape is already fixed by the framework.

| Field                                 | Notes                                                                                    |
| ------------------------------------- | ---------------------------------------------------------------------------------------- |
| `title`                               | Unique per route.                                                                        |
| `description`                         | Unique per route, ~150–160 chars.                                                        |
| `canonicalUrl`                        | `${SITE_URL}${route path}`; `/` for the homepage.                                        |
| `ogTitle` / `ogDescription` / `ogUrl` | Mirror title/description/canonical unless a route needs a distinct social-share framing. |
| `twitterTitle` / `twitterDescription` | Same values as the Open Graph pair, present per FR-005 (previously missing).             |

## StructuredDataEntity

Built by `src/lib/structured-data.ts`.

- **Business entity** (rendered on the homepage): `@type: ProfessionalService`, existing identity
  fields (`name`, `url`, `logo`, `image`, `email`, `telephone`, `areaServed: "BR"`,
  `description`), plus:
  - `hasOfferCatalog`: `OfferCatalog` whose `itemListElement` has one entry per `Service`
    (`Offer` → `itemOffered: Service { name, description, url }`).
  - `sameAs`: `string[]`, omitted entirely when `SOCIAL_LINKS` (see below) is empty rather than
    emitted as an empty array.
- **Per-service entity** (rendered on each of the 4 service pages): `@type: Service`, `name`,
  `description` (reuses `headline`/`summary`), `areaServed: "BR"`, `provider` referencing the
  business by `name`/`url`.

## SitemapEntry

One `<url>` element per indexable route in `public/sitemap.xml`.

| Field        | Notes                                                                                                                                                  |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `loc`        | Absolute URL (`SITE_URL` + path).                                                                                                                      |
| `lastmod`    | Date this route's content last materially changed; updated by hand when a route's content changes (FR-009 makes this an explicit step, not automated). |
| `changefreq` | `monthly`, matching the existing single entry today.                                                                                                   |
| `priority`   | `1.0` for `/`, `0.8` for the four service pages, `0.6` for Sobre/Processo/Contato — reflects relative importance, not a hard rule.                     |

`politica-de-privacidade` (and any future `noindex` route) MUST NOT have an entry, per FR-009.

## LegacyAnchorRedirect

A static lookup table in `src/lib/legacy-anchor-redirect.ts`.

| Field  | Type     | Notes                                                                                                                                              |
| ------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `hash` | `string` | The old fragment without `#` (`servicos`, `sobre`, `processo`, `contato`, `servico-web`, `servico-mobile`, `servico-marketing`, `servico-social`). |
| `to`   | `string` | The new route path it now maps to.                                                                                                                 |

Consumed once, client-side, by a small hook run on the home route's mount (see `research.md` §3).
`servicos` maps to `/` itself (the homepage still has the services overview section), so that
particular entry is a no-op navigation guard rather than a real redirect.

## SOCIAL_LINKS (config, not a new "entity" but worth naming)

An addition to `src/lib/site-config.ts`: a small object/array of `{ network, url }` pairs, empty by
default. `SiteFooter` and `structured-data.ts`'s `sameAs` both read from this single place, so
adding a real Instagram/LinkedIn URL later is a one-line change in one file (per spec Assumptions).
