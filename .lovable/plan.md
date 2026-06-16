# Conference Registration & Payments (public registration)

Build the full registration → payment → verification pipeline. **Delegates register without signing in.** Only admins log in (to verify receipts), using the existing NICE admin roles.

## Three payment options on the form
1. **NICE portal receipt** — delegate already paid via the NICE member portal; uploads the receipt. Admin verifies.
2. **Bank transfer receipt** — delegate transferred to the NICE bank account; uploads the receipt. Admin verifies.
3. **Remita** — full live payment: generate an RRR, send the delegate to Remita checkout, confirm on return.

Per your choices: **no delegate login**, a **new admin page in this app**, **full live Remita**, and a **dedicated table**.

## Steps

### 1. Database — dedicated table (migration)
Create `public.conference_registrations`:
- delegate fields: `full_name`, `email`, `phone`, `address`, `institution`, `position`, `chapter`, `membership_status`, `dietary`, `comments`
- registration: `category`, `amount`, `early_bird_applied`
- payment: `payment_method` (`nice_portal_receipt` | `bank_transfer_receipt` | `remita`), `receipt_path`, `remita_rrr`, `remita_reference`
- status: `payment_status` (`pending` | `submitted` | `verified` | `rejected` | `paid`), `verified_by`, `verified_at`, `admin_note`
- standard `id`, `created_at`, `updated_at` (+ update trigger)

RLS + GRANTs (no `user_id`, since registration is anonymous):
- `anon` + `authenticated`: **INSERT** allowed (anyone can register).
- Reads/updates: **admins only**, via existing `public.is_admin_role(auth.uid())`.
- This means a registration confirmation reference is shown to the delegate at submit time, but there's no delegate self-service lookup (no login). The Remita return flow is handled by an edge function using the RRR.

### 2. Storage
- Create a private `conference-receipts` bucket.
- RLS on `storage.objects`: `anon`/`authenticated` can **upload** (insert) into this bucket; only admins can **read**. Admin views use short-lived signed URLs.

### 3. Admin authentication (admins only)
- Add an `/admin/login` page (email + password) using the existing Supabase client and existing NICE accounts/roles.
- Add a lightweight `AuthProvider` + `useAuth` + `RequireAdmin` guard (checks `is_admin_role` via an RPC/role query). Guard only wraps the admin route — the public site stays untouched.

### 4. Registration form changes (public)
- Keep the form open to everyone (no login gate).
- Replace the 2-option payment radio with the **three** options above.
- Receipt options: show relevant instructions + a **file upload** (PDF/JPG/PNG), upload to `conference-receipts`, insert a row with status `submitted`, then show a confirmation with a reference number.
- Remita option: insert a `pending` row, call the Remita edge function, redirect to checkout.
- Confirmation screen reflects the saved registration + next steps.

### 5. Remita (live) — edge functions
- `remita-initiate`: generates the RRR via Remita's API using existing secrets (`REMITA_MERCHANT_ID`, `REMITA_API_KEY`, `REMITA_SERVICE_TYPE_ID`, `REMITA_BASE_URL`), computes the required SHA-512 hash, saves `remita_rrr` on the registration, returns the checkout URL.
- `remita-verify`: on return from Remita, checks transaction status and marks the registration `paid` when successful.
- Route `/registration/remita-callback` handles the return and calls verify.
- These functions use the service role internally to read/update rows (table writes are otherwise admin-only), so the anonymous Remita flow still completes securely.

### 6. Admin verification page
- Route `/admin/registrations`, gated by `RequireAdmin`.
- Table of registrations with filters (status, payment method), delegate details, amount, and a **View receipt** link (signed URL).
- Approve / reject actions that set `payment_status`, `verified_by`, `verified_at`, and an optional note.

## Technical notes
- Reuses existing roles (`is_admin_role`), and Remita secrets — nothing new to configure from you.
- Bank/transfer account details surfaced on the instructions panel (from the existing `NICE_*` bank secrets via a small edge function, or static text).
- Remita hashing/status calls and privileged table writes live only in edge functions; the browser only ever uses the anon key.

## Out of scope (unless you want it)
- Delegate self-service status lookup (would need login or an emailed magic link).
- Email confirmations (Resend is configured if you later want this).
- Fee table edits — pricing stays as configured.
