import { services, type Service } from "@/lib/services-data";
import { SITE_NAME, SITE_OG_IMAGE, SITE_URL, SOCIAL_LINKS } from "@/lib/site-config";

const COMPANY_EMAIL = "contato@schefferconsultoria.com.br";
const COMPANY_PHONE = "+5548999040445";

export function buildBusinessStructuredData() {
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
    description:
      "Consultoria em soluções tecnológicas: aplicações web e mobile, marketing digital e social media.",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Serviços",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.desc,
          url: `${SITE_URL}${service.path}`,
        },
      })),
    },
    ...(SOCIAL_LINKS.length > 0 ? { sameAs: SOCIAL_LINKS.map((link) => link.url) } : {}),
  };
}

export function buildServiceStructuredData(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.summary,
    areaServed: "BR",
    provider: {
      "@type": "ProfessionalService",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}
