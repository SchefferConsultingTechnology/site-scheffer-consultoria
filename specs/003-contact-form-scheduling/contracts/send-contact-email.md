# Contract: `sendContactEmail` Server Function

The site has no traditional REST/GraphQL API; this is the one server-side entry point this feature
adds — a TanStack Start `createServerFn`, called directly from the client form component (framework
handles the RPC transport). Documented here in request/response terms for clarity.

## Input

Matches the `Contact Submission` entity in `data-model.md`:

```ts
{
  name: string;      // required, 2–100 chars
  email: string;      // required, well-formed e-mail
  phone?: string;      // optional, 8–20 chars if present
  company?: string;   // optional, up to 100 chars if present
  message: string;    // required, 10–2000 chars
  honeypot: string;   // required, MUST be "" on legitimate submissions
  renderedAt: number; // required, epoch ms when the form was rendered
}
```

The server function re-validates this payload against the same `src/lib/contact-schema.ts` schema
the client uses — it MUST NOT trust that client-side validation already ran.

## Behavior

1. If `honeypot` is non-empty, or `Date.now() - renderedAt` is below the anti-abuse threshold
   (research.md), the function returns a generic success-shaped response without calling Resend
   (spam is silently dropped, not surfaced to the sender as an error — avoids tipping off bots).
2. Otherwise, the function calls the Resend API, sending the message content to the company's
   address (`contato@schefferconsultoria.com.br`) with `replyTo` set to the visitor's `email`, so
   the company can reply directly from their inbox.
3. On a Resend API failure (network error, non-2xx response), the function returns a typed error
   result — it does not throw an unhandled exception (the existing `errorMiddleware` in
   `src/start.ts` is a last-resort catch-all, not the expected path for a known failure mode like
   this).

## Output

```ts
{ ok: true }
| { ok: false; error: "validation" | "delivery_failed" }
```

- `ok: true` — shown to the visitor as the on-page success confirmation (spec FR-004/US1 Scenario
  1). Also returned for silently-dropped spam (see Behavior, step 1) so bots get no useful signal.
- `ok: false, error: "validation"` — should not normally reach the server given client-side
  validation, but handled defensively; the client should not show a generic fallback for this case
  since the client's own zod validation should have already caught it.
- `ok: false, error: "delivery_failed"` — triggers the client's error state and fallback e-mail
  link (spec FR-005 / User Story 3).

## Non-goals

- No webhook/callback handling for delivery status beyond the initial API response.
- No retry queue — a failed send surfaces immediately as `delivery_failed`; the visitor's fallback
  is the visible e-mail link (User Story 3), not an automatic retry.
