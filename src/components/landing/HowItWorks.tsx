import { UserPlus, LineChart, Rocket } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Sign Up in Seconds",
    description: "Create your free account and connect your financial accounts securely.",
  },
  {
    icon: LineChart,
    step: "02",
    title: "Get Your Dashboard",
    description: "See all your finances in one place with automatic categorization and insights.",
  },
  {
    icon: Rocket,
    step: "03",
    title: "Reach Your Goals",
    description: "Set budgets, track goals, and watch your financial health improve over time.",
  },
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Get Started in <span className="text-accent">3 Simple Steps</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            No complicated setup. No confusing spreadsheets. Just clarity.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative text-center">
              {/* Connector line (hidden on mobile and last item) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary/20 to-accent/20" />
              )}

              {/* Step number circle */}
              <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent mb-6">
                <div className="absolute inset-1 rounded-full bg-background flex items-center justify-center">
                  <step.icon className="h-10 w-10 text-primary" />
                </div>
              </div>

              {/* Step badge */}
              <div className="inline-block px-3 py-1 rounded-full bg-muted text-xs font-semibold text-muted-foreground mb-3">
                STEP {step.step}
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
