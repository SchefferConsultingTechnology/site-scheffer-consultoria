# Phase 1 Data Model: i18n Structure (Portuguese, English, Spanish)

No database is introduced (Constitution Principle V). These are typed, in-code data shapes living
under `src/content/` and `src/lib/`.

## Locale

`src/content/locale.ts`

```ts
export const LOCALES = ["pt", "en", "es"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "pt";
```

## PAGE_PATHS

One entry per logical page; the single source of truth for every URL in every language, consumed
by the language selector, `seo-links.ts`'s hreflang builder, and the sitemap.

```ts
type PageKey =
  | "home" | "webApps" | "mobileApps" | "digitalMarketing" | "socialMedia"
  | "about" | "methodology" | "contact" | "privacyPolicy";

export const PAGE_PATHS: Record<PageKey, Record<Locale, string>> = {
  home:            { pt: "/",              en: "/en",                 es: "/es" },
  webApps:         { pt: "/web-apps",      en: "/en/web-apps",        es: "/es/web-apps" },
  mobileApps:      { pt: "/mobile-apps",   en: "/en/mobile-apps",     es: "/es/mobile-apps" },
  digitalMarketing:{ pt: "/digital-marketing", en: "/en/digital-marketing", es: "/es/digital-marketing" },
  socialMedia:     { pt: "/social-media",  en: "/en/social-media",    es: "/es/social-media" },
  about:           { pt: "/about",         en: "/en/about",           es: "/es/about" },
  methodology:     { pt: "/methodology",   en: "/en/methodology",     es: "/es/methodology" },
  contact:         { pt: "/contact",       en: "/en/contact",         es: "/es/contact" },
  privacyPolicy:   { pt: "/privacy-policy",en: "/en/privacy-policy",  es: "/es/privacy-policy" },
};
```

Note: the home page's English/Spanish URLs are `/en` and `/es` (no trailing page segment) —
those two route files are `src/routes/en/index.tsx` and `src/routes/es/index.tsx`.

## PageContent (shape varies per page, one module per page under `src/content/`)

Each page's content module exports `Record<Locale, Shape>` for that page's own shape. Common
fields across all page shapes: `metaTitle`, `metaDescription` (used by that route's `head()`).
Page-specific fields mirror what's already hardcoded today — e.g. `about.ts`'s shape is
`{ metaTitle, metaDescription, eyebrow, heading, paragraph, items: string[] }`, `contact.ts`'s
shape additionally carries form field labels/placeholders and validation messages (consumed by
`buildContactSchema(locale)`), and `services.ts` extends today's `Service` shape
(`services-data.ts`) so `title`/`desc`/`tag`/`headline`/`summary`/`bullets` are each
`Record<Locale, ...>` instead of plain strings — `id`, `path` (now per-locale via `PAGE_PATHS`),
and `icon` stay locale-independent.

## Common (shared chrome strings)

`src/content/common.ts` — `Record<Locale, { nav: {...}, footer: {...}, whatsapp: string, ... }>`
for strings that appear on every page via `SiteHeader`/`SiteFooter`/`MobileNav`: nav item labels
(Serviços/Sobre/Metodologia/Contato and their EN/ES equivalents), "Falar agora" CTA, footer
copyright line, "Política de Privacidade" link text, language selector labels.

## SeoLinks (contract, not a stored entity)

`src/lib/seo-links.ts`'s `buildSeoLinks(page: PageKey, locale: Locale)` returns the `links` array
for that route's `head()`: one `canonical`, three `alternate hreflang` (`pt`/`en`/`es`), one
`hreflang="x-default"` — see `contracts/hreflang-sitemap-contract.md`.

## Contact Form Locale Payload

`contactSchema` (now `buildContactSchema(locale)`) gains one more field on top of the existing
`002`/`003` shape:

```ts
locale: z.enum(LOCALES),
```

Validated server-side same as every other field — the server does not trust a client-set locale
blindly for anything beyond "which of 3 known e-mail templates to send" (no privileged behavior
gated on it).

## Confirmation E-mail

`buildContactConfirmationEmail(locale, data)` — same shape as today's single-language version,
now with `subject`/`html` copy (headings, the "Recebemos sua mensagem" line, button labels)
resolved via `content/contact.ts`'s locale-keyed strings instead of literals.

## SitemapEntry

Unchanged shape from `004-seo-improvements`; the sitemap now has 21 entries (7 indexable pages ×
3 locales) instead of 8. `privacy-policy` stays excluded in all 3 languages (still `noindex`).
