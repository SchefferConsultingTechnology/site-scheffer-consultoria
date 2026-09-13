import type { Service } from "@/lib/services-data";

function ServiceVisual({ service }: { service: Service }) {
  return (
    <div className="relative flex items-center justify-center">
      <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-primary/20 via-transparent to-accent/20 blur-2xl" />
      <div className="relative aspect-square w-full max-w-sm overflow-hidden rounded-[2rem] border border-border/80 bg-surface/60 p-6 backdrop-blur-xl sm:p-10">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-primary/25 blur-[80px]" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 h-56 w-56 rounded-full bg-accent/20 blur-[80px]" />
        <div className="absolute inset-x-6 top-6 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-muted-foreground sm:inset-x-8 sm:top-8">
          <span>Scheffer</span>
          <span className="text-primary">● online</span>
        </div>
        <div className="relative flex h-full items-center justify-center">
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-primary/15 text-primary ring-1 ring-primary/30 sm:h-36 sm:w-36">
            <service.icon className="h-12 w-12 sm:h-16 sm:w-16" />
          </div>
        </div>
        <div className="absolute inset-x-6 bottom-6 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-muted-foreground sm:inset-x-8 sm:bottom-8">
          <span>{service.title}</span>
          <span>{service.tag}</span>
        </div>
      </div>
    </div>
  );
}

export function ServiceDetail({ service }: { service: Service }) {
  return (
    <section className="relative border-t border-border/60 py-20">
      <div className="mx-auto grid max-w-5xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div>
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
        <ServiceVisual service={service} />
      </div>
    </section>
  );
}
