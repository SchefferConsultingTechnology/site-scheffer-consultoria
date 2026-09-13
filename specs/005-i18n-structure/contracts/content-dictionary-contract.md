# Contract: Content Dictionary Modules

Every file under `src/content/` (except `locale.ts`, which holds types/lookups, not translated
copy) MUST export a value typed as `Record<Locale, Shape>` for that page's own `Shape`, with all 3
locale keys (`pt`, `en`, `es`) present.

## Required shape per module

```ts
// src/content/<page>.ts
export type <Page>Content = {
  metaTitle: string;
  metaDescription: string;
  // ...page-specific fields (headings, paragraphs, lists, button labels)
};

export const <page>Content: Record<Locale, <Page>Content> = {
  pt: { metaTitle: "...", metaDescription: "...", /* ... */ },
  en: { metaTitle: "...", metaDescription: "...", /* ... */ },
  es: { metaTitle: "...", metaDescription: "...", /* ... */ },
};
```

## Rules

- A module MUST NOT compile if any locale is missing any field of `<Page>Content` — this is
  TypeScript's own structural check on `Record<Locale, Shape>`, not a custom lint rule; do not
  work around it with `Partial<...>` or `as any`.
- `metaTitle`/`metaDescription` MUST be distinct per locale (translated, not the Portuguese string
  copy-pasted) — this is what `004-seo-improvements`'s per-route SEO work already established for
  Portuguese; each locale variant now needs to independently satisfy the same
  `page-metadata-contract.md` rules from that spec, in its own language.
- Content is a first-pass professional translation, not final-approved marketing copy (spec
  Assumptions) — expect the business to correct tone/wording afterward; do not treat the initial
  English/Spanish text as unreviewable.
- The privacy policy's English/Spanish content MUST describe the same policies and the same LGPD
  legal basis as the Portuguese original (translated, not adapted to a different jurisdiction's
  law) per spec FR-012.

## Non-goals

- No pluralization, interpolation-heavy, or namespace-lazy-loading support — plain string fields
  only (research.md §1). The one dynamic value (visitor's name in the confirmation e-mail) is a
  template literal at the call site, not a dictionary feature.
