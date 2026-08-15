import { Shield, Lock, Eye, FileCheck, Server, Database } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { motion } from "framer-motion";

/*
 * Security claims (LEG-3).
 *
 * Every statement here has to be one you could be asked to prove. Three were
 * rewritten because they were not:
 *
 *  - "We use 256-bit AES encryption" read as application-level encryption,
 *    meaning staff cannot read user data. No cryptographic code exists in this
 *    codebase; the true infrastructure-level version is different, and
 *    materially so for the privacy-motivated buyer this page targets.
 *  - "Full compliance with global data protection regulations" is a legal
 *    conclusion, not a feature. Replaced with the specific rights provided.
 *  - "Regular security audits" named no auditor, framework or date.
 *
 * Row Level Security stays: it is the strongest fact on this list and it is
 * verifiable -- an anonymous request for another user's rows returns nothing.
 */
const securityFeatures = [
  {
    icon: Eye,
    title: "No Bank Login, Ever",
    description:
      "We never ask for your banking credentials, and no third-party data aggregator sits between you and your bank. There is nothing to revoke later.",
  },
  {
    icon: Database,
    title: "Row Level Security",
    description:
      "Every user's data is isolated at the database level. Policies are enforced by Postgres itself, not by application code, so no account can read another's rows.",
  },
  {
    icon: Lock,
    title: "Encrypted in Transit and at Rest",
    description:
      "Traffic is encrypted with TLS, and stored data is encrypted at rest with AES-256 by our infrastructure provider.",
  },
  {
    icon: Shield,
    title: "Never Sold, Never Shared",
    description:
      "We don't sell, share or monetise your financial information, and we run no advertising trackers on this site.",
  },
  {
    icon: FileCheck,
    title: "Export or Delete, Any Time",
    description:
      "Your data is yours. Export everything to CSV or PDF whenever you like, and deleting your account removes it.",
  },
  {
    icon: Server,
    title: "You Decide What Exists",
    description:
      "Manual entry means nothing is collected that you didn't type. The smallest data footprint is the one you control.",
  },
];

export const SecuritySection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="security" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div
          ref={ref}
          className={`scroll-anim text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${
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
