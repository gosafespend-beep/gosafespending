-- Baseline: shared functions and role infrastructure.
--
-- Later migrations reference public.update_updated_at_column() and
-- public.has_role(), but neither was ever defined in this repository -- they
-- existed only in the live project. That meant the schema could not be rebuilt
-- from source. This migration defines them, timestamped to sort first.
--
-- On the EXISTING project these objects already exist, so mark this as applied
-- rather than running it:
--   supabase migration repair --status applied 20260101000000
--
-- Everything here is idempotent, so a fresh `supabase db reset` succeeds.

-- Trigger helper used by waitlist and blog_posts updated_at triggers.
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Role enum. DO block because CREATE TYPE has no IF NOT EXISTS.
-- Values mirror the live project exactly (confirmed against the generated
-- types in src/integrations/supabase/types.ts). Omitting 'moderator' here
-- would make a from-scratch rebuild diverge from production.
DO $$
BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END;
$$;

CREATE TABLE IF NOT EXISTS public.user_roles (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role       public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

DROP TRIGGER IF EXISTS update_user_roles_updated_at ON public.user_roles;
CREATE TRIGGER update_user_roles_updated_at
BEFORE UPDATE ON public.user_roles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Users may read their own role assignments; nothing else is exposed to
-- anon or authenticated. Role changes go through the service role only.
DROP POLICY IF EXISTS "Users can read their own roles" ON public.user_roles;
CREATE POLICY "Users can read their own roles"
  ON public.user_roles
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- SECURITY DEFINER so RLS policies can call it without recursing into
-- user_roles' own policies.
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  );
$$;
