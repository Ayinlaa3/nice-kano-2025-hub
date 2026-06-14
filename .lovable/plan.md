## NICE 2026 Conference Platform — Phase 1 (Frontend Upgrade)

Reuse the existing 2025 site as the base. Preserve UI, styling, navigation, components, and brand tokens. This round is **frontend only** — no Supabase tables, no live payments. Registration and payment screens are fully built UI with client-side pricing logic; data persistence, Remita, and admin verification are deferred to Phase 2 (clearly stubbed).

### Confirmed 2026 details
- **Theme:** "Civil Engineering: Sustainable and Resilient Infrastructure for Economic Growth"
- **Venue:** HiPoint Event Centre, Ikeja, Lagos
  (5 Impressive Close, Behind NECA House & Opposite LASPARK, Off L.J. Dosunmu Street, Central Business District, Alausa, Ikeja, Lagos)
- **Dates:** October 20–22, 2026

### 1. Global content & theme update (2026)
- Apply new theme tagline everywhere.
- Update conference identity from "23rd International Conference - KANO 2025" to the 2026 edition across `MainLayout` header/footer, `Hero`, `Index`, and SEO meta/JSON-LD.
- Update venue + dates in `Hero` (countdown `targetDate` → `2026-10-20`, date pill → "20–22 Oct 2026", venue → HiPoint Event Centre, Ikeja, Lagos).
- Update `Index.tsx` Event JSON-LD (name, startDate `2026-10-20`, endDate `2026-10-22`, Lagos location, theme description).

### 2. Navigation restructure
Update `MainLayout` nav groups to the spec's structure:
`Home · About Conference · Programme/Schedule · Speakers · Registration · Sponsors & Exhibitions · Hotels & Travel · Past Conferences · Contact`
- Add new routes in `App.tsx` (Registration, Past Conferences + year detail pages).
- Fold the existing Media Gallery into the Past Conferences > 2025 report gallery.

### 3. Registration page (new `/registration`)
- Replace all `REG_FORM` Google Form links (header, footer, `Hero`, CTAs) with the in-app page.
- **Physical attendance only** (no virtual option).
- Fields: Full Name, Email, Phone, Address, Institution/Organization, Position/Title, Chapter/Location, Membership Status, Registration Category, Payment Method, Comments/Questions, Dietary/Special Requirements, Consent checkbox.
- Validated with `zod` + react-hook-form (existing UI components).
- **Client-side pricing engine** keyed off category + today's date vs **August 15** cutoff:

```text
Category               Early Bird (<=Aug 15)   Regular (>Aug 15)
Fellow                 ₦70,000                 ₦80,000
Member                 ₦60,000                 ₦70,000
Associate              ₦55,000                 ₦65,000
Graduate               ₦35,000                 ₦40,000
Student                ₦15,000                 ₦20,000
Non-Member             ₦80,000                 ₦100,000
Spouse                 ₦30,000                 ₦40,000
International Delegate  $100 (≈₦130,000)        $100 (≈₦130,000)
```
- Live fee display that updates as the user selects a category.
- Payment method choice (Remita / Bank Transfer) shows the matching instructions panel.
- On submit (Phase 1): confirmation summary + payment instructions, with a clearly-marked note that booking persistence/payment processing activates in Phase 2. No data is saved yet.

### 4. Sponsors & Exhibitions
- Rename `Sponsorships` page/nav to "Sponsors & Exhibitions"; keep existing tiers/UI, refresh copy to 2026 theme.

### 5. Past Conferences module (new `/past-conferences` + detail routes)
- Archive landing grid: 2025–2018 cards.
- **2025 (Kano)** → full report page: Theme, Overview, Key speakers & dignitaries, Event highlights, Outcomes & impact, Sponsors, Gallery (reuse existing 2025 media/gallery content and the Kano dignitary list).
- **2024–2018** → structured placeholder pages ("Report coming soon") using a shared template so content drops in later.

### 6. Hotels & Travel enhancement
- Keep existing curated listings.
- Add a **Verified / Not Verified** label to each hotel (data flag + badge).
- Keep images, amenities, distance, pricing, booking guidance. Update distance/context to the HiPoint Event Centre, Ikeja venue.

### 7. About / Programme / Speakers
- About Conference: rewrite around 2026 theme; keep layout.
- Programme/Schedule: keep the tabbed day structure; reset to a provisional 2026 schedule (Oct 20–22) marked as draft.
- Speakers: convert to "To be announced" placeholder grid (2025 dignitaries move into the 2025 past-conference report).

### Technical notes
- Centralize 2026 config (theme, venue, dates, pricing table) in a single `src/config/conference.ts` so future years are a modular content swap — supporting the reusable annual-platform goal.
- All new pages follow existing patterns: `Helmet` SEO, brand CSS tokens (no hardcoded colors), shadcn components, mobile responsive.
- Single H1 per page, alt text, canonical tags, JSON-LD on Home.
- Remove the dead `import { time } from "console"` in `Program.tsx` while editing.

### Explicitly deferred to Phase 2 (not in this round)
- Supabase `registrations` table, receipt storage bucket, payment status tracking.
- Remita redirect + webhook callback.
- Admin payment-management interface (list/filter/approve/reject, receipt viewing).
- Persisting registration submissions.

### Out of scope / assumptions
- Finalized speaker list and 2024–2018 archive content are placeholders until provided.
- Existing design language is preserved — no rebrand beyond theme/content text and the new theme tagline.