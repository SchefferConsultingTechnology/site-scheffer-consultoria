# Contract: Structured Data (JSON-LD)

Built by `src/lib/structured-data.ts`, consumed by each route's `head()` via the existing
`{ "script:ld+json": ... }` meta entry pattern already used in `index.tsx` today.

## Business entity (homepage only)

```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Scheffer Consultoria",
  "url": "https://schefferconsultoria.com.br",
  "logo": "...",
  "image": "...",
  "email": "contato@schefferconsultoria.com.br",
  "telephone": "+5548999040445",
  "areaServed": "BR",
  "description": "...",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Serviços",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Aplicações Web",
          "description": "...",
          "url": "https://schefferconsultoria.com.br/aplicacoes-web"
        }
      }
      // ...one per entry in services-data.ts
    ]
  },
  "sameAs": ["https://instagram.com/...", "https://linkedin.com/..."]
}
```

- `hasOfferCatalog.itemListElement` MUST have exactly one entry per service in
  `services-data.ts` (spec FR-006) — generated from that array, not hand-duplicated.
- `sameAs` MUST be omitted entirely (not an empty array) while `SOCIAL_LINKS` is empty (spec
  FR-008 / Assumptions).
- `areaServed` MUST remain the literal string `"BR"` — no city/region/address fields are added
  (spec FR-007).

## Per-service entity (each of the 4 service pages)

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Aplicações Web",
  "description": "...",
  "areaServed": "BR",
  "provider": {
    "@type": "ProfessionalService",
    "name": "Scheffer Consultoria",
    "url": "https://schefferconsultoria.com.br"
  }
}
```

- `name`/`description` come from the same `services-data.ts` entry used to render the page's own
  headline/summary — no separate copy to keep in sync.
- `provider` is a minimal reference (name + url), not a duplicate of the full business entity —
  the full entity lives on the homepage only, per `research.md` §5's rejection of a cross-page
  `@graph`.

## Validation

Both shapes MUST parse as valid JSON and validate against their respective schema.org types with
zero errors in a standard validator (spec SC-005). Checked manually per `quickstart.md`.
