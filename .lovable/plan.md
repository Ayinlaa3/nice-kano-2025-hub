## Why users land on `login.remita.net/remita/onepage/...`

Today `remita-initiate` generates the RRR correctly, then the Registration page auto-submits a form to `${baseUrl}/remita/ecomm/finalize.reg` with `merchantId/rrr/hash/responseurl`. When that redirect endpoint is not enabled for our merchant profile Remita falls back to its generic hosted "Pay Once" form, forcing the user to re-enter everything. The membership portal avoids this by using Remita's **inline widget** (`remita-pay-inline.bundle.js`) with `processRrr: true` and the pre-generated RRR — no redirect, no re-entry.

Sponsorships (`/sponsorships`) uses the same redirect pattern and has the same issue; fix it the same way.

## Scope of changes (frontend + one script tag only — keep RRR generation as-is)

The existing `remita-initiate` and `sponsorship-initiate` functions already return `rrr` and `fields.merchantId`. They stay untouched except for one cosmetic change (drop the unused `gatewayUrl` from the response). No new edge functions, no new secrets, no schema changes, no changes to `remita-verify` / `sponsorship-verify` / callback pages.

### 1. `index.html`
Add the Remita inline widget script in `<head>`:
```html
<script src="https://login.remita.net/payment/v1/remita-pay-inline.bundle.js"></script>
```

### 2. New helper `src/lib/remitaWidget.ts`
Small wrapper that:
- Declares `window.RmPaymentEngine` type.
- Exports `payWithRemita({ rrr, merchantId, orderId, onSuccess, onError, onClose })` which calls `RmPaymentEngine.init({ key: merchantId, processRrr: true, transactionId: orderId, extendedData: { customFields: [{ name: "rrr", value: rrr }] }, onSuccess, onError, onClose }).showPaymentWidget()`.
- Rejects if the script hasn't loaded yet with a clear error toast message.

### 3. `src/pages/Registration.tsx` (around line 235–250)
Replace the form-submit redirect with:
- Invoke `remita-initiate` as today → get `{ id, rrr, fields.merchantId }`.
- Call `payWithRemita({ rrr, merchantId: data.fields.merchantId, orderId: data.id, onSuccess/onClose: navigate to `/registration/remita-callback?reg=${id}`, onError: toast + stay on page })`.
- Remove the dynamic `<form>` creation and `form.submit()` block.

### 4. `src/pages/Sponsorships.tsx` (around line 110–120)
Same swap: after `sponsorship-initiate` returns `{ id, rrr, fields.merchantId }`, open the widget and route to `/sponsorships/callback?app=${id}` on success/close.

### 5. `supabase/functions/remita-initiate/index.ts` & `sponsorship-initiate/index.ts`
Cosmetic only: stop returning the now-unused `gatewayUrl` field. Do NOT touch the RRR generation, hash, headers, per-category service ID logic, or DB inserts — those are working.

## What is intentionally NOT changed
- Existing Remita secrets and per-category `REMITA_SERVICE_TYPE_ID_*` env vars.
- `remita-verify`, `sponsorship-verify`, `RemitaCallback.tsx`, `SponsorshipCallback.tsx`, `payment-status` — all continue to poll/verify by `id`/`rrr` exactly as today.
- `conference_registrations` / `conference_sponsorships` schema, RLS, ticket-code trigger, email flows.
- Fee schedule and category logic in `src/config/conference.ts` (already aligned; user asked not to modify what works).

## Verification after build
1. `curl` `remita-initiate` locally with a test payload → confirm `rrr` + `fields.merchantId` still returned.
2. Load `/registration`, submit test form → widget overlay appears on the site (no redirect to `login.remita.net/remita/onepage`).
3. Close widget → user stays on callback page which polls `remita-verify` and shows Pending until paid, matching current behaviour.
4. Repeat on `/sponsorships` "Apply" flow (both package and add-on dialogs).
