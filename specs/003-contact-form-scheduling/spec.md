# Feature Specification: Contact Form & Meeting Scheduling

**Feature Branch**: `003-contact-form-scheduling`

**Created**: 2026-08-23

**Status**: Draft

**Input**: User description: Replace the site's current `mailto:` contact action and the
"Agendar reunião" placeholder (both documented as gaps in `001-site-baseline`) with a real contact
form that delivers messages to the company without depending on the visitor's own e-mail client,
and a working meeting-scheduling flow.

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Send a message through the contact form (Priority: P1)

A prospective client fills in a short form on the Contact section and sends it, and the message
reaches the company — without needing the visitor's device to have an e-mail client configured.

**Why this priority**: Per `001-site-baseline`, contacting the company is the entire purpose of the
site. The current `mailto:` link silently fails to open anything for visitors without a configured
e-mail client (common on shared/work devices and some mobile setups), quietly losing leads.

**Independent Test**: Fill in and submit the form with valid data; confirm the company receives the
message and the visitor sees an on-page success confirmation.

**Acceptance Scenarios**:

1. **Given** a visitor on the Contact section, **When** they fill in the required fields and
   submit, **Then** they see an on-page confirmation that the message was sent, with no page
   reload or redirect required.
2. **Given** a valid submission, **When** it is sent, **Then** the company receives the message
   content and a way to reply directly to the visitor.
3. **Given** a visitor submits with a missing required field or a malformed e-mail address,
   **When** they submit, **Then** they see an inline validation message and nothing is sent.

---

### User Story 2 - Book a meeting directly (Priority: P2)

A visitor who would rather talk than write clicks "Agendar reunião" and reaches a real scheduling
flow showing the company's actual availability, instead of the current dead placeholder.

**Why this priority**: Supports the same underlying goal as User Story 1 (starting a project) via a
lower-friction path for visitors who prefer a call. Secondary because the contact form already
covers the core "reach out" job end to end.

**Independent Test**: Click "Agendar reunião", confirm a real scheduling interface opens with
actual available time slots, and complete a booking.

**Acceptance Scenarios**:

1. **Given** a visitor clicks "Agendar reunião", **When** the scheduling flow opens, **Then** they
   see real available times rather than a `#` placeholder.
2. **Given** a visitor selects a time and confirms, **When** the booking completes, **Then** both
   the visitor and the company receive a booking confirmation.

---

### User Story 3 - Reach the company even if the form fails (Priority: P3)

If the form's delivery mechanism has a problem, the visitor is never left with no way to contact
the company.

**Why this priority**: Resilience for the site's single most important job (per `001-site-baseline`,
P1); a hard dependency on one delivery mechanism would be a regression from today's baseline, which
at least always opens _something_ (even if unreliably).

**Independent Test**: Simulate a form submission failure and confirm the visitor is shown a
fallback way to reach the company.

**Acceptance Scenarios**:

1. **Given** the form submission fails, **When** the visitor sees the error, **Then** a fallback
   direct-contact option (a visible e-mail address) is also shown so they are not stuck.

---

### Edge Cases

- What happens if a visitor submits the form multiple times in quick succession? Repeated
  submissions must be prevented/throttled without requiring a disruptive challenge from the
  visitor.
- What happens if the message field is empty or only whitespace? Treated as a missing required
  field (Acceptance Scenario 3).
- What happens if the scheduling tool has no available slots in the near term? The visitor must
  still see a coherent, non-broken state (this is the scheduling tool's own responsibility, not
  something this feature builds from scratch).
- Both the form and the scheduling entry point must remain fully usable on mobile, consistent with
  the site's existing responsiveness baseline (`002-responsive-validation`) — this feature must not
  regress it.

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: The system MUST replace the current `mailto:` contact action with an on-page form
  (see FR-002 for the required fields).
- **FR-002**: The contact form MUST collect name, e-mail address, phone number, company name, and
  message, so the company has enough context to qualify the lead before replying. Name, e-mail, and
  message are required; phone number and company name are optional, to keep the form from becoming
  a conversion barrier while still offering the company more context when a visitor provides it.
- **FR-003**: The system MUST validate required fields and a well-formed e-mail address before
  allowing submission, showing inline errors for invalid input without losing what the visitor
  already typed.
- **FR-004**: On successful submission, the system MUST deliver the message content and the
  visitor's e-mail address to the company's existing contact address, through an automated channel
  that does not depend on the visitor's own e-mail client being configured.
- **FR-005**: The system MUST show the visitor a clear on-page confirmation when the message has
  been sent successfully, and a clear error state — including the fallback described in User Story
  3 — when it has not.
- **FR-006**: The system MUST replace the "Agendar reunião" placeholder with a scheduling flow
  embedded directly within the page — the visitor MUST NOT be navigated away from the site — showing
  real, currently available meeting times.
- **FR-007**: The system MUST prevent trivial abuse of the contact form (e.g., rapid repeated
  submissions) without requiring the visitor to solve a disruptive challenge such as a CAPTCHA.
- **FR-008**: Both the contact form and the scheduling entry point MUST remain fully usable on
  mobile viewports, consistent with the site's existing responsiveness baseline.

### Key Entities

- **Contact Submission**: A visitor's message — name, e-mail address, phone number, company name,
  message text, and submission timestamp. Transmitted to the company on submission; not retained in
  any site-owned storage beyond that (see Assumptions).

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: A visitor can complete and submit the contact form in under 60 seconds from reaching
  the Contact section.
- **SC-002**: 100% of successfully submitted messages reach the company, with no dependency on the
  visitor's own e-mail client or device configuration.
- **SC-003**: A visitor sees a clear success or error state within 5 seconds of submitting the
  form.
- **SC-004**: A visitor can view real, bookable meeting times and complete a booking without ever
  landing on a dead `#` placeholder.
- **SC-005**: Both the contact form and the scheduling flow are fully usable on mobile viewports,
  with no regression against the site's existing responsiveness baseline.

## Assumptions

- Messages are delivered to the company's existing address, `contato@schefferconsultoria.com.br`.
- No message database or CMS is introduced by this feature; submissions are transmitted, not
  persisted in site-owned storage — adding persistent storage would be a separate, larger decision
  (Constitution Principle V, Simplicity).
- Sending uses a transactional e-mail provider, and scheduling uses a third-party booking tool,
  both already selected by the user (Resend and Cal.com respectively) ahead of this spec; the
  specific integration approach is detailed in the implementation plan, not here.
- No automatic "we received your message" e-mail is sent back to the visitor; the on-page
  confirmation is the primary feedback for this version.
- Basic anti-spam measures (e.g., a honeypot field, simple submission throttling) are sufficient for
  this version; no visible CAPTCHA challenge is required.
- The project's domain is already owned but hosting is not yet finalized. DNS-dependent setup (e.g.
  verifying the sending domain with the e-mail provider) is external setup work, not something this
  spec's completion depends on.
