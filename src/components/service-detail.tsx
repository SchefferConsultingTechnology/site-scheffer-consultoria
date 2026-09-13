import type { Service } from "@/lib/services-data";

export function ServiceDetail({ service }: { service: Service }) {
  return (
    <section className="relative border-t border-border/60 py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30">
            <service.icon className="h-5 w-5" />
          </div>
          <p className="text-xs uppercase tracking-[0.3em] text-accent">{service.title}</p>
        </div>
        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          {service.headline}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {service.summary}
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {service.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span className="text-sm text-foreground/90">{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
