import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// CSS sparkline bar heights (percentages)
const sparkBars = [35, 55, 45, 70, 60, 80, 50, 65, 75, 90];

interface SpendingTrendCardProps {
  isInView: boolean;
}

export const SpendingTrendCard = ({ isInView }: SpendingTrendCardProps) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: 0.5 }}
      className="bg-card border border-border rounded-lg p-1.5 sm:p-2 flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <div>
          <p className="font-medium text-foreground text-[0.4rem] sm:text-[0.5rem]">Spending Trend</p>
          <p className="text-muted-foreground text-[0.3rem] sm:text-[0.35rem]">Last 7 days</p>
        </div>
        <p className="font-bold text-primary text-[0.5rem] sm:text-[0.6rem]">$2,340</p>
      </div>

      {/* CSS Sparkline Chart */}
      <div className="flex-1 flex items-end gap-[2px] min-h-[20px] sm:min-h-[28px]">
        {sparkBars.map((height, index) => (
          <motion.div
            key={index}
            initial={prefersReducedMotion ? { height: `${height}%` } : { height: 0 }}
            animate={isInView ? { height: `${height}%` } : {}}
            transition={{ duration: 0.6, delay: 0.6 + index * 0.05 }}
            className="flex-1 bg-primary/70 rounded-t-[1px]"
          />
        ))}
      </div>
    </motion.div>
  );
};
