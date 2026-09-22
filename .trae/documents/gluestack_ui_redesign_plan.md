# Plan: Refactor PAF-IAST Library UI to Gluestack-Pattern System

## Workflow (user-approved)

**Front-end first → show → user approves → next page.** Backend mapping happens only after each front-end surface is approved.

Cycle per surface:
1. Implement the front-end only (no backend changes, no new deps).
2. Show the result.
3. User approves or requests adjustments.
4. Map backend implications (if any) — only then.

If any single surface is rejected, we iterate on that surface alone before moving on.

---

## Summary

Restructure the existing Vite + React 19 + Tailwind v4 + Radix UI frontend into a Gluestack-style design system **without adding new dependencies**. Borrowed from Gluestack v5: (1) compound components (`Button.ButtonText`, `Card.Header`, etc.), (2) semantic shadcn-style tokens (`background`, `foreground`, `primary`, `card`, `border`, `muted`, `destructive`), (3) Tailwind v4 `@theme inline` design tokens, (4) SaaS surface composition — context row → current state → main working area → supporting panels.

Approach: **Gluestack-pattern refactor** (user-confirmed). No `npx gluestack-ui init`, no NativeWind, no extra packages.

> **Note on the docs we sourced.** The Gluestack documentation mostly targets two audiences: (a) people installing Gluestack via the CLI (`npx gluestack-ui@latest init` / `add`), or (b) people migrating an existing Gluestack v2/v3/v4 install up to v5. Neither applies to this stack. What we're taking from the docs is the **output shape**: semantic tokens (`bg-background`, `text-muted-foreground`), compound sub-components (`<Button><ButtonText>`), the four-axis Button model (`action × variant × size × isDisabled`), and Tailwind v4 `@theme inline` token files. Those patterns are stack-agnostic and survive without the CLI.

---

## Current State Analysis (already mapped)

### Stack
- Vite 7, React 19, TS 5.9, Tailwind v4 (`@tailwindcss/postcss`).
- Radix already wrapped: Dialog, Tabs, Select, Label, Popover, Dropdown.
- Forms: `react-hook-form` + `zod` + `@tanstack/react-query`; toasts: `react-hot-toast`.
- Colors: bespoke numeric `primary`/`secondary` 50–300 + 5 status colors. No semantic naming.

### Key files reviewed
- UI primitives: [Button.tsx](file:///e:/usman%20logexai/projects/Liabary_management%20--%20done/PAF-IAST_liabary%20--%20v3%20done/frontend/src/components/ui/Button.tsx), [Card.tsx](file:///e:/usman%20logexai/projects/Liabary_management%20--%20done/PAF-IAST_liabary%20--%20v3%20done/frontend/src/components/ui/Card.tsx), [Dialog.tsx](file:///e:/usman%20logexai/projects/Liabary_management%20--%20done/PAF-IAST_liabary%20--%20v3%20done/frontend/src/components/ui/Dialog.tsx), [Input.tsx](file:///e:/usman%20logexai/projects/Liabary_management%20--%20done/PAF-IAST_liabary%20--%20v3%20done/frontend/src/components/ui/Input.tsx), [Label.tsx](file:///e:/usman%20logexai/projects/Liabary_management%20--%20done/PAF-IAST_liabary%20--%20v3%20done/frontend/src/components/ui/Label.tsx), [Select.tsx](file:///e:/usman%20logexai/projects/Liabary_management%20--%20done/PAF-IAST_liabary%20--%20v3%20done/frontend/src/components/ui/Select.tsx), [Tabs.tsx](file:///e:/usman%20logexai/projects/Liabary_management%20--%20done/PAF-IAST_liabary%20--%20v3%20done/frontend/src/components/ui/Tabs.tsx)
- Pages: [LoginPage.tsx](file:///e:/usman%20logexai/projects/Liabary_management%20--%20done/PAF-IAST_liabary%20--%20v3%20done/frontend/src/pages/LoginPage.tsx), [RegisterPage.tsx](file:///e:/usman%20logexai/projects/Liabary_management%20--%20done/PAF-IAST_liabary%20--%20v3%20done/frontend/src/pages/RegisterPage.tsx), [StudentDashboard.tsx](file:///e:/usman%20logexai/projects/Liabary_management%20--%20done/PAF-IAST_liabary%20--%20v3%20done/frontend/src/pages/StudentDashboard.tsx), [AdminDashboard.tsx](file:///e:/usman%20logexai/projects/Liabary_management%20--%20done/PAF-IAST_liabary%20--%20v3%20done/frontend/src/pages/AdminDashboard.tsx), [UnauthorizedPage.tsx](file:///e:/usman%20logexai/projects/Liabary_management%20--%20done/PAF-IAST_liabary%20--%20v3%20done/frontend/src/pages/UnauthorizedPage.tsx)
- Composite: [Calendar.tsx](file:///e:/usman%20logexai/projects/Liabary_management%20--%20done/PAF-IAST_liabary%20--%20v3%20done/frontend/src/components/Calendar.tsx), [TimeSlotGrid.tsx](file:///e:/usman%20logexai/projects/Liabary_management%20--%20done/PAF-IAST_liabary%20--%20v3%20done/frontend/src/components/TimeSlotGrid.tsx), [BookingModal.tsx](file:///e:/usman%20logexai/projects/Liabary_management%20--%20done/PAF-IAST_liabary%20--%20v3%20done/frontend/src/components/BookingModal.tsx), [StudentForm.tsx](file:///e:/usman%20logexai/projects/Liabary_management%20--%20done/PAF-IAST_liabary%20--%20v3%20done/frontend/src/components/StudentForm.tsx), [SuccessDialog.tsx](file:///e:/usman%20logexai/projects/Liabary_management%20--%20done/PAF-IAST_liabary%20--%20v3%20done/frontend/src/components/SuccessDialog.tsx), [Skeleton.tsx](file:///e:/usman%20logexai/projects/Liabary_management%20--%20done/PAF-IAST_liabary%20--%20v3%20done/frontend/src/components/Skeleton.tsx)
- Tokens: [index.css](file:///e:/usman%20logexai/projects/Liabary_management%20--%20done/PAF-IAST_liabary%20--%20v3%20done/frontend/src/index.css), [tailwind.config.js](file:///e:/usman%20logexai/projects/Liabary_management%20--%20done/PAF-IAST_liabary%20--%20v3%20done/frontend/tailwind.config.js), [App.tsx](file:///e:/usman%20logexai/projects/Liabary_management%20--%20done/PAF-IAST_liabary%20--%20v3%20done/frontend/src/App.tsx)

### Pain points vs Gluestack
- Most UI is single-element; no slot/compound pattern.
- Numeric color scales; no `background`/`card`/`muted`.
- Tokens duplicated between `tailwind.config.js` and `index.css`.
- No status pill, avatar, empty-state, or alert primitives.

---

## Proposed Front-End Surfaces (delivery order — one at a time)

Each surface is delivered, shown, then user approves before the next begins.

### Surface 1 — Design token foundation (PILOT, no visible UI yet)

**Goal:** Lay the semantic token layer every later surface sits on. Behavior unchanged.

Files:
- [index.css](file:///e:/usman%20logexai/projects/Liabary_management%20--%20done/PAF-IAST_liabary%20--%20v3%20done/frontend/src/index.css) — replace `@theme` block with shadcn-style semantic tokens (RGB triplets so Tailwind opacity works), update `body` to `bg-background text-foreground`, convert legacy `.slot-*` rules to semantic tokens.
- [tailwind.config.js](file:///e:/usman%20logexai/projects/Liabary_management%20--%20done/PAF-IAST_liabary%20--%20v3%20done/frontend/tailwind.config.js) — remove numeric `primary`/`secondary`/`status` blocks; add `borderRadius` map (`--radius-sm/md/lg`).

**Less-edit guarantee:** no JSX touched; all existing Tailwind classes continue to compile because numeric colors are kept as **aliases** for one release. New classes (`bg-card`, `text-muted-foreground`, etc.) added in parallel.

Verification: `npx tsc -b --noEmit`, `npm run lint`, `npm run build`. Run dev, eyeball LoginPage — should look identical to today.

**→ Show, then user approves before Surface 2.**

### Surface 2 — Login page (first visible proof)

**Goal:** Demonstrate Gluestack-pattern on a real, narrow surface.

Files:
- [LoginPage.tsx](file:///e:/usman%20logexai/projects/Liabary_management%20--%20done/PAF-IAST_liabary%20--%20v3%20done/frontend/src/pages/LoginPage.tsx) — split-screen blueprint: branded left panel + form right panel.
- Add minimal **inline** styling only; no new components yet (to keep this surface small).

Layout:
```
┌────────────────────────┬─────────────────────────┐
│  Brand panel            │  Card variant="outline"  │
│  Logo · mission · trust │  Header / Body / Footer  │
│                         │  Inputs · submit · help  │
└────────────────────────┴─────────────────────────┘
```

Form logic (`react-hook-form` + zod) untouched. Error path uses semantic `text-destructive` with icon.

Verification: dev smoke — login flow, error path, success navigation.

**→ Show, then user approves before Surface 3.**

### Surface 3 — Core 7 UI primitives + 4 new primitives (compound API)

Now that the user has seen the pattern work on Login, do the full system in one pass.

Files (existing — backward-compat exports preserved as thin shims):
- [Button.tsx](file:///e:/usman%20logexai/projects/Liabary_management%20--%20done/PAF-IAST_liabary%20--%20v3%20done/frontend/src/components/ui/Button.tsx) — compound anatomy `Button.ButtonText`, `Button.ButtonSpinner`, `Button.ButtonIcon`. Four-axis prop model per Gluestack v5 docs: `action` (primary | secondary | positive | negative | muted), `variant` (solid | outline | ghost | link), `size` (xs | sm | md | lg | xl), `isDisabled`. Old `variant="primary"` shape preserved as a shim → maps to `action="primary" variant="solid"`.
- [Card.tsx](file:///e:/usman%20logexai/projects/Liabary_management%20--%20done/PAF-IAST_liabary%20--%20v3%20done/frontend/src/components/ui/Card.tsx) — compound anatomy `Card.Header / Card.Title / Card.Description / Card.Body / Card.Footer`. Old flat `CardHeader / CardTitle / ...` exports become aliases (thin wrappers over the new sub-components).
- [Dialog.tsx](file:///e:/usman%20logexai/projects/Liabary_management%20--%20done/PAF-IAST_liabary%20--%20v3%20done/frontend/src/components/ui/Dialog.tsx) — semantic tokens throughout. `Dialog.Title / Dialog.Description / Dialog.Footer` sub-components.
- [Input.tsx](file:///e:/usman%20logexai/projects/Liabary_management%20--%20done/PAF-IAST_liabary%20--%20v3%20done/frontend/src/components/ui/Input.tsx) — compound anatomy `Input.Field / Input.Label / Input.HelperText / Input.ErrorMessage / Input.Slot / Input.Icon`. Old default export preserved.
- [Label.tsx](file:///e:/usman%20logexai/projects/Liabary_management%20--%20done/PAF-IAST_liabary%20--%20v3%20done/frontend/src/components/ui/Label.tsx), [Select.tsx](file:///e:/usman%20logexai/projects/Liabary_management%20--%20done/PAF-IAST_liabary%20--%20v3%20done/frontend/src/components/ui/Select.tsx), [Tabs.tsx](file:///e:/usman%20logexai/projects/Liabary_management%20--%20done/PAF-IAST_liabary%20--%20v3%20done/frontend/src/components/ui/Tabs.tsx) — semantic tokens + Gluestack sub-names (`Select.Trigger`, `Select.Content`, `Select.Item`, `Tabs.Tab`).

Files (new):
- [Badge.tsx](file:///e:/usman%20logexai/projects/Liabary_management%20--%20done/PAF-IAST_liabary%20--%20v3%20done/frontend/src/components/ui/Badge.tsx) — status pills for room status / queue count.
- [Avatar.tsx](file:///e:/usman%20logexai/projects/Liabary_management%20--%20done/PAF-IAST_liabary%20--%20v3%20done/frontend/src/components/ui/Avatar.tsx) — identity chip in headers.
- [Alert.tsx](file:///e:/usman%20logexai/projects/Liabary_management%20--%20done/PAF-IAST_liabary%20--%20v3%20done/frontend/src/components/ui/Alert.tsx) — inline contextual feedback (error/info/success/warning).
- [EmptyState.tsx](file:///e:/usman%20logexai/projects/Liabary_management%20--%20done/PAF-IAST_liabary%20--%20v3%20done/frontend/src/components/ui/EmptyState.tsx) — empty/loading surfaces with icon + title + description + optional CTA.
- `components/ui/index.ts` — barrel re-export.

**Less-edit guarantee:** every existing call site keeps compiling because the old flat exports (`CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`, the default `<Input>` with `label` prop) remain as **thin aliases** that delegate to the new compound sub-components. The compound form (`<Card.Header>` etc.) is canonical; the aliases exist purely so we don't have to touch call sites in this pass. They'll be removed in a later cleanup if the user wants.

Verification: type check, lint, build. All current pages render unchanged.

**→ Show, then user approves before Surface 4.**

### Surface 4 — StudentDashboard blueprint

**Goal:** Apply SaaS workspace composition to the most-used page.

File: [StudentDashboard.tsx](file:///e:/usman%20logexai/projects/Liabary_management%20--%20done/PAF-IAST_liabary%20--%20v3%20done/frontend/src/pages/StudentDashboard.tsx)

Layout (per SaaS blueprint):
```
┌──────────────────────────────────────────────────────────┐
│  AppHeader: brand + Avatar + identity chip + logout      │  ← context row
├──────────────────────────────────────────────────────────┤
│  PageIntro: "Book a Study Room" + date subtitle           │  ← current state
│  StatStrip: 3-4 KPIs (computed client-side from rooms)    │
├────────────────────────────┬─────────────────────────────┤
│  DatePicker (Calendar)     │  RoomGrid (TimeSlotGrid)    │  ← main + side
│                            │  using Badge per slot        │
└────────────────────────────┴─────────────────────────────┘
```

Composite updates:
- [Calendar.tsx](file:///e:/usman%20logexai/projects/Liabary_management%20--%20done/PAF-IAST_liabary%20--%20v3%20done/frontend/src/components/Calendar.tsx) — semantic token classes only; no logic change.
- [TimeSlotGrid.tsx](file:///e:/usman%20logexai/projects/Liabary_management%20--%20done/PAF-IAST_liabary%20--%20v3%20done/frontend/src/components/TimeSlotGrid.tsx) — replace `.slot-*` color lookups with `<Badge>`; logic untouched.
- [BookingModal.tsx](file:///e:/usman%20logexai/projects/Liabary_management%20--%20done/PAF-IAST_liabary%20--%20v3%20done/frontend/src/components/BookingModal.tsx) — Dialog compound anatomy, Alert on errors.
- [Skeleton.tsx](file:///e:/usman%20logexai/projects/Liabary_management%20--%20done/PAF-IAST_liabary%20--%20v3%20done/frontend/src/components/Skeleton.tsx) — `bg-muted animate-pulse`.
- Empty/loading paths use `<EmptyState>`.

**Backend mapping: NONE** — all data already present in `roomsData`; KPI counts computed client-side.

Verification: dev smoke — header, calendar grid, time-slot grid with badges, EmptyState when no date picked, booking modal opens.

**→ Show, then user approves before Surface 5.**

### Surface 5 — AdminDashboard blueprint

**Goal:** Apply SaaS workspace composition to admin.

File: [AdminDashboard.tsx](file:///e:/usman%20logexai/projects/Liabary_management%20--%20done/PAF-IAST_liabary%20--%20v3%20done/frontend/src/pages/AdminDashboard.tsx)

Layout:
```
┌──────────────────────────────────────────────────────────┐
│  AppHeader: brand + admin identity + read-only toggle    │
├──────────────────────────────────────────────────────────┤
│  PageIntro: "Operations" + active date subtitle          │
│  StatStrip: 4 KPIs (pending approvals / queue depth /    │
│              approved today / rejected today)            │
├──────────┬──────────────────┬───────────────────────────┤
│ Calendar │  Room1 tab       │  Room2 tab                │
│          │  (TimeSlotGrid)  │  (TimeSlotGrid)           │
└──────────┴──────────────────┴───────────────────────────┘
```

Updates:
- Tabs use `variant="pills"`.
- Queue modal becomes right-aligned sheet via `Dialog` (still Dialog under the hood — no extra dependency).
- Approve/Reject actions in a `Card.Footer` with primary/secondary buttons.
- Empty/loading paths use `<EmptyState>`.

Composite updates:
- [StudentForm.tsx](file:///e:/usman%20logexai/projects/Liabary_management%20--%20done/PAF-IAST_liabary%20--%20v3%20done/frontend/src/components/StudentForm.tsx) — Card variant=outline rows.
- [SuccessDialog.tsx](file:///e:/usman%20logexai/projects/Liabary_management%20--%20done/PAF-IAST_liabary%20--%20v3%20done/frontend/src/components/SuccessDialog.tsx) — icon header + Alert.

**Backend mapping: NONE for this surface** — all admin mutations (`approveBooking`, `rejectBooking`) already exist.

Verification: dev smoke — header, tabs, both room grids, queue modal opens with compound anatomy, approve/reject works.

**→ Show, then user approves before Surface 6.**

### Surface 6 — RegisterPage + UnauthorizedPage polish

**Goal:** Final consistency pass on remaining public surfaces.

Files:
- [RegisterPage.tsx](file:///e:/usman%20logexai/projects/Liabary_management%20--%20done/PAF-IAST_liabary%20--%20v3%20done/frontend/src/pages/RegisterPage.tsx) — same split-screen as LoginPage. Route stays commented out in [App.tsx](file:///e:/usman%20logexai/projects/Liabary_management%20--%20done/PAF-IAST_liabary%20--%20v3%20done/frontend/src/App.tsx) lines 8 & 57.
- [UnauthorizedPage.tsx](file:///e:/usman%20logexai/projects/Liabary_management%20--%20done/PAF-IAST_liabary%20--%20v3%20done/frontend/src/pages/UnauthorizedPage.tsx) — Alert + Card.

**Backend mapping: NONE.**

Verification: full app smoke.

**→ Show, then user approves the system as complete.**

---

## Backend Mapping Pass (post-approval only)

Only after each front-end surface is approved do we evaluate whether the change exposes any **new** backend contract. Expected outcome: **zero new endpoints**, because every change is presentation-only and existing data already covers StatStrip KPIs.

If during review we discover something the front-end needs that isn't there, we'll propose the smallest possible backend delta (new field on existing response, or one new aggregation endpoint) and get explicit approval before implementing.

---

## Assumptions & Decisions

1. **No new dependencies.** Radix stays; no NativeWind, no gluestack-ui CLI.
2. **Backward compatibility for callers.** Every existing call site keeps compiling through every phase. New compound API is additive.
3. **One surface per approval.** Rejection of any surface triggers iteration on that surface only.
4. **Dark mode out of scope.** Token system is dark-mode-ready via future `dark:` overrides, but no light/dark toggle work in this pass.
5. **Density:** balanced for student, compact for admin — per SaaS skill defaults.
6. **Surface 1 has zero visible UI change.** It's a token-only refactor with old colors aliased.

---

## Verification (per surface)

1. `cd frontend && npx tsc -b --noEmit` — zero errors.
2. `npm run lint` — clean.
3. `npm run build` — succeeds.
4. Dev smoke: walk the surface, capture any console warning, confirm existing flows (login / book / approve / reject) still work end-to-end.
5. Visual diff against the SaaS skill's `app-surface-patterns.md` and `page-blueprints.md` references.
6. Accessibility — no regression in keyboard navigation; existing `aria-*` preserved.

---

## Open Questions

None blocking. If during Surface 4 or 5 we find that a KPI calculation requires data not in `roomsData` (e.g. server-side "approved today" count), we'll surface the question before inventing a workaround.
