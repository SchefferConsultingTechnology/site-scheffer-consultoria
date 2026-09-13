# Contract: hreflang, Canonical, and Sitemap

## `buildSeoLinks(page, locale)`

```ts
function buildSeoLinks(page: PageKey, locale: Locale): LinkDescriptor[] {
  const paths = PAGE_PATHS[page];
  return [
    { rel: "canonical", href: `${SITE_URL}${paths[locale]}` },
    { rel: "alternate", hrefLang: "pt", href: `${SITE_URL}${paths.pt}` },
    { rel: "alternate", hrefLang: "en", href: `${SITE_URL}${paths.en}` },
    { rel: "alternate", hrefLang: "es", href: `${SITE_URL}${paths.es}` },
    { rel: "alternate", hrefLang: "x-default", href: `${SITE_URL}${paths.pt}` },
  ];
}
```

- `canonical` MUST point at the page's own URL in its own locale — never at the Portuguese version
  from an English/Spanish page (spec FR-007's "not pointing at the Portuguese version").
- `x-default` MUST point at the Portuguese URL (the default locale, spec Assumptions).
- Every one of the 27 route files (9 pages × 3 locales) MUST call this helper rather than
  hand-writing its own canonical/alternate links, so the 3 language variants of a page can never
  drift out of sync with each other (research.md §5).
- `privacy-policy` still additionally sets `{ name: "robots", content: "noindex" }` in all 3
  locales — hreflang/canonical rules above still apply to it (a `noindex` page can still declare
  its language relationships; it's just excluded from the sitemap, per the next section).

## Sitemap

`public/sitemap.xml` lists one `<url>` per indexable page × locale — 7 pages × 3 locales = 21
entries. `privacy-policy` is excluded in all 3 locales (still `noindex`, per `004`'s existing
sitemap-contract.md rule, now applied per-locale too).

```xml
<url>
  <loc>https://scheffer.solutions/en/about</loc>
  <lastmod>2026-09-13</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.6</priority>
</url>
```

Priority per page mirrors `004`'s existing values (1.0 home, 0.8 services, 0.6 about/methodology/
contact) — unchanged by adding locales, just repeated per locale.

## Validation

Each page's 3 hreflang-linked variants + the sitemap's 21 URLs MUST be checked against a standard
schema/SEO validator with zero errors before this feature is considered complete (spec SC-003).
