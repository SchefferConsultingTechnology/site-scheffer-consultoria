import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Code2,
  Smartphone,
  Megaphone,
  Share2,
  Sparkles,
  Zap,
  Instagram,
  Linkedin,
  Mail,
} from "lucide-react";

import logo from "@/assets/scheffer-logo.jpeg";
import { MobileNav } from "@/components/mobile-nav";
import { ContactForm } from "@/components/contact-form";
import { openCalModal } from "@/lib/open-cal-modal";

export const Route = createFileRoute("/")({
  component: Home,
});

const services = [
  {
    icon: Code2,
    title: "Aplicações Web",
    desc: "Plataformas, dashboards e sites de alta performance sob medida para o seu negócio.",
    tag: "Full-stack",
  },
  {
    icon: Smartphone,
    title: "Apps Mobile",
    desc: "Experiências nativas e híbridas para iOS e Android, com foco em usabilidade.",
    tag: "iOS · Android",
  },
  {
    icon: Megaphone,
    title: "Marketing Digital",
    desc: "Estratégia, tráfego pago e SEO para transformar cliques em clientes.",
    tag: "Performance",
  },
  {
    icon: Share2,
    title: "Social Media",
    desc: "Gestão de redes, conteúdo criativo e presença de marca com consistência.",
    tag: "Conteúdo",
  },
];

const stats = [
  { value: "15+", label: "anos de mercado" },
  { value: "80+", label: "projetos entregues" },
  { value: "24/7", label: "suporte dedicado" },
];

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
          <a href="#top" className="flex shrink-0 items-center gap-2.5">
            <img
              src={logo}
              alt="Scheffer Consultoria"
              className="h-9 w-9 rounded-full object-cover ring-1 ring-border"
            />
            <span className="font-display text-base font-semibold tracking-tight">
              Scheffer<span className="text-primary">.</span>
            </span>
          </a>
          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a href="#servicos" className="transition hover:text-foreground">
              Serviços
            </a>
            <a href="#sobre" className="transition hover:text-foreground">
              Sobre
            </a>
            <a href="#processo" className="transition hover:text-foreground">
              Processo
            </a>
            <a href="#contato" className="transition hover:text-foreground">
              Contato
            </a>
          </nav>
          <div className="flex shrink-0 items-center gap-2">
            <a
              href="#contato"
              className="inline-flex h-9 items-center gap-1.5 rounded-full bg-primary px-3 sm:px-4 text-sm font-medium text-primary-foreground shadow-[0_0_30px_-8px_var(--color-primary)] transition hover:opacity-90"
            >
              <span className="hidden sm:inline">Falar agora</span>{" "}
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
            <MobileNav />
          </div>
        </div>
      </header>

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
              <a
                href="#contato"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition hover:translate-y-[-1px] sm:w-auto"
              >
                Começar um projeto <ArrowRight className="h-4 w-4" />
              </a>
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
                <img
                  src={logo}
                  alt="Logo Scheffer Consultoria"
                  className="h-32 w-32 rounded-full object-cover shadow-[var(--shadow-elegant)] ring-1 ring-border sm:h-48 sm:w-48 lg:h-64 lg:w-64"
                />
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
                <div className="relative mt-6 inline-flex items-center gap-1.5 rounded-full border border-border bg-background/50 px-2.5 py-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                  <Zap className="h-3 w-3 text-accent" />
                  {s.tag}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="sobre" className="relative border-t border-border/60 py-24">
        <div className="mx-auto grid max-w-7xl gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-accent">Sobre</p>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Nova por fora. <br />
              Experiente por dentro.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              A Scheffer Consultoria nasce com uma identidade renovada, mas carrega mais de uma
              década de experiência entregando projetos de tecnologia e marketing para empresas de
              diversos portes. Combinamos maturidade técnica com a agilidade de quem começa hoje.
            </p>
            <ul className="mt-8 grid gap-3 text-sm">
              {[
                "Consultoria estratégica de ponta a ponta",
                "Squads dedicados por projeto",
                "Código próprio, sem caixa-preta",
                "Relatórios e transparência mensal",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span className="text-foreground/90">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div id="processo" className="grid gap-4">
            {[
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
            ].map((step) => (
              <div
                key={step.n}
                className="flex items-start gap-5 rounded-2xl border border-border bg-surface p-5 transition hover:border-accent/50"
              >
                <span className="font-display text-2xl font-bold text-accent">{step.n}</span>
                <div>
                  <h3 className="font-display text-lg font-semibold">{step.t}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{step.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contato" className="relative border-t border-border/60 py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface p-6 sm:p-10 lg:p-16">
            <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-primary/30 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
            <div className="relative">
              <p className="text-xs uppercase tracking-[0.3em] text-accent">Vamos conversar</p>
              <h2 className="mt-3 max-w-2xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
                Pronto para tirar seu projeto do papel?
              </h2>
              <p className="mt-4 max-w-xl text-base text-muted-foreground">
                Conte o que você tem em mente. Respondemos em até 24 horas com um caminho claro para
                começar.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>

              <div className="mt-4">
                <button
                  type="button"
                  onClick={openCalModal}
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-semibold text-accent-foreground transition hover:opacity-90 sm:w-auto"
                >
                  Agendar reunião <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border/60 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 sm:flex-row sm:px-6">
          <div className="flex items-center gap-2.5">
            <img
              src={logo}
              alt=""
              className="h-7 w-7 rounded-full object-cover ring-1 ring-border"
            />
            <span className="font-display text-sm font-semibold">Scheffer Consultoria</span>
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Scheffer Consultoria. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-3 text-muted-foreground">
            <a href="#" aria-label="Instagram" className="transition hover:text-foreground">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" aria-label="LinkedIn" className="transition hover:text-foreground">
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="mailto:contato@schefferconsultoria.com.br"
              aria-label="E-mail"
              className="transition hover:text-foreground"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
