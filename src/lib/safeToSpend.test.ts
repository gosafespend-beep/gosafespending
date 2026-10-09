import { describe, expect, it } from "vitest";
import { computeSafeToSpend, daysLeftInMonth } from "./safeToSpend";

const base = { balance: 2000, expectedIncome: 0, billsDue: 0, goalContributions: 0, daysLeft: 10 };

describe("computeSafeToSpend", () => {
  it("subtracts bills and goals and credits expected income", () => {
    const r = computeSafeToSpend({
      balance: 1500,
      expectedIncome: 1000,
      billsDue: 900,
      goalContributions: 200,
      daysLeft: 10,
    });
    expect(r.safe).toBe(1400);
    expect(r.perDay).toBe(140);
    expect(r.status).toBe("safe");
  });

  it("goes negative and reports danger when obligations exceed money", () => {
    const r = computeSafeToSpend({ ...base, balance: 300, billsDue: 800 });
    expect(r.safe).toBe(-500);
    expect(r.perDay).toBe(0);
    expect(r.status).toBe("danger");
  });

  it("flags caution when less than 20% of available money is left", () => {
    const r = computeSafeToSpend({ ...base, balance: 1000, billsDue: 850 });
    expect(r.safe).toBe(150);
    expect(r.status).toBe("caution");
  });

  it("flags caution below 100 in absolute terms", () => {
    expect(computeSafeToSpend({ ...base, balance: 90 }).status).toBe("caution");
  });

  it("treats blank, negative and non-finite inputs as zero instead of NaN", () => {
    const r = computeSafeToSpend({
      balance: NaN,
      expectedIncome: -5,
      billsDue: Infinity,
      goalContributions: 0,
      daysLeft: 0,
    });
    expect(Number.isNaN(r.safe)).toBe(false);
    expect(r.perDay).toBe(0);
  });
});

describe("daysLeftInMonth", () => {
  it("counts today", () => {
    expect(daysLeftInMonth(new Date(2026, 9, 31))).toBe(1);
    expect(daysLeftInMonth(new Date(2026, 9, 1))).toBe(31);
  });
});
