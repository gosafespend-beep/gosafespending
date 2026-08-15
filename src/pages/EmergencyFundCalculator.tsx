import { useState } from "react";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Shield, Target, Clock, Wallet } from "lucide-react";
import { EmergencyFundSchema } from "@/components/seo/EmergencyFundSchema";
import { ExploreMoreTools } from "@/components/shared/ExploreMoreTools";
import { FinancialDisclaimer } from "@/components/shared/FinancialDisclaimer";
import { CtaLink } from "@/components/ui/CtaLink";


const formatCurrency = (v: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(v);

const tiers = [
  { months: 3, label: "Starter", icon: Shield, color: "text-accent", bgColor: "bg-accent/10", desc: "Covers short-term disruptions" },
  { months: 6, label: "Recommended", icon: Target, color: "text-primary", bgColor: "bg-primary/10", desc: "Ideal for most households" },
  { months: 9, label: "Conservative", icon: Clock, color: "text-green-400", bgColor: "bg-green-400/10", desc: "Extra cushion for variable income" },
];

const EmergencyFundCalculator = () => {
  const [expenses, setExpenses] = useState("");
  const [saved, setSaved] = useState("");
  const [monthlySaving, setMonthlySaving] = useState("");

  const exp = parseFloat(expenses.replace(/,/g, "")) || 0;
  const sav = parseFloat(saved.replace(/,/g, "")) || 0;
  const ms = parseFloat(monthlySaving.replace(/,/g, "")) || 0;

  const hasInput = exp > 0;

  return (
    <LegalLayout title="Emergency Fund Calculator" lastUpdated="February 2026">
      <EmergencyFundSchema />
      <div className="max-w-lg mx-auto">
        <p className="text-muted-foreground text-base mb-8 leading-relaxed">
          Find out how much you need in your emergency fund based on your monthly expenses. Experts recommend saving 3–6 months of essential expenses.
        </p>

        <div className="space-y-5 mb-8">
          <div>
            <Label htmlFor="expenses" className="text-foreground text-base mb-2 block">Monthly Essential Expenses</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input id="expenses" type="text" inputMode="numeric" placeholder="3,000" value={expenses} onChange={(e) => setExpenses(e.target.value.replace(/[^0-9.,]/g, ""))} className="pl-7 text-lg h-12" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Housing, food, utilities, insurance, transportation</p>
          </div>
          <div>
            <Label htmlFor="saved" className="text-foreground text-base mb-2 block">Already Saved</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input id="saved" type="text" inputMode="numeric" placeholder="2,000" value={saved} onChange={(e) => setSaved(e.target.value.replace(/[^0-9.,]/g, ""))} className="pl-7 text-lg h-12" />
            </div>
          </div>
          <div>
            <Label htmlFor="monthlySaving" className="text-foreground text-base mb-2 block">Monthly Savings Toward Fund</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input id="monthlySaving" type="text" inputMode="numeric" placeholder="500" value={monthlySaving} onChange={(e) => setMonthlySaving(e.target.value.replace(/[^0-9.,]/g, ""))} className="pl-7 text-lg h-12" />
            </div>
          </div>
        </div>

        {hasInput && (
          <div className="space-y-4 mb-10">
            {tiers.map((tier) => {
              const target = exp * tier.months;
              const remaining = Math.max(0, target - sav);
              const monthsToGoal = ms > 0 ? Math.ceil(remaining / ms) : null;
              const progress = Math.min(100, (sav / target) * 100);

              return (
                <div key={tier.months} className="p-4 rounded-xl bg-card border border-border/50">
                  <div className="flex items-center gap-4 mb-3">
                    <div className={`p-2.5 rounded-lg ${tier.bgColor}`}><tier.icon className={`h-5 w-5 ${tier.color}`} /></div>
                    <div className="flex-1">
                      <div className="flex justify-between items-baseline mb-1">
                        <span className="font-semibold text-foreground">{tier.label} ({tier.months} months)</span>
                        <span className="text-lg font-bold text-foreground">{formatCurrency(target)}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{tier.desc}</p>
                    </div>
                  </div>
                  <div className="w-full h-2 rounded-full bg-muted overflow-hidden mb-2">
                    <div className={`h-full rounded-full transition-all duration-500 ${progress >= 100 ? "bg-green-400" : "bg-primary"}`} style={{ width: `${progress}%` }} />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{remaining > 0 ? `${formatCurrency(remaining)} to go` : "✅ Goal reached!"}</span>
                    {monthsToGoal !== null && remaining > 0 && <span>{monthsToGoal} months at {formatCurrency(ms)}/mo</span>}
                  </div>
                </div>
              );
            })}

            {sav > 0 && (
              <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border/50">
                <div className="p-2.5 rounded-lg bg-primary/10"><Wallet className="h-5 w-5 text-primary" /></div>
                <div className="flex-1">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="font-semibold text-foreground">Current Savings</span>
                    <span className="text-lg font-bold text-foreground">{formatCurrency(sav)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Covers ~{(sav / exp).toFixed(1)} months of expenses</p>
                </div>
              </div>
            )}
          </div>
        )}

        <ExploreMoreTools currentPath="/tools/emergency-fund-calculator" />

        <div className="text-center pt-4 border-t border-border/50">
          <p className="text-muted-foreground text-sm mb-4">Build your emergency fund with automatic savings tracking in Safe Spend.</p>
          <Button asChild size="lg"><CtaLink location="tool_emergency">Start Tracking with Safe Spend<ArrowRight className="ml-2 h-4 w-4" /></CtaLink></Button>
        </div>
      </div>
      <FinancialDisclaimer context="These targets are estimates based on the expenses you entered" />
    </LegalLayout>
  );
};

export default EmergencyFundCalculator;
