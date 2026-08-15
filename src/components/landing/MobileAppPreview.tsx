import { motion } from "framer-motion";
import { ShoppingCart, Coffee, Zap, Plus } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/*
 * Mobile product preview.
 *
 * The desktop DashboardMockup scales its whole layout down with
 * text-[0.4rem] and friends. Measured on the live site at a 320px viewport,
 * that produced 65 text nodes below 9px -- section labels at 4px -- so on the
 * majority of traffic the only product visualisation on the page was an
 * unreadable smear.
 *
 * Rather than shrink more, this shows less: one screen, at a size people can
 * actually read. Nothing here renders below 11px.
 *
 * NOTE: a real screenshot of the app would be better still. This is a faithful
 * mock, not a capture, and should be swapped for the genuine article once
 * screenshots are available.
 */

const transactions = [
  { icon: ShoppingCart, name: "Grocery Store", category: "Groceries", amount: "-$85.40" },
  { icon: Coffee, name: "Coffee Shop", category: "Dining", amount: "-$12.50" },
  { icon: Zap, name: "Electric Bill", category: "Utilities", amount: "-$145.00" },
];

const budgets = [
  { name: "Groceries", used: 62, spent: "$310", limit: "$500" },
  { name: "Dining out", used: 88, spent: "$176", limit: "$200" },
  { name: "Transport", used: 34, spent: "$51", limit: "$150" },
];

export const MobileAppPreview = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className="mx-auto w-full max-w-[300px] rounded-[2rem] border-[6px] border-[hsl(200,25%,16%)] bg-[hsl(200,25%,8%)] overflow-hidden shadow-2xl"
      role="img"
      aria-label="Safe Spend on mobile, showing this month's spending, budget progress and recent transactions"
    >
      {/* Status bar */}
      <div className="flex items-center justify-between px-4 pt-3 pb-2 text-[11px] text-muted-foreground">
        <span>9:41</span>
        <span className="h-1.5 w-16 rounded-full bg-[hsl(200,25%,16%)]" />
        <span>100%</span>
      </div>

      <div className="px-4 pb-5" aria-hidden="true">
        <p className="text-[12px] text-muted-foreground">Spent this month</p>
        <p className="text-[26px] font-bold text-foreground leading-tight">
          $1,842<span className="text-muted-foreground text-[16px]">.30</span>
        </p>
        <p className="text-[12px] text-primary mb-4">$658 left of your budget</p>

        {/* Budgets */}
        <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">
          Budgets
        </p>
        <div className="space-y-2.5 mb-5">
          {budgets.map((budget, index) => (
            <div key={budget.name}>
              <div className="flex justify-between text-[12px] mb-1">
                <span className="text-foreground">{budget.name}</span>
                <span className="text-muted-foreground">
                  {budget.spent} / {budget.limit}
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-[hsl(200,25%,16%)] overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${
                    budget.used > 85 ? "bg-amber-400" : "bg-primary"
                  }`}
                  initial={prefersReducedMotion ? false : { width: 0 }}
                  whileInView={{ width: `${budget.used}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  style={prefersReducedMotion ? { width: `${budget.used}%` } : undefined}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Recent transactions */}
        <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">
          Recent
        </p>
        <div className="space-y-2.5">
          {transactions.map((tx) => (
            <div key={tx.name} className="flex items-center gap-3">
              <span className="inline-flex p-2 rounded-lg bg-[hsl(200,25%,14%)] shrink-0">
                <tx.icon className="h-3.5 w-3.5 text-primary" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[13px] text-foreground truncate">
                  {tx.name}
                </span>
                <span className="block text-[11px] text-muted-foreground">
                  {tx.category}
                </span>
              </span>
              <span className="text-[13px] text-foreground tabular-nums">
                {tx.amount}
              </span>
            </div>
          ))}
        </div>

        {/* Add button — the daily action the product depends on */}
        <div className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-[13px] font-medium text-primary-foreground">
          <Plus className="h-4 w-4" />
          Add transaction
        </div>
      </div>
    </div>
  );
};
