import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ServiceDetail } from "@/components/service-detail";
import type { Service } from "@/lib/services-data";
import type { Locale, PageKey } from "@/content/locale";

export function ServicePage({
  service,
  locale,
  page,
}: {
  service: Service;
  locale: Locale;
  page: PageKey;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader locale={locale} page={page} />
      <ServiceDetail service={service} locale={locale} />
      <SiteFooter locale={locale} />
    </div>
  );
}
