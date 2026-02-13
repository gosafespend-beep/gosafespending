import { useState } from "react";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, TrendingUp, DollarSign, Calendar, Percent } from "lucide-react";
import { CompoundInterestSchema } from "@/components/seo/CompoundInterestSchema";
import { ExploreMoreTools } from "@/components/shared/ExploreMoreTools";

const APP_URL = "https://app.gosafespend.com";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);

const CompoundInterestCalculator = () => {
  const [principal, setPrincipal] = useState("");
  const [monthly, setMonthly] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");

  const p = parseFloat(principal.replace(/,/g, "")) || 0;
  const m = parseFloat(monthly.replace(/,/g, "")) || 0;
  const r = (parseFloat(rate) || 0) / 100 / 12;
  const n = (parseFloat(years) || 0) * 12;

  const hasInput = p > 0 || m > 0;
  const futureValue = hasInput && n > 0
    ? p * Math.pow(1 + r, n) + m * (r > 0 ? (Math.pow(1 + r, n) - 1) / r : n)
    : 0;
  const totalContributions = p + m * n;
  const totalInterest = futureValue - totalContributions;

  const milestones = [5, 10, 20, 30].filter((y) => y <= (parseFloat(years) || 0)).map((y) => {
    const mn = y * 12;
    const fv = p * Math.pow(1 + r, mn) + m * (r > 0 ? (Math.pow(1 + r, mn) - 1) / r : mn);
    return { year: y, value: fv };
  });

  return (
    <LegalLayout title="Compound Interest Calculator" lastUpdated="February 2026">
      <CompoundInterestSchema />
      <div className="max-w-lg mx-auto">
        <p className="text-muted-foreground text-base mb-8 leading-relaxed">
          See how your money grows over time with the power of compound interest. Enter your starting amount, monthly contributions, expected return rate, and time horizon.
        </p>

        <div className="space-y-5 mb-8">
          <div>
            <Label htmlFor="principal" className="text-foreground text-base mb-2 block">Initial Investment</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input id="principal" type="text" inputMode="numeric" placeholder="10,000" value={principal} onChange={(e) => setPrincipal(e.target.value.replace(/[^0-9.,]/g, ""))} className="pl-7 text-lg h-12" />
            </div>
          </div>
          <div>
            <Label htmlFor="monthly" className="text-foreground text-base mb-2 block">Monthly Contribution</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input id="monthly" type="text" inputMode="numeric" placeholder="500" value={monthly} onChange={(e) => setMonthly(e.target.value.replace(/[^0-9.,]/g, ""))} className="pl-7 text-lg h-12" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="rate" className="text-foreground text-base mb-2 block">Annual Return (%)</Label>
              <Input id="rate" type="text" inputMode="decimal" placeholder="7" value={rate} onChange={(e) => setRate(e.target.value.replace(/[^0-9.]/g, ""))} className="text-lg h-12" />
            </div>
            <div>
              <Label htmlFor="years" className="text-foreground text-base mb-2 block">Time (Years)</Label>
              <Input id="years" type="text" inputMode="numeric" placeholder="20" value={years} onChange={(e) => setYears(e.target.value.replace(/[^0-9]/g, ""))} className="text-lg h-12" />
            </div>
          </div>
        </div>

        {futureValue > 0 && (
          <div className="space-y-4 mb-10">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border/50">
              <div className="p-2.5 rounded-lg bg-primary/10"><TrendingUp className="h-5 w-5 text-primary" /></div>
              <div className="flex-1">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-semibold text-foreground">Future Value</span>
                  <span className="text-lg font-bold text-foreground">{formatCurrency(futureValue)}</span>
                </div>
                <p className="text-xs text-muted-foreground">Total value after {years} years</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border/50">
              <div className="p-2.5 rounded-lg bg-accent/10"><DollarSign className="h-5 w-5 text-accent" /></div>
              <div className="flex-1">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-semibold text-foreground">Total Contributions</span>
                  <span className="text-lg font-bold text-foreground">{formatCurrency(totalContributions)}</span>
                </div>
                <p className="text-xs text-muted-foreground">Principal + monthly deposits</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border/50">
              <div className="p-2.5 rounded-lg bg-green-400/10"><Percent className="h-5 w-5 text-green-400" /></div>
              <div className="flex-1">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-semibold text-foreground">Interest Earned</span>
                  <span className="text-lg font-bold text-foreground">{formatCurrency(totalInterest)}</span>
                </div>
                <p className="text-xs text-muted-foreground">Money earned from compounding</p>
              </div>
            </div>

            {milestones.length > 1 && (
              <div className="p-4 rounded-xl bg-card border border-border/50">
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2"><Calendar className="h-4 w-4 text-primary" /> Growth Milestones</h3>
                <div className="space-y-2">
                  {milestones.map((m) => (
                    <div key={m.year} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Year {m.year}</span>
                      <span className="font-medium text-foreground">{formatCurrency(m.value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <ExploreMoreTools currentPath="/tools/compound-interest-calculator" />

        <div className="text-center pt-4 border-t border-border/50">
          <p className="text-muted-foreground text-sm mb-4">Track your investments and savings goals with Safe Spend.</p>
          <Button asChild size="lg"><a href={APP_URL}>Start Tracking with Safe Spend<ArrowRight className="ml-2 h-4 w-4" /></a></Button>
        </div>
      </div>
    </LegalLayout>
  );
};

export default CompoundInterestCalculator;
