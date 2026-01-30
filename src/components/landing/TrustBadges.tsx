import { Shield, Lock, Eye, CreditCard } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { motion } from "framer-motion";

const badges = [
  {
    icon: Lock,
    label: "256-bit Encryption",
    description: "Enterprise-grade protection",
  },
  {
    icon: Eye,
    label: "Your Data, Secured",
    description: "Private and encrypted",
  },
  {
    icon: CreditCard,
    label: "No Card Required",
    description: "Free to join waitlist",
  },
  {
    icon: Shield,
    label: "GDPR Compliant",
    description: "Your data, your rights",
  },
];

export const TrustBadges = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div
          ref={ref}
          className={`grid grid-cols-2 md:grid-cols-4 gap-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {badges.map((badge, index) => (
            <motion.div
              key={badge.label}
              className="flex flex-col items-center text-center p-4 rounded-xl bg-card/50 border border-border/30 hover:border-primary/30 transition-all duration-300 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <motion.div 
                className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <badge.icon className="w-6 h-6 text-primary" />
              </motion.div>
              <p className="font-medium text-foreground text-sm">{badge.label}</p>
              <p className="text-xs text-muted-foreground mt-1">{badge.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
