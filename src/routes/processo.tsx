import { createFileRoute } from "@tanstack/react-router";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SITE_URL } from "@/lib/site-config";

const PAGE_URL = `${SITE_URL}/processo`;
const TITLE = "Processo — Scheffer Consultoria";
const DESCRIPTION =
  "Veja como trabalhamos: descoberta, estratégia, execução e crescimento — um processo enxuto e transparente do diagnóstico ao resultado.";

export const Route = createFileRoute("/processo")({
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
  component: Processo,
});

const STEPS = [
  {
    n: "01",
    t: "Descoberta",
    d: "Entendemos o negócio, o público e os objetivos reais.",
  },
  {
    n: "02",
    t: "Estratégia",
    d: "Definimos escopo, stack e o plano de comunicação.",
  },
  {
    n: "03",
    t: "Execução",
    d: "Design, código e conteúdo caminhando em paralelo.",
  },
  {
    n: "04",
    t: "Crescimento",
    d: "Medimos, ajustamos e escalamos o que funciona.",
  },
];

function Processo() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="relative py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">Processo</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Como trabalhamos
          </h1>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            Um processo enxuto e transparente, do primeiro diagnóstico ao acompanhamento contínuo de
            resultado.
          </p>
          <div className="mt-10 grid gap-4">
            {STEPS.map((step) => (
              <div
                key={step.n}
                className="flex items-start gap-5 rounded-2xl border border-border bg-surface p-5 transition hover:border-accent/50"
              >
                <span className="font-display text-2xl font-bold text-accent">{step.n}</span>
                <div>
                  <h2 className="font-display text-lg font-semibold">{step.t}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{step.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
