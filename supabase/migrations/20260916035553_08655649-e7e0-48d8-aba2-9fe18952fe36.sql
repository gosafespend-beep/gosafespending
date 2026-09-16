CREATE TABLE IF NOT EXISTS public.rate_limit_hits (
  id bigserial PRIMARY KEY,
  key text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT ALL ON public.rate_limit_hits TO service_role;
GRANT USAGE, SELECT ON SEQUENCE public.rate_limit_hits_id_seq TO service_role;

ALTER TABLE public.rate_limit_hits ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS rate_limit_hits_key_time_idx
  ON public.rate_limit_hits (key, created_at DESC);

CREATE OR REPLACE FUNCTION public.check_rate_limit(
  p_key text,
  p_limit integer,
  p_window text DEFAULT '1 hour'
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_interval interval := p_window::interval;
  v_count integer;
BEGIN
  DELETE FROM public.rate_limit_hits
  WHERE created_at < now() - GREATEST(v_interval, interval '1 day');

  SELECT count(*) INTO v_count
  FROM public.rate_limit_hits
  WHERE key = p_key AND created_at > now() - v_interval;

  IF v_count >= p_limit THEN
    RETURN false;
  END IF;

  INSERT INTO public.rate_limit_hits (key) VALUES (p_key);
  RETURN true;
END;
$$;

REVOKE ALL ON FUNCTION public.check_rate_limit(text, integer, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.check_rate_limit(text, integer, text) TO service_role;