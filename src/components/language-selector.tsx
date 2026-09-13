import { Link } from "@tanstack/react-router";

import {
  LOCALES,
  LOCALE_FLAGS,
  LOCALE_LABELS,
  PAGE_PATHS,
  type Locale,
  type PageKey,
} from "@/content/locale";
import { commonContent } from "@/content/common";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LanguageSelector({ locale, page }: { locale: Locale; page: PageKey }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={commonContent[locale].languageSelector.ariaLabel}
          className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border px-3 text-sm text-muted-foreground transition hover:border-primary/50 hover:text-foreground"
        >
          <span aria-hidden="true">{LOCALE_FLAGS[locale]}</span>
          {locale.toUpperCase()}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {LOCALES.map((target) => (
          <DropdownMenuItem key={target} asChild disabled={target === locale}>
            <Link
              to={PAGE_PATHS[page][target]}
              aria-current={target === locale ? "true" : undefined}
              className="gap-2"
            >
              <span aria-hidden="true">{LOCALE_FLAGS[target]}</span>
              {LOCALE_LABELS[target]}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
