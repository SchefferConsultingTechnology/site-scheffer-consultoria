# Contract: Locale Route Files

## Required shape per locale route file

```ts
// src/routes/en/about.tsx  (and the es/ sibling, same shape, locale="es")
import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "@/pages/about-page";
import { buildSeoLinks } from "@/lib/seo-links";
import { aboutContent } from "@/content/about";

export const Route = createFileRoute("/en/about")({
  head: () => {
    const content = aboutContent.en;
    return {
      links: buildSeoLinks("about", "en"),
      meta: [
        { title: content.metaTitle },
        { name: "description", content: content.metaDescription },
        // og:*, twitter:* mirroring page-metadata-contract.md, per FR-005/FR-006
      ],
    };
  },
  component: () => <AboutPage locale="en" />,
});
```

## Rules

- Every route file's `createFileRoute("...")` path argument MUST exactly match its file's location
  under `src/routes/` (Principle III — TanStack Router's own file-based convention, not manually
  overridden).
- The Portuguese route files (`src/routes/about.tsx`, etc.) keep their existing paths unchanged
  (spec FR-002) — they become the same thin-wrapper shape as `en`/`es`, just with `locale="pt"`
  and no path prefix.
- A locale route file MUST NOT contain page layout/JSX beyond the `component` line delegating to
  the shared page component — see `data-model.md`'s page component pattern. If a page-specific
  visual difference beyond translated text is ever needed for one locale, that's a deliberate
  design decision to make explicitly in the shared page component (e.g. via a prop), not by
  forking the route file's JSX.
- The 4 service routes (`web-apps`, `mobile-apps`, `digital-marketing`, `social-media`) reuse one
  shared `service-page.tsx` exactly as today's `ServiceDetail` is reused — each locale route
  passes both `locale` and which service.
- `routeTree.gen.ts` MUST be left to regenerate automatically (`npm run dev` or `npm run build`)
  after adding/renaming route files — never hand-edited (Principle II).

## Non-goals

- No runtime locale detection, redirect, or `$locale` dynamic route segment (spec Assumptions,
  research.md §2) — every locale/page combination is its own static route file.
