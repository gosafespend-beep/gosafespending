import { Check, X, Minus } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { motion } from "framer-motion";

type FeatureStatus = true | false | "partial";

interface ComparisonRow {
  feature: string;
  safeSpend: FeatureStatus;
  spreadsheets: FeatureStatus;
  otherApps: FeatureStatus;
}

const rows: ComparisonRow[] = [
  { feature: "No bank connection required", safeSpend: true, spreadsheets: true, otherApps: false },
  { feature: "100% data privacy", safeSpend: true, spreadsheets: true, otherApps: false },
  { feature: "Free trial available", safeSpend: true, spreadsheets: true, otherApps: "partial" },
  { feature: "Beautiful dashboard & charts", safeSpend: true, spreadsheets: false, otherApps: true },
  { feature: "AI-powered categorization", safeSpend: true, spreadsheets: false, otherApps: "partial" },
  { feature: "Debt payoff planner", safeSpend: true, spreadsheets: false, otherApps: "partial" },
  { feature: "Savings goals tracking", safeSpend: true, spreadsheets: false, otherApps: "partial" },
  { feature: "Bill reminders", safeSpend: true, spreadsheets: false, otherApps: true },
  { feature: "Works offline (PWA)", safeSpend: true, spreadsheets: "partial", otherApps: "partial" },
  { feature: "Net worth tracking", safeSpend: true, spreadsheets: "partial", otherApps: "partial" },
  { feature: "Recurring transaction automation", safeSpend: true, spreadsheets: false, otherApps: "partial" },
  { feature: "Mobile friendly", safeSpend: true, spreadsheets: false, otherApps: true },
  { feature: "No formula errors", safeSpend: true, spreadsheets: false, otherApps: true },
];

const StatusIcon = ({ status }: { status: FeatureStatus }) => {
  if (status === true) return <Check className="h-5 w-5 text-primary" />;
  if (status === false) return <X className="h-5 w-5 text-destructive/60" />;
  return <Minus className="h-5 w-5 text-muted-foreground" />;
};

export const Comparison = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="comparison" className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
      <div className="max-w-5xl mx-auto">
        <div
          ref={ref}
          className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full">
            Why Safe Spend?
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            See How We <span className="gradient-text">Compare</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            The best budget app that doesn't require your bank login.
          </p>
        </div>

        <motion.div
          className="rounded-xl border border-border/50 overflow-hidden bg-background"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Header */}
          <div className="grid grid-cols-4 gap-0 bg-card border-b border-border/50">
            <div className="p-4 text-sm font-medium text-muted-foreground">Feature</div>
            <div className="p-4 text-sm font-bold text-primary text-center bg-primary/5">Safe Spend</div>
            <div className="p-4 text-sm font-medium text-muted-foreground text-center">Spreadsheets</div>
            <div className="p-4 text-sm font-medium text-muted-foreground text-center">Other Apps</div>
          </div>

          {/* Rows */}
          {rows.map((row, index) => (
            <motion.div
              key={row.feature}
              className="grid grid-cols-4 gap-0 border-b border-border/30 last:border-0 hover:bg-card/50 transition-colors"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.03 }}
            >
              <div className="p-4 text-sm text-foreground flex items-center">{row.feature}</div>
              <div className="p-4 flex justify-center items-center bg-primary/5">
                <StatusIcon status={row.safeSpend} />
              </div>
              <div className="p-4 flex justify-center items-center">
                <StatusIcon status={row.spreadsheets} />
              </div>
              <div className="p-4 flex justify-center items-center">
                <StatusIcon status={row.otherApps} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
