import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { APP_URL } from "@/lib/constants";

const benefits = [
  "Track every expense and income in seconds",
  "Build budgets that actually work for your life",
  "Crush debt and grow savings with smart tools",
];

export const FinalCTA = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-card/50 to-background relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        className="max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
          Your Financial Future{" "}
          <span className="gradient-text">Starts Today</span>
        </h2>

        <ul className="flex flex-col gap-3 mb-8 max-w-md mx-auto">
          {benefits.map((benefit) => (
            <li key={benefit} className="flex items-center gap-3 text-left">
              <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
              <span className="text-muted-foreground">{benefit}</span>
            </li>
          ))}
        </ul>

        <Button
          asChild
          size="lg"
          className="h-14 px-10 text-lg bg-primary hover:bg-primary/90 text-primary-foreground btn-ripple"
        >
          <a href={APP_URL}>
            Try Safe Spend Free
            <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
          </a>
        </Button>

        <p className="mt-4 text-sm text-muted-foreground">
          No credit card required. 7-day free trial.
        </p>
      </motion.div>
    </section>
  );
};
