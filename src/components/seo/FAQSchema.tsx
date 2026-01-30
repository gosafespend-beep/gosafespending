import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// FAQ data that matches the FAQ component
const faqData = [
  {
    question: "What is Safe Spend?",
    answer: "Safe Spend is a personal finance app that helps you track expenses, create budgets, manage debt, and build savings goals — all in one clean, intuitive dashboard.",
  },
  {
    question: "Is Safe Spend free to use?",
    answer: "Safe Spend offers a free tier with essential features. Premium features like advanced analytics, unlimited accounts, and priority support are available through paid plans.",
  },
  {
    question: "Do I need to connect my bank account?",
    answer: "No! Safe Spend is a manual-entry app—you're always in control of what data you add. Simply log your transactions, income, and accounts yourself. This keeps your banking credentials completely private and secure.",
  },
  {
    question: "Is my financial data secure?",
    answer: "Absolutely. We use 256-bit AES encryption for all data at rest and in transit. Your information is stored securely and never shared with third parties. All data stays private between you and your account.",
  },
  {
    question: "Can I use Safe Spend on mobile?",
    answer: "Yes! Safe Spend works seamlessly on all devices. Our responsive web app adapts to any screen size, and native iOS and Android apps are coming soon.",
  },
  {
    question: "How do I get started?",
    answer: "Simply join our waitlist using the form above. Once we launch, you'll be among the first to get access. The setup process takes less than 5 minutes.",
  },
];

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
