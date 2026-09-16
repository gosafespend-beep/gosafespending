import { Link } from "react-router-dom";
import {
  BookOpen,
  CheckCircle2,
  ClipboardList,
  Calculator,
  Shield,
  ArrowRight,
} from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { SEOHead } from "@/components/seo/SEOHead";
import { BookSchema } from "@/components/seo/BookSchema";
import { EbookOffer } from "@/components/shared/EbookOffer";
import { CtaLink } from "@/components/ui/CtaLink";
import { Button } from "@/components/ui/button";
import cover from "@/assets/ebook-cover.png";

const inside = [
  "12 chapters, written plainly — no jargon, no products being sold to you",
  "6 worksheets you can fill in with a pen and a bank statement",
  "A 30-day money clarity plan, one small action a day",
  "A setup checklist for your first week of tracking",
  "A glossary of the terms finance people use without explaining",
];

const teasers = [
  {
    icon: ClipboardList,
    chapter: "Chapter 2",
    title: "The $340 she couldn't account for",
    body: "A reader tracked every expense for one month and found $340 she had no memory of spending. Not a disaster — just eleven small things she'd stopped noticing. The chapter walks through how she found it, and how to run the same check on your own month.",
  },
  {
    icon: Calculator,
    chapter: "Chapter 5",
    title: "Why the 50/30/20 rule breaks for most people",
    body: "The rule assumes your rent is negotiable. For a lot of people it is not. This chapter shows how to adapt the split when your needs already take 65% — and what to do about the remaining 35% so the plan survives contact with real life.",
  },
  {
    icon: Shield,
    chapter: "Chapter 9",
    title: "Snowball or avalanche: which one you'll actually finish",
    body: "One method saves more money. The other is the one people complete. The chapter shows the real interest difference on typical balances, so you can pick with the number in front of you rather than on principle.",
  },
];

/**
 * The free-book landing page.
 *
 * The site's only ask used to be "start a trial". That works for visitors who
 * already know they want a budgeting app and excludes everyone still deciding
 * whether budgeting is worth the trouble. The book gives that second group
 * something to say yes to, and gives us a way to keep talking to them.
 */
const Ebook = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead />
      <BookSchema />
      <a href="#main" className="skip-link">
        Skip to main content
      </a>

      <Navbar />

      <main id="main">
        {/* Hero */}
        <section className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[hsl(var(--safespend-primary-light))] via-background to-background">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[minmax(0,1fr)_340px] gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-5">
                <BookOpen className="h-5 w-5 text-primary" aria-hidden="true" />
                <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                  Free book · 53 pages
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-5">
                Thirty seconds a day.{" "}
                <span className="gradient-text">
                  A practical guide to knowing where your money goes.
                </span>
              </h1>

              <p className="text-lg text-muted-foreground mb-8 max-w-xl">
                Most money advice assumes you already have a spare hour and a
                spreadsheet habit. This one assumes you have thirty seconds and
                a phone. Give us an email address and we'll send it over — free,
                no card, nothing to install.
              </p>

              <EbookOffer source="ebook_page" variant="page" className="max-w-xl" />

              <p className="mt-4 text-sm text-muted-foreground">
                One email with your download link. The link works for 7 days.
              </p>
            </div>

            <img
              src={cover}
              alt="Cover of Thirty Seconds a Day: A Practical Guide to Financial Clarity"
              width={1024}
              height={1280}
              fetchPriority="high"
              className="w-56 lg:w-full mx-auto h-auto drop-shadow-2xl"
            />
          </div>
        </section>

        {/* What's inside */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
              What's inside
            </h2>
            <ul className="flex flex-col gap-4">
              {inside.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2
                    className="h-5 w-5 text-primary shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Chapter teasers */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">
              Three chapters, in short
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {teasers.map((teaser) => (
                <article
                  key={teaser.title}
                  className="rounded-xl border border-border/50 bg-card p-6"
                >
                  <div className="p-2 rounded-lg bg-primary/10 w-fit mb-4">
                    <teaser.icon
                      className="h-5 w-5 text-primary"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    {teaser.chapter}
                  </p>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {teaser.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{teaser.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Tools + soft app CTA */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Want to start before the email arrives?
            </h2>
            <p className="text-muted-foreground mb-6">
              The worksheets in chapters 4, 5 and 7 each have a free calculator
              on this site. No email needed for any of them.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 mb-10">
              {[
                { to: "/tools/budget-calculator", label: "50/30/20 Budget Calculator" },
                { to: "/tools/emergency-fund-calculator", label: "Emergency Fund Calculator" },
                { to: "/tools/debt-payoff-calculator", label: "Debt Payoff Calculator" },
                { to: "/tools/compound-interest-calculator", label: "Compound Interest Calculator" },
              ].map((tool) => (
                <Link
                  key={tool.to}
                  to={tool.to}
                  className="flex items-center justify-between gap-2 p-4 rounded-lg bg-card border border-border/50 hover:border-primary/40 transition-colors min-h-[44px]"
                >
                  <span className="text-sm font-medium text-foreground">
                    {tool.label}
                  </span>
                  <ArrowRight
                    className="h-4 w-4 text-primary shrink-0"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>

            <div className="rounded-xl border border-border/50 bg-card p-6 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
              <p className="text-sm text-muted-foreground max-w-md">
                Chapter 11 is about doing this daily without it becoming a
                chore. That's what Safe Spend is for — thirty seconds a day, no
                bank login.
              </p>
              <Button asChild className="min-h-[44px] whitespace-nowrap">
                <CtaLink location="hero">
                  Try Safe Spend free
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </CtaLink>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Ebook;
