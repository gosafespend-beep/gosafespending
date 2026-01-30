import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface SidebarFooterProps {
  isInView: boolean;
}

export const SidebarFooter = ({ isInView }: SidebarFooterProps) => {
  const prefersReducedMotion = useReducedMotion();
  const budgetUsed = 68;
  const remaining = 420;

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.4, delay: 0.7 }}
      className="mt-auto pt-2 border-t border-[hsl(200,25%,18%)]"
    >
      {/* Monthly Budget */}
      <div className="mb-1.5">
        <div className="flex items-center justify-between mb-0.5">
          <p className="text-[0.35rem] sm:text-[0.4rem] text-muted-foreground">Monthly Budget</p>
          <p className="text-[0.35rem] sm:text-[0.4rem] text-foreground font-medium">{budgetUsed}%</p>
        </div>
        
        {/* Progress bar */}
        <div className="w-full h-1 bg-secondary rounded-full overflow-hidden">
          <motion.div
            initial={prefersReducedMotion ? { width: `${budgetUsed}%` } : { width: 0 }}
            animate={isInView ? { width: `${budgetUsed}%` } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="h-full bg-primary rounded-full"
          />
        </div>
        
        <p className="text-[0.3rem] sm:text-[0.35rem] text-primary mt-0.5">${remaining} remaining</p>
      </div>

      {/* Upgrade CTA */}
      <div className="hidden sm:block">
        <div className="bg-primary/10 border border-primary/20 rounded-md px-1.5 py-1 text-center">
          <p className="text-[0.35rem] text-primary font-medium">Upgrade to Pro</p>
        </div>
      </div>
    </motion.div>
  );
};
