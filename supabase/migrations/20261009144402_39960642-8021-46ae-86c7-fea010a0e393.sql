ALTER TABLE public.conference_sponsorships
  ADD COLUMN IF NOT EXISTS payment_method text NOT NULL DEFAULT 'remita',
  ADD COLUMN IF NOT EXISTS receipt_path text,
  ADD COLUMN IF NOT EXISTS admin_note text;