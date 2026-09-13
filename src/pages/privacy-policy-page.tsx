import { privacyPolicyContent } from "@/content/privacy-policy";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import type { Locale } from "@/content/locale";

export function PrivacyPolicyPage({ locale }: { locale: Locale }) {
  const t = privacyPolicyContent[locale];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader locale={locale} page="privacyPolicy" />
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">{t.eyebrow}</p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          {t.title}
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          {t.lastUpdatedLabel} {t.lastUpdated}
        </p>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground">{t.intro}</p>

        <div className="mt-12 grid gap-10">
          {t.sections.map((section) => (
            <section key={section.title}>
              <h2 className="font-display text-xl font-semibold sm:text-2xl">{section.title}</h2>
              <div className="mt-3 grid gap-3 text-sm leading-relaxed text-muted-foreground sm:text-base [&_strong]:text-foreground/90 [&_ul]:list-disc [&_ul]:pl-5">
                {section.body}
              </div>
            </section>
          ))}
        </div>
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
