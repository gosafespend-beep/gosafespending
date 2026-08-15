import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { AppPreview } from "@/components/landing/AppPreview";
import { StatsCounter } from "@/components/landing/StatsCounter";
import { Features } from "@/components/landing/Features";
import { UseCases } from "@/components/landing/UseCases";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Comparison } from "@/components/landing/Comparison";
import { TestimonialsCarousel } from "@/components/landing/TestimonialsCarousel";
import { SecuritySection } from "@/components/landing/SecuritySection";
import { Pricing } from "@/components/landing/Pricing";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { FreeTools } from "@/components/landing/FreeTools";
import { NewsletterSignup } from "@/components/landing/NewsletterSignup";
import { Footer } from "@/components/landing/Footer";
import { StickyWaitlistBar } from "@/components/landing/StickyWaitlistBar";
import { SEOHead } from "@/components/seo/SEOHead";

/*
 * Section order follows two rules from the audit: product before claims, and
 * self-identification before feature enumeration.
 *
 * Changes from the previous order:
 *  - TrustBadges removed. It rendered the same four statistics as StatsCounter
 *    immediately before it -- a duplicate section costing a full viewport of
 *    scroll before any product was shown.
 *  - AppPreview moved to second, so the first product visual arrives before
 *    two viewports of claims instead of after them.
 *  - UseCases moved to third. It holds the best copy on the page (four
 *    audiences, pain-first) and was sitting in position six.
 *  - ProblemSection added, naming the bank-connection objection explicitly so
 *    the rest of the page has something to answer.
 *  - FreeTools added: four high-intent calculators previously reachable only
 *    through a footer column.
 */
const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead />
      <a href="#main" className="skip-link">
        Skip to main content
      </a>

      <Navbar />
      <main id="main">
        <Hero />
        <AppPreview />
        <UseCases />
        <ProblemSection />
        <Features />
        <HowItWorks />
        <Comparison />
        <StatsCounter />
        <TestimonialsCarousel />
        <SecuritySection />
        <Pricing />
        <FAQ />
        <FinalCTA />
        <FreeTools />
        <NewsletterSignup />
      </main>
      <Footer />
      <StickyWaitlistBar />
    </div>
  );
};

export default Index;
