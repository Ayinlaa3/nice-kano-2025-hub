DROP TRIGGER IF EXISTS trg_generate_conference_ticket_code ON public.conference_registrations;
CREATE TRIGGER trg_generate_conference_ticket_code
  BEFORE INSERT ON public.conference_registrations
  FOR EACH ROW EXECUTE FUNCTION public.generate_conference_ticket_code();