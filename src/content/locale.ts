export const LOCALES = ["pt", "en", "es"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "pt";

export type PageKey =
  | "home"
  | "webApps"
  | "mobileApps"
  | "digitalMarketing"
  | "socialMedia"
  | "about"
  | "methodology"
  | "contact"
  | "privacyPolicy";

// Single source of truth for every URL, in every language, for every page. Consumed by the
// language selector, the hreflang/canonical builder, and the sitemap.
export const PAGE_PATHS: Record<PageKey, Record<Locale, string>> = {
  home: { pt: "/", en: "/en", es: "/es" },
  webApps: { pt: "/web-apps", en: "/en/web-apps", es: "/es/web-apps" },
  mobileApps: { pt: "/mobile-apps", en: "/en/mobile-apps", es: "/es/mobile-apps" },
  digitalMarketing: {
    pt: "/digital-marketing",
    en: "/en/digital-marketing",
    es: "/es/digital-marketing",
  },
  socialMedia: { pt: "/social-media", en: "/en/social-media", es: "/es/social-media" },
  about: { pt: "/about", en: "/en/about", es: "/es/about" },
  methodology: { pt: "/methodology", en: "/en/methodology", es: "/es/methodology" },
  contact: { pt: "/contact", en: "/en/contact", es: "/es/contact" },
  privacyPolicy: {
    pt: "/privacy-policy",
    en: "/en/privacy-policy",
    es: "/es/privacy-policy",
  },
};

export const LOCALE_LABELS: Record<Locale, string> = {
  pt: "Português",
  en: "English",
  es: "Español",
};

// Maps services-data.ts's stable `id` field to its PAGE_PATHS key, so any component that has a
// Service object (but not necessarily its own PageKey) can still resolve a locale-aware URL.
export const SERVICE_ID_TO_PAGE_KEY: Record<string, PageKey> = {
  web: "webApps",
  mobile: "mobileApps",
  marketing: "digitalMarketing",
  social: "socialMedia",
};
