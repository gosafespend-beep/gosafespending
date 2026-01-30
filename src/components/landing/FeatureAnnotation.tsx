import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FeatureAnnotationProps {
  children: ReactNode;
  position: { top?: string; bottom?: string; left?: string; right?: string };
  delay?: number;
}

export const FeatureAnnotation = ({ children, position, delay = 0 }: FeatureAnnotationProps) => {
  return (
    <motion.div
      className="absolute z-10 hidden lg:block"
      style={position}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, type: "spring" }}
    >
      <motion.div
        className="relative px-3 py-2 rounded-lg bg-card/90 backdrop-blur-sm border border-primary/30 shadow-lg shadow-primary/10 text-xs sm:text-sm text-foreground whitespace-nowrap"
        whileHover={{ scale: 1.05 }}
      >
        {children}
        {/* Pulse effect */}
        <motion.div
          className="absolute -inset-px rounded-lg border border-primary/50"
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </motion.div>
  );
};
