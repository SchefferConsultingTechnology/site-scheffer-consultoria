import { PAGE_PATHS, type Locale, type PageKey } from "@/content/locale";
import { SITE_URL } from "@/lib/site-config";

// Every route's head() spreads this into `links` — one canonical for its own locale, one
// hreflang alternate per language (including itself), and an x-default pointing at Portuguese
// (the site's default language). Centralizing this on PAGE_PATHS means the language selector and
// this builder can never drift out of sync with each other.
export function buildSeoLinks(page: PageKey, locale: Locale) {
  const paths = PAGE_PATHS[page];
  return [
    { rel: "canonical", href: `${SITE_URL}${paths[locale]}` },
    { rel: "alternate", hrefLang: "pt", href: `${SITE_URL}${paths.pt}` },
    { rel: "alternate", hrefLang: "en", href: `${SITE_URL}${paths.en}` },
    { rel: "alternate", hrefLang: "es", href: `${SITE_URL}${paths.es}` },
    { rel: "alternate", hrefLang: "x-default", href: `${SITE_URL}${paths.pt}` },
  ];
}
