import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { AppPreview } from "@/components/landing/AppPreview";
import { TrustBadges } from "@/components/landing/TrustBadges";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { TestimonialsCarousel } from "@/components/landing/TestimonialsCarousel";
import { FAQ } from "@/components/landing/FAQ";
import { Footer } from "@/components/landing/Footer";
import { StickyWaitlistBar } from "@/components/landing/StickyWaitlistBar";
import { Toaster } from "@/components/ui/sonner";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Skip to main content link for accessibility */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md"
      >
        Skip to main content
      </a>
      
      <Navbar />
      <main id="main">
        <Hero />
        <TrustBadges />
        <AppPreview />
        <Features />
        <HowItWorks />
        <TestimonialsCarousel />
        <FAQ />
      </main>
      <Footer />
      <StickyWaitlistBar />
      <Toaster position="top-center" />
    </div>
  );
};

export default Index;
