CREATE OR REPLACE FUNCTION public.check_certificate_eligibility(_email text)
RETURNS TABLE(full_name text)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT r.full_name FROM public.conference_registrations r
  WHERE lower(trim(r.email)) = lower(trim(_email))
    AND r.payment_status IN ('verified','submitted','paid')
  ORDER BY r.created_at LIMIT 1
$$;
REVOKE ALL ON FUNCTION public.check_certificate_eligibility(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.check_certificate_eligibility(text) TO anon, authenticated;