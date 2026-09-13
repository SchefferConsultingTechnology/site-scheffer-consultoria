import { createFileRoute } from "@tanstack/react-router";

import { HomePage } from "@/pages/home-page";
import { buildBusinessStructuredData } from "@/lib/structured-data";
import { buildSeoLinks } from "@/lib/seo-links";
import { homeContent } from "@/content/home";

export const Route = createFileRoute("/en/")({
  head: () => {
    const t = homeContent.en;
    return {
      links: buildSeoLinks("home", "en"),
      meta: [
        { title: t.metaTitle },
        { name: "description", content: t.metaDescription },
        { property: "og:title", content: t.metaTitle },
        { property: "og:description", content: t.metaDescription },
        { name: "twitter:title", content: t.metaTitle },
        { name: "twitter:description", content: t.metaDescription },
        { "script:ld+json": buildBusinessStructuredData("en") },
      ],
    };
  },
  component: () => <HomePage locale="en" />,
});
