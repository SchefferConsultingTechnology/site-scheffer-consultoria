import { methodologyContent } from "@/content/methodology";
import type { Locale } from "@/content/locale";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export function MethodologyPage({ locale }: { locale: Locale }) {
  const t = methodologyContent[locale];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader locale={locale} page="methodology" />
      <section className="relative py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">{t.eyebrow}</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            {t.heading}
          </h1>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">{t.paragraph}</p>
          <div className="mt-10 grid gap-4">
            {t.steps.map((step) => (
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
      <SiteFooter locale={locale} />
    </div>
  );
}
