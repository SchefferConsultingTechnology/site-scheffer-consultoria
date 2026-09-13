import { createFileRoute } from "@tanstack/react-router";

import { MethodologyPage } from "@/pages/methodology-page";
import { buildSeoLinks } from "@/lib/seo-links";
import { methodologyContent } from "@/content/methodology";

export const Route = createFileRoute("/es/methodology")({
  head: () => {
    const t = methodologyContent.es;
    return {
      links: buildSeoLinks("methodology", "es"),
      meta: [
        { title: t.metaTitle },
        { name: "description", content: t.metaDescription },
        { property: "og:title", content: t.metaTitle },
        { property: "og:description", content: t.metaDescription },
        { name: "twitter:title", content: t.metaTitle },
        { name: "twitter:description", content: t.metaDescription },
      ],
    };
  },
  component: () => <MethodologyPage locale="es" />,
});
