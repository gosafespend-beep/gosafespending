import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// FAQ data that matches the FAQ component
const faqData = [
  {
    question: "Is Safe Spend free to use?",
    answer: "Safe Spend offers a 7-day free trial with full access to all features — no credit card required. After your trial, you can subscribe for $9.99/month or $89.99/year (~25% savings). If you don't subscribe, you'll retain read-only access to all your data.",
  },
  {
    question: "What happens after my free trial?",
    answer: "After your 7-day trial, you'll still have read-only access to all your data — nothing is ever deleted. To regain full editing access, simply subscribe to a paid plan. You can pick up right where you left off.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We use Paystack for secure payments. You can pay with credit/debit cards, bank transfers, and mobile money. Paystack supports payments across Africa and globally.",
  },
  {
    question: "How secure is my financial data?",
    answer: "We use 256-bit AES encryption for all data at rest and in transit. Every user's data is isolated at the database level with Row Level Security (RLS) — no user can ever access another's data. Your information is never shared with third parties.",
  },
  {
    question: "Do I need to connect my bank account?",
    answer: "No! Safe Spend is a manual-entry app — you're always in control of what data you add. Simply log your transactions, income, and accounts yourself. This keeps your banking credentials completely private and secure.",
  },
  {
    question: "Is there a mobile app?",
    answer: "Safe Spend is a Progressive Web App (PWA) — you can install it directly on your iPhone, Android phone, or desktop. It works offline too. No app store needed — just open the app in your browser and tap 'Install' or 'Add to Home Screen'.",
  },
  {
    question: "How does AI categorization work?",
    answer: "When you log a transaction, Safe Spend's AI automatically suggests the most likely category based on your description and past spending patterns. You can always override the suggestion — the AI learns and improves over time.",
  },
  {
    question: "Can I export my data?",
    answer: "Absolutely. You can export all your transaction data, budgets, and reports anytime in CSV or PDF format. Your data belongs to you.",
  },
  {
    question: "What makes Safe Spend different?",
    answer: "We're privacy-first: no bank connections, no data selling, and Row Level Security for every user. Plus, we offer AI-powered categorization, offline PWA support, and a comprehensive suite of tools — from debt payoff planners to net worth tracking — all in one beautiful interface.",
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
