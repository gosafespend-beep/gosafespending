import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStickyBar } from "@/hooks/useStickyBar";
import { useWaitlist } from "@/hooks/useWaitlist";
import { useLiveAnnouncer } from "@/hooks/useLiveAnnouncer";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export const StickyWaitlistBar = () => {
  const { showBar, dismissBar } = useStickyBar();
  const [email, setEmail] = useState("");
  const { joinWaitlist, isLoading } = useWaitlist();
  const { announce } = useLiveAnnouncer();
  const prefersReducedMotion = useReducedMotion();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    const result = await joinWaitlist(email);
    if (result.success) {
      setEmail("");
      dismissBar();
      announce("Success! You've been added to the waitlist.");
    }
  };

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
          aria-label="Waitlist signup"
        >
          <div className="max-w-4xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-sm text-foreground font-medium hidden sm:block">
              Ready to take control of your finances?
            </p>
            
            <form 
              onSubmit={handleSubmit} 
              className="flex items-center gap-2 flex-1 sm:flex-none w-full sm:w-auto"
              aria-label="Quick waitlist signup"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-9 text-sm flex-1 sm:w-64"
                required
                aria-label="Email address"
              />
              <Button 
                type="submit" 
                size="sm" 
                disabled={isLoading}
                className="whitespace-nowrap btn-ripple"
                aria-busy={isLoading}
              >
                {isLoading ? "..." : "Join Waitlist"}
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={dismissBar}
                className="p-2 h-9 w-9"
                aria-label="Dismiss waitlist bar"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </Button>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
