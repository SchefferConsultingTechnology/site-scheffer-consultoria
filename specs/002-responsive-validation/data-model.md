# Phase 1 Data Model: Full Responsive Layout (Desktop & Mobile)

This feature introduces no domain/business entities and no persisted data — the homepage remains
static, hard-coded content (see `001-site-baseline`'s Assumptions). There is nothing to add to a
conventional data model.

The only piece of state this feature introduces is transient UI state, documented here for
completeness rather than as a "real" entity:

## UI State: Mobile Nav Menu

| Field    | Type      | Description                                                                  |
| -------- | --------- | ---------------------------------------------------------------------------- |
| `isOpen` | `boolean` | Whether the mobile navigation drawer is currently open. Defaults to `false`. |

**Lifecycle**:

- `false` → `true`: visitor taps the menu trigger button in the header (visible only below the
  `md` breakpoint).
- `true` → `false`: visitor taps a nav link inside the drawer (then the page also scrolls to that
  section), taps the close control, presses `Esc`, or clicks/taps outside the drawer.

**Scope**: Local to the header component in `src/routes/index.tsx`. Not persisted, not shared
across components, not reflected in the URL.
