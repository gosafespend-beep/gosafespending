# Database schema

This repository holds no migrations. There is one database, and it is owned by
the web app repo:

    https://github.com/smartvideofy/gosafespend  ->  supabase/

Migrations used to be split across four repositories, none of which held enough
to rebuild the schema. See `supabase/SCHEMA_OWNERSHIP.md` there for what was
consolidated and why, including two defects the split was hiding — one of them
a missing paywall on the most expensive AI call in the product.

Schema changes for this project go in that repo, not this one.

`config.toml` and the edge functions in `functions/` stay here: those are this
site's own (contact form, newsletter, sitemap) and are deployed from here. It is
only the *schema* that moved.
