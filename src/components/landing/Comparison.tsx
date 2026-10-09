import { Check, Minus, X } from "lucide-react";

type Status = "yes" | "partial" | "no";

interface Row {
  feature: string;
  safeSpend: Status;
  spreadsheet: Status;
  bankApps: Status;
}

/*
 * Compares approaches, not named products.
 *
 * Naming competitors turns every cell into a claim that has to be checked
 * against that company's current product, and a table with one stale cell
 * discredits the rows that are true. These are the properties that follow
 * from how each kind of tool works, and the table is allowed to lose: bank
 * apps do import transactions automatically, and Safe Spend does not.
 */
const ROWS: Row[] = [
  { feature: "Works without your bank login", safeSpend: "yes", spreadsheet: "yes", bankApps: "no" },
  { feature: "No data aggregator between you and your bank", safeSpend: "yes", spreadsheet: "yes", bankApps: "no" },
  { feature: "Works with any bank, in any country", safeSpend: "yes", spreadsheet: "yes", bankApps: "partial" },
  { feature: "Transactions arrive automatically", safeSpend: "partial", spreadsheet: "no", bankApps: "yes" },
  { feature: "Scan receipts and import statements", safeSpend: "yes", spreadsheet: "no", bankApps: "partial" },
  { feature: "Safe-to-spend number after bills and goals", safeSpend: "yes", spreadsheet: "partial", bankApps: "partial" },
  { feature: "Budgets, goals, debt payoff and reports built in", safeSpend: "yes", spreadsheet: "no", bankApps: "yes" },
  { feature: "AI coach that knows your numbers", safeSpend: "yes", spreadsheet: "no", bankApps: "partial" },
  { feature: "No formulas to build or fix", safeSpend: "yes", spreadsheet: "no", bankApps: "yes" },
];

const LABEL: Record<Status, string> = { yes: "Yes", partial: "Partly", no: "No" };

const StatusCell = ({ status }: { status: Status }) => (
  <>
    {status === "yes" && <Check className="h-5 w-5 text-primary" aria-hidden="true" />}
    {status === "partial" && <Minus className="h-5 w-5 text-muted-foreground" aria-hidden="true" />}
    {status === "no" && <X className="h-5 w-5 text-destructive/60" aria-hidden="true" />}
    <span className="sr-only">{LABEL[status]}</span>
  </>
);

export const Comparison = () => (
  <section id="comparison" className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
    <div className="max-w-4xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full">
          Why Safe Spend?
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          Three ways to track money, <span className="gradient-text">compared fairly</span>
        </h2>
        <p className="text-lg text-muted-foreground">
          Bank-connected apps are the fastest to set up. Safe Spend is for
          people who would rather type less than trust a connection.
        </p>
      </div>

      <p className="sm:hidden text-center text-xs text-muted-foreground mb-3">
        Swipe the table sideways to compare →
      </p>
      <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
        <table className="w-full min-w-[520px] sm:min-w-0 text-left border border-border/50 rounded-xl overflow-hidden bg-background">
          <caption className="sr-only">
            Comparison of Safe Spend, spreadsheets and bank-connected budgeting apps
          </caption>
          <thead className="bg-card">
            <tr>
              <th scope="col" className="p-4 text-sm font-medium text-muted-foreground">
                Feature
              </th>
              <th scope="col" className="p-4 text-sm font-bold text-primary text-center bg-primary/5">
                Safe Spend
              </th>
              <th scope="col" className="p-4 text-sm font-medium text-muted-foreground text-center">
                Spreadsheet
              </th>
              <th scope="col" className="p-4 text-sm font-medium text-muted-foreground text-center">
                Bank-connected apps
              </th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.feature} className="border-t border-border/30 hover:bg-card/50 transition-colors">
                <th scope="row" className="p-4 text-sm font-normal text-foreground">
                  {row.feature}
                </th>
                <td className="p-4 bg-primary/5">
                  <span className="flex justify-center"><StatusCell status={row.safeSpend} /></span>
                </td>
                <td className="p-4">
                  <span className="flex justify-center"><StatusCell status={row.spreadsheet} /></span>
                </td>
                <td className="p-4">
                  <span className="flex justify-center"><StatusCell status={row.bankApps} /></span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-xs text-center text-muted-foreground/80">
        A general comparison of approaches; individual products differ. Reviewed October 2026.
      </p>
    </div>
  </section>
);
