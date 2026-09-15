/**
 * Email templates for the "Thirty Seconds a Day" ebook sequence.
 *
 * Shared by send-ebook (stage 0, the delivery mail) and send-ebook-drip
 * (stages 1-4). Kept in one file so the wrapper, colours and footer cannot
 * drift between the two senders.
 *
 * Every link into the app carries UTM content identifying the stage, so the
 * app can attribute a signup back to the exact email that produced it.
 */

const SITE = "https://gosafespend.com";
const APP = "https://app.gosafespend.com";
const BRAND = "#14b8a6";

export interface EmailContext {
  /** Signed, expiring download URL. Absent for stages that don't re-share it. */
  downloadUrl?: string;
  unsubscribeUrl: string;
}

export interface EmailBody {
  subject: string;
  html: string;
}

function appLink(stage: string): string {
  return `${APP}?utm_source=ebook&utm_medium=email&utm_campaign=thirty_seconds&utm_content=${stage}`;
}

function button(href: string, label: string): string {
  return `<table role="presentation" cellspacing="0" cellpadding="0" style="margin:24px auto;"><tr><td style="border-radius:8px;background-color:${BRAND};">
    <a href="${href}" style="display:inline-block;padding:14px 28px;color:#ffffff;text-decoration:none;font-weight:600;font-size:15px;border-radius:8px;">${label}</a>
  </td></tr></table>`;
}

function wrap(inner: string, unsubscribeUrl: string): string {
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background-color:#f4f4f5;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;margin:0 auto;padding:32px 16px;">
  <tr><td style="background-color:#ffffff;border-radius:16px;padding:36px;box-shadow:0 4px 6px rgba(0,0,0,0.05);color:#3f3f46;font-size:16px;line-height:1.65;">
    ${inner}
    <div style="border-top:1px solid #e4e4e7;margin-top:28px;padding-top:18px;font-size:13px;color:#71717a;">
      Safe Spend · <a href="${SITE}" style="color:${BRAND};text-decoration:none;">gosafespend.com</a><br>
      You're getting this because you asked for the free guide.
      <a href="${unsubscribeUrl}" style="color:#71717a;">Unsubscribe</a> any time.
    </div>
  </td></tr>
</table>
</body></html>`;
}

/** Stage 0 — delivers the book. */
export function deliveryEmail(ctx: EmailContext): EmailBody {
  return {
    subject: "Your copy of Thirty Seconds a Day 📘",
    html: wrap(
      `<h1 style="margin:0 0 16px;font-size:24px;color:#18181b;">Here's your book</h1>
      <p style="margin:0 0 16px;"><strong>Thirty Seconds a Day: A Practical Guide to Financial Clarity</strong> — 12 chapters, 6 worksheets, a glossary and a 30-day plan.</p>
      ${button(ctx.downloadUrl ?? SITE, "Download the PDF")}
      <p style="margin:0 0 8px;font-size:14px;color:#71717a;">This link works for 7 days. Need a new one? Just request the book again.</p>
      <p style="margin:24px 0 8px;"><strong>Start with page 5.</strong> The setup checklist there takes about ten minutes and gives every chapter in the book something to attach to.</p>
      ${button(appLink("stage0"), "Create your free account")}
      <p style="margin:0;font-size:14px;color:#71717a;">Over the next month I'll send you four short emails, each one built on a chapter. First one lands in two days.</p>`,
      ctx.unsubscribeUrl,
    ),
  };
}

/** Stages 1-4 of the 30-day sequence. */
export const DRIP: Array<(ctx: EmailContext) => EmailBody> = [
  // Stage 1 — day 2
  (ctx) => ({
    subject: "The $340 she couldn't account for",
    html: wrap(
      `<h1 style="margin:0 0 16px;font-size:22px;color:#18181b;">Six purchases in 48 hours</h1>
      <p style="margin:0 0 16px;">Jordan, 26, was careful with money. No big purchases, steady paycheck — and still $300–400 disappeared every month between her paycheck and her savings.</p>
      <p style="margin:0 0 16px;">She tried the Weekend Audit from Chapter 1: write down everything you remember spending, then check it against your actual card activity. She'd missed six transactions in two days. Two coffees, a subscription renewal, a rideshare, a grocery top-up, an app purchase. <strong>$61 in 48 hours</strong> — which, scaled to a month, was almost the whole gap.</p>
      <p style="margin:0 0 16px;">The problem was never discipline. Small, frictionless purchases don't register as spending until they're written down.</p>
      <p style="margin:0 0 8px;"><strong>Today's action:</strong> log one day of spending. Every purchase, no judgement. It takes about thirty seconds.</p>
      ${button(appLink("stage1"), "Log today's spending")}`,
      ctx.unsubscribeUrl,
    ),
  }),
  // Stage 2 — day 7
  (ctx) => ({
    subject: "50/30/20 is a starting point, not a law",
    html: wrap(
      `<h1 style="margin:0 0 16px;font-size:22px;color:#18181b;">Build a budget from real numbers</h1>
      <p style="margin:0 0 16px;">Most budgets fail because they're copied. 50% needs, 30% wants, 20% savings is a useful shape — but if you live somewhere rent eats 45% on its own, a rule written for a different cost of living will just make you feel like you're failing.</p>
      <p style="margin:0 0 16px;">Chapters 3 and 4 do it the other way round: start from what you actually spent, then adjust one category at a time.</p>
      <p style="margin:0 0 8px;"><strong>Today's action:</strong> run the numbers, then build the real thing.</p>
      ${button(`${SITE}/tools/budget-calculator?utm_source=ebook&utm_medium=email&utm_content=stage2`, "Try the 50/30/20 calculator")}
      <p style="margin:0;font-size:14px;color:#71717a;">Then open Budgets in the app and tap <em>Build From My Spending</em>.</p>`,
      ctx.unsubscribeUrl,
    ),
  }),
  // Stage 3 — day 14
  (ctx) => ({
    subject: "Snowball or avalanche — pick one and commit",
    html: wrap(
      `<h1 style="margin:0 0 16px;font-size:22px;color:#18181b;">Two ways out of debt</h1>
      <p style="margin:0 0 16px;"><strong>Avalanche</strong> targets the highest interest rate first: mathematically cheapest. <strong>Snowball</strong> targets the smallest balance first: you clear a whole debt sooner, and that's what keeps people going.</p>
      <p style="margin:0 0 16px;">Chapter 7's advice is blunt — the best method is the one you'll still be following in six months. Pick one and don't switch for three.</p>
      <p style="margin:0 0 16px;">No debt? Chapter 8 is yours instead: an emergency fund built in three stages, starting at an amount small enough that you'll actually sustain it.</p>
      ${button(`${SITE}/tools/debt-payoff-calculator?utm_source=ebook&utm_medium=email&utm_content=stage3`, "Compare both strategies")}`,
      ctx.unsubscribeUrl,
    ),
  }),
  // Stage 4 — day 30
  (ctx) => ({
    subject: "Day 30: what changed?",
    html: wrap(
      `<h1 style="margin:0 0 16px;font-size:22px;color:#18181b;">You know where your money goes</h1>
      <p style="margin:0 0 16px;">A month ago the question "where did it go?" had no answer. Worksheet 6 in the book — the Day 30 Money Review — is four questions long. It's worth the five minutes.</p>
      <p style="margin:0 0 16px;">Then record a net worth snapshot. Chapter 10's point is that a single number means little; the direction it moves means everything, and you can only see direction if you started measuring.</p>
      ${button(appLink("stage4"), "Record your snapshot")}
      <p style="margin:0;font-size:14px;color:#71717a;">That's the last email in this series. No bank login, ever — thanks for reading.</p>`,
      ctx.unsubscribeUrl,
    ),
  }),
];

/** Days after the previous email that each drip stage should fire. */
export const DRIP_DELAY_DAYS = [2, 5, 7, 16];
