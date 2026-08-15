import { useState } from "react";
import {
  Wallet,
  PieChart,
  Target,
  CreditCard,
  TrendingUp,
  Calendar,
  BarChart3,
  Sparkles,
  Brain,
  Smartphone,
  RefreshCw,
  Globe,
  ChevronDown,
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { motion, AnimatePresence } from "framer-motion";
import { CtaLink } from "@/components/ui/CtaLink";

const features = [
  {
    icon: Wallet,
    title: "Expense Tracking",
    description: "Easily log and categorize your transactions. Know exactly where your money goes.",
    color: "text-primary",
    bg: "bg-primary/10",
    stat: "100%",
    statLabel: "visibility",
  },
  {
    icon: Brain,
    title: "AI Categorization",
    description: "Smart auto-categorization powered by AI. Spend less time logging, more time living.",
    color: "text-accent",
    bg: "bg-accent/10",
    stat: "AI",
    statLabel: "powered",
  },
  {
    icon: PieChart,
    title: "Smart Budgeting",
    description: "Needs vs Wants classification, budget rollover, and AI suggestions based on your spending history.",
    color: "text-primary",
    bg: "bg-primary/10",
    stat: "50/30/20",
    statLabel: "rule",
  },
  {
    icon: Target,
    title: "Savings Goals",
    description: "Set goals for vacation, emergency fund, or anything else. Watch your progress grow.",
    color: "text-accent",
    bg: "bg-accent/10",
    stat: "∞",
    statLabel: "goals",
  },
  {
    icon: CreditCard,
    title: "Debt Payoff Planner",
    description: "Eliminate debt with Snowball or Avalanche strategies. See your projected payoff date.",
    color: "text-primary",
    bg: "bg-primary/10",
    stat: "2x",
    statLabel: "faster payoff",
  },
  {
    icon: TrendingUp,
    title: "Net Worth Dashboard",
    description: "Track assets and liabilities with snapshots over time. Visualize your complete financial picture.",
    color: "text-accent",
    bg: "bg-accent/10",
    stat: "360°",
    statLabel: "view",
  },
  {
    icon: Calendar,
    title: "Bill Calendar",
    description: "Never miss a payment. Get email reminders for upcoming bills and subscriptions.",
    color: "text-primary",
    bg: "bg-primary/10",
    stat: "0",
    statLabel: "missed bills",
  },
  {
    icon: BarChart3,
    title: "Reports & Analytics",
    description: "Cash flow forecasts, year-over-year comparisons, and drilldown charts for deep insights.",
    color: "text-accent",
    bg: "bg-accent/10",
    stat: "12+",
    statLabel: "report types",
  },
  {
    icon: Smartphone,
    title: "Install Anywhere (PWA)",
    description: "Install on iPhone, Android, or desktop. Works offline — no app store needed.",
    color: "text-primary",
    bg: "bg-primary/10",
    stat: "3+",
    statLabel: "platforms",
  },
  {
    icon: Globe,
    title: "Multi-Currency",
    description: "Track finances across multiple currencies. Perfect for travelers and global citizens.",
    color: "text-accent",
    bg: "bg-accent/10",
    stat: "🌍",
    statLabel: "global",
  },
  {
    icon: RefreshCw,
    title: "Recurring Transactions",
    description: "Automate repeating expenses and income. Set it once, track it forever.",
    color: "text-primary",
    bg: "bg-primary/10",
    stat: "∞",
    statLabel: "automation",
  },
  {
    icon: Sparkles,
    title: "Financial Health Score",
    description: "Get a personalized score based on your savings rate, debt ratio, and spending habits.",
    color: "text-accent",
    bg: "bg-accent/10",
    stat: "850",
    statLabel: "max score",
  },
];

const INITIAL_COUNT = 8;

export const Features = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [showAll, setShowAll] = useState(false);

  const visibleFeatures = showAll ? features : features.slice(0, INITIAL_COUNT);

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div
          ref={ref}
          className={`scroll-anim text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full">
            Features
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Everything You Need to{" "}
            <span className="gradient-text">Master Your Money</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Powerful features designed for real people, not financial experts.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {visibleFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="group p-6 bg-background rounded-xl border border-border/50 transition-all duration-500 card-glow cursor-default"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 20px 40px -20px hsl(var(--primary) / 0.2)",
                }}
                layout
              >
                <motion.div 
                  className={`inline-flex p-3 rounded-lg ${feature.bg} mb-4`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </motion.div>
                
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {feature.description}
                </p>

                <div className="flex items-baseline gap-1 pt-4 border-t border-border/50">
                  <span className={`text-2xl font-bold ${feature.color}`}>{feature.stat}</span>
                  <span className="text-xs text-muted-foreground">{feature.statLabel}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Show all / Show less toggle */}
        {features.length > INITIAL_COUNT && (
          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border/50 hover:border-primary/30 text-muted-foreground hover:text-foreground font-medium transition-all"
            >
              {showAll ? "Show less" : `Show all ${features.length} features`}
              <motion.span
                animate={{ rotate: showAll ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="h-4 w-4" />
              </motion.span>
            </button>
          </motion.div>
        )}

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <CtaLink location="features"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-colors btn-ripple"
          >
            See All Features in Action
            <span aria-hidden="true">→</span>
          </CtaLink>
        </motion.div>
      </div>
    </section>
  );
};
