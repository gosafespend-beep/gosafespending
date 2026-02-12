import { Shield, Lock, Eye, FileCheck, Server, Database } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { motion } from "framer-motion";

const securityFeatures = [
  {
    icon: Lock,
    title: "256-bit Encryption",
    description: "Your financial data is encrypted at rest and in transit using industry-standard AES-256 encryption.",
  },
  {
    icon: Eye,
    title: "No Bank Login Required",
    description: "We never ask for your bank credentials. You stay in full control of your data at all times.",
  },
  {
    icon: Shield,
    title: "Your Data Stays Private",
    description: "We don't sell, share, or monetize your personal financial information. Your data is user-owned and protected.",
  },
  {
    icon: Database,
    title: "Row Level Security",
    description: "Every user's data is isolated at the database level with Row Level Security. No user can ever access another's data.",
  },
  {
    icon: FileCheck,
    title: "GDPR Compliant",
    description: "Full compliance with global data protection regulations. Export or delete your data anytime.",
  },
  {
    icon: Server,
    title: "Secure Infrastructure",
    description: "Hosted on enterprise-grade cloud infrastructure with regular security audits and monitoring.",
  },
];

export const SecuritySection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="security" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div
          ref={ref}
          className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full">
            Security & Privacy
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Your Money Data is{" "}
            <span className="gradient-text">Safe With Us</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            We built Safe Spend with privacy-first principles. No bank connections, no data selling, no compromises.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {securityFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              className={`p-6 rounded-xl border border-border/50 bg-card/50 transition-all duration-300 ${
                index === 4 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -3 }}
            >
              <div className="inline-flex p-3 rounded-lg bg-primary/10 mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
