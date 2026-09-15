/**
 * Links shared by every ebook email.
 *
 * The PDF lives in a private bucket, so each request mints its own expiring
 * URL rather than handing out a permanent one that could be posted anywhere.
 */

// deno-lint-ignore no-explicit-any
type Db = any;

export const EBOOK_BUCKET = "ebook";
export const EBOOK_OBJECT = "thirty-seconds-a-day.pdf";

/** Seven days: long enough to survive a holiday, short enough to matter. */
const TTL_SECONDS = 7 * 24 * 60 * 60;

export async function signedEbookUrl(db: Db): Promise<string | null> {
  const { data, error } = await db.storage
    .from(EBOOK_BUCKET)
    .createSignedUrl(EBOOK_OBJECT, TTL_SECONDS, {
      download: "Thirty-Seconds-a-Day-Safe-Spend.pdf",
    });

  if (error) {
    console.error("signed url failed", error.message);
    return null;
  }
  return data?.signedUrl ?? null;
}

export function unsubscribeUrl(token: string): string {
  const base = Deno.env.get("SUPABASE_URL");
  return `${base}/functions/v1/ebook-unsubscribe?t=${token}`;
}
