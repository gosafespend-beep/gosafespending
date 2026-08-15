import { Link } from "react-router-dom";
import { ArrowRight, Calculator, TrendingUp, CreditCard, Umbrella } from "lucide-react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { track } from "@/lib/analytics";

/*
 * The four calculators were reachable only through a footer column and a nav
 * dropdown, despite being the site's strongest top-of-funnel assets -- they
 * target high-intent transactional queries and need no signup.
 */
const tools = [
  {
    icon: Calculator,
    title: "50/30/20 Budget Calculator",
    description: "Split your take-home pay into needs, wants and savings.",
    to: "/tools/budget-calculator",
  },
  {
    icon: CreditCard,
    title: "Debt Payoff Calculator",
    description: "Compare snowball and avalanche, and see your payoff date.",
    to: "/tools/debt-payoff-calculator",
  },
  {
    icon: Umbrella,
    title: "Emergency Fund Calculator",
    description: "Work out your 3, 6 and 9 month targets and how long they'll take.",
    to: "/tools/emergency-fund-calculator",
  },
  {
    icon: TrendingUp,
    title: "Compound Interest Calculator",
    description: "Project what regular saving turns into over time.",
    to: "/tools/compound-interest-calculator",
  },
];

export const FreeTools = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="tools"
      aria-labelledby="tools-heading"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full">
            Free tools
          </span>
          <h2
            id="tools-heading"
            className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
          >
            Try the math before you try the app
          </h2>
          <p className="text-lg text-muted-foreground">
            No signup, no email, no bank connection. Just answers.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.to}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06, duration: 0.4 }}
            >
              <Link
                to={tool.to}
                onClick={() => track("tool_link_click", { tool: tool.to })}
                className="group flex items-start gap-4 p-5 rounded-xl bg-card border border-border/50 hover:border-primary/40 transition-colors h-full"
              >
                <span className="inline-flex p-2.5 rounded-lg bg-primary/10 shrink-0">
                  <tool.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="flex items-center gap-1.5 font-semibold text-foreground">
                    {tool.title}
                    <ArrowRight
                      className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="block text-sm text-muted-foreground mt-1">
                    {tool.description}
                  </span>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
