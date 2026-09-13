import { createFileRoute } from "@tanstack/react-router";

import { AboutPage } from "@/pages/about-page";
import { buildSeoLinks } from "@/lib/seo-links";
import { aboutContent } from "@/content/about";

export const Route = createFileRoute("/about")({
  head: () => {
    const t = aboutContent.pt;
    return {
      links: buildSeoLinks("about", "pt"),
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
  component: () => <AboutPage locale="pt" />,
});
