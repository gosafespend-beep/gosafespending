import { useEffect } from "react";

const BASE_URL = "https://gosafespend.com";

export const EmergencyFundSchema = () => {
  useEffect(() => {
    const existing = document.querySelector('script[data-schema="emergency-fund"]');
    if (existing) existing.remove();

    const schema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to Calculate Your Emergency Fund",
      description: "Determine how much you need in your emergency fund based on your monthly expenses, with 3, 6, and 9 month targets.",
      step: [
        { "@type": "HowToStep", name: "Enter your monthly expenses", text: "Input your essential monthly costs like rent, food, and utilities." },
        { "@type": "HowToStep", name: "Enter current savings", text: "Add how much you've already saved toward your emergency fund." },
        { "@type": "HowToStep", name: "Set your monthly saving rate", text: "Enter how much you can save each month toward this goal." },
        { "@type": "HowToStep", name: "Review your targets", text: "See 3, 6, and 9 month targets with progress bars and time estimates." },
      ],
      tool: { "@type": "HowToTool", name: "Safe Spend Emergency Fund Calculator" },
      totalTime: "PT1M",
      url: `${BASE_URL}/tools/emergency-fund-calculator`,
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-schema", "emergency-fund");
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => { script.remove(); };
  }, []);

  return null;
};
