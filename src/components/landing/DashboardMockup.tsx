import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  ArrowRight,
} from "lucide-react";

// Animated counter hook
const useCountUp = (end: number, duration: number = 2000, inView: boolean) => {
  const [count, setCount] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion) {
      setCount(end);
      return;
    }

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, inView, prefersReducedMotion]);

  return count;
};

// Format number with commas
const formatNumber = (num: number) => {
  return num.toLocaleString("en-US");
};

// Stats data
const statsData = [
  { label: "BALANCE", value: 48715, icon: Wallet, trend: null, color: "text-primary" },
  { label: "INCOME", value: 217215, icon: TrendingUp, trend: "+0%", color: "text-emerald-400" },
  { label: "EXPENSES", value: 168500, icon: TrendingDown, trend: "-0%", color: "text-red-400" },
  { label: "NET", value: 48715, icon: PiggyBank, trend: "+0%", color: "text-primary" },
];

// Insights data
const insightsData: { type: "success" | "warning"; title: string; subtitle: string }[] = [
  { type: "success", title: "Healthy Savings", subtitle: "You're saving 22% of your income this month" },
  { type: "warning", title: "Rent expense Near Limit", subtitle: "100% of budget used" },
  { type: "warning", title: "Fixed account saving Near Limit", subtitle: "100% of budget used" },
  { type: "warning", title: "Groceries expense Near Limit", subtitle: "100% of budget used" },
];

// Spending categories for donut chart
const spendingCategories = [
  { name: "Fixed account saving", color: "#14b8a6", percent: 25 },
  { name: "Moms loan", color: "#06b6d4", percent: 20 },
  { name: "Rent expense", color: "#f59e0b", percent: 25 },
  { name: "Splendors loan", color: "#ef4444", percent: 15 },
  { name: "Splendors school fees", color: "#a855f7", percent: 15 },
];

// Budget items
const budgetItems = [
  { name: "Car loan expense", percent: 0, color: "bg-muted" },
  { name: "Electricity expense", percent: 67, color: "bg-amber-500" },
  { name: "Fixed account saving", percent: 100, color: "bg-red-500" },
  { name: "Groceries expense", percent: 100, color: "bg-red-500" },
];

// Recent transactions
const transactions = [
  { date: "30/01", type: "income", category: "essaypro payments", desc: "Payments from Essaypro", amount: 30000 },
  { date: "29/01", type: "expense", category: "Other", desc: "Debt payment: Kenya Police Sacco", amount: -2500 },
  { date: "25/01", type: "expense", category: "Moms loan", desc: "Paid 25,000 on KCB Loan expense", amount: -25000 },
  { date: "25/01", type: "expense", category: "Splendors school fees", desc: "Paid 5,000 for Splendors School Fees", amount: -10000 },
];

export const DashboardMockup = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="w-full aspect-[16/11] bg-[hsl(200,25%,8%)] rounded-lg overflow-hidden flex flex-col text-[0.35rem] sm:text-[0.45rem] md:text-[0.55rem] lg:text-[0.65rem] p-2 sm:p-3 md:p-4"
    >
      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-1.5 sm:gap-2 mb-2 sm:mb-3">
        {statsData.map((stat, index) => (
          <StatCard
            key={stat.label}
            {...stat}
            isInView={isInView}
            delay={index * 100}
          />
        ))}
      </div>

      {/* Insights Section */}
      <div className="bg-card/50 rounded-lg p-1.5 sm:p-2 mb-2 sm:mb-3 border border-border">
        <div className="flex items-center gap-1 mb-1.5">
          <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-primary" />
          <span className="font-medium text-foreground">Insights</span>
        </div>
        <div className="space-y-1">
          {insightsData.map((insight, index) => (
            <InsightRow key={index} {...insight} isInView={isInView} delay={200 + index * 50} />
          ))}
        </div>
      </div>

      {/* Middle Section - 3 Columns */}
      <div className="grid grid-cols-3 gap-1.5 sm:gap-2 mb-2 sm:mb-3 flex-1 min-h-0">
        {/* Spending by Category - Donut Chart */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="bg-card rounded-lg p-1.5 sm:p-2 border border-border"
        >
          <h3 className="font-medium text-foreground mb-1.5 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Spending by Category
          </h3>
          <div className="flex items-center gap-2">
            {/* Simple SVG Donut */}
            <div className="w-12 h-12 sm:w-16 sm:h-16 relative flex-shrink-0">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                {spendingCategories.map((cat, i) => {
                  const offset = spendingCategories.slice(0, i).reduce((acc, c) => acc + c.percent, 0);
                  return (
                    <circle
                      key={cat.name}
                      cx="18"
                      cy="18"
                      r="14"
                      fill="none"
                      stroke={cat.color}
                      strokeWidth="6"
                      strokeDasharray={`${cat.percent} ${100 - cat.percent}`}
                      strokeDashoffset={-offset}
                      className="transition-all duration-1000"
                    />
                  );
                })}
              </svg>
            </div>
            {/* Legend */}
            <div className="space-y-0.5 overflow-hidden">
              {spendingCategories.map((cat) => (
                <div key={cat.name} className="flex items-center gap-1 truncate">
                  <span className="w-1.5 h-1.5 rounded-sm flex-shrink-0" style={{ backgroundColor: cat.color }} />
                  <span className="text-muted-foreground truncate">{cat.name}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Budget Status */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="bg-card rounded-lg p-1.5 sm:p-2 border border-border"
        >
          <h3 className="font-medium text-foreground mb-1.5 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Budget Status
          </h3>
          <div className="mb-2">
            <div className="flex justify-between text-muted-foreground mb-0.5">
              <span>Overall Budget</span>
              <span>Ksh 143,500 / Ksh 216,084</span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div className="h-full w-[66%] bg-primary rounded-full" />
            </div>
            <p className="text-muted-foreground mt-0.5">Ksh 72,584 remaining</p>
          </div>
          <div className="space-y-1">
            {budgetItems.map((item) => (
              <div key={item.name}>
                <div className="flex justify-between text-muted-foreground">
                  <span className="truncate">{item.name}</span>
                  <span>{item.percent}%</span>
                </div>
                <div className="h-1 bg-muted rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Column - Stacked Cards */}
        <div className="flex flex-col gap-1.5 sm:gap-2">
          {/* Balance After Bills */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.6 }}
            className="bg-card rounded-lg p-1.5 sm:p-2 border border-border flex-1"
          >
            <div className="flex items-center gap-1 text-muted-foreground mb-1">
              <Calendar className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
              <span>Balance After Bills</span>
              <span className="text-[0.3rem] sm:text-[0.4rem] bg-muted px-1 rounded">next 14 days</span>
            </div>
            <p className="text-red-400 font-bold text-[0.5rem] sm:text-[0.7rem]">-Ksh 20,500.00</p>
            <div className="flex items-center gap-1 mt-1 text-amber-500 bg-amber-500/10 rounded px-1 py-0.5">
              <AlertTriangle className="w-2 h-2" />
              <span className="truncate">Shortfall Alert: You'll be Ksh 20,500 short</span>
            </div>
          </motion.div>

          {/* Emergency Fund */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.65 }}
            className="bg-card rounded-lg p-1.5 sm:p-2 border border-border flex-1"
          >
            <div className="flex justify-between items-center mb-1">
              <span className="text-muted-foreground flex items-center gap-1">
                <PiggyBank className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
                Emergency Fund
              </span>
              <span className="text-primary text-[0.3rem] sm:text-[0.4rem] flex items-center gap-0.5 cursor-pointer">
                Get started <ArrowRight className="w-1.5 h-1.5" />
              </span>
            </div>
            <p className="text-foreground font-medium">Current: <span className="text-primary">Ksh 0.00</span></p>
          </motion.div>

          {/* Upcoming Bills */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.7 }}
            className="bg-card rounded-lg p-1.5 sm:p-2 border border-border flex-1"
          >
            <div className="flex items-center gap-1 text-muted-foreground mb-1">
              <Calendar className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
              <span>Upcoming Bills</span>
            </div>
            <div className="space-y-0.5">
              <div className="flex justify-between">
                <span className="text-foreground">Rent <span className="text-muted-foreground">Monthly</span></span>
                <span className="text-foreground">Ksh 15,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground">Water <span className="text-muted-foreground">Monthly</span></span>
                <span className="text-foreground">Ksh 1,000</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Recent Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.8 }}
        className="bg-card rounded-lg p-1.5 sm:p-2 border border-border"
      >
        <h3 className="font-medium text-foreground mb-1.5">Recent Transactions</h3>
        <div className="overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="text-muted-foreground border-b border-border">
                <th className="text-left py-0.5 font-medium">Date</th>
                <th className="text-left py-0.5 font-medium">Type</th>
                <th className="text-left py-0.5 font-medium">Category</th>
                <th className="text-left py-0.5 font-medium hidden sm:table-cell">Description</th>
                <th className="text-right py-0.5 font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, i) => (
                <tr key={i} className="border-b border-border/50 last:border-0">
                  <td className="py-0.5 text-muted-foreground">{tx.date}</td>
                  <td className="py-0.5">
                    <span className={`px-1 py-0.5 rounded text-[0.3rem] sm:text-[0.4rem] ${
                      tx.type === "income" 
                        ? "bg-emerald-500/20 text-emerald-400" 
                        : "bg-red-500/20 text-red-400"
                    }`}>
                      {tx.type}
                    </span>
                  </td>
                  <td className="py-0.5 text-foreground truncate max-w-[50px] sm:max-w-none">{tx.category}</td>
                  <td className="py-0.5 text-muted-foreground truncate max-w-[80px] hidden sm:table-cell">{tx.desc}</td>
                  <td className={`py-0.5 text-right font-medium ${tx.amount > 0 ? "text-emerald-400" : "text-red-400"}`}>
                    {tx.amount > 0 ? "+" : ""}Ksh {formatNumber(Math.abs(tx.amount))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

// Stat Card Component
interface StatCardProps {
  label: string;
  value: number;
  icon: React.ElementType;
  trend: string | null;
  color: string;
  isInView: boolean;
  delay: number;
}

const StatCard = ({ label, value, icon: Icon, trend, color, isInView, delay }: StatCardProps) => {
  const count = useCountUp(value, 2000, isInView);
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: delay / 1000 }}
      className="bg-card border border-border rounded-lg p-1.5 sm:p-2"
    >
      <div className="flex items-center justify-between mb-1">
        <p className="text-muted-foreground uppercase tracking-wider">{label}</p>
        <Icon className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${color}`} />
      </div>
      <p className={`font-bold text-[0.55rem] sm:text-[0.75rem] md:text-sm ${color}`}>
        Ksh {formatNumber(count)}.00
      </p>
      {trend && (
        <p className="text-muted-foreground mt-0.5">{trend}</p>
      )}
    </motion.div>
  );
};

// Insight Row Component
interface InsightRowProps {
  type: "success" | "warning";
  title: string;
  subtitle: string;
  isInView: boolean;
  delay: number;
}

const InsightRow = ({ type, title, subtitle, isInView, delay }: InsightRowProps) => {
  const prefersReducedMotion = useReducedMotion();
  const isSuccess = type === "success";

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, x: -10 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.3, delay: delay / 1000 }}
      className={`flex items-center gap-1.5 px-1.5 py-1 rounded-md ${
        isSuccess ? "bg-emerald-500/10 border border-emerald-500/30" : "bg-amber-500/10 border border-amber-500/30"
      }`}
    >
      {isSuccess ? (
        <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-500 flex-shrink-0" />
      ) : (
        <AlertTriangle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-500 flex-shrink-0" />
      )}
      <div className="min-w-0">
        <p className={`font-medium truncate ${isSuccess ? "text-emerald-500" : "text-amber-500"}`}>{title}</p>
        <p className={`truncate ${isSuccess ? "text-emerald-500/70" : "text-amber-500/70"}`}>{subtitle}</p>
      </div>
    </motion.div>
  );
};
