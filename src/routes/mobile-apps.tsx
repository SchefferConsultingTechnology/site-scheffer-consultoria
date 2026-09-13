import { createFileRoute } from "@tanstack/react-router";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ServiceDetail } from "@/components/service-detail";
import { services } from "@/lib/services-data";
import { buildServiceStructuredData } from "@/lib/structured-data";
import { SITE_URL } from "@/lib/site-config";

const service = services.find((s) => s.path === "/mobile-apps")!;
const TITLE = "Apps Mobile — Scheffer Consultoria";
const DESCRIPTION =
  "Apps nativos e híbridos para iOS e Android, do MVP à publicação nas lojas. Foco em usabilidade, performance e resultado real.";
const OG_IMAGE = `${SITE_URL}/og-mobile-apps.png`;

export const Route = createFileRoute("/mobile-apps")({
  head: () => ({
    links: [{ rel: "canonical", href: `${SITE_URL}${service.path}` }],
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:url", content: `${SITE_URL}${service.path}` },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE },
      { "script:ld+json": buildServiceStructuredData(service) },
    ],
  }),
  component: MobileApps,
});

function MobileApps() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <ServiceDetail service={service} />
      <SiteFooter />
    </div>
  );
}
