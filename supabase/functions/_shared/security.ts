/**
 * Shared security helpers for public (verify_jwt = false) edge functions.
 *
 * These functions are reachable by anonymous callers by design, so every
 * control that would normally come from auth has to be applied explicitly:
 * origin allow-listing, input validation, rate limiting, and output escaping.
 */

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.93.3";

const ALLOWED_ORIGINS = new Set([
  "https://gosafespend.com",
  "https://www.gosafespend.com",
]);

// Allow localhost during local development only.
const DEV_ORIGIN = /^http:\/\/localhost:\d+$/;

const BASE_CORS_HEADERS = {
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  Vary: "Origin",
};

/**
 * Returns CORS headers when the request origin is allowed, or null when it is
 * not. A null return means the caller should reject the request outright —
 * previously these functions answered `Access-Control-Allow-Origin: *`, which
 * let any site on the internet drive them.
 */
export function corsFor(req: Request): Record<string, string> | null {
  const origin = req.headers.get("Origin") ?? "";
  if (ALLOWED_ORIGINS.has(origin) || DEV_ORIGIN.test(origin)) {
    return { ...BASE_CORS_HEADERS, "Access-Control-Allow-Origin": origin };
  }
  return null;
}

/** Escapes a value for interpolation into HTML text or an attribute. */
export function esc(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Mirrors the email regex used by the waitlist RLS policy. */
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export function isValidEmail(value: unknown): value is string {
  return typeof value === "string" && value.length <= 254 && EMAIL_RE.test(value);
}

export function isValidText(
  value: unknown,
  { min = 1, max }: { min?: number; max: number },
): value is string {
  return (
    typeof value === "string" &&
    value.trim().length >= min &&
    value.trim().length <= max
  );
}

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
    console.error("rate limit check threw", err instanceof Error ? err.message : err);
    return true;
  }
}

export function json(
  body: unknown,
  status: number,
  cors: Record<string, string>,
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...cors },
  });
}
