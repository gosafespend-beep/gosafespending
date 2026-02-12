import { useEffect } from "react";

const BASE_URL = "https://gosafespend.com";

/**
 * Generates Organization JSON-LD schema for brand identity in search
 */
export const OrganizationSchema = () => {
  useEffect(() => {
    // Remove existing organization schema
    const existing = document.querySelector('script[data-schema="organization"]');
    if (existing) existing.remove();

    const schema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Safe Spend",
      url: BASE_URL,
      logo: `${BASE_URL}/favicon.png`,
      description: "Personal finance companion for tracking expenses, building budgets, and achieving savings goals.",
      foundingDate: "2026",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: "info@gosafespend.com",
        url: `${BASE_URL}/contact`,
      },
      sameAs: [
        "https://x.com/SafeSpend",
      ],
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-schema", "organization");
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return null;
};
