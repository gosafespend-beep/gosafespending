import { Check, ArrowRight, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { motion } from "framer-motion";
import { APP_URL } from "@/lib/constants";

const plans = [
  {
    name: "Free Trial",
    price: "$0",
    period: "for 7 days",
    description: "Full access to everything. No credit card required.",
    features: [
      "All features unlocked",
      "Unlimited transactions",
      "AI-powered categorization",
      "Reports & analytics",
      "Savings goals & debt tracker",
      "Works offline (PWA)",
    ],
    cta: "Start Free Trial",
    highlighted: false,
    badge: null,
    isPrimaryCta: true,
  },
  {
    name: "Monthly",
    price: "$9.99",
    period: "/month",
    description: "Continue with full access after your trial ends.",
    features: [
      "Everything in Free Trial",
      "Unlimited accounts",
      "Net worth tracking",
      "Advanced analytics",
      "Priority support",
      "PDF & CSV reports",
    ],
    cta: "Choose Monthly",
    highlighted: false,
    badge: null,
    isPrimaryCta: false,
  },
  {
    name: "Annual",
    price: "$89.99",
    period: "/year",
    description: "Best value — save ~25% compared to monthly.",
    features: [
      "Everything in Monthly",
      "Save ~$30/year",
      "All future features included",
      "Priority support",
      "Extended data exports",
      "Early access to new features",
    ],
    cta: "Choose Annual",
    highlighted: true,
    badge: "Best Value",
    isPrimaryCta: false,
  },
];

export const Pricing = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          ref={ref}
          className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full">
            Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Simple, <span className="gradient-text">Transparent</span> Pricing
          </h2>
          <p className="text-lg text-muted-foreground">
            Start with a free 7-day trial. No credit card required. Cancel anytime.
          </p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`relative rounded-2xl p-8 border transition-all duration-300 ${
                plan.highlighted
                  ? "bg-card border-primary/50 shadow-lg shadow-primary/10"
                  : "bg-card/50 border-border/50 hover:border-border"
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              whileHover={{ y: -4 }}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                    <Sparkles className="h-3 w-3" />
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground text-sm">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                className={`w-full h-11 btn-ripple ${
                  plan.highlighted || plan.isPrimaryCta
                    ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                    : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                }`}
              >
                <a href={APP_URL}>
                  {plan.cta}
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Bottom notes */}
        <motion.div
          className="text-center mt-8 space-y-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-sm text-muted-foreground">
            ✨ Cancel anytime · No hidden fees · 7-day free trial on all plans
          </p>
          <p className="text-xs text-muted-foreground/70">
            After trial: read-only access until subscribed · Payments via Paystack (cards, bank transfers, mobile money)
          </p>
        </motion.div>
      </div>
    </section>
  );
};
