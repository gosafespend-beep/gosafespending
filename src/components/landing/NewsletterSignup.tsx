import { useState } from "react";
import { z } from "zod";
import { motion } from "framer-motion";
import { Mail, Loader2, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useLiveAnnouncer } from "@/hooks/useLiveAnnouncer";
import { track } from "@/lib/analytics";

const emailSchema = z.string().email("Please enter a valid email address");

export const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [consented, setConsented] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { announce } = useLiveAnnouncer();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = emailSchema.safeParse(email);
    if (!result.success) {
      const message = result.error.errors[0].message;
      toast.error(message);
      announce(message);
      return;
    }

    if (!consented) {
      const message = "Please confirm you'd like to receive the newsletter.";
      toast.error(message);
      announce(message);
      return;
    }

    setIsLoading(true);

    try {
      /*
       * The subscription row is written by the edge function using the service
       * role, not here. Previously the client inserted the row and then asked
       * the function to mail an arbitrary address, which made that function an
       * open relay: it would send to whatever address the caller supplied.
       */
      // Imported on submit rather than at module scope: this is the only
      // Supabase usage on the homepage, and the client is ~120 KB that no
      // visitor needs until they actually subscribe.
      const { supabase } = await import("@/integrations/supabase/client");

      const { data, error } = await supabase.functions.invoke(
        "send-newsletter-email",
        { body: { email } },
      );

      if (error) throw error;

      setIsSubscribed(true);
      const message = data?.alreadySubscribed
        ? "You're already subscribed — we'll keep you posted."
        : "You're subscribed. Check your inbox.";
      toast.success(message);
      announce(message);
      track("newsletter_submitted", { result: "success" });
    } catch (error) {
      console.error("Newsletter signup error:", error);
      const message = "Something went wrong. Please try again.";
      toast.error(message);
      announce(message);
      track("newsletter_submitted", { result: "error" });
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
          <Mail className="h-5 w-5 text-primary" aria-hidden="true" />
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            Newsletter
          </span>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
          Stay in the loop
        </h2>
        <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
          Get practical finance tips, budgeting strategies, and Safe Spend
          updates delivered to your inbox. No spam — just value.
        </p>

        {isSubscribed ? (
          <div className="flex items-center justify-center gap-2 text-primary">
            <CheckCircle className="h-5 w-5" aria-hidden="true" />
            <span className="font-medium">You're subscribed!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                maxLength={254}
                disabled={isLoading}
                className="flex-1 min-h-[44px] bg-background border-border"
                aria-label="Email address for newsletter"
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="whitespace-nowrap min-h-[44px]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    <span className="sr-only">Subscribing</span>
                  </>
                ) : (
                  "Subscribe"
                )}
              </Button>
            </div>

            {/* Explicit marketing consent rather than consent implied by
                submitting the form. */}
            <div className="flex items-start gap-2 mt-4 text-left">
              <Checkbox
                id="newsletter-consent"
                checked={consented}
                onCheckedChange={(value) => setConsented(value === true)}
                className="mt-0.5"
              />
              <Label
                htmlFor="newsletter-consent"
                className="text-sm font-normal text-muted-foreground leading-snug"
              >
                Yes, email me finance tips and Safe Spend updates. Unsubscribe
                any time — we never share your address.
              </Label>
            </div>
          </form>
        )}
      </motion.div>
    </section>
  );
};
