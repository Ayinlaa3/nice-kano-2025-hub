# Payment wording + confirmation email / QR ticket

## 1. Payment method wording (registration page)

Update the Remita payment card text to recommend bank transfer:

- Current: "Pay online now via card, bank or USSD — instant confirmation."
- New: "Pay online now via card, bank transfer or USSD — instant confirmation. We recommend paying by **transfer** on Remita for the smoothest experience."

Also add the same recommendation line to the Remita instructions block in the central config so it shows consistently wherever payment instructions appear.

## 2. Confirmation email and QR entry ticket — current state

Confirmed by reading the payment verification function:

- When Remita reports a successful payment, the registration flips to paid/confirmed and a confirmation email is sent once (guarded against duplicates).
- That email already contains a **personalised QR code** encoding the delegate's unique ticket code, plus the ticket code in text, category, days attending, venue and dates. The QR is the entry pass for check-in scanning.
- It does **not** currently read as a payment receipt: it omits the amount paid, the Remita RRR, the payment date and a receipt/invoice reference.
- Separate emails already exist for pending and failed payments.

### Known blocker (from the live function logs)

Email sending is currently failing with:
`The nicengineers.com domain is not verified` (Resend 403).

So the confirmation emails are being attempted but rejected — no delegate is receiving the ticket. This must be fixed for any of this to reach inboxes.

### Proposed work

1. Upgrade the success email into a proper **payment receipt + entry badge**: add amount paid (formatted in Naira), Remita RRR, payment date/time, receipt reference, and delegate name/email — keeping the QR badge block prominent.
2. Fix email delivery. Two options:
   - Verify `nicengineers.com` in the email provider (recommended — emails come from conference@nicengineers.com), or
   - Switch to Lovable's built-in email sending with a verified sending domain.
3. Re-verify end-to-end by re-running verification on the one confirmed registration and checking the function logs are clean.

## Technical notes

- Files touched: `src/pages/Registration.tsx`, `src/config/conference.ts`, `supabase/functions/remita-verify/index.ts` (success email template), and the matching sponsorship confirmation email for consistency.
- QR generation stays as-is (external QR image service keyed on the ticket code) so existing check-in scanning keeps working.
- No database schema changes needed; amount, RRR and verified_at are already stored on the registration row.
