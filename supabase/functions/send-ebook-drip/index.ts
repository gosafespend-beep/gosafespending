import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { serviceClient } from "../_shared/security.ts";
import { DRIP, DRIP_DELAY_DAYS } from "../_shared/ebook-emails.ts";
import { unsubscribeUrl } from "../_shared/ebook-links.ts";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

/**
 * Sends the next due email in the 30-day sequence.
 *
 * Invoked hourly by pg_cron rather than on a timer per lead: one scheduled
 * sweep is far cheaper than thousands of delayed jobs, and an hour of slack on
 * a "day 7" email is invisible to the reader.
 *
 * Each lead is advanced *before* its mail is sent. A duplicate send is the
 * worse failure here -- a missed one is silent, a repeated one looks broken --
 * so the schedule moves first and a send error is only logged.
 */
const handler = async (_req: Request): Promise<Response> => {
  const db = serviceClient();

  const { data: due, error } = await db
    .from("ebook_leads")
    .select("id, email, drip_stage, unsubscribe_token")
    .is("unsubscribed_at", null)
    .lte("next_send_at", new Date().toISOString())
    .not("next_send_at", "is", null)
    .lt("drip_stage", DRIP.length + 1)
    .order("next_send_at", { ascending: true })
    .limit(100);

  if (error) {
    console.error("drip query failed", error.code);
    return new Response(JSON.stringify({ ok: false }), { status: 500 });
  }

  let sent = 0;

  for (const lead of due ?? []) {
    const stageIndex = (lead.drip_stage as number) - 1;
    const template = DRIP[stageIndex];
    if (!template) {
      await db
        .from("ebook_leads")
        .update({ next_send_at: null })
        .eq("id", lead.id);
      continue;
    }

    const nextStage = (lead.drip_stage as number) + 1;
    const delay = DRIP_DELAY_DAYS[stageIndex + 1];
    await db
      .from("ebook_leads")
      .update({
        drip_stage: nextStage,
        last_sent_at: new Date().toISOString(),
        next_send_at: delay
          ? new Date(Date.now() + delay * 86_400_000).toISOString()
          : null,
      })
      .eq("id", lead.id);

    try {
      const mail = template({
        unsubscribeUrl: unsubscribeUrl(lead.unsubscribe_token as string),
      });
      await resend.emails.send({
        from: "Safe Spend <info@gosafespend.com>",
        reply_to: "info@gosafespend.com",
        to: [lead.email as string],
        subject: mail.subject,
        html: mail.html,
      });
      sent += 1;
    } catch (err) {
      console.error(
        `drip stage ${lead.drip_stage} send failed`,
        err instanceof Error ? err.message : "unknown",
      );
    }
  }

  console.log(`drip sweep complete: ${sent} sent`);
  return new Response(JSON.stringify({ ok: true, sent }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

serve(handler);
