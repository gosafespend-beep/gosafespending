import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useWaitlist } from "@/hooks/useWaitlist";
import { useLiveAnnouncer } from "@/hooks/useLiveAnnouncer";

const waitlistSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(255, "Email is too long"),
});

type WaitlistFormData = z.infer<typeof waitlistSchema>;

interface WaitlistFormProps {
  variant?: "hero" | "inline" | "footer";
  className?: string;
}

export const WaitlistForm = ({ variant = "hero", className = "" }: WaitlistFormProps) => {
  const { joinWaitlist, isLoading } = useWaitlist();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { announce } = useLiveAnnouncer();

  const form = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: WaitlistFormData) => {
    const result = await joinWaitlist(data.email);
    if (result.success) {
      setIsSubmitted(true);
      form.reset();
      announce("Success! You've been added to the waitlist.", { politeness: "polite" });
    } else {
      announce("Failed to join waitlist. Please try again.", { politeness: "assertive" });
    }
  };

  if (isSubmitted) {
    return (
      <div 
        className={`flex items-center gap-2 text-accent ${className}`}
        role="status"
        aria-live="polite"
      >
        <CheckCircle className="h-5 w-5" aria-hidden="true" />
        <span className="font-medium">You're on the list!</span>
      </div>
    );
  }

  const isHero = variant === "hero";

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`flex ${isHero ? "flex-col sm:flex-row" : "flex-row"} gap-3 ${className}`}
        aria-label="Join waitlist"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  aria-label="Email address"
                  aria-describedby={form.formState.errors.email ? "email-error" : undefined}
                  className={`
                    ${isHero ? "h-12 text-base" : "h-10"}
                    bg-background/50 border-border/50 text-foreground placeholder:text-muted-foreground focus:border-primary
                  `}
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage id="email-error" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isLoading}
          className={`
            ${isHero ? "h-12 px-8 text-base" : "h-10 px-6"}
            bg-primary hover:bg-primary/90 text-primary-foreground btn-ripple
          `}
          aria-busy={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              <span className="sr-only">Submitting...</span>
            </>
          ) : (
            <>
              Join Waitlist
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};
