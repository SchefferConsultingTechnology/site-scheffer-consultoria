# Quickstart: Validating Contact Form & Meeting Scheduling

## Prerequisites

- Dependencies installed, including the two new packages this feature adds: `resend` and
  `@calcom/embed-react`.
- A Resend account and API key. Until the project's sending domain is verified via DNS (per spec
  Assumptions — hosting isn't finalized yet), use Resend's sandbox sender
  (`onboarding@resend.dev`) as the `from` address so delivery can be tested end-to-end today;
  switch to a verified `@schefferconsultoria.com.br` sender once DNS is set up.
- A Cal.com account with a booking page (`calLink`) configured for the company.
- `.dev.vars` (gitignored) containing:
  ```
  RESEND_API_KEY=re_...
  ```

## Setup

```bash
npm install
npm run dev
```

Open the homepage and scroll to the Contact section.

## Contact form (User Story 1)

1. Submit with all required fields valid (name, e-mail, message) — confirm an on-page success
   confirmation appears with no page reload, and the message arrives in the configured inbox with
   `replyTo` set to the e-mail you entered (contracts/send-contact-email.md).
2. Submit again including the optional `phone` and `company` fields — confirm both appear in the
   received message.
3. Leave `name` or `message` empty, or enter a malformed e-mail — confirm inline validation errors
   appear and nothing is sent (spec Acceptance Scenario 3).
4. Time the full flow from landing on the Contact section to seeing the success confirmation —
   should be under 60 seconds for a simple message (SC-001) and the confirmation itself should
   appear within 5 seconds of submitting (SC-003).

## Anti-abuse (Edge Case)

1. Submit the form twice in rapid succession — confirm the second submission does not send a
   duplicate message to the inbox (or is otherwise throttled) without showing the visitor a
   confusing error.
2. If feasible, submit directly against the server function with the honeypot field filled in —
   confirm no message is delivered, and the response is still success-shaped (contracts, Behavior
   step 1) rather than surfacing an error.

## Failure fallback (User Story 3)

1. Temporarily point `RESEND_API_KEY` to an invalid value (or otherwise force a delivery failure)
   and submit the form — confirm the visitor sees a clear error state that also shows the fallback
   e-mail address, not just a dead end.
2. Restore the valid key afterward.

## Scheduling modal (User Story 2)

1. Click "Agendar reunião" — confirm a modal opens in-page (no new tab, no page navigation) showing
   real, currently available times from the connected Cal.com calendar (SC-004).
2. Complete a test booking — confirm both the visitor's and the company's Cal.com-configured
   confirmation emails are sent (this is Cal.com's own behavior, not custom code — see
   contracts/cal-embed.md).
3. Close the modal without booking — confirm the homepage is exactly as it was (scroll position,
   URL) with no residual overlay.

## Mobile (SC-005 / no regression of `002-responsive-validation`)

1. At a mobile width (e.g. 375px), repeat the contact form submission and the scheduling modal
   open/close — confirm both are fully usable: no clipped fields, the modal fits the viewport, and
   nothing regresses the breakpoint checklist already recorded in
   `specs/002-responsive-validation/quickstart.md`.

## Expected outcome

All the flows above behave as described, with no code changes required beyond what is tracked in
`tasks.md` for this feature.
