
DROP POLICY "Anyone can join waitlist with valid email" ON public.waitlist;
CREATE POLICY "Anyone can join waitlist with valid email"
  ON public.waitlist FOR INSERT
  WITH CHECK (
    email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND (status IS NULL OR status = 'waitlist' OR status = 'newsletter')
  );
