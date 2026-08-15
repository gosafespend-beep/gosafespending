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

/*
 * Comparison rows.
 *
 * The previous table had three problems. It marked "Savings goals tracking"
 * and "Net worth tracking" as only partial for YNAB and Monarch, when
 * goal-based targets are YNAB's central mechanic and both do net worth --
 * claims that are not defensible. It asserted competitors have no data
 * privacy at all, which is comparative advertising you would have to
 * substantiate. And it named Mint, which Intuit shut down in 2024, so
 * informed readers discounted the whole table -- including the rows that are
 * true and genuinely valuable.
 *
 * What remains is only what can be checked against each competitor's current
 * public documentation. The privacy rows win this comparison on their own;
 * every inaccurate row was weakening them.
 */
const rows: ComparisonRow[] = [
  { feature: "Works without your bank login", safeSpend: true, spreadsheets: true, otherApps: false },
  { feature: "No third-party data aggregator involved", safeSpend: true, spreadsheets: true, otherApps: false },
  { feature: "You choose exactly what data exists", safeSpend: true, spreadsheets: true, otherApps: false },
  { feature: "Free trial without a card", safeSpend: true, spreadsheets: true, otherApps: "partial" },
  { feature: "Keeps read-only access if you stop paying", safeSpend: true, spreadsheets: true, otherApps: "partial" },
  { feature: "Dashboard and charts built in", safeSpend: true, spreadsheets: false, otherApps: true },
  { feature: "AI-assisted categorization", safeSpend: true, spreadsheets: false, otherApps: true },
  { feature: "Debt payoff planner", safeSpend: true, spreadsheets: false, otherApps: true },
  { feature: "Works offline (PWA)", safeSpend: true, spreadsheets: "partial", otherApps: "partial" },
  { feature: "Mobile money and bank transfer payments", safeSpend: true, spreadsheets: "partial", otherApps: false },
  { feature: "No formula errors to debug", safeSpend: true, spreadsheets: false, otherApps: true },
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
          className={`scroll-anim text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${
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

        {/* The table scrolls horizontally below sm, but nothing signalled it,
            so at 320px the competitor column sat entirely offscreen and the
            section looked like a two-column table -- hiding the whole point. */}
        <p className="sm:hidden text-center text-xs text-muted-foreground mb-3">
          Swipe the table sideways to compare →
        </p>
        <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
          <motion.div
            className="rounded-xl border border-border/50 overflow-hidden bg-background min-w-[520px] sm:min-w-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Header */}
            <div className="grid grid-cols-4 gap-0 bg-card border-b border-border/50">
              <div className="p-4 text-sm font-medium text-muted-foreground">Feature</div>
              <div className="p-4 text-sm font-bold text-primary text-center bg-primary/5">Safe Spend</div>
              <div className="p-4 text-sm font-medium text-muted-foreground text-center">Spreadsheets</div>
              {/* Mint was discontinued by Intuit in 2024; naming it dated the
                  whole table. These are the current aggregator-based tools. */}
              <div className="p-4 text-sm font-medium text-muted-foreground text-center">YNAB, Monarch, etc.</div>
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
      </div>
    </section>
  );
};
