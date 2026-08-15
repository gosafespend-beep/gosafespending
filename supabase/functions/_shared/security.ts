/**
 * Runtime security helpers for the public (verify_jwt = false) edge functions.
 *
 * These functions are reachable by anonymous callers by design, so every
 * control that would normally come from auth has to be applied explicitly:
 * origin allow-listing, input validation, rate limiting and output escaping.
 *
 * The pure parts live in validation.ts so they can be unit-tested under Node;
 * this file holds what needs the Supabase client and Deno globals.
 */

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.93.3";

export { corsFor, esc, isValidEmail, isValidText, json } from "./validation.ts";

/** Best-effort client IP, hashed so we never store a raw address. */
export async function clientKey(req: Request, scope: string): Promise<string> {
  const ip =
    req.headers.get("cf-connecting-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(`${scope}:${ip}`),
  );
  return `${scope}:${Array.from(new Uint8Array(digest))
    .slice(0, 16)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")}`;
}

export function serviceClient() {
  return createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    { auth: { persistSession: false } },
  );
}

/**
 * Returns true when the request is within its budget. Fails open on an
 * unexpected database error so a transient outage cannot take the contact
 * form offline entirely.
 */
export async function withinRateLimit(
  key: string,
  limit: number,
  window = "1 hour",
): Promise<boolean> {
  try {
    const { data, error } = await serviceClient().rpc("check_rate_limit", {
      p_key: key,
      p_limit: limit,
      p_window: window,
    });
    if (error) {
      console.error("rate limit check failed", error.message);
      return true;
    }
    return data === true;
  } catch (err) {
    console.error(
      "rate limit check threw",
      err instanceof Error ? err.message : err,
    );
    return true;
  }
}
