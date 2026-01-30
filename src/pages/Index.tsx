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
        className="skip-link"
      >
        Skip to main content
      </a>
      
      {/* Skip to waitlist form */}
      <a
        href="#waitlist"
        className="skip-link"
      >
        Skip to waitlist
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
