-- Allow anonymous users to count waitlist entries for social proof
CREATE POLICY "Anyone can count waitlist entries"
ON public.waitlist
FOR SELECT
USING (true);