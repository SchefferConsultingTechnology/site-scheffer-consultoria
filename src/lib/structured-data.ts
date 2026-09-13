import { services, type Service } from "@/lib/services-data";
import { SITE_NAME, SITE_OG_IMAGE, SITE_URL, SOCIAL_LINKS } from "@/lib/site-config";
import { DEFAULT_LOCALE, PAGE_PATHS, SERVICE_ID_TO_PAGE_KEY, type Locale } from "@/content/locale";

const COMPANY_EMAIL = "contato@schefferconsultoria.com.br";
const COMPANY_PHONE = "+5548999040445";

const BUSINESS_DESCRIPTION: Record<Locale, string> = {
  pt: "Consultoria em soluções tecnológicas: aplicações web e mobile, marketing digital e social media.",
  en: "Technology consulting: web and mobile applications, digital marketing, and social media.",
  es: "Consultoría en soluciones tecnológicas: aplicaciones web y móviles, marketing digital y redes sociales.",
};

export function buildBusinessStructuredData(locale: Locale = DEFAULT_LOCALE) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE_NAME,
    url: SITE_URL,
    logo: SITE_OG_IMAGE,
    image: SITE_OG_IMAGE,
    email: COMPANY_EMAIL,
    telephone: COMPANY_PHONE,
    areaServed: "BR",
    description: BUSINESS_DESCRIPTION[locale],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Serviços",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title[locale],
          description: service.desc[locale],
          url: `${SITE_URL}${PAGE_PATHS[SERVICE_ID_TO_PAGE_KEY[service.id]][locale]}`,
        },
      })),
    },
    ...(SOCIAL_LINKS.length > 0 ? { sameAs: SOCIAL_LINKS.map((link) => link.url) } : {}),
  };
}

export function buildServiceStructuredData(service: Service, locale: Locale = DEFAULT_LOCALE) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title[locale],
    description: service.summary[locale],
    areaServed: "BR",
    provider: {
      "@type": "ProfessionalService",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}
