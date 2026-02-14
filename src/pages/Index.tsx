import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { AppPreview } from "@/components/landing/AppPreview";
import { TrustBadges } from "@/components/landing/TrustBadges";
import { StatsCounter } from "@/components/landing/StatsCounter";
import { Features } from "@/components/landing/Features";
import { UseCases } from "@/components/landing/UseCases";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Comparison } from "@/components/landing/Comparison";
import { TestimonialsCarousel } from "@/components/landing/TestimonialsCarousel";
import { SecuritySection } from "@/components/landing/SecuritySection";
import { Pricing } from "@/components/landing/Pricing";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { NewsletterSignup } from "@/components/landing/NewsletterSignup";
import { Footer } from "@/components/landing/Footer";
import { StickyWaitlistBar } from "@/components/landing/StickyWaitlistBar";
import { Toaster } from "@/components/ui/sonner";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <a
        href="#main"
        className="skip-link"
      >
        Skip to main content
      </a>
      
      <Navbar />
      <main id="main">
        <Hero />
        <TrustBadges />
        <StatsCounter />
        <AppPreview />
        <Features />
        <UseCases />
        <HowItWorks />
        <Comparison />
        <TestimonialsCarousel />
        <SecuritySection />
        <Pricing />
        <FAQ />
        <FinalCTA />
        <NewsletterSignup />
      </main>
      <Footer />
      <StickyWaitlistBar />
      <Toaster position="top-center" />
    </div>
  );
};

export default Index;
