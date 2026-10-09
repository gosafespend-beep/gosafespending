/**
 * The FAQ, written once. The accordion on the page and the FAQPage JSON-LD
 * both read from here, so the structured data can never describe an answer the
 * visitor cannot see.
 *
 * Every statement about pricing, platforms and data handling must stay true of
 * the shipped apps; change this file when the product changes.
 */

export type FaqCategory = "security" | "pricing" | "features";

export interface FaqItem {
  question: string;
  answer: string;
  category: FaqCategory;
}

export const FAQS: FaqItem[] = [
  {
    question: "Is there a mobile app?",
    answer:
      "Yes. Safe Spend has native apps for iPhone and iPad (App Store) and for Android (Google Play), plus a web app you can use in any browser. They share one account, so your data is the same everywhere.",
    category: "features",
  },
  {
    question: "Do I need to connect my bank account?",
    answer:
      "No, and Safe Spend never asks for your bank login. You add transactions by typing them in, scanning a receipt, or importing a statement file (CSV, Excel or PDF) that you download from your bank yourself. You decide exactly what goes in.",
    category: "security",
  },
  {
    question: "What does “Safe to Spend” mean?",
    answer:
      "It is one number: the money you have, plus income still to arrive this month, minus bills you have not paid yet and what your savings goals need this month. Safe Spend also shows it per day until the month ends, so you can tell at a glance whether a purchase is fine.",
    category: "features",
  },
  {
    question: "Is Safe Spend free?",
    answer:
      "Downloading is free and you can try it before paying. On the web app you get a 7-day free trial with no card. On iPhone and Android the 7-day free trial comes with the annual plan and is handled by the App Store or Google Play. After that it is $9.99 a month or $89.99 a year (the app shows the price in your local currency). If you don't subscribe you keep read-only access to everything you entered.",
    category: "pricing",
  },
  {
    question: "What happens after my free trial?",
    answer:
      "You can still open the app and see all of your data, export it, and delete it; nothing is removed. To add or edit transactions again you subscribe. You can cancel at any time: on iPhone in your Apple ID subscriptions, on Android in Google Play subscriptions, on the web inside the app.",
    category: "pricing",
  },
  {
    question: "How do I pay?",
    answer:
      "On iPhone, payment goes through your Apple Account. On Android, through Google Play and the payment methods you have there. On the web app, through Paystack (cards, bank transfer and mobile money). We never see or store your card details.",
    category: "pricing",
  },
  {
    question: "How do I add transactions without a bank connection?",
    answer:
      "Type an amount and a few words and Safe Spend suggests the category. You can also photograph a receipt, import a CSV, Excel or PDF statement, and set recurring bills and income to log themselves. Most people spend about thirty seconds a day.",
    category: "features",
  },
  {
    question: "How is my data protected?",
    answer:
      "Data is encrypted in transit and at rest, and each account's records are isolated at the database level with Row Level Security. The mobile apps can lock with Face ID, Touch ID or your device biometrics. We don't sell your data or show ads. You can export everything and delete your account from the app's settings.",
    category: "security",
  },
  {
    question: "What do the AI features see?",
    answer:
      "Suggesting a category or answering a question in the AI coach means a model processes the text you submit, such as a transaction description, or your question plus a summary of your own spending. It is used to produce your answer and not to advertise to you. The Privacy Policy lists the providers involved.",
    category: "security",
  },
  {
    question: "Which countries and currencies does it support?",
    answer:
      "Safe Spend works anywhere you can use the App Store, Google Play or a browser. Each account can have its own currency, including USD, EUR, GBP, KES, NGN and ZAR, and you can switch the display currency with automatic conversion.",
    category: "features",
  },
  {
    question: "Can I export or delete my data?",
    answer:
      "Yes. You can export your transactions as CSV from the apps and the web, and delete your account and its data from the settings screen whenever you like.",
    category: "security",
  },
  {
    question: "What makes Safe Spend different?",
    answer:
      "It starts from the number that matters, what is safe to spend today, instead of a pile of charts, and it gets there without asking for your bank login. Receipts, statements, an AI coach, debt payoff planning, goals and multi-currency are built in, on iPhone, Android and the web.",
    category: "features",
  },
];
