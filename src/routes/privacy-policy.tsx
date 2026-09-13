import { createFileRoute } from "@tanstack/react-router";

import { PrivacyPolicyPage } from "@/pages/privacy-policy-page";
import { buildSeoLinks } from "@/lib/seo-links";
import { privacyPolicyContent } from "@/content/privacy-policy";

export const Route = createFileRoute("/privacy-policy")({
  head: () => {
    const t = privacyPolicyContent.pt;
    return {
      links: buildSeoLinks("privacyPolicy", "pt"),
      meta: [
        { title: t.metaTitle },
        { name: "description", content: t.metaDescription },
        { property: "og:title", content: t.metaTitle },
        { property: "og:description", content: t.metaDescription },
        { name: "robots", content: "noindex" },
      ],
    };
  },
  component: () => <PrivacyPolicyPage locale="pt" />,
});
