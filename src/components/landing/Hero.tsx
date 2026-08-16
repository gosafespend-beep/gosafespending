import { Shield, Wallet, Download, ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { AnimatedBackground } from "./AnimatedBackground";
import { Button } from "@/components/ui/button";
import { CtaLink } from "@/components/ui/CtaLink";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import logo from "@/assets/logo.webp";

/*
 * Hero copy (CRO-1).
 *
 * The previous headline was "Take Control of Your Money, Effortlessly" -- the
 * most common headline in the category, and one that could sit unchanged on
 * Mint, Monarch or Rocket Money. "Effortlessly" also promised automation from
 * a manual-entry product, a mismatch that surfaces as trial churn rather than
 * bounce, which makes it expensive and slow to detect.
 *
 * The differentiator ("no bank connection") was styled as a text-sm footnote
 * below the subheadline. It is the only claim here a competitor cannot copy,
 * so it is now the headline. Naming the real cost -- about thirty seconds a
 * day -- sets an expectation the trial can actually meet.
 *
 * The section is no longer min-h-screen: the product preview immediately below
 * now peeks above the fold instead of sitting two viewports down.
 */
export const Hero = () => {
  const { ref, isVisible } = useScrollAnimation();
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative pt-28 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--safespend-primary-light))] via-background to-background -z-20" />
      <AnimatedBackground />

      <div className="max-w-7xl mx-auto w-full">
        <div
          ref={ref}
          className={`scroll-anim text-center max-w-4xl mx-auto transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Logo. The pulsing glow that used to sit here ran forever, and the
              badge ping and bouncing chevron did the same -- three perpetual
              animations competing with the headline for attention, none of
              which encoded information. */}
          <div className="flex justify-center mb-6">
            <img
              src={logo}
              alt="Safe Spend logo"
              className="h-16 w-16"
              width={64}
              height={64}
              fetchPriority="high"
            />
          </div>

          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            The budgeting app that{" "}
            <span className="gradient-text">never asks for your bank login</span>
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Track spending, build budgets and pay down debt in about thirty
            seconds a day — with no bank connection, no credentials shared, and
            nothing sold to anyone.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Button
              asChild
              size="lg"
              className="h-12 px-8 text-base bg-primary hover:bg-primary/90 text-primary-foreground btn-ripple"
            >
              {/* "no card needed" moved into the button itself, where it is
                  read at the moment of hesitation. */}
              <CtaLink location="hero">
                Start free — no card needed
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </CtaLink>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 px-8 text-base border-border/50 hover:border-primary/50 hover:bg-primary/5"
            >
              <a
                href="#how-it-works"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("how-it-works")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                See How It Works
              </a>
            </Button>
          </motion.div>

          {/* Each of these is checkable, unlike the "Enterprise-grade security"
              it replaces. */}
          <motion.ul
            className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-muted-foreground list-none p-0"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <li className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" aria-hidden="true" />
              <span className="text-sm">No bank credentials, ever</span>
            </li>
            <li className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-accent" aria-hidden="true" />
              <span className="text-sm">7 days free, no card</span>
            </li>
            <li className="flex items-center gap-2">
              <Download className="h-5 w-5 text-primary" aria-hidden="true" />
              <span className="text-sm">Export your data any time</span>
            </li>
          </motion.ul>
        </div>
      </div>
    </section>
  );
};
