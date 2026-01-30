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

const features = [
  {
    icon: Wallet,
    title: "Expense Tracking",
    description: "Automatically categorize and track every transaction. Know exactly where your money goes.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: PieChart,
    title: "Smart Budgeting",
    description: "Get personalized 50/30/20 budget suggestions based on your income and spending patterns.",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    icon: Target,
    title: "Savings Goals",
    description: "Set goals for vacation, emergency fund, or anything else. Watch your progress grow.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: CreditCard,
    title: "Debt Payoff Planner",
    description: "Strategically eliminate debt with snowball or avalanche methods. See your payoff date.",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    icon: TrendingUp,
    title: "Net Worth Dashboard",
    description: "Track assets and liabilities over time. Visualize your complete financial picture.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Calendar,
    title: "Bill Calendar",
    description: "Never miss a payment. Get reminders for upcoming bills and subscriptions.",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    icon: BarChart3,
    title: "Reports & Analytics",
    description: "Beautiful charts and insights that help you understand your money habits.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Sparkles,
    title: "Financial Health Score",
    description: "Get a personalized score based on your savings rate, debt ratio, and spending habits.",
    color: "text-accent",
    bg: "bg-accent/10",
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
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Everything You Need to{" "}
            <span className="text-primary">Master Your Money</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Powerful features designed for real people, not financial experts.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group p-6 bg-background rounded-xl border border-border/50 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: isVisible ? `${index * 75}ms` : "0ms" }}
            >
              <div className={`inline-flex p-3 rounded-lg ${feature.bg} mb-4`}>
                <feature.icon className={`h-6 w-6 ${feature.color}`} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
