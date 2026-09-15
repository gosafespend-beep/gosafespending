import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import {
  clientKey,
  corsFor,
  isValidEmail,
  json,
  serviceClient,
  withinRateLimit,
} from "../_shared/security.ts";
import { deliveryEmail } from "../_shared/ebook-emails.ts";
import { signedEbookUrl, unsubscribeUrl } from "../_shared/ebook-links.ts";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const SOURCES = new Set([
  "ebook_page",
  "homepage",
  "blog",
  "calculator",
  "app_signup",
]);

/**
 * Emails the ebook to an address and enrols it in the 30-day sequence.
 *
 * The lead row is written here with the service role, never from the client,
 * so the only address this function will ever mail is one it just recorded
 * itself -- the same rule that keeps send-newsletter-email from being an open
 * relay. The response is `{ success: true }` whether the address was new or
 * already known, so it cannot be used to probe who has signed up.
 */
const handler = async (req: Request): Promise<Response> => {
  const cors = corsFor(req);
  if (!cors) {
    return new Response(JSON.stringify({ success: false }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (req.method === "OPTIONS") return new Response(null, { headers: cors });
  if (req.method !== "POST") return json({ success: false }, 405, cors);

  try {
    const body = await req.json();
    const { email, source, newsletter } = body ?? {};

    if (!isValidEmail(email)) {
      return json({ success: false, error: "invalid_email" }, 400, cors);
    }
    const address = String(email).trim().toLowerCase();
    const leadSource = SOURCES.has(source) ? source : "ebook_page";

    if (!(await withinRateLimit(await clientKey(req, "ebook"), 5))) {
      return json({ success: false, error: "rate_limited" }, 429, cors);
    }

    const db = serviceClient();

    /*
     * Upsert rather than insert: someone who lost the link should be able to
     * ask again and get a fresh one, without being enrolled in the sequence a
     * second time. Only a brand-new row gets its schedule set.
     */
    const { data: existing } = await db
      .from("ebook_leads")
      .select("id, unsubscribe_token")
      .eq("email", address)
      .maybeSingle();

    let token = existing?.unsubscribe_token as string | undefined;

    if (!existing) {
      const nextSend = new Date(Date.now() + 2 * 86_400_000).toISOString();
      const { data: inserted, error: insertError } = await db
        .from("ebook_leads")
        .insert({
          email: address,
          source: leadSource,
          drip_stage: 0,
          next_send_at: nextSend,
          last_sent_at: new Date().toISOString(),
        })
        .select("unsubscribe_token")
        .single();

      if (insertError) {
        console.error("ebook lead insert failed", insertError.code);
        return json({ success: false, error: "server_error" }, 500, cors);
      }
      token = inserted.unsubscribe_token as string;
    } else {
      await db
        .from("ebook_leads")
        .update({ last_sent_at: new Date().toISOString() })
        .eq("id", existing.id);
    }

    // Marketing consent is a separate, explicit opt-in from wanting the book.
    if (newsletter === true) {
      await db
        .from("waitlist")
        .insert({ email: address, status: "newsletter" });
    }

    const download = await signedEbookUrl(db);
    if (!download) {
      console.error("ebook signed url generation failed");
      return json({ success: false, error: "server_error" }, 500, cors);
    }

    const mail = deliveryEmail({
      downloadUrl: download,
      unsubscribeUrl: unsubscribeUrl(token!),
    });

    await resend.emails.send({
      from: "Safe Spend <info@gosafespend.com>",
      reply_to: "info@gosafespend.com",
      to: [address],
      subject: mail.subject,
      html: mail.html,
    });

    console.log("ebook delivery sent", leadSource);
    return json({ success: true }, 200, cors);
  } catch (error: unknown) {
    console.error(
      "send-ebook error:",
      error instanceof Error ? error.message : "Unknown error",
    );
    return json({ success: false, error: "server_error" }, 500, cors);
  }
};

serve(handler);
