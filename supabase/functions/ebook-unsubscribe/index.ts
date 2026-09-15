import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { serviceClient } from "../_shared/security.ts";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function page(message: string, detail: string): Response {
  return new Response(
    `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>${message} · Safe Spend</title></head>
<body style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background:#0d1117;color:#e6edf3;display:flex;align-items:center;justify-content:center;min-height:100vh;">
<div style="max-width:420px;padding:32px;text-align:center;">
  <h1 style="font-size:22px;margin:0 0 12px;">${message}</h1>
  <p style="color:#8b949e;line-height:1.6;margin:0 0 24px;">${detail}</p>
  <a href="https://gosafespend.com" style="color:#2dd4bf;text-decoration:none;font-weight:600;">Back to Safe Spend</a>
</div></body></html>`,
    { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } },
  );
}

/**
 * One-click unsubscribe from the ebook sequence.
 *
 * Reached from a link in every email, so it takes a random per-lead token in
 * the query string rather than an address -- an email address in a URL would
 * let anyone unsubscribe anyone.
 */
const handler = async (req: Request): Promise<Response> => {
  const token = new URL(req.url).searchParams.get("t") ?? "";

  if (!UUID_RE.test(token)) {
    return page("Link not recognised", "That unsubscribe link looks incomplete. Reply to any of our emails and we'll remove you manually.");
  }

  const { error } = await serviceClient()
    .from("ebook_leads")
    .update({ unsubscribed_at: new Date().toISOString(), next_send_at: null })
    .eq("unsubscribe_token", token);

  if (error) {
    console.error("unsubscribe failed", error.code);
    return page("Something went wrong", "We couldn't complete that just now. Please try again in a moment.");
  }

  return page(
    "You're unsubscribed",
    "You won't receive any more emails in the Thirty Seconds a Day series. Your download link still works.",
  );
};

serve(handler);
