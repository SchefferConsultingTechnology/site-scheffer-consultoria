import { aboutContent } from "@/content/about";
import type { Locale } from "@/content/locale";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export function AboutPage({ locale }: { locale: Locale }) {
  const t = aboutContent[locale];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader locale={locale} page="about" />
      <section className="relative py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">{t.eyebrow}</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            {t.headingLine1} <br />
            {t.headingLine2}
          </h1>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">{t.paragraph}</p>
          <ul className="mt-8 grid gap-3 text-sm">
            {t.items.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span className="text-foreground/90">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <SiteFooter locale={locale} />
    </div>
  );
}
