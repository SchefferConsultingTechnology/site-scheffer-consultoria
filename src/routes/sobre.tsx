import { createFileRoute } from "@tanstack/react-router";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SITE_URL } from "@/lib/site-config";

const PAGE_URL = `${SITE_URL}/sobre`;
const TITLE = "Sobre — Scheffer Consultoria";
const DESCRIPTION =
  "Conheça a Scheffer Consultoria: mais de uma década de experiência em tecnologia e marketing, com uma identidade renovada e processo transparente.";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    links: [{ rel: "canonical", href: PAGE_URL }],
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:url", content: PAGE_URL },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
  }),
  component: Sobre,
});

const ABOUT_ITEMS = [
  "Consultoria estratégica de ponta a ponta",
  "Squads dedicados por projeto",
  "Código próprio, sem caixa-preta",
  "Relatórios e transparência mensal",
];

function Sobre() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="relative py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">Sobre</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Nova por fora. <br />
            Experiente por dentro.
          </h1>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            A Scheffer Consultoria nasce com uma identidade renovada, mas carrega mais de uma década
            de experiência entregando projetos de tecnologia e marketing para empresas de diversos
            portes. Combinamos maturidade técnica com a agilidade de quem começa hoje.
          </p>
          <ul className="mt-8 grid gap-3 text-sm">
            {ABOUT_ITEMS.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span className="text-foreground/90">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
