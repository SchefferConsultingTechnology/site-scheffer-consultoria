# Phase 0 Research: Contact Form & Meeting Scheduling

No items in Technical Context were left as `NEEDS CLARIFICATION` after the spec's own clarification
round (FR-002, FR-006). This document records the implementation-level decisions made to fill in
the "how" behind the spec's "what."

## Decision: TanStack Start server function calling Resend's HTTP API

**Decision**: Add `src/lib/send-contact-email.server.ts`, a `createServerFn` (already used in this
codebase's `src/start.ts` for middleware) that calls Resend's HTTP API to deliver the message.

**Rationale**: Cloudflare Workers cannot open raw SMTP sockets, so a fetch-based transactional email
API is required — Resend fits, is already the vendor the user chose, and its SDK is a thin wrapper
over `fetch`. Using a TanStack server function keeps everything inside the existing single Worker
deploy; no separate backend/service is introduced (Principle V).

**Alternatives considered**: A dedicated API route under Nitro — functionally equivalent but TanStack
Start's server functions are the framework-native mechanism already in use; introducing a second
pattern for the same purpose would be inconsistent. Formspree/Web3Forms — explicitly rejected by the
user in favor of the Resend-based approach for more control and branding.

## Decision: Resend API key as a Cloudflare Worker secret / `.dev.vars` entry

**Decision**: `RESEND_API_KEY` is provided via `wrangler secret put RESEND_API_KEY` in production and
a `RESEND_API_KEY=...` line in the local `.dev.vars` file.

**Rationale**: `.dev.vars` is already gitignored and already documented in the project's
"Wrangler / Cloudflare" `.gitignore` section — this is the existing convention for secrets in this
project, not a new one. Keeps the key out of source control and out of client-side bundles (the
server function only runs server-side).

**Alternatives considered**: Build-time `VITE_*` env var — rejected outright, `VITE_*` variables are
inlined into the client bundle and would leak the secret to every visitor.

## Decision: Shared zod schema for client and server validation

**Decision**: `src/lib/contact-schema.ts` exports one zod schema. The client form uses it via
`@hookform/resolvers/zod` (already installed); the server function re-parses the same schema against
the incoming payload before calling Resend.

**Rationale**: Both `react-hook-form`, `zod`, and `@hookform/resolvers` are already in
`package.json` — using them is the "prefer what's already installed" extension of Principle I to
non-UI dependencies. Server-side re-validation is required regardless of client-side checks, since a
request can always bypass the browser form.

**Alternatives considered**: Validating only in the server function and skipping client-side
`zod` wiring — would still work, but would lose the inline, field-level error messages FR-003
requires and duplicate validation logic by hand instead of reusing the schema.

## Decision: Honeypot + time-trap anti-abuse, no CAPTCHA, no new infrastructure

**Decision**: The form includes a hidden honeypot field (real visitors never fill it; bots often
do) and a hidden form-render timestamp; the server function rejects submissions where the honeypot
is non-empty or the elapsed time since render is implausibly short (e.g., under ~2 seconds).

**Rationale**: Satisfies FR-007's "no disruptive challenge" requirement while catching the large
majority of naive automated submissions. Requires no new Cloudflare infrastructure (no KV namespace,
no Durable Object) — proportionate to a small business contact form, consistent with Principle V.

**Alternatives considered**: Cloudflare Turnstile — a real option if spam becomes an actual problem
post-launch, deliberately deferred rather than built speculatively. KV-backed per-IP rate limiting —
more robust but requires provisioning a KV namespace, a disproportionate infra addition for v1.

## Decision: Cal.com as a click-triggered modal embed, not an always-inline calendar

**Decision**: Use `@calcom/embed-react`'s modal API (`getCalApi().then(cal => cal("modal", {
calLink }))`), triggered by the existing "Agendar reunião" button, instead of an always-visible
inline `<Cal>` block.

**Rationale**: The spec's User Story 2 describes a visitor who "clicks 'Agendar reunião'" and then
"the scheduling flow opens" — a modal matches that click-to-open language while still satisfying
FR-006's "visitor MUST NOT be navigated away from the site" (the modal renders as an in-page
overlay, not a new tab). An always-inline calendar would permanently reserve vertical space in the
Contact section regardless of visitor intent, which nothing in the spec asked for (Principle V).

**Alternatives considered**: Always-inline `<Cal>` embed — heavier by default, not what the
acceptance scenario describes. Linking out to Cal.com in a new tab — explicitly rejected by the user
during spec clarification (FR-006, option A chosen over option B).

## Decision: No automated tests; manual validation only

**Decision**: Same posture as `002-responsive-validation` — no test framework is introduced.
`quickstart.md` documents a manual form-submission pass and a scripted request-level check of the
server function.

**Rationale**: The project has no test runner configured; introducing one is a disproportionate,
stack-changing decision for a single feature (would need a constitution amendment per the
Technology Stack section) and is out of scope here.

**Alternatives considered**: Adding `vitest` for this feature only — rejected as scope creep; if
automated testing is wanted project-wide, that is a separate, deliberate decision.
