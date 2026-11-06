# StarPay Payment Gateway — Responsive Frontend

StarPay is a payment gateway designed to simplify how businesses handle payments. We bring together multiple payment methods, real-time analytics, and powerful tools into one unified platform, So merchants can focus on running and growing their business.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.
Sign in through the demo login flow. Successful login opens `/portal`.

Requirements: Node.js 20.9+ and npm.

## The five independent post-login pages

| Figma screen | URL | Page file |
| --- | --- | --- |
| 1. Welcome / Super Admin portal | `/portal` | `app/portal/page.tsx` |
| 2. Dashboard / Statistical overview | `/dashboard` | `app/dashboard/page.tsx` |
| 3. Transaction list | `/transactions` | `app/transactions/page.tsx` |
| 4. Transaction details | `[id]` | `app/transaction/[id]/page.tsx & transaction-details.module.css` |
| 5. Merchant management | `/merchants` | `app/merchants/page.tsx` |

## Responsive layout

- The portal header and all page content use a consistent centered frame and aligned gutters.
- Dashboard KPI cards and analytics panels reflow at desktop, tablet, and mobile breakpoints.
- Transaction and merchant tables scroll inside their own table region rather than stretching the page horizontally. A scroll hint is shown on smaller screens.
- The transaction detail fields, product rows, summary panel, and action buttons reflow for smaller screens.
- Portal cards and merchant summary cards stack on mobile.

## Other authentication routes

| Screen | URL |
| --- | --- |
| Login – phone number | `/login` |
| Login – password | `/login/password` |
| First-time onboarding – phone | `/onboarding` |
| First-time onboarding – verification | `/onboarding/verify` |
| First-time onboarding – create password | `/onboarding/create-password` |
| Forgot password – phone | `/forgot-password` |
| Forgot password – verification | `/forgot-password/verify` |
| Forgot password – reset password | `/forgot-password/reset-password` |
| Completion | `/success` |

The root route (`/`) redirects to `/login`.

## Project structure

```text
app/
  dashboard/page.tsx
  login/page.tsx
  login/password/page.tsx
  merchants/page.tsx
  onboarding/page.tsx
  onboarding/verify/page.tsx
  onboarding/create-password/page.tsx
  portal/page.tsx
  transactions/page.tsx
  transactions/[id]/page.tsx & transaction-details.module.css
  globals.css
  layout.tsx
  page.tsx
components/
  admin-shell.tsx
  auth-shell.tsx
  form-heading.tsx
  otp-entry-form.tsx
  password-entry-form.tsx
  phone-entry-form.tsx
lib/
  session.ts
public/
  logo-color.png
  logo-white.png
```

## NB

This is a frontend prototype. It does not send or verify real SMS codes, authenticate users against a server, or securely persist passwords. Dashboard figures and transaction/merchant records are demonstration data. Merchant creation, client-side search/filtering, CSV export, and receipt printing work locally in the browser but are not connected to a backend API.
