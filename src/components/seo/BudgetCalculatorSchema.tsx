import { useEffect } from "react";

const BASE_URL = "https://gosafespend.com";

/**
 * HowTo JSON-LD schema for the Budget Calculator page
 */
export const BudgetCalculatorSchema = () => {
  useEffect(() => {
    const existing = document.querySelector('script[data-schema="budget-calculator"]');
    if (existing) existing.remove();

    const schema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to Calculate Your 50/30/20 Budget",
      description:
        "Use the 50/30/20 rule to split your after-tax income into needs, wants, and savings for a balanced budget.",
      step: [
        {
          "@type": "HowToStep",
          name: "Enter your monthly income",
          text: "Input your monthly after-tax income into the calculator.",
        },
        {
          "@type": "HowToStep",
          name: "Review your budget breakdown",
          text: "See how your income splits into 50% needs, 30% wants, and 20% savings.",
        },
        {
          "@type": "HowToStep",
          name: "Start tracking your spending",
          text: "Use Safe Spend to track your actual spending against your budget.",
        },
      ],
      tool: {
        "@type": "HowToTool",
        name: "Safe Spend Budget Calculator",
      },
      totalTime: "PT1M",
      url: `${BASE_URL}/tools/budget-calculator`,
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-schema", "budget-calculator");
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return null;
};
