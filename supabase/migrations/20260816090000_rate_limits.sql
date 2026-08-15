-- Rate limiting for the public (verify_jwt = false) edge functions.
--
-- send-contact-email and send-newsletter-email are reachable by anonymous
-- callers by design. Without a limit they could be driven at any rate, which
-- burns the Resend quota and damages the sending domain's reputation.

CREATE TABLE IF NOT EXISTS public.rate_limits (
  key          text PRIMARY KEY,
  count        integer NOT NULL DEFAULT 1,
  window_start timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

-- Deliberately no policies: the table is reachable only through the
-- SECURITY DEFINER function below, never directly by anon or authenticated.

CREATE INDEX IF NOT EXISTS idx_rate_limits_window
  ON public.rate_limits (window_start);

/**
 * Records a hit against `p_key` and reports whether the caller is still
 * within `p_limit` for the trailing `p_window`.
 *
 * Returns true when the request should proceed, false when it should be
 * rejected with 429.
 */
CREATE OR REPLACE FUNCTION public.check_rate_limit(
  p_key    text,
  p_limit  integer,
  p_window interval
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_count integer;
BEGIN
  -- Opportunistic cleanup of expired windows.
  DELETE FROM public.rate_limits
  WHERE window_start < now() - (p_window * 2);

  INSERT INTO public.rate_limits AS rl (key)
  VALUES (p_key)
  ON CONFLICT (key) DO UPDATE
    SET count = CASE
          WHEN rl.window_start < now() - p_window THEN 1
          ELSE rl.count + 1
        END,
        window_start = CASE
          WHEN rl.window_start < now() - p_window THEN now()
          ELSE rl.window_start
        END
  RETURNING rl.count INTO v_count;

  RETURN v_count <= p_limit;
END;
$$;

-- Only the service role (used by the edge functions) may call this.
REVOKE ALL ON FUNCTION public.check_rate_limit(text, integer, interval) FROM public, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.check_rate_limit(text, integer, interval) TO service_role;
