import { X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStickyBar } from "@/hooks/useStickyBar";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const APP_URL = "https://app.gosafespend.com";

export const StickyWaitlistBar = () => {
  const { showBar, dismissBar } = useStickyBar("hero");
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {showBar && (
        <motion.div
          initial={prefersReducedMotion ? { opacity: 0 } : { y: "100%" }}
          animate={prefersReducedMotion ? { opacity: 1 } : { y: 0 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { y: "100%" }}
          transition={{ duration: prefersReducedMotion ? 0.15 : 0.3, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t border-border/50"
          role="complementary"
          aria-label="Get started prompt"
        >
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
            <p className="text-sm text-foreground font-medium hidden sm:block">
              Ready to take control of your finances?
            </p>
            
            <div className="flex items-center gap-2 flex-1 sm:flex-none justify-end">
              <Button 
                asChild
                size="sm" 
                className="whitespace-nowrap btn-ripple"
              >
                <a href={APP_URL}>
                  Get Started Free
                  <ArrowRight className="ml-1 h-3 w-3" aria-hidden="true" />
                </a>
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={dismissBar}
                className="p-2 h-9 w-9"
                aria-label="Dismiss bar"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
