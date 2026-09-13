import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin, Mail } from "lucide-react";

import logo from "@/assets/logo.webp";
import { SOCIAL_LINKS } from "@/lib/site-config";

const NETWORK_ICON = {
  instagram: Instagram,
  linkedin: Linkedin,
} as const;

const NETWORK_LABEL = {
  instagram: "Instagram",
  linkedin: "LinkedIn",
} as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 sm:flex-row sm:px-6">
        <div className="flex items-center gap-2.5">
          <img
            src={logo}
            alt=""
            width={28}
            height={28}
            loading="lazy"
            className="h-7 w-7 rounded-full object-cover ring-1 ring-border"
          />
          <span className="font-display text-sm font-semibold">Scheffer Consultoria</span>
        </div>
        <div className="flex flex-col items-center gap-1 sm:items-start">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Scheffer Consultoria. Todos os direitos reservados.
          </p>
          <Link
            to="/privacy-policy"
            className="text-xs text-muted-foreground underline-offset-4 transition hover:text-foreground hover:underline"
          >
            Política de Privacidade
          </Link>
        </div>
        <div className="flex items-center gap-3 text-muted-foreground">
          {SOCIAL_LINKS.map((social) => {
            const Icon = NETWORK_ICON[social.network];
            return (
              <a
                key={social.network}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={NETWORK_LABEL[social.network]}
                className="transition hover:text-foreground"
              >
                <Icon className="h-4 w-4" />
              </a>
            );
          })}
          <Link to="/contact" aria-label="Contato" className="transition hover:text-foreground">
            <Mail className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
