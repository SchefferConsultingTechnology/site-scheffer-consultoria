import { createFileRoute } from "@tanstack/react-router";

import { ContactPage } from "@/pages/contact-page";
import { buildSeoLinks } from "@/lib/seo-links";
import { contactContent } from "@/content/contact";

export const Route = createFileRoute("/es/contact")({
  head: () => {
    const t = contactContent.es;
    return {
      links: buildSeoLinks("contact", "es"),
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
  component: () => <ContactPage locale="es" />,
});
