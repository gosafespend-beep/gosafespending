import {
  Wallet,
  PieChart,
  Target,
  CreditCard,
  TrendingUp,
  Calendar,
  BarChart3,
  Sparkles,
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { motion } from "framer-motion";

const features = [
  {
    icon: Wallet,
    title: "Expense Tracking",
    description: "Automatically categorize and track every transaction. Know exactly where your money goes.",
    color: "text-primary",
    bg: "bg-primary/10",
    stat: "100%",
    statLabel: "visibility",
  },
  {
    icon: PieChart,
    title: "Smart Budgeting",
    description: "Get personalized 50/30/20 budget suggestions based on your income and spending patterns.",
    color: "text-accent",
    bg: "bg-accent/10",
    stat: "50/30/20",
    statLabel: "rule",
  },
  {
    icon: Target,
    title: "Savings Goals",
    description: "Set goals for vacation, emergency fund, or anything else. Watch your progress grow.",
    color: "text-primary",
    bg: "bg-primary/10",
    stat: "∞",
    statLabel: "goals",
  },
  {
    icon: CreditCard,
    title: "Debt Payoff Planner",
    description: "Strategically eliminate debt with snowball or avalanche methods. See your payoff date.",
    color: "text-accent",
    bg: "bg-accent/10",
    stat: "2x",
    statLabel: "faster payoff",
  },
  {
    icon: TrendingUp,
    title: "Net Worth Dashboard",
    description: "Track assets and liabilities over time. Visualize your complete financial picture.",
    color: "text-primary",
    bg: "bg-primary/10",
    stat: "360°",
    statLabel: "view",
  },
  {
    icon: Calendar,
    title: "Bill Calendar",
    description: "Never miss a payment. Get reminders for upcoming bills and subscriptions.",
    color: "text-accent",
    bg: "bg-accent/10",
    stat: "0",
    statLabel: "missed bills",
  },
  {
    icon: BarChart3,
    title: "Reports & Analytics",
    description: "Beautiful charts and insights that help you understand your money habits.",
    color: "text-primary",
    bg: "bg-primary/10",
    stat: "12+",
    statLabel: "report types",
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

export const Features = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div
          ref={ref}
          className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${
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
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={`group p-6 bg-background rounded-xl border border-border/50 transition-all duration-500 card-glow cursor-default`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                y: -5,
                boxShadow: "0 20px 40px -20px hsl(var(--primary) / 0.2)",
              }}
            >
              {/* Icon with animation */}
              <motion.div 
                className={`inline-flex p-3 rounded-lg ${feature.bg} mb-4`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <feature.icon className={`h-6 w-6 ${feature.color}`} />
              </motion.div>
              
              {/* Title */}
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              
              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {feature.description}
              </p>

              {/* Stat badge */}
              <div className="flex items-baseline gap-1 pt-4 border-t border-border/50">
                <span className={`text-2xl font-bold ${feature.color}`}>{feature.stat}</span>
                <span className="text-xs text-muted-foreground">{feature.statLabel}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
