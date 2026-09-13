import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { LanguageSelector } from "@/components/language-selector";
import { commonContent } from "@/content/common";
import { PAGE_PATHS, type Locale, type PageKey } from "@/content/locale";

export function MobileNav({ locale, page }: { locale: Locale; page: PageKey }) {
  const [open, setOpen] = useState(false);
  const t = commonContent[locale];

  const navLinks = [
    { to: PAGE_PATHS.home[locale], hash: "services", label: t.nav.services },
    { to: PAGE_PATHS.about[locale], hash: undefined, label: t.nav.about },
    { to: PAGE_PATHS.methodology[locale], hash: undefined, label: t.nav.methodology },
    { to: PAGE_PATHS.contact[locale], hash: undefined, label: t.nav.contact },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label={open ? t.mobileMenu.closeLabel : t.mobileMenu.openLabel}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-3/4 sm:max-w-xs">
        <SheetTitle className="font-display">{t.mobileMenu.title}</SheetTitle>
        <nav className="mt-8 flex flex-col gap-1">
          {navLinks.map((link) => (
            <SheetClose asChild key={link.to + (link.hash ?? "")}>
              <Link
                to={link.to}
                hash={link.hash}
                className="rounded-lg px-3 py-3 text-base font-medium text-foreground transition hover:bg-surface-elevated"
              >
                {link.label}
              </Link>
            </SheetClose>
          ))}
        </nav>
        <div className="mt-6 border-t border-border/60 pt-6">
          <LanguageSelector locale={locale} page={page} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
