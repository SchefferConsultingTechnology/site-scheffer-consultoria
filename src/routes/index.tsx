import { useEffect } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Zap } from "lucide-react";

import logo from "@/assets/logo.webp";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { services } from "@/lib/services-data";
import { LEGACY_ANCHOR_REDIRECTS } from "@/lib/legacy-anchor-redirect";
import { buildBusinessStructuredData } from "@/lib/structured-data";
import { SITE_URL } from "@/lib/site-config";

export const Route = createFileRoute("/")({
  // Title/description/og:title/og:description/twitter:* are the global defaults from
  // __root.tsx — they already describe the homepage itself, so this route only adds what's
  // specific to it: its own canonical/og:url, and the business structured data.
  head: () => ({
    links: [{ rel: "canonical", href: SITE_URL }],
    meta: [
      { property: "og:url", content: SITE_URL },
      { "script:ld+json": buildBusinessStructuredData() },
    ],
  }),
  component: Home,
});

const stats = [
  { value: "30+", label: "anos de mercado" },
  { value: "80+", label: "projetos entregues" },
  { value: "24/7", label: "suporte dedicado" },
];

function useLegacyAnchorRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    const target = LEGACY_ANCHOR_REDIRECTS[hash];
    if (target && target !== "/") {
      navigate({ to: target, replace: true });
    }
  }, [navigate]);
}

function Home() {
  useLegacyAnchorRedirect();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* HERO */}
      <section id="top" className="relative overflow-hidden bg-hero">
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-primary/25 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-[-20%] left-[-10%] h-[420px] w-[420px] rounded-full bg-accent/20 blur-[120px]" />

        <div className="relative mx-auto grid max-w-7xl gap-16 px-4 py-24 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:py-32">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              Nova marca. Anos de bagagem.
            </div>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              Soluções digitais que <span className="text-gradient">movem</span> negócios adiante.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Da ideia ao lançamento: criamos aplicações web, apps mobile e estratégias de marketing
              digital que geram resultado real. Consultoria técnica com visão de negócio.
            </p>
            <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                to="/contato"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition hover:translate-y-[-1px] sm:w-auto"
              >
                Começar um projeto <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#servicos"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-border bg-surface/40 px-6 text-sm font-medium text-foreground backdrop-blur transition hover:bg-surface sm:w-auto"
              >
                Ver serviços
              </a>
            </div>

            <dl className="mt-14 grid max-w-lg grid-cols-3 gap-3 border-t border-border/60 pt-8 sm:gap-6">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="font-display text-3xl font-bold text-foreground">{s.value}</dt>
                  <dd className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Logo showcase */}
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-primary/20 via-transparent to-accent/20 blur-2xl" />
            <div className="relative aspect-square w-full max-w-md rounded-[2rem] border border-border/80 bg-surface/60 p-6 backdrop-blur-xl sm:p-10">
              <div className="absolute inset-x-6 top-6 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-muted-foreground sm:inset-x-8 sm:top-8">
                <span>Scheffer</span>
                <span className="text-primary">● online</span>
              </div>
              <div className="flex h-full items-center justify-center">
                <div className="flex items-center justify-center rounded-full bg-white p-3 shadow-[var(--shadow-elegant)] sm:p-4 lg:p-5">
                  <img
                    src={logo}
                    alt="Logo Scheffer Consultoria"
                    width={112}
                    height={112}
                    className="h-28 w-28 object-contain sm:h-36 sm:w-36 lg:h-44 lg:w-44"
                  />
                </div>
              </div>
              <div className="absolute inset-x-6 bottom-6 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-muted-foreground sm:inset-x-8 sm:bottom-8">
                <span>Consultoria</span>
                <span>2026</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="servicos" className="relative border-t border-border/60 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.3em] text-accent">Serviços</p>
              <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
                Tudo que sua marca precisa <br className="hidden sm:block" />
                para acontecer online.
              </h2>
            </div>
            <p className="max-w-sm text-sm text-muted-foreground">
              Times enxutos, entregas rápidas, código próprio e estratégia baseada em dados.
              Cuidamos da execução técnica e do posicionamento da marca.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <article
                key={s.title}
                className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-6 transition hover:border-primary/50 hover:bg-surface-elevated"
              >
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 opacity-0 blur-2xl transition group-hover:opacity-100" />
                <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="relative mt-6 font-display text-xl font-semibold">{s.title}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
                  {s.desc}
                </p>
                <div className="relative mt-6 flex items-center justify-between gap-2">
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/50 px-2.5 py-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                    <Zap className="h-3 w-3 text-accent" />
                    {s.tag}
                  </div>
                  <Link
                    to={s.path}
                    className="text-xs font-medium text-primary underline-offset-4 transition hover:underline"
                  >
                    Saiba mais
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT teaser */}
      <section className="relative border-t border-border/60 py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">Sobre</p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Nova por fora. Experiente por dentro.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            Três décadas desenvolvendo aplicações e uma década em marketing digital — com identidade
            renovada e um processo de trabalho transparente.
          </p>
          <Link
            to="/sobre"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            Conheça a Scheffer Consultoria <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      {/* CONTACT teaser */}
      <section className="relative border-t border-border/60 py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface p-6 text-center sm:p-10 lg:p-16">
            <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-primary/30 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
            <div className="relative mx-auto max-w-2xl">
              <p className="text-xs uppercase tracking-[0.3em] text-accent">Vamos conversar</p>
              <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
                Pronto para tirar seu projeto do papel?
              </h2>
              <p className="mt-4 text-base text-muted-foreground">
                Conte o que você tem em mente. Respondemos em até 24 horas com um caminho claro para
                começar.
              </p>
              <Link
                to="/contato"
                className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition hover:opacity-90"
              >
                Falar com a gente <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
