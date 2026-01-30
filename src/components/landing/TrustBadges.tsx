import { Shield, Lock, Eye, CreditCard } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const badges = [
  {
    icon: Lock,
    label: "256-bit Encryption",
    description: "Bank-level security",
  },
  {
    icon: Eye,
    label: "Read-Only Access",
    description: "We never move your money",
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
            <div
              key={badge.label}
              className="flex flex-col items-center text-center p-4 rounded-xl bg-card/50 border border-border/30 hover:border-primary/30 transition-all duration-300"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <badge.icon className="w-6 h-6 text-primary" />
              </div>
              <p className="font-medium text-foreground text-sm">{badge.label}</p>
              <p className="text-xs text-muted-foreground mt-1">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
