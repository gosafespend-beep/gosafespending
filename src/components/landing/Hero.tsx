import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowRight, Download, Lock, ScanLine, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CtaLink } from "@/components/ui/CtaLink";
import { StoreBadges } from "@/components/ui/StoreBadges";
import { track } from "@/lib/analytics";
import { AnimatedBackground } from "./AnimatedBackground";
import { DownloadQr } from "./DownloadQr";
import phone from "@/assets/store/screen-01.webp";

/*
 * Hero.
 *
 * The page now leads with the product people actually install: the phone app.
 * The promise is unchanged ("never asks for your bank login" is still the one
 * claim a bank-connected app cannot copy), but the sub-head names the number
 * the whole product is built around -- Safe to Spend -- and the store badges
 * are the primary action.
 *
 * Content is in the HTML from the first byte: no opacity-0 starting state and
 * no scroll-triggered reveal, so the headline is the LCP candidate and paints
 * without waiting for hydration.
 *
 * Two headlines can be compared by adding ?h=safe to the URL (control is the
 * default). The variant is reported with every hero view so it can be split in
 * analytics before a feature-flag tool is wired in.
 */
const HEADLINES = {
  control: {
    lead: "The budgeting app that",
    accent: "never asks for your bank login",
  },
  safe: {
    lead: "Know what's safe to spend today —",
    accent: "without handing over your bank login",
  },
} as const;

export const Hero = () => {
  const [params] = useSearchParams();
  const variant = params.get("h") === "safe" ? "safe" : "control";
  const headline = HEADLINES[variant];

  useEffect(() => {
    track("hero_view", { variant });
  }, [variant]);

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--safespend-primary-light))] via-background to-background -z-20" />
      <AnimatedBackground />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-8 items-center">
        <div className="text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
          <p className="inline-flex items-center gap-2 text-sm font-medium text-primary bg-primary/10 rounded-full px-4 py-1.5 mb-6">
            <Smartphone className="h-4 w-4" aria-hidden="true" />
            Now on iPhone, iPad and Android
          </p>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] mb-6">
            {headline.lead}{" "}
            <span className="gradient-text">{headline.accent}</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground mb-8">
            Safe Spend shows one number: what is <strong className="text-foreground">safe to spend</strong>{" "}
            after your bills, goals and what's still coming in. Log expenses in
            seconds, scan receipts, or import a statement — no bank connection,
            no credentials shared, nothing sold.
          </p>

          <StoreBadges
            location="hero"
            size="lg"
            className="justify-center lg:justify-start mb-4"
          />

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-5 mb-10">
            <Button
              asChild
              variant="ghost"
              className="text-muted-foreground hover:text-foreground"
            >
              <CtaLink location="hero">
                Or use it on the web
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </CtaLink>
            </Button>
            <a
              href="#how-it-works"
              className="text-sm text-muted-foreground hover:text-foreground underline-offset-4 hover:underline min-h-[44px] inline-flex items-center"
            >
              See how it works
            </a>
          </div>

          <ul className="grid sm:grid-cols-3 gap-x-6 gap-y-3 text-sm text-muted-foreground list-none p-0">
            <li className="flex items-center gap-2 justify-center lg:justify-start">
              <Lock className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
              No bank login, ever
            </li>
            <li className="flex items-center gap-2 justify-center lg:justify-start">
              <ScanLine className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
              Scan receipts &amp; import statements
            </li>
            <li className="flex items-center gap-2 justify-center lg:justify-start">
              <Download className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
              Export or delete anytime
            </li>
          </ul>
        </div>

        <div className="relative flex flex-col items-center gap-6">
          <div className="absolute inset-0 -z-10 bg-primary/15 blur-3xl rounded-full" aria-hidden="true" />
          <img
            src={phone}
            alt="The Safe Spend app on a phone, showing a Safe to Spend balance, a financial health score and recent transactions"
            width={600}
            height={1300}
            className="w-60 sm:w-72 lg:w-80 h-auto rounded-[2rem] shadow-2xl shadow-primary/25 ring-1 ring-white/10"
            fetchPriority="high"
          />
          <div className="hidden lg:block">
            <DownloadQr size={96} caption="On a computer? Scan to get the app" />
          </div>
        </div>
      </div>
    </section>
  );
};
