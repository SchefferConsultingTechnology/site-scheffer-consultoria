import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { to: "/" as const, hash: "servicos", label: "Serviços" },
  { to: "/sobre" as const, hash: undefined, label: "Sobre" },
  { to: "/processo" as const, hash: undefined, label: "Processo" },
  { to: "/contato" as const, hash: undefined, label: "Contato" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-3/4 sm:max-w-xs">
        <SheetTitle className="font-display">Menu</SheetTitle>
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
      </SheetContent>
    </Sheet>
  );
}
