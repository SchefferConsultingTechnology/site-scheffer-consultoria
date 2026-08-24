# UI Contract: Cal.com Scheduling Modal

Not a network contract — this documents the behavioral contract the "Agendar reunião" trigger must
satisfy, since it is the one new interactive behavior FR-006 adds.

## Trigger

- The existing "Agendar reunião" button in the Contact CTA section (`src/routes/index.tsx`) is
  wired to open the Cal.com modal instead of its current `href="#"` placeholder.
- On click, calls `@calcom/embed-react`'s `getCalApi()` then `cal("modal", { calLink })`
  (`calLink` is the company's Cal.com booking page identifier, configured once, not hardcoded
  inline at every call site).

## Modal

- Renders as an in-page overlay (Cal.com's own modal chrome) — the visitor's URL and page state are
  unaffected; they are never navigated to a new tab or a different page (FR-006).
- Shows Cal.com's real, live availability for the connected calendar — this feature does not build
  or mirror any availability logic itself; Cal.com is the source of truth.
- Closing the modal (its own close control, or clicking outside it) returns the visitor to the
  homepage exactly as they left it — no page reload, no lost scroll position.
- A completed booking's confirmation (to both visitor and company) is handled entirely by Cal.com
  itself — this feature does not send its own separate confirmation e-mail for bookings (only for
  contact-form submissions, per `send-contact-email.md`).

## Non-goals

- No custom booking-slot UI — the modal's contents are entirely Cal.com's own embedded interface.
- No server-side involvement — this is a client-only integration (the embed script talks to Cal.com
  directly from the visitor's browser).
