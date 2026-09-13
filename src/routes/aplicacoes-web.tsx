import { createFileRoute } from "@tanstack/react-router";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ServiceDetail } from "@/components/service-detail";
import { services } from "@/lib/services-data";
import { buildServiceStructuredData } from "@/lib/structured-data";
import { SITE_URL } from "@/lib/site-config";

const service = services.find((s) => s.path === "/aplicacoes-web")!;
const TITLE = "Aplicações Web — Scheffer Consultoria";
const DESCRIPTION =
  "Desenvolvimento de aplicações web, dashboards e sites de alta performance sob medida. Arquitetura escalável, código próprio e foco em resultado.";

export const Route = createFileRoute("/aplicacoes-web")({
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
  component: AplicacoesWeb,
});

function AplicacoesWeb() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <ServiceDetail service={service} />
      <SiteFooter />
    </div>
  );
}
