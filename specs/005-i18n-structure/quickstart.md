# Quickstart: Validating the i18n Structure

## Prerequisites

- Dependencies installed (`npm install`).
- Dev server running: `npm run dev`.

## Route coverage (User Stories 1 & 2)

For each of the 9 pages below, confirm all 3 URLs load and render fully in their own language (no
Portuguese text visible on an `/en/` or `/es/` page):

| Page | pt | en | es |
| --- | --- | --- | --- |
| Home | `/` | `/en` | `/es` |
| Aplicações Web | `/web-apps` | `/en/web-apps` | `/es/web-apps` |
| Apps Mobile | `/mobile-apps` | `/en/mobile-apps` | `/es/mobile-apps` |
| Marketing Digital | `/digital-marketing` | `/en/digital-marketing` | `/es/digital-marketing` |
| Social Media | `/social-media` | `/en/social-media` | `/es/social-media` |
| Sobre | `/about` | `/en/about` | `/es/about` |
| Metodologia | `/methodology` | `/en/methodology` | `/es/methodology` |
| Contato | `/contact` | `/en/contact` | `/es/contact` |
| Política de Privacidade | `/privacy-policy` | `/en/privacy-policy` | `/es/privacy-policy` |

This validates SC-001 and SC-005 — fetch each URL's server-rendered HTML directly (no JS
execution) and confirm the language is correct from the first response, not just after hydration.

## Language selector (User Story 1)

1. From 3 different pages (e.g. `/digital-marketing`, `/about`, `/contact`), open the header
   language selector and switch to English — confirm you land on `/en/digital-marketing`,
   `/en/about`, `/en/contact` respectively (not `/en`).
2. From an English or Spanish page, switch back to Português — confirm the unprefixed URL (no
   `/pt/` segment).
3. Repeat steps 1–2 using the mobile nav drawer's selector at a mobile viewport width.

## SEO (User Story 3)

1. For one page (e.g. `about`), fetch all 3 language URLs' HTML and confirm each has: its own
   correct `canonical`, 3 `hreflang` alternates (`pt`/`en`/`es`) pointing at the other 2 language
   URLs plus itself, and an `hreflang="x-default"` pointing at the Portuguese URL.
2. Fetch `/sitemap.xml` and confirm it lists 21 URLs (7 pages × 3 locales); confirm none of them is
   a `privacy-policy` URL in any language.

## Contact form and confirmation e-mail

1. Submit the contact form from `/en/contact` with a deliberately invalid field (e.g. empty name)
   — confirm the validation message shown is in English.
2. Submit a valid English submission — confirm the on-page success message is in English and the
   confirmation e-mail received is in English.
3. Repeat both checks from `/es/contact` (Spanish) and `/contact` (Portuguese, regression check —
   should behave exactly as before this feature).

## Quality gates

```bash
npm run typecheck
npm run lint
npm run format
npm run build
```

All four MUST pass clean (Constitution Principle II).

## Expected outcome

All 27 route/locale combinations render correctly, the language selector never loses the visitor's
place, hreflang/canonical/sitemap are internally consistent across all 3 languages, and the contact
form + confirmation e-mail respect the submitting page's language — with no code changes required
beyond what's tracked in `tasks.md` for this feature.
