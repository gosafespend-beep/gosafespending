import { useEffect } from "react";

const BASE_URL = "https://gosafespend.com";

export const DebtPayoffSchema = () => {
  useEffect(() => {
    const existing = document.querySelector('script[data-schema="debt-payoff"]');
    if (existing) existing.remove();

    const schema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to Calculate Your Debt Payoff Timeline",
      description: "Compare snowball vs avalanche debt repayment strategies to find the fastest, cheapest way to become debt-free.",
      step: [
        { "@type": "HowToStep", name: "Enter your debts", text: "Add each debt with its balance, interest rate, and minimum payment." },
        { "@type": "HowToStep", name: "Add extra payments", text: "Enter any additional monthly amount you can put toward debt." },
        { "@type": "HowToStep", name: "Compare strategies", text: "See how avalanche (highest rate) and snowball (smallest balance) methods differ in time and cost." },
      ],
      tool: { "@type": "HowToTool", name: "Safe Spend Debt Payoff Calculator" },
      totalTime: "PT2M",
      url: `${BASE_URL}/tools/debt-payoff-calculator`,
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-schema", "debt-payoff");
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => { script.remove(); };
  }, []);

  return null;
};
