import { Link } from "react-router-dom";
import { Calculator, TrendingUp, CreditCard, Shield } from "lucide-react";

const allTools = [
  { path: "/tools/budget-calculator", label: "50/30/20 Budget", icon: Calculator },
  { path: "/tools/compound-interest-calculator", label: "Compound Interest", icon: TrendingUp },
  { path: "/tools/debt-payoff-calculator", label: "Debt Payoff", icon: CreditCard },
  { path: "/tools/emergency-fund-calculator", label: "Emergency Fund", icon: Shield },
];

interface ExploreMoreToolsProps {
  currentPath: string;
}

export const ExploreMoreTools = ({ currentPath }: ExploreMoreToolsProps) => {
  const otherTools = allTools.filter((t) => t.path !== currentPath);

  return (
    <div className="mb-8 pt-6 border-t border-border/50">
      <h3 className="text-sm font-semibold text-foreground mb-3">Explore More Free Tools</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {otherTools.map((tool) => (
          <Link
            key={tool.path}
            to={tool.path}
            className="flex items-center gap-2.5 p-3 rounded-lg bg-card border border-border/50 hover:border-primary/30 transition-colors group"
          >
            <div className="p-1.5 rounded-md bg-primary/10">
              <tool.icon className="h-4 w-4 text-primary" />
            </div>
            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
              {tool.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
