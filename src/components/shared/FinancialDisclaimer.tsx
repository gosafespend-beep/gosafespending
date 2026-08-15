import { Info } from "lucide-react";

/**
 * Standard disclaimer for the calculators.
 *
 * All four produce financial projections -- debt payoff dates, future
 * investment values -- that a visitor may act on, and none of them carried any
 * qualification. Its absence was conspicuous on a site that otherwise
 * foregrounds its own trustworthiness.
 *
 * Wording should be confirmed by counsel for the operating jurisdiction.
 */
export const FinancialDisclaimer = ({ context }: { context?: string }) => (
  <aside
    className="mt-8 flex gap-3 rounded-lg border border-border/50 bg-card/50 p-4"
    aria-label="Disclaimer"
  >
    <Info className="h-4 w-4 shrink-0 text-muted-foreground mt-0.5" aria-hidden="true" />
    <p className="text-xs leading-relaxed text-muted-foreground">
      <strong className="text-foreground">For illustration only.</strong>{" "}
      {context ?? "These figures are estimates based on the values you entered"}{" "}
      and assume those values stay constant. They ignore tax, fees, inflation
      and changes in rates or income, so real results will differ. This is not
      financial advice — Safe Spend is a tracking tool, not a licensed adviser.
      For decisions that matter, speak to a qualified professional.
    </p>
  </aside>
);
