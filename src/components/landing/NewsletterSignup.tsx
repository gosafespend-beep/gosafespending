import { useState } from "react";
import { z } from "zod";
import { motion } from "framer-motion";
import { Mail, Loader2, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const emailSchema = z.string().email("Please enter a valid email address");

export const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = emailSchema.safeParse(email);
    if (!result.success) {
      toast.error(result.error.errors[0].message);
      return;
    }

    setIsLoading(true);

    try {
      const { error: dbError } = await supabase
        .from("waitlist")
        .insert({ email, status: "newsletter" });

      if (dbError) {
        if (dbError.code === "23505") {
          toast.info("You're already subscribed! We'll keep you posted.");
          setIsSubscribed(true);
          return;
        }
        throw dbError;
      }

      // Send confirmation email
      await supabase.functions.invoke("send-newsletter-email", {
        body: { email },
      });

      setIsSubscribed(true);
      toast.success("You're subscribed! Check your inbox.");
    } catch (error) {
      console.error("Newsletter signup error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <motion.div
        className="container mx-auto px-4 max-w-2xl text-center"
        initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <Mail className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            Newsletter
          </span>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
          Stay in the loop
        </h2>
        <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
          Get practical finance tips, budgeting strategies, and Safe Spend updates
          delivered to your inbox. No spam — just value.
        </p>

        {isSubscribed ? (
          <div className="flex items-center justify-center gap-2 text-primary">
            <CheckCircle className="h-5 w-5" />
            <span className="font-medium">You're subscribed!</span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              className="flex-1 bg-background border-border"
              aria-label="Email address for newsletter"
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="whitespace-nowrap"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Subscribe"
              )}
            </Button>
          </form>
        )}

        <p className="text-xs text-muted-foreground mt-4">
          Unsubscribe anytime. We respect your privacy.
        </p>
      </motion.div>
    </section>
  );
};
