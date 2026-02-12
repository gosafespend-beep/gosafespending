import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface WaitlistRequest {
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email }: WaitlistRequest = await req.json();

    if (!email) {
      throw new Error("Email is required");
    }

    console.log("Sending waitlist confirmation email to:", email);

    const emailResponse = await resend.emails.send({
      from: "Safe Spend <info@gosafespend.com>",
      reply_to: "info@gosafespend.com",
      to: [email],
      subject: "Welcome to the Safe Spend Waitlist! 🎉",
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
                    <td style="text-align: center; padding-bottom: 30px;">
                      <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #18181b;">
                        Welcome to Safe Spend
                      </h1>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-bottom: 20px;">
                      <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #3f3f46;">
                        Thank you for joining the Safe Spend waitlist. You're now part of a small group that will receive early access before the public launch.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-bottom: 20px;">
                      <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #3f3f46;">
                        Safe Spend is designed to give you a clear, honest view of your finances — helping you understand where your money goes, plan with intention, and know exactly how much is safe to spend at any moment.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-bottom: 20px;">
                      <p style="margin: 0 0 10px 0; font-size: 16px; font-weight: 600; color: #18181b;">
                        What you can expect:
                      </p>
                      <ul style="margin: 0; padding-left: 20px; color: #3f3f46; font-size: 16px; line-height: 1.8;">
                        <li>Early access to Safe Spend before public release</li>
                        <li>Priority updates as new features are introduced</li>
                        <li>Preferential launch pricing reserved for waitlist members</li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-bottom: 20px;">
                      <p style="margin: 0 0 10px 0; font-size: 16px; font-weight: 600; color: #18181b;">
                        What Safe Spend helps you do:
                      </p>
                      <ul style="margin: 0; padding-left: 20px; color: #3f3f46; font-size: 16px; line-height: 1.8;">
                        <li>Track income and expenses with clear, structured categories</li>
                        <li>Set practical monthly budgets and spending limits</li>
                        <li>View accurate monthly and annual financial summaries</li>
                        <li>Maintain full control over your financial data</li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-bottom: 20px; background-color: #f0fdf4; border-radius: 8px; padding: 16px;">
                      <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #166534; text-align: center;">
                        <strong>Safe Spend requires no bank connections.</strong><br>
                        There are no hidden calculations, automated imports, or unclear assumptions — just transparency, simplicity, and control.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 20px 0;">
                      <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #3f3f46;">
                        We'll notify you as soon as early access becomes available.<br>
                        Thank you for trusting us with something important.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="text-align: center; padding-bottom: 30px;">
                      <a href="https://gosafespend.com" style="display: inline-block; padding: 14px 28px; background-color: #16a34a; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
                        Visit Safe Spend
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td style="border-top: 1px solid #e4e4e7; padding-top: 20px;">
                      <p style="margin: 0; font-size: 15px; color: #3f3f46; text-align: center;">
                        <strong>The Safe Spend Team</strong>
                      </p>
                      <p style="margin: 10px 0 0 0; font-size: 14px; color: #71717a; text-align: center;">
                        Questions? Reply to this email or contact us at<br>
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

    console.log("Waitlist email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: unknown) {
    console.error("Error sending waitlist email:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
