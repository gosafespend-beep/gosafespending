import { useEffect } from "react";

const BASE_URL = "https://gosafespend.com";

export const CompoundInterestSchema = () => {
  useEffect(() => {
    const existing = document.querySelector('script[data-schema="compound-interest"]');
    if (existing) existing.remove();

    const schema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to Calculate Compound Interest",
      description: "Use this free compound interest calculator to see how your savings and investments grow over time with compounding returns.",
      step: [
        { "@type": "HowToStep", name: "Enter your initial investment", text: "Input the amount you're starting with." },
        { "@type": "HowToStep", name: "Set monthly contributions", text: "Enter how much you plan to add each month." },
        { "@type": "HowToStep", name: "Choose your expected return rate", text: "Set the annual interest or return rate." },
        { "@type": "HowToStep", name: "Review your growth projection", text: "See your future value, total contributions, and interest earned over time." },
      ],
      tool: { "@type": "HowToTool", name: "Safe Spend Compound Interest Calculator" },
      totalTime: "PT1M",
      url: `${BASE_URL}/tools/compound-interest-calculator`,
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-schema", "compound-interest");
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => { script.remove(); };
  }, []);

  return null;
};
