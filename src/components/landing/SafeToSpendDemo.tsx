import { useMemo, useState } from "react";
import { track } from "@/lib/analytics";
import {
  computeSafeToSpend,
  daysLeftInMonth,
  type SafeStatus,
} from "@/lib/safeToSpend";
import { StoreBadges } from "@/components/ui/StoreBadges";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/*
 * Interactive Safe-to-Spend.
 *
 * The one idea the product is named after, as something a visitor can try in
 * ten seconds with their own figures. Nothing is sent anywhere; the sum is the
 * same one the apps use (see lib/safeToSpend.ts). It ends in the store badges
 * because the natural next question is "can it do this for me automatically?".
 */

const CURRENCIES = {
  USD: { balance: 1500, income: 1000, bills: 900, goals: 200 },
  EUR: { balance: 1400, income: 950, bills: 850, goals: 180 },
  GBP: { balance: 1200, income: 800, bills: 720, goals: 150 },
  KES: { balance: 90000, income: 60000, bills: 55000, goals: 10000 },
  NGN: { balance: 450000, income: 300000, bills: 270000, goals: 50000 },
  ZAR: { balance: 18000, income: 12000, bills: 10500, goals: 2500 },
} as const;
type Code = keyof typeof CURRENCIES;

const TONE: Record<SafeStatus, { text: string; bar: string; label: string }> = {
  safe: { text: "text-primary", bar: "bg-primary", label: "Safe" },
  caution: { text: "text-amber-400", bar: "bg-amber-400", label: "Tight" },
  danger: { text: "text-red-400", bar: "bg-red-400", label: "Over" },
};

const FIELDS = [
  { key: "balance", label: "Money you have now", hint: "Cash and account balances" },
  { key: "income", label: "Income still to arrive this month", hint: "Salary or invoices not yet received" },
  { key: "bills", label: "Bills you haven't paid yet", hint: "Rent, utilities, subscriptions" },
  { key: "goals", label: "Set aside for goals this month", hint: "Savings or debt payments" },
] as const;

type Values = Record<(typeof FIELDS)[number]["key"], string>;

const toValues = (code: Code): Values => ({
  balance: String(CURRENCIES[code].balance),
  income: String(CURRENCIES[code].income),
  bills: String(CURRENCIES[code].bills),
  goals: String(CURRENCIES[code].goals),
});

export const SafeToSpendDemo = () => {
  const [code, setCode] = useState<Code>("USD");
  const [values, setValues] = useState<Values>(() => toValues("USD"));
  const [touched, setTouched] = useState(false);
  const daysLeft = daysLeftInMonth();

  const money = useMemo(
    () =>
      new Intl.NumberFormat("en", {
        style: "currency",
        currency: code,
        maximumFractionDigits: 0,
      }),
    [code],
  );

  const result = useMemo(
    () =>
      computeSafeToSpend({
        balance: Number(values.balance),
        expectedIncome: Number(values.income),
        billsDue: Number(values.bills),
        goalContributions: Number(values.goals),
        daysLeft,
      }),
    [values, daysLeft],
  );

  const tone = TONE[result.status];
  const available = (Number(values.balance) || 0) + (Number(values.income) || 0);
  const fill =
    available > 0 ? Math.min(100, Math.max(0, (result.safe / available) * 100)) : 0;

  const markTouched = () => {
    if (touched) return;
    setTouched(true);
    track("demo_interact", { demo: "safe_to_spend" });
  };

  return (
    <section id="safe-to-spend" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full">
            Try it
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            The one number that <span className="gradient-text">actually matters</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Your balance still includes rent that hasn't left yet. Safe to Spend
            takes out what's already spoken for. Put in your own figures —
            nothing leaves this page.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <form
            className="rounded-2xl border border-border/50 bg-card p-6 space-y-5"
            onSubmit={(e) => e.preventDefault()}
            aria-label="Safe to Spend calculator"
          >
            <div className="flex items-center justify-between gap-3">
              <Label htmlFor="sts-currency" className="text-sm text-muted-foreground">
                Currency
              </Label>
              <select
                id="sts-currency"
                value={code}
                onChange={(e) => {
                  const next = e.target.value as Code;
                  setCode(next);
                  setValues(toValues(next));
                  markTouched();
                }}
                className="h-11 rounded-md border border-input bg-background px-3 text-sm"
              >
                {(Object.keys(CURRENCIES) as Code[]).map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {FIELDS.map(({ key, label, hint }) => (
              <div key={key}>
                <Label htmlFor={`sts-${key}`} className="text-sm text-foreground">
                  {label}
                </Label>
                <Input
                  id={`sts-${key}`}
                  type="number"
                  inputMode="decimal"
                  min={0}
                  value={values[key]}
                  onChange={(e) => {
                    setValues((v) => ({ ...v, [key]: e.target.value }));
                    markTouched();
                  }}
                  className="mt-1.5 h-11"
                  aria-describedby={`sts-${key}-hint`}
                />
                <p id={`sts-${key}-hint`} className="mt-1 text-xs text-muted-foreground">
                  {hint}
                </p>
              </div>
            ))}
          </form>

          <div className="rounded-2xl border border-primary/30 bg-card p-6 lg:sticky lg:top-24">
            <p className="text-sm text-muted-foreground mb-1">Safe to spend</p>
            <div aria-live="polite" aria-atomic="true">
              <p
                className={`text-5xl font-bold ${tone.text}`}
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {money.format(result.safe)}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                <span className={`font-semibold ${tone.text}`}>{tone.label}</span>{" "}
                — {result.message}
              </p>
            </div>

            <div className="mt-5 h-2.5 rounded-full bg-muted overflow-hidden" role="presentation">
              <div
                className={`h-full rounded-full ${tone.bar}`}
                style={{ width: `${fill}%` }}
              />
            </div>

            <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-muted-foreground">Per day, rest of month</dt>
                <dd
                  className="font-semibold text-foreground"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  {money.format(result.perDay)}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Days left (incl. today)</dt>
                <dd className="font-semibold text-foreground">{daysLeft}</dd>
              </div>
            </dl>

            <div className="mt-6 pt-5 border-t border-border/50">
              <p className="text-sm text-foreground font-medium mb-3">
                Get this number automatically, updated every time you log
                something.
              </p>
              <StoreBadges location="safe_to_spend" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
