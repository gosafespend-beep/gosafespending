import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FAQS } from "@/content/faqs";

const faqData = FAQS;

/**
 * Generates FAQPage JSON-LD schema for rich snippets in search results
 */
export const FAQSchema = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Only add FAQ schema on homepage where FAQ section exists
    if (location.pathname !== "/") return;

    // Remove existing FAQ schema
    const existing = document.querySelector('script[data-schema="faq"]');
    if (existing) existing.remove();

    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqData.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-schema", "faq");
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [location.pathname]);

  return null;
};
