import { describe, it, expect } from "vitest";
import {
  budgetSplit,
  calcPayoff,
  emergencyFundTargets,
  futureValue,
} from "./finance";

/*
 * These functions produce payoff dates and future values a visitor may act on.
 * The edge cases matter more than the happy path: a wrong "you'll be debt free
 * in March" is worse than no answer at all.
 */

describe("calcPayoff", () => {
  it("clears an interest-free balance in whole months", () => {
    expect(calcPayoff(1000, 0, 100)).toEqual({ months: 10, totalInterest: 0 });
  });

  it("rounds a partial final month up", () => {
    expect(calcPayoff(1000, 0, 300).months).toBe(4);
  });

  it("charges interest on a rate-bearing balance", () => {
    // $5,000 at 18% APR paying $200/mo clears in 32 months.
    const result = calcPayoff(5000, 18, 200);
    expect(result.months).toBe(32);
    expect(result.totalInterest).toBeGreaterThan(1300);
    expect(result.totalInterest).toBeLessThan(1400);
  });

  it("reports Infinity when the payment never covers the interest", () => {
    // 24% APR on $10,000 accrues $200/mo; paying $200 makes no progress.
    const result = calcPayoff(10000, 24, 200);
    expect(result.months).toBe(Infinity);
    expect(result.totalInterest).toBe(Infinity);
  });

  it("treats a payment exactly equal to the interest as never clearing", () => {
    expect(calcPayoff(1200, 12, 12).months).toBe(Infinity);
  });

  it("returns zero for an already-cleared debt", () => {
    expect(calcPayoff(0, 20, 100)).toEqual({ months: 0, totalInterest: 0 });
  });

  it("returns zero rather than dividing by zero when no payment is made", () => {
    expect(calcPayoff(5000, 20, 0)).toEqual({ months: 0, totalInterest: 0 });
  });

  it("costs less in total interest as the payment rises", () => {
    const small = calcPayoff(5000, 18, 200);
    const large = calcPayoff(5000, 18, 400);
    expect(large.months).toBeLessThan(small.months);
    expect(large.totalInterest).toBeLessThan(small.totalInterest);
  });
});

describe("futureValue", () => {
  it("returns the principal when no time has passed", () => {
    expect(futureValue(1000, 100, 7, 0)).toBe(1000);
  });

  it("adds contributions without growth at a zero rate", () => {
    expect(futureValue(1000, 100, 0, 2)).toBe(1000 + 100 * 24);
  });

  it("compounds a lump sum", () => {
    // $10,000 at 6% compounded monthly for 10 years.
    expect(futureValue(10000, 0, 6, 10)).toBeCloseTo(18193.97, 0);
  });

  it("grows with regular contributions", () => {
    const withContributions = futureValue(0, 200, 7, 20);
    expect(withContributions).toBeGreaterThan(200 * 12 * 20);
  });
});

describe("budgetSplit", () => {
  it("splits income 50/30/20", () => {
    expect(budgetSplit(4000)).toEqual({ needs: 2000, wants: 1200, savings: 800 });
  });

  it("always sums back to the income", () => {
    const split = budgetSplit(3333);
    expect(split.needs + split.wants + split.savings).toBeCloseTo(3333, 6);
  });

  it("clamps negative income to zero", () => {
    expect(budgetSplit(-500)).toEqual({ needs: 0, wants: 0, savings: 0 });
  });
});

describe("emergencyFundTargets", () => {
  it("returns 3, 6 and 9 month targets", () => {
    expect(emergencyFundTargets(2000)).toEqual({
      threeMonth: 6000,
      sixMonth: 12000,
      nineMonth: 18000,
    });
  });

  it("clamps negative expenses to zero", () => {
    expect(emergencyFundTargets(-100).sixMonth).toBe(0);
  });
});
