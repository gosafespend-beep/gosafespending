import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is Safe Spend free to use?",
    answer: "We offer a generous free tier with core features like expense tracking, budgeting, and basic reports. Premium features like advanced analytics, debt payoff planning, and unlimited accounts are available with our Pro plan.",
  },
  {
    question: "How secure is my financial data?",
    answer: "We use bank-level 256-bit AES encryption for all data at rest and in transit. Your login credentials are never stored on our servers—we use secure tokenized connections through trusted partners.",
  },
  {
    question: "Will Safe Spend connect to my bank?",
    answer: "Yes! We support thousands of financial institutions across North America and Europe through secure, read-only connections. We can only view your transactions—we can never move your money.",
  },
  {
    question: "Is there a mobile app?",
    answer: "Mobile apps for iOS and Android are coming soon after our initial launch. Join the waitlist to be notified when they're available.",
  },
  {
    question: "Can I export my data?",
    answer: "Absolutely. You can export all your transaction data, budgets, and reports anytime in CSV or PDF format. Your data belongs to you.",
  },
  {
    question: "What makes Safe Spend different?",
    answer: "We focus on simplicity and actionable insights rather than overwhelming you with data. Our clean interface helps you understand your finances at a glance, and our smart suggestions help you make better decisions.",
  },
];

export const FAQ = () => {
  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground">
            Everything you need to know about Safe Spend.
          </p>
        </div>

        {/* Accordion */}
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-card border border-border/50 rounded-xl px-6 data-[state=open]:border-primary/30"
            >
              <AccordionTrigger className="text-left text-foreground hover:no-underline py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
