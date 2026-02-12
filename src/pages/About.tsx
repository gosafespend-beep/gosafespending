import { LegalLayout } from "@/components/legal/LegalLayout";
import { Shield, Heart, Target, Users } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Security First",
    description: "Your financial data deserves the highest level of protection. We use bank-grade encryption and never sell your information.",
  },
  {
    icon: Heart,
    title: "Built with Care",
    description: "Every feature is designed with real people in mind — not algorithms, not advertisers. Just you and your money.",
  },
  {
    icon: Target,
    title: "Goal-Oriented",
    description: "We believe everyone deserves to reach their financial goals. Safe Spend makes tracking progress simple and motivating.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Our roadmap is shaped by the people who use Safe Spend every day. Your feedback directly influences what we build next.",
  },
];

const About = () => {
  return (
    <LegalLayout title="About Safe Spend" lastUpdated="February 2026">
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Our Mission</h2>
        <p className="text-muted-foreground text-base leading-relaxed mb-4">
          Safe Spend was born from a simple idea: managing your money shouldn't require a finance degree. Too many people feel overwhelmed by budgeting apps that are either too complex or too basic. We set out to build something different — a personal finance companion that's powerful enough to handle real-world finances, yet simple enough to use every day.
        </p>
        <p className="text-muted-foreground text-base leading-relaxed">
          Our mission is to help everyday people take control of their finances with confidence. Whether you're tracking your first budget, crushing debt, or saving for a dream, Safe Spend gives you the clarity and tools to make it happen.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-6">Our Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {values.map((value) => (
            <div key={value.title} className="p-5 rounded-xl bg-card border border-border/50">
              <div className="inline-flex p-2.5 rounded-lg bg-primary/10 mb-3">
                <value.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1.5">{value.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-foreground mb-4">Our Story</h2>
        <p className="text-muted-foreground text-base leading-relaxed mb-4">
          Founded in 2026, Safe Spend started as a side project by a small team who were frustrated with the existing personal finance tools on the market. We wanted something that respected our privacy, worked beautifully on any device, and actually helped us build better money habits.
        </p>
        <p className="text-muted-foreground text-base leading-relaxed">
          Today, Safe Spend is used by thousands of people across 50+ countries to track expenses, manage budgets, pay down debt, and grow their savings. And we're just getting started.
        </p>
      </section>
    </LegalLayout>
  );
};

export default About;
