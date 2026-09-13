import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import logo from "@/assets/logo.webp";
import { MobileNav } from "@/components/mobile-nav";
import { LanguageSelector } from "@/components/language-selector";
import { commonContent } from "@/content/common";
import { PAGE_PATHS, type Locale, type PageKey } from "@/content/locale";

export function SiteHeader({ locale, page }: { locale: Locale; page: PageKey }) {
  const t = commonContent[locale];
  const homePath = PAGE_PATHS.home[locale];
  const contactPath = PAGE_PATHS.contact[locale];

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link to={homePath} className="flex shrink-0 items-center gap-2.5 ">
          <img
            src={logo}
            alt="Scheffer Consultoria"
            width={44}
            height={44}
            className="h-11 w-11 rounded-full object-cover ring-1 ring-border"
          />
          <span className="font-display text-base font-semibold tracking-tight">
            Scheffer<span className="text-primary mx-2">Consultoria</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <Link to={homePath} hash="services" className="transition hover:text-foreground">
            {t.nav.services}
          </Link>
          <Link to={PAGE_PATHS.about[locale]} className="transition hover:text-foreground">
            {t.nav.about}
          </Link>
          <Link to={PAGE_PATHS.methodology[locale]} className="transition hover:text-foreground">
            {t.nav.methodology}
          </Link>
          <Link to={contactPath} className="transition hover:text-foreground">
            {t.nav.contact}
          </Link>
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <LanguageSelector locale={locale} page={page} />
          <Link
            to={contactPath}
            className="inline-flex h-9 items-center gap-1.5 rounded-full bg-primary px-3 sm:px-4 text-sm font-medium text-primary-foreground shadow-[0_0_30px_-8px_var(--color-primary)] transition hover:opacity-90"
          >
            <span className="hidden sm:inline">{t.cta}</span> <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <MobileNav locale={locale} page={page} />
        </div>
      </div>
    </header>
  );
}
