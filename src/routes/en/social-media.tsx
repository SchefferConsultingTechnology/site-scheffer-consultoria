import { createFileRoute } from "@tanstack/react-router";

import { ServicePage } from "@/pages/service-page";
import { services } from "@/lib/services-data";
import { buildServiceStructuredData } from "@/lib/structured-data";
import { buildSeoLinks } from "@/lib/seo-links";
import { SITE_URL } from "@/lib/site-config";

const service = services.find((s) => s.id === "social")!;
const OG_IMAGE = `${SITE_URL}/og-social-media.png`;

export const Route = createFileRoute("/en/social-media")({
  head: () => {
    const title = service.metaTitle.en;
    const description = service.metaDescription.en;
    return {
      links: buildSeoLinks("socialMedia", "en"),
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
        { "script:ld+json": buildServiceStructuredData(service, "en") },
      ],
    };
  },
  component: () => <ServicePage service={service} locale="en" page="socialMedia" />,
});
