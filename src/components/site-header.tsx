import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import logo from "@/assets/logo.webp";
import { MobileNav } from "@/components/mobile-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link to="/" className="flex shrink-0 items-center gap-2.5 ">
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
          <Link to="/" hash="servicos" className="transition hover:text-foreground">
            Serviços
          </Link>
          <Link to="/sobre" className="transition hover:text-foreground">
            Sobre
          </Link>
          <Link to="/processo" className="transition hover:text-foreground">
            Metodologia
          </Link>
          <Link to="/contato" className="transition hover:text-foreground">
            Contato
          </Link>
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <Link
            to="/contato"
            className="inline-flex h-9 items-center gap-1.5 rounded-full bg-primary px-3 sm:px-4 text-sm font-medium text-primary-foreground shadow-[0_0_30px_-8px_var(--color-primary)] transition hover:opacity-90"
          >
            <span className="hidden sm:inline">Falar agora</span>{" "}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
