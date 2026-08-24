# Phase 1 Data Model: Contact Form & Meeting Scheduling

No database or CMS is introduced by this feature (spec Assumptions). The one entity below is
transient: it exists only for the duration of a single request, from form submission to the Resend
API call, and is never written to any site-owned storage.

## Entity: Contact Submission

| Field        | Type              | Required     | Validation                                                                                                                                       |
| ------------ | ----------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `name`       | string            | Yes          | 2–100 characters, non-blank                                                                                                                      |
| `email`      | string            | Yes          | Well-formed e-mail address                                                                                                                       |
| `phone`      | string            | No           | If present, 8–20 characters (digits, spaces, `+`, `-`, `(`, `)`)                                                                                 |
| `company`    | string            | No           | If present, up to 100 characters                                                                                                                 |
| `message`    | string            | Yes          | 10–2000 characters, non-blank                                                                                                                    |
| `honeypot`   | string            | Yes (hidden) | MUST be empty; a non-empty value marks the submission as spam and it is silently rejected                                                        |
| `renderedAt` | number (epoch ms) | Yes (hidden) | Set when the form mounts; the server rejects submissions where `now - renderedAt` is implausibly small (anti-abuse time-trap, see `research.md`) |

**Lifecycle**: Visitor fills the form → client-side zod validation (via `react-hook-form` +
`@hookform/resolvers/zod`) → on submit, the payload is sent to the `sendContactEmail` server
function → the server function re-validates with the same schema, checks the honeypot/time-trap,
then calls Resend with the message content and the visitor's `email` set as the reply-to address →
the server function returns success or a typed error → the submission itself is discarded (not
persisted) after the Resend call completes.

**Relationships**: None — this entity has no relationship to any other data in the site (the site
has no other persisted entities; see `001-site-baseline`'s Assumptions).

**Scope note**: This schema lives in `src/lib/contact-schema.ts` as a single zod schema, reused by
both the client form and the server function (see `research.md`'s "Shared zod schema" decision) —
there is exactly one source of truth for these validation rules, not two copies.
