/**
 * Financial maths used by the calculator pages.
 *
 * Extracted from the page components so it can be tested. These functions
 * produce payoff dates and interest totals that visitors may act on, and they
 * previously had no test coverage at all.
 */

export interface PayoffResult {
  /** Whole months to clear the balance. Infinity when the payment never will. */
  months: number;
  totalInterest: number;
}

/**
 * Months and total interest to clear `balance` at `apr` paying `payment`
 * every month.
 *
 * Returns Infinity for both when the payment does not cover the monthly
 * interest, since the balance grows without bound. Callers must handle that
 * case before displaying a date.
 */
export function calcPayoff(
  balance: number,
  apr: number,
  payment: number,
): PayoffResult {
  if (payment <= 0 || balance <= 0) return { months: 0, totalInterest: 0 };

  const monthlyRate = apr / 100 / 12;

  if (monthlyRate === 0) {
    return { months: Math.ceil(balance / payment), totalInterest: 0 };
  }

  // Payment never exceeds the interest accrued, so the debt never clears.
  if (payment <= balance * monthlyRate) {
    return { months: Infinity, totalInterest: Infinity };
  }

  const months = Math.ceil(
    -Math.log(1 - (balance * monthlyRate) / payment) / Math.log(1 + monthlyRate),
  );

  let remaining = balance;
  let totalInterest = 0;
  for (let i = 0; i < months; i++) {
    const interest = remaining * monthlyRate;
    totalInterest += interest;
    remaining = remaining + interest - payment;
  }

  return { months, totalInterest };
}

/** Future value of `principal` plus `monthly` contributions, compounded monthly. */
export function futureValue(
  principal: number,
  monthly: number,
  annualRatePct: number,
  years: number,
): number {
  const r = annualRatePct / 100 / 12;
  const n = Math.round(years * 12);
  if (n <= 0) return principal;
  if (r === 0) return principal + monthly * n;

  const compounded = Math.pow(1 + r, n);
  return principal * compounded + monthly * ((compounded - 1) / r);
}

/** The 50/30/20 split of a monthly take-home figure. */
export function budgetSplit(monthlyIncome: number) {
  const income = Math.max(0, monthlyIncome);
  return {
    needs: income * 0.5,
    wants: income * 0.3,
    savings: income * 0.2,
  };
}

/** Emergency fund targets, in months of essential expenses. */
export function emergencyFundTargets(monthlyExpenses: number) {
  const expenses = Math.max(0, monthlyExpenses);
  return {
    threeMonth: expenses * 3,
    sixMonth: expenses * 6,
    nineMonth: expenses * 9,
  };
}
