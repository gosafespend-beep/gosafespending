import { useState } from "react";
import { z } from "zod";
import { Link } from "react-router-dom";
import { BookOpen, CheckCircle, Loader2, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useLiveAnnouncer } from "@/hooks/useLiveAnnouncer";
import { track } from "@/lib/analytics";
import cover from "@/assets/ebook-cover.png";

const emailSchema = z.string().email("Please enter a valid email address");

/** Where the request came from. Recorded against the lead for attribution. */
export type EbookSource =
  | "ebook_page"
  | "homepage"
  | "blog"
  | "calculator";

interface EbookOfferProps {
  source: EbookSource;
  /**
   * page    — the form on /ebook, no surrounding chrome
   * section — full-width band, used in place of the old newsletter strip
   * compact — a card that fits inside an article or under a calculator
   */
  variant?: "page" | "section" | "compact";
  className?: string;
}

/**
 * The single email-capture form for "Thirty Seconds a Day".
 *
 * One component rather than one per placement: the book is offered in five
 * places, and five copies of a form would mean five chances for the consent
 * checkbox, the validation or the source tag to drift apart.
 *
 * Nothing is written to the database from here — the edge function records the
 * lead with the service role and mails only the address it just recorded, so
 * the endpoint can't be used to send mail to a third party.
 */
export const EbookOffer = ({
  source,
  variant = "page",
  className = "",
}: EbookOfferProps) => {
  const [email, setEmail] = useState("");
  const [consented, setConsented] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);
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

    setIsLoading(true);
    try {
      // Loaded on submit: the Supabase client is ~120 KB that no reader needs
      // until they actually ask for the book.
      const { supabase } = await import("@/integrations/supabase/client");

      const { error } = await supabase.functions.invoke("send-ebook", {
        body: { email, source, newsletter: consented },
      });
      if (error) throw error;

      setIsDone(true);
      const message = "Check your inbox — the book is on its way.";
      toast.success(message);
      announce(message);
      track("ebook_requested", { source, newsletter: consented });
    } catch (error) {
      console.error("Ebook request failed");
      const message = "Something went wrong. Please try again.";
      toast.error(message);
      announce(message);
      track("ebook_requested", { source, result: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const form = isDone ? (
    <div className="flex items-start gap-2 text-primary">
      <CheckCircle className="h-5 w-5 shrink-0 mt-0.5" aria-hidden="true" />
      <p className="text-sm font-medium">
        Sent. Check your inbox for the download link — it works for 7 days.
      </p>
    </div>
  ) : (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          maxLength={254}
          disabled={isLoading}
          className="flex-1 min-h-[44px] bg-background border-border"
          aria-label="Email address for the free guide"
        />
        <Button
          type="submit"
          disabled={isLoading}
          className="whitespace-nowrap min-h-[44px] px-6"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              <span className="sr-only">Sending</span>
            </>
          ) : (
            <>
              Send me the book
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </>
          )}
        </Button>
      </div>

      <div className="flex items-start gap-2 mt-3 text-left">
        <Checkbox
          id={`ebook-consent-${source}`}
          checked={consented}
          onCheckedChange={(value) => setConsented(value === true)}
          className="mt-0.5"
        />
        <Label
          htmlFor={`ebook-consent-${source}`}
          className="text-xs font-normal text-muted-foreground leading-snug"
        >
          Also send me occasional finance tips. Unsubscribe any time — we never
          share your address.
        </Label>
      </div>
    </form>
  );

  if (variant === "page") {
    return <div className={className}>{form}</div>;
  }

  if (variant === "compact") {
    return (
      <aside
        className={`rounded-xl border border-primary/20 bg-primary/5 p-5 ${className}`}
      >
        <div className="flex items-start gap-4">
          <img
            src={cover}
            alt="Cover of Thirty Seconds a Day"
            loading="lazy"
            width={1024}
            height={1280}
            className="hidden sm:block h-24 w-auto shrink-0 drop-shadow-lg"
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">
              Free guide
            </p>
            <h3 className="text-base sm:text-lg font-bold text-foreground mb-1">
              Thirty Seconds a Day
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              12 chapters, 6 worksheets and a 30-day plan for knowing where your
              money actually goes. Free, no card.
            </p>
            {form}
          </div>
        </div>
      </aside>
    );
  }

  return (
    <section className={`py-16 md:py-20 bg-muted/30 ${className}`}>
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="grid md:grid-cols-[minmax(0,1fr)_260px] gap-10 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="h-5 w-5 text-primary" aria-hidden="true" />
              <span className="text-sm font-medium text-primary uppercase tracking-wider">
                Free guide
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Thirty Seconds a Day
            </h2>
            <p className="text-muted-foreground mb-6">
              A practical guide to financial clarity — 12 chapters, 6
              worksheets, a glossary and a 30-day plan. Not ready for a trial?
              Start with the book instead.
            </p>
            {form}
            <p className="mt-4 text-sm">
              <Link
                to="/ebook"
                className="text-primary hover:underline font-medium"
              >
                See what's inside →
              </Link>
            </p>
          </div>
          <img
            src={cover}
            alt="Cover of Thirty Seconds a Day: A Practical Guide to Financial Clarity"
            loading="lazy"
            width={1024}
            height={1280}
            className="hidden md:block w-full h-auto drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};
