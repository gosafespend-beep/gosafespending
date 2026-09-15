import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { serviceClient } from "../_shared/security.ts";
import { EBOOK_BUCKET, EBOOK_OBJECT } from "../_shared/ebook-links.ts";

const SOURCE_URL =
  "https://gosafespend.com/__l5e/assets-v1/3c4fadc8-c4e5-41b2-8f5e-4e06fd992e46/thirty-seconds-a-day.pdf";

/**
 * One-time loader that copies the ebook PDF into the private storage bucket.
 *
 * Idempotent: if the object is already there it reports so and does nothing,
 * which is why it needs no auth of its own -- the worst a stranger can do is
 * make it re-upload the same public file over itself.
 */
serve(async () => {
  const db = serviceClient();

  const { data: existing } = await db.storage
    .from(EBOOK_BUCKET)
    .list("", { search: EBOOK_OBJECT });

  if (existing?.some((f: { name: string }) => f.name === EBOOK_OBJECT)) {
    return Response.json({ ok: true, status: "already_present" });
  }

  const response = await fetch(SOURCE_URL);
  if (!response.ok) {
    return Response.json(
      { ok: false, status: response.status },
      { status: 502 },
    );
  }

  const bytes = new Uint8Array(await response.arrayBuffer());
  const { error } = await db.storage
    .from(EBOOK_BUCKET)
    .upload(EBOOK_OBJECT, bytes, {
      contentType: "application/pdf",
      upsert: true,
    });

  if (error) {
    console.error("ebook upload failed", error.message);
    return Response.json({ ok: false, error: error.message }, { status: 500 });
  }

  return Response.json({ ok: true, status: "uploaded", bytes: bytes.length });
});
