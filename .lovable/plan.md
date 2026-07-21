# "THIS IS LAGOS!!!" Frontend Rebuild

Scope: UI/UX only. Backend, admin, payments, and Supabase wiring stay as-is and will be revisited next.

## 1. Design system overhaul (Eko Gold, dark-first)

Rewrite `src/index.css` + `tailwind.config.ts` design tokens:

- Base: `#0B0B0B` background, near-black elevated surfaces (`#141414`, `#1C1C1C`), off-white foreground.
- Brand: NICE green `#0A7B34` (primary), Lagos gold `#D4AF37` (accent), pure white for high-contrast type.
- Add gradients: `--gradient-eko` (green→gold), `--gradient-midnight` (black→deep-green), `--gradient-gold-shine`.
- Elegant shadows with warm gold glow for CTAs; subtle green rim for cards.
- Typography: keep "Old English" for the institution wordmark; upgrade display to a modern editorial serif/sans pair (Instrument Serif + Inter) for the Lagos edition to feel premium and distinct from Kano.
- Add a `ThemeProvider` (dark default) with a light-mode override; toggle lives in the header. Persist choice in `localStorage`.
- Sweep components for hardcoded `text-white / bg-black / #...` and replace with semantic tokens.

## 2. Central config

Update `src/config/conference.ts`:

- Tagline: `THIS IS LAGOS!!!`
- Venue: Academy Guest House & Events Halls, Agidingbi, Ikeja, Lagos.
- Dates: Oct 20–22, 2026 (already correct).
- Add: host-city stats (population, GDP, 30+ nations, 3,000+ delegates, 24th edition, 180+ years), sub-themes list, LOC placeholders.

## 3. Homepage (cinematic reimagining)

Replace `Hero.tsx` and `Index.tsx` sections:

1. **Hero** — full-bleed Lagos skyline carousel (Third Mainland Bridge, Eko Atlantic, Lekki-Ikoyi bridge, MMIA aerials, Lagos night skyline). Massive "THIS IS LAGOS!!!" display text with gold shimmer + `24th International Civil Engineering Conference & AGM`. Countdown, date pill, dual CTAs (Register / Sponsor).
2. **"The Road to Lagos" video section** — embed the uploaded jubilation MP4 (via Lovable Assets), autoplay muted with click-to-unmute.
3. **Animated stats ticker** — 3,000+ delegates · 30+ nations · 180+ yrs Lagos legacy · 25th Anniversary.
4. **Why Lagos** narrative band with paired imagery.
5. **Sub-themes grid** (7 sub-themes from masterplan) with icons.
6. **Programme teaser** (Day 1/2/3 cards) → link to Programme.
7. **Delegate experience strip** — Cultural Night, Annual Dinner, Spouses, Students, Tours.
8. **Sponsors carousel** (existing, restyled dark).
9. **Sticky "Register Now" CTA bar** on scroll.

## 4. Page-by-page tailoring

Preserve routes; rewrite content + visuals for Lagos:

- **About** — new Lagos-focused copy from masterplan Section 1–2, sub-themes, why-Lagos storytelling.
- **Programme** — placeholder day cards ("Programme currently being finalised — check back soon") with Cultural Night, AGM, Dinner, Tours slotted; keep structure for later fill-in.
- **Speakers** — "Speaker line-up coming soon" grid; keep architecture.
- **Location / Venue** — rewrite for Academy Guest House & Events Halls, Agidingbi, Ikeja; 600-car parking, 10 km from MMIA, 2 min from LASG Secretariat; embedded map; nearby amenities. Replace Kano City/Technical Tour blocks with **Lagos Tours** (Eko Atlantic, Lekki Deep Sea Port, Third Mainland Bridge, Lekki-Ikoyi Bridge, Nike Art, Freedom Park, Elegushi Beach).
- **Hotels & Travel** — Ikeja/Agidingbi hotel tiers with "Verified/Coming soon" badges; MMIA connectivity, transport, ride-hail guidance.
- **Registration** — same flow, only theme + copy + hero imagery updated (backend untouched).
- **Sponsorships** — tier framework from Section 13 (Platinum / Gold / Silver / Bronze) with amounts, exhibitor benefits, target partners list.
- **Innovation Challenge** — rebrand as "NICE Lagos 2026 Innovation Challenge"; update visuals + copy while keeping themes/prizes structure.
- **Certificate Generator** — swap template + copy for Lagos 2026 (UI only; template image placeholder for now).
- **Media Gallery** — rename to "Road to Lagos & Archive": pre-conference build-up section (jubilation video + teaser photos) + past editions archive.
- **FAQ** — Lagos-tailored questions (venue, transport from MMIA, security, weather in October, dress code, cultural night).
- **Contact** — Will be updated with the current Conference leadersship.

## 5. New pages (Lagos-specific)

Add under `/experience/*`:

- `/experience/cultural-night` — Section 9 (Afrobeats, drums, fashion, food, Afrika Shrine mention).
- `/experience/annual-dinner-agm` — Section 10.
- `/experience/spouses` — Section 11.
- `/experience/students` — Section 12.
- `/experience/tours` — curated Lagos landmark tours (Section 7 + 18).
- `/lagos-legacy` — Section 18 timeline of Lagos civil engineering landmarks (1841 first storey → 2022 Lekki Deep Sea Port).

Add navigation "Experience Lagos" group in header + footer.

## 6. Analytics dashboard (frontend shell)

New route `/admin/analytics` (protected by existing `RequireAdmin`). Frontend-only shell for now:

- KPI cards (visitors, registrations, page views, conversion).
- Charts (Recharts): traffic over time, top pages, referrers, device split, geo split.
- Populated with mock data + clearly-labelled "Sample data — live analytics wiring pending" banner. Real data source (Plausible / GA / Supabase logs) decided in the next backend phase.

## 7. Global polish

- Dark/light toggle in header (sun/moon icon).
- Smooth scroll, section reveal animations (framer-motion or existing tailwind keyframes).
- Sticky mobile "Register" bar.
- Updated `index.html` title/meta for Lagos 2026 + `og:*`.
- Favicon/logo lockup unchanged (NICE logo retained).

## 8. Assets

Upload via `lovable-assets (Please don't use lovable cloud, use the integrated supabase backend if required)`:

- Jubilation MP4 (user upload).
- 8–12 Lagos hero photos (generate premium images: Third Mainland Bridge at night, Eko Atlantic skyline, Lekki-Ikoyi cable bridge, MMIA, Lagos aerial, danfo street, Freedom Park, Elegushi Beach).
- Sub-theme icons (lucide).
- Sponsor placeholder logos re-themed for dark.

---

## Open items you may want to decide now

1. **Any real content ready** for LOC members, speaker photos, hotel list, sponsor logos? If not, I'll ship polished placeholders labelled clearly. Please use the list of hotels in Section 5 for now. I have many others I'll update later
2. **Preferred analytics provider** for later wiring: Plausible, Google Analytics 4, or Supabase-native page-view logging? (Not blocking — mock UI ships now.) I prefer the integrated supabase backend
3. **Keep old Kano hero/tour photos** anywhere as "past edition" reference, or fully retire them from the archive gallery? Use your discretion

I'll proceed with the plan as-is if you have no changes — otherwise tell me what to adjust.

## Out of scope for this pass

- No database changes.
- No edits to Supabase edge functions.
- No changes to payments/Remita flow.
- Real analytics ingestion — mock only.