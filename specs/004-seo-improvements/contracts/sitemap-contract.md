# Contract: `public/sitemap.xml`

## Required entries

One `<url>` element for each of the 8 indexable routes:

```xml
<url>
  <loc>https://schefferconsultoria.com.br/</loc>
  <lastmod>2026-09-12</lastmod>
  <changefreq>monthly</changefreq>
  <priority>1.0</priority>
</url>
<!-- ...repeated for /aplicacoes-web, /apps-mobile, /marketing-digital, /social-media,
     /sobre, /processo, /contato -->
```

Priority guidance (not a hard rule, see `data-model.md`): `1.0` for `/`, `0.8` for the four service
pages, `0.6` for `/sobre`, `/processo`, `/contato`.

## Exclusion rule

`politica-de-privacidade` (and any future route marked `robots: noindex`) MUST NOT appear here —
listing a `noindex` page in the sitemap sends search engines a contradictory signal (spec FR-009).

## Maintenance rule

This file is hand-maintained, not generated at build time (Constitution Principle V — a
build-time sitemap generator is unjustified complexity for 8 static routes). Whenever a route is
added, removed, or has its `noindex` status changed, updating this file is an explicit step —
call this out in the corresponding task/PR description rather than assuming it happens
automatically (spec FR-009's "explicit, visible step" requirement).

## Non-goals

- No `<xhtml:link rel="alternate" hreflang="...">` entries — out of scope until the future LatAm
  expansion (spec Assumptions).
- No image/video sitemap extensions.
