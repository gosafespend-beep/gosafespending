import { Shield, TrendingUp, PiggyBank, ChevronDown, ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { AnimatedBackground } from "./AnimatedBackground";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import logo from "@/assets/logo.png";

const APP_URL = "https://app.gosafespend.com";

export const Hero = () => {
  const { ref, isVisible } = useScrollAnimation();

  const scrollToFeatures = () => {
    const element = document.getElementById("features");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      id="hero" 
      aria-label="Introduction"
      className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-screen flex flex-col justify-center"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--safespend-primary-light))] via-background to-background -z-20" />
      <AnimatedBackground />

      <div className="max-w-7xl mx-auto w-full">
        <div
          ref={ref}
          className={`text-center max-w-4xl mx-auto transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Logo with glow */}
          <motion.div 
            className="flex justify-center mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <img src={logo} alt="Safe Spend logo" className="h-20 w-20 relative z-10" width={80} height={80} />
              <motion.div
                className="absolute inset-0 rounded-full bg-primary/30 blur-xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>
          </motion.div>

          {/* Badge */}
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent text-sm font-medium mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            Now Available — Start Your Free Trial
          </motion.div>

          {/* Headline */}
          <motion.h1 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Take Control of Your{" "}
            <span className="gradient-text">Money</span>,{" "}
            <span className="gradient-text">Effortlessly</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Safe Spend is your personal finance companion. Track expenses, build budgets, 
            crush debt, and grow your savings — powered by AI categorization, all in one beautiful dashboard.
          </motion.p>

          {/* Privacy line */}
          <motion.p
            className="text-sm text-primary font-medium mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
          >
            No bank connection required. 100% private.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              asChild
              size="lg"
              className="h-12 px-8 text-base bg-primary hover:bg-primary/90 text-primary-foreground btn-ripple"
            >
              <a href={APP_URL}>
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div 
            className="flex flex-wrap justify-center gap-8 text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center gap-2 group">
              <Shield className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-sm">Enterprise-grade security</span>
            </div>
            <div className="flex items-center gap-2 group">
              <TrendingUp className="h-5 w-5 text-accent group-hover:scale-110 transition-transform" />
              <span className="text-sm">Smart insights</span>
            </div>
            <div className="flex items-center gap-2 group">
              <PiggyBank className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-sm">Goal tracking</span>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.a
          href="#features"
          onClick={(e) => {
            e.preventDefault();
            scrollToFeatures();
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-foreground transition-colors"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          aria-label="Scroll to features"
        >
          <ChevronDown className="h-8 w-8 animate-bounce-down" />
        </motion.a>
      </div>
    </section>
  );
};
