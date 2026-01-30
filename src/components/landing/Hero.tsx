import { WaitlistForm } from "./WaitlistForm";
import { Shield, TrendingUp, PiggyBank } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import logo from "@/assets/logo.png";

export const Hero = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--safespend-primary-light))] via-background to-background -z-10" />
      
      {/* Decorative circles */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto">
        <div
          ref={ref}
          className={`text-center max-w-4xl mx-auto transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img src={logo} alt="Safe Spend" className="h-20 w-20" />
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            Coming Soon — Join the Waitlist
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
            Take Control of Your{" "}
            <span className="text-primary">Money</span>,{" "}
            <span className="text-accent">Effortlessly</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Safe Spend is your personal finance companion. Track expenses, build budgets, 
            crush debt, and grow your savings — all in one beautiful dashboard.
          </p>

          {/* Waitlist Form */}
          <div className="max-w-md mx-auto mb-12" id="waitlist">
            <WaitlistForm variant="hero" />
            <p className="text-sm text-muted-foreground mt-3">
              Join 1,000+ others waiting for early access. No spam, ever.
            </p>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-8 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-sm">Bank-level security</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-accent" />
              <span className="text-sm">Smart insights</span>
            </div>
            <div className="flex items-center gap-2">
              <PiggyBank className="h-5 w-5 text-primary" />
              <span className="text-sm">Goal tracking</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
