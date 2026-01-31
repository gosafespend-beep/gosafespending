import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface ContactRequest {
  name: string;
  email: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, message }: ContactRequest = await req.json();

    if (!name || !email || !message) {
      throw new Error("Name, email, and message are required");
    }

    console.log("Sending contact form emails for:", email);

    // Send notification to the team
    const teamEmailResponse = await resend.emails.send({
      from: "Safe Spend Contact <info@gosafespend.com>",
      to: ["hello@gosafespend.com"],
      reply_to: email,
      subject: `New Contact Form Message from ${name}`,
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
                    <td style="padding-bottom: 20px;">
                      <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #18181b;">
                        New Contact Form Submission
                      </h1>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-bottom: 15px;">
                      <p style="margin: 0; font-size: 14px; color: #71717a; text-transform: uppercase; letter-spacing: 0.5px;">From</p>
                      <p style="margin: 5px 0 0; font-size: 16px; color: #18181b; font-weight: 500;">${name}</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-bottom: 15px;">
                      <p style="margin: 0; font-size: 14px; color: #71717a; text-transform: uppercase; letter-spacing: 0.5px;">Email</p>
                      <p style="margin: 5px 0 0; font-size: 16px;"><a href="mailto:${email}" style="color: #16a34a; text-decoration: none;">${email}</a></p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-bottom: 20px;">
                      <p style="margin: 0; font-size: 14px; color: #71717a; text-transform: uppercase; letter-spacing: 0.5px;">Message</p>
                      <div style="margin-top: 10px; padding: 16px; background-color: #f4f4f5; border-radius: 8px;">
                        <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #3f3f46; white-space: pre-wrap;">${message}</p>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="text-align: center; padding-top: 10px;">
                      <a href="mailto:${email}" style="display: inline-block; padding: 12px 24px; background-color: #16a34a; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px;">
                        Reply to ${name}
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    console.log("Team notification email sent:", teamEmailResponse);

    // Send confirmation to the user
    const userEmailResponse = await resend.emails.send({
      from: "Safe Spend <info@gosafespend.com>",
      to: [email],
      subject: "We received your message! 📬",
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
                        Thanks for reaching out! 📬
                      </h1>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-bottom: 20px;">
                      <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #3f3f46;">
                        Hi ${name},
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-bottom: 20px;">
                      <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #3f3f46;">
                        We've received your message and appreciate you taking the time to contact us. Our team will review your inquiry and get back to you as soon as possible.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-bottom: 20px;">
                      <p style="margin: 0; font-size: 14px; color: #71717a; text-transform: uppercase; letter-spacing: 0.5px;">Your message</p>
                      <div style="margin-top: 10px; padding: 16px; background-color: #f4f4f5; border-radius: 8px;">
                        <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #52525b; white-space: pre-wrap;">${message}</p>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-bottom: 30px;">
                      <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #3f3f46;">
                        In the meantime, feel free to explore what Safe Spend has to offer!
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
                      <p style="margin: 0; font-size: 14px; color: #71717a; text-align: center;">
                        Best regards,<br>
                        <strong style="color: #3f3f46;">The Safe Spend Team</strong>
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

    console.log("User confirmation email sent:", userEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        data: { teamEmail: teamEmailResponse, userEmail: userEmailResponse } 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: unknown) {
    console.error("Error sending contact emails:", error);
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
