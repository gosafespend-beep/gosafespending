import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://gosafespend.com";

const steps = [
  {
    name: "Sign Up in Seconds",
    text: "Create your free account and start tracking your finances in minutes. No credit card required, quick setup with instant access.",
    image: `${SITE_URL}/og-image.png`,
  },
  {
    name: "Get Your Dashboard",
    text: "Log your income and expenses to see your complete financial picture. Enjoy easy data entry, smart categorization, and instant insights.",
    image: `${SITE_URL}/og-image.png`,
  },
  {
    name: "Reach Your Goals",
    text: "Set budgets, track goals, and watch your financial health improve over time. Create personalized budgets, track goal progress, and view detailed progress reports.",
    image: `${SITE_URL}/og-image.png`,
  },
];

export const HowToSchema = () => {
  const location = useLocation();

  useEffect(() => {
    // Only add schema on homepage
    if (location.pathname !== "/") return;

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "howto-schema";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Start Using Safe Spend for Personal Finance Tracking",
      "description": "Get started with Safe Spend in 3 simple steps. No complicated setup, no confusing spreadsheets — just financial clarity.",
      "totalTime": "PT5M",
      "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": "USD",
        "value": "0"
      },
      "step": steps.map((step, index) => ({
        "@type": "HowToStep",
        "position": index + 1,
        "name": step.name,
        "text": step.text,
        "image": step.image,
      })),
    });

    // Remove existing script if present
    const existing = document.getElementById("howto-schema");
    if (existing) {
      existing.remove();
    }

    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById("howto-schema");
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [location.pathname]);

  return null;
};
