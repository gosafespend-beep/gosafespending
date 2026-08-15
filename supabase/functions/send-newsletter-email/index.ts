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

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

interface NewsletterRequest {
  email: string;
}

/**
 * Subscribes an address to the newsletter and sends its confirmation.
 *
 * The subscription insert happens *here* rather than on the client, so the
 * only address this function will ever mail is one it just recorded itself.
 * Previously the client inserted the row and then asked this function to mail
 * an arbitrary address, which made it an open relay for any caller.
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
    const { email }: NewsletterRequest = await req.json();

    if (!isValidEmail(email)) {
      return json({ success: false, error: "invalid_email" }, 400, cors);
    }
    const address = email.trim().toLowerCase();

    if (!(await withinRateLimit(await clientKey(req, "newsletter"), 5))) {
      return json({ success: false, error: "rate_limited" }, 429, cors);
    }

    const { error: insertError } = await serviceClient()
      .from("waitlist")
      .insert({ email: address, status: "newsletter" });

    if (insertError) {
      // 23505 = unique violation. Already subscribed: report success but send
      // no mail, so a repeated request cannot be used to deliver mail to the
      // same address over and over.
      if (insertError.code === "23505") {
        return json({ success: true, alreadySubscribed: true }, 200, cors);
      }
      console.error("waitlist insert failed", insertError.code);
      return json({ success: false, error: "server_error" }, 500, cors);
    }

    await resend.emails.send({
      from: "Safe Spend <info@gosafespend.com>",
      reply_to: "info@gosafespend.com",
      to: [address],
      subject: "You're in! Finance tips from Safe Spend 💡",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f5;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <tr>
              <td style="background-color: #ffffff; border-radius: 16px; padding: 40px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="text-align: center; padding-bottom: 24px;">
                      <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #18181b;">
                        You're subscribed! 🎉
                      </h1>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-bottom: 20px;">
                      <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #3f3f46;">
                        Thanks for subscribing to the Safe Spend newsletter. You'll receive practical finance tips, budgeting strategies, and product updates — no spam, just value.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="text-align: center; padding: 20px 0;">
                      <a href="https://gosafespend.com" style="display: inline-block; padding: 12px 24px; background-color: #16a34a; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px;">
                        Visit Safe Spend
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td style="border-top: 1px solid #e4e4e7; padding-top: 20px;">
                      <p style="margin: 0; font-size: 14px; color: #71717a; text-align: center;">
                        Questions? Reply to this email or contact us at
                        <a href="mailto:info@gosafespend.com" style="color: #16a34a; text-decoration: none;">info@gosafespend.com</a>
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="text-align: center; padding: 20px;">
                <p style="margin: 0; font-size: 12px; color: #a1a1aa;">
                  © ${new Date().getFullYear()} Safe Spend. Your finances, simplified.
                </p>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    console.log("Newsletter subscription completed");
    return json({ success: true }, 200, cors);
  } catch (error: unknown) {
    // Log detail server-side; never return internal messages to the caller.
    console.error(
      "Newsletter handler error:",
      error instanceof Error ? error.message : "Unknown error",
    );
    return json({ success: false, error: "server_error" }, 500, cors);
  }
};

serve(handler);
