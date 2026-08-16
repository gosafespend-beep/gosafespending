import { UserPlus, LineChart, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/*
 * "Sign Up" / "Get Dashboard" / "Reach Goals" described any SaaS product on
 * the internet, and it answered the wrong question. The objection to a
 * manual-entry app is not "is signup hard?" -- it is "will I actually keep
 * doing this?".
 *
 * So these steps describe the daily habit rather than the onboarding funnel,
 * and name the real cost up front. An honest expectation the trial can meet
 * is worth more than a lower one it cannot.
 */
const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Start without handing over anything",
    description:
      "No bank login, no card, no account numbers. An email address and a password is the whole setup, and you're looking at your first budget in under two minutes.",
    details: ["No bank connection", "No card for the trial", "Nothing to revoke later"],
  },
  {
    icon: Receipt,
    step: "02",
    title: "Log what you spend, in seconds",
    description:
      "Type an amount and a word or two. Safe Spend suggests the category from your description and your past spending, so most entries are two taps — and recurring bills log themselves.",
    details: ["About 30 seconds a day", "AI suggests the category", "Recurring bills automated"],
  },
  {
    icon: LineChart,
    step: "03",
    title: "Watch the picture sharpen",
    description:
      "After a week you can see where the money actually goes. After a month you can set budgets that match your real life instead of a guess, and watch your debt payoff date move closer.",
    details: ["Real numbers, not estimates", "Budgets from your own history", "Payoff dates that update"],
  },
];

export const HowItWorks = () => {
  const { ref, isVisible } = useScrollAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  return (
    <section id="how-it-works" ref={containerRef} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div
          ref={ref}
          className={`scroll-anim text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-accent bg-accent/10 rounded-full">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Get Started in <span className="gradient-text">3 Simple Steps</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            No complicated setup. No confusing spreadsheets. Just clarity.
          </p>
        </div>

        {/* Steps with animated timeline */}
        <div className="relative">
          {/* Animated progress line (desktop only) */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-1 bg-border/50">
            <motion.div
              className="h-full bg-gradient-to-r from-primary via-accent to-primary"
              style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
            />
          </div>

          {/* Vertical line (mobile only) */}
          <div className="md:hidden absolute left-8 top-0 bottom-0 w-0.5 bg-border/50">
            <motion.div
              className="w-full bg-gradient-to-b from-primary via-accent to-primary"
              style={{ scaleY: scrollYProgress, transformOrigin: "top", height: "100%" }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="relative md:text-center pl-20 md:pl-0"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                {/* Step number circle */}
                <motion.div 
                  className="absolute left-0 md:relative md:left-auto md:inline-flex items-center justify-center w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-primary to-accent mb-6 shadow-lg shadow-primary/20"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="absolute inset-1 rounded-full bg-background flex items-center justify-center">
                    <step.icon className="h-6 w-6 md:h-10 md:w-10 text-primary" />
                  </div>
                  
                  {/* Pulse ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-primary/50"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  />
                </motion.div>

                {/* Step badge */}
                <motion.div 
                  className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 text-xs font-semibold text-primary mb-3"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.3 }}
                >
                  STEP {step.step}
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed max-w-xs md:mx-auto mb-4">
                  {step.description}
                </p>

                {/* Detail list */}
                <ul className="space-y-2">
                  {step.details.map((detail, i) => (
                    <motion.li
                      key={i}
                      className="flex items-center gap-2 text-sm text-muted-foreground md:justify-center"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 + 0.4 + i * 0.1 }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {detail}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Button
            asChild
            size="lg"
            className="h-12 px-8 text-base bg-primary hover:bg-primary/90 text-primary-foreground btn-ripple"
          >
            <a href="https://app.gosafespend.com">
              Start Your Free Trial
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
