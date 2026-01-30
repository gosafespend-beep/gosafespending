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
      className="bg-card border border-border rounded-lg p-1 sm:p-1.5 md:p-2 flex flex-col h-full"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-0.5 sm:mb-1">
        <div className="min-w-0">
          <p className="font-medium text-foreground text-[0.3rem] sm:text-[0.4rem] md:text-[0.5rem] truncate">Spending Trend</p>
          <p className="text-muted-foreground text-[0.2rem] sm:text-[0.3rem] md:text-[0.35rem] hidden sm:block">Last 7 days</p>
        </div>
        <p className="font-bold text-primary text-[0.35rem] sm:text-[0.5rem] md:text-[0.6rem] flex-shrink-0">$2,340</p>
      </div>

      {/* CSS Sparkline Chart */}
      <div className="flex-1 flex items-end gap-[1px] sm:gap-[2px] min-h-[16px] sm:min-h-[20px] md:min-h-[28px]">
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
