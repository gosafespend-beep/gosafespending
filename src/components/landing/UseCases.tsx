import { Briefcase, GraduationCap, Home, ShieldCheck, ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const APP_URL = "https://app.gosafespend.com";

const personas = [
  {
    icon: Briefcase,
    title: "Freelancers & Side Hustlers",
    pain: "Irregular income makes budgeting feel impossible.",
    solution: "Track multiple income streams, set flexible budgets, and always know your true spending power.",
    keywords: "budget app for freelancers",
  },
  {
    icon: GraduationCap,
    title: "Students & Young Professionals",
    pain: "Just starting out and unsure where your money goes?",
    solution: "Build smart money habits early with a free 7-day trial. Simple expense tracking and savings goals that grow with you.",
    keywords: "budgeting app for students",
  },
  {
    icon: Home,
    title: "Families & Households",
    pain: "Juggling bills, groceries, and saving for the future.",
    solution: "Manage household budgets, track recurring bills, and plan together for big family goals.",
    keywords: "family budget tracker",
  },
  {
    icon: ShieldCheck,
    title: "Privacy-Conscious Users",
    pain: "Don't want to hand over your bank login to an app?",
    solution: "Safe Spend never asks for bank credentials. Manual entry means you stay in full control — your data is protected by Row Level Security.",
    keywords: "privacy first budget app no bank connection",
  },
];

export const UseCases = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="use-cases" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div
          ref={ref}
          className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full">
            Who It's For
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Built for <span className="gradient-text">Real People</span>, Not Accountants
          </h2>
          <p className="text-lg text-muted-foreground">
            Whether you're a student, freelancer, or managing a family — Safe Spend adapts to your life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {personas.map((persona, index) => (
            <motion.div
              key={persona.title}
              className="group p-6 bg-card rounded-xl border border-border/50 card-glow transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div className="inline-flex p-3 rounded-lg bg-primary/10 mb-4">
                <persona.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{persona.title}</h3>
              <p className="text-sm text-accent font-medium mb-2">{persona.pain}</p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{persona.solution}</p>
              <a
                href={APP_URL}
                className="inline-flex items-center text-sm text-primary hover:text-accent transition-colors font-medium"
              >
                Start Free Trial
                <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
