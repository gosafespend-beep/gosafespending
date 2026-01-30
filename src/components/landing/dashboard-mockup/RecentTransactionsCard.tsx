import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// Mock transactions data
const recentTransactions = [
  { merchant: "Grocery Store", category: "Groceries", amount: -85.40, color: "bg-emerald-500" },
  { merchant: "Coffee Shop", category: "Dining", amount: -12.50, color: "bg-amber-500" },
  { merchant: "Electric Bill", category: "Utilities", amount: -145.00, color: "bg-blue-500" },
  { merchant: "Freelance Pay", category: "Income", amount: 1200.00, color: "bg-primary" },
  { merchant: "Gas Station", category: "Transport", amount: -52.30, color: "bg-purple-500" },
];

interface RecentTransactionsCardProps {
  isInView: boolean;
}

export const RecentTransactionsCard = ({ isInView }: RecentTransactionsCardProps) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: 0.55 }}
      className="bg-card border border-border rounded-lg p-1.5 sm:p-2 flex flex-col h-full"
    >
      {/* Header */}
      <p className="font-medium text-foreground text-[0.4rem] sm:text-[0.5rem] mb-1">Recent Transactions</p>

      {/* Transactions List */}
      <div className="flex-1 flex flex-col justify-between min-h-0">
        {recentTransactions.map((txn, index) => (
          <motion.div
            key={index}
            initial={prefersReducedMotion ? {} : { opacity: 0, x: -5 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
            className="flex items-center gap-1 py-0.5"
          >
            {/* Color dot */}
            <div className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full ${txn.color} flex-shrink-0`} />
            
            {/* Merchant & Category */}
            <div className="flex-1 min-w-0">
              <p className="text-foreground text-[0.35rem] sm:text-[0.4rem] truncate">{txn.merchant}</p>
              <p className="text-muted-foreground text-[0.25rem] sm:text-[0.3rem] truncate">{txn.category}</p>
            </div>

            {/* Amount */}
            <p className={`text-[0.35rem] sm:text-[0.4rem] font-medium flex-shrink-0 ${
              txn.amount > 0 ? "text-emerald-400" : "text-red-400"
            }`}>
              {txn.amount > 0 ? "+" : ""}${Math.abs(txn.amount).toFixed(2)}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
