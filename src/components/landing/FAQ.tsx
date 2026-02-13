import { useState, useMemo } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { motion } from "framer-motion";
import { Search, Shield, DollarSign, Smartphone, HelpCircle, Brain, CreditCard } from "lucide-react";

type FAQCategory = "all" | "security" | "pricing" | "features" | "general";

interface FAQ {
  question: string;
  answer: string;
  category: FAQCategory;
  icon: typeof Shield;
}

const faqs: FAQ[] = [
  {
    question: "Is Safe Spend free to use?",
    answer: "Safe Spend offers a 7-day free trial with full access to all features — no credit card required. After your trial, you can subscribe for $9.99/month or $89.99/year (~25% savings). If you don't subscribe, you'll retain read-only access to all your data.",
    category: "pricing",
    icon: DollarSign,
  },
  {
    question: "What happens after my free trial?",
    answer: "After your 7-day trial, you'll still have read-only access to all your data — nothing is ever deleted. To regain full editing access, simply subscribe to a paid plan. You can pick up right where you left off.",
    category: "pricing",
    icon: DollarSign,
  },
  {
    question: "What payment methods do you accept?",
    answer: "We use Paystack for secure payments. You can pay with credit/debit cards, bank transfers, and mobile money. Paystack supports payments across Africa and globally.",
    category: "pricing",
    icon: CreditCard,
  },
  {
    question: "How secure is my financial data?",
    answer: "We use 256-bit AES encryption for all data at rest and in transit. Every user's data is isolated at the database level with Row Level Security (RLS) — no user can ever access another's data. Your information is never shared with third parties.",
    category: "security",
    icon: Shield,
  },
  {
    question: "Do I need to connect my bank account?",
    answer: "No! Safe Spend is a manual-entry app — you're always in control of what data you add. Simply log your transactions, income, and accounts yourself. This keeps your banking credentials completely private and secure.",
    category: "features",
    icon: Smartphone,
  },
  {
    question: "Is there a mobile app?",
    answer: "Safe Spend is a Progressive Web App (PWA) — you can install it directly on your iPhone, Android phone, or desktop. It works offline too. No app store needed — just open the app in your browser and tap 'Install' or 'Add to Home Screen'.",
    category: "features",
    icon: Smartphone,
  },
  {
    question: "How does AI categorization work?",
    answer: "When you log a transaction, Safe Spend's AI automatically suggests the most likely category based on your description and past spending patterns. You can always override the suggestion — the AI learns and improves over time.",
    category: "features",
    icon: Brain,
  },
  {
    question: "Can I export my data?",
    answer: "Absolutely. You can export all your transaction data, budgets, and reports anytime in CSV or PDF format. Your data belongs to you.",
    category: "features",
    icon: HelpCircle,
  },
  {
    question: "What makes Safe Spend different?",
    answer: "We're privacy-first: no bank connections, no data selling, and Row Level Security for every user. Plus, we offer AI-powered categorization, offline PWA support, and a comprehensive suite of tools — from debt payoff planners to net worth tracking — all in one beautiful interface.",
    category: "general",
    icon: HelpCircle,
  },
];

const categories: { id: FAQCategory; label: string; icon: typeof Shield }[] = [
  { id: "all", label: "All", icon: HelpCircle },
  { id: "security", label: "Security", icon: Shield },
  { id: "pricing", label: "Pricing", icon: DollarSign },
  { id: "features", label: "Features", icon: Smartphone },
];

export const FAQ = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<FAQCategory>("all");

  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesSearch =
        searchQuery === "" ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory =
        activeCategory === "all" || faq.category === activeCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div
          ref={ref}
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
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

        {/* Search */}
        <motion.div
          className="relative mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 bg-card border-border/50 focus:border-primary"
          />
        </motion.div>

        {/* Category tabs */}
        <motion.div
          className="flex flex-wrap gap-2 mb-8 justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 min-h-[44px] ${
                activeCategory === category.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border/50 text-muted-foreground hover:border-primary/30 hover:text-foreground"
              }`}
            >
              <category.icon className="h-4 w-4" />
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Accordion */}
        {filteredFaqs.length > 0 ? (
          <Accordion type="single" collapsible className="w-full space-y-4">
            {filteredFaqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="bg-card border border-border/50 rounded-xl px-6 data-[state=open]:border-primary/30 transition-all duration-300 overflow-hidden"
                >
                  <AccordionTrigger className="text-left text-foreground hover:no-underline py-5 group">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <faq.icon className="h-4 w-4 text-primary" />
                      </div>
                      <span>{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 pl-14">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        ) : (
          <motion.div
            className="text-center py-12 text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <HelpCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
            <p>No questions found matching your search.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
              className="mt-2 text-primary hover:underline"
            >
              Clear filters
            </button>
          </motion.div>
        )}

        {/* Contact CTA */}
        <motion.div
          className="mt-12 text-center p-6 rounded-2xl bg-card border border-border/50"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-muted-foreground mb-2">Still have questions?</p>
          <a
            href="/contact"
            className="text-primary hover:text-accent transition-colors font-medium"
          >
            Contact our support team →
          </a>
        </motion.div>
      </div>
    </section>
  );
};
