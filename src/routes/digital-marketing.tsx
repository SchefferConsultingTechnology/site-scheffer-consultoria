import { createFileRoute } from "@tanstack/react-router";

import { ServicePage } from "@/pages/service-page";
import { services } from "@/lib/services-data";
import { buildServiceStructuredData } from "@/lib/structured-data";
import { buildSeoLinks } from "@/lib/seo-links";
import { SITE_URL } from "@/lib/site-config";

const service = services.find((s) => s.id === "marketing")!;
const OG_IMAGE = `${SITE_URL}/og-digital-marketing.png`;

export const Route = createFileRoute("/digital-marketing")({
  head: () => {
    const title = service.metaTitle.pt;
    const description = service.metaDescription.pt;
    return {
      links: buildSeoLinks("digitalMarketing", "pt"),
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
        { "script:ld+json": buildServiceStructuredData(service, "pt") },
      ],
    };
  },
  component: () => <ServicePage service={service} locale="pt" page="digitalMarketing" />,
});
