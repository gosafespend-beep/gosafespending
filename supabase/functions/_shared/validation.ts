/**
 * Pure request-handling helpers for the public edge functions.
 *
 * Deliberately free of Deno-specific and remote (esm.sh) imports so this file
 * runs under Node and can be unit-tested. Anything needing the Supabase client
 * or Deno globals lives in security.ts.
 */

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
 * not. A null return means the caller should reject the request outright --
 * these functions previously answered `Access-Control-Allow-Origin: *`, which
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
