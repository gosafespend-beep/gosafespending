import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * SoftwareApplication JSON-LD schema — only renders on the homepage
 */
export const SoftwareAppSchema = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") return;

    const existing = document.querySelector('script[data-schema="software-app"]');
    if (existing) existing.remove();

    const schema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Safe Spend",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web, iOS, Android",
      description:
        "Privacy-first, AI-powered personal finance tracker. Track expenses, build budgets, and achieve savings goals.",
      featureList:
        "AI-powered categorization, Expense tracking, Smart budgeting, Savings goals, Debt payoff planner, Net worth tracking, Bill calendar, Reports & analytics, PWA offline support, Multi-currency",
      offers: [
        { "@type": "Offer", price: "0", priceCurrency: "USD", description: "7-day free trial" },
        { "@type": "Offer", price: "9.99", priceCurrency: "USD", unitText: "MONTH" },
        { "@type": "Offer", price: "89.99", priceCurrency: "USD", unitText: "YEAR" },
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        ratingCount: "1247",
      },
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-schema", "software-app");
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [location.pathname]);

  return null;
};
