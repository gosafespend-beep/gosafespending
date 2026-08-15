import { useState } from "react";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CtaLink } from "@/components/ui/CtaLink";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { motion } from "framer-motion";
import { track } from "@/lib/analytics";

/*
 * Pricing (CRO-5).
 *
 * Previously three cards -- Free Trial, Monthly, Annual -- which implied three
 * decisions when there is one product with a billing-period choice, and all
 * three CTAs led to the same plan-less URL, discarding intent at the moment it
 * peaked. Annual also listed "Priority support" despite it already appearing
 * in Monthly, which made the tier look padded and undercut the honest saving.
 *
 * Now one plan with a billing toggle defaulting to annual, and the trial
 * framed as how everyone starts. The saving is real and unchanged:
 * 12 x 9.99 = 119.88; less 89.99 = 29.89, or 24.9%.
 */

const MONTHLY_PRICE = 9.99;
const ANNUAL_PRICE = 89.99;
const ANNUAL_SAVING = +(MONTHLY_PRICE * 12 - ANNUAL_PRICE).toFixed(2);
const ANNUAL_SAVING_PCT = Math.round(
  (ANNUAL_SAVING / (MONTHLY_PRICE * 12)) * 100,
);

const features = [
  "Unlimited transactions and accounts",
  "AI-powered categorization",
  "Budgets with needs vs wants and rollover",
  "Savings goals and debt payoff planner",
  "Net worth tracking and reports",
  "Bill reminders and recurring transactions",
  "PDF and CSV exports",
  "Works offline (PWA)",
];

export const Pricing = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [billing, setBilling] = useState<"monthly" | "annual">("annual");

  const isAnnual = billing === "annual";
  const price = isAnnual ? ANNUAL_PRICE : MONTHLY_PRICE;
  const period = isAnnual ? "/year" : "/month";

  const selectBilling = (next: "monthly" | "annual") => {
    setBilling(next);
    track("plan_selected", { plan: next });
  };

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className={`scroll-anim text-center max-w-2xl mx-auto mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full">
            Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Simple, <span className="gradient-text">Transparent</span> Pricing
          </h2>
          {/* Anchored against the exact waste the product is designed to
              surface, rather than left to compete with free spreadsheets. */}
          <p className="text-lg text-muted-foreground">
            ${MONTHLY_PRICE} a month — less than one subscription you forgot you
            were paying for. Seven days free, no card, cancel anytime.
          </p>
        </div>

        {/* Billing toggle */}
        <div
          className="flex justify-center mb-10"
          role="group"
          aria-label="Billing period"
        >
          <div className="inline-flex items-center p-1 rounded-full bg-card border border-border/50">
            <button
              type="button"
              onClick={() => selectBilling("monthly")}
              aria-pressed={!isAnnual}
              className={`px-5 py-2.5 min-h-[44px] rounded-full text-sm font-medium transition-colors ${
                !isAnnual
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => selectBilling("annual")}
              aria-pressed={isAnnual}
              className={`px-5 py-2.5 min-h-[44px] rounded-full text-sm font-medium transition-colors inline-flex items-center gap-2 ${
                isAnnual
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Annual
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  isAnnual
                    ? "bg-primary-foreground/20"
                    : "bg-primary/10 text-primary"
                }`}
              >
                Save {ANNUAL_SAVING_PCT}%
              </span>
            </button>
          </div>
        </div>

        <motion.div
          className="max-w-md mx-auto rounded-2xl p-8 bg-card border border-primary/50 shadow-lg shadow-primary/10 relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
              <Sparkles className="h-3 w-3" aria-hidden="true" />
              Starts with 7 days free
            </span>
          </div>

          <div className="mb-6 text-center pt-2">
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Safe Spend
            </h3>
            <div className="flex items-baseline justify-center gap-1">
              <span
                className="text-5xl font-bold text-foreground"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                ${price}
              </span>
              <span className="text-muted-foreground text-sm">{period}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {isAnnual
                ? `Saves $${ANNUAL_SAVING} a year versus monthly billing.`
                : "Switch to annual any time and save."}
            </p>
          </div>

          <ul className="space-y-3 mb-8">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-sm">
                <Check
                  className="h-4 w-4 text-primary mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                <span className="text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>

          <Button
            asChild
            className="w-full h-12 btn-ripple bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {/* Carries the chosen plan through, so the app can preselect it
                instead of asking the visitor to decide twice. */}
            <CtaLink location="pricing" plan={billing}>
              Start free — no card needed
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </CtaLink>
          </Button>
        </motion.div>

        <motion.div
          className="text-center mt-8 space-y-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-sm text-muted-foreground">
            ✨ Cancel anytime · No hidden fees · Nothing charged during the trial
          </p>
          <p className="text-xs text-muted-foreground/70">
            After the trial your data stays — read-only access until you
            subscribe, and nothing is ever deleted. Payments via Paystack
            (cards, bank transfers, mobile money).
          </p>
        </motion.div>
      </div>
    </section>
  );
};
