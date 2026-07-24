ALTER TABLE public.conference_registrations
  ADD COLUMN IF NOT EXISTS pending_email_sent_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS failed_email_sent_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS success_email_sent_at TIMESTAMPTZ;