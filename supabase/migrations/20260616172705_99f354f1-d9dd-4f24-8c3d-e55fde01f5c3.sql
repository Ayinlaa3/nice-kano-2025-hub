CREATE TYPE public.conf_payment_method AS ENUM ('nice_portal_receipt', 'bank_transfer_receipt', 'remita');
CREATE TYPE public.conf_payment_status AS ENUM ('pending', 'submitted', 'verified', 'rejected', 'paid');

CREATE TABLE public.conference_registrations (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  address text,
  institution text,
  position text,
  chapter text,
  membership_status text,
  dietary text,
  comments text,
  category text NOT NULL,
  amount numeric NOT NULL DEFAULT 0,
  early_bird_applied boolean NOT NULL DEFAULT false,
  payment_method public.conf_payment_method NOT NULL,
  receipt_path text,
  remita_rrr text,
  remita_reference text,
  payment_status public.conf_payment_status NOT NULL DEFAULT 'pending',
  verified_by uuid,
  verified_at timestamp with time zone,
  admin_note text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT INSERT ON public.conference_registrations TO anon;
GRANT INSERT, SELECT, UPDATE, DELETE ON public.conference_registrations TO authenticated;
GRANT ALL ON public.conference_registrations TO service_role;

ALTER TABLE public.conference_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create a registration"
  ON public.conference_registrations FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view registrations"
  ON public.conference_registrations FOR SELECT
  TO authenticated
  USING (public.is_admin_role(auth.uid()));

CREATE POLICY "Admins can update registrations"
  ON public.conference_registrations FOR UPDATE
  TO authenticated
  USING (public.is_admin_role(auth.uid()))
  WITH CHECK (public.is_admin_role(auth.uid()));

CREATE POLICY "Admins can delete registrations"
  ON public.conference_registrations FOR DELETE
  TO authenticated
  USING (public.is_admin_role(auth.uid()));

CREATE TRIGGER update_conference_registrations_updated_at
  BEFORE UPDATE ON public.conference_registrations
  FOR EACH ROW EXECUTE FUNCTION public.update_payment_categories_updated_at();