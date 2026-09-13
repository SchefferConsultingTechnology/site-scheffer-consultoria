import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ContactForm } from "@/components/contact-form";
import { openCalModal } from "@/lib/open-cal-modal";
import { SITE_URL } from "@/lib/site-config";

const PAGE_URL = `${SITE_URL}/contact`;
const TITLE = "Contato — Scheffer Consultoria";
const DESCRIPTION =
  "Fale com a Scheffer Consultoria: conte seu projeto e receba um caminho claro para começar, com resposta em até 24 horas.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    links: [{ rel: "canonical", href: PAGE_URL }],
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:url", content: PAGE_URL },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
  }),
  component: Contact,
});

const WHATSAPP_NUMBER = "5548999040445";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.001 2C6.478 2 2 6.477 2 12c0 1.912.535 3.7 1.462 5.222L2.05 22l4.925-1.29A9.943 9.943 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12.001 2zm0 18.14a8.11 8.11 0 0 1-4.13-1.128l-.296-.176-3.07.805.82-2.994-.192-.307A8.09 8.09 0 0 1 3.86 12c0-4.487 3.653-8.14 8.14-8.14 4.487 0 8.14 3.653 8.14 8.14 0 4.487-3.653 8.14-8.14 8.14z" />
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    </svg>
  );
}

function Contact() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="relative py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface p-6 sm:p-10 lg:p-16">
            <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-primary/30 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
            <div className="relative">
              <p className="text-xs uppercase tracking-[0.3em] text-accent">Vamos conversar</p>
              <h1 className="mt-3 max-w-2xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
                Pronto para tirar seu projeto do papel?
              </h1>
              <p className="mt-4 max-w-xl text-base text-muted-foreground">
                Conte o que você tem em mente. Respondemos em até 24 horas com um caminho claro para
                começar.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={openCalModal}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent px-4 text-sm font-semibold text-accent-foreground transition hover:opacity-90"
                >
                  Agendar reunião <ArrowRight className="h-4 w-4" />
                </button>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 text-sm font-semibold text-white transition hover:bg-[#20BD5A]"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
