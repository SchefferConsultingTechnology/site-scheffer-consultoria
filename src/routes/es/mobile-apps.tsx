import { createFileRoute } from "@tanstack/react-router";

import { ServicePage } from "@/pages/service-page";
import { services } from "@/lib/services-data";
import { buildServiceStructuredData } from "@/lib/structured-data";
import { buildSeoLinks } from "@/lib/seo-links";
import { SITE_URL } from "@/lib/site-config";

const service = services.find((s) => s.id === "mobile")!;
const OG_IMAGE = `${SITE_URL}/og-mobile-apps.png`;

export const Route = createFileRoute("/es/mobile-apps")({
  head: () => {
    const title = service.metaTitle.es;
    const description = service.metaDescription.es;
    return {
      links: buildSeoLinks("mobileApps", "es"),
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:image", content: OG_IMAGE },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: OG_IMAGE },
        { "script:ld+json": buildServiceStructuredData(service, "es") },
      ],
    };
  },
  component: () => <ServicePage service={service} locale="es" page="mobileApps" />,
});
