-- Fix: PUBLIC_USER_DATA - Email addresses exposed to anyone on the internet
-- Drop the overly permissive SELECT policy and replace with a secure count function

-- Drop existing public SELECT policies
DROP POLICY IF EXISTS "Anyone can count waitlist entries" ON public.waitlist;
DROP POLICY IF EXISTS "Service role can view waitlist" ON public.waitlist;

-- Create a secure function to get waitlist count without exposing email data
-- This function returns only the count, not the actual data
CREATE OR REPLACE FUNCTION public.get_waitlist_count()
RETURNS bigint
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COUNT(*) FROM public.waitlist;
$$;

-- Grant execute permission to anon users for the count function
GRANT EXECUTE ON FUNCTION public.get_waitlist_count() TO anon;
GRANT EXECUTE ON FUNCTION public.get_waitlist_count() TO authenticated;

-- Create a restrictive SELECT policy - only service role can view actual data
-- No public access to the actual email data
CREATE POLICY "Only service role can view waitlist data"
ON public.waitlist
FOR SELECT
TO service_role
USING (true);