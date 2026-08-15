import { useState } from "react";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Zap, Snowflake, Calendar, DollarSign } from "lucide-react";
import { DebtPayoffSchema } from "@/components/seo/DebtPayoffSchema";
import { ExploreMoreTools } from "@/components/shared/ExploreMoreTools";
import { FinancialDisclaimer } from "@/components/shared/FinancialDisclaimer";
import { CtaLink } from "@/components/ui/CtaLink";


const formatCurrency = (v: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(v);

interface DebtInput {
  name: string;
  balance: string;
  rate: string;
  minPayment: string;
}

const emptyDebt = (): DebtInput => ({ name: "", balance: "", rate: "", minPayment: "" });

const calcPayoff = (balance: number, apr: number, payment: number) => {
  if (payment <= 0 || balance <= 0) return { months: 0, totalInterest: 0 };
  const r = apr / 100 / 12;
  if (r === 0) return { months: Math.ceil(balance / payment), totalInterest: 0 };
  if (payment <= balance * r) return { months: Infinity, totalInterest: Infinity };
  const months = Math.ceil(-Math.log(1 - (balance * r) / payment) / Math.log(1 + r));
  let remaining = balance;
  let totalInterest = 0;
  for (let i = 0; i < months; i++) {
    const interest = remaining * r;
    totalInterest += interest;
    remaining = remaining + interest - payment;
  }
  return { months, totalInterest };
};

const DebtPayoffCalculator = () => {
  const [debts, setDebts] = useState<DebtInput[]>([emptyDebt()]);
  const [extraPayment, setExtraPayment] = useState("");

  const updateDebt = (i: number, field: keyof DebtInput, value: string) => {
    const updated = [...debts];
    updated[i] = { ...updated[i], [field]: value };
    setDebts(updated);
  };

  const addDebt = () => { if (debts.length < 10) setDebts([...debts, emptyDebt()]); };
  const removeDebt = (i: number) => { if (debts.length > 1) setDebts(debts.filter((_, idx) => idx !== i)); };

  const parsed = debts.map((d) => ({
    name: d.name || `Debt ${debts.indexOf(d) + 1}`,
    balance: parseFloat(d.balance.replace(/,/g, "")) || 0,
    rate: parseFloat(d.rate) || 0,
    minPayment: parseFloat(d.minPayment.replace(/,/g, "")) || 0,
  }));

  const extra = parseFloat(extraPayment.replace(/,/g, "")) || 0;
  const totalBalance = parsed.reduce((s, d) => s + d.balance, 0);
  const hasInput = parsed.some((d) => d.balance > 0 && d.minPayment > 0);

  // Minimum payment only
  const minOnly = parsed.map((d) => ({ ...d, ...calcPayoff(d.balance, d.rate, d.minPayment) }));
  const minOnlyMonths = Math.max(...minOnly.map((d) => d.months));
  const minOnlyInterest = minOnly.reduce((s, d) => s + d.totalInterest, 0);

  // Avalanche (highest rate first)
  const avalanche = [...parsed].sort((a, b) => b.rate - a.rate);
  let avalancheMonths = 0;
  let avalancheInterest = 0;
  {
    const balances = avalanche.map((d) => d.balance);
    const rates = avalanche.map((d) => d.rate / 100 / 12);
    const mins = avalanche.map((d) => d.minPayment);
    for (let m = 0; m < 600; m++) {
      if (balances.every((b) => b <= 0)) break;
      avalancheMonths++;
      let extraLeft = extra;
      for (let i = 0; i < balances.length; i++) {
        if (balances[i] <= 0) continue;
        const interest = balances[i] * rates[i];
        avalancheInterest += interest;
        balances[i] += interest - mins[i];
        if (balances[i] < 0) { extraLeft += -balances[i]; balances[i] = 0; }
      }
      for (let i = 0; i < balances.length; i++) {
        if (balances[i] <= 0 || extraLeft <= 0) continue;
        const applied = Math.min(extraLeft, balances[i]);
        balances[i] -= applied;
        extraLeft -= applied;
      }
    }
  }

  // Snowball (lowest balance first)
  const snowball = [...parsed].sort((a, b) => a.balance - b.balance);
  let snowballMonths = 0;
  let snowballInterest = 0;
  {
    const balances = snowball.map((d) => d.balance);
    const rates = snowball.map((d) => d.rate / 100 / 12);
    const mins = snowball.map((d) => d.minPayment);
    for (let m = 0; m < 600; m++) {
      if (balances.every((b) => b <= 0)) break;
      snowballMonths++;
      let extraLeft = extra;
      for (let i = 0; i < balances.length; i++) {
        if (balances[i] <= 0) continue;
        const interest = balances[i] * rates[i];
        snowballInterest += interest;
        balances[i] += interest - mins[i];
        if (balances[i] < 0) { extraLeft += -balances[i]; balances[i] = 0; }
      }
      for (let i = 0; i < balances.length; i++) {
        if (balances[i] <= 0 || extraLeft <= 0) continue;
        const applied = Math.min(extraLeft, balances[i]);
        balances[i] -= applied;
        extraLeft -= applied;
      }
    }
  }

  const formatMonths = (m: number) => {
    if (!isFinite(m)) return "Never";
    const yrs = Math.floor(m / 12);
    const mos = m % 12;
    return yrs > 0 ? `${yrs}y ${mos}m` : `${mos}m`;
  };

  return (
    <LegalLayout title="Debt Payoff Calculator" lastUpdated="February 2026">
      <DebtPayoffSchema />
      <div className="max-w-lg mx-auto">
        <p className="text-muted-foreground text-base mb-8 leading-relaxed">
          Compare the Snowball (smallest balance first) and Avalanche (highest interest first) methods to find the fastest and cheapest way to become debt-free.
        </p>

        <div className="space-y-6 mb-6">
          {debts.map((debt, i) => (
            <div key={i} className="p-4 rounded-xl bg-card border border-border/50 space-y-3">
              <div className="flex justify-between items-center">
                <Label className="text-foreground font-semibold">Debt {i + 1}</Label>
                {debts.length > 1 && (
                  <button onClick={() => removeDebt(i)} className="text-xs text-muted-foreground hover:text-destructive transition-colors">Remove</button>
                )}
              </div>
              <Input placeholder="Debt name (e.g. Credit Card)" value={debt.name} onChange={(e) => updateDebt(i, "name", e.target.value)} className="h-10" />
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label className="text-xs text-muted-foreground">Balance</Label>
                  <div className="relative"><span className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">$</span>
                    <Input type="text" inputMode="numeric" placeholder="5,000" value={debt.balance} onChange={(e) => updateDebt(i, "balance", e.target.value.replace(/[^0-9.,]/g, ""))} className="pl-5 h-9 text-sm" />
                  </div>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">APR (%)</Label>
                  <Input type="text" inputMode="decimal" placeholder="18" value={debt.rate} onChange={(e) => updateDebt(i, "rate", e.target.value.replace(/[^0-9.]/g, ""))} className="h-9 text-sm" />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Min Payment</Label>
                  <div className="relative"><span className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">$</span>
                    <Input type="text" inputMode="numeric" placeholder="150" value={debt.minPayment} onChange={(e) => updateDebt(i, "minPayment", e.target.value.replace(/[^0-9.,]/g, ""))} className="pl-5 h-9 text-sm" />
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button onClick={addDebt} className="w-full py-2 text-sm text-primary hover:text-primary/80 border border-dashed border-border rounded-lg transition-colors">+ Add Another Debt</button>

          <div>
            <Label htmlFor="extra" className="text-foreground text-base mb-2 block">Extra Monthly Payment</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input id="extra" type="text" inputMode="numeric" placeholder="200" value={extraPayment} onChange={(e) => setExtraPayment(e.target.value.replace(/[^0-9.,]/g, ""))} className="pl-7 text-lg h-12" />
            </div>
          </div>
        </div>

        {hasInput && (
          <div className="space-y-4 mb-10">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border/50">
              <div className="p-2.5 rounded-lg bg-primary/10"><DollarSign className="h-5 w-5 text-primary" /></div>
              <div className="flex-1">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-semibold text-foreground">Total Debt</span>
                  <span className="text-lg font-bold text-foreground">{formatCurrency(totalBalance)}</span>
                </div>
                <p className="text-xs text-muted-foreground">Minimum only: {formatMonths(minOnlyMonths)} · {formatCurrency(minOnlyInterest)} interest</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-primary/30">
              <div className="p-2.5 rounded-lg bg-primary/10"><Zap className="h-5 w-5 text-primary" /></div>
              <div className="flex-1">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-semibold text-foreground">Avalanche Method</span>
                  <span className="text-lg font-bold text-primary">{formatMonths(avalancheMonths)}</span>
                </div>
                <p className="text-xs text-muted-foreground">Highest rate first · {formatCurrency(avalancheInterest)} total interest</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-accent/30">
              <div className="p-2.5 rounded-lg bg-accent/10"><Snowflake className="h-5 w-5 text-accent" /></div>
              <div className="flex-1">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-semibold text-foreground">Snowball Method</span>
                  <span className="text-lg font-bold text-accent">{formatMonths(snowballMonths)}</span>
                </div>
                <p className="text-xs text-muted-foreground">Smallest balance first · {formatCurrency(snowballInterest)} total interest</p>
              </div>
            </div>

            {avalancheInterest < snowballInterest && (
              <p className="text-xs text-center text-muted-foreground">
                💡 Avalanche saves you <span className="text-primary font-semibold">{formatCurrency(snowballInterest - avalancheInterest)}</span> in interest
              </p>
            )}
          </div>
        )}

        <ExploreMoreTools currentPath="/tools/debt-payoff-calculator" />

        <div className="text-center pt-4 border-t border-border/50">
          <p className="text-muted-foreground text-sm mb-4">Track every payment and watch your debt shrink with Safe Spend.</p>
          <Button asChild size="lg"><CtaLink location="tool_debt">Start Tracking with Safe Spend<ArrowRight className="ml-2 h-4 w-4" /></CtaLink></Button>
        </div>
      </div>
      <FinancialDisclaimer context="These payoff dates assume you keep paying the same amount and add no new debt" />
    </LegalLayout>
  );
};

export default DebtPayoffCalculator;
