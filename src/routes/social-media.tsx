import { createFileRoute } from "@tanstack/react-router";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ServiceDetail } from "@/components/service-detail";
import { services } from "@/lib/services-data";
import { buildServiceStructuredData } from "@/lib/structured-data";
import { SITE_URL } from "@/lib/site-config";

const service = services.find((s) => s.path === "/social-media")!;
const TITLE = "Social Media — Scheffer Consultoria";
const DESCRIPTION =
  "Planejamento editorial, criação de conteúdo e gestão de redes sociais com consistência de marca e resultado mensurável.";

export const Route = createFileRoute("/social-media")({
  head: () => ({
    links: [{ rel: "canonical", href: `${SITE_URL}${service.path}` }],
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:url", content: `${SITE_URL}${service.path}` },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { "script:ld+json": buildServiceStructuredData(service) },
    ],
  }),
  component: SocialMedia,
});

function SocialMedia() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <ServiceDetail service={service} />
      <SiteFooter />
    </div>
  );
}
