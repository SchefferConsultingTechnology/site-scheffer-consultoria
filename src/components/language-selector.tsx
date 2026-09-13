import { Link } from "@tanstack/react-router";
import { Globe } from "lucide-react";

import { LOCALES, LOCALE_LABELS, PAGE_PATHS, type Locale, type PageKey } from "@/content/locale";
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
          <Globe className="h-3.5 w-3.5" />
          {locale.toUpperCase()}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {LOCALES.map((target) => (
          <DropdownMenuItem key={target} asChild disabled={target === locale}>
            <Link
              to={PAGE_PATHS[page][target]}
              aria-current={target === locale ? "true" : undefined}
            >
              {LOCALE_LABELS[target]}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
