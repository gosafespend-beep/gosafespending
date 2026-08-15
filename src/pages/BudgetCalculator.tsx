import { useState } from "react";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, PiggyBank, ShoppingBag, Home } from "lucide-react";
import { BudgetCalculatorSchema } from "@/components/seo/BudgetCalculatorSchema";
import { ExploreMoreTools } from "@/components/shared/ExploreMoreTools";
import { FinancialDisclaimer } from "@/components/shared/FinancialDisclaimer";
import { CtaLink } from "@/components/ui/CtaLink";


const categories = [
  {
    label: "Needs",
    percentage: 50,
    icon: Home,
    color: "text-primary",
    bgColor: "bg-primary/10",
    description: "Housing, utilities, groceries, insurance, transportation",
  },
  {
    label: "Wants",
    percentage: 30,
    icon: ShoppingBag,
    color: "text-accent",
    bgColor: "bg-accent/10",
    description: "Dining out, entertainment, hobbies, subscriptions",
  },
  {
    label: "Savings",
    percentage: 20,
    icon: PiggyBank,
    color: "text-green-400",
    bgColor: "bg-green-400/10",
    description: "Emergency fund, retirement, debt payoff, investments",
  },
];

const BudgetCalculator = () => {
  const [income, setIncome] = useState("");

  const numericIncome = parseFloat(income.replace(/,/g, "")) || 0;

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(value);

  return (
    <LegalLayout title="50/30/20 Budget Calculator" lastUpdated="February 2026">
      <BudgetCalculatorSchema />
      <div className="max-w-lg mx-auto">
        <p className="text-muted-foreground text-base mb-8 leading-relaxed">
          The 50/30/20 rule is a simple budgeting method: spend 50% of your after-tax income on needs, 30% on wants, and put 20% toward savings and debt repayment.
        </p>

        <div className="mb-8">
          <Label htmlFor="income" className="text-foreground text-base mb-2 block">
            Monthly After-Tax Income
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
            <Input
              id="income"
              type="text"
              inputMode="numeric"
              placeholder="4,000"
              value={income}
              onChange={(e) => setIncome(e.target.value.replace(/[^0-9.,]/g, ""))}
              className="pl-7 text-lg h-12"
            />
          </div>
        </div>

        {numericIncome > 0 && (
          <div className="space-y-4 mb-10">
            {categories.map((cat) => {
              const amount = (numericIncome * cat.percentage) / 100;
              return (
                <div
                  key={cat.label}
                  className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border/50"
                >
                  <div className={`p-2.5 rounded-lg ${cat.bgColor}`}>
                    <cat.icon className={`h-5 w-5 ${cat.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="font-semibold text-foreground">{cat.label} ({cat.percentage}%)</span>
                      <span className="text-lg font-bold text-foreground">{formatCurrency(amount)}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{cat.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <ExploreMoreTools currentPath="/tools/budget-calculator" />

        <div className="text-center pt-4 border-t border-border/50">
          <p className="text-muted-foreground text-sm mb-4">
            Ready to put your budget into action?
          </p>
          <Button asChild size="lg">
            <CtaLink location="tool_budget">
              Start Tracking with Safe Spend
              <ArrowRight className="ml-2 h-4 w-4" />
            </CtaLink>
          </Button>
        </div>
      </div>
      <FinancialDisclaimer context="This 50/30/20 split is a general guideline, not a plan tailored to you" />
    </LegalLayout>
  );
};

export default BudgetCalculator;
