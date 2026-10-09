/**
 * The Safe-to-Spend number, as the apps compute it.
 *
 *   safe = money you have + income still to arrive − bills still to pay
 *          − what your goals need this month
 *
 * This is a simplified, input-driven version of `computeAvailableToSpend` in
 * the mobile app, kept deliberately in step with it so the demo on the site
 * never promises a different answer than the product gives. It leaves out the
 * parts that need history (trailing average spend, per-bill due dates).
 */

export interface SafeToSpendInput {
  balance: number;
  expectedIncome: number;
  billsDue: number;
  goalContributions: number;
  /** Days left this month including today; at least 1. */
  daysLeft: number;
}

export type SafeStatus = "safe" | "caution" | "danger";

export interface SafeToSpendResult {
  safe: number;
  perDay: number;
  status: SafeStatus;
  message: string;
}

const clean = (n: number) => (Number.isFinite(n) ? Math.max(0, n) : 0);

export function computeSafeToSpend(input: SafeToSpendInput): SafeToSpendResult {
  const balance = clean(input.balance);
  const income = clean(input.expectedIncome);
  const bills = clean(input.billsDue);
  const goals = clean(input.goalContributions);
  const daysLeft = Math.max(1, Math.floor(clean(input.daysLeft)));

  const safe = Math.round((balance + income - bills - goals) * 100) / 100;
  const perDay = safe > 0 ? Math.round((safe / daysLeft) * 100) / 100 : 0;

  const effective = balance + income;
  const pct = effective > 0 ? (safe / effective) * 100 : 0;

  if (safe < 0) {
    return { safe, perDay, status: "danger", message: "Not enough for what's coming up" };
  }
  if (pct < 20 || safe < 100) {
    return { safe, perDay, status: "caution", message: "Limited room — spend carefully" };
  }
  return { safe, perDay, status: "safe", message: "Healthy room to spend" };
}

/** Days left in the month for `now`, counting today. */
export function daysLeftInMonth(now = new Date()): number {
  const total = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  return Math.max(1, total - now.getDate() + 1);
}
