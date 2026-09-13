# Contract: Per-Route Page Metadata

Every indexable route (`/`, the four service pages, `/sobre`, `/processo`, `/contato`) MUST supply
all of the following in its own `head()`, server-rendered — none inherited unchanged from another
route. `politica-de-privacidade` is exempt from the "indexable" framing (it intentionally sets
`robots: noindex`) but MUST still supply title/description/canonical for its own sake, as it
already does today.

## Required fields

```ts
head: () => ({
  links: [{ rel: "canonical", href: `${SITE_URL}${routePath}` }],
  meta: [
    { title: "<Unique, descriptive title — see length guidance below>" },
    { name: "description", content: "<Unique, ~150–160 char description>" },
    { property: "og:url", content: `${SITE_URL}${routePath}` },
    { property: "og:title", content: "<Same as title, or a social-share-tuned variant>" },
    { property: "og:description", content: "<Same as description, or a variant>" },
    { name: "twitter:title", content: "<Same as og:title>" },
    { name: "twitter:description", content: "<Same as og:description>" },
    // JSON-LD, where applicable — see structured-data-contract.md
  ],
});
```

`og:site_name`, `og:type`, `og:locale`, `og:image` (with width/height once added), and
`twitter:card` stay defined once in `__root.tsx` and apply to every route — they are not
per-route fields.

## Title guidance

- Homepage: brand-forward (`Scheffer Consultoria — Tecnologia, Web, Mobile e Marketing Digital`,
  unchanged from today).
- Service pages: lead with the service, keep the brand as a suffix (e.g.
  `Aplicações Web — Scheffer Consultoria`), so the page can plausibly rank for
  service-specific queries rather than only branded search.
- Sobre / Processo / Contato: plain, descriptive (e.g. `Sobre — Scheffer Consultoria`).

## Uniqueness rule

No two routes may share the same `title` or the same `description` string (spec SC-001). This is
checked manually per `quickstart.md`, not enforced by a build-time assertion — the route count (8)
is small enough that a manual pass is sufficient per Constitution Principle V.

## Non-goals

- No per-route `og:image` overrides in this feature — all routes share `SITE_OG_IMAGE`
  (spec Assumptions scope this feature to metadata correctness, not new social-share artwork).
- No hreflang / alternate-language links — out of scope per spec Assumptions (future LatAm
  expansion is a separate feature).
