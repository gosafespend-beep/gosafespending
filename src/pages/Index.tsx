import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { ProofStrip } from "@/components/landing/ProofStrip";
import { SafeToSpendDemo } from "@/components/landing/SafeToSpendDemo";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { FeatureShowcase } from "@/components/landing/FeatureShowcase";
import { UseCases } from "@/components/landing/UseCases";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Comparison } from "@/components/landing/Comparison";
import { SecuritySection } from "@/components/landing/SecuritySection";
import { Pricing } from "@/components/landing/Pricing";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { FreeTools } from "@/components/landing/FreeTools";
import { EbookOffer } from "@/components/shared/EbookOffer";
import { Footer } from "@/components/landing/Footer";
import { StickyWaitlistBar } from "@/components/landing/StickyWaitlistBar";
import { SEOHead } from "@/components/seo/SEOHead";

/*
 * Section order: promise -> proof -> the one idea -> the objection -> the
 * product -> who it is for -> how it works -> comparison -> trust -> price ->
 * questions -> close.
 *
 * Replaced in this pass: the statistics row and the testimonial carousel
 * (their figures and quotes could not be substantiated; ProofStrip states only
 * checkable facts instead), the generic web-dashboard mockup (the hero and
 * FeatureShowcase now show the phone app), and the twelve-card feature grid.
 * Add real ratings and testimonials back to ProofStrip / a new section only
 * when they come from the store listings or from users who agreed to be quoted.
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
        <ProofStrip />
        <SafeToSpendDemo />
        <ProblemSection />
        <FeatureShowcase />
        <UseCases />
        <HowItWorks />
        <Comparison />
        <SecuritySection />
        <Pricing />
        <FAQ />
        <FinalCTA />
        <FreeTools />
        <EbookOffer source="homepage" variant="section" />
      </main>
      <Footer />
      <StickyWaitlistBar />
    </div>
  );
};

export default Index;
