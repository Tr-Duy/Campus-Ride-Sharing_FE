# Cung Duong ? merged frontend

The runnable frontend is this directory (`temp_fe`), using React, TypeScript and Vite. It merges the booking UI from `Campus-Ride-Sharing_BE/Frontend` with the existing auth forms in `temp_fe`.

## Run and verify

```sh
npm ci
npm run dev
npm run lint
npm run typecheck
npm run build
```

Copy `.env.example` to `.env` to configure `VITE_API_BASE_URL`. The default localhost URL and `/auth/*` routes remain placeholders requiring backend confirmation. Cookie requests use `withCredentials`; the backend must configure CORS and session cookies. No auth token is stored in browser storage.

## Structure

- `src/app`: shared router and lazy page imports.
- `src/pages`: complete booking, fares, policy and demo account pages.
- `src/components/common`: shared UI and account guard.
- `src/components/layout`: site and auth layouts, navigation and footer.
- `src/components/sections`: home page sections.
- `src/features/auth`: existing API forms, services, schemas and types.
- `src/features/booking`: booking steps, shared stepper and search hook.
- `src/services`: explicitly named demo booking service.
- `src/mocks`: booking fixtures, separate from API integrations.
- `src/hooks`, `src/types`, `src/utils`: reusable hooks, domain types and utilities.
- `Frontend.mdc`: copied project rules.

## Routes and behavior

`/` is the home page. `/login`, `/register` and `/forgot-password` retain the existing auth forms. `/fares` and `/policies` are public. Booking and trip routes require an in-memory demo account. From `/login`, select the demo account link and then the quick demo login button. The requested booking path is preserved in the redirect. Refreshing clears the demo account and booking selection.

`/verify-account` and `/reset-password` retain the original mock screens. These do not change real credentials. The API login form only reports the existing server response; it does not establish a booking session because the backend user/session response contract has not been supplied. All booking/payment flows use the demo service, so no real booking is sent.

## Remaining release work

The original source directory and both Git histories are preserved. No backend files deleted before this task were restored or moved. The source folder currently contains a frontend, rules and a ZIP; no live backend code was present.

The merge follows the architecture requirements of `Frontend.mdc`; it is not a production compliance claim. Before release, confirm API contracts, real pricing/availability/payment flows, session restoration/logout, Vietnamese journey timezone handling, operator/legal content, legal page URLs and update dates. Existing remote sample images and contact data need approved replacements. The app is marked demo and noindex. Hosting must serve the SPA for valid direct routes and return actual HTTP 404 for unknown URLs; Vite's development fallback is not a production 404 configuration. SSR/prerender, canonical URLs, sitemap and field performance measurements remain deployment work.

## Verification

Lint, TypeScript and production build were run. Browser checks cover public routes, desktop/mobile horizontal overflow, one H1 per public page, redirect to login, return to a protected route after demo login, trip navigation, and a complete demo booking through payment result.
