-- 1. Restrict chapter bank account visibility to authenticated users only
DROP POLICY IF EXISTS "public_read_active_chapter_bank_accounts" ON public.chapter_bank_accounts;

CREATE POLICY "authenticated_read_active_chapter_bank_accounts"
ON public.chapter_bank_accounts
FOR SELECT
TO authenticated
USING (is_active = true);

-- 2. Replace the always-true public INSERT rule on conference_registrations with validation
DROP POLICY IF EXISTS "Anyone can create a registration" ON public.conference_registrations;

CREATE POLICY "Anyone can create a registration"
ON public.conference_registrations
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(full_name) >= 2 AND length(full_name) <= 200
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND length(phone) >= 6 AND length(phone) <= 30
  AND length(category) >= 1 AND length(category) <= 60
  AND amount >= 0
);
