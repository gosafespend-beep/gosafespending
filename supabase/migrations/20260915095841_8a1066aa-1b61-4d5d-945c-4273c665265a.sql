CREATE TABLE public.ebook_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  source text NOT NULL DEFAULT 'ebook_page',
  drip_stage integer NOT NULL DEFAULT 0,
  next_send_at timestamptz,
  last_sent_at timestamptz,
  unsubscribed_at timestamptz,
  unsubscribe_token uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT ALL ON public.ebook_leads TO service_role;

ALTER TABLE public.ebook_leads ENABLE ROW LEVEL SECURITY;

CREATE INDEX ebook_leads_due_idx
  ON public.ebook_leads (next_send_at)
  WHERE unsubscribed_at IS NULL;

CREATE UNIQUE INDEX ebook_leads_unsub_token_idx
  ON public.ebook_leads (unsubscribe_token);

CREATE TRIGGER ebook_leads_set_updated_at
  BEFORE UPDATE ON public.ebook_leads
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();